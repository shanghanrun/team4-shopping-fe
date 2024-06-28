import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SearchBox from "../components/SearchBox";
import OrderDetailDialog from "../components/OrderDetailDialog";
import OrderTable from "../components/OrderTable";
import * as types from "../constants/order.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import inquiryStore from '../store/inquiryStore'
import replyStore from '../store/replyStore'
import uiStore from '../store/uiStore'
import {Button} from 'react-bootstrap'
import PreparingOrderTable from "../components/PreparingOderTable";
import OrderPrepareDialog from "../components/OrderPrepareDialog";
import AdminInquiryTable from "../components/AdminInquiryTable";
// 여기는 일단 페이지기능없고, 검색기능 없앤다.
const AdminInquiry = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const { inquiryList, getInquiryList, inquiryUpdated } = inquiryStore()
  const {replyUpdated} = replyStore()
  // const [showInquiry, setShowInquiry]=useState(false) //아직 답변 못한 문의사항들
  const [openPrepare, setOpenPrepare] = useState(false)
  // const [searchQuery, setSearchQuery] = useState({
  //   page: query.get("page") || 1,
  //   orderNum: query.get("orderNum") || "",
  // });
  const [open, setOpen] = useState(false);
  const tableHeader = [
    "#",
    "User",
    "Title",
    "Content",
    "Status",
  ];

  useEffect(() => {
    getInquiryList()
  }, [inquiryUpdated, replyUpdated]);

  const openReplyForm =()=>{

  }
  
  return (
    <div className="locate-center">
      <Container>
        <div>
          <div style={{margin:'30px 0'}}></div>
          <h3>고객 문의</h3>
          <h5>총 : {inquiryList.length} 개</h5>
        </div>
        <AdminInquiryTable 
          header={tableHeader}
          data={inquiryList}
        />
      </Container>

      
    </div>
  );
};

export default AdminInquiry;
