import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  FormGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      setLoading(false);
      passwordRef.current.value = "";
      passwordConfirmationRef.current.value = "";
      return setError("Passwords don't match!");
    }

    try {
      setError("");
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account!");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
              <Form.Label>Email</Form.Label>
              <FormControl type="email" ref={emailRef} required></FormControl>
            </FormGroup>
            <FormGroup id="password">
              <Form.Label>Password</Form.Label>
              <FormControl
                type="password"
                ref={passwordRef}
                required
              ></FormControl>
            </FormGroup>
            <FormGroup id="password-confirmation">
              <Form.Label>Email confirmation</Form.Label>
              <FormControl
                type="password"
                ref={passwordConfirmationRef}
                required
              ></FormControl>
            </FormGroup>

            <Button
              disabled={loading}
              className="w-100 text-center mt-4 "
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/auth/login">Log In</Link>
      </div>
    </>
  );
}
