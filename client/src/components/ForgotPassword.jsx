import React, { useState } from "react";
import { Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { API } from "../config/api";
import { FaEnvelope, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

export default function ForgotPasswordModal({ show, onHide, openSignIn }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await API.post("/auth/forgot-password", { email });
      return response.data;
    },
    onSuccess: () => {
      setSuccess(true);
      setMessage({
        type: "success",
        text: "Password reset link sent to your email!",
      });
    },
    onError: (error) => {
      setMessage({
        type: "danger",
        text: error.response?.data?.message || "Failed to send reset link",
      });
    },
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

  const handleBackToSignIn = () => {
    onHide();
    if (typeof openSignIn === 'function') {
      openSignIn();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          <h3 className="fw-bold text-primary">
            {success ? "Check Your Email" : "Forgot Password"}
          </h3>
          <p className="text-muted small mb-0">
            {success
              ? "We've sent instructions to your email"
              : "Enter your email to reset your password"}
          </p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {message && (
          <Alert variant={message.type} className="text-center">
            {message.text}
          </Alert>
        )}

        {success ? (
          <div className="text-center py-4">
            <FaCheckCircle className="text-success mb-3" size={48} />
            <p>
              We've sent a password reset link to <strong>{email}</strong>. Please
              check your inbox.
            </p>
            <Button 
              variant="primary" 
              onClick={handleBackToSignIn}
              className="mt-3"
            >
              <FaArrowLeft className="me-2" /> Back to Sign In
            </Button>
          </div>
        ) : (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>
                <FaEnvelope className="me-2" />
                Email Address
              </Form.Label>
              <Form.Control
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              className="w-100 py-2 fw-bold mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={handleBackToSignIn}
              >
                <FaArrowLeft className="me-2" /> Back to Sign In
              </button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}