import {create} from 'zustand'
import api from '../utils/api'
import uiStore from './uiStore'
import cartStore from './cartStore' 

const userStore =create((set,get)=>({
	user:null,
	selectedUser:null,
	error:'',
	userList:[],
	totalUserCount:1,
	userUpdated:false,
	credit:0,
	coupon:0,
	leftCredit:0,
	leftCoupon:0,
	creditPlus:0,
	lastTotal:0,
	oftenBuyList:[],
	setCredit:(val)=>set({credit:val}),
	setCoupon:(val)=>set({coupon:val}),
	setLeftCred:(val)=>set({leftCredit: val}),
	setLeftCoup:(val)=>set({leftCoupon: val}),
	setCredPlus:(val)=>set({creditPlus: val}),
	setLTotal:(val)=>set({lastTotal: val}),
	setUserCreditCoupon:async(userId, credit,coupon, creditPlus)=>{
		try{
			console.log('주문시 credit, coupon, creditPlus:', credit,':',coupon,':',creditPlus)
			const resp = await api.post('/user/credit-coupon',{userId, credit,coupon,creditPlus})

			//우선 아무것도 안한다.
		}catch(e){
			console.log(e.error)
		}

	},
	setError:(val)=>set({error:val}),
	setSelectedUser:(user)=>{
		set({selectedUser: user})},
	createNewUser:async(name,email,level,memo,image)=>{ // admin에서 직접 생성하는 user
		try{
			const resp = await api.post('/user/new', {name,email,level,memo,image})
			set({
				selectedUser: resp.data.data,
				userUpdated: !get().userUpdated
			})
			uiStore.getState().showToastMessage('새 회원을 만들었습니다', 'success')
		}catch(e){
			console.log(e.error)
		}
	},
	updateUser:async(userId, level, memo, image)=>{
		console.log('userLevel :', level)
		try{
			const resp = await api.put('/user', {userId,level,memo, image})
			set({
				selectedUser: resp.data.data,
				userUpdated: !get().userUpdated
			})
			uiStore.getState().showToastMessage('회원정보를 수정했습니다.', 'success')
		}catch(e){
			console.log(e.error)
		}
	},
	updateUserPassword:async(userId, newPassword)=>{
		try{
			// console.log('스토어에 들어온 newPassword:',newPassword)
			const resp = await api.put('/user/new-password',{userId, newPassword})
			set({
				user: resp.data.data,
				selectedUser:resp.data.data,
				userUpdated: !get().userUpdated
			})
		}catch(e){
			console.log(e.error)
		}
	},
	updateUserShipTo:async(selectedAddress)=>{
		try{
			const userId = get().user._id
			const resp = await api.put('/user/new-shipTo',{userId, selectedAddress})
			set({
				user: resp.data.data,
				selectedUser:resp.data.data,
				userUpdated: !get().userUpdated
			})
		}catch(e){
			console.log(e.error)
		}
	},
	getUserList: async(searchQuery)=>{
		if(searchQuery?.name ===''){
			delete searchQuery.name;
		}
		try{
			const resp = await api.get('/user', {params:{...searchQuery}})
			set({
				userList: resp.data.data,
				totalUserCount:resp.data.data?.length
			})
		}catch(e){

		}
	},
	loginWithToken: async ()=> {
		// const token= sessionStorage.getItem('token') 이것 필요없다. api에서 알아서 해더에 넣도록 설정해 두었다.
		//그럼에도 불구하고, token값을 불러와서 token이 없을 경우에는 불필요한 백엔드 요청을 안하도록 하는 것이 좋다.
		const token = sessionStorage.getItem('token')
		if(!token) return;

		try{
			const resp = await api.get('/user/me')
			const u = resp.data.user
			const credit = u.credit
			const coupon = u.coupon
			set({
				user: u,
				credit: credit,
				coupon: coupon
			})
		} catch(e){
			console.log('e.error:', e.error)
			// set({error:e.error}) 이걸 안해야 Login페이지에 쓸데없는 에러메시지가 안나온다.
			set({error: ''})
			// this.logout()  zustand this사용 못한다.
			// invalid한 토큰삭제,user null로
			sessionStorage.clear()
			set({user:null})
		}
	},
	loginWithEmail: async ({email,password})=>{
		try{
			const resp = await api.post('/user/login', {email,password})
			console.log('resp', resp)
			const u = resp.data.user
			const t = resp.data.token
			const credit = u.credit
			const coupon = u.coupon
			set({
				user: u,
				credit: credit,
				coupon: coupon
			})
			sessionStorage.setItem('token',t)
		} catch(e){
			console.log('e :', e)
			set({error: e.error})
			uiStore.getState().showToastMessage(e.error, 'error');
		}
	},
	logout:()=> {   
		sessionStorage.clear()
		set({user:null})
		cartStore.getState().zeroCartCount()
	},
	loginWithGoogle: async (token)=>{
		try{
			const resp = await api.post('/user/google', {token})
			const u = resp.data.user
			const t = resp.data.token
			const credit = u.credit
			const coupon = u.coupon
			set({
				user: u,
				credit: credit,
				coupon: coupon
			})
			sessionStorage.setItem('token',t)
		}catch(e){
			console.log('e.error:', e.error)
			set({error: e.error})
			uiStore.getState().showToastMessage(e.error, 'error');
		}
	},
	registerUser: async({name,email,password}, navigate)=>{
		try{
			const resp = await api.post('/user', {email,password,name})
			console.log('회원등록 성공')
			// set({user: resp.data.data})
		
			set({userUpdated: !get().userUpdated})
			uiStore.getState().showToastMessage('회원가입을 완료했습니다.', 'success')
			navigate('/login')

		}catch(e){
			console.log(e.error)
			uiStore.getState().showToastMessage('회원가입실패','error')
		}
	},
	updateUserViewed:async(productId)=>{
		try{
			const resp = await api.put('/user/viewed', {productId})
			set({user: resp.data.data})
		}catch(e){
			console.log(e.error)
		}
	},
	updateUserReplyChecked:async()=>{
		try{
			const resp = await api.get('/user/replyChecked')
			set({
				user: resp.data.data,
				userUpdated: !get().userUpdated
			})
		}catch(e){
			console.log(e.error);
		}
	},
	getOftenBuyList: async (userPurchasedItems)=> {
		try {
			// 구매 항목을 필드값(구매 수량) 기준으로 내림차순 정렬
			const sortedList = userPurchasedItems.sort((a, b) => {
			const aValue = Object.values(a)[0];
			const bValue = Object.values(b)[0];
			return bValue - aValue;
			});
			//결과적으로 객체들이 정렬된다.

			// 정렬된 겍체들 리스트의 ObjectId를 순차적으로 배열로 추출
			const objectIds = sortedList.map(item => Object.keys(item)[0]);

			const resp = await api.post('/product/get-often-buy-list', { objectIds });

			set({oftenBuyList: resp.data.data })
		} catch (e) {
			console.log(e.error);
		}
	}


}))

export default userStore;