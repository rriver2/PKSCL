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

function MainPage(props) {

    const history = useHistory();

    let answer = {
    "studentPresident": {
        "major": "사학과",
        "name": "홍길동",
        "phoneNumber": "01012345678",
        "email": "PKSCL@pukyon.ac.kr"
    },
    "quarter": {
        "quarter1": {
            "status": "false",
            "eventList": [
                {
                    "eventTitle": "oniFaEEE",
                    "eventContext": "oniFaEEEJjqQgeRE",
                    "receiptList": [
                        {
                            "receiptTitle": "mxyfpUJL",
                            "receiptImg": "./test",
                            "receiptContext": "mxyfpUJLUqTCUECN",
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
                                },
                                {
                                    "context": "대선12",
                                    "price": "223",
                                    "amount": "32"
                                },
                                {
                                    "context": "대선14",
                                    "price": "4421",
                                    "amount": "311"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "WkBvlSoH",
                            "receiptImg": "./test",
                            "receiptContext": "WkBvlSoHRXbimqAq",
                            "receiptDetailList": [
                                {
                                    "context": "대선12",
                                    "price": "231",
                                    "amount": "111"
                                },
                                {
                                    "context": "대선2",
                                    "price": "200123120",
                                    "amount": "334"
                                },
                                {
                                    "context": "대선1",
                                    "price": "200120",
                                    "amount": "352"
                                },
                                {
                                    "context": "대선",
                                    "price": "2000",
                                    "amount": "3"
                                }
                            ]
                        },
                        {
                            "receiptTitle": "bJGCyazU",
                            "receiptImg": "./test",
                            "receiptContext": "bJGCyazUvVeBeQJp",
                            "receiptDetailList": []
                        }
                    ]
                }
            ]
        },
        "quarter2": {
            "status": "true",
            "eventList": [
                {
                    "eventTitle": "plAzqFgQ",
                    "eventContext": "plAzqFgQWvKdNagG",
                    "receiptList": [
                        {
                            "receiptTitle": "pJqYikgz",
                            "receiptImg": "./test",
                            "receiptContext": "pJqYikgzCEJmUvHd",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "LHROdIiN",
                            "receiptImg": "./test",
                            "receiptContext": "LHROdIiNGyUjoUQY",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "fHPUOYrB",
                            "receiptImg": "./test",
                            "receiptContext": "fHPUOYrBsrbCYKYM",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "obdNTBcS",
                            "receiptImg": "./test",
                            "receiptContext": "obdNTBcSgHIKDLVF",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "SorFTTNG",
                            "receiptImg": "./test",
                            "receiptContext": "SorFTTNGgdcqKBSy",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "KQWwqFCs",
                            "receiptImg": "./test",
                            "receiptContext": "KQWwqFCsclLmMaXj",
                            "receiptDetailList": []
                        }
                    ]
                },
                {
                    "eventTitle": "RHbkPBIE",
                    "eventContext": "RHbkPBIEBwTsnXIj",
                    "receiptList": []
                }
            ]
        },
        "quarter3": {
            "status": "true",
            "eventList": [
                {
                    "eventTitle": "yeMdfHab",
                    "eventContext": "yeMdfHabcgrnVkht",
                    "receiptList": [
                        {
                            "receiptTitle": "ZXZDjper",
                            "receiptImg": "./test",
                            "receiptContext": "ZXZDjperGRNgjdJn",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "UZcvcbBe",
                            "receiptImg": "./test",
                            "receiptContext": "UZcvcbBeBDkDgric",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "KhlJbXuU",
                            "receiptImg": "./test",
                            "receiptContext": "KhlJbXuUtyYaiAkQ",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "VgvsKLQi",
                            "receiptImg": "./test",
                            "receiptContext": "VgvsKLQiWZxSbGCc",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "TiStGEOc",
                            "receiptImg": "./test",
                            "receiptContext": "TiStGEOcJGfVJynG",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "ZvJbSmcc",
                            "receiptImg": "./test",
                            "receiptContext": "ZvJbSmccgwJpCjFz",
                            "receiptDetailList": []
                        }
                    ]
                },
                {
                    "eventTitle": "KDZaEtQW",
                    "eventContext": "KDZaEtQWBMhKjqyv",
                    "receiptList": [
                        {
                            "receiptTitle": "HeGmdtwh",
                            "receiptImg": "./test",
                            "receiptContext": "HeGmdtwhhQMWMwuE",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "rBNXGenn",
                            "receiptImg": "./test",
                            "receiptContext": "rBNXGennDDsekmMO",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "mxZRHjSu",
                            "receiptImg": "./test",
                            "receiptContext": "mxZRHjSuUXbkTupH",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "NvugNiCX",
                            "receiptImg": "./test",
                            "receiptContext": "NvugNiCXMcGrJAGM",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "tCAJtdQy",
                            "receiptImg": "./test",
                            "receiptContext": "tCAJtdQyGbGdgOzJ",
                            "receiptDetailList": []
                        }
                    ]
                },
                {
                    "eventTitle": "PsokpBqu",
                    "eventContext": "PsokpBqufDlmIcaa",
                    "receiptList": []
                }
            ]
        },
        "quarter4": {
            "status": "false",
            "eventList": [
                {
                    "eventTitle": "fEUMZWzO",
                    "eventContext": "fEUMZWzOgxzcSNmY",
                    "receiptList": []
                }
            ]
        }
    }
}

let answerDate = {   
    "quarter1" : ["2022-01-01", "2022-01-02"],
    "quarter2" : ["2022-01-03", "2022-01-04"],
    "quarter3" : ["2022-01-05", "2022-01-06"],
    "quarter4" : ["2022-01-07", "2022-01-08"]
}

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
        if(quarter[currentQuarter]["eventList"] !== undefined){
       
            for (let i = 0; i < quarter[currentQuarter]["eventList"].length; i++) {
                resetArray.push(true)
            }
        }

        setShowAllReceiptButton(resetArray)
    }

    function reset(quarterData) {
        if(quarter !== undefined){
            CalculateCurrentQuarterReceiptSumList(quarter[quarterData]["eventList"]);
            resetShowAllReceiptButton();
        }
        window.scrollTo(0, 0);
    }

    function showQuarter(selectedQuarter) {
        if(props.loginPosition === "student"){
            if (quarter[selectedQuarter]["status"]==="true") {
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
            } else {
                alert("현재 공개된 장부가 아닙니다 :)")
            }
        }else{
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
        for (let i = 0; i < receiptList.length; i++) {
            let receipt = receiptList[i]["receiptDetailList"];
            sumEventValue = sumEventValue + sumReceipt(receipt);
        }
        return sumEventValue
    }

    function CalculateCurrentQuarterReceiptSumList(eventList) {
        if(eventList === undefined){
            setQuarterAmount(0);
        }else{
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

      function GetDate() {
        axios.get("/ledger-date")
                .then((payload) => {
                    setQuarterDate({...payload.data});
                })
                .catch((error) => {
                    alert("분기별 장부 open, close 날짜를 불러올 수 없습니다.");
                    //지우기
                    setQuarterDate({...answerDate});
                })
    }

        function eventDelectButton() {
        let answer = window.confirm("삭제하면 되돌릴 수 없습니다.");
        if(answer){
            alert("삭제 API추가해야함")
        }else{
            alert("삭제가 취소되었습니다.")
        }
    }

    function eventFixButton() {
        
        alert("수정 API추가해야함")
    }


    useEffect(() => {
        axios.get('/ledger')
          .then((payload) => {
                setStudentPresident({...payload.data["studentPresident"]});
                setQuarter({...payload.data["quarter"]});
                reset(props.todayQuarter);
                GetDate();
                defineColor(props.todayQuarter);
            })
            .catch((error) => {
                alert("학과 장부를 불러올 수 없습니다.");
                //지우기
                console.log(answer)
                setStudentPresident({...answer["studentPresident"]});
                setQuarter({...answer["quarter"]});
                reset(props.todayQuarter);
                GetDate();
                defineColor(props.todayQuarter);
            })   
    }, []);


    useEffect(() => {
        // // console.log(document.getElementById("leftPanel")[0].style.position);
        // if (editProfileState) {
        //     document.getElementsByClassName("leftPanel")[0].setProperty("position", "none");
        // } else {

        // }
    }, [editProfileState])


    useEffect(()=>{
        if(quarter !== undefined){
        reset(currentQuarter);
        }
        
    },[currentQuarter])

    useEffect(()=>{
        if(quarter !== undefined)
        reset(props.todayQuarter);
    },[quarter])



    return (
        <div className="EditMainPageContainer">
        {
            props.loginPosition !== "president"
            ? <div>잘못된 접근입니다.</div>
            :(<>{
                editProfileState
                    ?
                    // <EditProfile loginPosition={props.loginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                    <EditProfile editProfileState={editProfileState} loginPosition={"student"} setEditProfileState={setEditProfileState}></EditProfile>
                    : null
            }
                {
                     quarter === undefined
                            ? null
                            :(<>
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
                    :(<div className="managementPageBar">
                    <i className="fas fa-chevron-right" onClick={() => { defineColor(props.todayQuarter); history.push('/manage') }}></i>
                </div>)
                }
            </div>
    {/* rightPanel */}
            <div className="rightPanel">
                <div className="nav">
                    <div className="buttons">
                        {
                            console.log(quarterDate)
                        }
                    {
                                    quarterDate !== undefined 
                                    ?(
                                        <>장부 공개일 : <input className="dateInput" type={"date"} value={quarterDate[currentQuarter][0]}
                                onChange={(e)=>{
                                    let tempDateArray = {...quarterDate}
                                    tempDateArray[currentQuarter][0] = e.target.value;
                                    setQuarterDate(tempDateArray)
                                    }}
                                ></input>~
                                <input className="dateInput" type={"date"} value={quarterDate[currentQuarter][1]}
                                style={{marginLeft:"10px"}}
                                onChange={(e)=>{
                                    let tempDateArray = {...quarterDate}
                                    tempDateArray[currentQuarter][1] = e.target.value;
                                    setQuarterDate(tempDateArray)
                                    }}
                                ></input></>
                                    )
                                    : null
                            }
                        <button className='submitButton' type='button' onClick={() => {  history.push('/main')  }}>학생 입장 장부 확인</button>
                        <button className='submitButton' type='button' onClick={() => { setEditProfileState(true); }}>프로필 편집</button>
                        <button className='submitButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                    </div>
                </div>

                {/* 장부 */}
                <div style={{display:"flex"}}>
                <div className="quarterData">
                    <h2 className="quarterTotalAmount">
                        {currentQuarter[currentQuarter.length - 1]}분기 총 금액 : {quarterAmount}원
                    </h2>
                    {
                        quarter[currentQuarter]["eventList"] === undefined
                        ? <div>입력된 행사가 없습니다.</div>
                        :(quarter[currentQuarter]["eventList"].map((event, i) => {
                            return (
                                <div className="eventCard" >
                                    <div className="cardContent">
                                        <div className="eventSource">
                                            <div><div className="eventTitle"><h4 >{event["eventTitle"]}</h4>  <div>행사 총 금액 : {eventAmount[i]}원</div></div> 
                                            <div>{event["eventContext"]}  </div></div>
                                            <div className="eventButtons">
                                            <button onClick={() => { eventDelectButton();}} style={{marginRight:"15px"}}> 행사 삭제 </button>
                                            {
                                                fixEventButton[i] === true
                                                ?<button onClick={() => { 
                                                    let array = [...fixEventButton];
                                                    array[i] = !fixEventButton[i];
                                                    eventFixButton(); setFixEventButton(array)
                                                }} style={{marginRight:"15px"}}> 행사 수정 완료 </button>
                                                :<button onClick={() => { 
                                                    let array = [...fixEventButton];
                                                    array[i] = !fixEventButton[i];
                                                    setFixEventButton(array)
                                                }} style={{marginRight:"15px"}}> 행사 수정 </button>
                                            }
                                            {
                                                event.receiptList.length <= 1
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
                                        </div>

                                        {
                                            showAllReceiptButton[i] === true
                                                ? (<div id="receiptContent" style={{ height: "380px", overflowY: "hidden" }}>

                                                    <div className="receiptCard">
                                                        <div className="receiptResource">
                                                            {
                                                                event["receiptList"].length === 0
                                                                ? <div>입력된 영수증이 없습니다.</div>
                                                                :(<>
                                                                    <div className="receiptTitle"><h5>{event["receiptList"][0]["receiptTitle"]}</h5> 
                                                                    {
                                                                        event["receiptList"][0]["receiptDetailList"].length === 0 
                                                                        ?null
                                                                        :(<div>1번째 영수증 금액 : {sumReceipt(event["receiptList"][0]["receiptDetailList"])}원</div>)
                                                                    }
                                                            </div>

                                                            <div>{event["receiptList"][0]["receiptContext"]}</div>

                                                            
                                                                
                                                                    {
                                                                        event["receiptList"][0]["receiptDetailList"].length===0
                                                                        ? <div className="noneContext"> 입력된 영수증 내역이 없습니다.</div>
                                                                        :(<><table className="receiptTable"><thead>
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
                                                        <img src={event["receiptList"][0]["receiptImg"]} style={{backgroundColor: "var(--color-leftPanel)"}} alt={event["receiptList"][0]["receiptImg"]} height={"150"} width={"100"} />
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
                                                                            :(<>
                                                                        <div className="receiptTitle"><h5>{receipt["receiptTitle"]}</h5>
                                                                        {
                                                                            receipt["receiptDetailList"].length === 0
                                                                            ?null
                                                                            : <div>{j+1}번째 영수증 금액 : {sumReceipt(receipt["receiptDetailList"])}원</div>
                                                                        }
                                                                        </div>
                                                                        <div>{receipt["receiptContext"]}</div>
                                                                            {
                                                                                receipt["receiptDetailList"].length === 0
                                                                                ? <div>입력된 영수증 내역이 없습니다.</div>
                                                                                :(<>
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
                                                                        : <img src={receipt["receiptImg"]} alt={receipt["receiptImg"]} style={{backgroundColor: "var(--color-leftPanel)"}} height={"150"} width={"100"} />
                                                                    }
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
                        )
                    }
                        <div style={{marginBottom:"40px", display:"flex", justifyContent: "center"}}>
                            <button className = "editButton" onClick={() => {alert("행사추가 API 추가해야함")}} > 행사 추가 </button>
                        </div>
                </div>
                {/* 장부 */}

                {/* 2 */}
                            <div className="remotePanel">
                                <div className="remotePanelBox">
                                    <div>
                                        <h5>행사 목록</h5>
                                        {
                                            quarter[currentQuarter]["eventList"]=== undefined
                                            ? (<div>입력된 행사가 없습니다.</div>)
                                            :(<>{
                                                quarter[currentQuarter]["eventList"].map((event, i) => {
                                                return (<div>{event["eventTitle"]}</div>)
                                            })
                                            }
                                            </>)
                                        }
                                        <div style={{color:"#d32c2c"}}>
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
            
                
        </div>
    )
}

export default MainPage;