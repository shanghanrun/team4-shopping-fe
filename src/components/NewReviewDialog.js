import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { Form, Modal, Button, Row, Col, ListGroup } from "react-bootstrap";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";
import { CATEGORY, STATUS, SIZE } from "../constants/product.constants";
import "../style/adminProduct.style.css";

import uiStore from '../store/uiStore';
import productStore from '../store/productStore'
import reviewStore from '../store/reviewStore'

const KIND=[
  "women", "men", "kids", "accessories", "bags", "shoes", "jewelry"
]

const NewReviewDialog = ({ user,product, mode, showDialog, setShowDialog }) => {
  const InitialFormData = {
    author: user.name,
    authorId: user._id,
    productId: product._id,
    title:"",
    image: "",
    content: "",
    star: 1
  };
  const DefaultFormData = {
    author: selectedReview.author,
    authorId: selectedReview.authorId,
    productId: selectedReview.productId,
    title:selectedReview.title,
    image:selectedReview.image,
    content:selectedReview.content,
    star: selectedReview.star
  };


  const {error, selectedReview,createReview,editReview} = reviewStore()
  const navigate = useNavigate()
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
      await createReview(formData, navigate);
    } else {
      await editReview(formData, navigate);
      console.log('입력마친 formData :', formData)
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
          <Modal.Title>Create New Product</Modal.Title>
        ) : (
          <Modal.Title>Edit Product</Modal.Title>
        )}
      </Modal.Header>

      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="sku">
            <Form.Label>Sku</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Enter Sku"
              required
              value={formData.sku}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Name"
              required
              value={formData.name}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="string"
            placeholder="Description"
            as="textarea"
            onChange={handleChange}
            rows={3}
            value={formData.description}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="kind">
            <Form.Label>Kind</Form.Label>
            <Form.Select
              value={formData.kind}
              onChange={handleChange}
              required
            >
              {KIND.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
        </Form.Group>

{/* 
        kind 가 null이 아닐 때 나타나게 한다.
        knid에 따라서 SIZE 항목이 달라진다. 
        
        {kind && 식으로 하면 될 것 같다.}
        */}
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label className="mr-1">Stock</Form.Label>
          {stockError && (
            <span className="error-message">재고를 추가해주세요</span>
          )}
          <Button size="sm" onClick={addStock}>
            Add +
          </Button>
          <div className="mt-2">
            {stock.map((item, index) => (
              <Row key={`${index}${item[0]}`}>
                <Col sm={4}>
                  <Form.Select
                    onChange={(event) =>
                      handleSizeChange(event.target.value, index)
                    }
                    required
                    value={item[0] ? item[0].toLowerCase() : ""}
                  >
                    <option value="" disabled selected hidden>
                      Please Choose...
                    </option>
                    {SIZES[formData.kind].map((size, index) => (
                      <option
                        invalid="true"
                        value={size.toLowerCase()}
                        disabled={stock.some(
                          (item) => item[0] === size.toLowerCase()
                        )}
                        key={index}
                      >
                        {size}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm={6}>
                  <Form.Control
                    onChange={(event) =>
                      handleStockChange(event.target.value, index)
                    }
                    type="number"
                    placeholder="number of stock"
                    value={item[1]}
                    required
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteStock(index)}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </Form.Group>

        <Form.Group as={Col} controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Select
              value={formData.brand}
              onChange={handleChange}
              required
            >
              {BRAND.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
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

        <Row className="mb-3">
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={formData.price}
              required
              onChange={handleChange}
              type="number"
              placeholder="0"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              multiple
              onChange={onHandleCategory}
              value={formData.category}
              required
            >
              {CATEGORY.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          
          <Form.Group as={Col} controlId="onePlus">
            <Form.Label>OnePlus</Form.Label>
            <Form.Select
              value={formData.onePlus.toString()}
              onChange={handleChange}
              required
            >
              {["true", "false"].map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="freeDelivery">
            <Form.Label>Free Deliver</Form.Label>
            <Form.Select
              value={formData.freeDelivery.toString()}
              onChange={handleChange}
              required
            >
              {["true", "false"].map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="salePercent">
            <Form.Label>Sale Percent</Form.Label>
            <Form.Select
              value={formData.salePercent}
              onChange={handleChange}
              required
            >
              {[0,15,30,50].map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={handleChange}
              required
            >
              {STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
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
