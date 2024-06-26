import React, { useState } from 'react';
import replyStore from '../store/replyStore'
import userStore from '../store/userStore'
import {Form, Button} from 'react-bootstrap'

const ReplyForm = ({ setShow }) => {
  const [content, setContent] = useState('');
  const {user} = userStore()
  const {createReply} = replyStore()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newReply = {
	  authorId: user._id,
	  author: user.name,
      content
    };
    await createReply(newReply);
    setContent('');
	setShow(false); //폼을 닫는다. 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>답변</label>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
      </div>
      <Button type="submit">저장</Button>
    </form>
  );
};

export default ReplyForm;