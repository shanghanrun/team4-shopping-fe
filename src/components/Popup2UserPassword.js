import React from "react";
import Button from 'react-bootstrap/Button';
import UserPasswordCard from "./UserPasswordCard";

const Popup2UserPassword = ({openUserPassword, closeUserPassword, user}) => {

  if(!openUserPassword || !user) return <div></div>
  return (
    <div className='popup'>
      <h5 style={{margin:'10px 10px'}}>User {user.name} 정보: {user.email}</h5>
      <div>
          <div>
            <UserPasswordCard user={user} closeUserPassword={closeUserPassword} />
          </div>
      </div>
        <Button style={{marginLeft:'10px',marginBottom:'10px'}} onClick={()=>
          closeUserPassword()}>닫기</Button>
    </div>
  );
};

export default Popup2UserPassword;
