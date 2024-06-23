import React, {useState, useEffect} from "react";
import {Button,Alert} from 'react-bootstrap'
import userStore from '../store/userStore'

const UserShipToCard = ({user, closeUserShipTo}) => {
  const {updateUserShipTo, error, setError} = userStore()
  const [newShipTo, setNewShipTo] = useState([])
  const [newAddress, setNewAddress] =useState('')

  useEffect(()=>{
    setError('')
  },[setError])

  const verifyUserShipTo=()=>{
    return newShipTo.length >0
  }
  const saveNewUserShipTo=()=>{
    if(verifyUserShipTo()){
      updateUserShipTo(user._id, newShipTo)
      closeUserShipTo()
    }
  }
  const handleShipToChange =(e)=>{
    setNewAddress(e.target.value)
    const userShipTo = [...user.shipTo]
    const mainShipToAddress = e.target.value
    const tempList = userShipTo.filter((address)=> address !== mainShipToAddress)
    tempList.unshift(mainShipToAddress) // 맨 앞 요소로 보냄
    setNewShipTo(tempList)
  }

  return (
    <div className="card2-deletable">
      {error && (
          <div className="error-message">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
      <div>주 배송지를 선택해 주세요.</div>
      {user.shipTo && user.shipTo.map((address, index)=>(
        <div key={index}>
          <input
            type="radio"
            name="shipTo"
            value={address}
            checked={newAddress === address}
            onChange={handleShipToChange}
          />
        </div>
      ))}
      <Button onClick={saveNewUserShipTo}>배송지 수정</Button>
      <div style={{height: '10px'}}></div>
    </div>
  );
};

export default UserShipToCard;
