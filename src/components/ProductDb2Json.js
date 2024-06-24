import React, { useState } from 'react';
import api from '../utils/api';
import {Button} from 'react-bootstrap'
import uiStore from '../store/uiStore'

//몽고디비의 products 컬렉션 자료를 백앤드에 csv로 저장
const ProductDb2Json = () => {
	const {showToastMessage} = uiStore()
	
  const downloadJson = async () => {
    try {
      const response = await api.get('/product/cloudDb-to-json');
      showToastMessage(response.data.message, "success"); // 응답 메시지를 상태로 저장
    } catch (error) {
      console.error('Error downloading Json file:', error);
      showToastMessage('Error exporting Json.', "error");
    }
  };

  return (
    <div style={{marginBottom: '10px'}} >
      <Button variant="success" style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}} 
        onClick={downloadJson}>Download ProductDb to Json</Button>
    </div> 
  );
};

export default ProductDb2Json;
