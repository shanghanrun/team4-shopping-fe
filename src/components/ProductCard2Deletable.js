import React, {useState, useEffect} from "react";
import {Badge} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from "../utils/number";
import productStore from '../store/productStore'
import userStore from '../store/userStore'
// import { newItemDays } from "../constants/adminConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductCard2Deletable = ({item}) => {
  const newItemDays = parseInt(sessionStorage.getItem('newItemDays'))
  // console.log('item의 구조:', item)
  const {selectProduct, deleteItemFromUserViewed} = productStore()
  const {updateUserViewed} = userStore()
  const [soldout, setSoldout] = useState(false)
  const [newItem, setNewItem] = useState(false)

	const navigate = useNavigate()

  const showProductDetail = (id) => {
    selectProduct(id)
    updateUserViewed(id)
    navigate(`/product/${id}`)
  };
  const verifyNewItem=(item)=>{
    const ago = new Date()
    ago.setDate(ago.getDate()-newItemDays)
    return new Date(item.createdAt) >= ago;
  }
  useEffect(()=>{
    const isSoldOut = Object.keys(item.stock).every((key) => item.stock[key] === 0);
    setSoldout(isSoldOut);

    const isNewItem = verifyNewItem(item)
    setNewItem(isNewItem)
  },[item])

  const deleteCard = (e) => {
    e.stopPropagation(); // 상위의 showProductDetail 작동하지 않도록
    console.log('deleteCard 작동됨')
    deleteItemFromUserViewed(item._id)
  };

  return (
    <div className="card2-deletable" onClick={()=>showProductDetail(item?._id)}>
      <div className="display-flex space-between align-items-start">
        <img
          src={item?.image} alt="" width='200px' height='200px'/>
        <button className="trash-button">
                <FontAwesomeIcon
                  icon={faTrash}
                  width={24}
                  onClick={(e) => deleteCard(e)}
                />
        </button>
      </div>
      <div>{item?.name}</div>
      <div>가격: W {currencyFormat(item?.price)}</div>
      <div style={{color:'red'}}>세일가격: W {currencyFormat(item?.salePrice?? '')}</div>
      <div style={{display:'flex', gap:'5px',  flexWrap:'wrap'}}>
        {soldout && <Badge bg='danger' style={{width:'60px'}}>품절</Badge>}
        {newItem && <Badge bg='success' style={{width:'60px'}}>신상품</Badge>}
        {(item.onePlus?? false) && <Badge bg='success' style={{width:'70px'}}>1+1상품</Badge>}
        {(item.freeDelivery?? false) && <Badge bg='primary' style={{width:'70px'}}>무료배송</Badge>}
        {(item.salePercent || item.salePercent !== 0) && <Badge bg='danger' style={{width:'70px'}}>세일{item.salePercent}%</Badge>}
      </div>
      <div style={{height: '10px'}}></div>
    </div>
  );
};

export default ProductCard2Deletable;
