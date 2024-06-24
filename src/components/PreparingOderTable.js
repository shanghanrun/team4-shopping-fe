import React, {useState} from "react";
import {Button, Badge,Table} from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const PreparingOrderTable = ({ header, data, deleteItem, openEditForm,show, setShowPreparingOrder }) => {

function closeThis(){
  setShowPreparingOrder(false)
}
  
  return (
    <div className={`overflow-x ${show? "active":"inactive"}`} style={{background:'pink'}}>
      <h5 style={{marginTop:"10px"}}>출고준비 중인 상품 : {data?.length} 개</h5>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index} onClick={closeThis} style={{ cursor: 'pointer' }}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} onClick={()=>openEditForm(item)}>
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
      <div style={{height:'10px'}}></div>
    </div>
  );
};
export default PreparingOrderTable;
