import React, { useEffect, useState } from "react";
import { getSellerProductByActive } from "../api-request/seller-product-request";
import Swal from "sweetalert2";
import ProductCard from "../components/ProductCard";
import { getAllBasicData } from "../api-request/basic-info-request";

function ProductPage() {
  const [productList, setProductList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [occasions, setOccasions] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedOccasion, setSelectedOccasion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, [isLoading]);

  async function fetchData(params) {
    const response = await getSellerProductByActive(true);
    const response1 = await getAllBasicData(true);
    if (response.status) {
      console.log(response.data);
      setProductList(response.data);
      setFilterList(response.data);
      setOccasions(response1.data.occasions);
      setCategories(response1.data.categories);
      setIsLoading(false);
    } else {
      Swal.fire(
        "Error",
        "Failed to Fetch Products <br/>" + response.message,
        "error"
      );
    }
  }

  useEffect(() => {
    let result = productList;

    // Filter by search query
    if (searchQuery) {
      result = result.filter((product) =>
        product.product.productName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected city
    if (selectedCategory) {
      result = result.filter((product) =>
        product.product.categories.some(
          (category) => category.categoryId === parseInt(selectedCategory)
        )
      );
    }

    // Filter by selected area
    if (selectedOccasion) {
      result = result.filter((product) =>
        product.product.occasions.some(
          (occasion) => occasion.occasionId === parseInt(selectedOccasion)
        )
      );
    }

    setFilterList(result);
  }, [searchQuery, selectedCategory, selectedOccasion, productList]);

  function handleClear() {
    setSelectedOccasion(0);
    setSearchQuery("");
    setSelectedCategory(0);
  }
  return isLoading ? (
    <>Loading.....</>
  ) : (
    <div className="container p-2 mt-2">
        <h3 className="mb-4">Search and Filter Products</h3>

      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by shop name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="">Filter by Category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedOccasion}
            onChange={(e) => setSelectedOccasion(e.target.value)}
          >
            <option value="">Filter by Occasion</option>
            {occasions.map((occasion) => (
              <option key={occasion.occasionId} value={occasion.occasionId}>
                {occasion.occasionName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-1">
          <button className="btn btn-danger" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <div className="row row-cols-3  justify-content-center">
        {filterList.map((product, index) => (
          <div key={index + 1} className="col p-1 d-flex align-items-stretch">
            <ProductCard productData={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
