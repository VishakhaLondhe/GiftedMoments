import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  createSellerProduct,
  deleteSellerProductById,
  getAllSellerProducts,
  getSellerProductBySellerId,
  updateSellerProductById,
} from "../../api-request/seller-product-request";
import { getAllProducts } from "../../api-request/product-request";
import { getAllBrands } from "../../api-request/basic-info-request";
import { useForm } from "react-hook-form";

function SellerProductManagePage() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [sellerProducts, setSellerProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredSellerProducts, setFilteredSellerProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const [currentSellerProduct, setCurrentSellerProduct] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sellerId = 1;

  useEffect(() => {
    fetchData();
  }, [isLoading]);

  async function fetchData() {
    try {
      const [sellerRes, brandsRes, productsRes] = await Promise.all([
        getSellerProductBySellerId(sellerId),
        getAllBrands(),
        getAllProducts(),
      ]);

      if (sellerRes.status && brandsRes.status && productsRes.status) {
        setSellerProducts(sellerRes.data);
        setFilteredSellerProducts(sellerRes.data);
        setBrands(brandsRes.data);
        setProducts(productsRes.data);
        setIsLoading(false);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to fetch data", "error");
    }
  }

  async function handleCreateSellerProduct(data) {
    const formData = new FormData();
    formData.append("productId", data.productId);
    formData.append("brandId", data.brandId);
    formData.append("productPrice", data.productPrice);
    formData.append("productQuantity", data.productQuantity);
    formData.append("sellerId", sellerId);
    formData.append("active", true);

    const imageInput = document.getElementById("productImages");
    for (let i = 0; i < imageInput.files.length; i++) {
      formData.append("productImages", imageInput.files[i]);
    }

    try {
      const response = await createSellerProduct(formData);
      if (response.status) {
        Swal.fire("Success", "Product created successfully", "success");
        fetchData();
        reset();
        clearAll();
        setShowCreateModal(false);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to create product", "error");
    }
  }

  async function handleUpdateSellerProduct(data) {
    try {
      console.log(data);

      const formData = new FormData();
      formData.append("productId", data.productId);
      formData.append("brandId", data.brandId);
      formData.append("productPrice", data.productPrice);
      formData.append("productQuantity", data.productQuantity);
      formData.append("sellerId", sellerId);
      formData.append("active", data.active);

      const response = await updateSellerProductById(
        currentSellerProduct.sellerProductId,
        formData
      );

      if (response.status) {
        Swal.fire("Success", "Product updated successfully", "success");
        fetchData();
        clearAll();
        setShowUpdateModal(false);
      } else {
        Swal.fire(
          "Error",
          "Failed to update product <br/>" + response.message,
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update product", "error");
    }
  }

  async function handleDeleteSellerProduct(sellerProductId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteSellerProductById(sellerProductId);
        if (response.status) {
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          fetchData();
        }
      }
    });
  }

  async function handleUpdateImage() {
    if (!selectedImage || !newImageFile) return;

    const formData = new FormData();
    formData.append("image", newImageFile);

    try {
      // const response = await UpdateImage(selectedImage, formData);
      // if (response.status) {
      //   Swal.fire('Success', 'Image updated successfully', 'success');
      //   fetchData();
      clearAll();
      //   setNewImageFile(null);
      // }
    } catch (error) {
      Swal.fire("Error", "Failed to update image", "error");
    }
  }

  async function handleDeleteImage(imageId) {
    //   try {
    //     const response = await deleteImage(imageId);
    //     if (response.status) {
    //       Swal.fire('Success', 'Image deleted successfully', 'success');
    //       fetchData();
    clearAll();
    //       setSelectedImage(null);
    //     }
    //   } catch (error) {
    //     Swal.fire('Error', 'Failed to delete image', 'error');
    //   }
  }

  function handleEditProduct(product) {
    console.log(product);

    setCurrentSellerProduct(product);
    setValue("productId", product.product.productId);
    setValue("brandId", product.brand.brandId);
    setValue("productPrice", product.productPrice);
    setValue("productQuantity", product.productQuantity);
    setValue("active", product.active);
    setShowUpdateModal(true);
  }

  function handleViewProduct(product) {
    setCurrentSellerProduct(product);
    setShowViewModal(true);
  }

  function handleImageManagement(product) {
    console.log(product);

    setCurrentSellerProduct(product);
    setCurrentImages(product.images);
    setShowImageModal(true);
  }

  function clearAll() {
    reset(); setCurrentSellerProduct(null);setCurrentImages([]); setSelectedImage(null); setNewImageFile(null);
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Manage Seller Products</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search products..."
          onChange={(e) => {
            const query = e.target.value.toLowerCase();
            const filtered = sellerProducts.filter((sp) =>
              sp.product.productName.toLowerCase().includes(query)
            );
            setFilteredSellerProducts(filtered);
          }}
        />
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          Add New Product
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSellerProducts.map((sp, index) => (
            <tr key={sp.sellerProductId}>
              <td>{index + 1}</td>
              <td>{sp.product.productName}</td>
              <td>{sp.brand.brandName}</td>
              <td>₹{sp.productPrice}</td>
              <td>{sp.productQuantity}</td>
              <td>{sp.active ? "Active" : "Inactive"}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleViewProduct(sp)}
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="mx-1"
                  onClick={() => handleEditProduct(sp)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="mx-1"
                  onClick={() => handleDeleteSellerProduct(sp.sellerProductId)}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleImageManagement(sp)}
                >
                  Manage Images
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Product Modal */}
      <Modal
        show={showCreateModal}
        onHide={() =>{clearAll();  setShowCreateModal(false)}}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(handleCreateSellerProduct)}
            encType="multipart/form-data"
          >
            <Form.Group className="mb-3">
              <Form.Label>Select Product</Form.Label>
              <Form.Select {...register("productId", { required: true })}>
              <option value="" > Select Product </option>

                {products.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Brand</Form.Label>
              <Form.Select {...register("brandId", { required: true })}>
              <option value="" > Select Brand </option>

                {brands.map((brand) => (
                  <option key={brand.brandId} value={brand.brandId}>
                    {brand.brandName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                {...register("productPrice", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                {...register("productQuantity", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Images</Form.Label>
              <Form.Control type="file" id="productImages" multiple />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Update Product Modal */}
      <Modal
        show={showUpdateModal}
        onHide={() => {clearAll();setShowUpdateModal(false)}}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleUpdateSellerProduct)}>
            <Form.Group className="mb-3">
              <Form.Label>Select Brand</Form.Label>
              <Form.Select {...register("brandId", { required: true })}>
              <option value="" > Select Brand </option>
              
                {brands.map((brand) => (
                  <option key={brand.brandId} value={brand.brandId}>
                    {brand.brandName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                {...register("productPrice", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                {...register("productQuantity", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Active"
                {...register("active")}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Product Modal */}
      <Modal
        show={showViewModal}
        onHide={() => {clearAll();setShowViewModal(false)}}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentSellerProduct && (
            <div>
              <h4>{currentSellerProduct.product.productName}</h4>
              <p>Brand: {currentSellerProduct.brand.brandName}</p>
              <p>Price: ₹{currentSellerProduct.productPrice}</p>
              <p>Stock: {currentSellerProduct.productQuantity}</p>
              <p>
                Status: {currentSellerProduct.active ? "Active" : "Inactive"}
              </p>

              <h5>Product Images</h5>
              <div className="d-flex flex-wrap gap-2">
                {currentSellerProduct.images.map((image) => (
                  <img
                    key={image.imageId}
                    src={image.downloadUrl}
                    alt={image.fileName}
                    style={{
                      width: "150px",
                      objectFit: "fit",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Image Management Modal */}
      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        size="lg"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Manage Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Select Image</Form.Label>
            <Form.Select onChange={(e) => setSelectedImage(e.target.value)}>
              <option value="">Select an image</option>
              {currentImages.map((image) => (
                <option key={image.imageId} value={image.imageId}>
                  {image.fileName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {selectedImage && (
            <div>
              <img
                src={
                  currentImages.find((img) => img.imageId == selectedImage)
                    .downloadUrl
                }
                alt="Selected"
                className="img-fluid mb-3 w-50"
              />
              <Form.Group className="mb-3">
                <Form.Label>Replace Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setNewImageFile(e.target.files[0])}
                />
              </Form.Group>
              <div className="d-flex gap-2">
                <Button
                  variant="danger"
                  onClick={() => handleDeleteImage(selectedImage)}
                >
                  Delete Image
                </Button>
                <Button
                  variant="primary"
                  onClick={handleUpdateImage}
                  disabled={!newImageFile}
                >
                  Update Image
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SellerProductManagePage;
