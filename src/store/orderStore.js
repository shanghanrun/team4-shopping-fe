import {create} from 'zustand'
import api from '../utils/api'
import uiStore from './uiStore'
import cartStore from './cartStore'

const orderStore =create((set, get)=>({
	totalPrice:0,
	ship:{},
	payment:{},
	orderNum:'임시123',
	selectedOrder:{},
	orderList:[],
	normalList:[],// sort를 되돌리기 위한 임시 저장리스트
	totalPageNum:1,
	allUserOrderList:[],
	totalCount:1,
	orderUpdated: false,
	preparingOrders:[],
	setTotalPrice:(val)=>set({totalPrice: val}),
	setShip:(val)=>set({ship: val}),
	setPayment:(val)=>set({payment: val}),
	setSelectedOrder:(orderValue)=> set({selectedOrder: orderValue}),
	updateOrder: async(orderId, newStatus) => {
		try{
			const resp = await api.put('/order', {orderId, newStatus})
			console.log('업데이트되어 프론트로 온 order:', resp.data.updatedOrder)
			set({selectedOrder: resp.data.updatedOrder})

		}catch(e){
			console.log(e.error)
			uiStore.getState().showToastMessage(e.error, 'error');
		}
	},

	addOrder:(val)=>set({orderList:{...val}}),
	createOrder:async(data, navigate)=>{
		try{
			const resp = await api.post('/order', data)
			console.log('오더넘버:',resp.data.orderNum)
			set({orderNum: resp.data.orderNum})
			await cartStore.getState().emptyCart()
			// console.log('비우기 성공')
			//성공메시지는 생략하고, 결제성공 페이지로 이동
			navigate('/payment/success')
			
		}catch(e){
			console.log(e.error)
			uiStore.getState().showToastMessage(e.error, 'error'); 
		}
	},

	getOrderList:async(searchQuery)=>{
		// if(searchQuery.orderNum ===""){
		// 	delete searchQuery.orderNum
		// }
		console.log('getOrderList 서치쿼리', searchQuery)
		try{
			const resp = await api.get('/order',{params:searchQuery})
			// console.log('order목록:', resp.data.orderList)
			// console.log('page 정보:', resp.data.totalPageNum)
			set({
				orderList: resp.data.orderList,
				normalList: resp.data.orderList,
				totalPageNum: resp.data.totalPageNum
			})	
		}catch(e){
			console.log('e.error:', e.error)
			set({error: e.error})
		}
	},
	getAllUserOrderList:async(searchQuery)=>{  // admin에서 필요한 것
		try{
			const resp = await api.get('/order/all',{params:searchQuery})
			// console.log('order목록:', resp.data.data)
			// console.log('page 정보:', resp.data.totalPageNum)
			// console.log('getAlluserOrerList 객체:', resp)
			set({
				allUserOrderList: resp.data.data,
				totalPageNum: resp.data.totalPageNum,
				totalCount: resp.data.totalCount
			})	
		}catch(e){
			console.log('e.error:', e.error)
			set({error: e.error})
		}
	},
	sortOrderListByPreparing:()=>{
		//orderList의 아이템에는 status항목이 있고, 여기에는 'preparing', 'shipping' 등의 값이 들어간다.
		// status 항목이 'preparing'인 것들을 찾아내서 orderList의 앞쪽 아이템으로 등록하여,
		// set({orderList: 변화된 리스트})
		console.log('스토어 정렬 시작')
		const sortedOrderList = [...get().orderList].sort((a, b) => {
            if (a.status === 'preparing' && b.status !== 'preparing') {
                return -1; // 'preparing' 상태를 앞으로
            }
            if (a.status !== 'preparing' && b.status === 'preparing') {
                return 1; // 'preparing' 상태가 아닌 것을 뒤로
            }
            return 0; // 둘 다 'preparing'이거나 둘 다 'preparing'이 아닌 경우
        });
		console.log('스토어 preparing 기준 정렬 됨')
		console.log('sortedOderList :', sortedOrderList)
		set({
			orderList: sortedOrderList,
			orderUpdated: !get().orderUpdated
		})
	},
	sortOrderListByNormal:()=>{
		console.log('스토어 normal 정렬')
		set({
			orderList: get().normalList,
			orderUpdated: !get().orderUpdated
		})
	},
	getPreparingOrders:async()=>{
		try{
			const resp = await api.get('/order/preparing')
			set({
				preparingOrders:resp.data.data,
				orderUpdated: !get().orderUpdated
			})
		}catch(e){
			console.log('e.error:', e.error)
			set({error: e.error})
			uiStore.getState().showToastMessage(e.error, 'error');
		}
	}
}))

export default orderStore;