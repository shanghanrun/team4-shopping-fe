import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SearchBox from "../components/SearchBox";
import OrderDetailDialog from "../components/OrderDetailDialog";
import OrderTable from "../components/OrderTable";
import * as types from "../constants/order.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import orderStore from '../store/orderStore'
import uiStore from '../store/uiStore'
import {Button} from 'react-bootstrap'
import PreparingOrderTable from "../components/PreparingOderTable";
import OrderPrepareDialog from "../components/OrderPrepareDialog";

const AdminOrderPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const { orderList, totalPageNum,setSelectedOrder,selectedOrder, getAllUserOrderList, allUserOrderList, totalCount, getPreparingOrders, preparingOrders } = orderStore()
  const [showPreparingOrder, setShowPreparingOrder]=useState(false)
  const [openPrepare, setOpenPrepare] = useState(false)
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    orderNum: query.get("orderNum") || "",
  });
  const [open, setOpen] = useState(false);
  const tableHeader = [
    "#",
    "Order#",
    "Order Date",
    "User",
    "Order Item",
    "Address",
    "Total Price",
    "Status",
  ];

  useEffect(() => {
    getAllUserOrderList(searchQuery)
    getPreparingOrders()
  }, [query, selectedOrder]);

  useEffect(() => {
    if (searchQuery.orderNum === "") {
      delete searchQuery.orderNum;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();
    console.log('admin orderPage queryString:', queryString)

    navigate("?" + queryString);
  }, [searchQuery]);

  const openEditForm = (order) => {
    setOpen(true);
    setSelectedOrder(order)
  };
  const openPreparingEditForm = (order) => {
    setOpenPrepare(true);
    setSelectedOrder(order)
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePrepareClose=()=>{
    setOpenPrepare(false)
  }

  const deleteItem = async (id) => {
    //아이템 삭제하기 - 이것은 아직 구현하지 않았다.!!
    // 굳이 삭제할 필요까지는 없을 것 같다.
    const confirmed = window.confirm("정말로 삭제하시겠습니까?")
    if(confirmed){
      // await deleteOrder(id)
    }
  };

  const togglePreparingOrderTable=()=>{
    setShowPreparingOrder(!showPreparingOrder)
  }

  return (
    <div className="locate-center">
      <Container>
        <div className="mt-2 display-center mb-2">
          <SearchBox
            query={query}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="오더번호"
            field="orderNum"
          />
        </div>
        <Button variant='warning' style={{marginBottom:'10px',boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}} onClick={togglePreparingOrderTable}>{showPreparingOrder? 'Preparing 품목보기 취소' :'Preparing 품목보기'}</Button>
        <h5>Total Orders: {totalCount} 품목</h5>

        <PreparingOrderTable
          header={tableHeader}
          data ={preparingOrders}
          deleteItem={deleteItem}
          openEditForm={openPreparingEditForm}
          show={showPreparingOrder}
          setShowPreparingOrder={setShowPreparingOrder}
        />

        <div style={{height:'20px'}}></div>
        <OrderTable
          header={tableHeader}
          data={allUserOrderList}
          openEditForm={openEditForm}
        />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNum}
          forcePage={searchQuery.page - 1}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination display-center list-style-none"
          activeClassName="active"
        />
      </Container>

      {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
      {openPrepare && <OrderPrepareDialog open={openPrepare} handleClose={handlePrepareClose} />}
    </div>
  );
};

export default AdminOrderPage;
