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


function EditMainPage(props) {

    const history = useHistory();

    let answer = {
        "studentPresident":{
        "major": "컴퓨터공학과",
        "name": "홍길동",
        "phoneNumber": "01012345678",
        "email": "PKSCL@pukyong.ac.kr"
    },"quarterStatus":{
            "quarter1": true,
            "quarter2": true,
            "quarter3": true,
            "quarter4": false
        },
"quarter":
        {
        "quarter1": {
            "openDate": "2020-03-03",
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
            "openDate": "2022-06-23",
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
            "openDate": "2022-08-12",
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
            "openDate": "2022-12-30",
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
    
    const [fixEventButton, setFixEventButton] = useState([]);

    function resetButtons() {
        let ResetReceiptArray = [];
        let ResetFixEventArray = [];
        for (let i = 0; i < quarter[currentQuarter]["eventList"].length; i++) {
            ResetReceiptArray.push(true)
            ResetFixEventArray.push(false)
        }
        setShowAllReceiptButton(ResetReceiptArray)
        setFixEventButton(ResetFixEventArray)
    }

    function reset(quarterData) {
        if(quarter !== undefined ){
            console.log("quarter")
            console.log(quarter)
            CalculateCurrentQuarterReceiptSumList(quarter[quarterData]["eventList"]);
            resetButtons();
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

    function eventDelectButton() {
        let answer = window.confirm("삭제하면 되돌릴 수 없습니다.");
        if(answer){
            alert("삭제 API추가해야함")
        }else{
            alert("삭제가 취소되었습니다.")
        }
    }

    function eventFixButton() {
        let payload = { "studentPresident": { ...studentPresident }, "quarterStatus": { ...quarterStatus }, "quarter": { ...quarter } };
        // axios.post('/main', payload)
        //     .then((payload) => {
        //         setStudentPresident({ ...payload.data["studentPresident"] });
        //         setQuarterStatus({ ...payload.data["quarterStatus"] });
        //         setQuarter({ ...payload.data["quarter"] });
        //     })
        //     .catch((error) => {
        //         alert("학생 전송에 실패했습니다 :)")
        //     });
        alert("수정 API추가해야함")
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
        if (props.loginPosition === "president"){
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
        <div className="EditMainPageContainer">
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
                        {
                            props.loginPosition === "president"
                                ? (<><input className="dateInput" type={"date"} value={openQuarterDate}
                                onChange={(e)=>{setOpenQuarterDate(e.target.value)}}
                                ></input></>)
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
                                            <div><h4 >{event["eventTitle"]} </h4>  
                                            <div> 행사 총 금액 : {eventAmount[i]}</div></div>
                                            <div className="eventButtons">
                                            <button onClick={() => { eventDelectButton();}} style={{marginRight:"15px"}}> 행사 삭제 </button>
                                            {
                                                fixEventButton[i] === true
                                                ?<button onClick={() => { 
                                                    let array = [...fixEventButton];
                                                    array[i] = !fixEventButton[i];
                                                    eventFixButton(); setFixEventButton(array)
                                                }} style={{marginRight:"15px"}}> 완료 </button>
                                                :<button onClick={() => { 
                                                    let array = [...fixEventButton];
                                                    array[i] = !fixEventButton[i];
                                                    setFixEventButton(array)
                                                }} style={{marginRight:"15px"}}> 수정 </button>
                                            }
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
                                        </div>

                                        {
                                            showAllReceiptButton[i] === true
                                                ? (<div id="receiptContent" style={{ height: "380px", overflowY: "hidden" }}>

                                                    <div className="receiptCard">
                                                        <div className="receiptResource">
                                                            <div className="receiptTitle"><h5>{event["receiptList"][0]["receiptTitle"]}</h5>  
                                                            <div>영수증 총 금액 : {sumReceipt(event["receiptList"][0]["receiptContextList"])}</div></div>

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
                                                        <img src={event["receiptList"][0]["receiptImg"]} alt="receipt" height={"150"} width={"100"} />
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
                    <div style={{marginBottom:"40px", display:"flex", justifyContent: "center"}}>
                    <button className = "editButton" onClick={() => {}} > 행사 추가 </button>
                    </div>
                        </div>
                         </div>
                          <div className="remotePanel">
                              <div className="remotePanelBox">
                              <div>
                            {
                                quarter[currentQuarter]["eventList"].map((event, i) => {
                                    return (<div>{event["eventTitle"]}</div>)
                                })
                            }
                            </div>
                            </div>
                        </div>
                         </>
                            )
                }
        </div>
    )
}

export default EditMainPage;