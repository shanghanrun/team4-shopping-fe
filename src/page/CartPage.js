import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import cartStore from '../store/cartStore'
import userStore from '../store/userStore'
import CartProductCard from "../components/CartProductCard";
import CartOrderReceipt from "../components/CartOrderReceipt";
import "../style/cart.style.css";
import { ColorRing } from "react-loader-spinner";

const CartPage = () => {
  const {cart, getCart, cartCount, zeroCart} = cartStore()
  const {user} = userStore()
  const navigate = useNavigate()
  console.log('CartPage의 cart :', cart)

  useEffect(() => {
    zeroCart()  //이것은 cartStore의 cartCount를 0으로 만드는 건데.. 내가 왜 했을까??
    //카트불러오기
    getCart()
    console.log('cartCount :',cartCount)
  }, [cartCount]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={7}>
          <div>
            {cart && cart.items && cart.items.length > 0 ? (
              cart.items.map((item)=>(
                <CartProductCard key={item._id} item={item}/>
              ))
            ) : (
              // (cartCount === 0) ? (
              // (cart?.items?.length === 0) ? (
                <div className="text-align-center empty-bag">
                  <h2>카트가 비어있습니다.</h2>
                  <div>상품을 담아주세요!</div>
                </div>
              // ) : (
              //   <ColorRing />
              // )
            )}
          </div>
        </Col>
        <Col xs={12} md={5}>
          <CartOrderReceipt items={cart?.items || []}
            user={user}
          />
        </Col>
      </Row>
    </Container>
  );
  }
export default CartPage;
