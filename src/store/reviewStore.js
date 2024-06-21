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
			console.log('스토어로 들어온 formData :', data)
			const resp = await api.post('/review', data) // {data}가 아닌 data
			console.log('스토어로 받은 review', resp.data.data)
			set({
				selectedReview: resp.data.data,
				reviewUpdated: !get().reviewUpdated
			})
		}catch(e){
			console.log(e.error)
		}
	},
	getItemReviewList:async(productId)=>{
		try{
			const resp = await api.get('/review/'+productId)
			console.log('스토어 getItemReviewList 시작. productId :', productId)
			set({ 
				itemReviewList: resp.data.data,
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
			console.log('리뷰가 잘 삭제되었습니다.')
			set({
				reviewUpdated: !get().reviewUpdated 
			})
		}catch(e){
			console.log(e.error)
		}
	}
}))

export default reviewStore;