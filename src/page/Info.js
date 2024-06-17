import {Container} from 'react-bootstrap'

const Info =()=>{

	return(<div>
		<Container>
			<h5>MoviePage 이용방법</h5>
			<div>영화사이트로 이동한 후에</div>
			<img src="/image/movieinfo.png" alt=''/>
			<div>Choice 페이지를 방문해서 영화를 고르고, Reserve페이지에서 좌석을 여러개 선택합니다.</div>
			<div>다시 hm-shopping으로 돌아오면 'MyPage'에 예약한 영화와 좌석정보가 나옵니다.</div>
			<div></div>
			<div style={{height:'100px'}}></div>
			<h4>기타 서비스 준비중...</h4>
		</Container>
	</div>		
	)
}

export default Info;