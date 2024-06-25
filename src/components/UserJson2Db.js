import React from 'react';
import {Button} from 'react-bootstrap'
import api from '../utils/api';
import uiStore from '../store/uiStore'

const UserJson2Db = () => {
	const {showToastMessage} = uiStore()

  const handleImport = async () => {
    try {
      const response = await api.get('/user/json-user-to-cloud');
	    showToastMessage(response.data.message, "success"); 
      console.log(response.data); // 응답 메시지를 콘솔에 출력
    } catch (error) {
      console.error('Error Json to cloud DB:', error);
	    showToastMessage('Error exporting json.', "error");
    }
  };

  return (
    <div>
      <Button style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', marginBottom:'10px'}}  onClick={handleImport}>User Json to cloud DB</Button>
    </div>
  );
};

export default UserJson2Db;
