import React from 'react';
import {Button} from 'react-bootstrap'
import api from '../utils/api';
import uiStore from '../store/uiStore'

const ProductJson2Db = () => {
	const {showToastMessage} = uiStore()

  const handleImport = async () => {
    try {
      const response = await api.get('/product/json-to-cloudDb');
	  showToastMessage(response.data.message, "success"); 
      console.log(response.data); // 응답 메시지를 콘솔에 출력
    } catch (error) {
      console.error('Error Json to cloud DB:', error);
	  showToastMessage('Error exporting json.', "error");
    }
  };

  return (
    <div>
      <Button onClick={handleImport}>Product Json to cloud DB</Button>
    </div>
  );
};

export default ProductJson2Db;
