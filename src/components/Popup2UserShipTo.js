import React from "react";
import Button from 'react-bootstrap/Button';
import UserShipToCard from "./UserShipToCard";

const Popup2UserShipTo = ({openUserShipTo, closeUserShipTo, user}) => {

  if(!openUserShipTo || !user) return <div></div>
  return (
    <div className='popup'>
      <h5 style={{margin:'10px 10px'}}>User 주소 : {user.ShipTo?.length}개</h5>
      <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
        {user.shipTo?.map((item, i)=>
          <div key={item._id} >
            <UserShipToCard item={item} closeUserShipTo={closeUserShipTo}/>
          </div>
        )}
      </div>
        <Button style={{marginLeft:'10px',marginBottom:'10px'}} onClick={()=>
          closeUserShipTo()}>닫기</Button>
    </div>
  );
};

export default Popup2UserShipTo;
