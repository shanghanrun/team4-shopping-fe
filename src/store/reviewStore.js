import {create} from 'zustand'
import api from './../utils/api';


const reviewStore = create((set, get)=>({
	selectedReview: null,
	userReviewList: [], // 해당 유저가 작성한 리뷰
	itemReviewList:[],  // 해당 아이템에 대한 리뷰
	AllReviewList:[],  //  admin이 살필 수 있는 모든 리뷰
	reviewUpdated: false,
	createReview:async(data)=>{ // data에 userId, productId,및 정보 들어옴
		try{
			const resp = await api.post('/review', {data})
			// 리뷰페이지 상황에 따라 백엔드에서 만든 리뷰를 반환, 여기의 selectedReview에 넣을 수 있다.
		}catch(e){
			console.log(e.error)
		}
	},
	getItemReviewList:async(productId)=>{
		try{
			const resp = await api.get('/review/'+productId)
			set({ 
				itemReviewList: resp.data.data,
				reviewUpdated: !get().reviewUpdated 
			})
		}catch(e){
			console.log(e.error)
		}
	},
	getUserReviewList:async()=>{
		try{
			const resp = await api.get('/review/my-review')
			set({
				userReviewList: resp.data.data,
				reviewUpdated: !get().reviewUpdated 
			})
		}catch(e){
			console.log(e.error)
		}
	},
	getAllReviewList:async()=>{
		try{
			const resp = await api.get('/review')
			set({
				allReviewList: resp.data.data,
				reviewUpdated: !get().reviewUpdated 
			})
		}catch(e){
			console.log(e.error)
		}
	},
	updateReview: async(data)=>{   // reviewId 및 업데이트 데이터
		try{
			const resp = await api.put('/review', {data})
			set({
				selectedReview: resp.data.data,
				reviewUpdated: !get().reviewUpdated 
			})
		}catch(e){
			console.log(e.error)
		}
	},
	deleteReview:async(reviewId)=>{
		try{
			const resp = await api.delete('/review/'+reviewId)
			console.log('잘 삭제되었습니다.')
			set({
				reviewUpdated: !get().reviewUpdated 
			})
		}catch(e){
			console.log(e.error)
		}
	}
}))