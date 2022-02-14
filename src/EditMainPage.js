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

    let answer = {
        "studentPresident": { "major": "영어영문학부", "name": "한준규", "phoneNumber": "010-3340-6496", "email": "hellllo3627@pukyong.ac.kr", "majorLogo": null },
        "quarter": {
            "quarter1": {
                "status": "true",
                "eventList": [
                    {
                        "eventNumber": "12",
                        "eventTitle": "이거 글자수 어쩔까요?;ㅇ룽;니ㅜ리ㅜㅁㅇ러ㅣㅠㅣㅓㅏㄴ유ㅓㅏ류ㅣㄴ아ㅣ류ㅣㅏ뉴리ㅘㅠㅁ나ㅣ유ㅣㅏ머뉴ㅣㅏ뮤",
                        "eventContext": "UX,UI 망가지는 거 마음 아프다...lkfnljkdslkafdjlfajlhfjlhlafljdfnalnfkjlakjlbjkbdalkbkldbkbasfbjhkdabsjk OT를 잘 마무리 하였습니다.",
                        "receiptList": [{ "receiptNumber": "9", "receiptTitle": "얼른 px 뽀갠다.. 학과 sa;dslajfkjjlkdajkbfjlkabjfakblkbddb 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "ajhljdbdasfliuabijlblkajbslbdafulsuadasklndlsnaklnlsnlnfuiabflbalbsbfsbbs OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "프라이팬", "price": "2000", "amount": "5", "totalAmount": "10000" }, { "context": "돈까스", "price": "2500", "amount": "6", "totalAmount": "15000" }] }, { "receiptNumber": "10", "receiptTitle": "학과 OT2 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "대선", "price": "1500", "amount": "1", "totalAmount": "1500" }, { "context": "갈비", "price": "2500", "amount": "4", "totalAmount": "10000" }, { "context": "참이슬", "price": "3500", "amount": "1", "totalAmount": "3500" }, { "context": "초콜렛", "price": "5000", "amount": "2", "totalAmount": "10000" }, { "context": "연필", "price": "2000", "amount": "2", "totalAmount": "4000" }] }]
                    },{
                        "eventNumber": "54654",
                        "eventTitle": "학과 OT2",
                        "eventContext": "학과 OT를 잘 마무리 하였습니다.",
                        "receiptList": [{ "receiptNumber": "9", "receiptTitle": "학과 OT2 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "프라이팬", "price": "2000", "amount": "5", "totalAmount": "10000" }, { "context": "돈까스", "price": "2500", "amount": "6", "totalAmount": "15000" }] }, { "receiptNumber": "10", "receiptTitle": "학과 OT2 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "대선", "price": "1500", "amount": "1", "totalAmount": "1500" }, { "context": "갈비", "price": "2500", "amount": "4", "totalAmount": "10000" }, { "context": "참이슬", "price": "3500", "amount": "1", "totalAmount": "3500" }, { "context": "초콜렛", "price": "5000", "amount": "2", "totalAmount": "10000" }, { "context": "연필", "price": "2000", "amount": "2", "totalAmount": "4000" }] }]
                    },
                    {
                        "eventNumber": "3342",
                        "eventTitle": "학과 OT2",
                        "eventContext": "학과 OT를 잘 마무리 하였습니다.",
                        "receiptList": [{ "receiptNumber": "9", "receiptTitle": "학과 OT2 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "프라이팬", "price": "2000", "amount": "5", "totalAmount": "10000" }, { "context": "돈까스", "price": "2500", "amount": "6", "totalAmount": "15000" }] }, { "receiptNumber": "10", "receiptTitle": "학과 OT2 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "대선", "price": "1500", "amount": "1", "totalAmount": "1500" }, { "context": "갈비", "price": "2500", "amount": "4", "totalAmount": "10000" }, { "context": "참이슬", "price": "3500", "amount": "1", "totalAmount": "3500" }, { "context": "초콜렛", "price": "5000", "amount": "2", "totalAmount": "10000" }, { "context": "연필", "price": "2000", "amount": "2", "totalAmount": "4000" }] }]
                    },
                    {
                        "eventNumber": "2131",
                        "eventTitle": "학과 OT2",
                        "eventContext": "학과 OT를 잘 마무리 하였습니다.",
                        "receiptList": [{ "receiptNumber": "9", "receiptTitle": "학과 OT2 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "프라이팬", "price": "2000", "amount": "5", "totalAmount": "10000" }, { "context": "돈까스", "price": "2500", "amount": "6", "totalAmount": "15000" }] }, { "receiptNumber": "10", "receiptTitle": "학과 OT2 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "대선", "price": "1500", "amount": "1", "totalAmount": "1500" }, { "context": "갈비", "price": "2500", "amount": "4", "totalAmount": "10000" }, { "context": "참이슬", "price": "3500", "amount": "1", "totalAmount": "3500" }, { "context": "초콜렛", "price": "5000", "amount": "2", "totalAmount": "10000" }, { "context": "연필", "price": "2000", "amount": "2", "totalAmount": "4000" }] }]
                    },
                    {
                        "eventNumber": "21231",
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

    const [logoImgPath,setLogoImgPath] = useState();

    const [wrongApproach,setWrongApproach] = useState(false);
    const [wrongApproachContext,setWrongApproachContext] = useState();
    const [editProfileButton, setEditProfileButton] = useState(true);

    const [userLoginPosition, setUserLoginPosition] = useState();

    const [tempQuarter, setTempQuarter] = useState(false);
    const [showCurrentQuerter,setShowCurrentQuerter] = useState();

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
                setLogoImgPath(`./img/${props.todayQuarter}.png`);
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
                        setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        break;
                    default :
                        setWrongApproachContext("서버 오류가 발생했습니다.");
                        setWrongApproach(true)
                        setEditProfileButton(false)
                    break;
                }
                //지우기
                        setStudentPresident({ ...answer["studentPresident"] });
                        setQuarter({ ...answer["quarter"] });
                        for (let i = 0; i < answer["quarter"][currentQuarter]["eventList"].length; i++) {
                            resetArray.push(false)
                        }
                        GetDate();
                        setShowAllReceiptButton(resetArray);
                        setList([...answer["quarter"][currentQuarter]["eventList"]]);
                        setLogoImgPath(`./img/${currentQuarter}.png`);
                        setWrongApproach(false)
                        setEditProfileButton(false)
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

                let tempDate= { ...payload.data }
                let quarter = ["quarter1","quarter2","quarter3","quarter4"]
                 quarter.map((quarterName)=>{
                    tempDate[quarterName].map((date,i)=>{
                    if(date.substr(0,4)=== "1111"){
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
                            setQuarterDate({ ...answerDate });
                            let quarter = ["quarter1","quarter2","quarter3","quarter4"]
                                quarter.map((quarterName)=>{
                                    answerDate[quarterName].map((date,i)=>{
                                    if(date.substr(0,4)=== "1111"){
                                    let tempAnswerDate = { ...answerDate };
                                    tempAnswerDate[quarterName][i] = "";
                                    setQuarterDate({ ...tempAnswerDate });
                                }
                            })
                            })
                            setWrongApproach(false)
                            setEditProfileButton(false)
                //
            })
    }

    function eventDeleteButton(eventNumber, index) {
        if (window.confirm("삭제하면 되돌릴 수 없습니다.")) {
            var tempQuarter = { ...quarter };
            tempQuarter[currentQuarter]["eventList"].splice(index, 1);

            const payload = { "eventNumber": eventNumber };
            axios.delete(debugAPIURL + '/event?event-number=' + eventNumber)
                .then((payload) => {
                    switch (payload.status) {
                        case 200:
                            alert("행사 장부가 삭제되었습니다.");
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
        quarterDate[currentQuarter].map(()=>{
        if(quarterDate[currentQuarter][0] === ""){
            open = "1111-11-11";
        }
        if(quarterDate[currentQuarter][1] === ""){
            close = "1111-11-11";
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

    function getUserStatus(){
        alert("getUserStatus")
        reset(props.todayQuarter);
        defineColor(props.todayQuarter);
        axios.get('/position')
            .then((payload) => {
                setUserLoginPosition(payload.data["position"])
                if(payload.data["position"] === "student"||payload.data["position"] === "admin"){
                        setWrongApproachContext("잘못된 접근입니다.");
                        setWrongApproach(true) 
                        setEditProfileButton(false);
                }
                else if(payload.data["position"] === "president"){
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
                                    }else if (payload.data["status"] === "approval") {
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
                setWrongApproachContext(`사용자의 Position을 알 수 없습니다.`);
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
            })
            .catch((error) => {
                setWrongApproachContext(`임시 장부를 불러올 수 없습니다.`);
                setWrongApproach(true)
                setEditProfileButton(false);
            })
            
    }

    useEffect(() => {
        //여기 한 줄 지우고
        getUserStatus();
        //여기 한 줄 주석 해제 하면 local 가능
        // getLedger(); GetDate();
        setLogoImgPath(`./img/${props.todayQuarter}.png`);
    }, []);

    useEffect(() => {
        //여기 한 줄 지우면 local 가능
        if( editEventState === false){
            alert("leger 요청.. 보낸다 !!")
            getUserStatus();
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
        <>{wrongApproach===true
            ?(<>
            {
                        editProfileState
                            ?
                            <EditProfile loginPosition={userLoginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                            : null
                    }
                <div className="nav" style={{justifyContent: "space-between"}}>
                                <div className="logoNav">
                                    <img src={`./img/${props.todayQuarter}.png`} alt="logo" style={{marginLeft:"30px"}} width={"40px"} height={"40px"} />
                                    <div style={{marginLeft:"20px",fontSize:"25px"}}>PKSCL</div>
                                </div>
                                                {
                                                    editProfileButton=== true
                                                    ?( <div style={{ display: "flex",alignItems: "center"}}>
                                                        <i class="fas fa-user" onClick={() => { setEditProfileState(true); }} style={{fontSize:"20px", marginRight:"10px"}}></i>
                                                        <i class="fas fa-headset" style={{fontSize:"20px", marginRight:"10px"}} onClick={()=>{window.open("http://pf.kakao.com/_hxnlXb")}}></i>
                                                    <button className='submitButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                                </div>)
                                                    :( <div style={{ display: "flex" }}>
                                                    <button className='submitButton' type='button' onClick={() => {history.push('/');}}>로그인</button>
                                                </div>)
                                                }
                                        </div>
            <div className="MainPageContainer" 
            style={{display:"flex",justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                {wrongApproachContext}<br />
            장부의 예시를 보고싶다면 기린을 눌러주세요 :)
            <img onClick={()=>{getExPKSCL()}} src={giraffe} className="giraffe" alt="기린" 
            style={{ width: "70px", height: "70px",marginLeft:"20px" }} />
            <a href="http://pf.kakao.com/_hxnlXb" target="_blank" rel="noreferrer" title="챗봇으로 연결됩니다." style={{color:"black"}}>PKSCL 문의하기</a>
            </div></>)
            :(
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
                                    <img src={`./img/${props.todayQuarter}.png`} alt="logo" style={{marginLeft:"30px"}} width={"40px"} height={"40px"} />
                                    <div style={{marginLeft:"20px",fontSize:"25px"}}>PKSCL</div>
                                </div>
                                                <div style={{ display: "flex" }}>
                                                    <button className='submitButton' type='button' onClick={() => { defineColor(props.todayQuarter); history.push('/manage') }}>학생 관리</button>
                                                    <button className='submitButton' type='button' onClick={() => { history.push('/main') }}>학생 입장 장부</button>
                                                </div>
                                                {
                                                    quarterDate !== undefined
                                                        ? (
                                                            <div style={{ display: "flex", alignItems: "center" }}>
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
                                                <div style={{ display: "flex" ,alignItems: "center"}}>
                                                    <i class="fas fa-user" style={{fontSize:"20px", marginRight:"10px"}} onClick={() => { setEditProfileState(true); }}></i>
                                                    <i class="fas fa-headset" style={{fontSize:"20px", marginRight:"10px"}} onClick={()=>{window.open("http://pf.kakao.com/_hxnlXb")}}></i>
                                                    <button className='submitButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex" }}>
                                            <div className="quarterData">
                                                <h2 className="quarterTotalAmount">
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
                                                                                    <h4 style={{width:"400px"}}>{event["eventTitle"]}
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
                                                                                                                                    {j+1}번째 영수증 금액 : {sumReceipt(receipt["receiptDetailList"])}원
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
                                </>
                                )
                        }
            
        </div >)}</>
    )
}

export default EditMainPage;