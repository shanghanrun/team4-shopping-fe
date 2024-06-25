import React, {useState, useEffect} from "react";
import {Button,Alert} from 'react-bootstrap'
import userStore from '../store/userStore'


const UserPasswordCard = ({user, closeUserPassword}) => {
  const {updateUserPassword, error, setError} = userStore()
  const [newPassword, setNewPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')
 
  useEffect(()=>{
    setError('')//기존 에러메시지를 초기화,에러도 null이 되게 초기화.
  },[])

  const verifyPassword=()=>{
    if (newPassword !== secondPassword){
      setError('비밀번호가 일치하지 않습니다.')
      return false;
    }
    return true;
  }

  const saveNewPassword =()=>{
    if(verifyPassword()){
      updateUserPassword(user._id, newPassword)
      closeUserPassword()
    }
  }
  return (
    <div className="card2-deletable" style={{height:'200px'}} >
 
      {error && (
          <div className="error-message">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
      <div style={{marginTop:'10px'}}>새로운 패스워드 입력해주세요.</div>
      <input
        type="password"
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value)}
        placeholder="새로운 패스워드"
      />
      <div style={{marginTop:'10px'}}>다시 패스워드를 입력해주세요.</div> 
       <input
        type="password"
        value={secondPassword}
        onChange={(e)=>setSecondPassword(e.target.value)}
        placeholder="패스워드 확인"
      />
      <Button style={{marginTop:'10px'}}onClick={saveNewPassword}>패스워드 수정</Button>
      
    </div>
  );
};

export default UserPasswordCard;
