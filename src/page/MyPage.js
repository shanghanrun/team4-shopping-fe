
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
import Popup2OftenBuy from './../components/Popup2OftenBuy';

const MyPage = () => {
  const {user,updateUserShipTo,getOftenBuyList, oftenBuyList} = userStore()
  const {orderList, getOrderList} = orderStore()
  const {getViewedProductList, viewedProductList,viewedUpdated} = productStore()
  const {userMovies} = movieStore()
  const [openViewed, setOpenViewed]= useState(false)
  const [openOftenBuy, setOpenOftenBuy]= useState(false)
  const [openUserPassword, setOpenUserPassword]= useState(false)
  const [openUserShipTo, setOpenUserShipTo] =useState(false)

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  useEffect(()=>{
    // getOrderList()
    getOrderList()
    getViewedProductList(user.viewedIds)
    getOftenBuyList(user.purchasedItems)
    console.log('userPurchasedItems:',user.purchasedItems)
  },[])

  const showViewed=()=>{
    setOpenViewed(!openViewed)
  }
  const showOftenBuy=()=>{
    setOpenOftenBuy(!openOftenBuy)
  }
  const showUserPassword=()=>{
    setOpenUserPassword(!openUserPassword)
  }
  const showUserShipTo=()=>{
    setOpenUserShipTo(!openUserShipTo)
  }
  const closeViewed=()=>{
    setOpenViewed(false)
  }
  const closeOftenBuy=()=>{
    setOpenOftenBuy(false)
  }
  const closeUserPassword=()=>{
    setOpenUserPassword(false)
  }
  const closeUserShipTo=async(selectedAddress)=>{
    setOpenUserShipTo(false)
    await updateUserShipTo(selectedAddress)
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
      <h3 style={{marginBottom:'20px', padding:'20px', background:'pink', borderRadius:'10px'}}>{user.name} : {user.email}   /  {orderList?.length} order(s)</h3>
      <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
      
          <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap',
        border:'solid 1px gray', boxShadow:'rgba(0,0,0,0.15) 1.95px 1.95px 2.6px'
      }}>
          <AccountCircleIcon style={{ fontSize: "100px", color: "grey" }} />
          <div>
            <div style={{height:'20px'}}></div>
            <div style={{ width: "250px", textAlign: "center", fontSize:'20px'}}>
                          <PaidIcon sx={{ "&:hover": { color: "#004cff" } }} />
                          <span> credit: {currencyFormat(user.credit)}원</span>
            </div>
            <div style={{ width: "250px", textAlign: "center",fontSize:'20px' }}>
                      <CalendarViewWeekIcon sx={{ "&:hover": { color: "#004cff" } }} />
                      <span> coupon: {currencyFormat(user.coupon)}원</span>
            </div>
          </div>
      </div>


          
          <Button variant='danger' style={{height:'68px', marginBottom:'10px'}} onClick={showUserPassword}>{openUserPassword?'패스워드수정 닫기' :'패스워드 수정'}</Button>
          <Button variant='danger' style={{height:'68px', marginBottom:'10px'}} onClick={showUserShipTo}>{openUserShipTo?'주배송지수정 닫기' :'주배송지 선택'}</Button>
    </div>
    <div style={{margin: '10px 0', display:'flex', gap:'20px'}}>
        <Button variant='success' style={{height:'68px', marginBottom:'10px'}} onClick={showViewed}>{openViewed?'관심 닫기' :'관심 보기'}</Button>
        <Button variant='success' style={{height:'68px', marginBottom:'10px'}} onClick={showOftenBuy}>{openOftenBuy?'자주 산 상품 닫기' :'자주 산 상품'}</Button>
    </div>  
      <div className='popup-mother'>
        <Popup2Deletable
          openViewed={openViewed}
          closeViewed={closeViewed}
          viewedProductList={viewedProductList}
        />
        <Popup2OftenBuy
          openOftenBuy={openOftenBuy}
          closeOftenBuy={closeOftenBuy}
          oftenBuyList={oftenBuyList}
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
      <div style={{marginTop:'30px'}}>
        <h3>주문 내역</h3>
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
