import { useState, useEffect } from 'react';
import logo from './img/logo1.png';
import { Nav } from 'react-bootstrap';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import './css/AccessPage.scss';
import PKSCLInfo from './PKSCLInfo';

function AccessPage(props) {

  const [position, setPosition] = useState("student");

  const [stdID, setStdID] = useState("");
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [certFile, setCertFile] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [majorList, setMajorList] = useState([]);
  const [isCorrect, setIsCorrect] = useState([false, false, false, false, false, false, false, false])
  const [emailTypeState, setEmailTypeState] = useState(false);
  const [resendEmail, setResendEmail] = useState(0);
  const [signUpButtonState, setSignUpButtonState] = useState(false);

  const [personalInformationButton, setPersonalInformationButton] = useState(false);
  const [personalInformation, setPersonalInformation] = useState([false, false, false]);
  const [PKSCLInfoButton, setPKSCLInfoButton] = useState(false);

  let logoImgPath = `./img/managementLogo.png`

  const history = useHistory();


  function reset() {
    setStdID("");
    setName("");
    setMajor("");
    setPassword("");
    setCheckPassword("");
    setEmail("");
    setCertFile("");
    setIsCorrect([false, false, false, false, false, false, false, false]);
    setResendEmail(0);
    setPersonalInformationButton(false);
    setPersonalInformation([false, false, false]);

    document.querySelectorAll(".InfoCheckedList").forEach(function (v) { v.checked = false });

    if (document.getElementById("major") !== null) {
      document.getElementById("major").value = "";
    }


  };

  function signUp() {
    if (signUpButtonState) {

      let payload = new FormData();

      payload.append("stdID", stdID);
      payload.append("password", password);
      payload.append("checkPassword", checkPassword);
      payload.append("major", major)
      payload.append("name", name);
      payload.append("email", email);

      if (position === "student")
        payload.append("certFile", certFile);
      else if (position === "president")
        payload.append("phoneNumber", phoneNumber);

      axios.post("/signup/" + position, payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
        .then((payload) => {
          alert("회원가입에 성공하였습니다.")
          history.push('/');
          return;
        })
        .catch((error) => {
          switch (error.response.status) {
            case 409: alert("이미 존재하는 이메일입니다."); break;
            case 403:
              alert("이메일이 인증되지 않았습니다. 이메일 인증을 완료해주세요. ");
              setResendEmail(0);
              changeIsCorrect(6, false);
              break;
            case 502:
                alert("학생증 첨부 파일의 용량이 초과되었습니다. 원활한 PKSCL 사용을 위해 이미지 용량을 10MB 이하로 변경해주세요."); break;
            default: alert("회원가입 실패/ error: " + error.response.status); break;
          }
        })
    }
    else {
      alert("빈칸을 모두 입력해주세요 :(");
    }
  }


  function login() {
    if (email === "" || password === "") {
      return (
        alert("이메일과 비밀번호를 모두 입력하세요.")
      )
    }
    else {
      let payload = { "email": email, "password": password };
      axios.post('/login/' + position, payload)
        .then((payload) => {
          props.setLoginPosition(position);
          if (position === "president") {
            axios.get('/status')
              .then((payload) => {
                if (payload.data["status"] === "approval") {
                  history.push('/edit-main');
                } else if (payload.data["status"] === "waiting" || payload.data["status"] === "refusal") {
                  history.push('/main');
                }
              })
              .catch((error) => {
                alert("회원 상태 확인 실패/ error" + error.response.status)
              })
          } else if (position === "admin" || position === "student") {
            history.push('/main');
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 401: alert("비밀번호가 틀렸습니다."); break;
            case 400: alert("로그인에 실패했습니다."); break;
            default: alert("로그인 실패/ error: " + error.response.status); break;
          }
        });

    }
  };

  function findPassword() {
    if (email === "" || stdID === "" || name === "") {
      return (
        alert("빈칸을 모두 입력해주세요.")
      )
    }
    else {
      let payload = { "email": email, "stdID": stdID, "name": name };
      axios.post('/newpwd/' + position, payload)
        .then((payload) => {
          alert("입력하신 이메일로 임시 비밀번호를 발급하였습니다.");
          history.push('/');
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400: alert("입력하신 정보를 찾을 수 없습니다."); break;
            default: alert("임시 비밀번호 발급 실패/ error: " + error.response.status); break;
          }
        });
    }
  };

  function certEmail() {
    if (window.confirm("입력하신 이메일로 인증 메일을 발송하시겠습니까?")) {
      let payload = { "email": email };
      axios.post('/email/' + position, payload)
        .then((payload) => {
          //   alert("입력하신 이메일로 메일을 발송했습니다.");
        })
        .catch((error) => {
          switch (error.response.status) {
            case 409: alert("이미 존재하는 이메일입니다."); break;
            case 400: alert("학교 이메일 형식에 맞지 않습니다."); break;
            default: alert("이메일 인증 실패/ error: " + error.response.status); break;
          }
        });
    }
  };

  function changeIsCorrect(i, type) {
    var temp = [...isCorrect];
    temp[i] = type;
    setIsCorrect(isCorrect => temp);
  };



  function changePersonalInformation(index) {
    let PersonalInformation = [...personalInformation];
    PersonalInformation[index] = !personalInformation[index];
    setPersonalInformation([...PersonalInformation]);
  };

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
    } else if (email.includes("@pukyong.ac.kr")) {
      let input = document.getElementById('inputEmail');
      input.focus();
      input.setSelectionRange(email.length - 14, email.length - 14);
    }
  }, [email]);

  useEffect(() => {
    if (position === "president") {
      for (let i = 0; i < 7; i++) {
        if (isCorrect[i] === false) {
          setSignUpButtonState(false);
          return
        }
      }
      setSignUpButtonState(true);
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

  function setColorProperty(colorQuarter, colorQuarterCircle, colorLeftPanel, colorCard, colorBackground) {
    document.documentElement.style.setProperty("--color-quarter", colorQuarter);
    document.documentElement.style.setProperty("--color-quarterCircle", colorQuarterCircle);
    document.documentElement.style.setProperty("--color-leftPanel", colorLeftPanel);
    document.documentElement.style.setProperty("--color-card", colorCard);
    document.documentElement.style.setProperty("--color-background", colorBackground);
  }

  useEffect(() => {
    setColorProperty("#59577b", "#7c7a9a", "#cdc9e6", "#ebeaee", "#f8f6fb");
    axios.get('/major-list')
      .then((payload) => {
        setMajorList([...payload.data.majorList]);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400: alert("학과리스트를 불러올 수 없습니다."); break;
          default: alert("학과리스트 로드 실패/ error: " + error.response.status); break;
        }
      })

  }, []);


  return (
    <div className="accessContainer">
      {
        PKSCLInfoButton === true
          ? <PKSCLInfo setPKSCLInfoButton={setPKSCLInfoButton}></PKSCLInfo>
          : null
      }

      <div className="left-panel">
        <div class='wave -one'></div>
        <div class='wave -two'></div>
        <div class='wave -three'></div>


        <div className="content">
          <button type="button" style={{ boxShadow: "0 0 0 0 white", fontFamily: 'YUniverse-B' }} onClick={() => { setPosition("student"); reset(); history.push('/') }}>
            <div>
              <div className="PKSCLMainLogo" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={logoImgPath} alt="logo" />
                <span className="tracking-in-expand" >PKSCL</span>
              </div>
              <div className="tracking-in-expand" >PuKyong Student Council Ledger</div>
            </div>
          </button>

        </div>
        <img src={logo} className="image" alt="PKSCL logo" />
        <button className="adminbutton PCVersion" type="button" onClick={() => { setPosition("admin"); reset(); history.push('/giraffe-admin') }}
          style={{ height: "10px", width: "20px", backgroundColor: "ffffff00", boxShadow: "0px 0px 0px 0px grey" }}>
        </button>
      </div>
      <Switch>

        <Route exact path="/signUp">
          <div className="right-panel" id="signup">
            <form className="userForm" >
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
              <h3 className="accessTitle" >
                가입을 시작합니다!</h3>
              {
                position === "student"
                  ? <div style={{ marginBottom: "10px" }}>PKSCL로 편리하고 투명하게 장부를 이용하세요. </div>
                  : <div style={{ marginBottom: "10px" }}>PKSCL로 편리하고 투명하게 장부를 관리하세요. </div>
              }
              {/* 추가 */}
              {
                personalInformationButton === false
                  ? (
                    <div style={{ width: "80%" }}>
                      <div style={{ marginBottom: "10px" }}>
                        부경대학교 온라인 장부 PKSCL 서비스를 이용해 주셔서 감사합니다. 본 약관은 온라인 장부 서비스의 이용과 관련하여 서비스를 제공하는 PKSCL과 이를 이용하는 사용자들과의 관계를 설명하며, 아울러 여러분의 PKSCL 서비스 이용에 도움이 될 수 있는 정보를 포함하고 있습니다.
                        PKSCL 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 동의해야 하기 때문에, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.

                      </div>


                      {/* <input class="InfoCheckedList" style={{ marginLeft: "16px", marginTop: "20px" }} type="checkbox"
                        onClick={() => { changePersonalInformation(0) }}
                      ></input>[필수] 부경대학교 재학생 또는 휴학생 입니다. */}
                      <details>
                        <summary><input class="InfoCheckedList" type="checkbox"
                          onClick={() => { changePersonalInformation(0) }}
                        ></input>[필수] 부경대학교 재학생 또는 휴학생 입니다.</summary>
                        <span>
                          <div style={{ backgroundColor: "var(--color-bright-gray)", margin: "10px 0 10px 0", height: "85px", overflowY: "auto" }}>
                            <p /> PKSCL은 부경대학교 소속인 학생들을 대상으로 학과의 장부를 공개하고 있습니다.
                            <br /> 1차 인증 ) 학교 인증
                            <br /> - 학교 이메일로 부경대학교 학생임을 인증 후 회원가입 가능
                            <br /> 2차 인증 ) 학과 인증
                            <br /> 학생 - 학생회장이 본과 학생으로 승인할 시 해당 학과의 온라인 장부 열람 가능
                            <br /> 학생회장 - PKSCL 챗봇을 통해 학생회장 증명 서류를 제출 한 후 해당 학과의 온라인 장부 관리 가능
                          </div>
                        </span>
                      </details>
                      <details>
                        <summary><input class="InfoCheckedList" type="checkbox"
                          onClick={() => { changePersonalInformation(1) }}
                        ></input>[필수] PKSCL 이용 약관 동의</summary>
                        <span>
                          <div style={{ backgroundColor: "var(--color-bright-gray)", margin: "10px 0 10px 0", height: "100px", overflowY: "auto" }}>
                            <p />1. 계약당사자의 의무

                            <br />PKSCL은 여러분이 PKSCL 서비스를 투명하고 편리하게 이용할 수 있도록 최선을 다하고 있습니다. 다만, 여러분이 PKSCL 서비스를 보다 안전하게 이용하고 PKSCL 서비스에서 여러분과 타인의 권리가 서로 존중되고 보호받으려면 여러분의 도움과 협조가 필요합니다. 여러분의 안전한 서비스 이용과 권리 보호를 위해 부득이 아래와 같은 경우 여러분의 장부 관리 및 열람 권한이 제한될 수 있으므로, 다음 사항들을 확인하고 준수를 요청 드립니다.

                            <br />1 - a. 회원 가입 시 이름, 이메일, 학번, 학과 등의 정보를 허위로 기재하면 안 되고 회원 계정에 등록된 정보는 항상 정확한 최신 정보가 유지될 수 있도록 관리해 해야합니다. 또한 자신의 계정을 다른 사람에게 판매, 양도, 대여 또는 담보로 제공하거나 다른 사람에게 그 사용을 허락해서는 안 됩니다. 아울러 자신의 계정이 아닌 타인의 계정을 무단으로 사용해서는 안 됩니다.

                            <br />1 - b. 학과의 장부를 캡쳐해서 무단으로 다른 SNS나 커뮤니티 등에 업로드 해서는 안 됩니다. 사용자가 학과의 장부 화면을 캡쳐해서 유포한 것이 발각이 되거나, 허위 정보로 회원가입을 시도했음이 판별된 경우 등에는 PKSCL 회원 탈퇴를 고지받을 수 있고 이 문제에 대한 책임은 본인에게 있습니다.

                            <br />1 - c.  학생회장의 경우에는 반드시 학생회실(학과사무실)에 비대면으로 제출한 장부와 동일한 내용을 온라인 장부에 업로드 해야 합니다. 장부 업로드시에 PKSCL 이용 방법을 준수하지 않아 발생하는 문제는 본인에게 있습니다.

                            <p />2. 서비스 변경 및 종료

                            <br />PKSCL은 연중 무휴, 1일 24시간 안정적으로 서비스를 제공하기 위해 최선을 다하고 있지만, 컴퓨터, 서버 등 정보통신설비의 보수점검, 교체 또는 고장, 통신두절 등 운영상 이유가 있는 경우 부득이 서비스의 전부 또는 일부를 중단할 수 있습니다.

                            <br />또한, 서비스 운영 또는 개선이 필요하다고 판단된 경우 서비스의 전부 또는 일부를 수정, 변경 또는 종료할 수 있습니다. PKSCL 서비스의 전부 또는 일부를 수정, 변경 또는 종료하게 된 경우 관련 법령에 특별한 규정이 없는 한 별도의 보상을 하지 않습니다.

                            <br />이 경우 PKSCL은 예측 가능한 경우 상당기간 전에 이를 안내하며, 만약 예측 불가능한 경우라면 사후 지체 없이 상세히 설명하고 안내 드리겠습니다.

                            <p />3. 인증 서비스

                            <br />PKSCL는 회원가입 시 사용자가 부경대의 학생임을 증명하기 위해서 사용자가 기입한 학교 이메일로 1차 인증 절차를 거칩니다. 이후 학생과 학생회장의 신분을 확인하는 2차 인증 절차를 위해서는 ‘이름, 학과, 학번, 학생증’ 등의 정보를 추가적으로 필요로 합니다. 일반 학생이 회원가입을 한 경우에는 회원가입시 제출한 학생증, 학번, 이름을 토대로 해당 학생의 학과 학생회장이 해당 학과의 학생임을 확인한 후에 학생은  학과의 장부를 확인할 수 있습니다. 아울러 학생회장으로 회원가입을 한 경우에는 PKSCL 챗봇을 통해 학생회장임을 증명하는 서류를 추가적으로 제출한 후에 학생회장으로 온라인 학과 장부를 관리할 수 있습니다.
                          </div>
                        </span>
                      </details>
                      <details >
                        <summary><input class="InfoCheckedList" type="checkbox"
                          onClick={() => { changePersonalInformation(2) }}
                        ></input>[필수] 개인정보 수집 및 이용 동의</summary>
                        <span>
                          <div style={{ backgroundColor: "var(--color-bright-gray)", margin: "10px 0 10px 0", height: "100px", overflowY: "auto" }}>
                            <p /> 1. PKSCL 계정 이용계약

                            <br />1 - a) 수집되는 개인 정보

                            <br />PKSCL가 제공하는 온라인 장부 서비스는 회원가입을 해야지만 이용이 가능합니다. 그리고 사용자가 회원가입을 하는 절차에서 부경대 재학생 및 학과 인증을 하기 위해 필요한 최소한의 개인정보를 수집합니다.

                            <br />회원가입 시점에 PKSCL이 이용자로부터 수집하는 개인정보는 아래와 같습니다.

                            <br />- 학생이 회원 가입 시에 ‘학번, 학과, 이름, 학교 이메일, 학생증’을 필수항목으로 수집합니다. 학생회장의 경우엔 ‘전화번호’를 추가로 수집합니다. 또한, 회원가입 이후에 챗봇을 통해 학생회장을 증명하기 위한 추가적인 서류를 요구할 수 있습니다.

                            <br /> 서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.

                            <br />- 임시 비밀번호 발급 및 비밀번호 찾기를 요청할 경우에는 본인인증을 위해 ‘이메일, 학번, 이름’을 필수 항목으로 수집합니다.

                            <br />- 로그인 후 개별 서비스에서 정보 변경 기능 및 비밀번호 변경을 이용할 시에 프로필 정보(학과, 이름, 전화번호, 학생증)를 설정할 수 있습니다.

                            <br />1 - b) 수집한 개인정보의 이용

                            <br />수집한 개인정보는 PKSCL 서비스의 회원관리, 서비스 개발・제공 등 아래의 목적으로만 이용합니다.

                            <br />- 회원 가입 의사의 확인, 부경대 학생임을 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.(이메일 : 본인확인용 이메일 전송 및 임시 비밀번호 발급, 회원 식별용 정보로 활용 , 비밀번호 : 본래 값을 확인하지 못하도록 일방향 암호화하여 저장, 학생증 파일: 본인확인용, 추후 재확인이 필요할 경우를 위해 6개월 보관 후 자동 삭제, 장부 열람 권한 및 권한 승인 신청 정보 저장 : 부적절한 사용자의 정보 조회를 방지 , 이름, 학과 : DB 내 정보 조회를 위한 사용자 정보 식별, 학번 : 학생증과 대조를 통한 본인확인, 회원 식별용 정보로 활용, 전화번호 : 학과 회장의 정보 제공용 )

                            <br />- 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 단방향 암호화하여 쿠키로 저장합니다.( 쿠키: 사이트 내 로그인 유지를 위해 서버에서 임의로 생성한 세션 ID 저장 및 전송 )

                            <br />- 추가적으로, 학생들이 장부와 관련하여 학생회장에게 문의를 할 경우 연락을 취할 수 있도록 장부 열람 페이지에 학생회장의 이름, 이메일, 전화번호가 명시됨을 미리 알려드립니다.

                            <br />1 - c) 개인정보의 보관기간

                            <br />PKSCL은 원칙적으로 이용자의 개인정보를 해당 회원이 탈퇴를 할 시 지체없이 파기하고 있습니다. 예외적으로 PKSCL 이용 약관에 어긋나는 행위를 하였을 경우에는 부정 가입 및 이용을 방지하기 위해 부정 이용자의 가입인증 이메일을 탈퇴일로부터 6개월 보관 합니다.

                            <br />1 - d) 개인정보 수집 및 이용 동의를 거부할 권리

                            <br />이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 하지만 회원가입 시 수집하는 최소한의 개인정보, 즉, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.

                            <p /> 2. 서비스 이용 계약 해지

                            <br />2 -a) 사용자가 회원 탈퇴를 신청한 경우

                            <br />사용자가 PKSCL 이용을 더 이상 원치 않는 때에는 언제든지 서비스 내 제공되는 메뉴를 이용하여 이용계약의 해지 신청을 할 수 있습니다. 이용계약이 해지되면 법령 및 개인정보 처리방침에 따라 여러분의 정보를 보유하는 경우를 제외하고는 여러분의 PKSCL 계정 정보 및 PKSCL 계정으로 이용하였던 개별 서비스 데이터는 삭제됩니다. 이용계약이 해지된 경우라도 사용자는 언제든 다시 PKSCL에 회원가입을 신청할 수 있습니다.

                            <br />2 - b) 위 약관들에 어긋나는 행동을 보일 경우

                            <br />사용자가 관련 법령, 본 약관, 계정 및 서비스 운영정책 등을 준수하지 않을 경우, PKSCL은 사용자의 관련 행위 내용을 확인할 수 있으며, 그 확인 결과에 따라 PKSCL 서비스 이용에 대한 주의를 당부하거나, 더 이상 PKSCL 서비스 이용계약의 온전한 유지를 기대하기 어려운 경우엔 부득이 사용자에게 계정 탈퇴를 고지할 수 있습니다. 이 경우에는 PKSCL의 계약당사자 의무를 이행하지 않은 것으로 판단이 된 경우이기 때문에 이에 대한 문제는 본인에게 있음을 미리 말씀드립니다.
                          </div>
                        </span>
                      </details>
                      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <button type="button" className="SignInBtn" onClick={() => {
                          function personInfomationAgreeNow() {
                            if (personalInformation.includes(false)) {
                              alert("PKSCL 이용약관과 개인정보 수집 및 이용에 대한 안내 모두 동의해주세요.");
                              return false;
                            } else return true;
                          }

                          if (personInfomationAgreeNow()) {
                            setPersonalInformationButton(true);
                          }
                        }}> 동의 </button>
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
                      }
                      } name="stdID" value={stdID} maxLength="9" placeholder="학번" type="text" />
                    </div>
                    <div className="input-field" style={isCorrect[1] === false && password !== "" ? { marginBottom: "2px" } : null}>
                      <i className="fas fa-key" style={isCorrect[1] === true ? { color: "var(--color-quarter)" } : null}></i>
                      <div style={{ width: "70%" }}>
                        <input style={{ width: "100%" }}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            // if (e.target.value.length !== 0) {
                            if (e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/)) {
                              changeIsCorrect(1, true);
                            } else {
                              changeIsCorrect(1, false);
                            }

                          }} name="password" value={password} type="password" placeholder="비밀번호" />
                      </div>
                    </div>
                    {
                      isCorrect[1] === false && password !== ""
                        ? <span style={{ fontSize: "1px", color: "red", marginBottom: "15px" }}>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요. </span>
                        : null
                    }

                    <div className="input-field" style={isCorrect[2] === false && checkPassword !== "" ? { marginBottom: "2px" } : null}>
                      <i className="fas fa-key" style={isCorrect[2] === true ? { color: "var(--color-quarter)" } : null}></i>
                      <input onChange={(e) => {
                        setCheckPassword(e.target.value)
                        if (e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/) && password === e.target.value) {
                          changeIsCorrect(2, true);
                        } else {
                          changeIsCorrect(2, false);
                        }
                      }
                      } name="checkPassword" value={checkPassword} type="password" placeholder="비밀번호 재확인" />
                    </div>
                    {
                      isCorrect[2] === false && checkPassword !== ""
                        ? <span style={{ fontSize: "1px", color: "red", marginBottom: "15px" }}> 비밀번호가 일치하지 않습니다. </span>
                        : null
                    }

                    <div className="input-field" style={{ fontSize: "80%" }}>
                      <i className="fas fa-book-open" style={isCorrect[3] === true ? { color: "var(--color-quarter)" } : null}></i>
                      <label htmlFor="majorList"></label>
                      <input type="text" list="majorList-options" id='major' name="major" placeholder="학과를 입력하세요."
                        onChange={(e) => {
                          setMajor(majorList.indexOf(e.target.value));
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
                            if (i !== 0) {
                              return (
                                <option value={majorName} key={i} ></option>
                              )
                            }
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

                                  if (e.target.value.indexOf('@') === 0) {
                                    setEmailTypeState(false);
                                  } else if (emailType === "@pukyong.ac.kr") {
                                    setEmailTypeState(true);
                                  } else {
                                    setEmailTypeState(false);
                                  }
                                }} name="email" value={email} type="text" placeholder="학교 이메일 @pukyong.ac.kr" />
                              <label className="certEmail" onClick={() => {
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
                    {
                      position === "student"
                        ?
                        <div className="input-field filebox">
                          <i className="fas fa-user-graduate" style={isCorrect[7] === true ? { color: "var(--color-quarter)" } : null}></i>
                          <input className='uploadName' placeholder='학생증을 첨부해주세요.' value={certFile.name} readOnly />
                          <label htmlFor="certFile">찾기</label>
                          <input type="file" id='certFile' name="certFile" accept='image/*'
                            onChange={(e) => {
                              setCertFile(e.target.files[0]);
                              if (e.target.value === "") {
                                changeIsCorrect(7, false);
                              } else {
                                changeIsCorrect(7, true);
                              }
                            }} />
                        </div>
                        : null
                    }

                    <div className="submitbox" >
                      <button type="button" style={signUpButtonState ? null : { backgroundColor: '#ACACAC' }}
                        className="SignInBtn" onClick={() => { signUp() }}  >회원가입</button>
                    </div>
                  </>
                  )
              }

            </form>
            <div className='moveSignPage'>
              <button style={{ boxShadow: "0 0 0 0 white" }} onClick={() => { reset(); history.push('/newpwd') }}>비밀번호 찾기</button>
              <button style={{ boxShadow: "0 0 0 0 white" }} onClick={() => { reset(); history.push('/'); }}>로그인</button>
            </div>
          </div>

        </Route >

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
              <h3 className="accessTitle" style={{ marginBottom: "15px" }}>비밀번호 찾기</h3>
              <div className="findPasswordContext" > 가입 시 등록된 학교 이메일로 임시 비밀번호를 발급 받으실 수 있습니다.</div>

              <div className="input-field">
                <i className="fas fa-envelope" style={isCorrect[5] === true ? { color: "var(--color-quarter)" } : null}></i>
                <input id="inputEmail" onChange={(e) => {
                  setEmail(e.target.value);
                  const emailType = e.target.value.substring(e.target.value.indexOf("@"));
                  if (e.target.value.indexOf('@') === 0) {
                    setEmailTypeState(emailTypeState => false);
                    changeIsCorrect(5, false);
                  } else if (emailType === "@pukyong.ac.kr") {
                    setEmailTypeState(emailTypeState => true);
                    changeIsCorrect(5, true);
                  } else {
                    setEmailTypeState(emailTypeState => false);
                    changeIsCorrect(5, false);
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
              <button style={{ boxShadow: "0 0 0 0 white" }} onClick={() => { reset(); history.push('/') }}>로그인</button><button style={{ boxShadow: "0 0 0 0 white" }} onClick={() => { reset(); history.push('/signUp') }}>회원가입</button>
            </div>
          </div>
        </Route >

        <Route exact path="/giraffe-admin">
          <div className="right-panel">
            <form className="userForm">
              <h3 className="accessTitle" style={{ marginBottom: "20px", marginTop: "20px" }} >관리자 로그인</h3>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input id="inputEmail" onChange={(e) => { setEmail(e.target.value) }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") { login() }
                  }}
                  value={email} type="text" placeholder="학교 이메일 @pukyong.ac.kr" />
              </div>
              <div className="input-field">
                <i className="fas fa-key"></i>
                <input onChange={(e) => { setPassword(e.target.value) }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") { login() }
                  }}
                  value={password} type="password" placeholder="비밀번호" />
              </div>

              <div className="submitbox" >
                <button type="button" onClick={() => { reset(); setPosition("admin"); login(); }} value="Login" className="SignInBtn">로그인</button>
              </div>
            </form>
            <div className='moveSignPage'>
              <button style={{ boxShadow: "0 0 0 0 white" }} onClick={() => { setPosition("student"); reset(); history.push('/') }}>메인페이지</button>
            </div>
          </div>
        </Route>

        <Route path="/">
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
              <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <h3 className="accessTitle">
                  환영합니다</h3>
                <div style={{ marginBottom: "10px" }}>우리 학과의 장부를 분기 별로 확인할 수 있습니다.</div>
              </div>


              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input id="inputEmail" onChange={(e) => { setEmail(e.target.value) }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") { login() }
                  }}
                  value={email} type="text" placeholder="학교 이메일 @pukyong.ac.kr" />
              </div>
              <div className="input-field">
                <i className="fas fa-key"></i>
                <input onChange={(e) => { setPassword(e.target.value) }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") { login() }
                  }}
                  value={password} type="password" placeholder="비밀번호" />
              </div>

              <div className="submitbox" >
                <button type="button" onClick={() => { reset(); login() }} value="Login" className="SignInBtn">로그인</button>
              </div>
            </form>
            <div className='moveSignPage'>
              <button style={{ boxShadow: "0 0 0 0 white" }} onClick={() => { reset(); history.push('/newpwd') }}>비밀번호 찾기</button><button style={{ boxShadow: "0 0 0 0 white" }} onClick={() => { reset(); history.push('/signUp'); }}>회원가입</button>
            </div>
          </div>
        </Route>
      </Switch >

      <button className="adminbutton mobileVersion" type="button" onClick={() => { setPosition("admin"); reset(); history.push('/giraffe-admin') }}
        style={{ height: "10px", width: "20px", backgroundColor: "ffffff00", boxShadow: "0px 0px 0px 0px grey" }}>
      </button>
      <button className="PKSCLInfoButton" type="button" onClick={() => { setPKSCLInfoButton(true) }}>
        <i className="fas fa-question" ></i>
      </button>
    </div >
  )
}

export default AccessPage;