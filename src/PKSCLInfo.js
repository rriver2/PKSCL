import './css/PKSCLInfo.css';
import React from 'react';
import Fade from 'react-reveal/Fade';

function PKSCLInfo(props){
    let logoImgPath = `./img/managementLogo.png`
    return(
      <div className="PKSCLInfoContainer">
          
      <div className="PKSCLInfoBox">
        
        <div style={{display : "flex", justifyContent: "flex-end", width: "100%"}}>
            <button className="PKSCLInfoBackButton" onClick={()=>{props.setPKSCLInfoButton(false)}}>
                <i className="fas fa-times"></i></button>
        </div>
              <Fade bottom> 
           <div className="PKSCLInfomationBox">
               <img src={logoImgPath} alt="logo" width={"80px"} height={"80px"}/>
                <h3 style={{marginTop:"10px",marginBottom:"20px"}}>"Pukyong Student Council Ledger"</h3>
                
                PKSCL은 부경대학교 재학생들이 이전보다 편리하고 신뢰도 있게<br/>
                학과 장부를 온라인으로 관리 및 열람하는 서비스를 제공합니다.
           </div>

           <div>여기 설명 적어야 하는데 뭐 적어야 할 지 모르겠움.. 그리고 유포하면 안된다 이런 말도 적어야 함 help me please 애니바디 데어???</div>

           <div className="PKSCLInfomationBox">
               <h4 style={{marginBottom:"20px"}}> 학생입장 사용법</h4>
               <div style={{display:"flex"}}>
                   <Fade bottom> 
               <span>1. 학생으로 회원가입<br/><img style={{marginRight:"20px"}} src={`./img/PKSCLInfo/studentSignIn.png`} alt="학생회원가입img"  width={"200px"}/></span>
                <span>2. 학생으로 로그인<br/><img style={{marginRight:"20px"}} src={`./img/PKSCLInfo/studentLogin.png`} alt="img"  width={"200px"}/></span>
                <span>3. 학생회장에게 승인 받기<br/><img style={{marginRight:"20px"}} src={`./img/PKSCLInfo/studentWaiting.png`} alt="img"  width={"200px"}/></span>
                <span>4. 학생회장이 업로드한 장부 열람<br/><img style={{marginRight:"20px"}} src={`./img/PKSCLInfo/studentLedger.png`} alt="img"  width={"200px"}/></span>
                 </Fade>
                </div>
           </div>

           <div className="PKSCLInfomationBox">
               <h4 style={{marginBottom:"20px"}}> 학생회장입장 사용법 그림 바꿔야함.</h4>
               <div style={{display:"flex"}}>
                   <Fade bottom> 
               <span>1. 학생회장으로 회원가입<br/><img style={{marginRight:"20px"}} src={`./img/PKSCLInfo/studentSignIn.png`} alt="학생회원가입img"  width={"200px"}/></span>
                <span>2. 학생회장으로 로그인<br/><img style={{marginRight:"20px"}} src={`./img/PKSCLInfo/studentLogin.png`} alt="img"  width={"200px"}/></span>
                <span>3. PKSCL 관리자에게 승인 받기<br/><img style={{marginRight:"20px"}} src={`./img/PKSCLInfo/studentWaiting.png`} alt="img"  width={"200px"}/></span>
                    </Fade>
                </div>
                <Fade bottom> 
                <div style={{margin:"20px 0"}}>4. 장부 관리</div>
                <div style={{display:"flex"}}>
                    
                    <span><img style={{marginRight:"20px"}} src={`./img/PKSCLInfo/studentSignIn.png`} alt="학생회원가입img"  width={"200px"}/><br/>분기별 행사 및 영수증 관리</span>
                    <span><img style={{marginRight:"20px"}} src={`./img/PKSCLInfo/studentSignIn.png`} alt="학생회원가입img"  width={"200px"}/><br/>장부 공개일 설정</span>
                    <span><img style={{marginRight:"20px"}} src={`./img/PKSCLInfo/studentSignIn.png`} alt="학생회원가입img"  width={"200px"}/><br/>장부 열람 학생 관리</span>
                    <span><img style={{marginRight:"20px"}} src={`./img/PKSCLInfo/studentSignIn.png`} alt="학생회원가입img"  width={"200px"}/><br/>학생회장 위임</span>
                
                    
                </div>
                </Fade>
                
           </div>

            <div className="PKSCLInfomationBox">
           <h3>개발자</h3>
           <Fade bottom> 
               <table className="developerInfoTable">
                   <thead>
                       <tr>
                           <td>이름</td>
                            <td>역할</td>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td className="linkButton" onClick={() => { window.open("https://github.com/doongu") }}>한준규</td>
                            <td>
                                - 프로젝트 기획<br/>
                                - 시스템구축
                            </td>
                       </tr>
                       <tr>
                           <td className="linkButton" onClick={() => { window.open("") }}>조현석</td>
                            <td>- 백엔드 개발</td>
                       </tr>
                       <tr>
                           <td className="linkButton" onClick={() => { window.open("https://github.com/rriver2") }}>이가은</td>
                            <td>- 프론트엔드 설계 및 개발</td>
                       </tr>
                       <tr>
                           <td className="linkButton" onClick={() => { window.open("https://github.com/Narcoker") }}>김준서</td>
                            <td>- 프론트엔드 설계 및 개발</td>
                       </tr>
                   </tbody>
               </table>
               </Fade>
            </div> 

            <div className="PKSCLInfomationBox">
                <h3>Project 상세 설명</h3>
                <div style={{display:"flex"}}>
                <div  className="linkButton" onClick={() => { window.open("https://github.com/doongu/PKSCL") }}>github</div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div  className="linkButton" onClick={() => { window.open("https://doongu.gitbook.io/pkcog/") }}>gitbook</div> 
                </div>
            </div>

      </Fade>
      </div>
    </div>
    )
    
  }
  
export default PKSCLInfo;