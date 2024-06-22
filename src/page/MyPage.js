




import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { Container,Button } from "react-bootstrap";
import OrderStatusCardOuter from "../components/OrderStatusCardOuter";
import "../style/orderStatus.style.css";
import orderStore from '../store/orderStore'
import userStore from '../store/userStore'
import productStore from '../store/productStore'
import movieStore from '../store/movieStore'
import Popup2Deletable from "../components/Popup2Deletable";
import { currencyFormat } from './../utils/number';

const MyPage = () => {
  const {user} = userStore()
  const {orderList, getOrderList} = orderStore()
  const {getViewedProductList, viewedProductList,viewedUpdated} = productStore()
  const {userMovies} = movieStore()
  const [openViewed, setOpenViewed]= useState(false)

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  useEffect(()=>{
    // getOrderList()
    getOrderList()
    getViewedProductList(user.viewedIds)
  },[])

  const showViewed=()=>{
    setOpenViewed(!openViewed)
  }
  const showId=()=>{
    setOpenViewed(!openViewed)
  }
  const showShipTo=()=>{
    setOpenViewed(!openViewed)
  }
  const closeViewed=()=>{
    setOpenViewed(false)
  }

  if(orderList.length ===0){
    return(
      <Container className="confirmation-page">
        <h1>주문 내역이 없습니다.</h1>
        <div>메인페이지로 돌아가세요.
          <Link to={'/'}>메인페이지로 돌아가기</Link>
        </div>
      </Container>
    )
  }
  return (
    <Container className="status-card-container">

      
      <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
          <h3 style={{marginBottom:'20px', padding:'20px', background:'pink', borderRadius:'10px'}}>{user.name} : {user.email}   /  {orderList?.length} order(s)</h3>

          <div style={{border:'solid 1px gray', padding:'5px', height:'70px', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
          }}>
            <p>credit: {currencyFormat(user.credit)}원</p>
            <p>coupon: {currencyFormat(user.coupon)}원</p>
          </div>
          <Button variant='success' style={{height:'68px', marginBottom:'10px'}} onClick={showViewed}>{openViewed?'관심 닫기' :'관심 보기'}</Button>
          <Button variant='success' style={{height:'68px', marginBottom:'10px'}} onClick={showId}>{openIdViewed?'아이디수정 닫기' :'아이디 수정'}</Button>
          <Button variant='success' style={{height:'68px', marginBottom:'10px'}} onClick={showShipTo}>{openShipToViewed?'주배송지수정 닫기' :'주배송지 선택'}</Button>
      </div>
      <div className='popup-mother'>
        <Popup2Deletable
        openViewed={openViewed}
        closeViewed={closeViewed}
        viewedProductList={viewedProductList}
        />
      </div>
      {
        orderList.map((order, i)=>(
          <div key={i}>
            <OrderStatusCardOuter order={order} />
          </div> 
        ))
      }
      <div style={{border:'1px solid gray'}}>
        <div>
          {userMovies.map((movie,i)=>
            <div key={i} style={{border:'1px solid gray', display:'flex', gap:'20px'}}>
                <img src={movie?.image} width='300px' alt=''/>
                <div>
                  <div> title : {movie?.title}</div>
                  <div> 예약좌석 : {movie?.seat}</div>
                </div>
            </div>)
          }
        </div>
        
      </div>
    </Container>
  );
};

export default MyPage;
