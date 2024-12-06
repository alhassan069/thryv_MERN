import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function RecentlyViewed({allItems}) {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Unauthorized');
        }

        const response = await axios.get(`http://localhost:5000/api/v1/users/recentlyViewed`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data?.recentlyViewed)
        setRecentlyViewed(response.data?.recentlyViewed);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load recently viewed items');
        setLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2>Recently Viewed</h2>
      {recentlyViewed.length === 0 ? (
        <p>No recently viewed items.</p>
      ) : (
        <Row>
          {recentlyViewed.map((item) => (
            <Col key={item.productId} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Product ID: {item.productId}</Card.Title>
                  <Card.Text>
                    <strong>Viewed At:</strong> {new Date(item.timestamp).toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default RecentlyViewed;
