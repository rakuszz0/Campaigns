import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { API } from "../config/api";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import ForgotPasswordModal from "./ForgotPassword";
import WhyUs from "./Foot";

export default function SignInModal({ show, onHide, openSignUp }) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = useMutation({
    mutationFn: async () => {
      const response = await API.post("/signin", form);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      window.location.reload();
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "Login failed");
    }
  });

  return (
    <>
      <Modal 
        show={show} 
        onHide={onHide}
        className="bottom-sheet-modal"
        contentClassName="modal-content-bottom"
        backdropClassName="modal-backdrop-bottom"
        animation={false}
      >
        <Modal.Body className="p-4">
          <h4 className="text-center mb-3">Masuk ke Akun Anda</h4>
          
          {message && <Alert variant="danger">{message}</Alert>}

          <Form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit.mutate();
          }}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="custom-input"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="custom-input"
              />
            </Form.Group>

            <div className="d-flex justify-content-between mb-3">
              <Form.Check 
                type="checkbox"
                label="Ingat Saya"
                className="small-text"
              />
              <button 
                type="button"
                className="btn btn-link p-0 small-text"
                onClick={() => {
                  onHide();
                  setShowForgotPassword(true);
                }}
              >
                Lupa Password?
              </button>
            </div>

            <Button type="submit" className="w-100 mb-3 custom-btn">
              Masuk
            </Button>

            <div className="text-center mb-3 separator">
              <span className="bg-white px-2">ATAU</span>
            </div>

            <div className="social-login mb-4">
              <Button variant="outline-danger" className="w-100 mb-2">
                <FaGoogle className="me-2" /> Masuk dengan Google
              </Button>
              <Button variant="outline-primary" className="w-100 mb-2">
                <FaFacebook className="me-2" /> Masuk dengan Facebook
              </Button>
              <Button variant="outline-dark" className="w-100">
                <FaApple className="me-2" /> Masuk dengan Apple ID
              </Button>
            </div>

            <div className="text-center small-text">
              Belum punya akun?{" "}
              <button 
                type="button" 
                className="btn btn-link p-0 text-decoration-none"
                onClick={() => {
                  onHide();
                  openSignUp();
                }}
              >
                Daftar disini
              </button>
            </div>
          </Form>

        </Modal.Body>
      </Modal>

      <ForgotPasswordModal 
        show={showForgotPassword}
        onHide={() => setShowForgotPassword(false)}
        openSignIn={() => {
          setShowForgotPassword(false);
          onHide();
        }}
      />
    </>
  );
}