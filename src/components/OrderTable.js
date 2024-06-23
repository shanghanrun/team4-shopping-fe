import React, {useState} from "react";
import { Table, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";
import orderStore from '../store/orderStore'

const OrderTable = ({ header, data, openEditForm }) => {
  const {sortOrderListByPreparing, sortOrderListByNormal} = orderStore()
  const [sortByPrepare, setSortByPrepare] =useState(true)
  
  const sortByPreparing =()=>{
    console.log('정렬 실행됨')
    if(sortByPrepare){
      console.log('preparing 기준 정렬 시작')
      sortOrderListByPreparing()
    } else{
      console.log('원래 정렬')
      sortOrderListByNormal()
    }
    setSortByPrepare(!sortByPrepare)
  }


  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title,i) => (
              <th key={i} onClick={sortByPreparing} style={{ cursor: 'pointer' }}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} onClick={() => openEditForm(item)}>
                <th>{index}</th>
                <th>{item.orderNum}</th>
                <th>{item.updatedAt.slice(0, 10)}</th>
                <th>{item.email}</th>
                {item.items.length > 0 ? (
                  <th style={{maxWidth:"160px"}}>
                    {item.items[0].name}
                    {item.items.length > 1 && ` 외 ${item.items.length - 1}개`}
                  </th>
                ) : (
                  <th></th>
                )}

                <th>{item.shipTo.address + " " + item.shipTo.city}</th>

                <th>{currencyFormat(item.totalPrice)}</th>
                <th>
                  <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
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
export default OrderTable;
