import {Container, Button} from 'react-bootstrap'
import Inquiry from '../components/Inquiry';
import {useState, useEffect} from 'react'
import userStore from '../store/userStore'
import uiStore from '../store/uiStore'
import { useNavigate } from 'react-router-dom';
import InquiryList from '../components/InquiryList';
import inquiryStore from '../store/inquiryStore'

const Info =()=>{
	const [show, setShow] = useState(false)
	const {user} = userStore()
	const {showToastMessage}= uiStore()
	const navigate = useNavigate()
	const {getInquiryList, inquiryList, editInquiry, deleteInquiry, inquiryUpdated} = inquiryStore()

	useEffect(()=>{
		getInquiryList()
		console.log('inquiryList :', inquiryList)
	},[inquiryUpdated])

	const handleShowInquiry =()=>{
		if(!user){
			showToastMessage('로그인 먼저 해주세요','success')
			navigate('/login')
			return
		}
		setShow(true)
	}

	return(<div>
		<Container>
			<h5>MoviePage 이용방법</h5>
			<div>영화사이트로 이동한 후에</div>
			<img src="/image/movieinfo.png" alt=''/>
			<div>Choice 페이지를 방문해서 영화를 고르고, Reserve페이지에서 좌석을 여러개 선택합니다.</div>
			<div>다시 hm-shopping으로 돌아오면 'MyPage'에 예약한 영화와 좌석정보가 나옵니다.</div>
			<div style={{height:'20px'}}></div>
			<InquiryList 
				inquiryList={inquiryList} 
				editInquiry={editInquiry} 
				deleteInquiry={deleteInquiry} 
			/>
			<div style={{height:'20px'}}></div>
			<div>문의글을 작성하시려면, 로그인부터 해주세요.</div>
			<div style={{height:'20px'}}></div>
			<Button onClick={handleShowInquiry}>문의글 작성</Button>
			<div style={{height:'20px'}}></div>
			{show &&<Inquiry setShow={setShow}/>}
			<div style={{height:'100px'}}></div>
		</Container>
	</div>		
	)
}

export default Info;