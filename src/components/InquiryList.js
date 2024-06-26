import React from 'react';
import InquiryItem from './InquiryItem';

const InquiryList = ({ inquiryList, editInquiry, deleteInquiry }) => {

  return (
    <div>
      {inquiryList.map(inquiry => (
        <InquiryItem 
          key={inquiry?._id} 
          inquiry={inquiry} 
          editInquiry={editInquiry} 
          deleteInquiry={deleteInquiry} 
        />
      ))}
    </div>
  );
};

export default InquiryList;