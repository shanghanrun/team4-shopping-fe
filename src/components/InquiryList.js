import React from 'react';
import InquiryItem from './InquiryItem';

const InquiryList = ({ inquiryList, editInquiry, deleteInquiry }) => {

  return (
    <div>
      {inquiryList.map((inquiry,index) => (
        <InquiryItem 
          key={inquiry?._id} 
          index={index}
          inquiry={inquiry} 
          editInquiry={editInquiry} 
          deleteInquiry={deleteInquiry} 
        />
      ))}
    </div>
  );
};

export default InquiryList;