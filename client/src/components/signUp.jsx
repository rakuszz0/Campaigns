import React, { useState, useRef } from "react";
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

  // Ref ke form DOM element untuk validasi manual
  const formRef = useRef(null);

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
        phone: form.phone.startsWith('+') ? form.phone.replace(/\s+/g, '') : `+${form.phone.replace(/\s+/g, '')}`,
        is_admin: false
      };
      console.log("Submitting payload:", payload);
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
      console.error("Registration error:", error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || "Registration failed. Please try again."
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formElement = formRef.current;
    console.log("Form validity:", formElement.checkValidity());
    console.log("Form state:", form);

    if (!formElement.checkValidity()) {
      setValidated(true);
      return;
    }

    setValidated(true); // Trigger valid feedback
    mutate();
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      backdrop="static"
      size="md"
      style={{ 
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999
      }}
      onExited={() => setValidated(false)}
    >
      <Modal.Header closeButton style={{ border: 'none' }}>
        <Modal.Title className="w-100 text-center">
          <h3 style={{ color: '#198754', fontWeight: 700 }}>
            Create Donor Account
          </h3>
          <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            Join our community to make a difference
          </p>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body style={{ 
        padding: '0 2rem 2rem',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        {message && (
          <Alert 
            variant={message.type === 'success' ? 'success' : 'danger'}
            className="text-center"
          >
            {message.text}
          </Alert>
        )}

        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="d-flex gap-3 mb-3">
            <Form.Group className="flex-fill">
              <Form.Label>
                <FaUser className="me-2 text-secondary" />
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
                style={{ borderRadius: '8px', padding: '10px' }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid first name (2-50 characters)
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="flex-fill">
              <Form.Label>
                <FaUser className="me-2 text-secondary" />
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
                style={{ borderRadius: '8px', padding: '10px' }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid last name (2-50 characters)
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaUser className="me-2 text-secondary" />
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
              style={{ borderRadius: '8px', padding: '10px' }}
            />
            <Form.Control.Feedback type="invalid">
              3-20 alphanumeric characters only
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaEnvelope className="me-2 text-secondary" />
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
              style={{ borderRadius: '8px', padding: '10px' }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaPhone className="me-2 text-secondary" />
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
              style={{ borderRadius: '8px', padding: '10px' }}
            />
            <Form.Text muted className="ms-1">
              Example: +6281234567890
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone number
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaLock className="me-2 text-secondary" />
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
              style={{ borderRadius: '8px', padding: '10px' }}
            />
            <Form.Text muted className="ms-1">
              Must contain uppercase, number, and special character
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Password must meet complexity requirements
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>
              <FaHome className="me-2 text-secondary" />
              Address (Optional)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Your full address"
              style={{ borderRadius: '8px', padding: '10px' }}
            />
          </Form.Group>

          <Button 
            type="submit"
            variant="success"
            className="w-100 fw-semibold py-2"
            disabled={isLoading}
            style={{ borderRadius: '8px' }}
          >
            {isLoading && (
              <Spinner animation="border" size="sm" className="me-2" />
            )}
            {isLoading ? "Processing..." : "Register Now"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p className="text-muted mb-0">
            Already have an account?{" "}
            <button
              type="button"
              className="btn btn-link p-0 text-success fw-semibold"
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
