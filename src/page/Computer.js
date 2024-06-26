import React, { useEffect } from "react";
// import ComputerCard from "../components/ComputerCard";
import { Row, Col, Container } from "react-bootstrap";
import productStore from '../store/productStore';
import orderStore from '../store/orderStore'
import userStore from '../store/userStore'
// import uiStore from '../store/uiStore'
import ProductCard from './../components/ProductCard';


const Computer =()=>{
const {computerList, getProductList}= productStore()

  useEffect(()=>{
    getProductList()
  },[])
  return (
    <Container>
      <Row>
        {computerList?.map((computer,i) =>(
          <Col md={3} sm={12} key={i}>
            <ProductCard item={computer}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Computer;