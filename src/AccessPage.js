import { useState, useEffect } from 'react';
import log from './img/log.svg';
import { Nav } from 'react-bootstrap';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import './css/AccessPage.css';
import logo from './img/logo.png';
import { propTypes } from 'react-bootstrap/esm/Image';

function AccessPage(props) {
  // let [signType, setSignType] =useState("signIn");
  const [position, setPosition] = useState("student");

  const [stdID, setStdID] = useState("");
  const [name, setName] = useState("");
  // const [major, setMajor] = useState(""); 없어도될듯?
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [certFile, setCertFile] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [majorList, setMajorList] = useState(["국어국문학과", "영어영문학부", "일어일문학부", "사학과", "경제학부", "법학과", "행정학과", "국제지역학부", "중국학과", "신문방송학과", "정치외교학과", "유아교육과", "시각디자인학과", "공업디자인학과", "패션디자인학과", "경영학부", "국제통상학부", "응용수학과", "통계학과", "물리학과", "화학과", "미생물학과", "해양스포츠학과", "간호학과", "과학시스템시뮬레이션학과", "건축공학과", "건축학과", "소방공학과", "시스템경영공학부", "IT융합응용공학과", "안전공학과", "융합디스플레이공학과", "의공학과", "전기공학과", "전자공학과", "정보통신공학과", "제어계측공학과", "조선해양시스템공학과", "컴퓨터공학과", "토목공학과", "고분자공학과", "공업화학과", "금속공학과", "기계공학과", "기계설계공학과", "기계시스템공학과", "냉동공조공학과", "신소재시스템공학과", "인쇄정보공학과", "재료공학과", "화학공학과", "지속가능공학부", "식품공학과", "해양바이오신소재학과", "해양생산시스템관리학부", "해양수산경영학과", "수해양산업교육과", "자원생물학과", "식품영양학과", "생물공학과", "수산생명의학과", "환경공학과", "해양공학과", "해양학과", "지구환경과학과", "환경대기과학과", "에너지자원공학과", "공간정보시스템공학과", "생태공학과", "데이터정보과학부(빅데이터융합전공)", "데이터정보과학부(통계·데이터사이언스전공)", "미디어커뮤니케이션학부(언론정보전공)", "미디어커뮤니케이션학부(휴먼ICT융합전공)", "스마트헬스케어학부(의공학전공)", "스마트헬스케어학부(해양스포츠전공)", "스마트헬스케어학부(휴먼바이오융합전공)", "전자정보통신공학부(전자공학전공)", "전자정보통신공학부(정보통신공학전공)", "조형학부(건축학전공)", "조형학부(공업디자인전공)", "조형학부(시각디자인전공)", "컴퓨터공학부(소프트웨어·인공지능전공)", "컴퓨터공학부(컴퓨터공학전공)", "평생교육·상담학과", "기계조선융합공학과", "전기전자소프트웨어공학과", "공공안전경찰학과"]);
  const [isCorrect, setIsCorrect] = useState([false, false, false, false, false, false, false, false])
  const [emailTypeState, setEmailTypeState] = useState(false);
  const [resendEmail, setResendEmail] = useState(0);
  const [signUpButtonState, setSignUpButtonState] = useState(false);

  //   추가
  const [personalInformation, setpersonalInformation] = useState(false);
  const [infoCheckedList,setInfoCheckedList] = useState([false,false,false]);

  const history = useHistory();




  useEffect(() => {
    if (phoneNumber.length === 10) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNumber.length === 13) {
      setPhoneNumber(phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (email.length === 1) { //첫글자 입력시
      setEmail(email + "@pukyong.ac.kr");
    } else if (email.length > 1) { //커서 자동이동
      let input = document.getElementById('inputEmail');
      input.focus();
      input.setSelectionRange(email.length - 14, email.length - 14);
    }
  }, [email]);

  useEffect(() => {
    // https://pkscl.kro.kr/major-list

    axios.get('/major-list')
      .then((payload) => {
        setMajorList([...payload.data.majorList]);
      })
      .catch((error) => {
        alert("학과리스트를 불러올 수 없습니다.");
      })

  }, []);

  useEffect(() => {
    console.log(isCorrect);
    if (position === "president") {
      if (isCorrect.includes(false))
        setSignUpButtonState(false);
      else setSignUpButtonState(true);
    }

    if (position === "student") {
      for (let i = 0; i < 8; i++) {
        if (i === 5) continue;

        if (isCorrect[i] === false) {
          setSignUpButtonState(false);
          return
        }
      }
      setSignUpButtonState(true);
    }
  }, [isCorrect]);

  function reset() {
    setStdID("");
    setName("");
    // setMajor(""); 없어도될듯?

    setPassword("");
    setCheckPassword("");
    setEmail("");
    setCertFile("");
    setIsCorrect([false, false, false, false, false, false, false, false]);
    setResendEmail(0);

    if (document.getElementById("major") !== null) {
      document.getElementById("major").value = "";
    }


  };


  function login() {
    if (email === "" || password === "") {
      return (
        alert("이메일과 비밀번호를 모두 입력하세요 :)")
      )
    }
    else {
      let payload = { "email": email, "password": password };
      // debugger;
      axios.post('/login/' + position, payload)
        .then((payload) => {
          props.setLoginPosition(payload.data.position);
          props.setSCLData(payload.data.sclData);
          if (payload.data.position === "student") {
            history.push('/main/' + payload.data.sclData.studentPresident.major);
          }
          else if (payload.data.position === "president") {
            history.push('/manage/' + payload.data.sclData.studentPresident.major);
          }

        })
        .catch((error) => {
          alert("로그인에 실패했습니다 :)")


        });

    }
  };

  function findPassword() {
    if (email === "" || stdID === "" || name === "") {
      return (
        alert("빈칸을 모두 입력해주세요 :)")
      )
    }
    else {
      let payload = { "email": email, "stdID": stdID, "name": name };
      axios.post('/newpwd/' + position, payload)
        .then((payload) => {
          console.log(payload);
          if (window.confirm('입력하신 이메일로 임시 비밀번호를 발급하였습니다.')) {
            history.push('/');
          }
          else {
            history.push('/newpwd');
          }

        })
        .catch((error) => {
          console.log(error);
          alert("입력하신 정보를 찾을 수 없습니다.");

        });

    }
  };

  function certEmail() {
    let payload = { "email": email };
    axios.post('/email/' + position, payload)
      .then((payload) => {
        alert("입력하신 이메일로 메일을 발송했습니다.");
      })
      .catch((payload) => {
        console.log(payload);
        alert(payload.data.errorMessage);
      });
  };

  function changeIsCorrect(i, type) {
    var temp = [...isCorrect];
    temp[i] = type;
    setIsCorrect(isCorrect => temp);
  };

//   추가
  function ChangeInfoCheckedList(checkBoxIndex){
        let InfoCheckedList = [...infoCheckedList];
        InfoCheckedList[checkBoxIndex] = !infoCheckedList[checkBoxIndex];
        setInfoCheckedList(InfoCheckedList);
   }

  return (
    <div className="container">

      <div className="left-panel">
        <div className="content">
          <button type="button" onClick={() => { reset(); history.push('/') }}><h3>PKNU 온라인 장부</h3></button>
          <p>
            우리 학과의 장부를 분기 별로 확인할 수 있습니다.
          </p>
        </div>
        <img src={log} className="image" alt="" />
      </div>
      <Switch>
        <Route exact path="/signUp">
          <div className="right-panel" id="signup" style={{ marginTop: "20px", justifyContent: "flex-start" }}>
            <form className="userForm" action={"/signup/" + position} method="post" encType="multipart/form-data"
              onSubmit={(e) => {
                e.target.major.value = majorList.indexOf(e.target.major.value) + 1;
              }}>
              <div id="nav" >
                <Nav fill variant="tabs" defaultActiveKey="link-1">
                  <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => { setPosition("student"); reset(); }}>학생</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={() => { setPosition("president"); reset(); }}>학생회장</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>

              <h3 className="accessTitle" style={{margin : "10px 0 0 0"}}><img src={logo} alt="logo" width={"40px"} height={"40px"}/>가입을 시작합니다!</h3>
              {
                position === "student"
                  ? <div style={{marginBottom : "10px"}}>PKSCL로 편리하고 투명하게 장부를 이용하세요:) </div>
                  : <div style={{marginBottom : "10px"}}>PKSCL로 편리하고 투명하게 장부를 관리하세요:) </div>
              }
  {/* 추가 */}
              {
                  personalInformation === false
                  ? (
                      <div style={{width: "350px"}}>
                      <div>환영합니다 :)
                        <br/>부경대학교 온라인 장부 PKSCL 서비스를 이용해 주셔서 감사합니다. 본 약관은 온라인 장부 서비스의 이용과 관련하여 서비스를 제공하는 PKSCL와 이를 이용하는 온라인 장부를 이용할 사용자들과의 관계를 설명하며, 아울러 여러분의 PKSCL 서비스 이용에 도움이 될 수 있는 정보를 포함하고 있습니다.
                        <br/> PKSCL 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 동의해야 하기 때문에, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.
                      </div>
                    <input style={{marginLeft: "16px",marginTop: "20px"}} type="checkbox"onChange={(e)=>{
                              ChangeInfoCheckedList(0);}}></input>[필수] 부경대학교 재학생 또는 휴학생 입니다. 
                      <details>

                          <summary><input id= "InfoCheckedList0" type="checkbox"  onChange={(e)=>{
                              ChangeInfoCheckedList(1);}}></input>[필수] PKSCL 이용 약관 동의</summary>
                          <span>
                              <div style={{ backgroundColor:"var(--color-bright-gray)", margin : "10px 0 10px 0", height : "85px" , overflowY : "auto"}}>
                              <p/>1. 계약당사자의 의무
    
                                    <br/>PKSCL은 여러분이 PKSCL 서비스를 투명하고 편리하게 이용할 수 있도록 최선을 다하고 있습니다. 다만, 여러분이 PKSCL 서비스를 보다 안전하게 이용하고 PKSCL 서비스에서 여러분과 타인의 권리가 서로 존중되고 보호받으려면 여러분의 도움과 협조가 필요합니다. 여러분의 안전한 서비스 이용과 권리 보호를 위해 부득이 아래와 같은 경우 여러분의 장부 관리 및 열람 권한이 제한될 수 있으므로, 이에 대한 확인 및 준수를 요청 드립니다.
                                    
                                    <br/>a. 회원 가입 시 이름, 이메일, 학번, 학과 등의 정보를 허위로 기재해서는 안 되고 회원 계정에 등록된 정보는 항상 정확한 최신 정보가 유지될 수 있도록 관리해 주세요. 또한 자신의 계정을 다른 사람에게 판매, 양도, 대여 또는 담보로 제공하거나 다른 사람에게 그 사용을 허락해서는 안 됩니다. 아울러 자신의 계정이 아닌 타인의 계정을 무단으로 사용해서는 안 됩니다.
                                    
                                    <br/>b. 학과의 장부를 캡쳐해서 무단으로 다른 SNS나 커뮤니티 등에 업로드 해서는 안됩니다. 사용자가 학과의 장부 화면을 캡쳐해서 유포한 것이 발각이 되거나, 허위 정보로 회원가입을 시도했음이 판별된 경우 등에는 PKSCL 회원 탈퇴를 고지받을 수 있습니다.
                                    
                                    <br/>c.  학생회장의 경우에는 반드시 학생회실(학과사무실)에 비대면으로 제출한 장부와 동일한 내용을 온라인 장부에 업로드 해야 합니다. 장부 업로드시에 PKSCL 이용 방법을 준수하지 않아 발생하는 문제는 본인에게 있습니다.
                         
                                <p/>2. 서비스 변경 및 종료
                         
                                    <br/>PKSCL은 연중 무휴, 1일 24시간 안정적으로 서비스를 제공하기 위해 최선을 다하고 있지만, 컴퓨터, 서버 등 정보통신설비의 보수점검, 교체 또는 고장, 통신두절 등 운영상 이유가 있는 경우 부득이 서비스의 전부 또는 일부를 중단할 수 있습니다.

                                    <br/>또한, 서비스 운영 또는 개선이 필요하다고 판단된 경우 서비스의 전부 또는 일부를 수정, 변경 또는 종료할 수 있습니다. PKSCL 서비스의 전부 또는 일부를 수정, 변경 또는 종료하게 된 경우 관련 법령에 특별한 규정이 없는 한 별도의 보상을 하지 않습니다.

                                    <br/>이 경우 PKSCL은 예측 가능한 경우 상당기간 전에 이를 안내하며, 만약 예측 불가능한 경우라면 사후 지체 없이 상세히 설명하고 안내 드리겠습니다.
                          
                                <p/>3. 인증 서비스

                                    <br/>PKSCL은 연중 무휴, 1일 24시간 안정적으로 서비스를 제공하기 위해 최선을 다하고 있지만, 컴퓨터, 서버 등 정보통신설비의 보수점검, 교체 또는 고장, 통신두절 등 운영상 이유가 있는 경우 부득이 서비스의 전부 또는 일부를 중단할 수 있습니다.
                         </div>
                          </span>
                      </details>
                      <details >
                          <summary><input type="checkbox" onChange={(e)=>{
                              ChangeInfoCheckedList(2);}}></input>[필수] 개인정보 수집 및 이용 동의</summary>
                          <span>
                              <div style={{ backgroundColor:"var(--color-bright-gray)", margin : "10px 0 10px 0", height : "85px" , overflowY : "auto"}}>
                              <p/> 1. PKSCL 계정 이용계약
    
                                    <br/>a) 수집되는 개인 정보
                                    
                                    <br/>PKSCL가 제공하는 온라인 장부 서비스는 회원가입을 해야지만 이용이 가능합니다. 이때 사용자가 회원가입을 하는 경우엔 온라인 장부 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.
                                    
                                    <br/>회원가입 시점에 PKSCL이 이용자로부터 수집하는 개인정보는 아래와 같습니다.
                                    
                                    <br/>- 학생이 회원 가입 시에 ‘학번, 학과, 이름, 학교 이메일, 학생증’을 필수항목으로 수집합니다. 학생회장의 경우엔 ‘전화번호’를 추가로 수집합니다. 또한, 회원가입 이후에 챗봇을 통해 학생회장을 증명하기 위한 서류를 추가적으로 요구할 수 있습니다.
                                    
                                    <br/> 서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.
                                    
                                    <br/>- 비밀번호 재발급을 요청할 경우에는 본인인증을 위해 ‘이메일, 학번, 이름’을 필수 항목으로 수집합니다.
                                    <br/>- 로그인 후 개별 서비스에서 정보 변경 기능 및 비밀번호 변경을 이용할 시에 프로필 정보(학과, 이름, 전화번호, 학생증)를 설정할 수 있습니다.
    
                                    <br/>b) 수집한 개인정보의 이용
                                    
                                    <br/>수집한 개인정보는 PKSCL 서비스의 회원관리, 서비스 개발・제공 등 아래의 목적으로만 이용합니다.
                                    
                                    <br/>- 회원 가입 의사의 확인, 부경대학교 재학생 및 휴학생임을 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.(이메일 : 본인확인용 이메일 전송 및 임시 비밀번호 발급, 회원 식별용 정보로 활용 , 비밀번호 : 본래 값을 확인하지 못하도록 일방향 암호화하여 저장, 학생증 파일: 본인확인용, 추후 재확인이 필요할 경우를 위해 6개월 보관 후 자동 삭제, 권한 및 승인신청 정보 저장 : 부적절한 사용자의 정보 조회를 방지 , 이름, 학과 : DB 내 정보 조회를 위한 사용자 정보 식별, 학번 : 학생증과 대조를 통한 본인확인, 회원 식별용 정보로 활용, 전화번호 : 학과 회장의 정보 제공용 )
                                    <br/>- 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.( 쿠키: 사이트 내 로그인 유지를 위해 서버에서 임의로 생성한 세션 ID 저장 및 전송 )
                                    
                                    <br/>c) 개인정보의 보관기간
                                    
                                    <br/>PKSCL은 원칙적으로 이용자의 개인정보를 해당 회원이 탈퇴를 할 시 지체없이 파기하고 있습니다. 예외적으로 PKSCL 이용 약관에 어긋나는 행위를 하였을 경우에는 부정 가입 및 이용을 방지하기 위해 부정 이용자의 가입인증 이메일을 탈퇴일로부터 6개월 보관 합니다.
                                    
                                    <br/>d) 개인정보 수집 및 이용 동의를 거부할 권리
                                    
                                    <br/>이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 하지만 회원가입 시 수집하는 최소한의 개인정보, 즉, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.
                             <p/> 2. 서비스 이용 계약 해지
                                    <br/>a) 사용자가 회원 탈퇴를 신청한 경우

                                    <br/>사용자가 PKSCL 이용을 더 이상 원치 않는 때에는 언제든지 서비스 내 제공되는 메뉴를 이용하여 이용계약의 해지 신청을 할 수 있습니다. 이용계약이 해지되면 법령 및 개인정보 처리방침에 따라 여러분의 정보를 보유하는 경우를 제외하고는 여러분의 PKSCL 계정 정보 및 PKSCL 계정으로 이용하였던 개별 서비스 데이터는 삭제됩니다. 이용계약이 해지된 경우라도 사용자는 언제든 다시 PKSCL에 회원가입을 신청할 수 있습니다.

                                    <br/>b) 위 약관들에 어긋나는 행동을 보일 경우

                                    <br/>사용자가 관련 법령, 본 약관, 계정 및 서비스 운영정책 등을 준수하지 않을 경우, PKSCL은 사용자의 관련 행위 내용을 확인할 수 있으며, 그 확인 결과에 따라 PKSCL 서비스 이용에 대한 주의를 당부하거나, 더 이상 PKSCL 서비스 이용계약의 온전한 유지를 기대하기 어려운 경우엔 부득이 사용자에게 계정 탈퇴를 고지할 수 있습니다.
                    </div>
                    </span>
                      </details>
                      <div style={{display:"flex", justifyContent: "center", marginTop :"20px"}}>
                      <button type="button" className="SignInBtn" onClick={()=>{if(!infoCheckedList.includes(false)){
                          setpersonalInformation(true)
                      }}}> 동의 </button>
                      </div>
                      </div>
                    )
                  : (<>
                      <div className="input-field">
                <i className="fas fa-lock" style={isCorrect[0] === true ? { color: "var(--color-quarter)" } : null}></i>
                <input onChange={(e) => {
                  setStdID(e.target.value.replace(/[^0-9]/g, ''));
                  if (e.target.value.length === 9) {
                    changeIsCorrect(0, true);
                  } else {
                    changeIsCorrect(0, false);
                  }
                  console.log(isCorrect[0]);
                }
                } name="stdID" value={stdID} maxLength="9" placeholder="학번" type="text" />
              </div>
              <div className="input-field">
                <i className="fas fa-key" style={isCorrect[1] === true ? { color: "var(--color-quarter)" } : null}></i>
                <input onChange={(e) => {
                  console.log(e.target.value);
                  setPassword(e.target.value);
                  if (e.target.value.length !== 0) {
                    changeIsCorrect(1, true);
                  } else {
                    changeIsCorrect(1, false);
                  }

                }} name="password" value={password} type="password" placeholder="비밀번호" />
              </div>
              <div className="input-field">
                <i className="fas fa-key" style={isCorrect[2] === true ? { color: "var(--color-quarter)" } : null}></i>
                <input onChange={(e) => {
                  setCheckPassword(e.target.value)
                  if (password !== e.target.value || password === "") {
                    changeIsCorrect(2, false);
                  } else if (password === e.target.value) {
                    changeIsCorrect(2, true);
                  }
                }
                } name="checkPassword" value={checkPassword} type="password" placeholder="비밀번호 재확인" />
              </div>
              <div className="input-field" style={{ fontSize: "80%" }}>
                <i className="fas fa-book-open" style={isCorrect[3] === true ? { color: "var(--color-quarter)" } : null}></i>
                <label htmlFor="majorList"></label>
                <input type="text" list="majorList-options" id='major' name="major" placeholder="학과를 입력하세요."
                  onChange={(e) => {
                    // setMajor(e.target.value); 없어도될듯?
                    if (majorList.includes(e.target.value)) {
                      changeIsCorrect(3, true);
                    } else {
                      changeIsCorrect(3, false);
                    }
                  }
                  }></input>
                <datalist id="majorList-options" >
                  {
                    majorList.map((majorName, i) => {
                      return (
                        <option value={majorName} key={i} ></option>
                      )

                    })
                  }
                </datalist>
              </div>
              <div className="input-field">
                <i className="fas fa-user" style={isCorrect[4] === true ? { color: "var(--color-quarter)" } : null}></i>
                <input onChange={(e) => {
                  setName(e.target.value)
                  if (e.target.value === "") {
                    changeIsCorrect(4, false);
                  } else {
                    changeIsCorrect(4, true);
                  }
                }
                } name="name" value={name} type="text" placeholder="이름" />
              </div>
              {
                position === "president"
                  ?
                  (<div className="input-field">
                    <i className="fas fa-phone-alt" style={isCorrect[5] === true ? { color: "var(--color-quarter)" } : null}></i>
                    <input onChange={(e) => {
                      setPhoneNumber(e.target.value)
                      if (e.target.value.length !== 13) {
                        changeIsCorrect(5, false);
                      } else {
                        changeIsCorrect(5, true);
                      }
                    }
                    } maxLength="13" name="phoneNumber" value={phoneNumber} type="text" placeholder="전화번호" />
                  </div>
                  )
                  :
                  null

              }

              <div className="input-field">
                <i className="fas fa-envelope" style={isCorrect[6] === true ? { color: "var(--color-quarter)" } : null}></i>
                {
                  resendEmail === 0
                    ? (
                      <>
                        <input id="inputEmail"
                          onChange={(e) => {
                            setEmail(e.target.value);
                            const emailType = e.target.value.substring(e.target.value.indexOf("@"));

                            console.log(e.target.value.indexOf('@'));
                            if (e.target.value.indexOf('@') === 0) {
                              setEmailTypeState(false);
                            } else if (emailType === "@pukyong.ac.kr") {
                              setEmailTypeState(true);
                            } else {
                              setEmailTypeState(false);
                            }
                          }} name="email" value={email} type="text" placeholder="학교 이메일 @pukyong.ac.kr" />
                        <label className="certEmail" onClick={() => {
                          console.log(emailTypeState);
                          if (emailTypeState) {
                            certEmail();
                            setResendEmail(1);
                            changeIsCorrect(6, true);
                          }
                          else if (!emailTypeState) alert("이메일 형식이 올바르지 않습니다 :(")
                        }
                        }>인증</label>
                      </>
                    )
                    : (
                      <>
                        <input id="inputEmail" name="email" value={email} type="text" placeholder="학교 이메일 @pukyong.ac.kr" readOnly />
                        <label className="certEmail" onClick={() => { setResendEmail(0); changeIsCorrect(6, false); }}>수정</label>
                      </>)
                }
              </div>

              <div className="input-field filebox">
                <i className="fas fa-user-graduate" style={isCorrect[7] === true ? { color: "var(--color-quarter)" } : null}></i>
                <input className='uploadName' placeholder='학생증을 첨부해주세요' value={certFile} readOnly />
                <label htmlFor="certFile">찾기</label>
                <input type="file" id='certFile' name="certFile" accept='image/*'
                  onChange={(e) => {
                    setCertFile(e.target.value.split('/').pop().split('\\').pop());
                    if (e.target.value === "") {
                      changeIsCorrect(7, false);
                    } else {
                      changeIsCorrect(7, true);
                    }
                  }} />
              </div>

              <div className="submitbox" >
                {signUpButtonState === true
                  ?
                  <button type="submit" className="SignInBtn" >회원가입</button>
                  :
                  <button type="button" style={{ backgroundColor: '#ACACAC' }} className="SignInBtn" onClick={() => { alert("빈칸을 모두 입력해주세요 :(") }}  >회원가입</button>
                }
              </div></>
                  )
              }
              
            </form>
            <div className='moveSignPage'>
              <button onClick={() => { reset(); history.push('/newpwd') }}>비밀번호 찾기</button><button onClick={() => { reset(); history.push('/'); }}>로그인</button>
            </div>
          </div>

        </Route >

        <Route exact path="/">
          <div className="right-panel">
            <form className="userForm">
              <div id="nav" >
                <Nav fill variant="tabs" defaultActiveKey="link-1">
                  <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => { setPosition("student"); reset(); }}>학생</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={() => { setPosition("president"); reset(); }}>학생회장</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <h3 className="accessTitle"><img src={logo} alt="logo" width={"40px"} height={"40px"}/>PKSCL</h3>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input id="inputEmail" onChange={(e) => { setEmail(e.target.value) }} value={email} type="text" placeholder="학교 이메일 @pukyong.ac.kr" />
              </div>
              <div className="input-field">
                <i className="fas fa-key"></i>
                <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" placeholder="비밀번호" />
              </div>

              <div className="submitbox" >
                <button type="button" onClick={() => { login() }} value="Login" className="SignInBtn">로그인</button>
              </div>
            </form>
            <div className='moveSignPage'>
              <button onClick={() => { reset(); history.push('/newpwd') }}>비밀번호 찾기</button><button onClick={() => { reset(); history.push('/signUp'); }}>회원가입</button>
            </div>
          </div>

        </Route>


        <Route exact path="/newpwd">
          <div className="right-panel">
            <form className="userForm">

              <div id="nav" >
                <Nav fill variant="tabs" defaultActiveKey="link-1">
                  <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => { setPosition("student"); reset(); }}>학생</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={() => { setPosition("president"); reset(); }}>학생회장</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <h3 className="accessTitle" ><img src={logo} alt="logo" width={"40px"} height={"40px"}/>비밀번호 찾기</h3>


              <div className="input-field">
                <i className="fas fa-envelope" style={isCorrect[5] === true ? { color: "var(--color-quarter)" } : null}></i>
                <input id="inputEmail" onChange={(e) => {
                  setEmail(e.target.value);
                  const emailType = e.target.value.substring(e.target.value.indexOf("@"));
                  // console.log(emailType);
                  console.log(e.target.value);
                  if (e.target.value.indexOf('@') === 0) {
                    setEmailTypeState(emailTypeState => false);
                    changeIsCorrect(5, false);
                    console.log("case 1");
                  } else if (emailType === "@pukyong.ac.kr") {
                    setEmailTypeState(emailTypeState => true);
                    changeIsCorrect(5, true);
                    console.log("case 2");
                  } else {
                    setEmailTypeState(emailTypeState => false);
                    changeIsCorrect(5, false);
                    console.log("case 3");
                  }
                }} name="email" value={email} type="text" placeholder="학교 이메일 @pukyong.ac.kr" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" style={isCorrect[0] === true ? { color: "var(--color-quarter)" } : null}></i>
                <input onChange={(e) => {
                  setStdID(e.target.value.replace(/[^0-9]/g, ''));
                  if (e.target.value.length === 9) {
                    changeIsCorrect(0, true);
                  } else {
                    changeIsCorrect(0, false);
                  }

                }
                } value={stdID} type="text" maxLength="9" placeholder="학번" />
              </div>
              <div className="input-field" >
                <i className="fas fa-user" style={isCorrect[4] === true ? { color: "var(--color-quarter)" } : null}></i>
                <input onChange={(e) => {
                  setName(e.target.value)
                  if (e.target.value === "") {
                    changeIsCorrect(4, false);
                  } else {
                    changeIsCorrect(4, true);
                  }
                }
                } value={name} type="text" placeholder="이름" />
              </div>
              <div className="submitbox" >
                <button onClick={() => {
                  if (isCorrect[5] === true && isCorrect[0] === true && isCorrect[4] === true) findPassword()
                  else alert("올바른 입력 값을 입력해주세요 :(")
                }} type="button" className="SignInBtn">확인</button>
              </div>
            </form>
            <div className='moveSignPage'>
              <button onClick={() => { reset(); history.push('/') }}>로그인</button><button onClick={() => { reset(); history.push('/signUp') }}>회원가입</button>
            </div>
          </div>
        </Route >

        <Route exact path="/giraffe-admin">
          <div className="right-panel">
            <form className="userForm">
              <h3 className="accessTitle" ><img src={logo} alt="logo" width={"40px"} height={"40px"}/>관리자 로그인</h3>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input id="inputEmail" onChange={(e) => { setEmail(e.target.value) }} value={email} type="text" placeholder="학교 이메일 @pukyong.ac.kr" />
              </div>
              <div className="input-field">
                <i className="fas fa-key"></i>
                <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" placeholder="비밀번호" />
              </div>

              <div className="submitbox" >
                <button type="button" onClick={() => { setPosition(position => "admin"); login(); }} value="Login" className="SignInBtn">로그인</button>
              </div>
            </form>
          </div>
        </Route>
      </Switch >
    </div >





  )
}

export default AccessPage;