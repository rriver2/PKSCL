import { propTypes } from 'react-bootstrap/esm/Image';
import './css/CertFile.css';

function AlertBox(props){
    return(
      <div className="certFileContainer">
      <div className="certFileBox">
        <h2><i class="fas fa-exclamation-circle"/>페이지를 나가시겠습니까?</h2>
        <br/>
        {props.student}
        <img src= {`https://codingapple1.github.io/shop/shoes2.jpg`} width={"300px"} height={"400px"} alt=""/>
        <p>페이지를 나가면 내용이 저장되지 아니옵니다.</p>
        <div className="certFileBtns">
        <button className="errorBtn">나가기</button>
        <button className="errorBtn">저장하기</button>
        </div>
      </div>
    </div>
    )
    
  }
  
export default AlertBox;