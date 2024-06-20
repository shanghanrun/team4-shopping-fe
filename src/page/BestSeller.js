import React from "react";
import ProductCard from "../components/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import productStore from '../store/productStore';


const BestSeller = () => {
  const {bestSellerList} = productStore()
  console.log('베스트셀러 페이지')
 
  return (
    <Container>
      <Row>
        {bestSellerList?.map((product,i) =>(
          <Col md={3} sm={12} key={i}>
            <ProductCard item={product}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BestSeller;
