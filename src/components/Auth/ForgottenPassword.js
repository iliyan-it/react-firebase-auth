import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  FormGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ForgottenPassword() {
  const { resetPassword } = useAuth();
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      setError("");
      await resetPassword(emailRef.current.value);
      setSuccess("Email send! Check your mailbox for further instructions!");
    } catch {
      setError("Failed to reset password!");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
              <Form.Label>Email</Form.Label>
              <FormControl type="email" ref={emailRef} required></FormControl>
            </FormGroup>

            <Button
              disabled={loading}
              className="w-100 text-center mt-4 "
              type="submit"
            >
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/auth/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/auth/signup">Register</Link>
      </div>
    </>
  );
}
