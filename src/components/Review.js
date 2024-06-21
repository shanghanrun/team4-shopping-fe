import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../components/SearchBox";
import productStore from '../store/productStore'
import uiStore from '../store/uiStore'
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import userStore from '../store/userStore';
import reviewStore from '../store/reviewStore';
import replyStore from '../store/replyStore';
import NewReviewDialog from "./NewReviewDialog";
import ReviewTable from "./ReviewTable";

const Review = ({user,product}) => {
  const {showToastMessage} = uiStore()
  const {itemReviewList, deleteReview,setSelectedReview,selectedReview, totalReviewCount} = reviewStore()
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode]  = useState('new')

  // useEffect(()=>{
  //   getItemReviewList(product._id)
  // },[reviewUpdated])

  const openEditForm =(review)=>{
    setMode('edit')
    setSelectedReview(review)
    setShowDialog(true)
  }
  const handleNewReviewClick=()=>{
    setMode('new')
    setShowDialog(true)
  }

  const tableHeader=[
    "#",
    "제목",
    "작성자",
    "Image",
    "내용",
    "평점",
    "",
  ]
  const deleteThisReview = async (id) => {
    //아이템 삭제하가ㅣ
    const confirmed = window.confirm("정말로 삭제하시겠습니까?")
    if(confirmed){
      await deleteReview(id)
    }
  };


  return (
    <div className="locate-center">
      <Container>
        
        <Button className="mt-2 mb-2" onClick={handleNewReviewClick}>
          Add New Review +
        </Button>
        

        <div style={{display:'flex', gap:'40px'}}>
          <h5>Total Reviews: {itemReviewList?.length} 개</h5>
        </div>
        <div style={{height:'20px'}}></div>

        <ReviewTable
          header={tableHeader}
          data={itemReviewList}
          deleteReview={deleteThisReview}
          openEditForm={openEditForm}
        />
      </Container>

      <NewReviewDialog
        user={user}
        product={product}
        selectedReview={selectedReview}
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        />
    </div>
  )
}

export default Review