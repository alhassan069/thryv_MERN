import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/products', {headers:{
            Authorization: localStorage.getItem("token")
        }}); 
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
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

  return (
    <Row>
      {products && products.map((product) => (
        <Col key={product.id} md={4} className="mb-4">
          <Card className='p-4'>
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card.Img variant="top" src={product.imageUrl} alt={product.name} height={256} />
            <Card.Body>
              <Card.Title>{product.name.substring(0,30)}</Card.Title>
              {/* <Card.Text>
                {product.description.substring(0, 100)}...
              </Card.Text> */}
              <Card.Text>
                <strong>Price:</strong> ${product.price}
              </Card.Text>
            </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;
