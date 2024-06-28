import React, { useState } from 'react';
import {Container, Button,Form, Row, Col} from 'react-bootstrap'
import ReplyForm from './ReplyForm';
import userStore from '../store/userStore'
import replyStore from '../store/replyStore'
import uiStore from '../store/uiStore'

const InquiryItem = ({ inquiry, index,editInquiry, deleteInquiry }) => {
  const [isEditing, setIsEditing] = useState(false);// inquiry작성
  const [title, setTitle] = useState(inquiry?.title);
  const [content, setContent] = useState(inquiry?.content);
  const reply = inquiry?.replyIds[0]  //populate한 것 중 첫번째 객체
  console.log('reply :',reply)
  
  const [editable, setEditable] = useState(false) // reply작성
  const [replyValue, setReplyValue] = useState('')
  const {user} = userStore()
  const {createReply, updateReply, deleteReply} = replyStore()
  const {showToastMessage} = uiStore()

 

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
  const onReplyClick=()=>{
    if(user?.level !== 'admin'){
      showToastMessage('관리자 외에는 답변을 못합니다.', 'error')
      return;
    }
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
      setReplyValue('')
    } else if(e.key ==='Escape'){
      e.preventDefault()
      setEditable(false)
      setReplyValue('')
    }
  }

  return (
    <div>
      {isEditing ? (
        <Form style={{padding:'10px', border:'1px solid black', width: '70vw'}}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">
            <Form.Label column sm="2">
              제목
            </Form.Label>
            <Col sm="10">
              <Form.Control 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextContent">
            <Form.Label column sm="2">
              내용
            </Form.Label>
            <Col sm="10">
              <Form.Control 
                as="textarea" 
                rows={3}
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
              />
            </Col>
          </Form.Group>
          <Row className="mb-3">
            <div style={{display:'flex', justifyContent:'center', gap:'20px'}}>
              <Button variant="primary" onClick={handleUpdate}>저장</Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>취소</Button>
            </div>
          </Row>
        </Form>
      ) : (
        <div style={{padding:'10px', border:'1px solid black', width: '70vw'}}>
          <h3 style={{fontSize:'20px'}}>[{index+1}] 제목: {inquiry?.title}</h3>
        <div>
        <span style={{fontSize:'20px'}}>작성자: {inquiry?.author}</span>
        {/* <span>작성자: {inquiry?.authorId._id}</span> */}
        </div>
          <p style={{padding:'10px', border:'1px solid black', background:'#faff74',fontSize:'20px'}}>{inquiry?.content}</p>
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
            (<input 
              style={{paddingLeft:'10px', width:'500px'}}
              type='text' value={replyValue}
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
              placeholder={reply?.content}
              autoFocus
            />)
            : (<div style={{fontSize:'18px', width:'70vw', padding:'5px 10px', background:'#cce7c6'}} onClick={onReplyClick}className="todo-content">[답변]: {reply?.content}</div>)
          }    
        </div>

        <div>
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