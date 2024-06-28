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
    <div style={{border:'1px solid black', borderRadius:'10px', padding:'10px', width:'70vw'}}>


      <form onSubmit={handleSubmit}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <label>제목 : </label>
          <input 
            style={{width:'400px', padding:'10px'}}
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div style={{height:'5px'}}></div>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <label>문의글</label>
          <textarea
            style={{width:'400px', padding:'10px'}} 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <div style={{height:'5px'}}></div>
        <div style={{display:'flex', gap:'40px',marginLeft:'180px'}}>

          <Button type="submit">저장</Button>
          <Button variant="danger" onClick={()=>setShow(false)}>취소</Button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;