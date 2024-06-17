import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import productStore from '../store/productStore'
import userStore from '../store/userStore'
import cartStore from '../store/cartStore'
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";

const ComputerDetail = () => {
  const {selectedComputer} = productStore()
  const {user} = userStore()
  const {addToCart} = cartStore()
  console.log('디테일 페이지 selectedComputer:', selectedComputer)
  const [size, setSize] = useState("");
  const { id } = useParams();
  console.log('computerDetail 페이지 상품id :', id)
  const [sizeError, setSizeError] = useState(false);

  const navigate = useNavigate();

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    // 아직 로그인을 안한 유저라면 로그인페이지로  
    // 카트에 아이템 추가하기
    if(size ===''){
      setSizeError(true)
      return;
    }
    if(!user) {navigate('/login')}

    addToCart({id, size})
  }
  
  const selectSize = (value) => {
    // 사이즈 추가하기
    console.log('선택 value :',value)
    setSize(value)
    setSizeError(false)
  };

  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img
            src={selectedComputer?.image} className="w-100" alt="" />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">{selectedComputer?.name}</div>
          <div className="product-info">₩ {currencyFormat(selectedComputer?.price)}</div>
          <div className="product-info">{selectedComputer?.description}</div>

          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Toggle
              className="size-drop-down"
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
              align="start"
            >
              {size === "" ? "사이즈 선택" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              { selectedComputer && Object.keys(selectedComputer?.stock).length > 0 &&
                Object.keys(selectedComputer?.stock).map((sz, i) =>
                  selectedComputer?.stock[sz] > 0 ? (
                    <Dropdown.Item key={i} eventKey={sz}>
                      {sz.toUpperCase()}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item key={i} eventKey={sz} disabled={true}>
                      {sz.toUpperCase()}
                    </Dropdown.Item>
                  )
                )}
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && "사이즈를 선택해주세요."}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ComputerDetail;
