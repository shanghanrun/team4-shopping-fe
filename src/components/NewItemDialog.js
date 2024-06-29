import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { Form, Modal, Button, Row, Col, ListGroup } from "react-bootstrap";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";
import { CATEGORY, STATUS, SIZE } from "../constants/product.constants";
import {category} from '../constants/category.constants'
import "../style/adminProduct.style.css";

import uiStore from '../store/uiStore';
import productStore from '../store/productStore'

const InitialFormData = {
  name: "",
  sku: "",
  kind:"clothes", // 기본값 설정  이게 있어야 나중에 SIZES[formData.kind] 값이 undefined가 안 될 수 있다.
  stock: {},
  brand:"LG",  // 디폴트 밸류를 넣어두어야 선택안했을 경우 이거라도 들어간다.
  image: "",
  description: "",
  category: [],
  status: "active",
  price: 0,
  onePlus:false,
  freeDelivery:false,
  salePercent:0
};

const KIND=[
  "clothes", "home", "animal", "jewelry", "bags", "shoes", "it", "etc"
]
const SIZES ={
  "clothes": [ 'xs','s', 'm', 'l', 'xl'],
  "home":['s', 'm', 'l'],
  "bags":['s', 'm','l'],
  "animal":['live','dead'],
  "shoes": ['230','240','250','260','270','280','290'],
  "jewelry":['gold', 'silver', 'metal', 'glass', 'purl','etc'],
  "it":['small', 'big', 'huge'],
  "etc":['only One Choice']
}
const BRAND=[
  'LG', 'SAMSUNG','CJ'
]

const NewItemDialog = ({ mode, showDialog, setShowDialog }) => {
  const {error, selectedProduct,createProduct,editProduct} = productStore()
  // console.log('newItemDialog selectedProduct :', selectedProduct)
  const navigate = useNavigate()
  // const [selectedFormData, setSelectedFormData]=useState({})
  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : {}
  );
  const [stock, setStock] = useState([]);
  const [stockError, setStockError] = useState(false);

  const handleClose = () => {
    //모든걸 초기화시키고;
    // 다이얼로그 닫아주기
    setFormData({...InitialFormData}) //그런데 안먹힌다.
    setShowDialog(false)
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // console.log('formData :', formData)
    // [ ['s':3, 'xl':2] ] --> {s;3, xl;2}
    //재고를 입력했는지 확인, 아니면 에러
    if(stock.length ===0) return setStockError(true)

    const totalStock = stock.reduce((total, item)=>{
      return {...total, [item[0]] : parseInt(item[1])}
    },{})
    console.log('totalStock :', totalStock)

     const finalFormData = { ...formData, stock: totalStock};
    if (mode === "new") {
      await createProduct(finalFormData, navigate);
    } else {
      await editProduct(finalFormData, navigate);
      console.log('입력마친 final FormData :', finalFormData)
    }
    setStockError(false); 
    setShowDialog(false);
  };

  const handleChange = (event) => {
    //form에 데이터 넣어주기
    const {id, value} = event.target    // e.target.value는 숫자가 문자로 변환된다.
    let newValue = value    

    if (id ==='salePercent'){
      newValue = parseInt(value,10)  // 이상하게 문자로 받아진다
      const salePrice = formData.price *(1- newValue /100)
      console.log('salePercent :', newValue)
      setFormData({...formData, [id]:newValue, salePrice: salePrice})
    } else if (id === 'onePlus' || id ==='freeDelivery') {
      newValue = value === 'true'
      setFormData({...formData, [id]:newValue})
    } else{
      setFormData({...formData, [id]: value})
    }
  };

  const addStock = () => {
    //재고타입 추가시 배열에 새 배열 추가
    setStock([...stock, []])
  };
  const deleteStock = (idx) => {
    //재고 삭제하기
    //배열에서의 요소 삭제는 filter로 하는 것이 가장 일반적이다.
    const newStock = stock.filter((item,i)=> i !== idx)
    setStock(newStock)
  };

  const handleSizeChange = (value, index) => {
    //  재고 사이즈 변환하기
    // [["s",3], ['m',4],['xl',5]
    const newStock = [...stock]
    newStock[index][0] = value;
    setStock(newStock);
  };
  
  const handleStockChange = (value, index) => {
    //재고 수량 변환하기
    const newStock =[...stock]
    newStock[index][1] = value
    setStock(newStock)
  };


  const onHandleCategory = (event) => {
    //이미 선택되었으면 제거
    if (formData.category.includes(event.target.value)) {
      const newCategory = formData.category.filter(
        (item) => item !== event.target.value
      );
      setFormData({
        ...formData,
        category: [...newCategory],
      });
    } else { //선택 안되었으면 추가
      setFormData({
        ...formData,
        category: [...formData.category, event.target.value],
      });
    }
  };

  const uploadImage = (url) => {
    //이미지 업로드
    setFormData({...formData, image: url})
  };

  const convertSelectedProduct=(product)=>{
    const stock =[]
    const keys = Object.keys(product.stock)
    console.log('keys :', keys)
    keys.forEach((key)=>{
      stock.push([key, product.stock[key]])
    })
    console.log('변환된 stock :', stock)
    setStock(stock)
    console.log('변환된 selected product:', {...product, stock})
    return {...product, stock}
  }
  // const convert=(product)=>{
  //   const stock = Object.keys(product.stock).map((key)=>[key,product.stock[key]])
  //   setStock(stock)
  //   return {...product, stock}
  // }
  useEffect(() => {
    if (showDialog) {
      if (mode === "edit") {
        // 선택된 데이터값 불러오기 (재고 형태 객체에서 어레이로 바꾸기)
        const result = convertSelectedProduct(selectedProduct)
        setFormData(result)
      } else {
        // 초기화된 값 불러오기
        // 이것은 의미 없을 것 같기도 한데...
        setFormData({...InitialFormData})
        setStock([]); // 초기화
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
              {category.map((item, idx) => (
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

export default NewItemDialog;
