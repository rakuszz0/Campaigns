// src/components/ChangeImageModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { API } from "../config/api";

export default function ChangeImageModal({ show, onHide }) {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);

      // Kirim ke API kamu
      await API.patch("/change-image", formData);

      alert("Profile image updated successfully!");
      onHide();
    } catch (err) {
      console.error(err);
      alert("Failed to update image");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Profile Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select New Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleChange} required />
          </Form.Group>
          <Button type="submit" className="w-100">
            Upload
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
