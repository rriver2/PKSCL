import { propTypes } from 'react-bootstrap/esm/Image';
import './css/CertFile.css';

function AlertBox(props){
    return(
      <div className="certFileContainer">
      <div className="certFileBox">
        <div style={{display : "flex", justifyContent: "flex-end", width: "100%"}}>
            <button className="CertFileButton" onClick={()=>{props.setCertFile(false)}}><i className="fas fa-times"></i></button>
        </div>
        <br/>
        <img src= {props.certFileStudnet["studentImgPath"]} width={"auto"} height={"500vh"} alt=""/>
      </div>
    </div>
    )
    
  }
  
export default AlertBox;