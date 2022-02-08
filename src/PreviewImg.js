import './css/PreviewImg.css';

function PreviewImg(props){
    return(
      <div className="previewImgContainer">
      <div className="previewImgBox">
        <div style={{display : "flex", justifyContent: "flex-end", width: "100%"}}>
            <button className="previewImgButton" onClick={()=>{props.setShowImg(false)}}>
                <i className="fas fa-times"></i></button>
        </div>
      </div>
    </div>
    )
    
  }
  
export default PreviewImg;