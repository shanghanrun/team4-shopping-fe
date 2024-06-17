import React, {useState, useEffect} from "react";
import {Badge} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from "../utils/number";
import productStore from '../store/productStore'

const ProductCard = ({item}) => {
  const {selectProduct} = productStore()
  const [soldout, setSoldout] = useState(false)
  // console.log('items 배열안 각 객체의 _id', item?._id)
	const navigate = useNavigate()

  const showProductDetail = (id) => {
    selectProduct(id)
    navigate(`product/${id}`)
  };
  useEffect(()=>{
    // 품절된 아이템인지 검사
    // item.stock.keys().forEach((key)=>{
    //   if (item.stock[key] === 0){
    //     return setSoldout(true)
    //   }
    // })

    //일부 사이즈가 없을 경우
    // const isSoldOut = Object.keys(item.stock).some((key) => item.stock[key] === 0);
    //모든 사이즈의 재고가 없을 경우 품절 상태로 설정
    const isSoldOut = Object.keys(item.stock).every((key) => item.stock[key] === 0);
    setSoldout(isSoldOut);


  },[item])
  
  return (
    <div className="card" onClick={()=>showProductDetail(item?._id)}>
      <img
        src={item?.image} alt="" />
      <div>{item?.name}</div>
      <div>W {currencyFormat(item?.price)}</div>
      {/* <div>{soldout? <Badge bg="danger">품절</Badge> : ''}</div> */}
      {soldout && <Badge bg='danger' style={{width:'60px'}}>품절</Badge>}
      <div style={{height: '10px'}}></div>
    </div>
  );
};

export default ProductCard;
