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
        "major": "사학과",
        "name": "홍길동",
        "phoneNumber": "01012345678",
        "email": "PKSCL@pukyon.ac.kr"
    },
    "quarter": {
        "quarter1": {
            "status": "false"
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
            "status": "false"
        }
    }
}

let answerDate = {   
    "quarter1" : ["2022-01-01", "2022-01-02"],
    "quarter2" : ["2022-01-03", "2022-01-04"],
    "quarter3" : ["2022-01-05", "2022-01-06"],
    "quarter4" : ["2022-01-07", "2022-01-08"]
}

let answerMajorList = {"majorList":["기린학과","국어국문학과","영어영문학부","일어일문학부","사학과","경제학부","법학과","행정학과","국제지역학부","중국학과","신문방송학과","정치외교학과","유아교육과","시각디자인학과","공업디자인학과","패션디자인학과","경영학부","국제통상학부","응용수학과","통계학과","물리학과","화학과","미생물학과","해양스포츠학과","간호학과","과학시스템시뮬레이션학과","건축공학과","건축학과","소방공학과","시스템경영공학부","IT융합응용공학과","안전공학과","융합디스플레이공학과","의공학과","전기공학과","전자공학과","정보통신공학과","제어계측공학과","조선해양시스템공학과","컴퓨터공학과","토목공학과","고분자공학과","공업화학과","금속공학과","기계공학과","기계설계공학과","기계시스템공학과","냉동공조공학과","신소재시스템공학과","인쇄정보공학과","재료공학과","화학공학과","지속가능공학부","식품공학과","해양바이오신소재학과","해양생산시스템관리학부","해양수산경영학과","수해양산업교육과","자원생물학과","식품영양학과","생물공학과","수산생명의학과","환경공학과","해양공학과","해양학과","지구환경과학과","환경대기과학과","에너지자원공학과","공간정보시스템공학과","생태공학과","데이터정보과학부(빅데이터융합전공)","데이터정보과학부(통계·데이터사이언스전공)","미디어커뮤니케이션학부(언론정보전공)","미디어커뮤니케이션학부(휴먼ICT융합전공)","스마트헬스케어학부(의공학전공)","스마트헬스케어학부(해양스포츠전공)","스마트헬스케어학부(휴먼바이오융합전공)","전자정보통신공학부(전자공학전공)","전자정보통신공학부(정보통신공학전공)","조형학부(건축학전공)","조형학부(공업디자인전공)","조형학부(시각디자인전공)","컴퓨터공학부(소프트웨어·인공지능전공)","컴퓨터공학부(컴퓨터공학전공)","평생교육·상담학과","기계조선융합공학과","전기전자소프트웨어공학과","공공안전경찰학과"]}

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
        if(quarter !== undefined && quarter[quarterData]["eventList"] !== undefined){
            CalculateCurrentQuarterReceiptSumList(quarter[quarterData]["eventList"]);
            resetShowAllReceiptButton();
        }
        window.scrollTo(0, 0);
    }

    function showQuarter(selectedQuarter) {
        if(props.loginPosition === "student" || props.loginPosition === "president"){
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

    function adminButton() {
        if (majorList === undefined){
            return;
        }else{
                    return (<>
                        <div className="mainSearchBar" >
                            <input className = "majorList" 
                            type="text" list="majorList-options" id='major' name="major" placeholder="학과를 입력하세요."
                            onChange={(e) => {
                            setMajor(e.target.value);
                            ;}} 
                            style={{width : "250px"}}
                            onKeyPress={(e)=>{
                                if(e.key === "Enter"){
                                    adminGetLedger(major);
                                }
                            }}
                            value={major}
                            >
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
            } else if((majorList.includes(ledgerMajor))){
                let findMajorIndex = majorList.indexOf(ledgerMajor) + 1
                getAdminLedger(findMajorIndex);
                adminGetDate(findMajorIndex);
                setMajor("");
                setSearchButton("search");
            } else{
                alert("해당하는 학과가 없습니다 다시 검색해주세요:)");
            }
        }
    }

    function getAdminLedger(findMajorIndex) {
        axios.get(`/ledger/admin?${findMajorIndex}`)
            .then((payload) => {
                setStudentPresident({...payload.data["studentPresident"]});
                setQuarter({...payload.data["quarter"]});
                reset(props.todayQuarter);
                showQuarter(props.todayQuarter);
            })
            .catch((error) => {
                if(major === undefined){
                alert(`컴퓨터공학과 장부를 불러올 수 없습니다.`);
                    }else{
                alert(`${major} 장부를 불러올 수 없습니다.`);
                    }
                //지우기
                setStudentPresident({...answer["studentPresident"]});
                setQuarter({...answer["quarter"]});
                reset(props.todayQuarter);
                showQuarter(props.todayQuarter);
            })                                                                                                                       
                                                                    
    }

    function adminGetDate(findMajorIndex) {
        axios.get(`/ledger-date?${findMajorIndex}`)
                .then((payload) => {
                    setQuarterDate({...payload.data});
                    showQuarter(props.todayQuarter);
                })
                .catch((error) => {
                    if(major === undefined){
                        alert(`컴퓨터공학과의 장부 open, close 날짜를 불러올 수 없습니다.`);
                    }else{
                        alert(`${major}의 장부 open, close 날짜를 불러올 수 없습니다.`);
                    }
                    setQuarterDate({...answerDate});
                    showQuarter(props.todayQuarter);
                })
    }

    useEffect(() => {
        if( props.loginPosition === "admin"){
            let ledgerMajor;
                axios.get('/major-list')
                    .then((payload) => {
                        setMajorList([...payload.data["majorList"]]);
                         if(major === undefined){
                            let ledgerMajorList =[...payload.data["majorList"]];
                            ledgerMajor = (ledgerMajorList.indexOf("컴퓨터공학과") + 1);
                            getAdminLedger(ledgerMajor);
                            adminGetDate(ledgerMajor);
                            defineColor(props.todayQuarter);
                         }else{
                             getAdminLedger(major);
                             adminGetDate(major);
                             defineColor(props.todayQuarter);
                         }
                    })
                    .catch((error) => {
                        alert("학과리스트를 불러올 수 없습니다.");
                        //지우기
                        let ledgerMajorList =[...answerMajorList["majorList"]];
                        setMajorList(ledgerMajorList);
                        if(major === undefined){
                            ledgerMajor = (ledgerMajorList.indexOf("컴퓨터공학과") + 1);
                            getAdminLedger(ledgerMajor);
                            adminGetDate(ledgerMajor);
                            defineColor(props.todayQuarter);
                         }else{
                            getAdminLedger(major);
                            adminGetDate(major);
                            defineColor(props.todayQuarter);
                         }
                    })
                
        }else if( props.loginPosition === "student" || props.loginPosition === "president"){
        axios.get('/ledger')
          .then((payload) => {
            setStudentPresident({...payload.data["studentPresident"]});
            setQuarter({...payload.data["quarter"]});
            reset(props.todayQuarter);
            defineColor(props.todayQuarter);
          })
          .catch((error) => {
            alert("학과 장부를 불러올 수 없습니다.");
            //지우기
            setStudentPresident({...answer["studentPresident"]});
            setQuarter({...answer["quarter"]});
            reset(props.todayQuarter);
            defineColor(props.todayQuarter);
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
        if(quarter !== undefined){
        reset(currentQuarter);
        }
        
    },[currentQuarter])

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
                    <div style={{color:"#d32c2c"}}>※ 학과의 장부를 외부로 유출 시 발생하는 문제의 책임은 학생 본인에게 있습니다.</div>
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
                                ? (<>
                                <div className="dateInput">{quarterDate[currentQuarter][0]}~{quarterDate[currentQuarter][1]}</div> 
                                {adminButton()}</>)
                                : null)
                            :null
                        }
                        {
                            props.loginPosition === "president"
                            ? (<><div style={{color:"red"}}>현재 {studentPresident["major"]} 학생들에게 공개된 장부 입니다. </div>
                            <button className='submitButton' style = {{width:"130px"}}type='button' onClick={() => { history.push('/edit-main') }}>장부 수정 페이지</button> 
                                </>)
                            : null
                        }
                        <button className='submitButton' type='button' onClick={() => { setEditProfileState(true); }}>프로필 편집</button>
                        <button className='submitButton' type='button' onClick={() => { logout(); }}>로그아웃</button>
                    </div>
                </div>
                        {
                            props.loginPosition === "admin" || quarter[currentQuarter]["status"]==="true"
                            ?(<>
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
                                </div>
                            </>)
                            : <div className="quarterData" style={{color: "red"}}>
                                현재 학생회장이 공개한 장부가 아닙니다. <br/>장부의 예시를 보고싶다면 아래 버튼을 눌러보시겡나?????
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