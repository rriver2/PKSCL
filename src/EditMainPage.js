/* eslint-disable */

import quarter1 from './img/quarter1.png';
import quarter2 from './img/quarter2.png';
import quarter3 from './img/quarter3.png';
import quarter4 from './img/quarter4.png';
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

    const history = useHistory();
    const el = useRef();

    // let answer = {"studentPresident":{"major":"국어국문학과","name":"박경수","phoneNumber":"010-8967-8093","email":"test1@pukyong.ac.kr","majorLogo":"./static/majorLogo/20220301023752428.jpg"},"quarter":{"quarter1":{"status":"true","eventList":[{"eventNumber":"195","eventTitle":"안녕","eventContext":"클레오파트라","receiptList":[{"receiptNumber":"208","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220227162028257.png"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]}]},{"eventNumber":"175","eventTitle":"개강","eventContext":"개강이라니 !","receiptList":[{"receiptNumber":"189","receiptTitle":"진심이야?","receiptImg":{"name":"./static/receiptImg/20220301023634519.png"},"receiptContext":"","receiptDetailList":[{"context":"진짜 개강이야?","price":"21312","amount":"2","totalAmount":"42624"}]},{"receiptNumber":"191","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220301023634494.png"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"192","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220301023634516.png"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"193","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220301023634494.png"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"194","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220301023634500.png"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"195","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220217113814817.jpg"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"196","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220217113815368.png"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"197","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220217113815453.png"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"198","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220217113816022.jpg"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"199","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220217113816022.png"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"200","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220217113816023.jpg"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"201","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220217113816041.png"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"202","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220217113816127.png"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]},{"receiptNumber":"203","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220217113816507.png"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]}]},{"eventNumber":"196","eventTitle":"","eventContext":"","receiptList":[]},{"eventNumber":"198","eventTitle":"","eventContext":"","receiptList":[]}]},"quarter2":{"status":"true","eventList":[{"eventNumber":"58","eventTitle":"안녕하세요 PKSCL입니다.","eventContext":"온라인 장부를 이용하세요 ><","receiptList":[{"receiptNumber":"99","receiptTitle":"저는 영수증 입니다","receiptImg":{"name":"./static/receiptImg/20220210162318283.png"},"receiptContext":"영수증 비고 입니다.","receiptDetailList":[{"context":"품명1","price":"22111","amount":"2","totalAmount":"44222"}]},{"receiptNumber":"173","receiptTitle":"ww","receiptImg":{"name":"./static/receiptImg/defaultReceiptImg.jpg"},"receiptContext":"","receiptDetailList":[{"context":"ww","price":"112","amount":"22","totalAmount":"2464"}]}]}]},"quarter3":{"status":"true","eventList":[{"eventNumber":"158","eventTitle":"3-1분기기","eventContext":"","receiptList":[]},{"eventNumber":"60","eventTitle":"3분기기","eventContext":"","receiptList":[{"receiptNumber":"89","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/20220212025356069.jpeg"},"receiptContext":"","receiptDetailList":[{"context":"ㅇㅇ","price":"2","amount":"11","totalAmount":"22"}]},{"receiptNumber":"90","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/defaultReceiptImg.jpg"},"receiptContext":"","receiptDetailList":[{"context":"","price":"","amount":"","totalAmount":""}]}]}]},"quarter4":{"status":"true"}}}

    // let answerDate = {
    //     "quarter1": ["1111-01-01", "1111-01-02"],
    //     "quarter2": ["1111-01-03", "1111-01-04"],
    //     "quarter3": ["1111-01-05", "1111-01-06"],
    //     "quarter4": ["1111-01-07", "1111-01-08"]
    // }

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
        axios.get( '/major-info')
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
                setList([...payload.data["quarter"][currentQuarter]["eventList"]]);
                resetShowAllReceiptButton();
                defineColor(currentQuarter);
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 403:
                        setWrongApproachContext("장부를 열람할 권한이 없습니다.");
                        setWrongApproach(true)
                        setEditProfileButton(false)
                        setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        defineColor(props.todayQuarter);
                        break;
                    default:
                        setWrongApproachContext("서버 오류가 발생했습니다.");
                        setWrongApproach(true)
                        setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        setEditProfileButton(false)
                        defineColor(props.todayQuarter);
                        break;
                }
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
    }

    function showQuarter(selectedQuarter) {
        if (userLoginPosition === "student" || userLoginPosition === "president") {
            if (quarter[selectedQuarter]["status"] === "true") {
                setQuarterAmount(0)
                reset(selectedQuarter);
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
                setLogoImgPath(`./img/${selectedQuarter}.png`);
            } else {
                setQuarterAmount(0)
                reset(selectedQuarter);
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
                setLogoImgPath(`./img/${selectedQuarter}.png`);
            }
        } else {
            setQuarterAmount(0)
            reset(selectedQuarter);
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
         document.documentElement.style.setProperty("--color-clickedButton", colorQuarter);
    }

    function defineColor(quarter) {
        // alert("quarter : "+quarter)
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
                history.push('/');
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
                defineColor(props.todayQuarter);
            })
    }

    function eventDeleteButton(eventNumber, index) {
        if (window.confirm("행사를 삭제하면 되돌릴 수 없습니다.")) {
            var tempQuarter = { ...quarter };
            tempQuarter[currentQuarter]["eventList"].splice(index, 1);

            const payload = { "eventNumber": eventNumber };
            axios.delete( '/event?event-number=' + eventNumber)
                .then((payload) => {
                    getLedger();
                    GetDate();
                    setWrongApproach(false);
                    setEditProfileButton(false);
                }).catch((error) => {
                    setWrongApproachContext("장부를 삭제하는데 실패했습니다.");
                    setWrongApproach(true)
                    setEditProfileButton(false);
                    defineColor(props.todayQuarter);
                })
        } else {
            alert("삭제가 취소되었습니다.")
        }
    }

    function eventAddButton(currentQuarter) {
        let payload = { "quarter": currentQuarter }

        let promise = new Promise((resolve, reject) => {
            axios.post( "/event", payload)
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
                resetShowAllReceiptButton();
            })
            .catch((value => {
                setWrongApproachContext(value);
                setWrongApproach(true)
                setEditProfileButton(false);
                defineColor(props.todayQuarter);
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
            axios.put( '/ledger-date', payload)
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
                setWrongApproachContext(value);
                setWrongApproach(true)
                setEditProfileButton(false);
                defineColor(props.todayQuarter);
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
            axios.patch( '/event-sequence', payload)
                .then((payload) => {
                    resolve("행사 순서가 수정되었습니다.");
                }).catch((error) => {
                    reject("행사 순서가 수정에 실패했습니다. error: "+error.response.data["errorMessage"]);
                })
        })

        promise
            .then(value => {
                getLedger();
                GetDate();
            })
            .catch((value => {
                setWrongApproachContext(value);
                setWrongApproach(true)
                setEditProfileButton(false);
                defineColor(props.todayQuarter);
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
                    defineColor(props.todayQuarter);
                }
                else if (payload.data["position"] === "president") {
                    axios.get('/status')
                        .then((payload) => {
                            if (payload.data["status"] === "refusal") {
                                setWrongApproachContext("사용자(학생회장)은 현재 거절 상태입니다. PKSCL 챗봇을 통해 회장 신청을 다시 진행해 주십시오.")
                                setWrongApproach(true)
                                setEditProfileButton(true);
                                defineColor(props.todayQuarter);
                            }
                            else if (payload.data["status"] === "waiting") {
                                setWrongApproachContext("사용자(학생회장)은 현재 대기 상태입니다. PKSCL 챗봇을 통해 회장 인증을 해주세요 :)");
                                setWrongApproach(true)
                                setEditProfileButton(true);
                                defineColor(props.todayQuarter);
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
                            defineColor(props.todayQuarter);
                        })
                }
            })
            .catch((error) => {
                setWrongApproachContext(`사용자의 승인 상태를 알 수 없습니다.`);
                setWrongApproach(true)
                setEditProfileButton(false);
                defineColor(props.todayQuarter);
            })

    }
    function getExPKSCL() {
        axios.get(  '/temp-major-info')
            .then((payload) => {
                setWrongApproach(false)
                setEditProfileButton(false);
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarter({ ...payload.data["quarter"] });
                setLogoImgPath(`./img/${props.todayQuarter}.png`);
                defineColor(props.todayQuarter);
            })
            .catch((error) => {
                alert(`임시 장부를 불러올 수 없습니다.`);
            })

    }

    useEffect(() => {
        getUserStatus();
        reset(props.todayQuarter);
        setLogoImgPath(`./img/${props.todayQuarter}.png`);
        defineColor(props.todayQuarter);

        // push 할때 주석 하기
                // setUserLoginPosition("president")
                // setStudentPresident({ ...answer["studentPresident"] });
                // setQuarter({ ...answer["quarter"] });
                // let resetArray=[]
                // for (let i = 0; i < answer["quarter"][currentQuarter]["eventList"].length; i++) {
                //     resetArray.push(false)
                // }
                // setShowAllReceiptButton(resetArray);
                // setList([...answer["quarter"][currentQuarter]["eventList"]]);
                // setLogoImgPath(`./img/${currentQuarter}.png`);
                // setWrongApproach(false)
                // setEditProfileButton(false)
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
    }, []);

    useEffect(() => {
        // push 할때 주석 삭제
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
        {
            defineColor(currentQuarter)
        }
            {wrongApproach === true
                ? (<div className="MainPageContainer">
                    {
                        editProfileState
                            ?
                            <EditProfile loginPosition={userLoginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                            : null
                    }
                    <div className="nav" >
                        <div className="logoNav" onClick={()=>{history.push('/main')}}>
                            <img src={logoImgPath} alt="logo"  width={"40px"} height={"40px"} />
                            <div className="PksclNav">PKSCL</div>
                        </div>
                        {
                            editProfileButton === true
                                ? (<div className="buttonNav">
                                    <i className="fas fa-user" onClick={() => { setEditProfileState(true); }} style={{ fontSize: "20px", marginRight: "10px" }}></i>
                                    <i className="fas fa-headset" style={{ fontSize: "20px", marginRight: "10px" }} onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                    <button className='navButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                </div>)
                                : (<div className="buttonNav">
                                    <button className='navButton' type='button' onClick={() => { history.push('/'); }}>로그인</button>
                                </div>)
                        }
                    </div>
                    <div className="MainPageContainer"
                        style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <div className="errorGiraffe">
                            {wrongApproachContext}<br />
                            장부의 예시를 보고싶다면 기린을 눌러주세요 :)
                            <img onClick={() => { getExPKSCL() }} src={giraffe} className="giraffe" alt="기린"
                                style={{ width: "70px", height: "70px", marginLeft: "20px" }} />
                            <a href="http://pf.kakao.com/_tRxcJb " target="_blank" rel="noreferrer" title="챗봇으로 연결됩니다." style={{ color: "black" }}>PKSCL 문의하기</a>
                        </div></div></div>)
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
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter1") }}><div>1분기</div><img src={quarter1} alt="quarter1" ></img></div>
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter2") }}><div>2분기</div><img src={quarter2} alt="quarter2" ></img></div>
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter3") }}><div>3분기</div><img src={quarter3} alt="quarter3" ></img></div>
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter4") }}><div>4분기</div><img src={quarter4} alt="quarter4" ></img></div>
                                      
                                        </div>

                                    </div>
                                    <div className="rightPanel">
                                        <div className="nav">

                                                <div className="logoNav" onClick={()=>{history.push('/main')}}>
                                                    <img src={logoImgPath} alt="logo" width={"40px"} height={"40px"} />
                                                    <div className="PksclNav">PKSCL</div>
                                                </div>
                                                <div className="PCVersion buttonNav">
                                                    <button className='navButton' type='button' onClick={() => { defineColor(props.todayQuarter); history.push('/manage') }}>학생 관리</button>
                                                    <button className='navButton' type='button' 
                                                    onClick={() => { history.push('/main') }}>학생 공개용 장부</button>
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
                                                    <i className="fas fa-user" style={{ fontSize: "20px", marginRight: "10px" }} onClick={() => { setEditProfileState(true); }}></i>
                                                    <i className="fas fa-headset" style={{ fontSize: "20px", marginRight: "10px" }} onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                    <button className='navButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                                </div>
                                        </div>
                                        <div className="mobileVersion"> PKSCL 장부 수정은 PC로만 가능합니다.
                                            <div style={{ display: "flex" }}>
                                                <button className='submitButton' style={{ width: "25vw" }} type='button' 
                                                onClick={() => { history.push('/main') }}>학생 공개용 장부</button>
                                            </div>
                                        </div>

                                        <div className="PCVersion">
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
                                                                                        <i className="far fa-trash-alt"></i></button>
                                                                                    <button onClick={() => {
                                                                                        setEditEventState(true)
                                                                                        setEditEventData(quarter[currentQuarter]["eventList"][i]);
                                                                                        setEditEventAmount(eventAmount[i]);
                                                                                    }} style={{ marginRight: "15px" }}><i className="fas fa-wrench"></i></button>

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
                                                                                                        }}><i className="fas fa-angle-double-up"></i></button>
                                                                                                    )
                                                                                                    : (
                                                                                                        <button onClick={() => {
                                                                                                            let array = [...showAllReceiptButton];
                                                                                                            array[i] = !showAllReceiptButton[i];
                                                                                                            setShowAllReceiptButton(array);
                                                                                                        }}><i className="fas fa-angle-double-down"></i></button>
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

                                                                                                                                        <td>
                                                                                                                                            <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["totalAmount"]}</span>
                                                                                                                                        </td>
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
                                                        }} > <i className="fas fa-plus"></i> </button>
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
                                                                    : <span style={{ marginBottom: "5px"}}>등록된 행사가 없습니다.</span>
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