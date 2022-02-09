import majorlogo from './img/majorlogo.png';
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


function MainPage(props) {
    let debugAPIURL = "";
    // debugAPIURL = "https://cors-jhs.herokuapp.com/https://pkscl.kro.kr";

    const history = useHistory();

    let answer = {
        "studentPresident": { "major": "영어영문학부", "name": "한준규", "phoneNumber": "010-3340-6496", "email": "hellllo3627@pukyong.ac.kr", "majorLogo": null },
        "quarter": {
            "quarter1": {
                "status": "true",
                "eventList": [
                    {
                        "eventNumber": "12",
                        "eventTitle": "학과 OT2",
                        "eventContext": "학과 OT를 잘 마무리 하였습니다.",
                        "receiptList": [{ "receiptNumber": "9", "receiptTitle": "학과 OT2 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "프라이팬", "price": "2000", "amount": "5", "totalAmount": "10000" }, { "context": "돈까스", "price": "2500", "amount": "6", "totalAmount": "15000" }] }, { "receiptNumber": "10", "receiptTitle": "학과 OT2 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "대선", "price": "1500", "amount": "1", "totalAmount": "1500" }, { "context": "갈비", "price": "2500", "amount": "4", "totalAmount": "10000" }, { "context": "참이슬", "price": "3500", "amount": "1", "totalAmount": "3500" }, { "context": "초콜렛", "price": "5000", "amount": "2", "totalAmount": "10000" }, { "context": "연필", "price": "2000", "amount": "2", "totalAmount": "4000" }] }]
                    },
                    { "eventNumber": "13", "eventTitle": "학과 새내기배움터 진행", "eventContext": "학과 새내기배움터를 진행하였고 이상없이 마무리 하였습니다.", "receiptList": [{ "receiptNumber": "11", "receiptTitle": "학과 새내기배움터 진행 영수증 1", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 새내기배움터 진행 영수증1", "receiptDetailList": [{ "context": "갈비", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "콜라", "price": "2731", "amount": "3", "totalAmount": "8193" }, { "context": "바구니", "price": "2731", "amount": "2", "totalAmount": "5462" }, { "context": "참이슬", "price": "2731", "amount": "5", "totalAmount": "13655" }] }, { "receiptNumber": "12", "receiptTitle": "학과 새내기배움터 진행 영수증 1", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 새내기배움터 진행 영수증1", "receiptDetailList": [{ "context": "휴지", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "컵", "price": "2731", "amount": "2", "totalAmount": "5462" }, { "context": "바구니", "price": "2731", "amount": "3", "totalAmount": "8193" }, { "context": "이어폰", "price": "2731", "amount": "5", "totalAmount": "13655" }] }] },
                    { "eventNumber": "14", "eventTitle": "빛 축제", "eventContext": "빛 축제를 진행하였습니다. 해당 영수증은 아래와 같습니다.", "receiptList": [{ "receiptNumber": "13", "receiptTitle": "빛 축제 영수증 1", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "빛 축제 영수증 1 영수증입니다.", "receiptDetailList": [{ "context": "휴지", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "과자", "price": "2731", "amount": "2", "totalAmount": "5462" }] }, { "receiptNumber": "14", "receiptTitle": "빛 축제 영수증 1", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "빛 축제 영수증 1 영수증입니다.", "receiptDetailList": [{ "context": "프라이팬", "price": "2731", "amount": "2", "totalAmount": "5462" }, { "context": "휴지", "price": "2731", "amount": "4", "totalAmount": "10924" }, { "context": "참이슬", "price": "2731", "amount": "4", "totalAmount": "10924" }] }] }]
            },
            "quarter2": {
                "status": "true",
                "eventList": [
                    {
                        "eventNumber": "18", "eventTitle": "기말고사 응원전", "eventContext": "기말고사 응원전을 진행하였습니다.",
                        "receiptList": [
                            {
                                "receiptNumber": "19",
                                "receiptTitle": "기말고사 응원전 영수증 1번",
                                "receiptImg": { "name": "./static/receiptImg/test2.png" },
                                "receiptContext": "",
                                "receiptDetailList": []
                            }, {
                                "receiptNumber": "19",
                                "receiptTitle": "기말고사 응원전 영수증 1번",
                                "receiptImg": { "name": "./static/receiptImg/test2.png" },
                                "receiptContext": "기말고사 응원전 영수증 1번",
                                "receiptDetailList": [{ "context": "휴지", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "프라이팬", "price": "2731", "amount": "2", "totalAmount": "5462" },
                                ]
                            }]
                    },
                    { "eventNumber": "19", "eventTitle": "기말고사 응원전2", "eventContext": "학생회비가 남게되어 기말고사응원전을 한번 더 진행하였습니다.", "receiptList": [{ "receiptNumber": "20", "receiptTitle": "기말고사 응원전 재영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "기말고사 응원전 재영수증 1번", "receiptDetailList": [{ "context": "돈까스", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "프라이팬", "price": "2731", "amount": "2", "totalAmount": "5462" }] }] }]
            },
            "quarter3": {
                "status": "false",
                "eventList": [
                    { "eventNumber": "20", "eventTitle": "공개일 X", "eventContext": "데이터 O", "receiptList": [{ "receiptNumber": "21", "receiptTitle": "데이터 O", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "데이터 O", "receiptDetailList": [{ "context": "갈비", "price": "2731", "amount": "2", "totalAmount": "5462" }, { "context": "연필", "price": "2731", "amount": "3", "totalAmount": "8193" }] }] },
                    { "eventNumber": "21", "eventTitle": "공개일 X", "eventContext": "데이터 O", "receiptList": [{ "receiptNumber": "22", "receiptTitle": "데이터 O", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "데이터 O", "receiptDetailList": [{ "context": "프라이팬", "price": "2731", "amount": "4", "totalAmount": "10924" }, { "context": "갈비", "price": "2731", "amount": "5", "totalAmount": "13655" }] }] }]
            },
            "quarter4": {
                "status": "false",
                "eventList": [
                    { "eventNumber": "22", "eventTitle": "공개일 X", "eventContext": "데이터 O", "receiptList": [{ "receiptNumber": "23", "receiptTitle": "데이터 O", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "데이터 O", "receiptDetailList": [{ "context": "바구니", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "대선", "price": "2731", "amount": "2", "totalAmount": "5462" }] }] },
                    { "eventNumber": "23", "eventTitle": "공개일 X", "eventContext": "데이터 O", "receiptList": [{ "receiptNumber": "24", "receiptTitle": "데이터 O", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "데이터 O", "receiptDetailList": [{ "context": "바구니", "price": "2731", "amount": "2", "totalAmount": "5462" }, { "context": "과자", "price": "2731", "amount": "2", "totalAmount": "5462" }] }] }]
            }
        }
    }


    let answerDate = {
        "quarter1": ["2022-01-01", "2022-01-02"],
        "quarter2": ["2022-01-03", "2022-01-04"],
        "quarter3": ["2022-01-05", "2022-01-06"],
        "quarter4": ["2022-01-07", "2022-01-08"]
    }

    let answerMajorList = { "majorList": ["기린학과", "국어국문학과", "영어영문학부", "일어일문학부", "사학과", "경제학부", "법학과", "행정학과", "국제지역학부", "중국학과", "신문방송학과", "정치외교학과", "유아교육과", "시각디자인학과", "공업디자인학과", "패션디자인학과", "경영학부", "국제통상학부", "응용수학과", "통계학과", "물리학과", "화학과", "미생물학과", "해양스포츠학과", "간호학과", "과학시스템시뮬레이션학과", "건축공학과", "건축학과", "소방공학과", "시스템경영공학부", "IT융합응용공학과", "안전공학과", "융합디스플레이공학과", "의공학과", "전기공학과", "전자공학과", "정보통신공학과", "제어계측공학과", "조선해양시스템공학과", "컴퓨터공학과", "토목공학과", "고분자공학과", "공업화학과", "금속공학과", "기계공학과", "기계설계공학과", "기계시스템공학과", "냉동공조공학과", "신소재시스템공학과", "인쇄정보공학과", "재료공학과", "화학공학과", "지속가능공학부", "식품공학과", "해양바이오신소재학과", "해양생산시스템관리학부", "해양수산경영학과", "수해양산업교육과", "자원생물학과", "식품영양학과", "생물공학과", "수산생명의학과", "환경공학과", "해양공학과", "해양학과", "지구환경과학과", "환경대기과학과", "에너지자원공학과", "공간정보시스템공학과", "생태공학과", "데이터정보과학부(빅데이터융합전공)", "데이터정보과학부(통계·데이터사이언스전공)", "미디어커뮤니케이션학부(언론정보전공)", "미디어커뮤니케이션학부(휴먼ICT융합전공)", "스마트헬스케어학부(의공학전공)", "스마트헬스케어학부(해양스포츠전공)", "스마트헬스케어학부(휴먼바이오융합전공)", "전자정보통신공학부(전자공학전공)", "전자정보통신공학부(정보통신공학전공)", "조형학부(건축학전공)", "조형학부(공업디자인전공)", "조형학부(시각디자인전공)", "컴퓨터공학부(소프트웨어·인공지능전공)", "컴퓨터공학부(컴퓨터공학전공)", "평생교육·상담학과", "기계조선융합공학과", "전기전자소프트웨어공학과", "공공안전경찰학과"] }

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

    const [chatbot, setChatbot] = useState(true);

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
        }
        window.scrollTo(0, 0);
    }

    function showQuarter(selectedQuarter) {
        if (props.loginPosition === "student" || props.loginPosition === "president") {
            if (quarter[selectedQuarter]["status"] === "true") {
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
            } else {
                alert("현재 공개된 장부가 아닙니다 :)")
            }
        } else {
            setCurrentQuarter(selectedQuarter);
            defineColor(selectedQuarter);
        }
    }

    function pksclSubmitButton() {
        alert("API..")
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
            setColorProperty("#db8f8e", "#efbebc", "#f5dede", "#fff5ed", "#fbf6f6");
        } else if (quarter === "quarter2") {
            setColorProperty("#649d67", "#cedbcf", "#cedbcf", "#dee7df", "#f6f7f6");
        } else if (quarter === "quarter3") {
            setColorProperty("#c18356", "#efdccd", "#e9d8cd", "#fff5ed", "#fff5ee");
        } else if (quarter === "quarter4") {
            setColorProperty("#6b8396", "#d0dbe5", "#d0dbe5", "#e6f1fb", "#f5faff");
        }
    }

    function logout() {
        axios.post(debugAPIURL + '/logout')
            .then((payload) => {
                history.push('/');
            }).catch((error) => {
                console.log("error: " + error.response.status);
                // 빼기
                history.push('/');
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
                let findMajorIndex = majorList.indexOf(ledgerMajor) + 1
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
        axios.get(debugAPIURL + `/ledger/admin?${findMajorIndex}`)
            .then((payload) => {
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarter({ ...payload.data["quarter"] });
                reset(props.todayQuarter);
                showQuarter(props.todayQuarter);
                setChatbot(false);
            })
            .catch((error) => {
                if (major === undefined) {
                    alert(`컴퓨터공학과 장부를 불러올 수 없습니다.`);
                } else {
                    alert(`${major} 장부를 불러올 수 없습니다.`);
                }
                //지우기
                setStudentPresident({ ...answer["studentPresident"] });
                setQuarter({ ...answer["quarter"] });
                reset(props.todayQuarter);
                showQuarter(props.todayQuarter);
            })

    }

    function adminGetDate(findMajorIndex) {
        axios.get(debugAPIURL + `/ledger-date?${findMajorIndex}`)
            .then((payload) => {
                setQuarterDate({ ...payload.data });
                showQuarter(props.todayQuarter);
            })
            .catch((error) => {
                if (major === undefined) {
                    alert(`컴퓨터공학과의 장부 open, close 날짜를 불러올 수 없습니다.`);
                } else {
                    alert(`${major}의 장부 open, close 날짜를 불러올 수 없습니다.`);
                }
                setQuarterDate({ ...answerDate });
                showQuarter(props.todayQuarter);
            })
    }

    function getExPKSCL() {
        axios.get(debugAPIURL + '/0')
            .then((payload) => {
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarter({ ...payload.data["quarter"] });
                // reset(props.todayQuarter);
                // defineColor(props.todayQuarter);
            })
            .catch((error) => {
                alert("임시 장부를 불러올 수 없습니다.");
            })
    }

    useEffect(() => {
        if (props.loginPosition === "admin") {
            let ledgerMajor;
            axios.get(debugAPIURL + '/major-list')
                .then((payload) => {
                    setMajorList([...payload.data["majorList"]]);
                    if (major === undefined) {
                        let ledgerMajorList = [...payload.data["majorList"]];
                        ledgerMajor = (ledgerMajorList.indexOf("컴퓨터공학과") + 1);
                        getAdminLedger(ledgerMajor);
                        adminGetDate(ledgerMajor);
                        defineColor(props.todayQuarter);
                    } else {
                        getAdminLedger(major);
                        adminGetDate(major);
                        defineColor(props.todayQuarter);
                    }
                    setChatbot(false);
                })
                .catch((error) => {
                    alert("장부를 불러올 수 없습니다.");
                    getExPKSCL();
                    //지우기
                    let ledgerMajorList = [...answerMajorList["majorList"]];
                    setMajorList(ledgerMajorList);
                    if (major === undefined) {
                        ledgerMajor = (ledgerMajorList.indexOf("컴퓨터공학과") + 1);
                        getAdminLedger(ledgerMajor);
                        adminGetDate(ledgerMajor);
                        defineColor(props.todayQuarter);
                    } else {
                        getAdminLedger(major);
                        adminGetDate(major);
                        defineColor(props.todayQuarter);
                    }
                })

        } else if (props.loginPosition === "president") {
            axios.get(debugAPIURL + '/ledger')
                .then((payload) => {
                    setStudentPresident({ ...payload.data["studentPresident"] });
                    setQuarter({ ...payload.data["quarter"] });
                    // reset(props.todayQuarter);
                    // defineColor(props.todayQuarter);
                    setChatbot(false);
                })
                .catch((error) => {
                    alert("학과 장부를 불러올 수 없습니다.");

                    axios.get('/status')
                        .then((payload) => {
                            if (payload["status"] === "refusal") {
                                alert("사용자(학생회장)는 현재 거절 상태입니다. PKSCL 챗봇을 통해 회장 신청을 다시 진행해 주십시오.");
                                if (window.confirm('챗봇으로 이동하시겠습니까?')) window.location("http://pf.kakao.com/_hxnlXb")
                            }
                            else if (payload["status"] === "waiting") {
                                alert("사용자(학생회장)는 현재 대기 상태입니다. PKSCL 챗봇을 통해 회장 인증을 해주세요 :)");
                                if (window.confirm('챗봇으로 이동하시겠습니까?')) window.location("http://pf.kakao.com/_hxnlXb")
                            }
                            else if (payload["status"] === "approval") {
                                alert("사용자(학생회장)는 현재 승인 상태입니다. PKSCL 챗봇으로 문제를 문의해주세요 :)");
                                if (window.confirm('챗봇으로 이동하시겠습니까?')) window.location("http://pf.kakao.com/_hxnlXb")
                            }
                        })
                        .catch((error) => {
                            alert("학생회장의 승인, 거절, 대기 상태를 확인할 수 없습니다. ")
                        })
                    getExPKSCL();
                    //뒤에 삭제하기
                    setStudentPresident({ ...answer["studentPresident"] });
                    setQuarter({ ...answer["quarter"] });
                    // reset(props.todayQuarter);
                    // defineColor(props.todayQuarter);
                })

            reset(props.todayQuarter);
            defineColor(props.todayQuarter);
        } else if (props.loginPosition === "student") {
            axios.get(debugAPIURL + '/ledger')
                .then((payload) => {
                    setStudentPresident({ ...payload.data["studentPresident"] });
                    setQuarter({ ...payload.data["quarter"] });
                    // reset(props.todayQuarter);
                    // defineColor(props.todayQuarter);
                    setChatbot(false);
                })
                .catch((error) => {
                    alert("학과 장부를 불러올 수 없습니다.");

                    axios.get('/status')
                        .then((payload) => {
                            if (payload["status"] === "refusal") {
                                alert("사용자(학생)는 현재 거절 상태입니다. 프로필 편집 기능을 통해 본인 정보가 올바르게 기입되었는지 우선 확인하고, 바르게 입력되었을 경우엔 신청하신 학과의 학생회장에게 문의해 주세요 :)");
                            }
                            else if (payload["status"] === "waiting") alert("사용자(학생)는 현재 대기 상태입니다. 프로필 편집 기능을 통해 본인 정보가 올바르게 기입되었는지 우선 확인하고, 바르게 입력되었을 경우엔 신청하신 학과의 학생회장에게 문의해 주세요 :)");
                            else if (payload["status"] === "approval") {
                                alert("사용자(학생)는 현재 승인 상태입니다. PKSCL 챗봇으로 문제를 문의해주세요 :)");
                                if (window.confirm('챗봇으로 이동하시겠습니까?')) window.location("http://pf.kakao.com/_hxnlXb")
                            }
                        })
                        .catch((error) => {
                            alert("학생의 승인, 거절, 대기 상태를 확인할 수 없습니다. ")
                        })
                    getExPKSCL();
                    //뒤에 삭제하기
                    setStudentPresident({ ...answer["studentPresident"] });
                    setQuarter({ ...answer["quarter"] });
                    // reset(props.todayQuarter);
                    // defineColor(props.todayQuarter);
                })

            reset(props.todayQuarter);
            defineColor(props.todayQuarter);
        }
    }, []);


    useEffect(() => {
        // // console.log(document.getElementById("leftPanel")[0].style.position);
        // if (editProfileState) {
        //     document.getElementsByClassName("leftPanel")[0].setProperty("position", "none");
        // } else {

        // }
    }, [editProfileState])


    useEffect(() => {
        if (quarter !== undefined) {
            reset(currentQuarter);
        }

    }, [currentQuarter])

    useEffect(() => {
        if (quarter !== undefined)
            reset(props.todayQuarter);

    }, [quarter])


    return (
        <div className="MainPageContainer">
            {
                editProfileState
                    ?
                    // <EditProfile loginPosition={props.loginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                    <EditProfile editProfileState={editProfileState} loginPosition={"student"} setEditProfileState={setEditProfileState}></EditProfile>
                    : null
            }
            {
                quarter === undefined
                    ? null
                    : (<>
                        <div className="leftPanel" id='leftPanel'>
                            <div className="majorCard">
                                <div className="presidentCard">
                                    <h2>{studentPresident["major"]}</h2>
                                    <p> 온라인 장부 입니다. </p>
                                    <img src={studentPresident["majorLogo"]} alt="majorLogo" height={"150"} width={"10"} />
                                    <h3>{studentPresident["name"]}</h3>
                                    <p>{studentPresident["phoneNumber"]}</p>
                                    <p>{studentPresident["email"]}</p>
                                </div>
                                <div className="cogExplanation">
                                    안녕하세요 {studentPresident["major"]} 회장 {studentPresident["name"]}입니다.
                                    PKCOG 온라인 장부를 통해 학과 장부를 분기별로 확인하세요 :)
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
                            {
                                props.loginPosition === "student" || props.loginPosition === "president"
                                    ? null
                                    : (<div className="managementPageBar">
                                        <i className="fas fa-chevron-right" onClick={() => { defineColor(props.todayQuarter); history.push('/manage') }}></i>
                                    </div>)
                            }
                        </div>

                        <div className="rightPanel">

                            <div className="nav">
                                <div className="buttons">
                                    {
                                        quarterDate !== undefined
                                            ? (props.loginPosition === "admin"
                                                ? (<>
                                                    <div className="dateInput">{quarterDate[currentQuarter][0]}~{quarterDate[currentQuarter][1]}</div>
                                                    {adminButton()}</>)
                                                : null)
                                            : null
                                    }
                                    {
                                        props.loginPosition === "president"
                                            ? (<><div style={{ color: "red" }}>현재 {studentPresident["major"]} 학생들에게 공개된 장부 입니다. </div>
                                                <button className='submitButton' style={{ width: "130px" }} type='button' onClick={() => { history.push('/edit-main') }}>장부 수정 페이지</button>
                                            </>)
                                            : (<><button className='submitButton' type='button' onClick={() => { setEditProfileState(true); }}>프로필 편집</button>
                                                <button className='submitButton' type='button' onClick={() => { logout(); }}>로그아웃</button></>)
                                    }

                                </div>
                            </div>
                            {
                                props.loginPosition === "admin" || quarter[currentQuarter]["status"] === "true"
                                    ? (<>
                                        <div className="quarterData">
                                            <h2 className="quarterTotalAmount">
                                                {currentQuarter[currentQuarter.length - 1]}분기 총 금액 : {quarterAmount}원
                                            </h2>
                                            {
                                                quarter[currentQuarter]["eventList"] === undefined
                                                    ? <div>입력된 행사가 없습니다.</div>
                                                    : (quarter[currentQuarter]["eventList"].map((event, i) => {
                                                        return (
                                                            <div style={{display:"flex",alignItems: "flex-end"}}>
                                                            <div className="eventCard" >
                                                                <div className="cardContent">
                                                                    <div className="eventSource">
                                                                        <div>
                                                                            <h4 >{event["eventTitle"]}</h4>  
                                                                            <div style={{color:"var(--color-quarter)"}}>행사 총 금액 : {eventAmount[i]}원</div>
                                                                            
                                                                            <div>{event["eventContext"]}  </div>
                                                                        </div>
                                                                        <div className="eventButtons">
                                                                            {
                                                                                event.receiptList.length <= 1
                                                                                    ? null
                                                                                    : (
                                                                                        showAllReceiptButton[i] === false
                                                                                            ? (
                                                                                                <button style={{width: "50px"}} onClick={() => {
                                                                                                    let array = [...showAllReceiptButton];
                                                                                                    array[i] = !showAllReceiptButton[i];
                                                                                                    setShowAllReceiptButton(array)
                                                                                                }}><i class="fas fa-angle-double-up"></i></button>
                                                                                            )
                                                                                            : (
                                                                                                <button style={{width: "50px"}} onClick={() => {
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
                                                                            ? (<div id="receiptContent" style={{ height: "380px", overflowY: "hidden" }}>

                                                                                <div className="receiptCard">
                                                                                    <div className="receiptResource">
                                                                                        {
                                                                                            event["receiptList"].length === 0
                                                                                                ? <div>입력된 영수증이 없습니다.</div>
                                                                                                : (<>
                                                                                                    <h5>{event["receiptList"][0]["receiptTitle"]}</h5>
                                                                                                        {
                                                                                                            event["receiptList"][0]["receiptDetailList"].length === 0
                                                                                                                ? null
                                                                                                                : (<div style={{color:"var(--color-quarter)"}}>1번째 영수증 금액 : {sumReceipt(event["receiptList"][0]["receiptDetailList"])}원</div>)
                                                                                                        }
                                                                                                  

                                                                                                    <div>{event["receiptList"][0]["receiptContext"]}</div>



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
                                                                                            <img src={event["receiptList"][0]["receiptImg"]} style={{ backgroundColor: "var(--color-leftPanel)" }} alt={event["receiptList"][0]["receiptImg"]} height={"150"} width={"100"} />
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
                                                                                                                <h5>{receipt["receiptTitle"]}</h5>
                                                                                                                    {
                                                                                                                        receipt["receiptDetailList"].length === 0
                                                                                                                            ? null
                                                                                                                            : <div style={{color:"var(--color-quarter)"}}>{j + 1}번째 영수증 금액 : {sumReceipt(receipt["receiptDetailList"])}원</div>
                                                                                                                    }
                                                                                                                <div>{receipt["receiptContext"]}</div>
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
                                                                                                        : <img src={receipt["receiptImg"]} alt={receipt["receiptImg"]} style={{ backgroundColor: "var(--color-leftPanel)" }} height={"150"} width={"100"} />
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
                                                               event.receiptList.length > 1 &&  showAllReceiptButton[i] === false
                                                               ? <div><img src={giraffe} className="image" alt="" style={{width:"70px",height:"70px"}}/><div style={{marginBottom:"50px",textAlign:"center"}}>end</div></div>
                                                               : null
                                                            }
                                                            </div>
                                                        )
                                                    })
                                                    )
                                            }
                                            
                                        </div>
                                    </>)
                                    : <div className="quarterData" style={{ color: "red" }}>
                                        {currentQuarter[currentQuarter.length - 1]}분기 장부는 학생회장이 아직 공개하지 않았습니다. <br />장부의 예시를 보고싶다면 아래 버튼을 눌러보시겡나?????
                                    </div>
                            }
                        </div>
                    </>
                    )
            }

        </div>
    )
}

export default MainPage;