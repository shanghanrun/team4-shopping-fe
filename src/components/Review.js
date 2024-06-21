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

const Review = ({user,product}) => {
  const {showToastMessage} = uiStore()
  const {getAllUserReviewList, getUserReviewList, reviewUpdated, setSelectedReview,totalReviewCount} = reviewStore()
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode]  = useState('new')

  useEffect(()=>{
    getAllUserReviewList()
    getUserReviewList()
  },[reviewUpdated])

  const openEditForm =(review)=>{
    setMode('edit')
    setSelectedReview(review)
    setShowDialog(true)
  }
  const handleNewReviewClick=()=>{
    setMode('new')
    setShowDialog(true)
  }


  return (
    <div className="locate-center">
      <Container>
        
        <Button className="mt-2 mb-2" onClick={handleNewReviewClick}>
          Add New Review +
        </Button>
        

        <div style={{display:'flex', gap:'40px'}}>
          <h5>Total Reviews: {totalReviewCount} 개</h5>
        </div>
        <div style={{height:'20px'}}></div>
      </Container>

      <NewReviewDialog
        user={user}
        product={product}
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        />
    </div>
  )
}

export default Review