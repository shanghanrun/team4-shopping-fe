import {create} from 'zustand'
import api from './../utils/api';

const inquiryStore = create((set,get)=>({
	inquiryList:[],
	myInquiryList:[],
	inquiryUpdated: false,
	createInquiry:async(newInquiry)=>{
		try{
			const resp = await api.post('/inquiry', newInquiry)
			set({
				inquiryUpdated: !get().inquiryUpdated
			})
			console.log('새 문의글이 등록되었습니다.')
			console.log('생성된 inquiry:', resp.data.data)
		}catch(e){
			console.log(e.error)
		}
	},
	getInquiryList:async()=>{
		try{
			const resp = await api.get('/inquiry')
			console.log('스토어에 들어온 inquiryList:', resp.data.data)
			set({inquiryList:resp.data.data})
		}catch(e){
			console.log(e.error)
		}
	},
	getMyInquiryList:async(userId)=>{
		try{
			const resp = await api.get('/inquiry/my/')
			set({myInquiryList: resp.data.data})
		}catch(e){
			console.log(e.error)
		}
	},
	deleteInquiry:async(inquiryId)=>{
		try{
			const resp = await api.delete('/inquiry/'+inquiryId)
			console.log('잘 삭제되었습니다.')
			set({
				inquiryUpdated: !get().inquiryUpdated
			})

		}catch(e){
			console.log(e.error)
		}
	},
	editInquiry:async(updatedInquiry)=>{
		try{
			const resp = await api.put('/inquiry', updatedInquiry)
			set({
				inquiryUpdated: !get().inquiryUpdated
			})
			console.log('업데이트된 inquiry:', resp.data.data)
		}catch(e){
			console.log(e.error)
		}
	}
}))

export default inquiryStore;