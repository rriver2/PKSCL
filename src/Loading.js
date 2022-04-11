import './css/Loading.css';

import giraffe from './img/giraffe.png';
function Loading(props){

    return(
        <div className="LoadingContainer">
            <img src={giraffe} alt="기린" style={{ width: "150px", height: "150px"}} />
            <div>
                <div class="loading">
                <span></span>  
                <span></span>
                <span></span>
                </div>
            </div>
        </div>
    )
  }

export default Loading;