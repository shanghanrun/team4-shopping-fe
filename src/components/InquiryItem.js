import React, { useState } from 'react';
import {Container, Button} from 'react-bootstrap'
import ReplyForm from './ReplyForm';
import userStore from '../store/userStore'
import replyStore from '../store/replyStore'

const InquiryItem = ({ inquiry, editInquiry, deleteInquiry }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(inquiry?.title);
  const [content, setContent] = useState(inquiry?.content);
  const reply = inquiry?.replyId[0]  //populate한 것 중 첫번째 객체
  const [replyContent, setReplyContent]= useState(reply?.content)
  // const [show, setShow] = useState(false)
  const {user} = userStore()
  const {updateReply, deleteReply} = replyStore()

 

  const handleUpdate = async() => {
    const updatedInquiry = { ...inquiry, title, content };
    await editInquiry(updatedInquiry);
    setIsEditing(false);
  };
  const openReply =()=>{
	   // 아래의 id 'reply-box'인 태그를 editable한 것으로 만들고, 값을 입력하고
     // 그 입력 값을 받아서 저장하게 한다. 저장하고 editable 속성을 없앤다.
     const replyBox = document.getElementById('reply-box')
  }
  const editReply=async()=>{
    await updateReply(reply?.id, replyContent)
    // editable된 것을 다시 닫는다.
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
          <h3>제목: {inquiry?.title}</h3>
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
          {(user?.level ==='admin') && (reply) &&
            <Button style={{marginLeft:'100px'}} onClick={openReply}>답변쓰기</Button>
          }
        </div>
        <div>
          <div style={{border:'1px solid black'}} id='reply-box'>{replyContent}</div>
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