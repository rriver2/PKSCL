import { useState, useEffect } from 'react';
import log from './img/log.svg';
import { Nav } from 'react-bootstrap';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import './AccessPage.css';


function AccessPage() {
  // let [signType, setSignType] =useState("signIn");
  const [position, setPosition] = useState("student");

  const [stdID, setStdID] = useState("");
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [certFile, setCertFile] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkState, setCheckState] = useState(false);
  const [atIsContain, setAtIsContains] = useState(false);
  // let [majorList, setMajorList] = useState(["학과정보를 불러올 수 없습니다."]);
  const [majorList, setMajorList] = useState(["국어국문학과", "영어영문학부", "일어일문학부", "사학과", "경제학부", "법학과", "행정학과", "국제지역학부", "중국학과", "신문방송학과", "정치외교학과", "유아교육과", "시각디자인학과", "공업디자인학과", "패션디자인학과", "경영학부", "국제통상학부", "응용수학과", "통계학과", "물리학과", "화학과", "미생물학과", "해양스포츠학과", "간호학과", "과학시스템시뮬레이션학과", "건축공학과", "건축학과", "소방공학과", "시스템경영공학부", "IT융합응용공학과", "안전공학과", "융합디스플레이공학과", "의공학과", "전기공학과", "전자공학과", "정보통신공학과", "제어계측공학과", "조선해양시스템공학과", "컴퓨터공학과", "토목공학과", "고분자공학과", "공업화학과", "금속공학과", "기계공학과", "기계설계공학과", "기계시스템공학과", "냉동공조공학과", "신소재시스템공학과", "인쇄정보공학과", "재료공학과", "화학공학과", "지속가능공학부", "식품공학과", "해양바이오신소재학과", "해양생산시스템관리학부", "해양수산경영학과", "수해양산업교육과", "자원생물학과", "식품영양학과", "생물공학과", "수산생명의학과", "환경공학과", "해양공학과", "해양학과", "지구환경과학과", "환경대기과학과", "에너지자원공학과", "공간정보시스템공학과", "생태공학과", "데이터정보과학부(빅데이터융합전공)", "데이터정보과학부(통계·데이터사이언스전공)", "미디어커뮤니케이션학부(언론정보전공)", "미디어커뮤니케이션학부(휴먼ICT융합전공)", "스마트헬스케어학부(의공학전공)", "스마트헬스케어학부(해양스포츠전공)", "스마트헬스케어학부(휴먼바이오융합전공)", "전자정보통신공학부(전자공학전공)", "전자정보통신공학부(정보통신공학전공)", "조형학부(건축학전공)", "조형학부(공업디자인전공)", "조형학부(시각디자인전공)", "컴퓨터공학부(소프트웨어·인공지능전공)", "컴퓨터공학부(컴퓨터공학전공)", "평생교육·상담학과", "기계조선융합공학과", "전기전자소프트웨어공학과", "공공안전경찰학과"]);


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
    console.log(email.lastIndexOf("@"));
    if (email.indexOf("@") !== -1) setAtIsContains(true);
    else setAtIsContains(false);


    if (email[email.length - 1] === "@" && atIsContain === false) {
      setEmail(email + "pukyong.ac.kr")
    }
  }, [email]);

  useEffect(() => {
    // https://pkscl.kro.kr/major-list
    //'/major-list'
    axios.get('https://pkscl.kro.kr/major-list')
      .then((payload) => {
        setMajorList([...payload.data.majorList]);
      })
      .catch((error) => {
        alert("학과리스트를 불러올 수 없습니다.");
      })

  }, []);


  function reset() {
    setStdID("");
    setName("");
    setMajor("");
    setPassword("");
    setCheckPassword("");
    setEmail("");
    setCertFile("");
  };


  function login() {
    if (email === "" || password === "") {
      return (
        alert("아이디와 비밀번호를 모두 입력하세요")
      )
    }
    else {
      let payload = { "email": email, "password": password };
      // debugger;
      axios.post('/login/' + position, payload)
        .then((payload) => {
          console.log(payload);
          if (payload.data.position === "student") {
            history.push('/main/' + payload.data.major);
          }
          else if (payload.data.position === "president") {
            history.push('/manage/' + payload.data.major);
          }

        })
        .catch((result) => {
          console.log(result.status);
          alert("로그인에 실패했습니다.")


        });

    }
  };

  function findPassword() {
    if (email === "" || stdID === "" || name === "") {
      return (
        alert("빈칸을 모두 입력해주세요")
      )
    }
    else {
      let payload = { "email": email, "stdID": stdID, "name": name };
      axios.post('/newpwd/' + position, payload)
        .then((result) => {
          console.log(payload);
          if (window.confirm('입력하신 이메일로 임시 비밀번호를 발급하였습니다.')) {
            history.push('/');
          }
          else {
            history.push('/newpwd');
          }

        })
        .catch((error) => {
          console.log(payload);
          alert("입력하신 정보를 찾을 수 없습니다.");

        });

    }
  };

  function checkHandler() {
    setCheckState(!checkState); // 왜 함수가 다 실행되고 값이 바뀌는건지??
    if (checkState === false) {
      setPosition("president");
      console.log(position); // 기능은 정상적으로 수행되는데 log시 이전값 출력함;;;
    } else {
      setPosition("student");
      console.log(position); // 기능은 정상적으로 수행되는데 log시 이전값 출력함;;;
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
  }






  return (
    <div className="container">

      <div className="left-panel">
        <div className="content">
          <button className="btn admin" id="sign-in-btn">
            관리자로그인
          </button>
          <h3>PKNU 온라인 장부</h3>
          <p>
            우리 학과의 장부를 분기 별로 확인할 수 있습니다.
          </p>
        </div>
        <img src={log} className="image" alt="" />
      </div>
      <Switch>
        <Route exact path="/signUp">
          <div className="right-panel">
            <form className="userForm" action={"/signup/" + position} method="post" encType="multipart/form-data" >
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

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input onChange={(e) => { setStdID(e.target.value.replace(/[^0-9]/g, '')) }} name="stdID" value={stdID} maxLength="9" placeholder="학번" type="text" />
              </div>
              <div className="input-field">
                <i className="fas fa-key"></i>
                <input onChange={(e) => { setPassword(e.target.value) }} name="password" value={password} type="password" placeholder="비밀번호" />
              </div>
              <div className="input-field">
                <i className="fas fa-key"></i>
                <input onChange={(e) => { setCheckPassword(e.target.value) }} value={checkPassword} type="password" placeholder="비밀번호 재확인" />
              </div>
              <div className="input-field" style={{ fontSize: "80%" }}>
                <i className="fas fa-book-open"></i>
                <select name="major" style={{ border: "0px", background: "#f0f0f0" }} >
                  <option value={-1} selected>학과를 선택하세요</option>
                  {
                    majorList.map((major, i) => {
                      return (<option value={i + 1} key={i} >{major}</option>)
                    })
                  }




                </select>
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input onChange={(e) => { setName(e.target.value) }} name="name" value={name} type="text" placeholder="이름" />
              </div>
              {
                position === "president"
                  ?
                  (<div className="input-field">
                    <i className="fas fa-phone-alt"></i>
                    <input onChange={(e) => { setPhoneNumber(e.target.value) }} maxLength="13" name="phoneNumber" value={phoneNumber} type="text" placeholder="전화번호" />
                  </div>
                  )
                  :
                  null

              }

              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input onChange={(e) => { setEmail(e.target.value) }} name="email" value={email} type="text" placeholder="학교 이메일 @pukyong.ac.kr" />
                <label onClick={certEmail}>인증</label>
              </div>
              <div className="input-field filebox">
                <i className="fas fa-user-graduate"></i>
                <input className='uploadName' placeholder='학생증을 첨부해주세요' value={certFile} readOnly />
                <label htmlFor="certFile">찾기</label>
                <input type="file" id='certFile' name="certFile" accept='image/*' onChange={(e) => { setCertFile(e.target.value.split('/').pop().split('\\').pop()) }} />
              </div>



              <div className="submitbox" >
                <button type="submit" className="SignInBtn">회원가입</button>
              </div>
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
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="text" placeholder="학교 이메일 @pukyong.ac.kr" />
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


              <h2 style={{ padding: "20px 0 0 0" }}>비밀번호 찾기</h2>
              <div className='checkbox'><input type="checkbox" checked={checkState} onClick={() => { checkHandler() }} /><p>학생회장</p></div>

              <div >비밀번호를 찾고자 하는 아이디의 정보를 입력해 주세요.</div>

              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="text" placeholder="학교 이메일 @pukyong.ac.kr" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input onChange={(e) => { setStdID(e.target.value) }} value={stdID} type="text" maxLength="9" placeholder="학번" />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder="이름" />
              </div>
              <div className="submitbox" >
                <button onClick={() => { findPassword() }} type="button" className="SignInBtn">확인</button>
              </div>
            </form>
            <div className='moveSignPage'>
              <button onClick={() => { reset(); history.push('/') }}>로그인</button><button onClick={() => { reset(); history.push('/signUp') }}>회원가입</button>
            </div>
          </div>
        </Route >
      </Switch >
    </div >



  )
}

export default AccessPage;