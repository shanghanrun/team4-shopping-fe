import React from "react";
import { useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import { Container,Button } from "react-bootstrap";
import OrderStatusCard from "../components/OrderStatusCard";
import OrderStatusCardOuter from "../components/OrderStatusCardOuter";
import "../style/orderStatus.style.css";
import orderStore from '../store/orderStore'
import userStore from '../store/userStore'
import productStore from '../store/productStore'
import movieStore from '../store/movieStore'
import Popup2Deletable from "../components/Popup2Deletable";

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
      <div style={{display:'flex', gap:'20px', flexWrap:'wrap'}}>
          <h3 style={{marginBottom:'20px', padding:'20px', background:'pink', borderRadius:'10px'}}>{user.name} : {user.email}   /  {orderList?.length} order(s)</h3>
          <Button variant='success' style={{height:'68px'}} onClick={showViewed}>{openViewed?'방문페이지 닫기' :'방문페이지(물품) 보기'}</Button>
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
            {/* <div>
              {
                order.items.map((item,j)=>
                  <OrderStatusCard key={j} order={order} item={item} />
                )
              }
            </div> */}
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
