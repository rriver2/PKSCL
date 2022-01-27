import majorlogo from './img/majorlogo.png';
import quarter1 from './img/quarter1.png';
import quarter2 from './img/quarter2.png';
import quarter3 from './img/quarter3.png';
import quarter4 from './img/quarter4.png';
import receiptImg from './img/receipt.png';
import EditProfile from './EditProfile';
import './css/MainPage.css';
import './css/EditProfile.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function MainPage(props) {

    const history = useHistory();

    const [studentPresident, setStudentPresident] = useState({
        "major": "컴퓨터공학과",
        "name": "홍길동",
        "phoneNumber": "01012345678",
        "email": "PKSCL@pukyong.ac.kr"
    });

    const [quarterStatus, setQuarterStatus] = useState(
        {
            "quarter1": true,
            "quarter2": true,
            "quarter3": true,
            "quarter4": false
        }
    )

    const [quarter, setQuarter] = useState({
        "quarter1": {
            "openDate": "2020/06/03",
            "eventList": [
                {
                    "eventTitle": "1벚꽃축제",
                    "eventContext": "행사 비고고고",
                    "receiptList": [
                        {
                            "receiptTitle": "1부경마트",
                            "receiptImg": "1이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "1진로",
                                    "price": "1000",
                                    "amount": "4"
                                },
                                {
                                    "context": "1참이슬",
                                    "price": "1000",
                                    "amount": "5"
                                },
                                {
                                    "context": "1양파",
                                    "price": "1000",
                                    "amount": "4"
                                },
                                {
                                    "context": "1돼지고기",
                                    "price": "1000",
                                    "amount": "1"
                                },
                                {
                                    "context": "1진로",
                                    "price": "1000",
                                    "amount": "4"
                                },
                                {
                                    "context": "1참이슬",
                                    "price": "1000",
                                    "amount": "5"
                                },
                                {
                                    "context": "1양파",
                                    "price": "1000",
                                    "amount": "4"
                                },
                                {
                                    "context": "1돼지고기",
                                    "price": "1000",
                                    "amount": "1"
                                },
                                {
                                    "context": "1진로",
                                    "price": "1000",
                                    "amount": "4"
                                },
                                {
                                    "context": "1참이슬",
                                    "price": "1000",
                                    "amount": "5"
                                },
                                {
                                    "context": "1양파",
                                    "price": "1000",
                                    "amount": "4"
                                },
                                {
                                    "context": "1돼지고기",
                                    "price": "1000",
                                    "amount": "1"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "1부경마트",
                            "receiptImg": "1이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "1진로",
                                    "price": "1000",
                                    "amount": "4"
                                },
                                {
                                    "context": "1참이슬",
                                    "price": "1000",
                                    "amount": "5"
                                },
                                {
                                    "context": "1양파",
                                    "price": "1000",
                                    "amount": "4"
                                },
                                {
                                    "context": "1돼지고기",
                                    "price": "1000",
                                    "amount": "1"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "1부경마트",
                            "receiptImg": "1이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "1진로",
                                    "price": "1000",
                                    "amount": "4"
                                },
                                {
                                    "context": "1참이슬",
                                    "price": "1000",
                                    "amount": "5"
                                },
                                {
                                    "context": "1양파",
                                    "price": "1000",
                                    "amount": "4"
                                },
                                {
                                    "context": "1돼지고기",
                                    "price": "1000",
                                    "amount": "1"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "1사진인화이벤트재료구매",
                            "receiptImg": "1이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "1필름",
                                    "price": "1000",
                                    "amount": "5"
                                }
                            ]
                        }
                    ]
                },
                {
                    "eventTitle": "1중간고사응원",
                    "eventContext": "행사 비고고고",
                    "receiptList": [
                        {
                            "receiptTitle": "1카카오톡기프티콘",
                            "receiptImg": "1이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "1폴라로이드(1등)",
                                    "price": "1000",
                                    "amount": "1"
                                },
                                {
                                    "context": "1치킨(2등)",
                                    "price": "1000",
                                    "amount": "3"
                                },
                                {
                                    "context": "1베스킨라빈스(3등)",
                                    "price": "1000",
                                    "amount": "4"
                                }
                            ]
                        }
                    ]
                }, {
                    "eventTitle": "1중간고사응원입니당",
                    "eventContext": "행사 비고고고",
                    "receiptList": [
                        {
                            "receiptTitle": "1카카오톡기프티콘",
                            "receiptImg": "1이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "1폴라로이드(1등)",
                                    "price": "1000",
                                    "amount": "1"
                                },
                                {
                                    "context": "1치킨(2등)",
                                    "price": "1000",
                                    "amount": "3"
                                },
                                {
                                    "context": "1베스킨라빈스(3등)",
                                    "price": "1000",
                                    "amount": "4"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "quarter2": {
            "openDate": "2분기 공개 일자",
            "eventList": [
                {
                    "eventTitle": "2벚꽃축제",
                    "eventContext": "행사 비고고고",
                    "receiptList": [
                        {
                            "receiptTitle": "2부경마트",
                            "receiptImg": "2이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "2진로",
                                    "price": "2000",
                                    "amount": "4"
                                },
                                {
                                    "context": "2참이슬",
                                    "price": "2000",
                                    "amount": "5"
                                },
                                {
                                    "context": "2양파",
                                    "price": "2000",
                                    "amount": "4"
                                },
                                {
                                    "context": "2돼지고기",
                                    "price": "2000",
                                    "amount": "1"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "2사진인화이벤트재료구매",
                            "receiptImg": "2이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "2필름",
                                    "price": "2000",
                                    "amount": "5"
                                }
                            ]
                        }
                    ]
                },
                {
                    "eventTitle": "2벚꽃축제",
                    "eventContext": "행사 비고고고",
                    "receiptList": [
                        {
                            "receiptTitle": "2카카오톡기프티콘",
                            "receiptImg": "2이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "2폴라로이드(1등)",
                                    "price": "2000",
                                    "amount": "1"
                                },
                                {
                                    "context": "2치킨(2등)",
                                    "price": "2000",
                                    "amount": "3"
                                },
                                {
                                    "context": "2베스킨라빈스(3등)",
                                    "price": "2000",
                                    "amount": "4"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "2카카오톡기프티콘",
                            "receiptImg": "2이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "2폴라로이드(1등)",
                                    "price": "2000",
                                    "amount": "1"
                                },
                                {
                                    "context": "2치킨(2등)",
                                    "price": "2000",
                                    "amount": "3"
                                },
                                {
                                    "context": "2베스킨라빈스(3등)",
                                    "price": "2000",
                                    "amount": "4"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "2카카오톡기프티콘",
                            "receiptImg": "2이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "2폴라로이드(1등)",
                                    "price": "2000",
                                    "amount": "1"
                                },
                                {
                                    "context": "2치킨(2등)",
                                    "price": "2000",
                                    "amount": "3"
                                },
                                {
                                    "context": "2베스킨라빈스(3등)",
                                    "price": "2000",
                                    "amount": "4"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "quarter3": {
            "openDate": "3분기 공개 일자",
            "eventList": [
                {
                    "eventTitle": "3벚꽃축제",
                    "eventContext": "행사 비고고고",
                    "receiptList": [
                        {
                            "receiptTitle": "3부경마트",
                            "receiptImg": "3이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "3진로",
                                    "price": "4000",
                                    "amount": "4"
                                },
                                {
                                    "context": "3참이슬",
                                    "price": "4000",
                                    "amount": "5"
                                },
                                {
                                    "context": "3양파",
                                    "price": "4000",
                                    "amount": "4"
                                },
                                {
                                    "context": "3돼지고기",
                                    "price": "4000",
                                    "amount": "1"
                                }
                            ]
                        },
                        {
                            "receiptContext": "3사진인화이벤트재료구매",
                            "receiptImg": "3이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "3필름",
                                    "price": "4000",
                                    "amount": "5"
                                }
                            ]
                        }
                    ]
                },
                {
                    "eventTitle": "3중간고사응원",
                    "eventContext": "행사 비고고고",
                    "receiptList": [
                        {
                            "receiptContext": "3카카오톡기프티콘",
                            "receiptImg": "3이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "3폴라로이드(1등)",
                                    "price": "4000",
                                    "amount": "1"
                                },
                                {
                                    "context": "3치킨(2등)",
                                    "price": "4000",
                                    "amount": "3"
                                },
                                {
                                    "context": "3베스킨라빈스(3등)",
                                    "price": "4000",
                                    "amount": "4"
                                }, {
                                    "context": "3폴라로이드(1등)",
                                    "price": "4000",
                                    "amount": "1"
                                },
                                {
                                    "context": "3폴라로이드(1등)",
                                    "price": "4000",
                                    "amount": "1"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "quarter4": {
            "openDate": "3분기 공개 일자",
            "eventList": [
                {
                    "eventTitle": "3벚꽃축제",
                    "eventContext": "행사 비고고고",
                    "receiptList": [
                        {
                            "receiptTitle": "3부경마트",
                            "receiptImg": "3이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "3진로",
                                    "price": "3000",
                                    "amount": "4"
                                },
                                {
                                    "context": "3참이슬",
                                    "price": "3000",
                                    "amount": "5"
                                },
                                {
                                    "context": "3양파",
                                    "price": "3000",
                                    "amount": "4"
                                },
                                {
                                    "context": "3돼지고기",
                                    "price": "3000",
                                    "amount": "1"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "3사진인화이벤트재료구매",
                            "receiptImg": "3이미지경로",
                            "receiptContext": "영수증 비고고고",
                            "receiptContextList": [
                                {
                                    "context": "3필름",
                                    "price": "3000",
                                    "amount": "5"
                                }
                            ]
                        }
                    ]
                },
                {
                    "eventTitle": "3중간고사응원",
                    "eventContext": "행사 비고고고",
                    "receiptList": [
                        {
                            "receiptTitle": "3카카오톡기프티콘",
                            "receiptImg": "3이미지경로",
                            "receiptContextList": [
                                {
                                    "context": "3폴라로이드(1등)",
                                    "price": "3000",
                                    "amount": "1"
                                },
                                {
                                    "context": "3치킨(2등)",
                                    "price": "3000",
                                    "amount": "3"
                                },
                                {
                                    "context": "3베스킨라빈스(3등)",
                                    "price": "3000",
                                    "amount": "4"
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    })

    const [eventAmount, setEventAmount] = useState([]);
    const [quarterAmount, setQuarterAmount] = useState(0);
    const [currentQuarter, setCurrentQuarter] = useState(props.todayQuarter);
    const [showAllReceiptButton, setShowAllReceiptButton] = useState([]);
    const [editProfileState, setEditProfileState] = useState(false);

    function resetShowAllReceiptButton() {
        let resetArray = [];
        for (let i = 0; i < quarter[currentQuarter]["eventList"].length; i++) {
            resetArray.push(true)
        }
        setShowAllReceiptButton(resetArray)
    }

    function reset() {
        // console.log(quarter[currentQuarter]["eventList"])
        CalculateCurrentQuarterReceiptSumList(quarter[currentQuarter]["eventList"]);
        resetShowAllReceiptButton();
    }

    function showQuarter(quarter) {
        if (quarterStatus[quarter]) {
            setCurrentQuarter(quarter);
            defineColor(quarter)
        } else {
            alert("현재 공개된 장부가 아닙니다 :)")
        }
    }

    function pksclSubmitButton() {
        let payload = { "sclData": { "studentPresident": { ...studentPresident }, "quarterStatus": { ...quarterStatus }, "quarter": { ...quarter } } };
        axios.post('/main', payload)
            .then((payload) => {
                setStudentPresident({ ...payload["sclData"]["studentPresident"] });
                setQuarterStatus({ ...payload["sclData"]["quarterStatus"] });
                setQuarter({ ...payload["sclData"]["quarter"] });
            })
            .catch((error) => {
                alert("학생 전송에 실패했습니다 :)")
            });
    }

    function sumItems(price, amount) {
        return price * amount;
    }

    function sumReceipt(receiptContextList) {
        let sumReceiptValue = 0;
        for (let i = 0; i < receiptContextList.length; i++) {
            let item = receiptContextList[i];
            sumReceiptValue = sumReceiptValue + sumItems(item["price"], item["amount"]);
        }
        return sumReceiptValue;
    }

    function sumEvent(receiptList) {
        let sumEventValue = 0;
        for (let i = 0; i < receiptList.length; i++) {
            let receipt = receiptList[i]["receiptContextList"];
            sumEventValue = sumEventValue + sumReceipt(receipt);
        }
        return sumEventValue
    }

    function CalculateCurrentQuarterReceiptSumList(eventList) {
        let eventSum = [];
        // console.log(eventList)
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

    function setColorProperty(colorQuarter, colorQuarterCircle, colorLeftPanel, colorCard) {
        document.documentElement.style.setProperty("--color-quarter", colorQuarter);
        document.documentElement.style.setProperty("--color-quarterCircle", colorQuarterCircle);
        document.documentElement.style.setProperty("--color-leftPanel", colorLeftPanel);
        document.documentElement.style.setProperty("--color-card", colorCard);
    }

    function defineColor(quarter) {
        if (quarter === "quarter1") {
            setColorProperty("#c89034", "linear-gradient(0deg, rgba(200, 144, 52, 1) 0%, rgba(213, 178, 121, 1) 67%", "#f2e3d7", "#fff5ed");
        } else if (quarter === "quarter2") {
            setColorProperty("#578e5a", "linear-gradient(0deg, rgba(87,142,90,1) 0%, rgba(126,199,130,1) 67%)", "#cedbcf", "#dee7df");
        } else if (quarter === "quarter3") {
            setColorProperty("#9b4346", "linear-gradient(0deg, rgba(155,67,70,1) 0%, rgba(231,140,145,1) 67%)", "#e6bdbd", "#f3dddd");
        } else if (quarter === "quarter4") {
            setColorProperty("#597082", "linear-gradient(0deg, rgba(89,112,130,1) 0%, rgba(145,186,217,1) 67%)", "#d0dbe5", "#e6f1fb");
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

    useEffect(() => {
        // axios.get('/main')
        //   .then((payload) => {
        // setStudentPresident({...payload["sclData"]["studentPresident"]});
        // setQuarterStatus({...payload["sclData"]["quarterStatus"]});
        // setQuarter({...payload["sclData"]["quarter"]});
        //   })
        //   .catch((error) => {
        //     alert("학과 장부를 불러올 수 없습니다.");
        //   })
        reset();
    }, []);

    useEffect(() => {
        reset();
    }, [currentQuarter]);

    useEffect(() => {
        // // console.log(document.getElementById("leftPanel")[0].style.position);
        // if (editProfileState) {
        //     document.getElementsByClassName("leftPanel")[0].setProperty("position", "none");
        // } else {

        // }
    }, [editProfileState])


    return (
        <div className="MainPageContainer">
            {
                editProfileState
                    ?
                    // <EditProfile loginPosition={props.loginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                    <EditProfile loginPosition={"student"} setEditProfileState={setEditProfileState}></EditProfile>
                    : null
            }
            <div className="leftPanel" id='leftPanel'>
                <div className="majorCard">
                    <div className="presidentCard">
                        <h2>{studentPresident["major"]}</h2>
                        <p> 온라인 장부 입니다. </p>
                        <img src={majorlogo} alt="majorlogo" height={"150"} width={"10"} />
                        <h3>{studentPresident["name"]}</h3>
                        <p>{studentPresident["phoneNumber"]}</p>
                        <p>{studentPresident["email"]}</p>
                    </div>
                    <div className="cogExplanation">
                        안녕하세요 {studentPresident["major"]} 회장 {studentPresident["name"]}입니다.
                        PKCOG 온라인 장부를 통해 학과 장부를 분기별로 확인하세요 :)
                        장부 확인 중 문의 사항이 있으시다면 이메일로 연락주십시오.
                    </div>
                </div>
                <div className="quarter">
                    <div className="quarterButton" onClick={() => { showQuarter("quarter1") }}><div>1분기</div><img src={quarter1} alt="quarter1" ></img></div>
                    <div className="quarterButton" onClick={() => { showQuarter("quarter2") }}><div>2분기</div><img src={quarter2} alt="quarter2" ></img></div>
                    <div className="quarterButton" onClick={() => { showQuarter("quarter3") }}><div>3분기</div><img src={quarter3} alt="quarter3" ></img></div>
                    <div className="quarterButton" onClick={() => { showQuarter("quarter4") }}><div>4분기</div><img src={quarter4} alt="quarter4" ></img></div>
                </div>
                <div className="managementPageBar">
                    <i className="fas fa-chevron-right" onClick={() => { history.push('/manage') }}></i>
                </div>
            </div>

            <div className="rightPanel">


                <div className="nav">
                    <div className="buttons">
                        {
                            props.loginPosition === "president"
                                ? <button className='submitButton' onClick={() => { pksclSubmitButton(); }}> 장부 수정 완료</button>
                                : null
                        }
                        <button className='submitButton' type='button' onClick={() => { setEditProfileState(true); }}>프로필 편집</button>
                        <button className='submitButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                    </div>
                </div>
                <div className="quarterData">
                    <h2 className="quarterTotalAmount">
                        {currentQuarter[currentQuarter.length - 1]}분기 총 금액 : {quarterAmount}
                    </h2>
                    {

                        quarter[currentQuarter]["eventList"].map((event, i) => {
                            return (
                                <div className="eventCard">
                                    <div className="cardContent">
                                        <div className="eventTitle">
                                            <div><h4 >{event["eventTitle"]} </h4>  <div> 행사 총 금액 : {eventAmount[i]}</div></div>
                                            {
                                                event.receiptList.length === 1
                                                    ? null
                                                    : (
                                                        showAllReceiptButton[i] === false
                                                            ? (
                                                                <button onClick={() => {
                                                                    let array = [...showAllReceiptButton];
                                                                    array[i] = !showAllReceiptButton[i];
                                                                    setShowAllReceiptButton(array)
                                                                }}>전체보기 취소</button>
                                                            )
                                                            : (
                                                                <button onClick={() => {
                                                                    let array = [...showAllReceiptButton];
                                                                    array[i] = !showAllReceiptButton[i];
                                                                    setShowAllReceiptButton(array)
                                                                }}>전체보기</button>
                                                            )
                                                    )

                                            }
                                        </div>

                                        {
                                            showAllReceiptButton[i] === true
                                                ? (<div id="receiptContent" style={{ height: "380px", overflowY: "hidden" }}>

                                                    <div className="receiptCard">
                                                        <div className="receiptResource">
                                                            <div className="receiptTitle"><h5>{event["receiptList"][0]["receiptTitle"]}</h5>  <div>영수증 총 금액 : {sumReceipt(event["receiptList"][0]["receiptContextList"])}</div></div>

                                                            <div>{event["receiptList"][0]["receiptContext"]}</div>

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
                                                                    {event["receiptList"][0]["receiptContextList"].map((item, k) => {
                                                                        return (<tr>
                                                                            <td>{item["context"]}</td>
                                                                            <td>{item["price"]}</td>
                                                                            <td>{item["amount"]}</td>
                                                                            <td>{sumItems(item["price"], item["amount"])}</td>
                                                                        </tr>)
                                                                    })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <img src={receiptImg} alt="receipt" height={"150"} width={"100"} />
                                                    </div>

                                                </div>)
                                                : (<div id="receiptContent" >
                                                    {

                                                        event["receiptList"].map((receipt, j) => {
                                                            return (
                                                                <div className="receiptCard">
                                                                    <div className="receiptResource">
                                                                        <div className="receiptTitle"><h5>{receipt["receiptTitle"]}</h5>  <div>영수증 총 금액 : {sumReceipt(receipt["receiptContextList"])}</div></div>

                                                                        <div>{receipt["receiptContext"]}</div>

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
                                                                                {receipt["receiptContextList"].map((item, k) => {
                                                                                    return (<tr>
                                                                                        <td>{item["context"]}</td>
                                                                                        <td>{item["price"]}</td>
                                                                                        <td>{item["amount"]}</td>
                                                                                        <td>{sumItems(item["price"], item["amount"])}</td>
                                                                                    </tr>)
                                                                                })
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <img src={receiptImg} alt="receipt" height={"150"} width={"100"} />
                                                                </div>

                                                            )
                                                        })
                                                    }
                                                </div>)

                                        }


                                    </div>
                                    <div className="cardImg">
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default MainPage;