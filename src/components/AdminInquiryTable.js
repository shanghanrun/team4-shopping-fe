import React, { useState } from "react";
import { Table, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import inquiryStore from '../store/inquiryStore';
import replyStore from '../store/replyStore';

const AdminInquiryTable = ({ header, data }) => {
  const badgeBg = {
    noReply: "danger",
    gotReply: "primary"
  };

  const { createReply, updateReply } = replyStore();
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [content, setContent] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [replyId, setReplyId] = useState('');

  const openReplyForm = (index, inquiryId, replyId, replyContent) => {
    setCurrentEditIndex(index);
    setIsUpdateMode(!!replyContent);
    setReplyId(replyId);
    setInquiryId(inquiryId);
    setContent(replyContent || '');
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleKeyUp = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isUpdateMode) {
        await createReply('', inquiryId, content);
      } else {
        await updateReply(replyId, content);
      }
      resetEditState();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      resetEditState();
    }
  };

  const resetEditState = () => {
    setCurrentEditIndex(null);
    setContent('');
    setIsUpdateMode(false);
    setReplyId('');
    setInquiryId('');
  };

  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, i) => (
              <th key={i} style={{ cursor: 'pointer' }}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item?.author}</th>
                <th>{item?.title}</th>
                <th>
                  {item?.content}
                  <br />
                  {currentEditIndex === index ? (
                    <input
                      type="text"
                      value={content}
                      onChange={handleInputChange}
                      onKeyUp={handleKeyUp}
                      autoFocus
                      style={{ background: '#c3f0c3', padding: '5px',width:'50vw' }}
                    />
                  ) : (
                    <span
                      style={{ background: '#c3f0c3', padding: '5px', cursor: 'pointer' }}
                      onClick={() => openReplyForm(index, item?._id, item?.replyIds[0]?._id, item?.replyIds[0]?.content)}
                    >
                      답변: {item?.replyIds[0]?.content ?? ''}
                    </span>
                  )}
                </th>
                <th>
                  <Badge bg={badgeBg[item?.status]}>{item?.status}</Badge>
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={header.length} style={{ textAlign: "center" }}>No Data to show</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminInquiryTable;
