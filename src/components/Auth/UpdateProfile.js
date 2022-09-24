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
  const { updateEmail, updatePassword, user } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      setLoading(false);
      passwordRef.current.value = "";
      passwordConfirmationRef.current.value = "";
      return setError("Passwords don't match!");
    }

    let promises = [];

    if (emailRef.current.value !== user.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        passwordRef.current.value = "";
        passwordConfirmationRef.current.value = "";
        setError("Failed to update the account!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
              <Form.Label>Email</Form.Label>
              <FormControl
                type="email"
                ref={emailRef}
                required
                defaultValue={user.email}
              ></FormControl>
            </FormGroup>
            <FormGroup id="password">
              <Form.Label>Password</Form.Label>
              <FormControl
                type="password"
                ref={passwordRef}
                placeholder="Don't want to change? -> Leave blank!"
              ></FormControl>
            </FormGroup>
            <FormGroup id="password-confirmation">
              <Form.Label>Email confirmation</Form.Label>
              <FormControl
                type="password"
                ref={passwordConfirmationRef}
                placeholder="Don't want to change? -> Leave blank!"
              ></FormControl>
            </FormGroup>

            <Button
              disabled={loading}
              className="w-100 text-center mt-4 "
              type="submit"
            >
              Update
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
