import React from "react";
import Button from 'react-bootstrap/Button';
import ProductCard2Deletable from "./ProductCard2Deletable";

const Popup2UserShipTo = ({openUserShipTo, closeUserShipTo, user}) => {

  if(!openUserShipTo || !user) return <div></div>
  return (
    <div className='popup'>
      <h5 style={{margin:'10px 10px'}}>방문 페이지(상품) : {user.ShipTo?.length}개</h5>
      <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
        {viewedProductList?.map((item, i)=>
          <div key={item._id} >
            <ProductCard2Deletable item={item} />
          </div>
        )}
      </div>
        <Button style={{marginLeft:'10px',marginBottom:'10px'}} onClick={()=>
          closeViewed()}>닫기</Button>
    </div>
  );
};

export default Popup2UserShipTo;
