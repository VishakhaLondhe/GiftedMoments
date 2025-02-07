package com.gifted_moments.api.service.seller_product;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gifted_moments.api.dto.ProductDto;
import com.gifted_moments.api.dto.ProductImageDto;
import com.gifted_moments.api.dto.SellerDto;
import com.gifted_moments.api.dto.SellerProductDto;
import com.gifted_moments.api.entity.Brand;
import com.gifted_moments.api.entity.Product;
import com.gifted_moments.api.entity.ProductImage;
import com.gifted_moments.api.entity.Seller;
import com.gifted_moments.api.entity.SellerProduct;
import com.gifted_moments.api.entity.User;
import com.gifted_moments.api.repository.BrandRepository;
import com.gifted_moments.api.repository.ProductRepository;
import com.gifted_moments.api.repository.SellerProductRepository;
import com.gifted_moments.api.repository.SellerRepository;
import com.gifted_moments.api.request.SellerProductRequest;
import com.gifted_moments.api.service.product_image.IImageService;
import com.gifted_moments.api.util.Constants;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerProductService implements ISellerProductService {

    private final SellerProductRepository sellerProductRepository;
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final IImageService imageService;

    @Override
    @Transactional
    public SellerProductDto createSellerProduct(SellerProductRequest request) throws IOException {
        Seller seller = sellerRepository.findById(request.getSellerId())
                .orElseThrow(() -> new EntityNotFoundException("Seller not found"));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new EntityNotFoundException("Brand not found"));

        SellerProduct sellerProduct = new SellerProduct();
        sellerProduct.setProductPrice(request.getProductPrice());
        sellerProduct.setProductQuantity(request.getProductQuantity());
        sellerProduct.setActive(request.isActive());
        sellerProduct.setSeller(seller);
        sellerProduct.setProduct(product);
        sellerProduct.setBrand(brand);

        SellerProduct savedSellerProduct = sellerProductRepository.save(sellerProduct);

        if (request.getProductImages() != null) {
            System.out.println(request.getProductImages().size());
            List<ProductImage> images = request.getProductImages().stream()
                    .map(image -> imageService.createSellerProductImage(sellerProduct.getSellerProductId(), image))
                    .toList();
            System.out.println(images.size());
            savedSellerProduct.setImages(images);
        }

        return convertToDto(savedSellerProduct);
    }

    @Override
    @Transactional
    public SellerProductDto updateSellerProduct(Long sellerProductId, SellerProductRequest request) throws IOException {
        SellerProduct sellerProduct = sellerProductRepository.findById(sellerProductId)
                .orElseThrow(() -> new EntityNotFoundException(Constants.SELLER_PRODUCT_NOT_FOUND));

        sellerProduct.setProductPrice(request.getProductPrice());
        sellerProduct.setProductQuantity(request.getProductQuantity());
        sellerProduct.setActive(request.isActive());

        if (request.getBrandId() != null) {
            Brand brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new EntityNotFoundException("Brand not found"));
            sellerProduct.setBrand(brand);
        }

        if (request.getProductImages() != null && !request.getProductImages().isEmpty()) {
            sellerProduct.getImages().forEach(image -> imageService.deleteSellerProductImage(image.getImageId()));
            sellerProduct.getImages().clear();

            List<ProductImage> newImages = new ArrayList<>();
            for (MultipartFile file : request.getProductImages()) {

                ProductImage image = imageService.createSellerProductImage(sellerProductId, file);

                newImages.add(image);
            }
            sellerProduct.getImages().addAll(newImages);
        }

        return convertToDto(sellerProductRepository.save(sellerProduct));
    }

    @Override
    @Transactional
    public void deleteSellerProduct(Long sellerProductId) throws IOException {
        SellerProduct sellerProduct = sellerProductRepository.findById(sellerProductId)
                .orElseThrow(() -> new EntityNotFoundException(Constants.SELLER_PRODUCT_NOT_FOUND));

        sellerProduct.getImages().forEach(image -> imageService.deleteSellerProductImage(image.getImageId()));

        sellerProductRepository.delete(sellerProduct);
    }

    @Override
    public SellerProductDto getSellerProductById(Long sellerProductId) {
        SellerProduct sellerProduct = sellerProductRepository.findById(sellerProductId)
                .orElseThrow(() -> new EntityNotFoundException(Constants.SELLER_PRODUCT_NOT_FOUND));
        return convertToDto(sellerProduct);
    }

    @Override
    public List<SellerProductDto> getSellerProductsByProductId(Long productId) {
        return sellerProductRepository.findByProductProductId(productId).stream()
                .map(this::convertToDto).toList();
    }

    @Override
    public List<SellerProductDto> getSellerProductsBySellerId(Long sellerId) {
        return sellerProductRepository.findBySellerSellerId(sellerId).stream()
                .map(this::convertToDto).toList();
    }

    @Override
    public List<SellerProductDto> getSellerProductsByCategoryId(Long categoryId) {
        return sellerProductRepository.findByProductCategoriesCategoryId(categoryId).stream()
                .map(this::convertToDto).toList();
    }

    @Override

    public List<SellerProductDto> getSellerProductsByOccasionId(Long occasionId) {
        return sellerProductRepository.findByProductOccasionsOccasionId(occasionId).stream()
                .map(this::convertToDto).toList();
    }

    @Override
    public List<SellerProductDto> getSellerProductsByBrandId(Long brandId) {
        return sellerProductRepository.findByBrandBrandId(brandId).stream()
                .map(this::convertToDto).toList();
    }

    @Override
    public List<SellerProductDto> getSellerProductsByIsActive(boolean isActive) {
        return sellerProductRepository.findByIsActive(isActive).stream()
                .map(this::convertToDto).toList();
    }

    private SellerProductDto convertToDto(SellerProduct sellerProduct) {
        SellerProductDto dto = new SellerProductDto();
        dto.setSellerProductId(sellerProduct.getSellerProductId());
        dto.setProductPrice(sellerProduct.getProductPrice());
        dto.setProductQuantity(sellerProduct.getProductQuantity());
        dto.setActive(sellerProduct.isActive());

        if (sellerProduct.getImages() != null) {

            List<ProductImageDto> imageDtos = sellerProduct.getImages().stream()
                    .map(ProductImageDto::fromProductImage).toList();
            dto.setImages(imageDtos);
        }

        Seller seller = sellerProduct.getSeller();
        SellerDto sellerDto = new SellerDto();
        sellerDto.setSellerId(seller.getSellerId());
        sellerDto.setRegistrationNo(seller.getRegistrationNo());
        sellerDto.setGstinNo(seller.getGstinNo());
        sellerDto.setShopName(seller.getShopName());
        User user = seller.getUser();
        sellerDto.setUserId(user.getUserId());
        sellerDto.setUserName(user.getUserName());
        sellerDto.setEmailId(user.getEmailId());
        sellerDto.setContactNo(user.getContactNo());
        sellerDto.setAddress(user.getAddress());
        sellerDto.setRole(user.getRole());
        dto.setSeller(sellerDto);

        Product product = sellerProduct.getProduct();
        ProductDto productDto = ProductDto.fromProduct(product);
        dto.setProduct(productDto);
        dto.setBrand(sellerProduct.getBrand());

        return dto;
    }

    @Override
    public List<SellerProductDto> getAllSellerProducts() {
        return sellerProductRepository.findAll().stream()
                .map(this::convertToDto).toList();
    }
}
