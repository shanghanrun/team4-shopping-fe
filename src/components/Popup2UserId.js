import React from "react";
import Button from 'react-bootstrap/Button';
import ProductCard2Deletable from "./ProductCard2Deletable";

const Popup2UserId = ({openUserId, closeUserId, user}) => {

  if(!openUserId || !user) return <div></div>
  return (
    <div className='popup'>
      <h5 style={{margin:'10px 10px'}}>User {user.name} 정보: {user.email}</h5>
      <div>
          <div>
            <ProductCard2Deletable userId={user._id} />
          </div>
      </div>
        <Button style={{marginLeft:'10px',marginBottom:'10px'}} onClick={()=>
          closeUserId()}>닫기</Button>
    </div>
  );
};

export default Popup2UserId;
