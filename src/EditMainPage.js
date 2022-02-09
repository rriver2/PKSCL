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




function MainPage(props) {
    const [list, setList] = useState([]);

    let debugAPIURL = "";
    // debugAPIURL = "https://cors-jhs.herokuapp.com/https://pkscl.kro.kr";

    const history = useHistory();
    const el = useRef();

    let answer = { "studentPresident": { "major": "영어영문학부", "name": "한준규", "phoneNumber": "010-3340-6496", "email": "hellllo3627@pukyong.ac.kr", "majorLogo": null }, 
    "quarter": {
         "quarter1": { "status": "true", 
            "eventList": [
                { "eventNumber": "12", 
                "eventTitle": "학과 OT2", 
                "eventContext": "학과 OT를 잘 마무리 하였습니다.", 
                "receiptList": [{ "receiptNumber": "9", "receiptTitle": "학과 OT2 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" },{ "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" },{ "context": "참이슬", "price": "1000", "amount": "2", "totalAmount": "2000" }, { "context": "프라이팬", "price": "2000", "amount": "5", "totalAmount": "10000" }, { "context": "돈까스", "price": "2500", "amount": "6", "totalAmount": "15000" }] }, { "receiptNumber": "10", "receiptTitle": "학과 OT2 영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 OT2 영수증 1번입니다. ", "receiptDetailList": [{ "context": "대선", "price": "1500", "amount": "1", "totalAmount": "1500" }, { "context": "갈비", "price": "2500", "amount": "4", "totalAmount": "10000" }, { "context": "참이슬", "price": "3500", "amount": "1", "totalAmount": "3500" }, { "context": "초콜렛", "price": "5000", "amount": "2", "totalAmount": "10000" }, { "context": "연필", "price": "2000", "amount": "2", "totalAmount": "4000" }] }] }, 
                { "eventNumber": "13", "eventTitle": "학과 새내기배움터 진행", "eventContext": "학과 새내기배움터를 진행하였고 이상없이 마무리 하였습니다.", "receiptList": [{ "receiptNumber": "11", "receiptTitle": "학과 새내기배움터 진행 영수증 1", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 새내기배움터 진행 영수증1", "receiptDetailList": [{ "context": "갈비", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "콜라", "price": "2731", "amount": "3", "totalAmount": "8193" }, { "context": "바구니", "price": "2731", "amount": "2", "totalAmount": "5462" }, { "context": "참이슬", "price": "2731", "amount": "5", "totalAmount": "13655" }] }, { "receiptNumber": "12", "receiptTitle": "학과 새내기배움터 진행 영수증 1", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "학과 새내기배움터 진행 영수증1", "receiptDetailList": [{ "context": "휴지", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "컵", "price": "2731", "amount": "2", "totalAmount": "5462" }, { "context": "바구니", "price": "2731", "amount": "3", "totalAmount": "8193" }, { "context": "이어폰", "price": "2731", "amount": "5", "totalAmount": "13655" }] }] }, 
                { "eventNumber": "14", "eventTitle": "빛 축제", "eventContext": "빛 축제를 진행하였습니다. 해당 영수증은 아래와 같습니다.", "receiptList": [{ "receiptNumber": "13", "receiptTitle": "빛 축제 영수증 1", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "빛 축제 영수증 1 영수증입니다.", "receiptDetailList": [{ "context": "휴지", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "과자", "price": "2731", "amount": "2", "totalAmount": "5462" }] }, { "receiptNumber": "14", "receiptTitle": "빛 축제 영수증 1", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "빛 축제 영수증 1 영수증입니다.", "receiptDetailList": [{ "context": "프라이팬", "price": "2731", "amount": "2", "totalAmount": "5462" }, { "context": "휴지", "price": "2731", "amount": "4", "totalAmount": "10924" }, { "context": "참이슬", "price": "2731", "amount": "4", "totalAmount": "10924" }] }] }] }, 
        "quarter2": { "status": "true", 
            "eventList": [
                { "eventNumber": "18", "eventTitle": "기말고사 응원전", "eventContext": "기말고사 응원전을 진행하였습니다.", 
                "receiptList": [
                    { "receiptNumber": "19", 
                    "receiptTitle": "기말고사 응원전 영수증 1번", 
                    "receiptImg": { "name": "./static/receiptImg/test2.png" }, 
                    "receiptContext": "기말고사 응원전 영수증 1번", 
                    "receiptDetailList": [{ "context": "휴지", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "프라이팬", "price": "2731", "amount": "2", "totalAmount": "5462" },
                ] },{ "receiptNumber": "19", 
                    "receiptTitle": "기말고사 응원전 영수증 1번", 
                    "receiptImg": { "name": "./static/receiptImg/test2.png" }, 
                    "receiptContext": "기말고사 응원전 영수증 1번", 
                    "receiptDetailList": [{ "context": "휴지", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "프라이팬", "price": "2731", "amount": "2", "totalAmount": "5462" },
                ] }] }, 
                { "eventNumber": "19", "eventTitle": "기말고사 응원전2", "eventContext": "학생회비가 남게되어 기말고사응원전을 한번 더 진행하였습니다.", "receiptList": [{ "receiptNumber": "20", "receiptTitle": "기말고사 응원전 재영수증 1번", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "기말고사 응원전 재영수증 1번", "receiptDetailList": [{ "context": "돈까스", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "프라이팬", "price": "2731", "amount": "2", "totalAmount": "5462" }] }] }] }, 
        "quarter3": { "status": "false",
            "eventList": [
                { "eventNumber": "20", "eventTitle": "공개일 X", "eventContext": "데이터 O", "receiptList": [{ "receiptNumber": "21", "receiptTitle": "데이터 O", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "데이터 O", "receiptDetailList": [{ "context": "갈비", "price": "2731", "amount": "2", "totalAmount": "5462" }, { "context": "연필", "price": "2731", "amount": "3", "totalAmount": "8193" }] }] }, 
                { "eventNumber": "21", "eventTitle": "공개일 X", "eventContext": "데이터 O", "receiptList": [{ "receiptNumber": "22", "receiptTitle": "데이터 O", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "데이터 O", "receiptDetailList": [{ "context": "프라이팬", "price": "2731", "amount": "4", "totalAmount": "10924" }, { "context": "갈비", "price": "2731", "amount": "5", "totalAmount": "13655" }] }] }] }, 
        "quarter4": { "status": "false", 
            "eventList": [
                { "eventNumber": "22", "eventTitle": "공개일 X", "eventContext": "데이터 O", "receiptList": [{ "receiptNumber": "23", "receiptTitle": "데이터 O", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "데이터 O", "receiptDetailList": [{ "context": "바구니", "price": "2731", "amount": "1", "totalAmount": "2731" }, { "context": "대선", "price": "2731", "amount": "2", "totalAmount": "5462" }] }] }, 
                { "eventNumber": "23", "eventTitle": "공개일 X", "eventContext": "데이터 O", "receiptList": [{ "receiptNumber": "24", "receiptTitle": "데이터 O", "receiptImg": { "name": "./static/receiptImg/test2.png" }, "receiptContext": "데이터 O", "receiptDetailList": [{ "context": "바구니", "price": "2731", "amount": "2", "totalAmount": "5462" }, { "context": "과자", "price": "2731", "amount": "2", "totalAmount": "5462" }] }] }] } } }

    let answerDate = {
        "quarter1": ["2022-01-01", "2022-01-02"],
        "quarter2": ["2022-01-03", "2022-01-04"],
        "quarter3": ["2022-01-05", "2022-01-06"],
        "quarter4": ["2022-01-07", "2022-01-08"]
    }

    // const [totalAmount, setTotalAmount] = useState([])

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

    // const [fixEventButton, setFixEventButton] = useState([]);

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

    function eventDeleteButton(eventNumber, index) {
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
                            alert("행사 장부가 삭제되었습니다.");
                            break;
                    }
                    getLedger();
                }).catch((error) => {

                    alert("장부를 삭제하는데 실패했습니다.");
                })
        } else {
            alert("삭제가 취소되었습니다.")
        }
    }

    // function eventFixButton(event) {
    //     var payload = new FormData();

    //     payload.append("event", event)
    //     payload.append("quarter", currentQuarter);

    //     console.log(payload);

    //     axios.put(debugAPIURL + "/ledger", payload,
    //         {
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         }
    //     )
    //         .then((payload) => {
    //             switch (payload.status) {
    //                 case 200:
    //                     alert("장부를 수정하였습니다.");
    //                     getLedger();
    //                     break;
    //                 default:
    //                     alert("success code: " + payload.status);
    //                     getLedger();
    //                     break;

    //             }
    //         })
    //         .catch((error) => {
    //             alert("장부 수정을 처리하지 못했습니다. code: " + error.response.status)
    //         });
    //     console.log(quarter);
    // }

    function eventAddButton(currentQuarter) {
        console.log(quarter);
        console.log(currentQuarter);
        // const temp = { ...quarter };
        // temp[currentQuarter]["eventList"].push({
        //     eventContext: "행사내용",
        //     eventNumber: "eventNumber",
        //     eventTitle: "행사 이름",
        //     receiptList: [
        //         {
        //             "receiptTitle": "영수증 제목을 입력해주세요",
        //             "receiptImg": { name: "" },
        //             "receiptContext": "영수증 내용을 입력해주세요",
        //             "receiptDetailList": [
        //                 {
        //                     "context": "",
        //                     "price": "",
        //                     "amount": "",
        //                     "totalAmount": ""

        //                 },
        //             ]
        //         },
        //     ],
        // });
        let payload = {"quarter" : currentQuarter}
        axios.post(debugAPIURL + "/ledger",payload)
            .then((payload) => {
                switch (payload.status) {
                    case 200:
                        alert("장부를 추가하였습니다.");
                        getLedger();
                        break;
                    default:
                        alert("success code: " + payload.status);
                        getLedger();
                        break;
                }
            })
            .catch((error) => {
                alert("장부 추가에 실패했습니다. code: " + error.response.status)
            });
    }

    // function receiptAddButton(i) {
    //     const temp = { ...quarter };
    //     temp[currentQuarter]["eventList"][i]["receiptList"].push({

    //         "receiptTitle": "영수증 제목을 입력해주세요",
    //         "receiptImg": { name: "" },
    //         "receiptContext": "영수증 내용을 입력해주세요",
    //         "receiptDetailList": [
    //             {
    //                 "context": "",
    //                 "price": "",
    //                 "amount": "",
    //                 "totalAmount": ""

    //             },
    //         ]
    //     })
    //     setQuarter(temp);
    // }

    // function receiptDeleteButton(i, j) {
    //     let answer = window.confirm("영수증을 삭제하시겠습니까?");
    //     if (answer) {
    //         const temp = { ...quarter };
    //         temp[currentQuarter]["eventList"][i]["receiptList"].splice(j, 1);
    //         setQuarter(temp);
    //         alert("영수증이 삭제되었습니다.");
    //     }
    // }

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

    // function uploadImg(img, i, j) {
    //     console.log("I : " + i + "J : " + j);
    //     const temp = { ...quarter };
    //     temp[currentQuarter]["eventList"][i]["receiptList"][j]["receiptImg"] = img;
    //     setQuarter(temp);
    //     console.log(quarter);
    // }

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

    // function changeEventTitle(value, i) {
    //     var tempQuarter = { ...quarter };
    //     tempQuarter[currentQuarter]["eventList"][i].eventTitle = value;
    //     setQuarter(tempQuarter);
    // }

    // function changeEventContext(value, i) {
    //     var tempQuarter = { ...quarter };
    //     tempQuarter[currentQuarter]["eventList"][i].eventContext = value;
    //     setQuarter(tempQuarter);
    // }

    // function changeReceiptTitle(value, i) {
    //     var tempQuarter = { ...quarter };
    //     tempQuarter[currentQuarter]["eventList"][i].receiptTitle = value;
    //     setQuarter(tempQuarter);
    // }

    // function changeReceiptContext(value, i) {
    //     var tempQuarter = { ...quarter };
    //     tempQuarter[currentQuarter]["eventList"][i].receiptContext = value;
    //     setQuarter(tempQuarter);
    // }

    // function changeItem(key, value, i, j, k) {
    //     console.log("changeItem");
    //     var tempQuarter = { ...quarter };
    //     var item = tempQuarter[currentQuarter]["eventList"][i]["receiptList"][j]["receiptDetailList"][k];

    //     item[key] = value;
    //     item["totalAmount"] = item["price"] * item["amount"];
    //     setQuarter(tempQuarter);
        // var tempShowAllReceiptButton = [...showAllReceiptButton];
        // tempShowAllReceiptButton[i] = true;
        // console.log(tempShowAllReceiptButton);
        // setShowAllReceiptButton(tempShowAllReceiptButton);
    // }

    function getLedger() {
        let resetArray = [];
        axios.get(debugAPIURL + '/ledger')
            .then((payload) => {
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarter({ ...payload.data["quarter"] });
                setList(answer["quarter"][currentQuarter]["eventList"]);

                if (payload.data["quarter"][currentQuarter]["eventList"] !== undefined) {
                    for (let i = 0; i < payload.data["quarter"][currentQuarter]["eventList"].length; i++) {
                        resetArray.push(false)
                    }
                }
                reset(props.todayQuarter);
                defineColor(props.todayQuarter);
                setShowAllReceiptButton(resetArray);
            })
            .catch((error) => {
                alert("학과 장부를 불러올 수 없습니다.");
                //지우기
                setStudentPresident({ ...answer["studentPresident"] });
                setQuarter({ ...answer["quarter"] });
                setList(answer["quarter"][currentQuarter]["eventList"]);
                console.log(answer["quarter"][currentQuarter]["eventList"]);

                for (let i = 0; i < answer["quarter"][currentQuarter]["eventList"].length; i++) {
                    resetArray.push(false)
                }

                setShowAllReceiptButton(resetArray);
            })

        reset(props.todayQuarter);
        defineColor(props.todayQuarter);
        GetDate();
    }

    function eventSequenceButton() {
        let eventNumberList=[];
        list.map((event) =>{
            if( event["eventNumber"]!== undefined)
            eventNumberList.push(event["eventNumber"])})
        let payload = {"eventNumberList":[...eventNumberList]};
        axios.put(debugAPIURL + '/event-sequence', payload)
            .then((payload) => {
                console.log("행사 순서가 수정되었습니다.");
                getLedger();
            }).catch((error) => {
                alert(error.response.data["errorMessage"]);
            })
    }


    useEffect(() => {
        getLedger();
    }, []);

     useEffect(() => {
        if(editEventState===false) getLedger();
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
            reset(props.todayQuarter);
            if (quarter[currentQuarter]["eventList"] !== undefined) {
                setList(quarter[currentQuarter]["eventList"]);
            }
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
                        editEventState
                            ?(
                                <>{console.log(editEventData)}
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
                                            <div className="quarterButton" onClick={() => { setList(quarter["quarter1"]["eventList"]); showQuarter("quarter1") }}><div>1분기</div><img src={quarter1} alt="quarter1" ></img></div>
                                            <div className="quarterButton" onClick={() => { setList(quarter["quarter2"]["eventList"]); showQuarter("quarter2") }}><div>2분기</div><img src={quarter2} alt="quarter2" ></img></div>
                                            <div className="quarterButton" onClick={() => { setList(quarter["quarter3"]["eventList"]); showQuarter("quarter3") }}><div>3분기</div><img src={quarter3} alt="quarter3" ></img></div>
                                            <div className="quarterButton" onClick={() => { setList(quarter["quarter4"]["eventList"]); showQuarter("quarter4") }}><div>4분기</div><img src={quarter4} alt="quarter4" ></img></div>
                                        </div>
                                        {
                                            props.loginPosition === "student"
                                                ? null
                                                : (<div className="managementPageBar">
                                                    <i className="fas fa-chevron-right" onClick={() => {
                                                        defineColor(props.todayQuarter); history.push('/manage')
                                                    }}></i>
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
                                                <button className='submitButton' type='button' onClick={() => { history.push('/main') }}>학생 입장 장부</button>
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
                                                                <div className="eventCard" key={i} >
                                                                    <div className="cardContent">
                                                                        <div className="eventSource">
                                                                            <div style={{ width: "230px" }}>
                                                                                <div className="eventTitle">
                                                                                    <h4>{event["eventTitle"]}
                                                                                    </h4>
                                                                                    <div style={{ width: "500px" }}> 행사 총 금액 : {eventAmount[i]}원</div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="eventButtons">
                                                                                <button onClick={() => { 
                                                                                    eventDeleteButton(event["eventNumber"], i); }} style={{ marginRight: "15px" }}> 
                                                                                    <i class="far fa-trash-alt"></i> </button>
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
                                                                                                <img src={processImage(event["receiptList"][0]["receiptImg"])} style={{ backgroundColor: "var(--color-leftPanel)" }}
                                                                                                        alt={processImage(event["receiptList"][0]["receiptImg"])} height={"150"} width={"100"} />
                                                                                                    
                                                                                                    
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
                                                                                                                alt={processImage(event["receiptList"][j]["receiptImg"])} height={"150"} width={"100"} />


                                                                                                    
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
                                            {/* 장부 */}

                                            {/* 2 */}
                                            <div className="remotePanel">
                                                <div className="remotePanelBox" style={{ display: "flex" }}>
                                                    <div>
                                                        <h5 style={{ textAlign: "center", marginBottom: "5px", fontWeight: "bold" }}>📚행사 목록</h5>
                                                        <p style={{ textAlign: "center", fontSize: "12px" }}>드래그로 순서를 바꾸고 순서 변경 버튼을 눌러주세요 !</p>

                                                        {
                                                            list !== undefined
                                                                ? <>
                                                                    <ReactSortable className="sortTable" tag="div" list={list} setList={setList}>

                                                                        {list.map((item, i) => (
                                                                            <div style={{ marginLeft: "20px" }} key={item.eventNumber}>{i + 1}. {item.eventTitle}</div>
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