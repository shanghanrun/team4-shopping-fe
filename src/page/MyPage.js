
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
import Popup2UserShipTo from "../components/Popup2UserShipTo";
import Popup2UserPassword from "../components/Popup2UserPassword";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";

const MyPage = () => {
  const {user} = userStore()
  const {orderList, getOrderList} = orderStore()
  const {getViewedProductList, viewedProductList,viewedUpdated} = productStore()
  const {userMovies} = movieStore()
  const [openViewed, setOpenViewed]= useState(false)
  const [openUserPassword, setOpenUserPassword]= useState(false)
  const [openUserShipTo, setOpenUserShipTo] =useState(false)

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  useEffect(()=>{
    // getOrderList()
    getOrderList()
    getViewedProductList(user.viewedIds)
  },[])

  const showViewed=()=>{
    setOpenViewed(!openViewed)
  }
  const showUserId=()=>{
    setOpenUserPassword(!openUserPassword)
  }
  const showUserShipTo=()=>{
    setOpenUserShipTo(!openUserShipTo)
  }
  const closeViewed=()=>{
    setOpenViewed(false)
  }
  const closeUserPassword=()=>{
    setOpenUserPassword(false)
  }
  const closeUserShipTo=()=>{
    setOpenUserShipTo(false)
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
      <div style={{border:'solid 1px gray', padding:'5px', height:'70px', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
          }}>
            
            
            
      </div>
      
      <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>

          <AccountCircleIcon style={{ fontSize: "150px", color: "grey" }} />
          <div>
            <div style={{ width: "200px", textAlign: "center" }}>
                          <PaidIcon sx={{ "&:hover": { color: "#004cff" } }} />
                          <span>credit: {currencyFormat(user.credit)}원</span>
            </div>
            <div style={{ width: "200px", textAlign: "center" }}>
                      <CalendarViewWeekIcon sx={{ "&:hover": { color: "#004cff" } }} />
                      <span>coupon: {currencyFormat(user.coupon)}원</span>
            </div>
          </div>
      </div>
      <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>

          <h3 style={{marginBottom:'20px', padding:'20px', background:'pink', borderRadius:'10px'}}>{user.name} : {user.email}   /  {orderList?.length} order(s)</h3>

          
          <Button variant='success' style={{height:'68px', marginBottom:'10px'}} onClick={showViewed}>{openViewed?'관심 닫기' :'관심 보기'}</Button>
          <Button variant='success' style={{height:'68px', marginBottom:'10px'}} onClick={showUserId}>{openUserPassword?'패스워드수정 닫기' :'패스워드 수정'}</Button>
          <Button variant='success' style={{height:'68px', marginBottom:'10px'}} onClick={showUserShipTo}>{openUserShipTo?'주배송지수정 닫기' :'주배송지 선택'}</Button>
    </div>
      
      <div className='popup-mother'>
        <Popup2Deletable
        openViewed={openViewed}
        closeViewed={closeViewed}
        viewedProductList={viewedProductList}
        />
        <Popup2UserPassword
        openUserPassword={openUserPassword}
        closeUserPassword={closeUserPassword}
        user={user}
        />
        <Popup2UserShipTo
        openUserShipTo={openUserShipTo}
        closeUserShipTo={closeUserShipTo}
        user={user}
        />
      </div>
      <div>
        <h5>주문 내역</h5>
        {
          orderList.map((order, i)=>(
            <div key={i}>
              <OrderStatusCardOuter order={order} />
            </div> 
          ))
        }
      </div>
      <div style={{border:'1px solid gray'}}>
        <div>
          {userMovies.map((movie,i)=>
            <div key={i} style={{border:'1px solid gray', display:'flex', gap:'20px'}}>
                <img src={movie?.image} width='200px' alt=''/>
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
