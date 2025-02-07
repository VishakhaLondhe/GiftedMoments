import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { createBrand, deleteBrand, getAllBrands, updateBrand } from '../../api-request/basic-info-request';
import { useForm } from 'react-hook-form';

function BrandManagePage() {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [brands, setBrands] = useState([]);
    const [currentBrand, setCurrentBrand] = useState(null);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetchData();
    }, [isLoading]);
  
    async function fetchData() {
      const response = await getAllBrands();
      if (response.status) {
        setBrands(response.data);
        setFilteredBrands(response.data);
        setIsLoading(false);
      } else {
        Swal.fire("Error", "Failed to fetch brands", "error");
      }
    }
  
    async function handleCreateBrand(data) {
      const requestBody = {
        name: data.brandName,
      };
  
      const response = await createBrand(requestBody);
      if (response.status) {
        Swal.fire("Success", "Brand created successfully", "success");
        fetchData();
        reset();
        setShowCreateModal(false);
      } else {
        Swal.fire("Error", "Failed to create brand", "error");
      }
    }
  
    async function handleUpdateBrand(data) {
      const requestBody = {
        name: data.brandName,
      };
  
      const response = await updateBrand(data.brandId, requestBody);
      if (response.status) {
        Swal.fire("Success", "Brand updated successfully", "success");
        fetchData();
        reset();
        setShowUpdateModal(false);
      } else {
        Swal.fire("Error", "Failed to update brand", "error");
      }
    }
  
    async function handleDeleteBrand(brandId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteBrand(brandId);
          if (response.status) {
            Swal.fire("Deleted!", "Brand has been deleted.", "success");
            fetchData();
          } else {
            Swal.fire("Error", "Failed to delete brand", "error");
          }
        }
      });
    }
  
    function handleEditBrand(brand) {
      setValue("brandId", brand.brandId);
      setValue("brandName", brand.brandName);
      setShowUpdateModal(true);
    }
  
    function handleViewBrand(brand) {
      setCurrentBrand(brand);
      setShowViewModal(true);
    }
  
    return (
      <div className="container mt-4">
        <h3 className="mb-4">Brands</h3>
  
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by Brand Name"
            onChange={(event) => {
              const query = event.target.value.toLowerCase();
              const filtered = brands.filter((brand) =>
                brand.brandName.toLowerCase().includes(query)
              );
              setFilteredBrands(filtered);
            }}
          />
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            Create New Brand
          </Button>
        </div>
  
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr</th>
              <th>Brand Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.map((brand, index) => (
              <tr key={brand.brandId}>
                <td>{index + 1}</td>
                <td>{brand.brandName}</td>
                <td>
                  <div>
                    <Button
                      className="btn btn-sm btn-info m-1"
                      onClick={() => handleViewBrand(brand)}
                    >
                      View
                    </Button>
                    <Button
                      className="btn btn-sm btn-warning m-1"
                      onClick={() => handleEditBrand(brand)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn btn-sm btn-danger m-1"
                      onClick={() => handleDeleteBrand(brand.brandId)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Create Brand Modal */}
        <Modal
          show={showCreateModal}
          size="lg"
          onHide={() => setShowCreateModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Brand</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(handleCreateBrand)}>
              <Form.Group className="mb-2">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("brandName", { required: true })}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
  
        {/* Update Brand Modal */}
        <Modal
          show={showUpdateModal}
          size="lg"
          onHide={() => {
            reset();
            setShowUpdateModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Brand</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(handleUpdateBrand)}>
              <Form.Control type="hidden" {...register("brandId")} />
              <Form.Group className="mb-2">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("brandName", { required: true })}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
  
        {/* View Brand Modal */}
        <Modal
          show={showViewModal}
          size="lg"
          onHide={() => setShowViewModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>View Brand</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Brand Name:</strong> {currentBrand?.brandName}</p>
          </Modal.Body>
        </Modal>
      </div>
    );
}

export default BrandManagePage
