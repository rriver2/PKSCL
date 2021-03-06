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
                                setWrongApproachContext("?????????(????????????)??? ?????? ?????? ???????????????. PKSCL ????????? ?????? ?????? ????????? ?????? ????????? ????????????.");
                                setWrongApproach(true)
                            }
                            else if (payload.data["status"] === "waiting") {
                                setWrongApproachContext("?????????(????????????)??? ?????? ?????? ???????????????. PKSCL ????????? ?????? ?????? ????????? ???????????? :)");
                                setWrongApproach(true)
                            } else if (payload.data["status"] === "approval") {
                                getPresidentList();
                            }
                        })
                        .catch((error) => {
                            switch (error.response.status) {
                                case 400:  
                                    setWrongApproachContext("???????????? ?????? ????????? ??? ??? ????????????.");  
                                    setWrongApproach(true)
                                    setLogoImgPath(`./img/managementLogo.png`);
                                break;
                                default: 
                                    setWrongApproachContext("?????? ?????? ?????? ??????/ error: " + error.response.status);  
                                    setWrongApproach(true) 
                                    setLogoImgPath(`./img/managementLogo.png`);
                                break;
                            }
                        })
                } else if (payload.data["position"] === "admin") {
                    getAdminList();
                } else {
                    setWrongApproachContext("????????? ???????????????.");
                    setWrongApproach(true)
                    setLogoImgPath(`./img/managementLogo.png`);
                }
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400:  
                        setWrongApproachContext(`????????? ???????????????.`);
                        setWrongApproach(true)
                        setLogoImgPath(`./img/managementLogo.png`);
                    break;
                    default: 
                        setWrongApproachContext("?????? position ?????? ??????/ error: " + error.response.status);  
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
                        alert("??????????????? ??????????????????."); 
                        reload();
                    break;
                    default: 
                        alert("???????????? ??????/ error: " + error.response.status); 
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
                            alert("?????? ????????? ????????? ?????????????????? :)")
                            getPresidentList();
                        break;
                        default: 
                            alert("?????? ????????? ?????? ??????/ error: " + error.response.status); 
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
                            alert("?????? ????????? ????????? ??????????????? ??????????????????. ?????? ????????? ?????? ????????? ?????? ??? ?????? ????????? ??????????????????:)")
                            getAdminList();
                        break;
                        case 400: 
                            alert("???????????? ????????? ????????? ?????????????????? :)")
                             getAdminList();
                        break;
                        default: 
                            alert("???????????? ????????? ?????? ??????/ error: " + error.response.status); 
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
                alert("??????????????? ???????????? ????????? ???????????????.")
                logout();
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400:  alert("???????????? ????????? ??????????????????."); break;
                    default: alert("???????????? ?????? ??????/ error: " + error.response.status); break;
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
                        setWrongApproachContext("?????????????????? ????????? ??? ????????????.");
                        setWrongApproach(true) 
                        setLogoImgPath(`./img/managementLogo.png`);
                    break;
                    default: 
                        setWrongApproachContext("??????????????? ?????? ??????/ error: "+ error.response.status); 
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
                        setWrongApproachContext("?????????????????? ????????? ??? ????????????.");
                        setWrongApproach(true) 
                        setLogoImgPath(`./img/managementLogo.png`);
                    break;
                    default: 
                        setWrongApproachContext("??????????????? ?????? ??????/ error: "+ error.response.status); 
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
                alert("???????????? ?????????????????? :)");
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
        //push ??? ??? ??????

    // let ??????????????? = {"waiting":[{"stdID":"201135021","name":"?????????","email":"arasU2mhlx@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"wcFNotogw@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"wch9832@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"YhiYcZbKs@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "}],"refusal":[{"stdID":"201135021","name":"?????????","email":"PXNcDYLnu@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"QAjcnEccF@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"rWAcogFxaV@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"tKzAcWVqzA@pukyong.ac.k","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"zxtKzAcWzVqA@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "}],"approval":[{"stdID":"201135021","name":"?????????","email":"arEU2mhlx@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"cuGWyAmXT@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"hpZqjxWXP@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"IPiKTzyWZ@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"JDxjNFczEo@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "},{"stdID":"201135021","name":"?????????","email":"KHMsbtdcmN@pukyong.ac.kr","studentImgPath":"./static/studentCertFile/testimg.png "}]}
    //     setWaiting([...???????????????["waiting"]]);
    //     setRefusal([...???????????????["refusal"]]);
    //     setApproval([...???????????????["approval"]]);
    //     setLeftTable([...???????????????["waiting"]]);
    //     setRightTable([...???????????????["approval"]]);
    //     setUserLoginPosition("president")

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
                        <button className='navButton  ' type='button' onClick={() => { history.push('/'); }}>?????????</button>
                    </div>
                </div>
                    <div className="MainPageContainer"
                        style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        {wrongApproachContext}<br />
                        <a href="http://pf.kakao.com/_tRxcJb " target="_blank" rel="noreferrer" title="???????????? ???????????????." style={{ color: "black" }}>PKSCL ????????????</a>
                    </div></div>)
                : (
                    <div className="ManagementPageContainer">
                        <div className="mobileVersion" style={{marginTop:"10vh"}}> {
                            userLoginPosition ==="student"
                            ? <>?????? ????????? ??????????????? ????????? ??? ????????????.</>
                            : <>PKSCL ??????????????? PC?????? ???????????????.</>
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
                                                    <button className="navButton  " onClick={() => { history.push('/edit-main') }}>?????? ??????</button>
                                                    <button className='navButton' type='button' onClick={() => { logout(); }}>????????????</button>
                                                </>)
                                            : null
                                    }
                                    {
                                        userLoginPosition === "admin"
                                            ? <><i className="headset fas fa-headset"
                                                    onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                    <button className="navButton  " onClick={() => { history.push('/main') }}>?????? ??????</button></>
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
                                                <h2 ><i className="fas fa-user boxUser"  />???????????? ??????</h2>
                                            </div>
                                            <div className="alertEmailField" style={{ borderColor: "#dc3545" }}>
                                                <div style={{ width: "80%" ,display:"flex",flexDirection: "column",alignItems: "center"}}>
                                                    1. ??? ??????????????? "???????????? ??????"?????? ????????????
                                                    <br /> 2. ??????????????? ?????? ???????????? ????????? ???????????? ??????

                                                    <div className="inputField alertEmail" style={{ marginTop: "10px",    maxWidth: "350px" }}>
                                                        <i className="fas fa-envelope"></i>
                                                        <label>?????????</label>
                                                        <input id="email" onChange={(e) => {
                                                            setEmail(e.target.value)
                                                            if (e.target.value.includes("@pukyong.ac.kr")) {
                                                                setDelegatingButtonState(true)
                                                            } else {
                                                                setDelegatingButtonState(false)
                                                            }
                                                        }} value={email} type="text" placeholder='???????????? ???????????????.' />
                                                    </div>
                                                    <div style={{color:"rgb(220, 53, 69)"}}>
                                                    ??? ?????? ????????? ??? ????????? ?????? ????????? ???????????? <br/>?????? ?????? ??? ?????? ?????? ????????? ???????????? ??? ????????????.</div></div>
                                                <br />
                                            </div>
                                            <div>{
                                                delegatingButtonState
                                                    ?
                                                    <>
                                                        <button type="button" className="submitButton" style={{ backgroundColor: "#dc3545" }} onClick={() => {
                                                            delegatingButton()
                                                        }}>????????????
                                                        </button>
                                                    </>
                                                    :
                                                    <>
                                                        <button className="submitButton" type="button" style={{ backgroundColor: "white", color: "black" }} onClick={() => {
                                                            alert('?????? ????????? ????????? ??????????????????.');
                                                        }}>????????????
                                                        </button>
                                                    </>
                                            }
                                                <button type="button" className="submitButton" style={{ backgroundColor: "white", color: "black" }}
                                                    onClick={() => {
                                                        setDelegating(false);
                                                    }}>????????????
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
                                    ? <div>????????? ???????????????.</div>
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
                                                                ? <div style={{ fontSize: "25px" }}>???????????? ??????</div>
                                                                : <div style={{ fontSize: "25px" }}>?????? ????????????</div>
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
                                                                    <button className="navButton" style={{ backgroundColor: "#dc3545" }} onClick={() => { setDelegating(true) }}>???????????? ??????</button>
                                                                    <button className="navButton  "
                                                                        onClick={() => {
                                                                            if (userLoginPosition === "admin") {
                                                                                history.push('/main')
                                                                            } else if (userLoginPosition === "president") {
                                                                                history.push('/edit-main')
                                                                            }
                                                                        }}>?????? ??????</button>
                                                                        <button className='navButton' type='button' onClick={() => { logout(); }}>????????????</button>
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
                                                                        }}>????????? ?????? ??????</button>
                                                                        <button className='navButton' type='button' onClick={() => { logout(); }}>????????????</button>
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
                                                                    alert("????????? ????????? 1??? ?????? ??????????????? :)")
                                                                } else {
                                                                    patchStudent("approval");
                                                                }
                                                                setLeftCheckedList([]);
                                                            }}>??????</button>
                                                            <button className='submitButton' onClick={() => {
                                                                setLeftCheckedList([]);
                                                                if (leftCheckedList.length > 0) {
                                                                    patchStudent("refusal");
                                                                } else {
                                                                    alert("????????? ????????? 1??? ?????? ??????????????? :)")
                                                                }
                                                            }}>??????</button>
                                                        </div>
                                                        <table >
                                                            <thead>
                                                                <tr >
                                                                    <th colSpan={"3"} style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }}>????????????</th>
                                                                </tr>
                                                            </thead>
                                                            <div className="tableRadius" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                                <tbody className="tableList" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                                    {
                                                                        leftTable.length === 0
                                                                            ? <tr>
                                                                                <td style={{ background: "white" }} colSpan={"3"}>???????????? ????????? ????????????.</td>
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
                                                                                                    }}>?????????</button></td>
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
                                                            >??????</button>
                                                        </div>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan={"3"} style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }}>????????????</th>
                                                                </tr>
                                                            </thead>
                                                            <div className="tableRadius" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                                <tbody className="tableList" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                                    {
                                                                        rightTable.length === 0
                                                                            ? <tr>
                                                                                <td colSpan={"3"}>???????????? ????????? ????????????.</td>
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
                                                                                                    }}>?????????</button></td>
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