import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { Form, Modal, Button, Row, Col, ListGroup } from "react-bootstrap";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";

import "../style/adminProduct.style.css";

import uiStore from '../store/uiStore';
import productStore from '../store/productStore'
import reviewStore from '../store/reviewStore'

const STAR=[
  '1','2','3','4','5'
]

const NewReviewDialog = ({ user,product,selectedReview,mode, showDialog, setShowDialog }) => {
  const InitialFormData = {
    author: user?.name,
    authorId: user?._id,
    productId: product?._id,
    title:"",
    image: "",
    content: "",
    star: 1
  };
  const DefaultFormData = {
    _id: selectedReview?._id,
    author: selectedReview?.author,
    authorId: selectedReview?.authorId,
    productId: selectedReview?.productId,
    title:selectedReview?.title,
    image:selectedReview?.image,
    content:selectedReview?.content,
    star: selectedReview?.star
  };


  const {error, createReview,editReview} = reviewStore()
  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : {}
  );

  const handleClose = () => {
    setFormData({...InitialFormData}) 
    setShowDialog(false)
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (mode === "new") {
      await createReview(formData);
      console.log('입력마치고 보내는 formData:', formData)
    } else {
      console.log('입력마친 formData :', formData)
      await editReview(formData);
      
    }
    setShowDialog(false);
  };

  const handleChange = (event) => {
    const {id, value} = event.target    // e.target.value는 숫자가 문자로 변환된다.
    let newValue = value    

    if (id ==='star'){
      newValue = parseInt(value,10)  // 이상하게 문자로 받아진다
      setFormData({...formData, [id]:newValue})
    } else{
      setFormData({...formData, [id]: value})
    }
  };

  const uploadImage = (url) => {
    //이미지 업로드
    setFormData({...formData, image: url})
  };
  const convertToStar = (star) => {
    return '⭐'.repeat(star);
  };
 
  useEffect(() => {
    if (showDialog) {
      if (mode === "edit") {
        setFormData({...DefaultFormData})
      } else {
        // 초기화된 값 불러오기
        // 이것은 의미 없을 것 같기도 한데...
        setFormData({...InitialFormData})// 초기화
      }
    }
  }, [showDialog]);
  //에러나면 토스트 메세지 보여주기

  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        {mode === "new" ? (
          <Modal.Title>Create New Review</Modal.Title>
        ) : (
          <Modal.Title>Edit Review</Modal.Title>
        )}
      </Modal.Header>

      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="title">
            <Form.Label>제목</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="제목을 적어주세요"
              required
              value={formData.title}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="star">
            <Form.Label>평점</Form.Label>
            <Form.Select
              value={formData.star}
              onChange={handleChange}
              required
            >
              {STAR.map((item, idx) => (
                <option key={idx} value={item}>
                  {convertToStar(item)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="Image" required>
            <Form.Label>Image</Form.Label>
            <CloudinaryUploadWidget uploadImage={uploadImage} />

            <img
              id="uploadedimage"
              src={formData.image}
              className="upload-image mt-2"
              alt="uploadedimage"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="content">
            <Form.Label>제품 리뷰</Form.Label>
            <Form.Control
              type="string"
              placeholder=""
              as="textarea"
              onChange={handleChange}
              rows={3}
              value={formData.content}
              required
            />
          </Form.Group>
        </Row>
        {mode === "new" ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Edit
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default NewReviewDialog;
