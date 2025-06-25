import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function ChangePassword({ show, onHide }) {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  useEffect(() => {
    if (!show) {
      // Reset form when modal closes
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      });
    }
  }, [show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Change password data:", form);
    onHide();
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="oldPassword" className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="newPassword" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
              minLength={8}
            />
          </Form.Group>

          <Form.Group controlId="confirmNewPassword" className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmNewPassword"
              value={form.confirmNewPassword}
              onChange={handleChange}
              required
              minLength={8}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}