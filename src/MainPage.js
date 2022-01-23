import majorlogo from './img/majorlogo.png';
import quarter1 from './img/quarter1.png';
import quarter2 from './img/quarter2.png';
import quarter3 from './img/quarter3.png';
import quarter4 from './img/quarter4.png';
import receipt from './img/receipt.png';

import './css/MainPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function MainPage(props){

    const [studentPresident,setStudentPresident] = useState( {
	 "major" : "컴퓨터공학과",
	 "name" : "홍길동",
	 "phoneNumber" : "01012345678",
	 "email" : "PKSCL@pukyong.ac.kr"
      });
    const [quarterStatus,setQuarterStatus] = useState(
        {
            "quarter1": true,
            "quarter2": true,
            "quarter3": false,
            "quarter4": false
      }
    )

    const [ quarter, setQuarter] = useState({
         "quarter1" : {
  "openDate" : "2020/06/03",
  "eventList" : [
    {
    "eventContext":"벚꽃축제",
     "receiptList" : [
       {
         "receiptContext" : "부경마트",
         "receiptImg" : "이미지경로",
         "receiptContextList" : [
            {
              "context":"진로",
              "price":"1000",
              "amount":"4"
            },
            {
              "context":"참이슬",
              "price":"1000",
              "amount":"5"
            },
            {
              "context":"양파",
              "price":"1000",
              "amount":"4"
            },
             {
              "context":"돼지고기",
              "price":"1000",
              "amount":"1"
            }
          ]
       },
       {
         "receiptContext" : "부경마트",
         "receiptImg" : "이미지경로",
         "receiptContextList" : [
            {
              "context":"진로",
              "price":"1000",
              "amount":"4"
            },
            {
              "context":"참이슬",
              "price":"1000",
              "amount":"5"
            },
            {
              "context":"양파",
              "price":"1000",
              "amount":"4"
            },
             {
              "context":"돼지고기",
              "price":"1000",
              "amount":"1"
            }
          ]
       },
       {
         "receiptContext" : "부경마트",
         "receiptImg" : "이미지경로",
         "receiptContextList" : [
            {
              "context":"진로",
              "price":"1000",
              "amount":"4"
            },
            {
              "context":"참이슬",
              "price":"1000",
              "amount":"5"
            },
            {
              "context":"양파",
              "price":"1000",
              "amount":"4"
            },
             {
              "context":"돼지고기",
              "price":"1000",
              "amount":"1"
            }
          ]
       },
       {
          "receiptContext" : "사진인화이벤트재료구매",
          "receiptImg" : "이미지경로",
          "receiptContextList" : [
            {
              "context":"필름",
              "price":"1000",
              "amount":"5"
            }
          ]
        }
      ]
    },
    {
      "eventContext":"중간고사응원",
      "receiptList" : [
        {
          "receiptContext" : "카카오톡기프티콘",
          "receiptImg" : "이미지경로",
          "receiptContextList" : [
             {
               "context":"폴라로이드(1등)",
               "price":"1000",
               "amount":"1"
             },
             {
               "context":"치킨(2등)",
               "price":"1000",
               "amount":"3"
             },
             {
               "context":"베스킨라빈스(3등)",
               "price":"1000",
               "amount":"4"
             }
           ]
        }
      ]
    },{
      "eventContext":"중간고사응원",
      "receiptList" : [
        {
          "receiptContext" : "카카오톡기프티콘",
          "receiptImg" : "이미지경로",
          "receiptContextList" : [
             {
               "context":"폴라로이드(1등)",
               "price":"1000",
               "amount":"1"
             },
             {
               "context":"치킨(2등)",
               "price":"1000",
               "amount":"3"
             },
             {
               "context":"베스킨라빈스(3등)",
               "price":"1000",
               "amount":"4"
             }
           ]
        }
      ]
    }
  ]
                    },
        "quarter2" : {
  "openDate" : "2분기 공개 일자",
  "eventList" : [
    {
    "eventContext":"벚꽃축제",
     "receiptList" : [
       {
         "receiptContext" : "부경마트",
         "receiptImg" : "이미지경로",
         "receiptContextList" : [
            {
              "context":"진로",
              "price":"2000",
              "amount":"4"
            },
            {
              "context":"참이슬",
              "price":"2000",
              "amount":"5"
            },
            {
              "context":"양파",
              "price":"2000",
              "amount":"4"
            },
             {
              "context":"돼지고기",
              "price":"2000",
              "amount":"1"
            }
          ]
       },
       {
          "receiptContext" : "사진인화이벤트재료구매",
          "receiptImg" : "이미지경로",
          "receiptContextList" : [
            {
              "context":"필름",
              "price":"2000",
              "amount":"5"
            }
          ]
        }
      ]
    },
    {
      "eventContext":"중간고사응원",
      "receiptList" : [
        {
          "receiptContext" : "카카오톡기프티콘",
          "receiptImg" : "이미지경로",
          "receiptContextList" : [
             {
               "context":"폴라로이드(1등)",
               "price":"2000",
               "amount":"1"
             },
             {
               "context":"치킨(2등)",
               "price":"2000",
               "amount":"3"
             },
             {
               "context":"베스킨라빈스(3등)",
               "price":"2000",
               "amount":"4"
             }
           ]
        }
      ]
    }
  ]
                    },
                    "quarter3" : {
  "openDate" : "3분기 공개 일자",
  "eventList" : [
    {
    "eventContext":"벚꽃축제",
     "receiptList" : [
       {
         "receiptContext" : "부경마트",
         "receiptImg" : "이미지경로",
         "receiptContextList" : [
            {
              "context":"진로",
              "price":"3000",
              "amount":"4"
            },
            {
              "context":"참이슬",
              "price":"3000",
              "amount":"5"
            },
            {
              "context":"양파",
              "price":"3000",
              "amount":"4"
            },
             {
              "context":"돼지고기",
              "price":"3000",
              "amount":"1"
            }
          ]
       },
       {
          "receiptContext" : "사진인화이벤트재료구매",
          "receiptImg" : "이미지경로",
          "receiptContextList" : [
            {
              "context":"필름",
              "price":"3000",
              "amount":"5"
            }
          ]
        }
      ]
    },
    {
      "eventContext":"중간고사응원",
      "receiptList" : [
        {
          "receiptContext" : "카카오톡기프티콘",
          "receiptImg" : "이미지경로",
          "receiptContextList" : [
             {
               "context":"폴라로이드(1등)",
               "price":"3000",
               "amount":"1"
             },
             {
               "context":"치킨(2등)",
               "price":"3000",
               "amount":"3"
             },
             {
               "context":"베스킨라빈스(3등)",
               "price":"3000",
               "amount":"4"
             }
           ]
        }
      ]
    }
  ]
                    },
                    "quarter4" : {
  "openDate" : "4분기 공개 일자",
  "eventList" : [
    {
    "eventContext":"벚꽃축제",
     "receiptList" : [
       {
         "receiptContext" : "부경마트",
         "receiptImg" : "이미지경로",
         "receiptContextList" : [
            {
              "context":"진로",
              "price":"4000",
              "amount":"4"
            },
            {
              "context":"참이슬",
              "price":"4000",
              "amount":"5"
            },
            {
              "context":"양파",
              "price":"4000",
              "amount":"4"
            },
             {
              "context":"돼지고기",
              "price":"4000",
              "amount":"1"
            }
          ]
       },
       {
          "receiptContext" : "사진인화이벤트재료구매",
          "receiptImg" : "이미지경로",
          "receiptContextList" : [
            {
              "context":"필름",
              "price":"4000",
              "amount":"5"
            }
          ]
        }
      ]
    },
    {
      "eventContext":"중간고사응원",
      "receiptList" : [
        {
          "receiptContext" : "카카오톡기프티콘",
          "receiptImg" : "이미지경로",
          "receiptContextList" : [
             {
               "context":"폴라로이드(1등)",
               "price":"4000",
               "amount":"1"
             },
             {
               "context":"치킨(2등)",
               "price":"4000",
               "amount":"3"
             },
             {
               "context":"베스킨라빈스(3등)",
               "price":"4000",
               "amount":"4"
             }
           ]
        }
      ]
    }
  ]
                    }

                })

    const [currentQuarter, setCurrentQuarter] = useState("quarter1");
    useEffect(() => {
    // axios.get('/main')
    //   .then((payload) => {
    //     setStudentPresident({...payload["studentPresident"]});
    //     setQuarterStatus({...payload["quarterStatus"]});
    //     setQuarter({...payload["quarter"]});
    //   })
    //   .catch((error) => {
    //     alert("학과 장부를 불러올 수 없습니다.");
    //   })
    CalculateCurrentQuarterReceiptSumList(quarter[currentQuarter]["eventList"]);
    }, []);

    useEffect(()=>{
        CalculateCurrentQuarterReceiptSumList(quarter[currentQuarter]["eventList"]);
        defineColor(currentQuarter)
    },[currentQuarter])

function pksclSubmitButton() {
    let payload = {"sclData":{"studentPresident":{...studentPresident}},"quarterStatus":{...quarterStatus},"quarter":{...quarter}};
    axios.post('/main', payload)
            .then((payload) => {
                setStudentPresident({...payload["studentPresident"]});
                setQuarterStatus({...payload["quarterStatus"]});
                setQuarter({...payload["quarter"]});
            })
            .catch((error) => {
            alert("학생 전송에 실패했습니다 :)")
            });
}

    function sumItems(price,amount) {
        return price * amount;
    }

    function sumReceipt(receiptContextList) {
        let sumReceiptValue = 0;
        for(let i = 0 ; i< receiptContextList.length ; i++){
            let item = receiptContextList[i];
            sumReceiptValue = sumReceiptValue + sumItems(item["price"],item["amount"]);
        }
    return sumReceiptValue;
}

    function sumEvent(receiptList) {
        let sumEventValue = 0;
         for(let i = 0 ; i< receiptList.length ; i++){
            let receipt = receiptList[i]["receiptContextList"];
            sumEventValue= sumEventValue+sumReceipt(receipt);
        }
        return sumEventValue
    }
 const [eventAmount, setEventAmount] = useState([]);
    const [quarterAmount, setQuarterAmount] = useState(0);


function CalculateCurrentQuarterReceiptSumList(eventList) {
    let eventSum = [];
        for(let i = 0 ; i< eventList.length;i++){
                eventSum.push(sumEvent(eventList[i]["receiptList"]));
        }
    setEventAmount([...eventSum]);

    let quarterSum = 0;
        for(let i = 0 ; i< eventSum.length;i++){
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
            setColorProperty("#c89034", "linear-gradient(0deg, rgba(200, 144, 52, 1) 0%, rgba(213, 178, 121, 1) 67%", "#f2e3d7", "#fff5ed");
        }else if(quarter === "quarter2"){
            setColorProperty("#578e5a","linear-gradient(0deg, rgba(87,142,90,1) 0%, rgba(126,199,130,1) 67%)", "#cedbcf", "#dee7df");
        }else if(quarter === "quarter3"){
            setColorProperty( "#9b4346","linear-gradient(0deg, rgba(155,67,70,1) 0%, rgba(231,140,145,1) 67%)","#e6bdbd", "#f3dddd");
        }else if(quarter === "quarter4"){
            setColorProperty("#597082","linear-gradient(0deg, rgba(89,112,130,1) 0%, rgba(145,186,217,1) 67%)", "#d0dbe5", "#e6f1fb");
        }
    }

    return(
        <div className="MainPageContainer">
            <div className="leftPanel">
                <div className="majorCard">
                    <div className = "presidentCard">
                        <h2>{studentPresident["major"]}</h2>
                        <p> 온라인 장부 입니다. </p>
                        <img src={majorlogo} alt="majorlogo" height={"150"} width={"10"}/>
                        <h3>{studentPresident["name"]}</h3>
                        <p>{studentPresident["phoneNumber"]}</p>
                        <p>{studentPresident["email"]}</p>
                    </div>
                    <div className = "cogExplanation">
                    안녕하세요 {studentPresident["major"]} 회장 {studentPresident["name"]}입니다. 
                    PKCOG 온라인 장부를 통해 학과 장부를 분기별로 확인하세요 :) 
                    장부 확인 중 문의 사항이 있으시다면 이메일로 연락주십시오.
                    </div> 
                </div>
                <div className="quarter">
                    <img src={quarter1} alt="quarter1" onClick={()=>{setCurrentQuarter("quarter1")}}/>
                    <img src={quarter2} alt="quarter2" onClick={()=>{setCurrentQuarter("quarter2")}}/>
                    <img src={quarter3} alt="quarter3" onClick={()=>{setCurrentQuarter("quarter3")}}/>
                    <img src={quarter4} alt="quarter4" onClick={()=>{setCurrentQuarter("quarter4")}}/>
                </div>
                <div className="managementPageBar">
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>

            <div className="rightPanel">
                <div className="nav">
                    <div className= "buttons">
                        {
                            props.loginPosition==="president"
                            ? <button className='submitButton' onClick={()=>{pksclSubmitButton();}}> 장부 수정 완료</button> 
                            : null
                        }
                        <button className='submitButton'>프로필 편집</button> 
                        <button className='submitButton'>로그아웃</button>
                    </div>
                </div>
                <div className="quarterData">
                    <h2 className="quarterTotalAmount">
                        {currentQuarter[currentQuarter.length-1]}분기 총 금액 : {quarterAmount}
                    </h2>
                    {
                        
                        quarter[currentQuarter]["eventList"].map((event,i)=>{
                            return (
                                <div key = {i} className="eventCard">
                                     <div className="cardContent">
                                    <h4> {event["eventContext"]} </h4> 
                                    
                                    <div> 행사 총 금액 : {eventAmount[i]}</div>
                                    <div className="receiptContent">
                                        {
                                            event["receiptList"].map((receipt,j)=>{
                                                return (
                                                    <>
                                                    <h5 key = {j}>{receipt["receiptContext"]}</h5>
                                                    <div> 영수증 총 금액 : {sumReceipt(receipt["receiptContextList"])}</div>
                                                    
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
                                                            {receipt["receiptContextList"].map((item,k)=>{
                                                                    return(<tr>
                                                                    <td key = {k}>{item["context"]}</td>
                                                                    <td>{item["price"]}</td>
                                                                    <td>{item["amount"]}</td>
                                                                    <td>{sumItems(item["price"],item["amount"])}</td>
                                                                </tr>)
                                                            })
                                                            }
                                                        </tbody>
                                                    </table>
                                                    </>
                                                )
                                            })
                                        }
                                        
                                    </div>
                            </div>
                            <div className="cardImg">
                                    <img src={receipt} alt="receipt" height={"150"} width={"10"}/>
                                    <div className = "pagenation">
                                        <button><i className="fas fa-chevron-left"></i></button>
                                            <button className= "pagenationItem">{4}</button>
                                            <button className= "pagenationItem">{5}</button>
                                            <button className= "pagenationItem" style={{color : "black"}}>{6}</button>
                                            <button className= "pagenationItem">{7}</button>
                                            <button className= "pagenationItem">{8}</button>
                                        <button><i className="fas fa-chevron-right"></i></button>
                                    </div>
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