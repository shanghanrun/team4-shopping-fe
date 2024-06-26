import {create} from 'zustand'
import api from '../utils/api'

const replyStore = create((set,get)=>({
	reply:{},
	replyAuthor:'',
	replyUpdated:false,
	createReply: async (reviewId, inquiryId,content)=>{
		try{
			const resp = await api.post('/reply',{reviewId, inquiryId,content})
			if(resp.status !== 200) throw new Error(resp.error)
			set((state)=>({
				replyUpdated: !state.replyUpdated
			}))
		}catch(e){
			console.log(e.message)
		}
	},
	updateReply: async(replyId, content)=>{
		try{
			const resp = await api.put(`/reply/${replyId}`,{content})
			if(resp.status !== 200) throw new Error(resp.error)
			set((state)=>({
				replyUpdated: !state.replyUpdated
			}))
		}catch(e){
			console.log(e.message)
		}
	},
	deleteReply: async(replyId) =>{
		try{
			const resp = await api.delete(`/reply/${replyId}`)
			if(resp.status !== 200) throw new Error(resp.error)
			set((state)=>({
				replyUpdated: !state.replyUpdated
			}))
		}catch(e){
			console.log(e.message)
		}
	}
}))

export default replyStore;