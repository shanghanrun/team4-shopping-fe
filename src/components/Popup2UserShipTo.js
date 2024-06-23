import React from "react";
import Button from 'react-bootstrap/Button';
import UserShipToCard from "./UserShipToCard";

const Popup2UserShipTo = ({openUserShipTo, closeUserShipTo, user}) => {
  console.log('user :', user)

  if(!openUserShipTo || !user) return <div></div>
  return (
    <div className='popup'>
      <h5 style={{margin:'10px 10px'}}>User 주소 : {user.shipTo?.length}개</h5>
      <UserShipToCard user={user} closeUserShipTo={closeUserShipTo}/>
      <Button style={{marginLeft:'10px',marginBottom:'10px'}} onClick={()=>
          closeUserShipTo()}>닫기</Button>
    </div>
  );
};

export default Popup2UserShipTo;
