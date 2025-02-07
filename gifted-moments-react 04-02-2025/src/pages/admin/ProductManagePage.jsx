import React, { useEffect, useState } from "react";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  updateProduct,
} from "../../api-request/product-request";
import { createBrand, deleteBrand, getAllBasicData, getAllBrands } from "../../api-request/basic-info-request";
import Swal from "sweetalert2";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { createSellerProduct } from "../../api-request/seller-product-request";

function ProductManagePage() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, [isLoading]);

  async function fetchData(params) {
    
    const response = await getAllProducts(true);
    const response1 = await getAllBasicData(true);
    if (response.status) {
      console.log(response.data);
      setProducts(response.data);
      setFilteredProducts(response.data);
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

  async function handleCreateProduct(data) {
    const requestBody = {
      ...data,
      categoryId: parseInt(data.categoryId, 10),
      occasionId: parseInt(data.occasionId, 10),
    };

    const response = await createProduct(requestBody);
    if (response.status) {
      Swal.fire("Success", "Product created successfully", "success");
      fetchData();
      reset();
      setShowCreateModal(false);
    } else {
      Swal.fire("Error", "Failed to create product", "error");
    }
  }

  // Handle update product

  async function handleUpdateProduct(data) {
    const requestBody = {
      ...data,
      categoryId: parseInt(data.categoryId, 10),
      occasionId: parseInt(data.occasionId, 10),
    };

    const response = await updateProduct(data.productId, requestBody);
    if (response.status) {
      Swal.fire("Success", "Product updated successfully", "success");
      fetchData();
      reset();
      setShowUpdateModal(false);
    } else {
      Swal.fire("Error", "Failed to update product", "error");
    }
  }

  // Handle delete product
  async function handleDeleteProduct(productId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProductById(productId);
          if (response.status) {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            fetchData();
          } else {
            Swal.fire("Error", "Failed to delete product", "error");
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete product", "error");
        }
      }
    });
  }

  // Handle edit product

  function handleEditProduct(product) {
    setValue("productId", product.productId);
    setValue("productName", product.productName);
    setValue("productDescription", product.productDescription);
    setValue("categoryId", product.categories[0].categoryId); // Assuming only one category
    setValue("occasionId", product.occasions[0].occasionId);
    setShowUpdateModal(true);
  }

  // Handle view product
  function handleViewProduct(product) {
    setCurrentProduct(product);
    setShowViewModal(true);
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Products</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Product Name"
          onChange={(event) => {
            const query = event.target.value.toLowerCase();
            const filtered = products.filter((product) =>
              product.productName.toLowerCase().includes(query)
            );
            setFilteredProducts(filtered);
          }}
        />
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          Create New Product
        </Button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Occasion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.productId}>
              <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.categories[0]?.categoryName}</td>{" "}
              {/* Assuming one category */}
              <td>{product.occasions[0].occasionName}</td>
              <td>
                <div>
                  <Button
                    className="btn btn-sm btn-info m-1"
                    onClick={() => handleViewProduct(product)}
                  >
                    View
                  </Button>
                  <Button
                    className="btn btn-sm btn-warning m-1"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn btn-sm btn-danger m-1"
                    onClick={() => handleDeleteProduct(product.productId)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create Product Modal */}
      <Modal
        show={showCreateModal}
        size="lg"
        onHide={() => setShowCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleCreateProduct)}>
            <div className="row">
              <div className="col-md-12">
                <Form.Group className="mb-2">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("productName", { required: true })}
                  />
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register("productDescription", { required: true })}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Select {...register("categoryId", { required: true })}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Occasion</Form.Label>
                  <Form.Select {...register("occasionId", { required: true })}>
                    <option value="">Select Occasion</option>
                    {occasions.map((occasion) => (
                      <option
                        key={occasion.occasionId}
                        value={occasion.occasionId}
                      >
                        {occasion.occasionName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Update Product Modal */}
      <Modal
        show={showUpdateModal}
        size="lg"
        onHide={() => {
          reset();
          setShowUpdateModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleUpdateProduct)}>
            <Form.Control type="hidden" {...register("productId")} />
            <div className="row">
              <div className="col-md-12">
                <Form.Group className="mb-2">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("productName", { required: true })}
                  />
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    {...register("productDescription", { required: true })}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Select {...register("categoryId", { required: true })}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Occasion</Form.Label>
                  <Form.Select {...register("occasionId", { required: true })}>
                    <option value="">Select Occasion</option>
                    {occasions.map((occasion) => (
                      <option
                        key={occasion.occasionId}
                        value={occasion.occasionId}
                      >
                        {occasion.occasionName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Product Modal */}
      <Modal
        show={showViewModal}
        size="lg"
        scrollable
        onHide={() => setShowViewModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>View Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
              <div className="col-md-12">
                <Form.Group className="mb-2">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentProduct?.productName}
                    readOnly
                  />
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={currentProduct?.productDescription}
                    readOnly
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Select value={ currentProduct?.categories[0].categoryId } readOnly>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2">
                  <Form.Label>Occasion</Form.Label>
                  <Form.Select  value={currentProduct?.occasions[0].occasionId} readOnly>
                    <option value="">Select Occasion</option>
                    {occasions.map((occasion) => (
                      <option
                        key={occasion.occasionId}
                        value={occasion.occasionId}
                      >
                        {occasion.occasionName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductManagePage;
