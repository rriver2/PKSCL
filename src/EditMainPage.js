/* eslint-disable */

import quarter1 from './img/quarter1.png';
import quarter2 from './img/quarter2.png';
import quarter3 from './img/quarter3.png';
import quarter4 from './img/quarter4.png';
import receiptImg from './img/receipt.png';
import EditProfile from './EditProfile';
import './css/EditMainPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
import { upload } from '@testing-library/user-event/dist/upload';
import { ReactSortable } from "react-sortablejs";
import EditEvent from './EditEvent';
import giraffe from './img/giraffe.png';
import PreviewImg from './PreviewImg';



function EditMainPage(props) {
    const [list, setList] = useState([]);

    let debugAPIURL = "";
    // debugAPIURL = "https://cors-jhs.herokuapp.com/https://pkscl.kro.kr";

    const history = useHistory();
    const el = useRef();

    let answer = {"studentPresident":{"major":"기린학과","name":"이가은","phoneNumber":"010-5792-5915","email":"cherisher20@pukyong.ac.kr","majorLogo":"./static/majorLogo/testlogo.jpg"},"quarter":{"quarter1":{"status":"true","eventList":[{"eventNumber":"164","eventTitle":"기린학과 임시 장부임~~~~","eventContext":"우헤헤 기린학과엔 기린이 몇마리일기린?","receiptList":[{"receiptNumber":"177","receiptTitle":"기린기린기린","receiptImg":{"name":"./static/receiptImg/defaultReceiptImg.jpg"},"receiptContext":"기린 퀴즈","receiptDetailList":[{"context":"다리","price":"4","amount":"3","totalAmount":"12"},{"context":"심장","price":"1","amount":"3","totalAmount":"3"},{"context":"꼬리","price":"1","amount":"3","totalAmount":"3"}]}]}]},"quarter2":{"status":"true"},"quarter3":{"status":"true","eventList":[{"eventNumber":"170","eventTitle":"기린의 목덜미","eventContext":"","receiptList":[{"receiptNumber":"180","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/defaultReceiptImg.jpg"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]}]}]},"quarter4":{"status":"true"}}}

    let answerDate = {
        "quarter1": ["1111-01-01", "1111-01-02"],
        "quarter2": ["1111-01-03", "1111-01-04"],
        "quarter3": ["1111-01-05", "1111-01-06"],
        "quarter4": ["1111-01-07", "1111-01-08"]
    }

    const [studentPresident, setStudentPresident] = useState();

    const [quarter, setQuarter] = useState();
    const [quarterDate, setQuarterDate] = useState();

    const [eventAmount, setEventAmount] = useState([]);
    const [quarterAmount, setQuarterAmount] = useState(0);
    const [currentQuarter, setCurrentQuarter] = useState(props.todayQuarter);
    const [showAllReceiptButton, setShowAllReceiptButton] = useState([]);
    const [editProfileState, setEditProfileState] = useState(false);

    const [editEventState, setEditEventState] = useState(false);
    const [editEventData, setEditEventData] = useState({});
    const [editEventAmount, setEditEventAmount] = useState({});

    const [showImg, setShowImg] = useState(false);
    const [previewImg, setPreviewImg] = useState();

    const [logoImgPath, setLogoImgPath] = useState();

    const [wrongApproach, setWrongApproach] = useState(false);
    const [wrongApproachContext, setWrongApproachContext] = useState();
    const [editProfileButton, setEditProfileButton] = useState(true);

    const [userLoginPosition, setUserLoginPosition] = useState();

    const [tempQuarter, setTempQuarter] = useState(false);
    const [showCurrentQuerter, setShowCurrentQuerter] = useState();

    function getLedger() {
        let resetArray = [];
        axios.get(debugAPIURL + '/major-info')
            .then((payload) => {
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarter({ ...payload.data["quarter"] });
                if (payload.data["quarter"][currentQuarter]["eventList"] !== undefined) {
                    for (let i = 0; i < payload.data["quarter"][currentQuarter]["eventList"].length; i++) {
                        resetArray.push(false)
                    }
                }
                setShowAllReceiptButton(resetArray);
                setList([...payload.data["quarter"][currentQuarter]["eventList"]]);
                setWrongApproach(false)
                setEditProfileButton(false)
                setLogoImgPath(`./img/${currentQuarter}.png`);
                CalculateCurrentQuarterReceiptSumList([...payload.data["quarter"][currentQuarter]["eventList"]]);
                setList([...payload.data["quarter"][quarterData]["eventList"]]);
                resetShowAllReceiptButton();
                defineColor(currentQuarter);
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 403:
                        setWrongApproachContext("장부를 열람할 권한이 없습니다.");
                        setWrongApproach(true)
                        setEditProfileButton(false)
                        defineColor(props.todayQuarter);
                        setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        break;
                    default:
                        setWrongApproachContext("서버 오류가 발생했습니다.");
                        setWrongApproach(true)
                        defineColor(props.todayQuarter);
                        setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        setEditProfileButton(false)
                        break;
                }
                //지우기
                // setStudentPresident({ ...answer["studentPresident"] });
                // setQuarter({ ...answer["quarter"] });
                // for (let i = 0; i < answer["quarter"][currentQuarter]["eventList"].length; i++) {
                //     resetArray.push(false)
                // }
                // GetDate();
                // setShowAllReceiptButton(resetArray);
                // setList([...answer["quarter"][currentQuarter]["eventList"]]);
                // defineColor(currentQuarter);
                // setLogoImgPath(`./img/${currentQuarter}.png`);
                // setWrongApproach(false)
                // setEditProfileButton(false)
                //
            })
    }

    function resetShowAllReceiptButton() {
        let resetArray = [];
        if (quarter[currentQuarter]["eventList"] !== undefined) {
            for (let i = 0; i < quarter[currentQuarter]["eventList"].length; i++) {
                resetArray.push(false)
            }
        }
        setShowAllReceiptButton(resetArray)
    }

    function reset(quarterData) {
        if (quarter !== undefined) {
            if (quarter[quarterData]["eventList"] !== undefined) {
                CalculateCurrentQuarterReceiptSumList(quarter[quarterData]["eventList"]);
                setList(quarter[quarterData]["eventList"]);
                resetShowAllReceiptButton();
            }
        }
        else {
            console.log("quarter === undefined");
        }
    }

    function showQuarter(selectedQuarter) {
        if (userLoginPosition === "student" || userLoginPosition === "president") {
            if (quarter[selectedQuarter]["status"] === "true") {
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
                setLogoImgPath(`./img/${selectedQuarter}.png`);
            } else {
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
                setLogoImgPath(`./img/${selectedQuarter}.png`);
            }
        } else {
            setCurrentQuarter(selectedQuarter);
            setLogoImgPath(`./img/${selectedQuarter}.png`);
            defineColor(selectedQuarter);
        }
    }

    function sumItems(price, amount) {
        return price * amount;
    }

    function sumReceipt(receiptDetailList) {
        let sumReceiptValue = 0;
        if (receiptDetailList !== undefined) {
            for (let i = 0; i < receiptDetailList.length; i++) {
                let item = receiptDetailList[i];
                sumReceiptValue = sumReceiptValue + sumItems(item["price"], item["amount"]);
            }
        }
        return sumReceiptValue;
    }

    function sumEvent(receiptList) {
        let sumEventValue = 0;
        for (let i = 0; i < receiptList.length; i++) {
            let receipt = receiptList[i]["receiptDetailList"];
            sumEventValue = sumEventValue + sumReceipt(receipt);
        }
        return sumEventValue
    }

    function CalculateCurrentQuarterReceiptSumList(eventList) {
        if (eventList === undefined) {
            setQuarterAmount(0);
        } else {
            let eventSum = [];
            for (let i = 0; i < eventList.length; i++) {
                eventSum.push(sumEvent(eventList[i]["receiptList"]));
            }
            setEventAmount([...eventSum]);

            let quarterSum = 0;
            for (let i = 0; i < eventSum.length; i++) {
                quarterSum = quarterSum + eventSum[i];
            }
            setQuarterAmount(quarterSum);
        }
    }

    function setColorProperty(colorQuarter, colorQuarterCircle, colorLeftPanel, colorCard, colorBackground) {
        document.documentElement.style.setProperty("--color-quarter", colorQuarter);
        document.documentElement.style.setProperty("--color-quarterCircle", colorQuarterCircle);
        document.documentElement.style.setProperty("--color-leftPanel", colorLeftPanel);
        document.documentElement.style.setProperty("--color-card", colorCard);
        document.documentElement.style.setProperty("--color-background", colorBackground);
    }

    function defineColor(quarter) {
        if (quarter === "quarter1") {
            setColorProperty("#db8f8e", "#fdeded", "#f5dede", "#fff5ed", "#fbf6f6");
        } else if (quarter === "quarter2") {
            setColorProperty("#649d67", "#e9ede9", "#cedbcf", "#dee7df", "#f6f7f6");
        } else if (quarter === "quarter3") {
            setColorProperty("#c18356", "#f9eee5", "#e9d8cd", "#fff5ed", "#fbf7f4");
        } else if (quarter === "quarter4") {
            setColorProperty("#6b8396", "#e0eaf3", "#d0dbe5", "#e6f1fb", "#f8fcff");
        }
    }

    function logout() {
        axios.post('/logout')
            .then((payload) => {
                history.push('/');
            }).catch((error) => {
                alert("로그아웃에 실패하였습니다.");
                getLedger();
                GetDate();
            })
    }

    function GetDate() {
        axios.get("/ledger-date")
            .then((payload) => {
                setQuarterDate({ ...payload.data });

                let tempDate = { ...payload.data }
                let quarter = ["quarter1", "quarter2", "quarter3", "quarter4"]
                quarter.map((quarterName) => {
                    tempDate[quarterName].map((date, i) => {
                        if (date.substr(0, 4) === "9999") {
                            let tempTempDate = { ...tempDate };
                            tempTempDate[quarterName][i] = "";
                            setQuarterDate({ ...tempTempDate });
                        }
                    })
                })
                setWrongApproach(false)
                setEditProfileButton(false)
            })
            .catch((error) => {
                setWrongApproachContext("분기별 장부 open, close 날짜를 불러올 수 없습니다.");
                setWrongApproach(true)
                setEditProfileButton(false)
                //지우기
                // setQuarterDate({ ...answerDate });
                // let quarter = ["quarter1", "quarter2", "quarter3", "quarter4"]
                // quarter.map((quarterName) => {
                //     answerDate[quarterName].map((date, i) => {
                //         if (date.substr(0, 4) === "9999") {
                //             let tempAnswerDate = { ...answerDate };
                //             tempAnswerDate[quarterName][i] = "";
                //             setQuarterDate({ ...tempAnswerDate });
                //         }
                //     })
                // })
                // setWrongApproach(false)
                // setEditProfileButton(false)
                //
            })
    }

    function eventDeleteButton(eventNumber, index) {
        if (window.confirm("행사를 삭제하면 되돌릴 수 없습니다.")) {
            var tempQuarter = { ...quarter };
            tempQuarter[currentQuarter]["eventList"].splice(index, 1);

            const payload = { "eventNumber": eventNumber };
            axios.delete(debugAPIURL + '/event?event-number=' + eventNumber)
                .then((payload) => {
                    switch (payload.status) {
                        case 200:
                            // alert("행사 장부가 삭제되었습니다.");
                            break;
                    }
                    getLedger();
                    GetDate();
                    setWrongApproach(false);
                    setEditProfileButton(false);
                }).catch((error) => {
                    setWrongApproachContext("장부를 삭제하는데 실패했습니다.");
                    setWrongApproach(true)
                    setEditProfileButton(false);
                })
        } else {
            alert("삭제가 취소되었습니다.")
        }
    }

    function eventAddButton(currentQuarter) {
        let payload = { "quarter": currentQuarter }

        let promise = new Promise((resolve, reject) => {
            axios.post(debugAPIURL + "/event", payload)
                .then((payload) => {
                    resolve("장부를 추가하였습니다.");
                })
                .catch((error) => {
                    reject("장부 추가에 실패했습니다. code: " + error.response.status)
                });
        })

        promise
            .then(value => {
                getLedger();

                GetDate();
            })
            .catch((value => {
                alert(value)
                getLedger();

                GetDate();
            }))
    }


    function putLedgerDate() {

        let open = quarterDate[currentQuarter][0];
        let close = quarterDate[currentQuarter][1];
        quarterDate[currentQuarter].map(() => {
            if (quarterDate[currentQuarter][0] === "") {
                open = "9999-12-9";
            }
            if (quarterDate[currentQuarter][1] === "") {
                close = "9999-12-9";
            }
        })

        const payload = {
            quarter: currentQuarter,
            openDate: open,
            closeDate: close
        }

        let promise = new Promise((resolve, reject) => {
            axios.put(debugAPIURL + '/ledger-date', payload)
                .then((payload) => {
                    resolve("장부 공개일이 변경되었습니다.");

                }).catch((error) => {
                    reject("장부 공개일 변경 실패");
                })
        })

        promise
            .then(value => {
                GetDate();
            })
            .catch((value => {
                alert(value)
                GetDate();
            }))
    }

    function processImage(file) {
        if (file != null) {
            const imageFile = file;

            if (file["name"] === "" || file["name"].includes('/')) return file.name;
            else {
                const imageUrl = URL.createObjectURL(imageFile);
                return imageUrl;
            }
        }
    }

    function eventSequenceButton() {
        let eventNumberList = [];
        list.map((event) => {
            if (event["eventNumber"] !== undefined)
                eventNumberList.push(event["eventNumber"])
        })
        let payload = { "eventNumberList": [...eventNumberList] };

        let promise = new Promise((resolve, reject) => {
            axios.patch(debugAPIURL + '/event-sequence', payload)
                .then((payload) => {
                    resolve("행사 순서가 수정되었습니다.");
                }).catch((error) => {
                    reject(error.response.data["errorMessage"]);
                })
        })

        promise
            .then(value => {
                getLedger();
                GetDate();
            })
            .catch((value => {
                getLedger();
                GetDate();
            }))

    }

    function getUserStatus() {
        axios.get('/position')
            .then((payload) => {
                setUserLoginPosition(payload.data["position"])
                if (payload.data["position"] === "student" || payload.data["position"] === "admin") {
                    setWrongApproachContext("잘못된 접근입니다.");
                    setWrongApproach(true)
                    setEditProfileButton(false);
                }
                else if (payload.data["position"] === "president") {
                    axios.get('/status')
                        .then((payload) => {
                            if (payload.data["status"] === "refusal") {
                                setWrongApproachContext("사용자(학생회장)은 현재 거절 상태입니다. PKSCL 챗봇을 통해 회장 신청을 다시 진행해 주십시오.")
                                setWrongApproach(true)
                                setEditProfileButton(true);
                            }
                            else if (payload.data["status"] === "waiting") {
                                setWrongApproachContext("사용자(학생회장)은 현재 대기 상태입니다. PKSCL 챗봇을 통해 회장 인증을 해주세요 :)");
                                setWrongApproach(true)
                                setEditProfileButton(true);
                            } else if (payload.data["status"] === "approval") {
                                getLedger();
                                GetDate();
                                setWrongApproach(false)
                                setEditProfileButton(false);
                            }
                        })
                        .catch((error) => {
                            setWrongApproachContext("잘못된 접근입니다.");
                            setWrongApproach(true)
                            setEditProfileButton(false);
                        })
                }
            })
            .catch((error) => {
                setWrongApproachContext(`사용자의 승인 상태를 알 수 없습니다.`);
                setWrongApproach(true)
                setEditProfileButton(false);
            })

    }
    function getExPKSCL() {
        axios.get(debugAPIURL + '/temp-major-info')
            .then((payload) => {
                setWrongApproach(false)
                setEditProfileButton(false);
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarter({ ...payload.data["quarter"] });
                setLogoImgPath(`./img/${props.todayQuarter}.png`);
                defineColor(props.todayQuarter);
            })
            .catch((error) => {
                setWrongApproachContext(`임시 장부를 불러올 수 없습니다.`);
                // setWrongApproach(true)
                // setEditProfileButton(false);
            })

    }

    useEffect(() => {
        // push 시 주석 삭제
        getUserStatus();
        reset(props.todayQuarter);
        defineColor(props.todayQuarter);
        setLogoImgPath(`./img/${props.todayQuarter}.png`);

        //push 시 주석
        // getLedger(); GetDate();
        
        
    }, []);

    useEffect(() => {
        // push 시 주석 삭제
        if (editEventState === false) {
            getUserStatus();
            reset(currentQuarter);
            defineColor(currentQuarter);
            setLogoImgPath(`./img/${currentQuarter}.png`);
        }
    }, [editEventState]);

    useEffect(() => {
        if (quarter !== undefined) {
            reset(currentQuarter);
            if (quarter[currentQuarter]["eventList"] !== undefined) {
                setList(quarter[currentQuarter]["eventList"]);
            }
        }

    }, [currentQuarter])

    useEffect(() => {
        if (quarter !== undefined) {
            reset(currentQuarter);
            if (quarter[currentQuarter]["eventList"] !== undefined) {
                setList(quarter[currentQuarter]["eventList"]);
            }
        }

    }, [quarter])


    return (
        <>
        {wrongApproach === true
            ? (<>
                {
                    editProfileState
                        ?
                        <EditProfile loginPosition={userLoginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                        : null
                }
                <div className="nav" style={{ justifyContent: "space-between" }}>
                    <div className="logoNav">
                        <img src={logoImgPath} alt="logo" style={{ marginLeft: "30px" }} width={"40px"} height={"40px"} />
                        <div style={{ marginLeft: "5px", fontSize: "25px" }}>PKSCL</div>
                    </div>
                    {
                        editProfileButton === true
                            ? (<div style={{ display: "flex", alignItems: "center" }}>
                                <i class="fas fa-user" onClick={() => { setEditProfileState(true); }} style={{ fontSize: "20px", marginRight: "10px" }}></i>
                                <i class="fas fa-headset" style={{ fontSize: "20px", marginRight: "10px" }} onClick={() => { window.open("http://pf.kakao.com/_hxnlXb") }}></i>
                                <button className='submitButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                            </div>)
                            : (<div style={{ display: "flex" }}>
                                <button className='submitButton' type='button' onClick={() => { history.push('/'); }}>로그인</button>
                            </div>)
                    }
                </div>
                <div className="MainPageContainer"
                    style={{  display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <div className="errorGiraffe">
                    {wrongApproachContext}<br />
                    장부의 예시를 보고싶다면 기린을 눌러주세요 :)
                    <img onClick={() => { getExPKSCL() }} src={giraffe} className="giraffe" alt="기린"
                        style={{ width: "70px", height: "70px", marginLeft: "20px" }} />
                    <a href="http://pf.kakao.com/_hxnlXb" target="_blank" rel="noreferrer" title="챗봇으로 연결됩니다." style={{ color: "black" }}>PKSCL 문의하기</a>
                </div></div></>)
            : (
                <div className="EditMainPageContainer">
                    {
                        showImg
                            ? <PreviewImg setShowImg={setShowImg} previewImg={previewImg}></PreviewImg>
                            : null
                    }
                    {
                        editProfileState
                            ?
                            <EditProfile loginPosition={userLoginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                            : null
                    }
                    {
                        editEventState
                            ? (
                                <>
                                    <EditEvent setEditEventState={setEditEventState} editEventData={editEventData} editEventAmount={editEventAmount}></EditEvent>
                                </>)
                            : null
                    }

                    {
                        quarter === undefined
                            ? null
                            : (<>
                                <div className="leftPanel" id='leftPanel'>
                                    <div className="quarter">
                                        <div className="quarterButton" style={{ marginTop: "50px" }} onClick={() => { setList(quarter["quarter1"]["eventList"]); showQuarter("quarter1"); window.scrollTo(0, 0); }}><div>1분기</div><img src={quarter1} alt="quarter1" ></img></div>
                                        <div className="quarterButton" onClick={() => { setList(quarter["quarter2"]["eventList"]); showQuarter("quarter2"); window.scrollTo(0, 0); }}><div>2분기</div><img src={quarter2} alt="quarter2" ></img></div>
                                        <div className="quarterButton" onClick={() => { setList(quarter["quarter3"]["eventList"]); showQuarter("quarter3"); window.scrollTo(0, 0); }}><div>3분기</div><img src={quarter3} alt="quarter3" ></img></div>
                                        <div className="quarterButton" onClick={() => { setList(quarter["quarter4"]["eventList"]); showQuarter("quarter4"); window.scrollTo(0, 0); }}><div>4분기</div><img src={quarter4} alt="quarter4" ></img></div>
                                    </div>

                                </div>
                                <div className="rightPanel">
                                    <div className="nav">

                                        <div className="buttons">
                                            <div className="logoNav">
                                                <img src={logoImgPath} alt="logo" style={{ marginLeft: "30px" }} width={"40px"} height={"40px"} />
                                                <div style={{ marginLeft: "5px", fontSize: "25px" }}>PKSCL</div>
                                            </div>
                                            <div className ="PCVersion" style={{ display: "flex" }}>
                                                <button className='submitButton' type='button' onClick={() => { defineColor(props.todayQuarter); history.push('/manage') }}>학생 관리</button>
                                                <button className='submitButton' type='button' onClick={() => { history.push('/main') }}>학생 입장 장부</button>
                                            </div>
                                            
                                            {
                                                quarterDate !== undefined
                                                    ? (
                                                        <div className="quarterDateNav" style={{ display: "flex", alignItems: "center" }}>
                                                            {currentQuarter[currentQuarter.length - 1]}분기 장부 공개일 :
                                                            <input className="dateInput" type={"date"} value={quarterDate[currentQuarter][0]}
                                                                onChange={(e) => {
                                                                    let tempDateArray = { ...quarterDate }
                                                                    tempDateArray[currentQuarter][0] = e.target.value;

                                                                    putLedgerDate();
                                                                }}
                                                            ></input>~
                                                            <input className="dateInput" type={"date"} value={quarterDate[currentQuarter][1]}
                                                                style={{ marginLeft: "10px" }}
                                                                onChange={(e) => {
                                                                    let tempDateArray = { ...quarterDate }
                                                                    tempDateArray[currentQuarter][1] = e.target.value;

                                                                    putLedgerDate();

                                                                }}
                                                            ></input></div>
                                                    )
                                                    : null
                                            }
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <i class="fas fa-user" style={{ fontSize: "20px", marginRight: "10px" }} onClick={() => { setEditProfileState(true); }}></i>
                                                <i class="fas fa-headset" style={{ fontSize: "20px", marginRight: "10px" }} onClick={() => { window.open("http://pf.kakao.com/_hxnlXb") }}></i>
                                                <button className='submitButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                            </div>
                                        </div>
                                    </div>
                                            <div className="mobileVersion"> PKSCL 장부 수정은 PC로만 가능합니다.
                                                <div style={{ display: "flex" }}>
                                                    <button className='submitButton' type='button' onClick={() => { history.push('/main') }}>학생 입장 장부</button>
                                                </div>
                                            </div>

                                             <div className ="PCVersion">
                                        <div style={{ display: "flex" }}>
                                            <div className="quarterData">
                                                <h2 className="quarterTotalAmount" style={{ fontWeight: "bold" }}>
                                                    {currentQuarter[currentQuarter.length - 1]}분기 총 금액 : {quarterAmount}원
                                                </h2>
                                                {
                                                    quarter[currentQuarter]["eventList"] === undefined
                                                        ? <div>입력된 행사가 없습니다.</div>
                                                        : (quarter[currentQuarter]["eventList"].map((event, i) => {
                                                            return (
                                                                <div className="eventCard" key={i} >
                                                                    <div className="cardContent">
                                                                        <div className="eventSource">
                                                                            <div style={{ width: "230px" }}>
                                                                                <div className="eventTitle">
                                                                                    <h4 style={{ width: "400px" }}>{event["eventTitle"]}
                                                                                    </h4>
                                                                                    <div style={{ width: "500px" }}> 행사 총 금액 : {eventAmount[i]}원</div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="eventButtons">
                                                                                <button onClick={() => {
                                                                                    eventDeleteButton(event["eventNumber"], i);
                                                                                }} style={{ marginRight: "15px" }}>
                                                                                    <i class="far fa-trash-alt"></i></button>
                                                                                <button onClick={() => {
                                                                                    setEditEventState(true)
                                                                                    setEditEventData(quarter[currentQuarter]["eventList"][i]);
                                                                                    setEditEventAmount(eventAmount[i]);
                                                                                }} style={{ marginRight: "15px" }}><i class="fas fa-wrench"></i></button>

                                                                                {
                                                                                    event.receiptList.length <= 1
                                                                                        ? null
                                                                                        : (
                                                                                            showAllReceiptButton[i] === true
                                                                                                ? (
                                                                                                    <button onClick={() => {
                                                                                                        let array = [...showAllReceiptButton];
                                                                                                        array[i] = !showAllReceiptButton[i];
                                                                                                        setShowAllReceiptButton(array);
                                                                                                    }}><i class="fas fa-angle-double-up"></i></button>
                                                                                                )
                                                                                                : (
                                                                                                    <button onClick={() => {
                                                                                                        let array = [...showAllReceiptButton];
                                                                                                        array[i] = !showAllReceiptButton[i];
                                                                                                        setShowAllReceiptButton(array);
                                                                                                    }}><i class="fas fa-angle-double-down"></i></button>
                                                                                                )
                                                                                        )

                                                                                }
                                                                            </div>
                                                                        </div>

                                                                        <div>{event["eventContext"]}</div>

                                                                        {
                                                                            showAllReceiptButton[i] === false
                                                                                ? (<div id="receiptContent" style={{ height: "380px", overflowY: "hidden" }}>

                                                                                    <div className="receiptCard">

                                                                                        <div className="receiptResource">
                                                                                            {
                                                                                                event["receiptList"].length === 0
                                                                                                    ? <div>입력된 영수증이 없습니다.</div>
                                                                                                    : (<>

                                                                                                        <div className="receiptTitle">
                                                                                                            <h5>{event["receiptList"][0]["receiptTitle"]}</h5>
                                                                                                            {
                                                                                                                event["receiptList"][0]["receiptDetailList"].length === 0
                                                                                                                    ? null
                                                                                                                    : (<div>
                                                                                                                        1번째 영수증 금액 : {sumReceipt(event["receiptList"][0]["receiptDetailList"])}원
                                                                                                                    </div>)
                                                                                                            }


                                                                                                        </div>
                                                                                                        <div style={{ width: "400px", textAlign: "right" }}>{event["receiptList"][0]["receiptContext"]}</div>

                                                                                                        {
                                                                                                            event["receiptList"][0]["receiptDetailList"].length === 0
                                                                                                                ? <div className="noneContext"> 입력된 영수증 내역이 없습니다.</div>
                                                                                                                : (<><table className="receiptTable"><thead>
                                                                                                                    <tr>
                                                                                                                        <th>품명</th>
                                                                                                                        <th>단가</th>
                                                                                                                        <th>수량</th>
                                                                                                                        <th>가격</th>
                                                                                                                    </tr>
                                                                                                                </thead>
                                                                                                                    <tbody>
                                                                                                                        {event["receiptList"][0]["receiptDetailList"].map((item, k) => {
                                                                                                                            return (
                                                                                                                                <tr key={k}>
                                                                                                                                    <td>
                                                                                                                                        <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["context"]}</span>

                                                                                                                                    </td>

                                                                                                                                    <td>
                                                                                                                                        <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["price"]}</span>


                                                                                                                                    </td>

                                                                                                                                    <td>
                                                                                                                                        <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["amount"]}</span>


                                                                                                                                    </td>
                                                                                                                                    <td>{item["totalAmount"]}</td>
                                                                                                                                </tr>
                                                                                                                            )
                                                                                                                        }
                                                                                                                        )}
                                                                                                                    </tbody>


                                                                                                                </table>


                                                                                                                </>)
                                                                                                        }
                                                                                                    </>
                                                                                                    )
                                                                                            }

                                                                                        </div>
                                                                                        {
                                                                                            event["receiptList"].length === 0
                                                                                                ? null
                                                                                                :
                                                                                                <img className="receiptImg" src={processImage(event["receiptList"][0]["receiptImg"])} style={{ backgroundColor: "var(--color-leftPanel)" }}
                                                                                                    alt={processImage(event["receiptList"][0]["receiptImg"])} height={"150"} width={"100"}
                                                                                                    onClick={() => { setShowImg(true); setPreviewImg(processImage(event["receiptList"][0]["receiptImg"])); }} />
                                                                                        }

                                                                                    </div>


                                                                                </div>
                                                                                )
                                                                                : (<div id="receiptContent" >
                                                                                    {
                                                                                        event["receiptList"].map((receipt, j) => {
                                                                                            return (
                                                                                                <div className="receiptCard" key={j}>
                                                                                                    <div className="receiptResource">
                                                                                                        {
                                                                                                            event["receiptList"].length === 0
                                                                                                                ? <div>입력된 영수증이 없습니다.</div>
                                                                                                                : (<>
                                                                                                                    <div className="receiptTitle">
                                                                                                                        <h5>{receipt["receiptTitle"]}</h5>
                                                                                                                        {
                                                                                                                            receipt["receiptDetailList"].length === 0
                                                                                                                                ? null
                                                                                                                                : (<div>
                                                                                                                                    {j + 1}번째 영수증 금액 : {sumReceipt(receipt["receiptDetailList"])}원
                                                                                                                                </div>)
                                                                                                                        }


                                                                                                                    </div>
                                                                                                                    <div style={{ width: "400px", textAlign: "right" }}>{event["receiptList"][0]["receiptContext"]}</div>

                                                                                                                    {
                                                                                                                        receipt["receiptDetailList"].length === 0
                                                                                                                            ? <div>입력된 영수증 내역이 없습니다.</div>
                                                                                                                            : (<>
                                                                                                                                <table className="receiptTable">
                                                                                                                                    <thead>
                                                                                                                                        <tr>
                                                                                                                                            <th>품명</th>
                                                                                                                                            <th>단가</th>
                                                                                                                                            <th>수량</th>
                                                                                                                                            <th>가격</th>
                                                                                                                                        </tr>
                                                                                                                                    </thead>
                                                                                                                                    <tbody>
                                                                                                                                        {receipt["receiptDetailList"].map((item, k) => {
                                                                                                                                            return (
                                                                                                                                                <tr key={k}>
                                                                                                                                                    <td>
                                                                                                                                                        <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["context"]}</span>

                                                                                                                                                    </td>

                                                                                                                                                    <td>

                                                                                                                                                        <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["price"]}</span>

                                                                                                                                                    </td>

                                                                                                                                                    <td>

                                                                                                                                                        <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["amount"]}</span>

                                                                                                                                                    </td>

                                                                                                                                                    <td>
                                                                                                                                                        {item["totalAmount"]}
                                                                                                                                                    </td>
                                                                                                                                                </tr>)
                                                                                                                                        })
                                                                                                                                        }
                                                                                                                                    </tbody>

                                                                                                                                </table>

                                                                                                                            </>
                                                                                                                            )
                                                                                                                    }


                                                                                                                </>)}
                                                                                                    </div>

                                                                                                    <img src={processImage(event["receiptList"][j]["receiptImg"])} style={{ backgroundColor: "var(--color-leftPanel)" }}
                                                                                                        alt={processImage(event["receiptList"][j]["receiptImg"])} height={"150"} width={"100"}
                                                                                                        className="receiptImg"
                                                                                                        onClick={() => { setShowImg(true); setPreviewImg(processImage(event["receiptList"][0]["receiptImg"])); }} />

                                                                                                </div>

                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>)
                                                                        }

                                                                    </div>
                                                                    <div className="cardImg"></div>

                                                                </div>
                                                            )
                                                        })
                                                        )
                                                }
                                                <div style={{ marginBottom: "40px", display: "flex", justifyContent: "center" }}>
                                                    <button className="editButton" onClick={() => {
                                                        eventAddButton(currentQuarter);
                                                    }} > <i class="fas fa-plus"></i> </button>
                                                </div>


                                            </div>
                                            <div className="remotePanel">
                                                <div className="remotePanelBox" style={{ display: "flex" }}>
                                                    <div>
                                                        <h5 style={{ textAlign: "center", marginBottom: "5px", fontWeight: "bold" }}>📚 행사 목록 📚</h5>
                                                        <p style={{ textAlign: "center", fontSize: "12px" }}>드래그로 순서를 바꾸고 <br />순서 변경 버튼을 눌러주세요 !</p>

                                                        {
                                                            list !== undefined
                                                                ? <>
                                                                    <ReactSortable className="sortTable" tag="div" list={list} setList={setList}>

                                                                        {list.map((item, i) => (
                                                                            <div className="eventListBox" key={item.eventNumber}>{item.eventTitle}</div>
                                                                        ))}

                                                                    </ReactSortable>
                                                                    {
                                                                        <div style={{ justifyContent: "center", width: "100%", display: "flex" }} >
                                                                            <button className='submitButton' type='button' onClick={() => {
                                                                                eventSequenceButton();
                                                                            }}> 순서 변경 </button>
                                                                        </div>
                                                                    }
                                                                </>
                                                                : <span>등록된 행사가 없습니다.</span>
                                                        }

                                                        <div style={{ color: "#d32c2c" }}>
                                                            ※ 장부를 잘못 기입해서 문제가 발생할 경우의 책임은 학생회장 본인에게 있습니다.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            )
                    }

                </div >)}</>
    )
}

export default EditMainPage;