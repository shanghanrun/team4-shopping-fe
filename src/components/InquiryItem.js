import React, { useState } from 'react';
import {Container, Button} from 'react-bootstrap'
import ReplyForm from './ReplyForm';
import userStore from '../store/userStore'

const InquiryItem = ({ inquiry, editInquiry, deleteInquiry }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(inquiry?.title);
  const [content, setContent] = useState(inquiry?.content);
  const [show, setShow] = useState(false)
  const {user} = userStore()

	const getReply =()=>{
		const replyId = inquiry.inquiryIds?.[0] // 일단은 한 개만
	}
  const handleUpdate = async() => {
    const updatedInquiry = { ...inquiry, title, content };
    await editInquiry(updatedInquiry);
    setIsEditing(false);
  };
  const openReply =()=>{
	setShow(true)
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
		  </div>
          <p style={{padding:'10px', border:'1px solid black', background:'yellow'}}>{inquiry?.content}</p>
          {/* <p style={{padding:'10px', border:'1px solid black'}}>{reply?.content}</p> */}

		  <div style={{display:'flex', gap:'10px'}}>
				{(user?._id === inquiry?.authorId) && 
				<div style={{display:'flex', gap:'10px'}}>
					<Button variant="warning" onClick={() => setIsEditing(true)}>수정</Button>
					<Button variant="danger" onClick={async() => await deleteInquiry(inquiry?._id)}>삭제</Button>
				</div>}
				{(user?.level ==='admin') &&
					<Button style={{marginLeft:'100px'}} onClick={openReply}>답변쓰기</Button>
				}
		  </div>
        </div>
      )}
	  {show && <ReplyForm setShow={setShow} />}
    </div>
  );
};

export default InquiryItem;