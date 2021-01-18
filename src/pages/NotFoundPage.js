import React from "react";
import { Container } from "react-bootstrap";


const NotFoundPage = () => {
  return (
    <div>
      <Container className="mt-5 d-flex flex-column justify-content-center">
      <h1>OPPS!</h1>
        <p>Error 404 : Page Not Found</p>
      </Container>
        
      
    </div>
  );
};

export default NotFoundPage;
