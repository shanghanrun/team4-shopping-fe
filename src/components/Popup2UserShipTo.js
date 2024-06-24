import React,{useState} from "react";
import Button from 'react-bootstrap/Button';
// import UserShipToCard from "./UserShipToCard";

const Popup2UserShipTo = ({openUserShipTo, closeUserShipTo, user}) => {
  console.log('user :', user)

  const [selectedIndex, setSelectedIndex] = useState(null);
  //화면에 객체를 보여줄 수 없으므로 input에서 address대신 index를 사용했다. 그래서 여기에 받는 값도 사실은 index 값이다.

  const handleIndexSelect=(index)=>{
    setSelectedIndex(index)
  }

  if(!openUserShipTo || !user) return <div></div>
  return (
    <div className='popup' style={{width:'400px'}}>
      <h5 style={{margin:'10px 10px'}}>User 주소 : {user.shipTo?.length}개</h5>
      <div style={{margin:'0 10px'}}>
        {user.shipTo && user.shipTo.map((address, index) => (
          <div key={index} style={{ margin: '10px 0', padding:'10px',border:'solid 1px gray' }}>
            <input
              type="radio"
              name="shippingAddress"
              value={index}
              checked={selectedIndex === index}
              onChange={() => handleIndexSelect(index)}
            />
            <div style={{ marginLeft: '10px' }}>
              <div>{address.address}</div>
              <div>{address.address2}</div>
              <div>{address.city}, {address.zip}</div>
              <div>{address.contact}</div>
            </div>
          
          </div>
        ))}
      </div>


      <Button style={{marginLeft:'10px',marginBottom:'10px'}} onClick={async()=>
          await closeUserShipTo(user.shipTo[selectedIndex])}>저장하고 닫기</Button>
    </div>
  );
};

export default Popup2UserShipTo;
