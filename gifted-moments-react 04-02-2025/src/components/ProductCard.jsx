import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/store";

function ProductCard({ productData }) {
  const {
    sellerProductId,
    productPrice,
    productQuantity,
    images,
    seller,
    product,
    brand,
    active,
  } = productData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Navigate to product detail page
  const handleCardClick = () => {
    navigate(`/products/${sellerProductId}`);
  };

  // Navigate to checkout page
  const handleBuyNow = () => {
    navigate("/checkout");
  };

  // Add item to Redux cart store
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    dispatch(addToCart(productData));
  };
  return (
    <div
      className="card shadow-lg p-1 mb-4 bg-white rounded"
      style={{ cursor: "default" }}
      onClick={handleCardClick}
    >
      {/* Bootstrap Carousel for Product Images */}
      <div
        id={`carousel-${sellerProductId}`}
        className="carousel slide product-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {images.map((img, index) => (
            <div
              className={`carousel-item product-carousel-item ${
                index === 0 ? "active" : ""
              }`}
              key={img.imageId}
            >
              <img
                src={img.downloadUrl}
                className="d-block w-100"
                alt={product.productName}
                style={{ height: "75%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#carousel-${sellerProductId}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#carousel-${sellerProductId}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <h5 className="card-title">{product.productName}</h5>
        <h6 className="text-muted">{brand.brandName}</h6>
        <p className="card-text">
          {product.productDescription.substring(0, 100)}...
        </p>

        {/* Product Details */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Price:</strong> ₹{productPrice}
          </li>
          <li className="list-group-item">
            <strong>Quantity:</strong> {productQuantity} left
          </li>
          <li className="list-group-item">
            <strong>Category:</strong>{" "}
            {product.categories.map((cat) => cat.categoryName).join(", ")}
          </li>
          <li className="list-group-item">
            <strong>Occasion:</strong>{" "}
            {product.occasions.map((occ) => occ.occasionName).join(", ")}
          </li>
          <li className="list-group-item">
            <strong>Seller:</strong> {seller.shopName} ({seller.userName})
          </li>
          <li className="list-group-item">
            <strong>Contact:</strong> {seller.contactNo}
          </li>
        </ul>

        {/* Product Status */}
        <div className="mt-3">
          {active ? (
            <span className="badge bg-success">Available</span>
          ) : (
            <span className="badge bg-danger">Out of Stock</span>
          )}
        </div>

        {/* Add to Cart / Buy Now */}
        <div className="mt-3">
          <button className="btn btn-primary me-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button
            className="btn btn-success"
            onClick={(e) => {
              e.stopPropagation();
              handleBuyNow();
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
