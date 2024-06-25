import React from "react";
import Button from 'react-bootstrap/Button';
import ProductCard2Deletable from "./ProductCard2Deletable";

const Popup2OftenBuy = ({openOftenBuy, closeOftenBuy, oftenBuyList}) => {

  if(!openOftenBuy || !oftenBuyList) return <div></div>
  return (
    <div className='popup'>
      <h5 style={{margin:'10px 10px'}}>내가 자주 산 상품들 : {oftenBuyList?.length}개</h5>
      <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
        {oftenBuyList?.map((item, i)=>
          <div key={item._id} >
            <ProductCard2Deletable item={item} />
          </div>
        )}
      </div>
        <Button style={{marginLeft:'10px',marginBottom:'10px'}} onClick={()=>
          closeOftenBuy()}>닫기</Button>
    </div>
  );
};

export default Popup2OftenBuy;
