import majorlogo from './img/majorlogo.png';
import quarter1 from './img/quarter1.png';
import quarter2 from './img/quarter2.png';
import quarter3 from './img/quarter3.png';
import quarter4 from './img/quarter4.png';
import receiptImg from './img/receipt.png';
import EditProfile from './EditProfile';
import './css/MainPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function MainPage(props) {

    const history = useHistory();

    let answer = {
    "studentPresident": {
        "major": "일어일문학부",
        "name": "홍길동",
        "phoneNumber": "01012345678",
        "email": "PKSCL@pukyon.ac.kr"
    },
    "quarterStatus": {
        "quarter1": "true",
        "quarter2": "true",
        "quarter3": "true",
        "quarter4": "false"
    },
    "quarter": {
        "quarter1": {
            "openDate": "2022-01-01",
            "endDate": "2022-04-04",
            "eventList": [
                {
                    "eventTitle": "cNEeqcwI",
                    "eventContext": "cNEeqcwIjqoDdtwx",
                    "receiptList": [
                        {
                            "receiptTitle": "행사 구매1",
                            "receiptImg": "./img",
                            "receiptContext": "놀기 위해서 구매하였습니다.",
                            "receiptDetailList": [
                                {
                                    "context": "대선",
                                    "price": "2000",
                                    "amount": "3"
                                },
                                {
                                    "context": "대선1",
                                    "price": "20002",
                                    "amount": "322"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "YvgnOLiq",
                            "receiptImg": "./test",
                            "receiptContext": "YvgnOLiqBAGzASig",
                            "receiptDetailList": [
                                {
                                    "context": "대선12",
                                    "price": "223",
                                    "amount": "32"
                                },
                                {
                                    "context": "대선14",
                                    "price": "4421",
                                    "amount": "311"
                                },
                                {
                                    "context": "대선12",
                                    "price": "231",
                                    "amount": "111"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "ZioIqwsF",
                            "receiptImg": "./test",
                            "receiptContext": "ZioIqwsFAwWhgEWc",
                            "receiptDetailList": [
                                {
                                    "context": "대선2",
                                    "price": "200123120",
                                    "amount": "334"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "zOHBqeWp",
                            "receiptImg": "./test",
                            "receiptContext": "zOHBqeWpAqnVIyNM",
                            "receiptDetailList": [
                                {
                                    "context": "대선1",
                                    "price": "200120",
                                    "amount": "352"
                                }
                            ]
                        }
                    ]
                },
                {
                    "eventTitle": "lyauJwqW",
                    "eventContext": "lyauJwqWWUbYOQpj",
                    "receiptList": [{
                            "receiptTitle": "",
                            "receiptImg": "",
                            "receiptContext": "",
                            "receiptdetailList": [
                                {
                                    "context": "",
                                    "price": "",
                                    "amount": ""
                                }
                            ]
                        }]
                },
                {
                    "eventTitle": "biqErvwL",
                    "eventContext": "biqErvwLUjUBxmdi",
                    "receiptList": [{
                            "receiptTitle": "",
                            "receiptImg": "",
                            "receiptContext": "",
                            "receiptdetailList": [
                                {
                                    "context": "",
                                    "price": "",
                                    "amount": ""
                                }
                            ]
                        }]
                },
                {
                    "eventTitle": "RXrezwKu",
                    "eventContext": "RXrezwKufduAwSDH",
                    "receiptList": [{
                            "receiptTitle": "",
                            "receiptImg": "",
                            "receiptContext": "",
                            "receiptdetailList": [
                                {
                                    "context": "",
                                    "price": "",
                                    "amount": ""
                                }
                            ]
                        }]
                }
            ]
        },
        "quarter2": {
            "openDate": "2022-01-01",
            "endDate": "2022-04-05",
            "eventList": [
                {
                    "eventTitle": "sFLcLzeF",
                    "eventContext": "sFLcLzeFNfsHRBSC",
                    "receiptList": [
                        {
                            "receiptTitle": "IfliKTTK",
                            "receiptImg": "./test",
                            "receiptContext": "IfliKTTKQVcAkWtQ",
                            "receiptDetailList": [
                                {
                                    "context": "대선",
                                    "price": "2000",
                                    "amount": "3"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "UBgFjrfx",
                            "receiptImg": "./test",
                            "receiptContext": "UBgFjrfxFOuTWaKd",
                            "receiptDetailList": [{
                                    "context": "",
                                    "price": "",
                                    "amount": ""
                                }]
                        },
                        {
                            "receiptTitle": "WLUXKFBM",
                            "receiptImg": "./test",
                            "receiptContext": "WLUXKFBMjnhMOVOs",
                            "receiptDetailList": [{
                                    "context": "",
                                    "price": "",
                                    "amount": ""
                                }]
                        },
                        {
                            "receiptTitle": "futcdKZl",
                            "receiptImg": "./test",
                            "receiptContext": "futcdKZlUDCoatzV",
                            "receiptDetailList": [{
                                    "context": "",
                                    "price": "",
                                    "amount": ""
                                }]
                        },
                        {
                            "receiptTitle": "jliAdKwk",
                            "receiptImg": "./test",
                            "receiptContext": "jliAdKwkRetxDYyj",
                            "receiptDetailList": [{
                                    "context": "",
                                    "price": "",
                                    "amount": ""
                                }]
                        },
                        {
                            "receiptTitle": "WpFiBquW",
                            "receiptImg": "./test",
                            "receiptContext": "WpFiBquWPqwwpfZT",
                            "receiptDetailList": [{
                                    "context": "",
                                    "price": "",
                                    "amount": ""
                                }]
                        }
                    ]
                },
                {
                    "eventTitle": "anyUUxKH",
                    "eventContext": "anyUUxKHkiHxULkZ",
                    "receiptList": [{
                            "receiptTitle": "",
                            "receiptImg": "",
                            "receiptContext": "",
                            "receiptdetailList": [
                                {
                                    "context": "",
                                    "price": "",
                                    "amount": ""
                                }
                            ]
                        }]
                }
            ]
        }
    }
}

    const [studentPresident, setStudentPresident] = useState();

    const [quarterStatus, setQuarterStatus] = useState()

    const [quarter, setQuarter] = useState()

    const [eventAmount, setEventAmount] = useState([]);
    const [quarterAmount, setQuarterAmount] = useState(0);
    const [currentQuarter, setCurrentQuarter] = useState(props.todayQuarter);
    const [showAllReceiptButton, setShowAllReceiptButton] = useState([]);
    const [editProfileState, setEditProfileState] = useState(false);
    const [openQuarterDate, setOpenQuarterDate] = useState()

    const [major, setMajor] = useState("");
    const [majorList, setMajorList] = useState(["국어국문학과", "영어영문학부", "일어일문학부", "사학과", "경제학부", "법학과", "행정학과", "국제지역학부", "중국학과", "신문방송학과", "정치외교학과", "유아교육과", "시각디자인학과", "공업디자인학과", "패션디자인학과", "경영학부", "국제통상학부", "응용수학과", "통계학과", "물리학과", "화학과", "미생물학과", "해양스포츠학과", "간호학과", "과학시스템시뮬레이션학과", "건축공학과", "건축학과", "소방공학과", "시스템경영공학부", "IT융합응용공학과", "안전공학과", "융합디스플레이공학과", "의공학과", "전기공학과", "전자공학과", "정보통신공학과", "제어계측공학과", "조선해양시스템공학과", "컴퓨터공학과", "토목공학과", "고분자공학과", "공업화학과", "금속공학과", "기계공학과", "기계설계공학과", "기계시스템공학과", "냉동공조공학과", "신소재시스템공학과", "인쇄정보공학과", "재료공학과", "화학공학과", "지속가능공학부", "식품공학과", "해양바이오신소재학과", "해양생산시스템관리학부", "해양수산경영학과", "수해양산업교육과", "자원생물학과", "식품영양학과", "생물공학과", "수산생명의학과", "환경공학과", "해양공학과", "해양학과", "지구환경과학과", "환경대기과학과", "에너지자원공학과", "공간정보시스템공학과", "생태공학과", "데이터정보과학부(빅데이터융합전공)", "데이터정보과학부(통계·데이터사이언스전공)", "미디어커뮤니케이션학부(언론정보전공)", "미디어커뮤니케이션학부(휴먼ICT융합전공)", "스마트헬스케어학부(의공학전공)", "스마트헬스케어학부(해양스포츠전공)", "스마트헬스케어학부(휴먼바이오융합전공)", "전자정보통신공학부(전자공학전공)", "전자정보통신공학부(정보통신공학전공)", "조형학부(건축학전공)", "조형학부(공업디자인전공)", "조형학부(시각디자인전공)", "컴퓨터공학부(소프트웨어·인공지능전공)", "컴퓨터공학부(컴퓨터공학전공)", "평생교육·상담학과", "기계조선융합공학과", "전기전자소프트웨어공학과", "공공안전경찰학과"]);

    function resetShowAllReceiptButton() {
        let resetArray = [];
        if(quarter[currentQuarter]["eventList"] !== undefined){
            for (let i = 0; i < quarter[currentQuarter]["eventList"].length; i++) {
                resetArray.push(true)
            }
            setShowAllReceiptButton(resetArray)
        }
        
    }

    function reset(quarterData) {
        if(quarter !== undefined ){
            console.log("quarter")
            console.log(quarter)
            CalculateCurrentQuarterReceiptSumList(quarter[quarterData]["eventList"]);
            resetShowAllReceiptButton();
            setOpenQuarterDate(quarter[currentQuarter]["openDate"]);
        }
    }

    function showQuarter(quarter) {
        if (quarterStatus[quarter]) {
            setCurrentQuarter(quarter);
            defineColor(quarter);
            reset(quarter);
        } else {
            alert("현재 공개된 장부가 아닙니다 :)")
        }
    }

    function pksclSubmitButton() {
        let payload = { "sclData": { "studentPresident": { ...studentPresident }, "quarterStatus": { ...quarterStatus }, "quarter": { ...quarter } } };
        axios.post('/ledger', payload)
            .then((payload) => {
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarterStatus({ ...payload.data["quarterStatus"] });
                setQuarter({ ...payload.data["quarter"] });
            })
            .catch((error) => {
                alert("학생 전송에 실패했습니다 :)")
            });
    }

    function sumItems(price, amount) {
        return price * amount;
    }

    function sumReceipt(receiptDetailList) {
        let sumReceiptValue = 0;
        console.log(receiptDetailList)
        if(receiptDetailList !== undefined){
            for (let i = 0; i < receiptDetailList.length; i++) {
                let item = receiptDetailList[i];
                sumReceiptValue = sumReceiptValue + sumItems(item["price"], item["amount"]);
            }
        }
        return sumReceiptValue;
    }

    function sumEvent(receiptList) {
        let sumEventValue = 0;
        if(receiptList !== undefined){
            for (let i = 0; i < receiptList.length; i++) {
                let receipt = receiptList[i]["receiptDetailList"];
                sumEventValue = sumEventValue + sumReceipt(receipt);
            }
        }
        return sumEventValue
    }

    function CalculateCurrentQuarterReceiptSumList(eventList) {
        let eventSum = [];
        if(eventList !== undefined){
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

    function setColorProperty(colorQuarter, colorQuarterCircle,colorLeftPanel,colorCard){
            document.documentElement.style.setProperty("--color-quarter", colorQuarter);
            document.documentElement.style.setProperty("--color-quarterCircle", colorQuarterCircle);
            document.documentElement.style.setProperty("--color-leftPanel", colorLeftPanel);
            document.documentElement.style.setProperty("--color-card", colorCard);
    }

    function defineColor(quarter){
        if(quarter === "quarter1"){
            setColorProperty("#db8f8e", "#efbebc", "#f5dede", "#fff5ed");
        }else if(quarter === "quarter2"){
            setColorProperty("#649d67","#cedbcf", "#cedbcf", "#dee7df");
        }else if(quarter === "quarter3"){
            setColorProperty( "#c18356","#efdccd","#e9d8cd", "#fff5ed");
        }else if(quarter === "quarter4"){
            setColorProperty("#6b8396","#d0dbe5", "#d0dbe5", "#e6f1fb");
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

    function adminButton() {
                    return (<>
                        <div className="mainSearchBar" >
                            <input className = "majorList" type="text" list="majorList-options" id='major' name="major" placeholder="학과를 입력하세요."
                        onChange={(e) => {
                        setMajor(majorList.indexOf(e.target.value) + 1);
                        ;}} style={{width : "250px"}}>
                        </input>
                       <datalist id="majorList-options" >
                           {
                             majorList.map((majorName, i) => {
                             return (
                               <option value={majorName} key={i} ></option>
                             )
                           })
                           }
                     </datalist>
                      <button style = {{boxShadow:"0 0 0 white"}} onClick={ ()=>{
                           axios.get(`/ledger/admin/${major}`)
                            .then((payload) => {
                                setStudentPresident({...payload.data["studentPresident"]});
                                setQuarterStatus({...payload.data["quarterStatus"]});
                                setQuarter({...payload.data["quarter"]});
                                setOpenQuarterDate(quarter[currentQuarter]["openDate"])
                                reset(props.todayQuarter);
                            })
                            .catch((error) => {
                                alert("학과 장부 로드 실패.");
                            })
                       }}><i className="fas fa-search"></i></button>
                      </div>
                            </>
                            )
    }

    useEffect(() => {
        if( props.loginPosition === "admin"){
        axios.get('/ledger')
          .then((payload) => {
            setStudentPresident({...payload.data["studentPresident"]});
            setQuarterStatus({...payload.data["quarterStatus"]});
            setQuarter({...payload.data["quarter"]});
            reset(props.todayQuarter);
          })
          .catch((error) => {
            alert("학과 장부를 불러올 수 없습니다.");
             setStudentPresident({...answer["studentPresident"]});
            setQuarterStatus({...answer["quarterStatus"]});
            setQuarter({...answer["quarter"]});
            reset(props.todayQuarter);
          })
         axios.get('/ledger/admin')
                .then((payload) => {
                    setMajorList([...payload.data.majorList]);
                })
                .catch((error) => {
                    alert("학과리스트를 불러올 수 없습니다.");
                })
        }else if( props.loginPosition === "student"){
        axios.get('/ledger')
          .then((payload) => {
            setStudentPresident({...payload.data["studentPresident"]});
            setQuarterStatus({...payload.data["quarterStatus"]});
            setQuarter({...payload.data["quarter"]});
            reset(props.todayQuarter);
          })
          .catch((error) => {
            alert("학과 장부를 불러올 수 없습니다.");
            setStudentPresident({...answer["studentPresident"]});
            setQuarterStatus({...answer["quarterStatus"]});
            setQuarter({...answer["quarter"]});
            reset(props.todayQuarter);
          })
        }
    }, []);


    useEffect(() => {
        // // console.log(document.getElementById("leftPanel")[0].style.position);
        // if (editProfileState) {
        //     document.getElementsByClassName("leftPanel")[0].setProperty("position", "none");
        // } else {

        // }
    }, [editProfileState])

    useEffect(()=>{
        if(quarter !== undefined)
        reset(props.todayQuarter);
    },[quarter])


    return (
        <div className="MainPageContainer">
            {
                editProfileState
                    ?
                    // <EditProfile loginPosition={props.loginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                    <EditProfile loginPosition={"student"} setEditProfileState={setEditProfileState}></EditProfile>
                    : null
            }
                {
                     quarter === undefined
                            ? null
                            :(<>
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
                {
                    props.loginPosition === "student"
                    ? null
                    :(<div className="managementPageBar">
                    <i className="fas fa-chevron-right" onClick={() => { defineColor(props.todayQuarter); history.push('/manage') }}></i>
                </div>)
                }
            </div>

            <div className="rightPanel">

                <div className="nav">
                    <div className="buttons">
                        {
                            props.loginPosition === 'admin'
                            ? adminButton()
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
                                <div className="eventCard" style={{backgroundColor:"white"}}>
                                    <div className="cardContent">
                                        <div className="eventTitle">
                                            <div><h4 >{event["eventTitle"]} </h4>  
                                            <div> 행사 총 금액 : {eventAmount[i]}</div></div>
                                            <div className="eventButtons">
                                            {
                                                event.receiptList !== undefined
                                                ? (event.receiptList.length === 1
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
                                                    ))
                                                : null
                                            }
                                            </div>
                                        </div>

                                        {
                                            showAllReceiptButton[i] === true
                                                ? (<div id="receiptContent" style={{ height: "380px", overflowY: "hidden" }}>

                                                    <div className="receiptCard">
                                                        {
                                                            event["receiptList"][0] !== undefined
                                                            ? (
                                                                <div className="receiptResource">
                                                            
                                                            <div className="receiptTitle"><h5>{event["receiptList"][0]["receiptTitle"]}</h5>  
                                                            <div>영수증 총 금액 : {sumReceipt(event["receiptList"][0]["receiptDetailList"])}</div></div>

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
                                                                    {event["receiptList"][0]["receiptDetailList"]!== undefined
                                                                    ? event["receiptList"][0]["receiptDetailList"].map((item, k) => {
                                                                        return (<tr>
                                                                            <td>{item["context"]}</td>
                                                                            <td>{item["price"]}</td>
                                                                            <td>{item["amount"]}</td>
                                                                            <td>{sumItems(item["price"], item["amount"])}</td>
                                                                        </tr>)
                                                                    })
                                                                    :null
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                            )
                                                            : null
                                                        }
                                                        {
                                                            console.log("hello"),
                                                            console.log(event["receiptList"]),
                                                            console.log(event["receiptList"][0]["receiptImg"])
                                                        }
                                                        <img src={event["receiptList"][0]["receiptImg"]} alt="receipt" height={"150"} width={"100"} />
                                                    </div>

                                                </div>)
                                                : (<div id="receiptContent" >
                                                    {

                                                        event["receiptList"].map((receipt, j) => {
                                                            return (
                                                                <div className="receiptCard">
                                                                    <div className="receiptResource">
                                                                        <div className="receiptTitle"><h5>{receipt["receiptTitle"]}</h5>  <div>영수증 총 금액 : {sumReceipt(receipt["receiptDetailList"])}</div></div>

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
                                                                                {receipt["receiptDetailList"] !== undefined
                                                                                ? (receipt["receiptDetailList"].map((item, k) => {
                                                                                    return (<tr>
                                                                                        <td>{item["context"]}</td>
                                                                                        <td>{item["price"]}</td>
                                                                                        <td>{item["amount"]}</td>
                                                                                        <td>{sumItems(item["price"], item["amount"])}</td>
                                                                                    </tr>)
                                                                                }))
                                                                                :null
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <img src={event["receiptList"][0]["receiptImg"]} alt="receipt" height={"150"} width={"100"} />
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
                         </>
                            )
                }
                

           






        </div>
    )
}

export default MainPage;