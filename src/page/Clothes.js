import React, {useEffect} from "react";
// import ClothesCard from "../components/ClothesCard";
import { Row, Col, Container } from "react-bootstrap";
import productStore from '../store/productStore';
import ProductCard from './../components/ProductCard';

const Clothes =()=>{
const {clothesList, getProductList}= productStore()
 
  useEffect(()=>{
    getProductList()
  },[])
  return (
    <Container>
      <Row>
        {clothesList?.map((clothes,i) =>(
          <Col md={3} sm={12} key={i}>
            <ProductCard item={clothes}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Clothes;