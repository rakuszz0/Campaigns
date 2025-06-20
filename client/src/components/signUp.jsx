import React, { useState } from "react";
import { Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useMutation } from '@tanstack/react-query';
import { API } from "../config/api";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaHome } from "react-icons/fa";

export default function SignUpModal({ show, onHide, openSignIn }) {
  const [message, setMessage] = useState(null);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    address: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = { 
        ...form, 
        phone: form.phone.startsWith('+') ? form.phone : `+${form.phone}`,
        is_admin: false 
      };
      const response = await API.post("/signup", payload);
      return response.data;
    },
    onSuccess: () => {
      setMessage({
        type: 'success',
        text: 'Registration successful! Redirecting to login...'
      });
      setTimeout(() => {
        onHide();
        openSignIn();
      }, 2000);
    },
    onError: (error) => {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || "Registration failed. Please try again."
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    mutate();
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      backdrop="static"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          <h3 className="fw-bold text-primary">Create Donor Account</h3>
          <p className="text-muted small mb-0">Join our community to make a difference</p>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {message && (
          <Alert 
            variant={message.type === 'success' ? 'success' : 'danger'}
            className="text-center"
          >
            {message.text}
          </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>
                <FaUser className="me-2" />
                First Name
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                minLength={2}
                maxLength={50}
                placeholder="John"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid first name (2-50 characters)
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>
                <FaUser className="me-2" />
                Last Name
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                minLength={2}
                maxLength={50}
                placeholder="Doe"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid last name (2-50 characters)
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaUser className="me-2" />
              Username
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              minLength={3}
              maxLength={20}
              pattern="[a-zA-Z0-9]+"
              placeholder="johndoe123"
            />
            <Form.Control.Feedback type="invalid">
              3-20 alphanumeric characters only
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaEnvelope className="me-2" />
              Email
            </Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              maxLength={100}
              placeholder="john@example.com"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaPhone className="me-2" />
              Phone (E.164 format)
            </Form.Label>
            <Form.Control
              required
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              pattern="^\+[1-9]\d{1,14}$"
              placeholder="+6281234567890"
            />
            <Form.Text className="text-muted">
              Example: +6281234567890
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone number
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaLock className="me-2" />
              Password
            </Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              maxLength={72}
              pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$"
              placeholder="At least 8 characters"
            />
            <Form.Text className="text-muted">
              Must contain: uppercase, number, and special character
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Password must meet complexity requirements
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>
              <FaHome className="me-2" />
              Address (Optional)
            </Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={form.address}
              onChange={handleChange}
              maxLength={255}
              rows={3}
              placeholder="Your full address"
            />
          </Form.Group>

          <Button 
            type="submit" 
            className="w-100 py-2 fw-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              'Register Now'
            )}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p className="mb-0">
            Already have an account?{' '}
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => {
                onHide();
                openSignIn();
              }}
            >
              Sign in here
            </button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}