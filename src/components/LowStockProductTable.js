import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../utils/number";

const LowStockProductTable = ({ header, data, deleteItem, openEditForm,show, setShowLowStockProduct }) => {

function closeThis(){
  setShowLowStockProduct(false)
}
  
  return (
    <div className={`overflow-x ${show? "active":"inactive"}`} style={{background:'pink'}}>
      <h5 style={{marginTop:"10px"}}>재고부족 상품 : {data?.length} 개 (stock이 5개 이하인 경우)</h5>
      <h6>재고부족 상품 테이블을 지우려면, '재고부족 상품검색 취소'를 누르거나, 테이블 head를 클릭하세요.</h6>
      <h6>재고부족 상품은, Edit을 통해 수량을 늘려주세요.</h6>
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
              <tr key={index}>
                <th>{index}</th>
                <th>{item.sku}</th>
                <th style={{ minWidth: "100px", maxWidth:"160px",wordWrap:'break-word' }}>{item.name}</th>
                <th>{currencyFormat(item.price)}</th>
                <th>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size}:{item.stock[size]}
                    </div>
                  ))}
                </th>
                <th>
                  <img src={item.image} width={100} alt="image" />
                </th>
                <th>{item.status}</th>
                <th style={{ minWidth: "100px" }}>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteItem(item._id)}
                    className="mr-1"
                  >
                    -
                  </Button>
                  <Button size="sm" onClick={() => openEditForm(item)}>
                    Edit
                  </Button>
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
export default LowStockProductTable;
