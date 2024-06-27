import React, { useState } from 'react';
import userStore from '../store/userStore'
import {Form, Button} from 'react-bootstrap'

const InquiryForm = ({ createInquiry, setShow }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {user} = userStore()
//   console.log('user, user._id', user, user._id)

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newInquiry = {
	  authorId: user._id,
	  author: user.name,
      title,
      content
    };
    await createInquiry(newInquiry);
    setTitle('');
    setContent('');
	setShow(false); //폼을 닫는다. 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>제목</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>문의글</label>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
      </div>
      <div style={{display:'flex', gap:'10px'}}>

         <Button type="submit">저장</Button>
         <Button variant="danger" onClick={()=>setShow(false)}>취소</Button>
      </div>
    </form>
  );
};

export default InquiryForm;