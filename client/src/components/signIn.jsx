import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { API } from "../config/api";
// import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import ForgotPasswordModal from "./ForgotPassword";

export default function SignInModal({ show, onHide, openSignUp }) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    value: "",
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
      console.log("Login response:", data);


  localStorage.setItem("token", data.data.token); 
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
        centered
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1060
        }}
      >
        <Modal.Body style={{
          padding: '1.5rem',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%',
          margin: '0 auto'
        }}>
          <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>Masuk ke Akun Anda</h4>
          
          {message && (
            <Alert variant="danger" style={{ marginBottom: '1rem' }}>
              {message}
            </Alert>
          )}

          <Form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit.mutate();
          }}>
            <Form.Group style={{ marginBottom: '1rem' }}>
              <Form.Control
                type="text"
                name="value"
                placeholder="Email atau Username"
                value={form.value}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group style={{ marginBottom: '1rem' }}>
              <Form.Control
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              />

            </Form.Group>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <Form.Check 
                type="checkbox"
                label="Ingat Saya"
                style={{ fontSize: '0.875rem' }}
              />
              <button 
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#007bff',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
                onClick={() => {
                  onHide();
                  setShowForgotPassword(true);
                }}
              >
                Lupa Password?
              </button>
            </div>

            <Button 
              type="submit" 
              style={{
                width: '100%',
                marginBottom: '1rem',
                backgroundColor: '#007bff',
                border: 'none',
                padding: '0.5rem',
                borderRadius: '4px',
                color: 'white'
              }}
            >
              Masuk
            </Button>

            <div style={{
              textAlign: 'center',
              marginBottom: '1rem',
              position: 'relative',
              borderBottom: '1px solid #dee2e6',
              height: '1px'
            }}>
              <span style={{
                position: 'absolute',
                top: '-0.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                padding: '0 0.5rem',
                fontSize: '0.875rem'
              }}>
                {/* ATAU */}
              </span>
            </div>
{/* 
            <div style={{ marginBottom: '1.5rem' }}>
              <Button 
                variant="outline-danger" 
                style={{ width: '100%', marginBottom: '0.5rem' }}
              >
                <FaGoogle style={{ marginRight: '0.5rem' }} /> Masuk dengan Google
              </Button>
              <Button 
                variant="outline-primary" 
                style={{ width: '100%', marginBottom: '0.5rem' }}
              >
                <FaFacebook style={{ marginRight: '0.5rem' }} /> Masuk dengan Facebook
              </Button>
              <Button 
                variant="outline-dark" 
                style={{ width: '100%' }}
              >
                <FaApple style={{ marginRight: '0.5rem' }} /> Masuk dengan Apple ID
              </Button>
            </div> */}

            <div style={{ textAlign: 'center', fontSize: '0.875rem' }}>
              Belum punya akun?{" "}
              <button 
                type="button" 
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#007bff',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
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
