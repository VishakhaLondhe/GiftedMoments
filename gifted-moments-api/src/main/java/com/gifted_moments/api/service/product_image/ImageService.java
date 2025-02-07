package com.gifted_moments.api.service.product_image;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gifted_moments.api.entity.ProductImage;
import com.gifted_moments.api.entity.SellerProduct;
import com.gifted_moments.api.exception.ResourceInvalidException;
import com.gifted_moments.api.repository.ProductImageRepository;
import com.gifted_moments.api.repository.SellerProductRepository;
import com.gifted_moments.api.util.HelperFunctions;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService implements IImageService {
    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private SellerProductRepository sellerProductRepository;

    @Override
    public ProductImage createSellerProductImage(Long sellerProductId, MultipartFile image) {
        try {

            SellerProduct product = sellerProductRepository.findById(sellerProductId)
                    .orElseThrow(() -> new IllegalArgumentException("Product not found"));

            String filePath = HelperFunctions.saveImage(image);

            ProductImage productImage = new ProductImage();
            productImage.setFileName(image.getOriginalFilename());
            productImage.setFileType(image.getContentType());
            productImage.setDownloadUrl(filePath);

            productImage.setSellerProduct(product);
            return productImageRepository.save(productImage);

        } catch (IOException e) {
            throw new ResourceInvalidException("Error saving image " + e.getMessage());
        }
    }

    @Override
    public ProductImage updateSellerProductImage(Long imageId, MultipartFile image) {
        try {

            ProductImage productImage = productImageRepository.findById(imageId)
                    .orElseThrow(() -> new IllegalArgumentException("Image not found"));

            HelperFunctions.deleteImage(productImage.getDownloadUrl());

            String filePath = HelperFunctions.saveImage(image);

            productImage.setFileName(image.getOriginalFilename());
            productImage.setFileType(image.getContentType());
            productImage.setDownloadUrl(filePath);

            return productImageRepository.save(productImage);

        } catch (IOException e) {
            throw new ResourceInvalidException("Error updating image " + e.getMessage());
        }
    }

    @Override
    public void deleteSellerProductImage(Long imageId) {
        try {
            ProductImage productImage = productImageRepository.findById(imageId)
                    .orElseThrow(() -> new IllegalArgumentException("Image not found"));

            HelperFunctions.deleteImage(productImage.getDownloadUrl());

            productImageRepository.delete(productImage);

        } catch (IOException e) {
            throw new ResourceInvalidException("Error deleting image" + e.getMessage());
        }
    }

    @Override
    public List<ProductImage> getImagesBySellerProductId(Long productId) {
        return productImageRepository.findBySellerProductSellerProductId(productId);
    }
}
