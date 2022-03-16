import { useEffect, useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import './css/ManagementPage.css';
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import PreviewImg from './PreviewImg';

function ManagementPage(props) {


    const history = useHistory();
    const [waiting, setWaiting] = useState([]);
    const [refusal, setRefusal] = useState([]);
    const [approval, setApproval] = useState([]);

    const [leftTable, setLeftTable] = useState([...waiting]);
    const [rightTable, setRightTable] = useState([...approval]);

    const [leftCheckedList, setLeftCheckedList] = useState([]);
    const [rightCheckedList, setRightCheckedList] = useState([]);

    const [searchStudent, setSearchStudent] = useState("");
    const [searchButton, setSearchButton] = useState("search");
    const [showImg, setShowImg] = useState(false);
    const [previewImg, setPreviewImg] = useState();

    const [logoImgPath, setLogoImgPath] = useState();

    const [wrongApproach, setWrongApproach] = useState(false);
    const [wrongApproachContext, setWrongApproachContext] = useState();
    const [userLoginPosition, setUserLoginPosition] = useState();
    const [email, setEmail] = useState("");

    const [delegating, setDelegating] = useState(false);
    const [delegatingButtonState, setDelegatingButtonState] = useState(false);

    const changeHandler = (checked, studentInfo, setCheckedList, checkedList) => {
        if (checked) {
            setCheckedList([...checkedList, studentInfo]);
        } else {
            setCheckedList(checkedList.filter((e) => e !== studentInfo));
        }
    };

    function reload(){
        axios.get('/position')
            .then((payload) => {
                setUserLoginPosition(payload.data["position"])
                if (payload.data["position"] === "president") {
                    axios.get('/status')
                        .then((payload) => {
                            if (payload.data["status"] === "refusal") {
                                setWrongApproachContext("사용자(학생회장)은 현재 거절 상태입니다. PKSCL 챗봇을 통해 회장 신청을 다시 진행해 주십시오.");
                                setWrongApproach(true)
                            }
                            else if (payload.data["status"] === "waiting") {
                                setWrongApproachContext("사용자(학생회장)은 현재 대기 상태입니다. PKSCL 챗봇을 통해 회장 인증을 해주세요 :)");
                                setWrongApproach(true)
                            } else if (payload.data["status"] === "approval") {
                                getPresidentList();
                            }
                        })
                        .catch((error) => {
                            switch (error.response.status) {
                                case 400:  
                                    setWrongApproachContext("사용자의 승인 상태를 알 수 없습니다.");  
                                    setWrongApproach(true)
                                    setLogoImgPath(`./img/managementLogo.png`);
                                break;
                                default: 
                                    setWrongApproachContext("회원 상태 확인 실패/ error: " + error.response.status);  
                                    setWrongApproach(true) 
                                    setLogoImgPath(`./img/managementLogo.png`);
                                break;
                            }
                        })
                } else if (payload.data["position"] === "admin") {
                    getAdminList();
                } else {
                    setWrongApproachContext("잘못된 접근입니다.");
                    setWrongApproach(true)
                    setLogoImgPath(`./img/managementLogo.png`);
                }
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400:  
                        setWrongApproachContext(`잘못된 접근입니다.`);
                        setWrongApproach(true)
                        setLogoImgPath(`./img/managementLogo.png`);
                    break;
                    default: 
                        setWrongApproachContext("회원 position 로드 실패/ error: " + error.response.status);  
                        setWrongApproach(true) 
                        setLogoImgPath(`./img/managementLogo.png`);
                    break;
                }
            })
    }

    function logout() {
        axios.post(  '/logout')
            .then((payload) => {
                history.push('/');
            }).catch((error) => {
                switch (error.response.status) {
                    case 400:  
                        alert("로그아웃에 실패했습니다."); 
                        reload();
                    break;
                    default: 
                        alert("로그아웃 실패/ error: " + error.response.status); 
                        reload();
                    break;
                }
            })
    }

    function patchStudent(studentStatus) {
        let payload;
        if (studentStatus === "approval" || studentStatus === "refusal") {
            payload = {
                "status": studentStatus,
                "email": leftCheckedList
            };
        } else if (studentStatus === "delegating" || studentStatus === "waiting") {
            payload = {
                "status": studentStatus,
                "email": rightCheckedList
            };
        } else {
            alert("error!");
        }
        if (userLoginPosition === "president") {
            axios.patch('/student-list', payload)
                .then((payload) => {
                    getPresidentList();
                })
                .catch((error) => {
                    switch (error.response.status) {
                        case 400: 
                            alert("학생 리스트 변경에 실패했습니다 :)")
                            getPresidentList();
                        break;
                        default: 
                            alert("학생 리스트 변경 실패/ error: " + error.response.status); 
                            getPresidentList();
                        break;
                    }
                });
        } else if (userLoginPosition === "admin") {
            axios.patch( '/president-list', payload)
                .then((payload) => {
                    getAdminList();
                })
                .catch((error) => {
                    switch (error.response.status) {
                        case 409:
                            alert("이미 학과가 개설된 학생회장을 승인했습니다. 해당 학과를 대기 상태로 이동 후 방금 작업을 진행해주세요:)")
                            getAdminList();
                        break;
                        case 400: 
                            alert("학생회장 리스트 변경에 실패했습니다 :)")
                             getAdminList();
                        break;
                        default: 
                            alert("학생회장 리스트 변경 실패/ error: " + error.response.status); 
                            getAdminList();
                        break;
                    }
                });
        }
    }

    function delegatingButton() {
        let payload = {
            'email': email
        }
        axios.patch( '/major-president', payload)
            .then((payload) => {
                alert("성공적으로 학생회장 위임이 되었습니다.")
                logout();
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400:  alert("학생회장 위임에 실패했습니다."); break;
                    default: alert("학생회장 위임 실패/ error: " + error.response.status); break;
                }
            });
    }


    function getPresidentList() {
        axios.get( '/student-list')
            .then((payload) => {
                setWaiting([...payload.data["waiting"]]);
                setRefusal([...payload.data["refusal"]]);
                setApproval([...payload.data["approval"]]);
                setLeftTable([...payload.data["waiting"]]);
                setRightTable([...payload.data["approval"]]);
                setWrongApproach(false)
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400:  
                        setWrongApproachContext("학생리스트를 불러올 수 없습니다.");
                        setWrongApproach(true) 
                        setLogoImgPath(`./img/managementLogo.png`);
                    break;
                    default: 
                        setWrongApproachContext("학생리스트 로드 실패/ error: "+ error.response.status); 
                        setWrongApproach(true) 
                        setLogoImgPath(`./img/managementLogo.png`);
                    break;
                }
            });
    }

    function getAdminList() {
        axios.get( '/president-list')
            .then((payload) => {
                setWaiting([...payload.data["waiting"]]);
                setRefusal([...payload.data["refusal"]]);
                setApproval([...payload.data["approval"]]);
                setLeftTable([...payload.data["waiting"]]);
                setRightTable([...payload.data["approval"]]);
                setWrongApproach(false)
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400:  
                        setWrongApproachContext("학과리스트를 불러올 수 없습니다.");
                        setWrongApproach(true) 
                        setLogoImgPath(`./img/managementLogo.png`);
                    break;
                    default: 
                        setWrongApproachContext("학과리스트 로드 실패/ error: "+ error.response.status); 
                        setWrongApproach(true) 
                        setLogoImgPath(`./img/managementLogo.png`);
                    break;
                }
            });
        }



    function pressSearchStudent() {
        if (searchButton === "x") {
            setSearchStudent("");
            setSearchButton("search");
            setLeftTable([...waiting]);
            setRightTable([...approval]);
        } else {
            if (searchStudent === "") {
                alert("검색명을 입력해주세요 :)");
            } else {
                setSearchButton("x");
                let left;
                let right ;
                if(userLoginPosition === "president"){
                    left = waiting.filter((item) => (item.name.includes(searchStudent) || item.stdID.includes(searchStudent)));
                    right = approval.filter((item) => (item.name.includes(searchStudent) || item.stdID.includes(searchStudent)));
                }else if(userLoginPosition === "admin"){
                    left = waiting.filter((item) => (item.name.includes(searchStudent) || item.stdID.includes(searchStudent)||item.major.includes(searchStudent)||item.email.includes(searchStudent)||item.phoneNumber.includes(searchStudent)));
                    right = approval.filter((item) => (item.name.includes(searchStudent) || item.stdID.includes(searchStudent)||item.major.includes(searchStudent)||item.email.includes(searchStudent)||item.phoneNumber.includes(searchStudent)));
                }
                setLeftTable(left);
                setRightTable(right);
            }

        }
    }

    


    useEffect(() => {
        reload();
        //push 할 때 삭제

    // let 임시리스트 = {
    //     waiting:
    //         [{
    //             "major": "학과1",
    //             "email": "srge@naver.com",
    //             "stdID": "3123",
    //             "name": "이름1",
    //             "phoneNumber": "01011111111",
    //             "studentImgPath": "/img/time.png",
    //         },
    //         {
    //             "major": "학과1",
    //             "email": "fdssf@naver.com",
    //             "stdID": "312231",
    //             "name": "이름1",
    //             "phoneNumber": "01011111111",
    //             "studentImgPath": "/img/time.png",
    //         },
    //         {
    //             "major": "학과1",
    //             "email": "aaaasdasaa@naver.com",
    //             "stdID": "321313",
    //             "name": "이름1",
    //             "phoneNumber": "01011111111",
    //             "studentImgPath": "/img/time.png",
    //         },
    //         {
    //             "major": "학과1",
    //             "email": "asas@naver.com",
    //             "stdID": "23322",
    //             "name": "이름1",
    //             "phoneNumber": "01011111111",
    //             "studentImgPath": "/img/time.png",
    //         },
    //         {
    //             "major": "학과1",
    //             "email": "aaasadadaa@naver.com",
    //             "stdID": "111111111",
    //             "name": "이름1",
    //             "phoneNumber": "01011111111",
    //             "studentImgPath": "/img/time.png",
    //         },
    //         {
    //             "major": "학과2",
    //             "email": "bbbbb@naver.com",
    //             "stdID": "22222222",
    //             "name": "이름2",
    //             "phoneNumber": "01022222222",
    //             "studentImgPath": "/img/time.png",
    //         },
    //         {
    //             "major": "학과3",
    //             "email": "ccccc@naver.com",
    //             "stdID": "333333",
    //             "name": "이름3",
    //             "phoneNumber": "010333333",
    //             "studentImgPath": "/img/time.png",
    //         }],
    //     refusal: [],
    //     approval: [{
    //         "major": "학과4",
    //         "email": "dddd@naver.com",
    //         "stdID": "444444",
    //         "name": "이름4",
    //         "phoneNumber": "010444444",
    //         "studentImgPath": "/img/time.png",
    //     }, {
    //         "major": "학과5",
    //         "email": "eeee@naver.com",
    //         "stdID": "555555",
    //         "name": "이름5",
    //         "phoneNumber": "010555555",
    //         "studentImgPath": "/img/time.png",
    //     }, {
    //         "major": "학과6",
    //         "email": "ffff@naver.com",
    //         "stdID": "666666",
    //         "name": "이름6",
    //         "phoneNumber": "010666666",
    //         "studentImgPath": "/img/time.png",
    //     }],
    // }
        // setWaiting([...임시리스트["waiting"]]);
        // setRefusal([...임시리스트["refusal"]]);
        // setApproval([...임시리스트["approval"]]);
        // setLeftTable([...임시리스트["waiting"]]);
        // setRightTable([...임시리스트["approval"]]);
        // setUserLoginPosition("president")

    }, []);

    useEffect(() => {
        if (email.length === 1) {
            setEmail(email + "@pukyong.ac.kr");
        } else if (email.includes("@pukyong.ac.kr")) {
            let input = document.getElementById('email');
            input.focus();
            input.setSelectionRange(email.length - 14, email.length - 14);
        }
    }, [email]);

    return (
        <>
            {wrongApproach === true
                ? (<div className="ManagementPageContainer"><div className="nav">
                    <div className="logoNav" onClick={()=>{history.push('/main')}}>
                        <img src={`./img/managementLogo.png`} alt="logo" width={"40px"} height={"40px"} />
                        <div className="PksclNav">PKSCL</div>
                    </div>
                    <div className="buttonNav">
                        <i className="headset fas fa-headset" onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                        <button className='navButton  ' type='button' onClick={() => { history.push('/'); }}>로그인</button>
                    </div>
                </div>
                    <div className="MainPageContainer"
                        style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        {wrongApproachContext}<br />
                        <a href="http://pf.kakao.com/_tRxcJb " target="_blank" rel="noreferrer" title="챗봇으로 연결됩니다." style={{ color: "black" }}>PKSCL 문의하기</a>
                    </div></div>)
                : (
                    <div className="ManagementPageContainer">
                        <div className="mobileVersion" style={{marginTop:"10vh"}}> {
                            userLoginPosition ==="student"
                            ? <>학생 관리는 학생회장만 접속할 수 있습니다.</>
                            : <>PKSCL 학생관리는 PC로만 가능합니다.</>
                        }
                            <div className="nav">
                                <div className="logoNav" onClick={() => { history.push('/main') }}>
                                    <img  src={`./img/managementLogo.png`} alt="logo" width={"40px"} height={"40px"} />
                                    <div className="PksclNav">PKSCL</div>
                                </div>
                                <div className="buttonNav">
                                    {
                                        userLoginPosition === "president"
                                            ? (<>
                                            <i className="headset fas fa-headset"
                                                    onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                    <button className="navButton  " onClick={() => { history.push('/edit-main') }}>장부 수정</button>
                                                    <button className='navButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                                </>)
                                            : null
                                    }
                                    {
                                        userLoginPosition === "admin"
                                            ? <><i className="headset fas fa-headset"
                                                    onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                    <button className="navButton  " onClick={() => { history.push('/main') }}>장부 확인</button></>
                                            : null
                                    }
                                </div >


                            </div>
                        </div>
                        <div className="PCVersion">

                            {
                                delegating === true
                                    ? <div className="alertEmailContainer">
                                        <div className="alertEmailbox">
                                            <div className='boxTitle' style={{ justifyContent: "center" }}  >
                                                <h2 ><i className="fas fa-user boxUser"  />학생회장 위임</h2>
                                            </div>
                                            <div className="alertEmailField" style={{ borderColor: "#dc3545" }}>
                                                <div style={{ width: "80%" ,display:"flex",flexDirection: "column",alignItems: "center"}}>
                                                    1. 새 학생회장이 "학생회장 계정"으로 회원가입
                                                    <br /> 2. 위임하고자 하는 학생회장 계정의 이메일을 입력

                                                    <div className="inputField alertEmail" style={{ marginTop: "10px",    maxWidth: "350px" }}>
                                                        <i className="fas fa-envelope"></i>
                                                        <label>이메일</label>
                                                        <input id="email" onChange={(e) => {
                                                            setEmail(e.target.value)
                                                            if (e.target.value.includes("@pukyong.ac.kr")) {
                                                                setDelegatingButtonState(true)
                                                            } else {
                                                                setDelegatingButtonState(false)
                                                            }
                                                        }} value={email} type="text" placeholder='이메일을 입력하세요.' />
                                                    </div>
                                                    <div style={{color:"rgb(220, 53, 69)"}}>
                                                    ※ 위임 완료시 본 계정은 대기 상태로 전환되며 <br/>장부 수정 및 학생 관리 기능을 수행하실 수 없습니다.</div></div>
                                                <br />
                                            </div>
                                            <div>{
                                                delegatingButtonState
                                                    ?
                                                    <>
                                                        <button type="button" className="submitButton" style={{ backgroundColor: "#dc3545" }} onClick={() => {
                                                            delegatingButton()
                                                        }}>위임하기
                                                        </button>
                                                    </>
                                                    :
                                                    <>
                                                        <button className="submitButton" type="button" style={{ backgroundColor: "white", color: "black" }} onClick={() => {
                                                            alert('학교 이메일 계정을 입력해주세요.');
                                                        }}>위임하기
                                                        </button>
                                                    </>
                                            }
                                                <button type="button" className="submitButton" style={{ backgroundColor: "white", color: "black" }}
                                                    onClick={() => {
                                                        setDelegating(false);
                                                    }}>취소하기
                                                </button></div>
                                        </div>
                                    </div>
                                    : null
                            }

                            {
                                showImg === true
                                    ? (<PreviewImg previewImg={previewImg} setShowImg={setShowImg}></PreviewImg>)
                                    : null
                            }
                            {
                                userLoginPosition === "student"
                                    ? <div>잘못된 접근입니다.</div>
                                    : (
                                        <>
                                            <div className="pageContainer">
                                                <div className="nav">
                                                    <div className="logoNav" onClick={() => { history.push('/main') }}>
                                                        <img  src={`./img/managementLogo.png`} alt="logo"  width={"40px"} height={"40px"} />
                                                        <div className="PksclNav">PKSCL</div>
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        {
                                                            userLoginPosition === "president"
                                                                ? <div style={{ fontSize: "25px" }}>학생승인 현황</div>
                                                                : <div style={{ fontSize: "25px" }}>학과 개설현황</div>
                                                        }
                                                        <div className="searchBar" >
                                                            <input onChange={(e) => {
                                                                setSearchStudent(e.target.value);
                                                                setSearchButton("search");
                                                                if (e.target.value === "") {
                                                                    setSearchButton("search");
                                                                    setLeftTable([...waiting]);
                                                                    setRightTable([...approval]);
                                                                }
                                                            }}
                                                                onKeyPress={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        pressSearchStudent()
                                                                    }
                                                                }}
                                                                name="q" value={searchStudent} type="search" placeholder="Search" ></input>

                                                            <button onClick={() => {
                                                                pressSearchStudent()
                                                            }}
                                                                className='searchButton' type='button'>
                                                                {
                                                                    searchButton === "search"
                                                                        ? <i className="fas fa-search"></i>
                                                                        : <i className="fas fa-times"></i>
                                                                }
                                                            </button>

                                                        </div>
                                                    </div >
                                                    {
                                                        userLoginPosition === "president"
                                                            ?
                                                            <>
                                                                <div className="buttonNav">
 {
                                                                        userLoginPosition === "admin"
                                                                            ? null
                                                                            : <i className="headset fas fa-headset"  onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                                    }
                                                                    <button className="navButton" style={{ backgroundColor: "#dc3545" }} onClick={() => { setDelegating(true) }}>학생회장 위임</button>
                                                                    <button className="navButton  "
                                                                        onClick={() => {
                                                                            if (userLoginPosition === "admin") {
                                                                                history.push('/main')
                                                                            } else if (userLoginPosition === "president") {
                                                                                history.push('/edit-main')
                                                                            }
                                                                        }}>장부 수정</button>
                                                                        <button className='navButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                                                </div>
                                                            </>
                                                            : null
                                                    }

                                                    {
                                                        userLoginPosition === "admin"
                                                            ?
                                                            <>
                                                                <div className="buttonNav">
                                                                    <i className="headset fas fa-headset"  onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                               
                                                                    <button className="navButton" type='button' style={{ width: "auto" }}
                                                                        onClick={() => {
                                                                            if (userLoginPosition === "admin") {
                                                                                history.push('/main')
                                                                            } else if (userLoginPosition === "president") {
                                                                                history.push('/edit-main')
                                                                            }
                                                                        }}>학과별 장부 확인 및 수정</button>
                                                                        <button className='navButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                                                     </div>
                                                            </>
                                                            : null
                                                    }


                                                </div>
                                                <div className='tables'>
                                                    <div className="tableSet" >
                                                        <div className="buttons">
                                                            <button className='submitButton' onClick={() => {
                                                                if (leftCheckedList.length === 0) {
                                                                    alert("승인할 학생을 1명 이상 선택하세요 :)")
                                                                } else {
                                                                    patchStudent("approval");
                                                                }
                                                                setLeftCheckedList([]);
                                                            }}>승인</button>
                                                            <button className='submitButton' onClick={() => {
                                                                setLeftCheckedList([]);
                                                                if (leftCheckedList.length > 0) {
                                                                    patchStudent("refusal");
                                                                } else {
                                                                    alert("거절할 학생을 1명 이상 선택하세요 :)")
                                                                }
                                                            }}>거절</button>
                                                        </div>
                                                        <table >
                                                            <thead>
                                                                <tr >
                                                                    <th colSpan={"3"} style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }}>승인대기</th>
                                                                </tr>
                                                            </thead>
                                                            <div className="tableRadius" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                                <tbody className="tableList" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                                    {
                                                                        leftTable.length === 0
                                                                            ? <tr>
                                                                                <td style={{ background: "white" }} colSpan={"3"}>승인대기 학생이 없습니다.</td>
                                                                            </tr>
                                                                            : leftTable.map((student, i) => {
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        {
                                                                                            userLoginPosition === "president"
                                                                                                ? (<><td>{student.stdID}</td>
                                                                                                    <td>{student.name}</td>
                                                                                                    <td><button className="certFileButton" type='button' onClick={() => {
                                                                                                        setShowImg(true);
                                                                                                        setPreviewImg(student.studentImgPath);
                                                                                                    }}>학생증</button></td>
                                                                                                    <td ><input
                                                                                                        id={student}
                                                                                                        type="checkbox"
                                                                                                        onChange={(e) => {
                                                                                                            changeHandler(e.target.checked, student["email"], setLeftCheckedList, leftCheckedList)
                                                                                                        }}
                                                                                                        checked={leftCheckedList.includes(student["email"]) ? true : false}
                                                                                                    /></td>
                                                                                                </>)
                                                                                                : (<><tr style={{ backgroundColor: "var(--color-tableEven)" }}>
                                                                                                    <td>{student.major}</td>
                                                                                                    <td>{student.name}</td>
                                                                                                    <td>{student.stdID}</td>
                                                                                                </tr><tr style={{ backgroundColor: "var(--color-tableEven)" }}>
                                                                                                        <td style={{ borderBottom: "1px solid var(--color-quarterCircle)" }}>{student.phoneNumber}</td>
                                                                                                        <td style={{ borderBottom: "1px solid var(--color-quarterCircle)" }}>{student.email}</td>
                                                                                                        <td style={{ borderBottom: "1px solid var(--color-quarterCircle)" }}>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <td style={{ width: "100px", backgroundColor: "var(--color-tableEven)", borderBottom: "1px solid var(--color-quarterCircle)" }}><
                                                                                                        input
                                                                                                        id={student}
                                                                                                        type="checkbox"
                                                                                                        onChange={(e) => {
                                                                                                            changeHandler(e.target.checked, student["email"], setLeftCheckedList, leftCheckedList)
                                                                                                        }}
                                                                                                        checked={leftCheckedList.includes(student["email"]) ? true : false}
                                                                                                    /></td>
                                                                                                </>)
                                                                                        }

                                                                                    </tr>
                                                                                )
                                                                            })
                                                                    }
                                                                </tbody>
                                                            </div>
                                                        </table>
                                                    </div>

                                                    <div className='tableSet'>
                                                        <div className="buttons">
                                                           
                                                            <button className='submitButton' onClick={() => {
                                                                setRightCheckedList([]);
                                                                if (rightCheckedList.length > 0) {
                                                                    patchStudent("waiting");
                                                                }
                                                            }}
                                                            >대기</button>
                                                        </div>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan={"3"} style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }}>승인완료</th>
                                                                </tr>
                                                            </thead>
                                                            <div className="tableRadius" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                                <tbody className="tableList" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                                    {
                                                                        rightTable.length === 0
                                                                            ? <tr>
                                                                                <td colSpan={"3"}>승인대기 학생이 없습니다.</td>
                                                                            </tr>
                                                                            : rightTable.map((student, i) => {
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        {
                                                                                            userLoginPosition === "president"
                                                                                                ? (<><td>{student.stdID}</td>
                                                                                                    <td>{student.name}</td>
                                                                                                    <td><button className="certFileButton" type='button' onClick={() => {
                                                                                                        setShowImg(true);
                                                                                                    }}>학생증</button></td>
                                                                                                    <td ><input
                                                                                                        id={student}
                                                                                                        type="checkbox"
                                                                                                        onChange={(e) => {
                                                                                                            changeHandler(e.target.checked, student["email"], setRightCheckedList, rightCheckedList)
                                                                                                        }}
                                                                                                        checked={rightCheckedList.includes(student["email"]) ? true : false}
                                                                                                    /></td>
                                                                                                </>)
                                                                                                : (<><tr style={{ backgroundColor: "var(--color-tableEven)" }}>
                                                                                                    <td>{student.major}</td>
                                                                                                    <td>{student.name}</td>
                                                                                                    <td>{student.stdID}</td>
                                                                                                </tr><tr style={{ backgroundColor: "var(--color-tableEven)" }}>
                                                                                                        <td style={{ borderBottom: "1px solid var(--color-quarterCircle)" }}>{student.phoneNumber}</td>
                                                                                                        <td style={{ borderBottom: "1px solid var(--color-quarterCircle)" }}>{student.email}</td>
                                                                                                        <td style={{ borderBottom: "1px solid var(--color-quarterCircle)" }}></td>
                                                                                                        
                                                                                                    </tr>
                                                                                                    <td style={{ width: "100px", backgroundColor: "var(--color-tableEven)", borderBottom: "1px solid var(--color-quarterCircle)" }}><input
                                                                                                        id={student}
                                                                                                        type="checkbox"
                                                                                                        onChange={(e) => {
                                                                                                            changeHandler(e.target.checked, student["email"], setRightCheckedList, rightCheckedList)
                                                                                                        }}
                                                                                                        checked={rightCheckedList.includes(student["email"]) ? true : false}
                                                                                                    /></td>
                                                                                                </>)
                                                                                        }

                                                                                    </tr>
                                                                                )
                                                                            })
                                                                    }
                                                                </tbody>
                                                            </div>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </>)}
                        </div></div>
                )}</>
    )
}

export default ManagementPage;