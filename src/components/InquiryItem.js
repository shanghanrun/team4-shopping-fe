import React, { useState } from 'react';
import {Container, Button} from 'react-bootstrap'
import ReplyForm from './ReplyForm';
import userStore from '../store/userStore'
import replyStore from '../store/replyStore'

const InquiryItem = ({ inquiry, index,editInquiry, deleteInquiry }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(inquiry?.title);
  const [content, setContent] = useState(inquiry?.content);
  const reply = inquiry?.replyIds[0]  //populate한 것 중 첫번째 객체
  console.log('reply :',reply)
  
  const [editable, setEditable] = useState(false)
  const [replyValue, setReplyValue] = useState('')
  const {user} = userStore()
  const {createReply, updateReply, deleteReply} = replyStore()

 

  const handleUpdate = async() => {
    const updatedInquiry = { ...inquiry, title, content };
    await editInquiry(updatedInquiry);
    setIsEditing(false);
  };
  const openReply =()=>{
	   // 아래의 id 'reply-box'인 태그를 editable한 것으로 만들고, 값을 입력하고
     // 그 입력 값을 받아서 저장하게 한다. 저장하고 editable 속성을 없앤다.
     setEditable(true)
  }
  const editReply=async()=>{
    await updateReply(reply?.id, reply?.content)
    // editable된 것을 다시 닫는다.
  }
  const handleInputChange =(e)=>{
    setReplyValue(e.target.value)
  }
  const handleKeyUp =async(e)=>{
    if(e.key === 'Enter'){
      e.preventDefault()
      if(!reply){
        await createReply('',inquiry._id, replyValue)
      } else{
        await updateReply(reply?._id,replyValue)
      }

      setEditable(false)
      // setIsEditing(false)
      setReplyValue('')
    } else if(e.key ==='Escape'){
      e.preventDefault()
      setEditable(false)
      // setIsEditing(false)
      setReplyValue('')
    }
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
          <button onClick={handleUpdate}>저장</button>
          <button onClick={() => setIsEditing(false)}>취소</button>
        </div>
      ) : (
        <div style={{padding:'10px', border:'1px solid black', width: '70vw'}}>
          <h3>[{index+1}] 제목: {inquiry?.title}</h3>
        <div>
        <span>작성자: {inquiry?.author}</span>
        {/* <span>작성자: {inquiry?.authorId._id}</span> */}
        </div>
          <p style={{padding:'10px', border:'1px solid black', background:'yellow'}}>{inquiry?.content}</p>
          {/* <p style={{padding:'10px', border:'1px solid black'}}>{reply?.content}</p> */}

        <div style={{display:'flex', gap:'10px'}}>
          {(user?._id === inquiry?.authorId) && 
          <div style={{display:'flex', gap:'10px'}}>
            <Button variant="warning" onClick={() => setIsEditing(true)}>수정</Button>
            <Button variant="danger" onClick={async() => await deleteInquiry(inquiry?._id)}>삭제</Button>
          </div>}
          {(user?.level ==='admin') && !editable && !reply && 
            <Button style={{marginLeft:'300px'}} onClick={openReply}>답변쓰기</Button>
          }
          {editable ?
            <input 
              style={{paddingLeft:'10px', width:'500px'}}
              type='text' value={replyValue}
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
              placeholder={reply?.content}
              autoFocus
            />
            : <div style={{fontSize:'20px'}}className="todo-content">{reply?.content}</div>
          }    
        </div>

        <div>
          <div style={{border:'1px solid black'}} id='reply-box'>{reply?.content}</div>
          {(user?.lever ==='admin') && 
            <div>
              <Button onClick={async()=>await editReply()}>답변수정</Button>
              <Button onClick={async()=>await deleteReply(reply?._id)}답변삭제></Button>
            </div>
          }
        </div>
      </div>
      )}
	  {/* {show && <ReplyForm setShow={setShow} reply={reply}/>} */}
    </div>
  );
};

export default InquiryItem;