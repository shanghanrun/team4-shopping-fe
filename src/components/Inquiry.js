import React, { useState, useEffect } from 'react';
import InquiryForm from './InquiryForm';
import inquiryStore from '../store/inquiryStore'

const Inquiry=({setShow})=> {
	const {createInquiry} = inquiryStore()

  return (
    <div>
      <h1>고객 문의</h1>
      <InquiryForm 
        createInquiry={createInquiry} 
        setShow={setShow}
      />
    </div>
  );
}

export default Inquiry;
