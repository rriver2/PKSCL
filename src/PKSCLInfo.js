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
           <div className="PKSCLLogoBox">
                    <Fade bottom> 
                    <img src={logoImgPath} alt="logo" width={"80px"} height={"80px"}/>
                    </Fade>
                    <Fade bottom> 
                        <h3 style={{marginTop:"10px",marginBottom:"20px"}}>"Pukyong Student Council Ledger"</h3>
                        <div>
                        PKSCL은 부경대학교 재학생들이 이전보다 편리하고 신뢰도 있게<br/>
                        학과 장부를 온라인으로 관리 및 열람하는 서비스를 제공합니다.
                        </div>            
                    </Fade>
                    <Fade bottom> 
                        <div className="downVar" ><i class="fas fa-angle-double-down"></i></div>
                    </Fade> 
        </div>

           <div className="PKSCLInfomationBox" style={{marginTop:"50px"}}>
               <Fade bottom> 
                <h3 style={{marginBottom:"40px"}}>💡 학생 사용방법</h3>
               </Fade> 
                    <Fade bottom> 
                    <div className="useMethod" style={{display:"flex"}}>
                        <span className="useMethodContext">
                            <div className="useMethodContextTitle">
                            1. 학생으로 회원가입
                            </div>
                            <img className="PKSCLInfoImg" src={`./img/PKSCLInfo/student/studentSignIn.png`} alt="학생회원가입img"  width={"250px"}/>
                            <div className="detailContext"> 
                            - 회원가입 시 동의해야 하는 개인정보 및 PKSCL 이용 약관 동의서를 꼼꼼히 확인해주시길 바랍니다. 본 동의서 내용을 준수하지 않아 발생하는 문제는 본인에게 있습니다.</div>
                        </span>
                        <span className="useMethodContext">
                             <div className="useMethodContextTitle">
                                2. 학생으로 로그인</div><img className="PKSCLInfoImg"src={`./img/PKSCLInfo/student/studentLogin.png`} alt="img"  width={"250px"}/>
                         <div className="detailContext">- PKSCL의 모바일 서비스는 일부 제한되기 때문에 PC로 접속하시는 것을 권장합니다.</div>
                        </span>
                        <span className="useMethodContext">
                             <div className="useMethodContextTitle">
                            3. 학생회장에게 승인 받기
                            </div><img className="PKSCLInfoImg" src={`./img/PKSCLInfo/student/studentRefusal.png`} alt="img"  width={"250px"}/>
                            <div className="detailContext"> 
                            - 학생회장의 승인을 받은 학생만이 학과의 장부를 확인할 수 있습니다. 다만, 회원가입을 완료한 부경대 학생의 경우엔 기린학과의 임시장부를 확인하실 수 있습니다 :)
                            </div>
                        </span>
                    </div>
                    <div style={{margin:"20px 0"}}></div>
                    <div className="useMethod" style={{display:"flex"}}>
                        
                        <span className="useMethodContext LedgerContext" style={{margin : "0 25px"}}>
                            <div className="useMethodContextTitle">
                                4. 장부 열람
                                </div>
                            <img className="PKSCLInfoImg" src={`./img/PKSCLInfo/student/studentLedger.png`} alt="학생장부열람img"  width={"450px"}/>
                            <div className="detailContext LedgerContext"> 
                                - 학생회장의 승인을 받으셨다면 신청하신 학과의 장부를 분기별로, 행사별로 확인하실 수 있습니다.
                                <br/>- 장부에 관련된 문의가 있을 시에는 PC 화면 좌측 학생회장 이메일로 문의주시길 바랍니다.
                            </div>
                        </span>
                        <span className="useMethodContext" style={{width:"300px", margin : "0 25px"}}>
                             <div className="useMethodContextTitle">
                                5. 프로필 편집 및 회원 탈퇴
                            </div>
                                <img className="PKSCLInfoImg" src={`./img/PKSCLInfo/student/studentProfile.png`} alt="학생회원가입img"  width={"300px"}/>
                            <div className="detailContext" style={{width:"300px"}}>- 전과, 개명 등의 이유로 수정이 필요할 때 사용하실 수 있습니다. 만약 장부 권한 확인 여부(이름, 학과, 학생증 등)와 관련된 정보를 수정하시면 다시 학생회장의 승인을 받아야 장부 열람이 가능합니다.
                            </div>
                        </span>
                        
                    </div>
                    </Fade>
           </div>

<hr style={{marginTop:"150px",marginRight:"10%",marginLeft:"10%"}} ></hr>
           <div className="PKSCLInfomationBox">
               <Fade bottom> 
                <h3 style={{marginBottom:"40px"}}>💡 학생회장 사용방법</h3>
               </Fade> 
               <Fade bottom> 
                <div style={{display:"flex"}}>
                        <span className="useMethodContext">
                             <div className="useMethodContextTitle">
                                 1. 학생회장으로 회원가입
                                 </div>
                                 <img className="PKSCLInfoImg" src={`./img/PKSCLInfo/president/presidentSignIn.png`} alt="학생회원가입img"  width={"250px"}/>
                            <div className="detailContext">
                            - 회원가입 시 동의해야 하는 개인정보 및 PKSCL 이용 약관 동의서를 꼼꼼히 확인해주시길 바랍니다. 본 동의서 내용을 준수하지 않아 발생하는 문제는 본인에게 있습니다.</div>
                        </span>

                        <span className="useMethodContext">
                             <div className="useMethodContextTitle">
                                 2. 학생회장으로 로그인</div>
                                 <img className="PKSCLInfoImg" src={`./img/PKSCLInfo/president/presidentLogin.png`} alt="img"  width={"250px"}/>
                            <div className="detailContext">- PKSCL의 모바일 서비스는 일부 제한되기 때문에 PC로 접속하시는 것을 권장합니다.</div>
                        </span>

                        <span className="useMethodContext">
                             <div className="useMethodContextTitle">
                                 3. PKSCL 관리자에게 승인 받기</div>
                        <img className="PKSCLInfoImg" src={`./img/PKSCLInfo/president/presidentWaiting.png`} alt="img"  width={"250px"}/>
                            <div className="detailContext">- 회원가입 이후 학생회장임을 증명하기 위한 서류를 관리자에게 제출해야 합니다. PKSCL 챗봇으로 문의를 해주세요. 
                            <br/>- 본 과정은 처음 PKSCL을 사용하시는 학생회장에게만 해당이 되며, 이후에는 학생회장 권한 위임하기를 통해 차대 학생회장에게 PKSCL 장부 관리 권한을 넘길 수 있습니다.</div>
                        </span>
                    </div>

                
                 <div  style={{margin:"20px 0",marginTop:"40px"}}>
                             <div className="useMethodContextTitle">
                                 4. 장부 및 학생 관리</div>
                             </div>
                <div style={{display:"flex"}}>
                    
                       <span className="useMethodContext" style={{width:"450px"}}>
                        <img className="PKSCLInfoImg" src={`./img/PKSCLInfo/president/presidentLedger.png`} alt="학생회원가입img" width={"450px"}/>
                            <div className="detailContext" style={{width:"450px",fontSize:"medium",opacity:"0.8"}}>
                                분기별 영수증 관리 및 장부 공개일 설정</div>
                            <div className="detailContext" style={{width:"450px"}}>
                                - 해당 분기의 행사별로 영수증을 업로드 하실 수 있습니다. 업로드 후에는 학생의 입장에서 장부를 확인하실 수도 있습니다.
                                <br/>- 분기마다 장부 공개일을 설정하실 수 있습니다.
                               <br/>- 본과 학생의 입장에서 공개된 장부를 확인하실 수 있습니다.
                            </div>
                        </span>
                        <span className="useMethodContext" style={{ width:"450px"}}>
                        <img className="PKSCLInfoImg" src={`./img/PKSCLInfo/president/presidentManagement.png`} alt="학생회원가입img"  width={"450px"}/>
                            <div className="detailContext" style={{width:"450px",fontSize:"medium",opacity:"0.8"}}>
                                장부 열람 학생 관리
                            </div>
                            <div className="detailContext" style={{width:"450px"}}>
                                - 학생들의 장부 열람 권한을 관리하실 수 있습니다. 학생증과 입력된 정보를 대조해서 본과 학생임을 확인한 경우에만 승인을 해주세요.
                            </div>
                        </span>
                </div>


                 <div  style={{margin:"20px 0",marginTop:"40px"}}>
                             <div className="useMethodContextTitle">
                                 5. 프로필 편집 및 회장 권한 위임</div>
                             </div>
                <div style={{display:"flex"}}>

                        <span className="useMethodContext" style={{width:"300px", margin : "0 25px"}}>
                            <img className="PKSCLInfoImg" src={`./img/PKSCLInfo/president/presidentProfile.png`} alt="학생회원가입img" width={"300px"}/>
                            <div className="detailContext" style={{width:"300px"}}>
                                - 개명, 전화번호 변경 등의 이유로 수정이 필요할 때 사용하실 수 있습니다.
                            </div>
                        </span>
                        <span className="useMethodContext" style={{width:"300px", margin : "0 25px"}}>
                            <img className="PKSCLInfoImg" src={`./img/PKSCLInfo/president/presidentMandate.png`} alt="학생회원가입img"  width={"300px"}/>
                            <div className="detailContext" style={{width:"300px"}}>
                                - 차기 학생회장에게 PKSCL 장부 관리 권한을 양도하실 수 있습니다.
                            </div>
                        </span>
                </div>


                </Fade>
           </div>


<hr style={{marginTop:"150px",marginRight:"10%",marginLeft:"10%"}} ></hr>
            <div className="PKSCLInfomationBox" style={{marginTop:"100px"}}>
           <h3>🧑🏻‍💻 개발자</h3>
           <Fade bottom> 
           <div style={{margin:"20px 0",fontSize : "large"}}> 안녕하세요 ! 저희는 기린스입니다 :) </div>

<div style={{display:"flex", marginTop:"80px"}} >

                <div className="profileBox" >
                    <img src={`./img/PKSCLInfo/profile/profile_han.jpeg`} 
                        style={{borderRadius:"50%"}} 
                        alt="한준규" height={"200"} width={"200"} />
                        <h3 style={{marginTop: "30px"}}>한준규</h3>
                  
                    <div style={{fontSize : "medium", margin: "10px 0"}} >
                       - 프로젝트 기획<br/>
                        - 시스템구축
                    </div>
                    
                    <div style={{marginTop: "15px"}}
                    className="linkButton" onClick={() => { window.open("https://github.com/doongu") }}>
                                    <img src={`./img/PKSCLInfo/github.png`} alt="깃허브icon"  width={"20px"} height={"20px"}/>
                                    <div style={{fontSize : "medium"}}>doongu</div>
                    </div>
                 </div>


                  <div className="profileBox" >
                    <img src={`./img/PKSCLInfo/profile/profile_cho.jpeg`} 
                        style={{borderRadius:"50%"}} 
                        alt="한준규" height={"200"} width={"200"} />
                        <h3 style={{marginTop: "30px"}}>조현석</h3>
                    <div style={{fontSize : "medium", margin: "10px 0"}} >
                       - DB  및 세션 연동 <br/>
                                - 라우팅 설정 및 API 개발
                    </div>
                    
                    <div style={{marginTop: "15px"}}
                            className="linkButton" onClick={() => { window.open("https://github.com/coke98") }}>
                                    <img src={`./img/PKSCLInfo/github.png`} alt="깃허브icon"  width={"20px"} height={"20px"}/>
                                    <div style={{fontSize : "medium"}}>coke98</div>
                    </div>
                 </div>

                <div className="profileBox" >
                    <img src={`./img/PKSCLInfo/profile/profile_lee.jpeg`} 
                        style={{borderRadius:"50%"}} 
                        alt="한준규" height={"200"} width={"200"} />
                        <h3 style={{marginTop: "30px"}}>이가은</h3>

                    <div style={{fontSize : "medium", margin: "10px 0"}} >
                       - UX/UI 디자인 설계 <br/>
                        - 프론트엔드 개발 
                    </div>
                    
                    <div style={{marginTop: "15px"}} className="linkButton" onClick={() => { window.open("https://github.com/rriver2") }}>
                                    <img src={`./img/PKSCLInfo/github.png`} alt="깃허브icon"  width={"20px"} height={"20px"}/>
                                    <div style={{fontSize : "medium"}}>rriver2</div>
                                </div>
                 </div>
                 


                  <div className="profileBox" >
                    <img src={`./img/PKSCLInfo/profile/profile_kim.jpeg`} 
                        style={{borderRadius:"50%"}} 
                        alt="한준규" height={"200"} width={"200"} />
                        <h3 style={{marginTop: "30px"}}>김준서</h3>
                    <div style={{fontSize : "medium", margin: "10px 0"}} >
                            - UX/UI 디자인 설계 <br/>
                            - 프론트엔드 개발 
                    </div>
                    
                    <div style={{marginTop: "15px"}} className="linkButton" onClick={() => { window.open("https://github.com/Narcoker") }}>
                                    <img src={`./img/PKSCLInfo/github.png`} alt="깃허브icon"  width={"20px"} height={"20px"}/>
                                    <div style={{fontSize : "medium"}}>Narcoker</div>
                                </div>
                 </div>



</div>
               </Fade>
            </div> 

<hr style={{marginTop:"150px",marginRight:"10%",marginLeft:"10%"}} ></hr>
            <div className="PKSCLInfomationBox" style={{marginBottom:"200px"}}>
                <h3>Project 상세 설명</h3>
                <div style={{display:"flex", marginTop:"20px"}}>
                    <div  className="linkButton" onClick={() => { window.open("https://github.com/doongu/PKSCL") }}>github</div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div  className="linkButton" onClick={() => { window.open("https://doongu.gitbook.io/pkcog/") }}>gitbook</div> 
                </div>
            </div>

      </div>
    </div>
    )
    
  }
  
export default PKSCLInfo;