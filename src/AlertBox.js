import './AlertBox.css';

function AlertBox(){
    return(
      <div className="errorContainer">
      <div className="errorBox">
        <h2><i class="fas fa-exclamation-circle"/>페이지를 나가시겠습니까?</h2>
        <br/>
        <p>페이지를 나가면 내용이 저장되지 아니옵니다.</p>
        <div className="errorBtns">
        <button className="errorBtn">나가기</button>
        <button className="errorBtn">저장하기</button>
        </div>
      </div>
    </div>
    )
    
  }
  
export default AlertBox;