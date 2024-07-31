import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import reviewStore from '../store/reviewStore'
import userStore from '../store/userStore'

const ReviewTable = ({ header, data, deleteItem, openEditForm }) => {
  // const {sortProductListBySkuDesc, sortProductListBySkuAsc } = productStore()
  // const [sortBySkuDesc, setSortBySkuDesc] = useState(true);
  const {user} = userStore()

  const convertToStar2 = (star) => {
    return ('⭐'.repeat(star));
  };
 
  
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index} style={{ cursor: 'pointer' }}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item.title}</th>
                <th>{item.author}</th>
                <th>
                  <img src={item.image} width={100} alt="image" />
                </th>
                
                <th>{item.content}</th>
                <th>{convertToStar2(item.star)}</th>
                
                <th style={{ minWidth: "100px" }}>
                  {user && (user?.name === item.author)? 
                    <div>
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
                    </div>
                    :<div></div>
                    }
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
export default ReviewTable;
