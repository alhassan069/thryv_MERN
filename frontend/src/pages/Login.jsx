import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({setIsAuthenticated}) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', formData);
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      setMessage({ type: 'success', text: 'Login successful!' });
      setIsAuthenticated(true)
      navigate('/'); // Redirect to products page
    } catch (error) {
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Invalid login credentials.' });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">Login</Button>
    </Form>
  );
}

export default Login;
