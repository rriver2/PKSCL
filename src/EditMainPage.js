/* eslint-disable */

import majorlogo from './img/majorlogo.png';
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



function MainPage(props) {
    const [list, setList] = useState([]);

    let debugAPIURL = "";
    // debugAPIURL = "https://cors-jhs.herokuapp.com/https://pkscl.kro.kr";

    const history = useHistory();
    const el = useRef();

    // let answer = {
    //     "studentPresident": {
    //         "major": "국어국문학과",
    //         "name": "홍길동",
    //         "phoneNumber": "01012345678",
    //         "email": "PKSCL@pukyon.ac.kr"
    //     },
    //     "quarter": {
    //         "quarter1": {
    //             "status": "true",
    //             "eventList": [
    //                 {
    //                     "eventNumber": "1",
    //                     "eventTitle": "임시데이터 입니다.",
    //                     "eventContext": "데이타 O",
    //                     "receiptList": [

    //                     ]
    //                 },
    //                 {
    //                     "eventNumber": "2",
    //                     "eventTitle": "학과 OT",
    //                     "eventContext": "학과 OT를 진행하였습니다.",
    //                     "receiptList": [
    //                         {
    //                             "receiptTitle": "학과 OT 영수증1",
    //                             "receiptImg": { name: "./static/receiptImg/test2.png" },
    //                             "receiptContext": "학과 OT 영수증입니다.",
    //                             "receiptDetailList": [
    //                                 {
    //                                     "context": "돈까스",
    //                                     "price": "2000",
    //                                     "amount": "1",
    //                                     "totalAmount": "2000"
    //                                 },
    //                                 {
    //                                     "context": "대선",
    //                                     "price": "3000",
    //                                     "amount": "2",
    //                                     "totalAmount": "6000"
    //                                 },
    //                                 {
    //                                     "context": "참이슬",
    //                                     "price": "1000",
    //                                     "amount": "1",
    //                                     "totalAmount": "1000"
    //                                 },
    //                                 {
    //                                     "context": "초콜렛",
    //                                     "price": "1000",
    //                                     "amount": "5",
    //                                     "totalAmount": "5000"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "receiptTitle": "학과 OT 영수증2",
    //                             "receiptImg": { name: "./static/receiptImg/test2.png" },
    //                             "receiptContext": "학과 OT 영수증입니다.",
    //                             "receiptDetailList": [
    //                                 {
    //                                     "context": "갈비",
    //                                     "price": "2000",
    //                                     "amount": "2",
    //                                     "totalAmount": "4000"
    //                                 },
    //                                 {
    //                                     "context": "과자",
    //                                     "price": "3000",
    //                                     "amount": "1",
    //                                     "totalAmount": "3000"
    //                                 },
    //                                 {
    //                                     "context": "지우개",
    //                                     "price": "1000",
    //                                     "amount": "3",
    //                                     "totalAmount": "3000"
    //                                 },
    //                                 {
    //                                     "context": "연필",
    //                                     "price": "1000",
    //                                     "amount": "5",
    //                                     "totalAmount": "5000"

    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "receiptTitle": "학과 OT 영수증3",
    //                             "receiptImg": { name: "./static/receiptImg/test2.png" },
    //                             "receiptContext": "학과 OT 영수증입니다.",
    //                             "receiptDetailList": [
    //                                 {
    //                                     "context": "컵",
    //                                     "price": "2000",
    //                                     "amount": "1",
    //                                     "totalAmount": "2000"
    //                                 },
    //                                 {
    //                                     "context": "휴지",
    //                                     "price": "5000",
    //                                     "amount": "2",
    //                                     "totalAmount": "10000"
    //                                 },
    //                                 {
    //                                     "context": "책",
    //                                     "price": "6000",
    //                                     "amount": "2",
    //                                     "totalAmount": "12000"
    //                                 },
    //                                 {
    //                                     "context": "바구니",
    //                                     "price": "7000",
    //                                     "amount": "3",
    //                                     "totalAmount": "21000"
    //                                 },
    //                                 {
    //                                     "context": "이어폰",
    //                                     "price": "8000",
    //                                     "amount": "4",
    //                                     "totalAmount": "32000"
    //                                 },
    //                                 {
    //                                     "context": "콜라",
    //                                     "price": "5000",
    //                                     "amount": "5",
    //                                     "totalAmount": "25000",
    //                                 },
    //                                 {
    //                                     "context": "물",
    //                                     "price": "4000",
    //                                     "amount": "7",
    //                                     "totalAmount": "28000"
    //                                 },
    //                                 {
    //                                     "context": "프라이팬",
    //                                     "price": "3000",
    //                                     "amount": "6",
    //                                     "totalAmount": "36000"
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "eventNumber": "3",
    //                     "eventTitle": "학과 OT2",
    //                     "eventContext": "학과 OT2를 진행하였습니다.",
    //                     "receiptList": [
    //                         {
    //                             "receiptTitle": "학과 OT2 영수증1",
    //                             "receiptImg": { name: "./static/receiptImg/test2.png" },
    //                             "receiptContext": "학과 OT2 영수증입니다.",
    //                             "receiptDetailList": [
    //                                 {
    //                                     "context": "돈까스",
    //                                     "price": "3000",
    //                                     "amount": "1",
    //                                     "totalAmount": "3000"
    //                                 },
    //                                 {
    //                                     "context": "대선",
    //                                     "price": "2000",
    //                                     "amount": "2",
    //                                     "totalAmount": "4000"
    //                                 },
    //                                 {
    //                                     "context": "갈비",
    //                                     "price": "4000",
    //                                     "amount": "5",
    //                                     "totalAmount": "20000"
    //                                 },
    //                                 {
    //                                     "context": "참이슬",
    //                                     "price": "5000",
    //                                     "amount": "6",
    //                                     "totalAmount": "30000"
    //                                 },
    //                                 {
    //                                     "context": "초콜렛",
    //                                     "price": "1000",
    //                                     "amount": "7",
    //                                     "totalAmount": "7000"

    //                                 },
    //                                 {
    //                                     "context": "지우개",
    //                                     "price": "2000",
    //                                     "amount": "8",
    //                                     "totalAmount": "16000"
    //                                 },
    //                                 {
    //                                     "context": "연필",
    //                                     "price": "3000",
    //                                     "amount": "9",
    //                                     "totalAmount": "27000"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "receiptTitle": "학과 OT2 영수증2",
    //                             "receiptImg": { name: "./static/receiptImg/test2.png" },
    //                             "receiptContext": "학과 OT2 영수증입니다.",
    //                             "receiptDetailList": [
    //                                 {
    //                                     "context": "갈비",
    //                                     "price": "4000",
    //                                     "amount": "1",
    //                                     "totalAmount": "4000"

    //                                 },
    //                                 {
    //                                     "context": "돈까스",
    //                                     "price": "5000",
    //                                     "amount": "2",
    //                                     "totalAmount": "10000"
    //                                 },
    //                                 {
    //                                     "context": "휴지",
    //                                     "price": "2000",
    //                                     "amount": "3",
    //                                     "totalAmount": "6000"
    //                                 },
    //                                 {
    //                                     "context": "컵",
    //                                     "price": "4000",
    //                                     "amount": "2",
    //                                     "totalAmount": "8000"
    //                                 },
    //                                 {
    //                                     "context": "콜라",
    //                                     "price": "1000",
    //                                     "amount": "1",
    //                                     "totalAmount": "1000"
    //                                 },
    //                                 {
    //                                     "context": "바구니",
    //                                     "price": "1000",
    //                                     "amount": "2",
    //                                     "totalAmount": "2000"
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "eventNumber": "4",
    //                     "eventTitle": "새내기배움터",
    //                     "eventContext": "새내기배움터를 진행하였습니다.",
    //                     "receiptList": [
    //                         {
    //                             "receiptTitle": "새내기배움터 영수증 1",
    //                             "receiptImg": { name: "./static/receiptImg/test2.png" },
    //                             "receiptContext": "새내기배움터 OT 영수증입니다.",
    //                             "receiptDetailList": [
    //                                 {
    //                                     "context": "이어폰",
    //                                     "price": "5000",
    //                                     "amount": "1",
    //                                     "totalAmount": "5000"
    //                                 },
    //                                 {
    //                                     "context": "콜라",
    //                                     "price": "4000",
    //                                     "amount": "2",
    //                                     "totalAmount": "8000"
    //                                 },
    //                                 {
    //                                     "context": "물",
    //                                     "price": "3000",
    //                                     "amount": "1",
    //                                     "totalAmount": "3000"
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "eventNumber": "5",
    //                     "eventTitle": "벚꽃축제1",
    //                     "eventContext": "벚꽃축제1를 진행하였습니다.",
    //                     "receiptList": [

    //                     ]
    //                 }
    //             ]
    //         },
    //         "quarter2": {
    //             "status": "true",
    //             "eventList": [
    //                 {
    //                     "eventNumber": "6",
    //                     "eventTitle": "공개일 O",
    //                     "eventContext": "데이타 O",
    //                     "receiptList": [

    //                     ]
    //                 },
    //                 {
    //                     "eventNumber": "7",
    //                     "eventTitle": "우리학과 OT",
    //                     "eventContext": "OT를 완료하였습니다.",
    //                     "receiptList": [

    //                     ]
    //                 },
    //                 {
    //                     "eventNumber": "8",
    //                     "eventTitle": "MT 영수증",
    //                     "eventContext": "MT를 진행하였습니다. 큰 사건사고 없이 잘 마무리하였습니다 !",
    //                     "receiptList": [

    //                     ]
    //                 },
    //                 {
    //                     "eventNumber": "9",
    //                     "eventTitle": "MT 영수증2",
    //                     "eventContext": "MT를 진행하였습니다. 큰 사건사고 없이 잘 마무리하였습니다 !",
    //                     "receiptList": [

    //                     ]
    //                 }
    //             ]
    //         },
    //         "quarter3": {
    //             "status": "true"
    //         },
    //         "quarter4": {
    //             "status": "false"
    //         }
    //     }
    // }

    let answerDate = {
        "quarter1": ["2022-01-01", "2022-01-02"],
        "quarter2": ["2022-01-03", "2022-01-04"],
        "quarter3": ["2022-01-05", "2022-01-06"],
        "quarter4": ["2022-01-07", "2022-01-08"]
    }

    const [totalAmount, setTotalAmount] = useState([])

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

    const [fixEventButton, setFixEventButton] = useState([]);

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
        if (quarter !== undefined) {
            CalculateCurrentQuarterReceiptSumList(quarter[quarterData]["eventList"]);
            setList(quarter[quarterData]["eventList"]);
            // resetShowAllReceiptButton();
        }
        else {
            console.log("quarter === undefined");
        }
        // window.scrollTo(0, 0);
    }

    function showQuarter(selectedQuarter) {
        if (props.loginPosition === "student") {
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

    function setColorProperty(colorQuarter, colorQuarterCircle, colorLeftPanel, colorCard) {
        document.documentElement.style.setProperty("--color-quarter", colorQuarter);
        document.documentElement.style.setProperty("--color-quarterCircle", colorQuarterCircle);
        document.documentElement.style.setProperty("--color-leftPanel", colorLeftPanel);
        document.documentElement.style.setProperty("--color-card", colorCard);
    }

    function defineColor(quarter) {
        if (quarter === "quarter1") {
            setColorProperty("#db8f8e", "#efbebc", "#f5dede", "#fff5ed");
        } else if (quarter === "quarter2") {
            setColorProperty("#649d67", "#cedbcf", "#cedbcf", "#dee7df");
        } else if (quarter === "quarter3") {
            setColorProperty("#c18356", "#efdccd", "#e9d8cd", "#fff5ed");
        } else if (quarter === "quarter4") {
            setColorProperty("#6b8396", "#d0dbe5", "#d0dbe5", "#e6f1fb");
        }
    }

    function logout() {
        axios.post('/logout')
            .then((payload) => {
                history.push('/');
            }).catch((error) => {
                console.log("error: " + error.response.status);
            })
    }

    function GetDate() {
        axios.get("/ledger-date")
            .then((payload) => {
                setQuarterDate({ ...payload.data });
            })
            .catch((error) => {
                alert("분기별 장부 open, close 날짜를 불러올 수 없습니다.");
                //지우기
                setQuarterDate({ ...answerDate });
            })
    }

    function eventDelectButton(eventNumber, index) {
        let answer = window.confirm("삭제하면 되돌릴 수 없습니다.");
        if (answer) {
            // alert("삭제 API추가해야함" + eventNumber);
            var tempQuarter = { ...quarter };
            tempQuarter[currentQuarter]["eventList"].splice(index, 1);


            const payload = { "eventNumber": eventNumber };
            console.log(payload);
            // `/ledger/admin?${findMajorIndex}`)
            axios.delete(debugAPIURL + '/ledger/?eventNumber=' + eventNumber)
                .then((payload) => {
                    switch (payload.status) {
                        case 200:
                            setQuarter(tempQuarter);
                            alert("행사 장부가 삭제되었습니다.");
                            break;
                    }
                }).catch((error) => {
                    alert("장부를 삭제하는데 실패했습니다.");
                })
        } else {
            alert("삭제가 취소되었습니다.")
        }
    }

    function eventFixButton(event) {
        var payload = new FormData();

        payload.append("event", event)
        payload.append("quarter", currentQuarter);

        console.log(payload);

        axios.put(debugAPIURL + "/ledger", payload,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        )
            .then((payload) => {
                switch (payload.status) {
                    case 200:
                        alert("장부를 수정하였습니다.");
                        break;
                    default:
                        alert("success code: " + payload.status);
                        break;
                }
            })
            .catch((error) => {
                alert("장부 수정을 처리하지 못했습니다. code: " + error.response.status)
            });
        console.log(quarter);
    }

    function eventAddButton(currentQuarter) {
        console.log(quarter);
        console.log(currentQuarter);
        const temp = { ...quarter };
        temp[currentQuarter]["eventList"].push({
            eventContext: "행사내용",
            eventNumber: "eventNumber",
            eventTitle: "행사 이름",
            receiptList: [
                {
                    "receiptTitle": "영수증 제목을 입력해주세요",
                    "receiptImg": { name: "" },
                    "receiptContext": "영수증 내용을 입력해주세요",
                    "receiptDetailList": [
                        {
                            "context": "",
                            "price": "",
                            "amount": "",
                            "totalAmount": ""

                        },
                    ]
                },
            ],
        });

        setQuarter(temp);
    }

    function receiptAddButton(i) {
        const temp = { ...quarter };
        temp[currentQuarter]["eventList"][i]["receiptList"].push({

            "receiptTitle": "영수증 제목을 입력해주세요",
            "receiptImg": { name: "" },
            "receiptContext": "영수증 내용을 입력해주세요",
            "receiptDetailList": [
                {
                    "context": "",
                    "price": "",
                    "amount": "",
                    "totalAmount": ""

                },
            ]
        })
        setQuarter(temp);
    }

    function receiptDeleteButton(i, j) {
        let answer = window.confirm("영수증을 삭제하시겠습니까?");
        if (answer) {
            const temp = { ...quarter };
            temp[currentQuarter]["eventList"][i]["receiptList"].splice(j, 1);
            setQuarter(temp);
            alert("영수증이 삭제되었습니다.");
        }

    }

    function putLedgerDate() {
        const payload = {
            quarter: currentQuarter,
            openDate: quarterDate[currentQuarter][0],
            closeDate: quarterDate[currentQuarter][1],
        }

        // console.log(payload);
        axios.put(debugAPIURL + 'ledger-date', payload)
            .then((payload) => {
                console.log("Success edit ledger-date");
            }).catch((error) => {
                alert(error.response.data["errorMessage"]);
            })
    }

    function uploadImg(img, i, j) {
        console.log("I : " + i + "J : " + j);
        const temp = { ...quarter };
        temp[currentQuarter]["eventList"][i]["receiptList"][j]["receiptImg"] = img;
        setQuarter(temp);
        console.log(quarter);
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

    function changeEventTitle(value, i) {
        var tempQuarter = { ...quarter };
        tempQuarter[currentQuarter]["eventList"][i].eventTitle = value;
        setQuarter(tempQuarter);
    }

    function changeEventContext(value, i) {
        var tempQuarter = { ...quarter };
        tempQuarter[currentQuarter]["eventList"][i].eventContext = value;
        setQuarter(tempQuarter);
    }

    function changeItem(key, value, i, j, k) {
        console.log("changeItem");
        var tempQuarter = { ...quarter };
        var item = tempQuarter[currentQuarter]["eventList"][i]["receiptList"][j]["receiptDetailList"][k];

        item[key] = value;
        item["totalAmount"] = item["price"] * item["amount"];
        setQuarter(tempQuarter);
        // var tempShowAllReceiptButton = [...showAllReceiptButton];
        // tempShowAllReceiptButton[i] = true;
        // console.log(tempShowAllReceiptButton);
        // setShowAllReceiptButton(tempShowAllReceiptButton);
    }




    useEffect(() => {
        let resetArray = [];

        axios.get(debugAPIURL + '/ledger')
            .then((payload) => {
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarter({ ...payload.data["quarter"] });

                if (payload.data["quarter"][currentQuarter]["eventList"] !== undefined) {
                    for (let i = 0; i < payload.data["quarter"][currentQuarter]["eventList"].length; i++) {
                        resetArray.push(false)
                    }
                }

                // reset(props.todayQuarter);
                // defineColor(props.todayQuarter);
            })
            .catch((error) => {
                alert("학과 장부를 불러올 수 없습니다.");
                setStudentPresident({ ...answer["studentPresident"] });
                setQuarter({ ...answer["quarter"] });
                setList(answer["quarter"][currentQuarter]["eventList"]);
                console.log(answer["quarter"][currentQuarter]["eventList"]);

                for (let i = 0; i < answer["quarter"][currentQuarter]["eventList"].length; i++) {
                    resetArray.push(false)
                }

                console.log(resetArray);
                setShowAllReceiptButton(resetArray);
                // reset(props.todayQuarter);
                // defineColor(props.todayQuarter);
            })


        reset(props.todayQuarter);
        defineColor(props.todayQuarter);
        GetDate();




    }, []);


    useEffect(() => {
        if (quarter !== undefined) {
            reset(currentQuarter);
        }

    }, [currentQuarter])

    useEffect(() => {
        if (quarter !== undefined) {
            reset(props.todayQuarter);
        }


    }, [quarter])



    return (
        <div className="EditMainPageContainer">
            {
                props.loginPosition !== "president"
                    ? <div>잘못된 접근입니다.</div>
                    : (<>{
                        editProfileState
                            ?
                            <EditProfile loginPosition={props.loginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                            // <EditProfile editProfileState={editProfileState} loginPosition={"president"} setEditProfileState={setEditProfileState}></EditProfile>
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
                                        {
                                            props.loginPosition === "student"
                                                ? null
                                                : (<div className="managementPageBar">
                                                    <i className="fas fa-chevron-right" onClick={() => { defineColor(props.todayQuarter); history.push('/manage') }}></i>
                                                </div>)
                                        }
                                    </div>
                                    {/* rightPanel */}
                                    <div className="rightPanel">
                                        <div className="nav">
                                            <div className="buttons">
                                                {/* {
                                                    console.log(quarterDate)
                                                } */}
                                                {
                                                    quarterDate !== undefined
                                                        ? (
                                                            <>{currentQuarter[currentQuarter.length - 1]}분기 장부 공개일 : <input className="dateInput" type={"date"} value={quarterDate[currentQuarter][0]}
                                                                onChange={(e) => {
                                                                    let tempDateArray = { ...quarterDate }
                                                                    tempDateArray[currentQuarter][0] = e.target.value;
                                                                    setQuarterDate(tempDateArray)
                                                                    putLedgerDate();

                                                                }}
                                                            ></input>~
                                                                <input className="dateInput" type={"date"} value={quarterDate[currentQuarter][1]}
                                                                    style={{ marginLeft: "10px" }}
                                                                    onChange={(e) => {
                                                                        let tempDateArray = { ...quarterDate }
                                                                        tempDateArray[currentQuarter][1] = e.target.value;
                                                                        setQuarterDate(tempDateArray);
                                                                        putLedgerDate();

                                                                    }}
                                                                ></input></>
                                                        )
                                                        : null
                                                }
                                                <button className='submitButton' type='button' onClick={() => { history.push('/main') }}>학생 입장 장부 확인</button>
                                                <button className='submitButton' type='button' onClick={() => { setEditProfileState(true); }}>프로필 편집</button>
                                                <button className='submitButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                                            </div>
                                        </div>

                                        {/* 장부 */}
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
                                                                <div className="eventCard" >
                                                                    <div className="cardContent">
                                                                        <div className="eventSource">

                                                                            <div>
                                                                                <div className="eventTitle">
                                                                                    <h4>


                                                                                        {
                                                                                            fixEventButton[i]
                                                                                                ?
                                                                                                <input type="text" style={{ border: "transparent", textAlign: "left" }} placeholder={event["eventTitle"]}
                                                                                                    onInput={
                                                                                                        (e) => {
                                                                                                            changeEventTitle(e.target.value, i);
                                                                                                        }}></input>
                                                                                                :
                                                                                                <>{event["eventTitle"]}</>
                                                                                        }

                                                                                    </h4>
                                                                                    <div>행사 총 금액 : {eventAmount[i]}원</div>
                                                                                </div>
                                                                                <div>
                                                                                    {
                                                                                        fixEventButton[i]
                                                                                            ?
                                                                                            <input type="text" style={{ border: "transparent", textAlign: "left" }} placeholder={event["eventContext"]}
                                                                                                onInput={
                                                                                                    (e) => {
                                                                                                        changeEventContext(e.target.value, i);
                                                                                                    }}></input>
                                                                                            :
                                                                                            <>{event["eventContext"]}</>
                                                                                    }



                                                                                </div>
                                                                            </div>


                                                                            <div className="eventButtons">
                                                                                <button onClick={() => { eventDelectButton(event["eventNumber"], i); }} style={{ marginRight: "15px" }}> 행사 삭제 </button>
                                                                                {
                                                                                    fixEventButton[i] === true
                                                                                        ? <button onClick={() => {
                                                                                            let array = [...fixEventButton];
                                                                                            array[i] = !fixEventButton[i];
                                                                                            eventFixButton(event); setFixEventButton(array)
                                                                                        }} style={{ marginRight: "15px" }}> 행사 수정 완료 </button>
                                                                                        : <button onClick={() => {
                                                                                            let array = [...fixEventButton];
                                                                                            array[i] = !fixEventButton[i];
                                                                                            setFixEventButton(array);
                                                                                        }} style={{ marginRight: "15px" }}> 행사 수정 </button>
                                                                                }
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
                                                                                                    }}>전체보기 취소</button>
                                                                                                )
                                                                                                : (
                                                                                                    <button onClick={() => {
                                                                                                        let array = [...showAllReceiptButton];
                                                                                                        array[i] = !showAllReceiptButton[i];
                                                                                                        setShowAllReceiptButton(array);
                                                                                                    }}>전체보기</button>
                                                                                                )
                                                                                        )

                                                                                }
                                                                            </div>
                                                                        </div>

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
                                                                                                            <h5>
                                                                                                                {event["receiptList"][0]["receiptTitle"]}
                                                                                                                {
                                                                                                                    fixEventButton[i]
                                                                                                                        ? <span onClick={() => {

                                                                                                                            receiptDeleteButton(i, 0);
                                                                                                                        }}><i className="far fa-trash-alt"></i></span>
                                                                                                                        : null
                                                                                                                }

                                                                                                            </h5>
                                                                                                            {
                                                                                                                event["receiptList"][0]["receiptDetailList"].length === 0
                                                                                                                    ? null
                                                                                                                    : (<div>
                                                                                                                        1번째 영수증 금액 : {sumReceipt(event["receiptList"][0]["receiptDetailList"])}원

                                                                                                                    </div>)
                                                                                                            }
                                                                                                        </div>

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
                                                                                                                    <tbody>
                                                                                                                        {event["receiptList"][0]["receiptDetailList"].map((item, k) => {
                                                                                                                            return (
                                                                                                                                <tr>
                                                                                                                                    <td>
                                                                                                                                        {
                                                                                                                                            fixEventButton[i]
                                                                                                                                                ?
                                                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center" }} placeholder={item["context"]}
                                                                                                                                                    onInput={
                                                                                                                                                        (e) => {
                                                                                                                                                            changeItem("context", e.target.value, i, 0, k);
                                                                                                                                                        }}></input>
                                                                                                                                                :
                                                                                                                                                <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["context"]}</span>
                                                                                                                                        }

                                                                                                                                    </td>

                                                                                                                                    <td>
                                                                                                                                        {
                                                                                                                                            fixEventButton[i]
                                                                                                                                                ?
                                                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center" }} placeholder={item["price"]}
                                                                                                                                                    onInput={
                                                                                                                                                        (e) => {
                                                                                                                                                            changeItem("price", e.target.value.replace(/[^0-9]/g, ''), i, 0, k);
                                                                                                                                                        }}></input>
                                                                                                                                                :
                                                                                                                                                <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["price"]}</span>
                                                                                                                                        }

                                                                                                                                    </td>

                                                                                                                                    <td>
                                                                                                                                        {
                                                                                                                                            fixEventButton[i]
                                                                                                                                                ?
                                                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center" }} placeholder={item["amount"]}
                                                                                                                                                    onInput={
                                                                                                                                                        (e) => {
                                                                                                                                                            changeItem("amount", e.target.value.replace(/[^0-9]/g, ''), i, 0, k);
                                                                                                                                                        }}></input>
                                                                                                                                                :
                                                                                                                                                <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["amount"]}</span>
                                                                                                                                        }

                                                                                                                                    </td>
                                                                                                                                    <td>{item["totalAmount"]}</td>
                                                                                                                                </tr>
                                                                                                                            )
                                                                                                                        }
                                                                                                                        )}
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                                    {fixEventButton[i]
                                                                                                                        ?
                                                                                                                        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                                                                                                            <button type='button' className='submitButton' style={{ margin: "0" }}
                                                                                                                                onClick={() => {
                                                                                                                                    var tempQuarter = { ...quarter };

                                                                                                                                    tempQuarter[currentQuarter]["eventList"][i]["receiptList"][0]["receiptDetailList"].push({
                                                                                                                                        context: "",
                                                                                                                                        price: "",
                                                                                                                                        amount: "",
                                                                                                                                        totalAmount: ""
                                                                                                                                    })
                                                                                                                                    setQuarter(tempQuarter)
                                                                                                                                }}>항목 추가
                                                                                                                            </button>
                                                                                                                        </div>
                                                                                                                        :
                                                                                                                        null
                                                                                                                    }

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
                                                                                                !fixEventButton[i]
                                                                                                    ? <img src={processImage(event["receiptList"][0]["receiptImg"])} style={{ backgroundColor: "var(--color-leftPanel)" }}
                                                                                                        alt={processImage(event["receiptList"][0]["receiptImg"])} height={"150"} width={"100"} />
                                                                                                    :
                                                                                                    <>
                                                                                                        <input type="file" id="receiptImg" accept="image/*" style={{ display: "none" }}
                                                                                                            onChange={(e) => { uploadImg(e.target.files[0], i, 0); }}></input>
                                                                                                        <label htmlFor='receiptImg'>

                                                                                                            <img src={processImage(event["receiptList"][0]["receiptImg"])} style={{ backgroundColor: "var(--color-leftPanel)" }}
                                                                                                                alt={processImage(event["receiptList"][0]["receiptImg"])} height={"150"} width={"100"} title='변경하시려면 클릭하세요.' />
                                                                                                        </label>
                                                                                                    </>
                                                                                        }

                                                                                    </div>


                                                                                </div>
                                                                                )
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
                                                                                                                    <div className="receiptTitle">
                                                                                                                        <h5>{receipt["receiptTitle"]}
                                                                                                                            {
                                                                                                                                fixEventButton[i]
                                                                                                                                    ? <span onClick={() => {

                                                                                                                                        receiptDeleteButton(i, j);
                                                                                                                                    }}><i class="far fa-trash-alt"></i></span>
                                                                                                                                    : null
                                                                                                                            }
                                                                                                                        </h5>

                                                                                                                        {
                                                                                                                            receipt["receiptDetailList"].length === 0
                                                                                                                                ? null
                                                                                                                                : <div>{j + 1}번째 영수증 금액 : {sumReceipt(receipt["receiptDetailList"])}원</div>
                                                                                                                        }

                                                                                                                    </div>
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
                                                                                                                                            return (
                                                                                                                                                <tr>
                                                                                                                                                    <td>
                                                                                                                                                        {
                                                                                                                                                            fixEventButton[i]
                                                                                                                                                                ?
                                                                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center" }} placeholder={item["context"]}
                                                                                                                                                                    onInput={
                                                                                                                                                                        (e) => {
                                                                                                                                                                            changeItem("context", e.target.value, i, j, k);
                                                                                                                                                                        }}></input>
                                                                                                                                                                :
                                                                                                                                                                <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["context"]}</span>
                                                                                                                                                        }
                                                                                                                                                    </td>

                                                                                                                                                    <td>
                                                                                                                                                        {
                                                                                                                                                            fixEventButton[i]
                                                                                                                                                                ?
                                                                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center" }} placeholder={item["price"]}
                                                                                                                                                                    onInput={
                                                                                                                                                                        (e) => {
                                                                                                                                                                            changeItem("price", e.target.value.replace(/[^0-9]/g, ''), i, j, k);
                                                                                                                                                                        }}></input>
                                                                                                                                                                :
                                                                                                                                                                <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["price"]}</span>
                                                                                                                                                        }
                                                                                                                                                    </td>

                                                                                                                                                    <td>
                                                                                                                                                        {
                                                                                                                                                            fixEventButton[i]
                                                                                                                                                                ?
                                                                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center" }} placeholder={item["amount"]}
                                                                                                                                                                    onInput={
                                                                                                                                                                        (e) => {
                                                                                                                                                                            changeItem("amount", e.target.value.replace(/[^0-9]/g, ''), i, j, k);
                                                                                                                                                                        }}></input>
                                                                                                                                                                :
                                                                                                                                                                <span type="text" style={{ border: "transparent", textAlign: "center" }} >{item["amount"]}</span>
                                                                                                                                                        }
                                                                                                                                                    </td>

                                                                                                                                                    <td>
                                                                                                                                                        {item["totalAmount"]}
                                                                                                                                                    </td>
                                                                                                                                                </tr>)
                                                                                                                                        })
                                                                                                                                        }
                                                                                                                                    </tbody> </table>
                                                                                                                                {fixEventButton[i]
                                                                                                                                    ?
                                                                                                                                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                                                                                                                        <button className='submitButton' type='button' style={{ margin: "0" }}
                                                                                                                                            onClick={() => {
                                                                                                                                                var tempQuarter = { ...quarter };

                                                                                                                                                tempQuarter[currentQuarter]["eventList"][i]["receiptList"][j]["receiptDetailList"].push({
                                                                                                                                                    context: "",
                                                                                                                                                    price: "",
                                                                                                                                                    amount: "",
                                                                                                                                                    totalAmount: ""
                                                                                                                                                })
                                                                                                                                                setQuarter(tempQuarter)
                                                                                                                                            }}>항목 추가</button></div>
                                                                                                                                    :
                                                                                                                                    null
                                                                                                                                }
                                                                                                                            </>
                                                                                                                            )
                                                                                                                    }


                                                                                                                </>)}
                                                                                                    </div>

                                                                                                    {
                                                                                                        console.log(i + " " + j)
                                                                                                    }

                                                                                                    {

                                                                                                        fixEventButton[i]
                                                                                                            ?
                                                                                                            <div className="uploadimg">

                                                                                                                <label htmlFor='receiptImg'>
                                                                                                                    <img src={processImage(event["receiptList"][j]["receiptImg"])} style={{ backgroundColor: "var(--color-leftPanel)" }}
                                                                                                                        alt={processImage(event["receiptList"][j]["receiptImg"])} height={"150"} title='변경하시려면 클릭하세요.' />
                                                                                                                </label>
                                                                                                                {/* <input type="file" id="receiptImg" accept="image/*"
                                                                                                                    onChange={(e) => { uploadImg(e.target.files[0], i, j); console.log("hi:" + i + " " + j) }} style={{ display: "none" }}></input> */}
                                                                                                            </div>

                                                                                                            : <img src={processImage(event["receiptList"][j]["receiptImg"])} style={{ backgroundColor: "var(--color-leftPanel)" }}
                                                                                                                alt={processImage(event["receiptList"][j]["receiptImg"])} height={"150"} width={"100"} />


                                                                                                    }
                                                                                                </div>

                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>)


                                                                        }

                                                                        {
                                                                            fixEventButton[i] === true
                                                                                ?
                                                                                <div style={{ width: "650px", display: "flex", justifyContent: "flex-end" }}>
                                                                                    <button className='submitButton' type='button'
                                                                                        onClick={() => {
                                                                                            receiptAddButton(i);
                                                                                        }}>영수증 추가</button>
                                                                                </div>
                                                                                : null
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
                                                    }} > 행사 추가 </button>
                                                </div>


                                            </div>
                                            {/* 장부 */}

                                            {/* 2 */}
                                            <div className="remotePanel">
                                                <div className="remotePanelBox" style={{ display: "flex" }}>
                                                    <div>
                                                        <h5 style={{ textAlign: "center", marginBottom: "5px" }}>📚행사 목록📚</h5>
                                                        <p style={{ textAlign: "center", fontSize: "12px" }}>드래그로 순서를 변경할 수 있습니다.</p>

                                                        {
                                                            list !== undefined
                                                                ?
                                                                <ReactSortable tag="div" list={list} setList={setList}>

                                                                    {list.map((item, i) => (
                                                                        <div style={{ marginLeft: "20px" }} key={item.eventNumber}>{i + 1}. {item.eventTitle}</div>
                                                                    ))}

                                                                    <div style={{ justifyContent: "center", width: "100%", display: "flex" }} >
                                                                        <button className='submitButton' type='button' onClick={() => { alert("API 문서가 없어서 기능 구현 안함") }}> 순서 변경 </button>
                                                                    </div>
                                                                </ReactSortable>
                                                                : <span>등록된 행사가 없습니다.</span>
                                                        }






                                                        <div style={{ color: "#d32c2c" }}>
                                                            ※ 장부를 잘못 기입해서 문제가 발생할 경우의 책임은 학생회장 본인에게 있습니다.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* 2 */}
                                        </div>
                                    </div>

                                    {/* rightPanel */}
                                </>
                                )
                        }</>)
            }


        </div >
    )
}


export default MainPage;