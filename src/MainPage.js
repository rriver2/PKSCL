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
 "quarter1": {
"status": "true",
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
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "WLUXKFBM",
                            "receiptImg": "./test",
                            "receiptContext": "WLUXKFBMjnhMOVOs",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "futcdKZl",
                            "receiptImg": "./test",
                            "receiptContext": "futcdKZlUDCoatzV",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "jliAdKwk",
                            "receiptImg": "./test",
                            "receiptContext": "jliAdKwkRetxDYyj",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "WpFiBquW",
                            "receiptImg": "./test",
                            "receiptContext": "WpFiBquWPqwwpfZT",
                            "receiptDetailList":  [
                                            {
                                                "context": "마이쮸",
                                                "price": "3000",
                                                "amount": "3"
                                            }
                                        ]
                        }
                    ]
                },
                 {
                    "eventTitle": "Hi",
                    "eventContext": "hi",
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
                        }]
                },
                 {
                    "eventTitle": "anyUUxKH",
                    "eventContext": "anyUUxKHkiHxULkZ",
                    "receiptList": [
                        {
                            "receiptTitle": "IfliKTTK",
                            "receiptImg": "./test",
                            "receiptContext": "IfliKTTKQVcAkWtQ",
                            "receiptDetailList": [
                            ]
                        },{
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
                        },{
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
                        }]
                },
                {
                    "eventTitle": "anyUUxKH",
                    "eventContext": "anyUUxKHkiHxULkZ",
                    "receiptList": []
                }
            ]
},
 "quarter2": {
"status": "true",
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
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "WLUXKFBM",
                            "receiptImg": "./test",
                            "receiptContext": "WLUXKFBMjnhMOVOs",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "futcdKZl",
                            "receiptImg": "./test",
                            "receiptContext": "futcdKZlUDCoatzV",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "jliAdKwk",
                            "receiptImg": "./test",
                            "receiptContext": "jliAdKwkRetxDYyj",
                            "receiptDetailList": []
                        },
                        {
                            "receiptTitle": "WpFiBquW",
                            "receiptImg": "./test",
                            "receiptContext": "WpFiBquWPqwwpfZT",
                            "receiptDetailList": []
                        }
                    ]
                },
                {
                    "eventTitle": "anyUUxKH",
                    "eventContext": "anyUUxKHkiHxULkZ",
                    "receiptList": []
                }
            ]
},
  "quarter3": {
"status": "false",
},
  "quarter4":{
"status": "false",
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
    function resetShowAllReceiptButton() {
        let resetArray = [];
        for (let i = 0; i < quarter[currentQuarter]["eventList"].length; i++) {
            resetArray.push(true)
        }
        setShowAllReceiptButton(resetArray)
    }

    function reset(quarterData) {
        if(quarter !== undefined){
            CalculateCurrentQuarterReceiptSumList(quarter[quarterData]["eventList"]);
            resetShowAllReceiptButton();
        }
    }

    function showQuarter(selectedQuarter) {
        if(props.loginPosition === "student"){
            if (quarter[selectedQuarter]["status"]==="true") {
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
                reset(selectedQuarter);
            } else {
                alert("현재 공개된 장부가 아닙니다 :)")
            }
        }else{
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
                reset(selectedQuarter);
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

    function adminButton() {
        if (majorList=== undefined){
            return;
        }else{
                    return (<>
                        <div className="mainSearchBar" >
                            <input className = "majorList" 
                            type="text" list="majorList-options" id='major' name="major" placeholder="학과를 입력하세요."
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
                                setQuarter({...payload.data["quarter"]});
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
    }

    function adminGetLedger(ledgerMajor) {
        axios.get(`/ledger/admin?${ledgerMajor}`)
                .then((payload) => {
                    setStudentPresident({...payload.data["studentPresident"]});
                    let Quarter = {"quarter1":payload.data["quarter1"],"quarter2":payload.data["quarter2"],"quarter3":payload.data["quarter3"],"quarter4":payload.data["quarter4"]}
                    setQuarter({...Quarter});
                    reset(props.todayQuarter);
                })
                .catch((error) => {
                    alert("학과 장부를 불러올 수 없습니다.");
                    setStudentPresident({...answer["studentPresident"]});
                    let Quarter = {"quarter1":answer["quarter1"],"quarter2":answer["quarter2"],"quarter3":answer["quarter3"],"quarter4":answer["quarter4"]}
                    setQuarter({...Quarter});
                    reset(props.todayQuarter);
                })
    }

    function adminGetDate(ledgerMajor) {
        axios.get(`/ledger-date?${ledgerMajor}`)
                .then((payload) => {
                    setQuarterDate({...payload.data});
                })
                .catch((error) => {
                    alert("분기별 장부 open, close 날짜를 불러올 수 없습니다.");
                    setQuarterDate({...answerDate});
                })
    }

    useEffect(() => {
        if( props.loginPosition === "admin"){
            let ledgerMajor;
                axios.get('https://pkscl.kro.kr/major-list')
                    .then((payload) => {
                        setMajorList([...payload.data["majorList"]]);
                         if(major === undefined){
                            let ledgerMajorList =[...payload.data["majorList"]];
                            ledgerMajor = (ledgerMajorList.indexOf("컴퓨터공학과") + 1);
                            adminGetLedger(ledgerMajor);
                            adminGetDate(ledgerMajor);
                         }else{
                             adminGetLedger(major);
                             adminGetDate(major);
                         }
                    })
                    .catch((error) => {
                        alert("학과리스트를 불러올 수 없습니다.");
                    })
                
        }else if( props.loginPosition === "student"){
        axios.get('/ledger')
          .then((payload) => {
            setStudentPresident({...payload.data["studentPresident"]});
            let Quarter = {"quarter1":payload.data["quarter1"],"quarter2":payload.data["quarter2"],"quarter3":payload.data["quarter3"],"quarter4":payload.data["quarter4"]}
            setQuarter({...Quarter});
            reset(props.todayQuarter);
          })
          .catch((error) => {
            alert("학과 장부를 불러올 수 없습니다.");
            setStudentPresident({...answer["studentPresident"]});
            let Quarter = {"quarter1":answer["quarter1"],"quarter2":answer["quarter2"],"quarter3":answer["quarter3"],"quarter4":answer["quarter4"]}
            setQuarter({...Quarter});
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
                    <EditProfile editProfileState={editProfileState} loginPosition={"student"} setEditProfileState={setEditProfileState}></EditProfile>
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
                            quarterDate !== undefined
                            ?(props.loginPosition === "admin"
                                ? (<><div className="dateInput">{quarterDate[currentQuarter][0]}~{quarterDate[currentQuarter][1]}</div> {adminButton()}</>)
                                : null)
                            :null
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
                        quarter[currentQuarter]["eventList"] === undefined
                        ? <div>입력된 행사가 없습니다.</div>
                        :(quarter[currentQuarter]["eventList"].map((event, i) => {
                            return (
                                <div className="eventCard" >
                                    <div className="cardContent">
                                        <div className="eventSource">
                                            <div><div className="eventTitle"><h4 >{event["eventTitle"]}</h4>  <div>행사 총 금액 : {eventAmount[i]}</div></div> 
                                            <div>{event["eventContext"]}  </div></div>
                                            <div className="eventButtons">
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
                                                                        event["receiptList"][0]["receiptDetailList"] === undefined
                                                                        ?null
                                                                        :(<div>1번째 영수증 금액 : {sumReceipt(event["receiptList"][0]["receiptDetailList"])}</div>)
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
                                                        <img src={receiptImg} alt="receipt" height={"150"} width={"100"} />
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
                                                                            : <div>{j+1}번째 영수증 금액 : {sumReceipt(receipt["receiptDetailList"])}</div>
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
                        )
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