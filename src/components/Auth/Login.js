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

export default function Login() {
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to sign in!");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
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

            <Button
              disabled={loading}
              className="w-100 text-center mt-4 "
              type="submit"
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/auth/forgotten-password">Forgotten password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/auth/signup">Register</Link>
      </div>
    </>
  );
}
