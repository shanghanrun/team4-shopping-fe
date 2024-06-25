import React, { useState } from 'react';
import InquiryForm from './InquiryForm';
import InquiryList from './InquiryList';
import inquiryStore from '../store/inquiryStore'

const Inquiry=()=> {
	const {createInquiry, getInquiryList, inquiryList, updateInquiry} = inquiryStore()
  const [inquiries, setInquiries] = useState([]);

  const addInquiry = async (inquiry) => {
    setInquiries([...inquiries, inquiry]);
	await createInquiry(inquiry)
  };

  const editInquiry = async(id, updatedInquiry) => {
    setInquiries(inquiries.map(inquiry => inquiry.id === id ? updatedInquiry : inquiry));
	await updateInquiry(id, updatedInquiry)
  };

  const deleteInquiry = (id) => {
    setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
  };

  return (
    <div>
      <h1>고객 문의</h1>
      <InquiryForm addInquiry={addInquiry} />
      <InquiryList 
        inquiries={inquiries} 
        editInquiry={editInquiry} 
        deleteInquiry={deleteInquiry} 
      />
    </div>
  );
}

export default Inquiry;
