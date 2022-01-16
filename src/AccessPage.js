import { useState } from 'react';
import log from './img/log.svg';
import { Nav } from 'react-bootstrap';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';

function AccessPage() {
  // let [signType, setSignType] =useState("signIn");
  let [position, setPosition] = useState("student");

  let [stdID, setStdID] = useState("");
  let [name, setName] = useState("");
  let [major, setMajor] = useState("");
  let [password, setPassword] = useState("");
  let [checkPassword, setCheckPassword] = useState("");
  let [email, setEmail] = useState("");
  let [certFile, setCerFile] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  const history = useHistory();

  function reset() {
    setStdID("");
    setName("");
    setMajor("");
    setPassword("");
    setCheckPassword("");
    setEmail("");
    setCerFile("");
  }


  function login() {
    if (email === "" || password === "") {
      return (
        alert("아이디와 비밀번호를 모두 입력하세요")
      )
    }
    else {
      let payload = { "email": email, "password": password, "position": position };
      // debugger;
      axios.post('https://pk-cog.url/login/' + position, payload)
        .then((result) => {
          console.log(payload);
        })
        .catch((error) => {
          console.log(payload);
        });

    }
  }

  function findPassword() {
    if (email === "" || stdID === "" || name === "") {
      return (
        alert("빈칸을 모두 입력해주세요")
      )
    }
    else {
      let payload = { "email": email, "stdID": stdID, "name": name };
      debugger;
      axios.post('https://pk-cog.url/newpwd', payload)
        .then((result) => {
          console.log(payload);
        })
        .catch((error) => {
          console.log(payload);
        });

    }
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
            <form className="userForm">
              <div id="nav" >
                <Nav fill variant="tabs" defaultActiveKey="link-1">
                  <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => { setPosition("student") }}>학생</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={() => { setPosition("president") }}>학생회장</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input onChange={(e) => { setStdID(e.target.value) }} value={stdID} type="text" maxLength="9" placeholder="학번" />
              </div>
              <div className="input-field">
                <i className="fas fa-key"></i>
                <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" placeholder="비밀번호" />
              </div>
              <div className="input-field">
                <i className="fas fa-key"></i>
                <input onChange={(e) => { setCheckPassword(e.target.value) }} value={checkPassword} type="password" placeholder="비밀번호 재확인" />
              </div>
              <div className="input-field">
                <i className="fas fa-book-open"></i>
                <input onChange={(e) => { setMajor(e.target.value) }} value={major} type="text" placeholder="학과" />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder="이름" />
              </div>
              {
                position === "president"
                  ?
                  (<div className="input-field">
                    <i className="fas fa-phone-alt"></i>
                    <input onChange={(e) => { setPhoneNumber(e.target.value) }} value={phoneNumber} type="text" placeholder="전화번호" />
                  </div>
                  )
                  :
                  null

              }

              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="학교 이메일 @pukyong.ac.kr" />
                <button>인증</button>
              </div>
              <div className="input-field">
                <i class="fas fa-user-graduate"></i>
                {/* <input type="text" placeholder="학생증" />
                <button type>파일첨부</button> */}
                <label htmlFor="profile-upload" />
                <input className='temp' type="file" accept="image/*" onChange={certFile} />
              </div>
              <div className="submitbox" >
                <button type="submit" value="Login" className="SignInBtn">회원가입</button>
              </div>
            </form>
            <div className='moveSignPage'>
              <button onClick={() => { reset(); history.push('/newpwd') }}>비밀번호 찾기</button><button onClick={() => { reset(); history.push('/'); }}>로그인</button>
            </div>
          </div>
        </Route>

        <Route exact path="/">
          <div className="right-panel">
            <form className="userForm">
              <div id="nav" >
                <Nav fill variant="tabs" defaultActiveKey="link-1">
                  <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => { setPosition("student") }}>학생</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={() => { setPosition("president") }}>학생회장</Nav.Link>
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
        </Route>
      </Switch>
    </div>



  )
}






// let [stdID, setStdID] = useState("");
// let [name, setName] = useState("");
// let [major, setMajor] = useState("");
// let [password, setPassword] = useState("");
// let [checkPassword, setCheckPassword] = useState("");
// let [email, setEmail] = useState("");

// function signUp(stdID, name, major, password, checkPassword, email, position) {
//   let [emailState, setEmailState] = useState(false);

//   if (stdID === "" || name === "" || major === "" || password === "" || checkPassword === "" || email === "") {
//     return (
//       alert("빈칸을 모두 입력해주세요 :)")
//     )
//   } else if (password !== checkPassword) {
//     return (
//       alert("비밀번호를 확인해주세요 :)")
//     )
//   } else if (emailState === false) {
//     alert("이메일 인증을 완료해주세요 :)")
//   } else {
//     let payload = {
//       "stdID": stdID,
//       "name": name,
//       "major": major,
//       "password": password,
//       "email": email,
//     };

//     if (position === "")
//       debugger;
//     axios.post('https://pk-cog.url/signup/' + position, payload)
//       .then((result) => {
//         console.log(payload);
//       })
//       .catch((error) => {
//         console.log(payload);
//       });

//   }
// }



export default AccessPage;