import quarter1 from './img/quarter1.png';
import quarter2 from './img/quarter2.png';
import quarter3 from './img/quarter3.png';
import quarter4 from './img/quarter4.png';

import giraffe from './img/giraffe.png';
import EditProfile from './EditProfile';
import './css/MainPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PreviewImg from './PreviewImg';


function MainPage(props) {

    const history = useHistory();

    const [studentPresident, setStudentPresident] = useState();

    const [quarter, setQuarter] = useState();
    const [quarterDate, setQuarterDate] = useState();

    const [eventAmount, setEventAmount] = useState([]);
    const [quarterAmount, setQuarterAmount] = useState(0);
    const [currentQuarter, setCurrentQuarter] = useState(props.todayQuarter);
    const [showAllReceiptButton, setShowAllReceiptButton] = useState([]);
    const [editProfileState, setEditProfileState] = useState(false);

    const [major, setMajor] = useState();
    const [majorList, setMajorList] = useState();

    const [searchButton, setSearchButton] = useState("search");

    const [tempQuarter, setTempQuarter] = useState(false);

    const [showImg, setShowImg] = useState(false);
    const [previewImg, setPreviewImg] = useState();

    const [showCurrentQuerter, setShowCurrentQuerter] = useState();

    const [logoImgPath, setLogoImgPath] = useState();

    const [wrongApproach, setWrongApproach] = useState(false);
    const [wrongApproachContext, setWrongApproachContext] = useState();
    const [editProfileButton, setEditProfileButton] = useState(true);

    const [userLoginPosition, setUserLoginPosition] = useState();
    const [alertContainer,setAlertContainer] = useState(false);
    const [userStatus,setUserStatus] = useState();

    function resetShowAllReceiptButton() {
        let resetArray = [];
        if (quarter[currentQuarter]["eventList"] !== undefined) {
            for (let i = 0; i < quarter[currentQuarter]["eventList"].length; i++) {
                resetArray.push(true)
            }
        }
        setShowAllReceiptButton(resetArray)
    }

    function reset(quarterData) {
        if (quarter !== undefined && quarter[quarterData]["eventList"] !== undefined) {
            CalculateCurrentQuarterReceiptSumList(quarter[quarterData]["eventList"]);
            resetShowAllReceiptButton();
        }else{
            setQuarterAmount(0);
        }
        window.scrollTo(0, 0);
    }

    function showQuarter(selectedQuarter) {
        if (userLoginPosition === "student" || userLoginPosition === "president") {
            if (quarter[selectedQuarter]["status"] === "true") {
                reset(selectedQuarter);
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
                setShowCurrentQuerter(quarter[selectedQuarter]["status"]);
            } else {
                reset(selectedQuarter);
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
                setShowCurrentQuerter(quarter[selectedQuarter]["status"]);
            }
        } else if (userLoginPosition === "admin") {
            reset(selectedQuarter);
            setCurrentQuarter(selectedQuarter);
            defineColor(selectedQuarter);
        }
        setLogoImgPath(`./img/${selectedQuarter}.png`);
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
        if (quarter === "quarter1") {
            setColorProperty("#db8f8e", "#fdeded", "#f5dede", "#FDEDF0", "#fbf6f6");
        } else if (quarter === "quarter2") {
            setColorProperty("#649d67", "#e9ede9", "#cedbcf", "#dee7df", "#f6f7f6");
        } else if (quarter === "quarter3") {
            setColorProperty("#c18356", "#f9eee5", "#e9d8cd", "#fff5ed", "#fbf7f4");
        } else if (quarter === "quarter4") {
            setColorProperty("#6b8396", "#e0eaf3", "#d0dbe5", "#e6f1fb", "#f8fcff");
        }
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

    function adminButton() {
        if (majorList === undefined) {
            return;
        } else {
            return (<>
                <div className="mainSearchBar" >
                    <input className="majorList"
                        type="text" list="majorList-options" id='major' name="major" placeholder="학과를 입력하세요."
                        onChange={(e) => {
                            setMajor(e.target.value);
                            ;
                        }}
                        style={{ width: "250px" }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                adminGetLedger(major);
                            }
                        }}
                        value={major}
                    >
                    </input>
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
                    <button style={{ boxShadow: "0 0 0 white" }} onClick={() => {
                        adminGetLedger(major);
                    }}> {
                            searchButton === "search"
                                ? <i className="fas fa-search"></i>
                                : <i className="fas fa-times"></i>
                        }</button>
                </div>
            </>
            )
        }
    }

    function adminGetLedger(ledgerMajor) {
        if (searchButton === "x") {
            setMajor("");
            setSearchButton("search");
        } else {
            if (major === "") {
                alert("검색명을 입력해주세요 :)");
            } else if ((majorList.includes(ledgerMajor))) {
                let findMajorIndex = majorList.indexOf(ledgerMajor)
                getAdminLedger(findMajorIndex);
                adminGetDate(findMajorIndex);
                setMajor("");
                setSearchButton("search");
            } else {
                alert("해당하는 학과가 없습니다 다시 검색해주세요:)");
            }
        }
    }

    function getAdminLedger(findMajorIndex) {
        axios.get(  `/major-info/admin?major-number=${findMajorIndex}`)
            .then((payload) => {
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarter({ ...payload.data["quarter"] });
                reset(props.todayQuarter);
                showQuarter(props.todayQuarter);
                setShowCurrentQuerter(payload.data["quarter"][props.todayQuarter]["status"])
                setWrongApproach(false)
                setEditProfileButton(true);
                setLogoImgPath(`./img/${props.todayQuarter}.png`);
            })
            .catch((error) => {
                if (major === undefined) {
                    setWrongApproachContext(`컴퓨터공학과 장부를 불러올 수 없습니다. error :` + error.response.status)
                    setWrongApproach(true)
                    setEditProfileButton(false);
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                } else {
                    setWrongApproachContext(`${major} 장부를 불러올 수 없습니다. error :` + error.response.status)
                    setWrongApproach(true)
                    setEditProfileButton(false);
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                }
            })

    }

    function adminGetDate(findMajorIndex) {
        axios.get(`/ledger-date?major-number=${findMajorIndex}`)
            .then((payload) => {
                setQuarterDate({ ...payload.data });
                showQuarter(props.todayQuarter);
                setWrongApproach(false)
                setEditProfileButton(false);
            })
            .catch((error) => {
                if (major === undefined) {
                    setWrongApproachContext(`컴퓨터공학과의 장부 open, close 날짜를 불러올 수 없습니다. error: ` + error.response.status)
                    setWrongApproach(true)
                    setEditProfileButton(false);
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                } else {
                    setWrongApproachContext(`${major}의 장부 open, close 날짜를 불러올 수 없습니다. error: `  + error.response.status)
                    setWrongApproach(true)
                    setEditProfileButton(false);
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                }
            })
    }

    function getExPKSCL() {
        axios.get( '/temp-major-info')
            .then((payload) => {
                setWrongApproach(false)
                setEditProfileButton(false);
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarter({ ...payload.data["quarter"] });
                setTempQuarter(true);
                setShowCurrentQuerter(payload.data["quarter"][props.todayQuarter]["status"])
                setLogoImgPath(`./img/${props.todayQuarter}.png`);
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400: alert(`임시 장부를 불러올 수 없습니다.`); break;
                    default: alert("임시 장부 로드 실패/ error: " + error.response.status); break;
                }
            })
    }

    function loginAdmin() {
        let ledgerMajor;
        axios.get('/major-list')
            .then((payload) => {
                setMajorList([...payload.data["majorList"]]);
                if (major === undefined) {
                    let ledgerMajorList = [...payload.data["majorList"]];
                    ledgerMajor = (ledgerMajorList.indexOf("컴퓨터공학과"));
                    getAdminLedger(ledgerMajor);
                    adminGetDate(ledgerMajor);
                    defineColor(props.todayQuarter);
                } else {
                    getAdminLedger(major);
                    adminGetDate(major);
                    defineColor(props.todayQuarter);
                }
                setWrongApproach(false)
                setEditProfileButton(false);
            })
            .catch((error) => {
                setWrongApproachContext("학과 리스트를 불러올 수 없습니다. error: " + error.response.status);
                setWrongApproach(false)
                setEditProfileButton(false); 
            })
    }

    function loginPresident() {

        axios.get('/status')
            .then((payload) => {
                setUserStatus(payload.data["status"])
                if (payload.data["status"] === "refusal") {
                    setWrongApproachContext("사용자(학생회장)는 현재 거절 상태입니다. PKSCL 챗봇을 통해 회장 신청을 다시 진행해 주십시오.")
                    setWrongApproach(true)
                    setEditProfileButton(true);
                    defineColor(props.todayQuarter);
                }
                else if (payload.data["status"] === "waiting") {
                    setWrongApproachContext("사용자(학생회장)는 현재 대기 상태입니다. PKSCL 챗봇을 통해 회장 인증을 해주세요 :)");
                    setWrongApproach(true)
                    setEditProfileButton(true);
                    defineColor(props.todayQuarter);
                }
                else if (payload.data["status"] === "approval") {
                    axios.get('/major-info')
                        .then((payload) => {
                            setStudentPresident({ ...payload.data["studentPresident"] });
                            setQuarter({ ...payload.data["quarter"] });
                            setShowCurrentQuerter(payload.data["quarter"][props.todayQuarter]["status"])
                            setWrongApproach(false)
                            setEditProfileButton(false);
                            setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        })
                        .catch((error) => {
                            setWrongApproachContext("사용자(학생회장)는 현재 승인 상태입니다. PKSCL 챗봇을 통해 문의 해주세요 :) error: " + error.response.status);
                            setWrongApproach(true)
                            setEditProfileButton(true);
                            defineColor(props.todayQuarter);
                            setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        })
                }
            })
            .catch((error) => {
                switch (error.response.status) {
                case 400: 
                    setWrongApproachContext("학생회장의 승인 상태를 알 수 없습니다.");  
                    setEditProfileButton(false)
                    setWrongApproach(true)
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`); 
                break;
                default: 
                    setWrongApproachContext("학생회장의 상태 확인 실패/ error: " + error.response.status); 
                    setEditProfileButton(false)
                    setWrongApproach(true)
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                break;
            }  
            })


        reset(props.todayQuarter);
        defineColor(props.todayQuarter);
    }

    function loginStudent() {
        axios.get('/status')
            .then((payload) => {
                if (payload.data["status"] === "refusal") {
                    setWrongApproachContext("사용자(학생)는 현재 거절 상태입니다. 프로필 편집 기능을 통해 본인 정보가 올바르게 기입되었는지 우선 확인하고, 바르게 입력되었을 경우엔 신청하신 학과의 학생회장에게 문의해 주세요 :)");
                    setWrongApproach(true)
                    setEditProfileButton(true);
                    defineColor(props.todayQuarter);
                }
                else if (payload.data["status"] === "waiting") {
                    setWrongApproachContext("사용자(학생)는 현재 대기 상태입니다. 프로필 편집 기능을 통해 본인 정보가 올바르게 기입되었는지 우선 확인하고, 바르게 입력되었을 경우엔 신청하신 학과의 학생회장에게 문의해 주세요 :)");
                    setWrongApproach(true)
                    setEditProfileButton(true);
                    defineColor(props.todayQuarter);
                } else if (payload.data["status"] === "approval") {
                    axios.get(  '/major-info')
                        .then((payload) => {
                            setStudentPresident({ ...payload.data["studentPresident"] });
                            setQuarter({ ...payload.data["quarter"] });
                            setShowCurrentQuerter(payload.data["quarter"][props.todayQuarter]["status"])
                            setWrongApproach(false)
                            setEditProfileButton(false);
                            setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        })
                        .catch((error) => {
                            setWrongApproachContext("사용자(학생)는 현재 승인 상태입니다. PKSCL 챗봇을 통해 문의 해주세요 :) error: " + error.response.status);
                            setWrongApproach(true)
                            setEditProfileButton(true);
                            defineColor(props.todayQuarter);
                            setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        })
                }
            })
            .catch((error) => {
                switch (error.response.status) {
                case 400: 
                    setWrongApproachContext("학생의 승인 상태를 알 수 없습니다.");  
                    setEditProfileButton(false)
                    setWrongApproach(true)
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`); 
                break;
                default: 
                    setWrongApproachContext("학생의 상태 확인 실패/ error: " + error.response.status); 
                    setEditProfileButton(false)
                    setWrongApproach(true)
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                break;
                }  
            })
        reset(props.todayQuarter);
        defineColor(props.todayQuarter);
    }

    function reload() {
        axios.get('/position')
            .then((payload) => {
                if (payload.data["position"] === "admin") {
                    setWrongApproach(false)
                    setEditProfileButton(true);
                    loginAdmin()
                } else if (payload.data["position"] === "president") {
                    setWrongApproach(false)
                    setEditProfileButton(true);
                    loginPresident()
                } else if (payload.data["position"] === "student") {
                    setWrongApproach(false)
                    setEditProfileButton(true);
                    loginStudent()
                } else {
                    setWrongApproachContext("잘못된 접근입니다.");
                    setEditProfileButton(false)
                    setWrongApproach(false)
                }
                setLogoImgPath(`./img/${props.todayQuarter}.png`);
            })
            .catch((error) => {
                switch (error.response.status) {
                case 400: 
                    alert(`잘못된 접근입니다.`);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`); 
                break;
                default: 
                    alert("회원 position 로드 실패/ error: " + error.response.status); 
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                break;
            }  
            })
    }

    useEffect(() => {

        // push 할때 주석 풀기
        axios.get('/position')
            .then((payload) => {
                setUserLoginPosition(payload.data["position"])
                setLogoImgPath(`./img/${props.todayQuarter}.png`);
                reload()
                defineColor(props.todayQuarter);
            })
            .catch((error) => {
                switch (error.response.status) {
                case 400: 
                    setWrongApproachContext(`사용자의 Position을 알 수 없습니다.`);
                    setWrongApproach(true)
                    setEditProfileButton(false);
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                break;
                default:  
                    setWrongApproachContext("회원 position 로드 실패/ error: " + error.response.status); 
                    setWrongApproach(true)
                    setEditProfileButton(false);
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                break;
            }  
            })

        // push 할때 주석 넣기
    // let answer = {"studentPresident":{"major":"기린학과","name":"\b김기린","phoneNumber":"010-1234-5678","email":"cherisher20@pukyong.ac.kr","majorLogo":"./static/majorLogo/tempLogo.jpg"},"quarter":{"quarter1":{"status":"true","eventList":[{"eventNumber":"171","eventTitle":"빛축제 (일시 : 10/27~10/29)","eventContext":"[공과대]의 청춘을 비추다","receiptList":[{"receiptNumber":"181","receiptTitle":"추억의 뽑기판","receiptImg":{"name":"./static/receiptImg/20220228092500209.png"},"receiptContext":"공과대생 선착순 300명","receiptDetailList":[{"context":"LED 풍선","price":"500","amount":"100","totalAmount":"50000"},{"context":"LED 삔","price":"300","amount":"100","totalAmount":"30000"},{"context":"LED 반지","price":"450","amount":"100","totalAmount":"45000"}]}]},{"eventNumber":"164","eventTitle":"기린학과 임시 장부임~~~~","eventContext":"우헤헤 기린학과엔 기린이 몇마리일기린?","receiptList":[{"receiptNumber":"177","receiptTitle":"기린기린기린","receiptImg":{"name":"./static/receiptImg/20220216122414973.png"},"receiptContext":"기린 퀴즈","receiptDetailList":[{"context":"다리","price":"4","amount":"3","totalAmount":"12"},{"context":"심장","price":"1","amount":"3","totalAmount":"3"},{"context":"꼬리","price":"1","amount":"3","totalAmount":"3"}]}]}]},"quarter2":{"status":"true"},"quarter3":{"status":"true","eventList":[{"eventNumber":"170","eventTitle":"기린의 목덜미","eventContext":"","receiptList":[{"receiptNumber":"180","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/defaultReceiptImg.jpg"},"receiptContext":"","receiptDetailList":[{"context":"ww","price":"11","amount":"22","totalAmount":"242"}]}]}]},"quarter4":{"status":"true"}}}
    // let answerDate = {
    //     "quarter1": ["2022-01-01", "2022-01-02"],
    //     "quarter2": ["2022-01-03", "2022-01-04"],
    //     "quarter3": ["2022-01-05", "2022-01-06"],
    //     "quarter4": ["2022-01-07", "2022-01-08"]
    // }
    // let answerMajorList = ["기린학과", "국어국문학과", "영어영문학부", "일어일문학부", "사학과", "경제학부", "법학과", "행정학과", "국제지역학부", "중국학과", "신문방송학과", "정치외교학과", "유아교육과", "시각디자인학과", "공업디자인학과", "패션디자인학과", "경영학부", "국제통상학부", "응용수학과", "통계학과", "물리학과", "화학과", "미생물학과", "해양스포츠학과", "간호학과", "과학시스템시뮬레이션학과", "건축공학과", "건축학과", "소방공학과", "시스템경영공학부", "IT융합응용공학과", "안전공학과", "융합디스플레이공학과", "의공학과", "전기공학과", "전자공학과", "정보통신공학과", "제어계측공학과", "조선해양시스템공학과", "컴퓨터공학과", "토목공학과", "고분자공학과", "공업화학과", "금속공학과", "기계공학과", "기계설계공학과", "기계시스템공학과", "냉동공조공학과", "신소재시스템공학과", "인쇄정보공학과", "재료공학과", "화학공학과", "지속가능공학부", "식품공학과", "해양바이오신소재학과", "해양생산시스템관리학부", "해양수산경영학과", "수해양산업교육과", "자원생물학과", "식품영양학과", "생물공학과", "수산생명의학과", "환경공학과", "해양공학과", "해양학과", "지구환경과학과", "환경대기과학과", "에너지자원공학과", "공간정보시스템공학과", "생태공학과", "데이터정보과학부(빅데이터융합전공)", "데이터정보과학부(통계·데이터사이언스전공)", "미디어커뮤니케이션학부(언론정보전공)", "미디어커뮤니케이션학부(휴먼ICT융합전공)", "스마트헬스케어학부(의공학전공)", "스마트헬스케어학부(해양스포츠전공)", "스마트헬스케어학부(휴먼바이오융합전공)", "전자정보통신공학부(전자공학전공)", "전자정보통신공학부(정보통신공학전공)", "조형학부(건축학전공)", "조형학부(공업디자인전공)", "조형학부(시각디자인전공)", "컴퓨터공학부(소프트웨어·인공지능전공)", "컴퓨터공학부(컴퓨터공학전공)", "평생교육·상담학과", "기계조선융합공학과", "전기전자소프트웨어공학과", "공공안전경찰학과"] 

    //         setStudentPresident({ ...answer["studentPresident"] });
    //         setQuarter({ ...answer["quarter"] });
    //         reset(props.todayQuarter);
    //         showQuarter(props.todayQuarter);
    //         setLogoImgPath(`./img/${props.todayQuarter}.png`);
    //         setShowCurrentQuerter(answer["quarter"][props.todayQuarter]["status"])
    //         setStudentPresident({ ...answer["studentPresident"] });
    //         setQuarterDate({ ...answerDate });
    //         setUserLoginPosition("admin")
    //         setMajorList([...answerMajorList]);
    //         defineColor(props.todayQuarter);
    }, []);

    useEffect(() => {
        if (quarter !== undefined) {
            reset(currentQuarter);
        }
    }, [currentQuarter])

    useEffect(() => {
        if (quarter !== undefined)
            reset(props.todayQuarter);

    }, [quarter])

    useEffect(()=>{
        if (userLoginPosition === "president" ||userLoginPosition === "admin")
        setAlertContainer(true)
    },[userLoginPosition])

    return (
        <>
        {
            defineColor(currentQuarter)
        }
        {wrongApproach === true
            ? (<>
                {
                    editProfileState
                        ?
                        <EditProfile loginPosition={userLoginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                        : null
                }
               
                <div className="MainPageContainer"
                    style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                         <div className="nav" >
                    <div className="logoNav">
                        <img src={logoImgPath} alt="logo"  width={"40px"} height={"40px"} />
                        <div className="PksclNav PCVersion" >PKSCL</div>
                    </div>
                    {
                        editProfileButton === true
                            ? (<>{
                                userLoginPosition === "admin"
                                    ? (<div className="buttonNav">
                                        <i class="fas fa-headset" onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                        <button className='navButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                    </div>)
                                    : (
                                        <div className="buttonNav">
                                            <i class="fas fa-user"  onClick={() => { setEditProfileState(true); }}></i>
                                            <i class="fas fa-headset"  onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                            <button className='navButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                        </div>)
                            }</>
                            )
                            : (<div className="buttonNav">
                                <button className='navButton' type='button' onClick={() => { history.push('/'); }}>로그인</button>
                            </div>)
                    }


                </div>
                    <div className="errorGiraffe">
                        {wrongApproachContext}<br />
                        장부의 예시를 보고싶다면 기린을 눌러주세요 :)

                        <img onClick={() => { getExPKSCL() }} src={giraffe} className="giraffe" alt="기린"
                            style={{ width: "70px", height: "70px", marginLeft: "20px" }} />
                        <a href="http://pf.kakao.com/_tRxcJb " target="_blank" rel="noreferrer" title="챗봇으로 연결됩니다." style={{ color: "black" }}>PKSCL 문의하기</a>
                    </div></div></>)
            : (<div className="MainPageContainer">
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
                    alertContainer === true
                    ?<div className="alertContainer alertContainermobileVersion">
                        <div className="alertBox">
                            <div style={{display : "flex", justifyContent: "flex-end", width: "100%"}}>
                                <button className="alertButton" onClick={()=>{setAlertContainer(false)}}>
                                    <i className="fas fa-times"></i></button>
                            </div>
                            <div className="alertContext">
                                {
                                    userLoginPosition === "president"
                                    ?<div>mobile로는 학생 입장으로 장부 열람만 하실 수 있습니다.<br/>
                                        장부 수정, 학생 관리 등 더 많은 서비스를 이용하시려면 PC로 접속해주세요.</div>
                                    :<div>mobile로는 컴퓨터공학과 장부 열람만 하실 수 있습니다.<br/>
                                        컴퓨터공학과 외 타과 장부 열람 및 학과 관리를 하시려면 PC로 접속해주세요.</div>
                                }
                            </div>
                        </div>
                    </div>
                    

                    : null
                }
                {
                    quarter === undefined
                        ? null
                        : (<>
                            <div className="leftPanel" >
                                <div className="majorCard">
                                    <div className="presidentCard">
                                        <h2>{studentPresident["major"]}</h2>
                                        <img src={studentPresident["majorLogo"]} alt="majorLogo" height={"150"} width={"10"} />
                                        {
                                            console.log("studentPresident[majorLogo]: "+studentPresident["majorLogo"])
                                        }
                                        {
                                            userLoginPosition === "president" && studentPresident["majorLogo"] === "./static/majorLogo/templogo.jpg"
                                            ? <p style={{color:"#d32c2c"}}>로고 사진은 프로필 편집에서 변경 가능합니다 :)</p>
                                            : null
                                        }
                                        <h3>{studentPresident["name"]}</h3>
                                        <p>{studentPresident["email"]}</p>
                                    </div>
                                    <div className="cogExplanation">
                                        안녕하세요 {studentPresident["major"]} 회장 {studentPresident["name"]}입니다.
                                        PKSCL 온라인 장부를 통해 학과 장부를 분기별로 확인하세요 :)
                                        장부 확인 중 문의 사항이 있으시다면 이메일로 연락주십시오.
                                        <div style={{ color: "#d32c2c" }}>※ 학과의 장부를 외부로 유출 시 발생하는 문제의 책임은 학생 본인에게 있습니다.</div>
                                    </div>
                                </div>
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
                                         <img src={logoImgPath} alt="logo"  width={"40px"} height={"40px"} />
                                        <div className="PksclNav PCVersion" >PKSCL</div>
                                        <div className="quarterSelecter">
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter1") }}><div>1</div><img src={quarter1} alt="quarter1" ></img></div>
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter2") }}><div>2</div><img src={quarter2} alt="quarter2" ></img></div>
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter3") }}><div>3</div><img src={quarter3} alt="quarter3" ></img></div>
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter4") }}><div>4</div><img src={quarter4} alt="quarter4" ></img></div>
                                        </div>
                                    </div>
                                        {
                                            userLoginPosition === "president"
                                                ? (<>
                                                    {
                                                        tempQuarter === true
                                                            ?<>
                                                            <div className='buttonNav' >
                                                                    <div className="tempAlert PCVersion" >회원님은 장부 열람 권한이 없어 임시 장부를 확인 중입니다.</div>
                                                                    <i class="fas fa-user" onClick={() => { setEditProfileState(true); }}></i>
                                                                    <i class="fas fa-headset navButtonProfile" onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                                    <button className='navButton' type='button' onClick={() => { logout(); }}>로그아웃</button >
                                                                    
                                                            </div>
                                                            {/* <div className="tempAlert mobileVersion" >회원님은 장부 열람 권한이 없어 임시 장부를 확인 중입니다.</div> */}
                                                            </>
                                                            :<>
                                                            <div className='buttonNav' >
                                                                <div className="tempAlert PCVersion" >
                                                                    현재 {studentPresident["major"]} 학생들에게 공개된 장부 입니다. </div>
                                                                {/* <button className='navButton' type='button' onClick={() => {history.push('/manage') }}>학생 관리</button>*/}
                                                                <i class="fas fa-user navButtonProfile"  onClick={() => { setEditProfileState(true); }}></i>
                                                                <i class="fas fa-headset navButtonProfile" onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                                <button className='navButton edit navButtonEdit'  type='button' onClick={() => { history.push('/edit-main') }}>장부 수정 페이지</button> 
                                                                <button className='navButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                                            </div>
                                                            {/* <div className="tempAlert mobileVersion" >현재 {studentPresident["major"]} 학생들에게 공개된 장부 입니다. </div> */}
                                                            </>
                                                    }
                                                </>)
                                                : (<>
{
                                                        userLoginPosition === "admin"
                                                            ? (
                                                                <div  className='buttonNav PCVersion' >
                                                                <button className='navButton' type='button' onClick={() => {history.push('/manage') }}>학과 관리</button>
                                                            </div>)
                                                            : null
                                                    }
                                        {
                                                        quarterDate !== undefined && userLoginPosition === "admin"
                                                            ? (<div className='adminNav PCVersion' >
                                                                    <div className="dateInput">{quarterDate[currentQuarter][0]}~{quarterDate[currentQuarter][1]}</div>
                                                                    {adminButton()}</div>)
                                                                : null
                                                    }
                                                    <div  className='buttonNav' >
                                                    <i class="fas fa-user"  onClick={() => { setEditProfileState(true); }}></i>
                                                    <i class="fas fa-headset" onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                    
                                                    <button className='navButton' type='button' onClick={() => { logout(); }}>로그아웃</button></div>
                                                    
                                                </>)
                                        }

                                </div>
                                {
                                    showCurrentQuerter === "true"
                                        ? (<>
                                            <div className="quarterData">
                                              
                                                <h2 className="quarterTotalAmount" style={{ fontWeight: "bold" }}>
                                                    {currentQuarter[currentQuarter.length - 1]}분기 총 금액 : {quarterAmount}원
                                                </h2>
                                                {
                                                    quarter[currentQuarter]["eventList"] === undefined
                                                        ? <div>입력된 행사가 없습니다.</div>
                                                        : (quarter[currentQuarter]["eventList"].map((event, i) => {
                                                            return (
                                                                <div className="eventCardBox" >
                                                                    <div className="eventCard" >
                                                                        <div className="cardContent">
                                                                            <div className="eventSource">
                                                                                <div className="eventSourceBox">
                                                                                    <h4 className="titleLimitation">{event["eventTitle"]}</h4>
                                                                                    <div style={{ color: "var(--color-quarter)" }}>행사 총 금액 : {eventAmount[i]}원</div>

                                                                                    <div className="contextLimitation">{event["eventContext"]}  </div>
                                                                                </div>
                                                                                <div className="eventButtons">
                                                                                    {
                                                                                        event.receiptList.length <= 1
                                                                                            ? null
                                                                                            : (
                                                                                                showAllReceiptButton[i] === false
                                                                                                    ? (
                                                                                                        <button style={{ width: "50px" }} onClick={() => {
                                                                                                            let array = [...showAllReceiptButton];
                                                                                                            array[i] = !showAllReceiptButton[i];
                                                                                                            setShowAllReceiptButton(array)
                                                                                                        }}><i class="fas fa-angle-double-up"></i></button>
                                                                                                    )
                                                                                                    : (
                                                                                                        <button style={{ width: "50px" }} onClick={() => {
                                                                                                            let array = [...showAllReceiptButton];
                                                                                                            array[i] = !showAllReceiptButton[i];
                                                                                                            setShowAllReceiptButton(array)
                                                                                                        }}><i class="fas fa-angle-double-down"></i></button>
                                                                                                    )
                                                                                            )

                                                                                    }
                                                                                </div>
                                                                            </div>

                                                                            {
                                                                                showAllReceiptButton[i] === true
                                                                                    ? (<div id="receiptContent" style={{ height: "440px", overflowY: "hidden" }}>

                                                                                        <div className="receiptCard">
                                                                                            <div className="receiptResource">
                                                                                                {
                                                                                                    event["receiptList"].length === 0
                                                                                                        ? <div>입력된 영수증이 없습니다.</div>
                                                                                                        : (<>
                                                                                                            <h5 className="titleLimitation">{event["receiptList"][0]["receiptTitle"]}</h5>
                                                                                                            {
                                                                                                                event["receiptList"][0]["receiptDetailList"].length === 0
                                                                                                                    ? null
                                                                                                                    : (<div style={{ color: "var(--color-quarter)" }}>1번째 영수증 금액 : {sumReceipt(event["receiptList"][0]["receiptDetailList"])}원</div>)
                                                                                                            }


                                                                                                            <div className="contextLimitation">{event["receiptList"][0]["receiptContext"]}</div>



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
                                                                                                                        <tbody>{event["receiptList"][0]["receiptDetailList"].map((item, k) => {
                                                                                                                            return (<tr>
                                                                                                                                <td>{item["context"]}</td>
                                                                                                                                <td>{item["price"]}</td>
                                                                                                                                <td>{item["amount"]}</td>
                                                                                                                                <td>{sumItems(item["price"], item["amount"])}</td>
                                                                                                                            </tr>)
                                                                                                                        })}
                                                                                                                        </tbody> </table></>)
                                                                                                            }
                                                                                                        </>
                                                                                                        )
                                                                                                }

                                                                                            </div>
                                                                                            {
                                                                                                event["receiptList"].length === 0
                                                                                                    ? null
                                                                                                    :
                                                                                                    <img className="receiptImg" src={event["receiptList"][0]["receiptImg"]["name"]}
                                                                                                        style={{ backgroundColor: "var(--color-leftPanel)" }} width="400px"
                                                                                                        alt={event["receiptList"][0]["receiptImg"]["name"]}
                                                                                                        onClick={() => { setShowImg(true); setPreviewImg(event["receiptList"][0]["receiptImg"]["name"]); }} />
                                                                                            }
                                                                                        </div>
                                                                                    </div>)
                                                                                    : (<div id="receiptContent" >
                                                                                        {
                                                                                            event["receiptList"].map((receipt, j) => {
                                                                                                return (
                                                                                                    <div className="receiptCard">
                                                                                                        <div className="receiptResource">
                                                                                                            {
                                                                                                                event["receiptList"].length === 0
                                                                                                                    ? <div>입력된 영수증이 없습니다.</div>
                                                                                                                    : (<>
                                                                                                                        <h5 className="titleLimitation">{receipt["receiptTitle"]}</h5>
                                                                                                                        {
                                                                                                                            receipt["receiptDetailList"].length === 0
                                                                                                                                ? null
                                                                                                                                : <div style={{ color: "var(--color-quarter)" }}>{j + 1}번째 영수증 금액 : {sumReceipt(receipt["receiptDetailList"])}원</div>
                                                                                                                        }
                                                                                                                        <div className="contextLimitation">{receipt["receiptContext"]}</div>
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
                                                                                                                                                return (<tr>
                                                                                                                                                    <td>{item["context"]}</td>
                                                                                                                                                    <td>{item["price"]}</td>
                                                                                                                                                    <td>{item["amount"]}</td>
                                                                                                                                                    <td>{sumItems(item["price"], item["amount"])}</td>
                                                                                                                                                </tr>)
                                                                                                                                            })
                                                                                                                                            }
                                                                                                                                        </tbody> </table>
                                                                                                                                </>
                                                                                                                                )
                                                                                                                        }

                                                                                                                    </>)}
                                                                                                        </div>
                                                                                                        {
                                                                                                            event["receiptList"].length === 0
                                                                                                                ? null
                                                                                                                : <img src={receipt["receiptImg"]["name"]} alt={receipt["receiptImg"]["name"]}
                                                                                                                    style={{ backgroundColor: "var(--color-leftPanel)" }} width="400px"
                                                                                                                    className="receiptImg"
                                                                                                                    onClick={() => { setShowImg(true); setPreviewImg(receipt["receiptImg"]["name"]); }} />
                                                                                                        }
                                                                                                    </div>

                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>)

                                                                            }


                                                                        </div>

                                                                    </div>
                                                                    {
                                                                        event.receiptList.length > 1 && showAllReceiptButton[i] === false
                                                                            ? <div className="giraffeDiv"><img src={giraffe} className="giraffe" alt="" style={{ width: "70px", height: "70px" }} /><div style={{ marginBottom: "50px", textAlign: "center" }}></div></div>
                                                                            : null
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                        )
                                                }

                                            </div>
                                        </>)
                                        : 
                                        (
                                            <div className="quarterData" style={{ display: "flex", color: "red" }}>
                                                <div className="errorGiraffe">
                                                    {currentQuarter[currentQuarter.length - 1]}분기 장부는 학생회장이 아직 공개하지 않았습니다.
                                                    <br />장부의 예시를 보고싶다면 기린을 눌러주세요 :)
                                                    <img onClick={() => { getExPKSCL() }} src={giraffe} className="giraffe" alt="" style={{ width: "70px", height: "70px", marginLeft: "20px" }} />
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                        </>
                        )
                }

            </div>)

        }</>

    )
}

export default MainPage;