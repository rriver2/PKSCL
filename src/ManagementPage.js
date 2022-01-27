import { useEffect, useState } from 'react';
import { Navbar, Container} from 'react-bootstrap';
import './css/ManagementPage.css';
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

function ManagementPage(props){
    const history = useHistory();
    const [waiting,setWaiting] = useState([
        {  
        "stdID": "11111",
                "name": "이름",
                "email": "1@gmail.com",
                "studentImgPath": "20220121010016994.png"
      } ,
      { 
         "stdID": "31321312",
                "name": "이름",
                "email": "2@gmail.com",
                "studentImgPath": "20220121010016994.png"
      },
      {
         "stdID": "123442",
                "name": "이름",
                "email": "3@gmail.com",
                "studentImgPath": "20220121010016994.png"
      },
      {
       "stdID": "32442423",
                "name": "이름",
                "email": "4@gmail.com",
                "studentImgPath": "20220121010016994.png"
     },
     {
         "stdID": "123442",
                "name": "이름",
                "email": "5@gmail.com",
                "studentImgPath": "20220121010016994.png"
     },
    {  
       "stdID": "123442",
                "name": "이름",
                "email": "6@gmail.com",
                "studentImgPath": "20220121010016994.png"
      } ,
      { 
         "stdID": "32423423",
                "name": "이름",
                "email": "7@gmail.com",
                "studentImgPath": "20220121010016994.png"
      },
      {
         "stdID": "123442",
                "name": "이름",
                "email": "8@gmail.com",
                "studentImgPath": "20220121010016994.png"
      }
    ]);

    const [refusal,setRefusal] = useState([]);
    const [approval,setApproval] = useState([{  
        "stdID": "123442",
                "name": "이름",
                "email": "11@gmail.com",
                "studentImgPath": "20220121010016994.png"
      } ,
      { 
         "stdID": "32423423",
                "name": "이름",
                "email": "12@gmail.com",
                "studentImgPath": "20220121010016994.png"
      },
      {
         "stdID": "32423423",
                "name": "이름",
                "email": "13@gmail.com",
                "studentImgPath": "20220121010016994.png"
      },
      {
       "stdID": "123442",
                "name": "이름",
                "email": "14@gmail.com",
                "studentImgPath": "20220121010016994.png"
     },
     {
         "stdID": "123442",
                "name": "이름",
                "email": "15@gmail.com",
                "studentImgPath": "20220121010016994.png"
     },
    {  
       "stdID": "123442",
                "name": "이름",
                "email": "16@gmail.com",
                "studentImgPath": "20220121010016994.png"
      } ,
      { 
         "stdID": "123442",
                "name": "이름",
                "email": "17@gmail.com",
                "studentImgPath": "20220121010016994.png"
      },
      {
         "stdID": "123442",
                "name": "이름",
                "email": "18@gmail.com",
                "studentImgPath": "20220121010016994.png"
      },
      {
        "stdID": "123442",
                "name": "이름",
                "email": "19@gmail.com",
                "studentImgPath": "20220121010016994.png"
     },
     {
        "stdID": "123442",
                "name": "이름",
                "email": "20@gmail.com",
                "studentImgPath": "20220121010016994.png"
     },
    {  
        "stdID": "123442",
                "name": "이름",
                "email": "21@gmail.com",
                "studentImgPath": "20220121010016994.png"
      } ,
      { 
         "stdID": "123442",
                "name": "이름",
                "email": "22@gmail.com",
                "studentImgPath": "20220121010016994.png"
      },
      {
         "stdID": "123442",
                "name": "이름",
                "email": "23@gmail.com",
                "studentImgPath": "20220121010016994.png"
      },
      {
        "stdID": "123442",
                "name": "이름",
                "email": "24@gmail.com",
                "studentImgPath": "20220121010016994.png"
     },
     {
        "stdID": "123442",
                "name": "이름",
                "email": "25@gmail.com",
                "studentImgPath": "20220121010016994.png"
     }]);
     const [leftTable, setLeftTable] = useState([...waiting]);
     const [rightTable, setRightTable] = useState([...approval]);

     const [leftCheckedList, setLeftCheckedList] = useState([]);
     const [rightCheckedList, setRightCheckedList] = useState([]);

     const changeHandler = (checked, studentInfo, setCheckedList, checkedList) => {
       if (checked) {
        setCheckedList([...checkedList, studentInfo]);
       } else {
        setCheckedList(checkedList.filter((e) => e !== studentInfo));
       }
       console.log(checked)
     };

    const [searchStudent, setSearchStudent] = useState("");
    const [searchButton, setSearchButton] = useState("search");
    const [major, setMajor] = useState("");
    const [majorList, setMajorList] = useState(["국어국문학과", "영어영문학부", "일어일문학부", "사학과", "경제학부", "법학과", "행정학과", "국제지역학부", "중국학과", "신문방송학과", "정치외교학과", "유아교육과", "시각디자인학과", "공업디자인학과", "패션디자인학과", "경영학부", "국제통상학부", "응용수학과", "통계학과", "물리학과", "화학과", "미생물학과", "해양스포츠학과", "간호학과", "과학시스템시뮬레이션학과", "건축공학과", "건축학과", "소방공학과", "시스템경영공학부", "IT융합응용공학과", "안전공학과", "융합디스플레이공학과", "의공학과", "전기공학과", "전자공학과", "정보통신공학과", "제어계측공학과", "조선해양시스템공학과", "컴퓨터공학과", "토목공학과", "고분자공학과", "공업화학과", "금속공학과", "기계공학과", "기계설계공학과", "기계시스템공학과", "냉동공조공학과", "신소재시스템공학과", "인쇄정보공학과", "재료공학과", "화학공학과", "지속가능공학부", "식품공학과", "해양바이오신소재학과", "해양생산시스템관리학부", "해양수산경영학과", "수해양산업교육과", "자원생물학과", "식품영양학과", "생물공학과", "수산생명의학과", "환경공학과", "해양공학과", "해양학과", "지구환경과학과", "환경대기과학과", "에너지자원공학과", "공간정보시스템공학과", "생태공학과", "데이터정보과학부(빅데이터융합전공)", "데이터정보과학부(통계·데이터사이언스전공)", "미디어커뮤니케이션학부(언론정보전공)", "미디어커뮤니케이션학부(휴먼ICT융합전공)", "스마트헬스케어학부(의공학전공)", "스마트헬스케어학부(해양스포츠전공)", "스마트헬스케어학부(휴먼바이오융합전공)", "전자정보통신공학부(전자공학전공)", "전자정보통신공학부(정보통신공학전공)", "조형학부(건축학전공)", "조형학부(공업디자인전공)", "조형학부(시각디자인전공)", "컴퓨터공학부(소프트웨어·인공지능전공)", "컴퓨터공학부(컴퓨터공학전공)", "평생교육·상담학과", "기계조선융합공학과", "전기전자소프트웨어공학과", "공공안전경찰학과"]);
    const [selectMajor, setSelectMajor] = useState(true);

    function patchStudent(studentStatus){
        let payload;
        if(studentStatus === "approval" || studentStatus === "refusal" ){
            payload = {
            "status" : studentStatus,
            "email" : leftCheckedList
        };
        }else if(studentStatus === "delegating" || studentStatus === "waiting" ){
            payload = {
            "status" : studentStatus,
            "email" : rightCheckedList
        };
        }else{
            alert("error!");
        }


        if(props.loginPosition === "president"){
            axios.patch('/student-list', payload)
            .then((payload) => {
                setWaiting([...payload.data["studentPresidentList"]["waiting"]]);
                setRefusal([...payload.data["studentPresidentList"]["refusal"]]);
                setApproval([...payload.data["studentPresidentList"]["approval"]]);
            })
            .catch((error) => {
            alert("학생 전송에 실패했습니다 :)")
            });
        }else if(props.loginPosition === "admin"){
            axios.patch('/president-list', payload)
            .then((payload) => {
                setWaiting([...payload.data["studentPresidentList"]["waiting"]]);
                setRefusal([...payload.data["studentPresidentList"]["refusal"]]);
                setApproval([...payload.data["studentPresidentList"]["approval"]]);
            })
            .catch((error) => {
            alert("학생 전송에 실패했습니다 :)")
            });
        }
    }

    useEffect(() => {
        if(props.loginPosition === "president"){
            axios.get('/student-list')
            .then((payload) => {
                setWaiting([...payload.data["studentPresidentList"]["waiting"]]);
                setRefusal([...payload.data["studentPresidentList"]["refusal"]]);
                setApproval([...payload.data["studentPresidentList"]["approval"]]);
            })
            .catch((error) => {
        alert("학과리스트를 불러올 수 없습니다.");
            });
        }else if(props.loginPosition === "admin"){
            axios.get('/president-list')
            .then((payload) => {
                setWaiting([...payload.data["studentPresidentList"]["waiting"]]);
                setRefusal([...payload.data["studentPresidentList"]["refusal"]]);
                setApproval([...payload.data["studentPresidentList"]["approval"]]);
            })
            .catch((error) => {
        alert("학과리스트를 불러올 수 없습니다.");
            });
        }
    }, []);
  

    return(
        <div className="ManagementPageContainer">
            <div className="pageContainer">
            <Navbar expand="lg" style={{padding: "30px 0"}}>
                <Container fluid style={{justifyContent: "center", backgroundColor: "none"}}>
                    <h2 style={{margin : "0"}}>학생승인 현황</h2>
                    <div className="searchBar" >
                        <input onChange={(e) => { 
                            setSearchStudent(e.target.value); 
                            setSearchButton("search");
                            if(e.target.value === ""){
                                setSearchButton("search");
                                setLeftTable([...waiting]);
                                setRightTable([...approval]);
                            }
                        } } 
                            name="q" value={searchStudent} type="search" placeholder="Search" ></input>
                            
                        <button onClick={(e) => {
                            if( searchButton === "x"){
                                setSearchStudent("");
                                setSearchButton("search");
                                setLeftTable([...waiting]);
                                setRightTable([...approval]);
                            }else{
                                if(searchStudent=== ""){
                                    alert("검색명을 입력해주세요 :)");
                                }else{
                                    setSearchButton("x");
                            
                                    let left = waiting.filter((item) => (item.name.includes(searchStudent)||item.stdID.includes(searchStudent)));
                                    let right = approval.filter((item) => (item.name.includes(searchStudent)||item.stdID.includes(searchStudent)));

                                    setLeftTable(left);
                                    setRightTable(right);
                                }
                                
                            }
                        }}
                        
                            className='searchButton' type='button'>
                                {
                                searchButton === "search"
                                ?<i className="fas fa-search"></i>
                                :<i className="fas fa-times"></i>
                                }
                                </button>
                    </div>
                    {/* {
                    selectMajor === false
                    ? (
                       <input type="text" list="majorList-options" id='major' name="major" placeholder="학과를 입력하세요."
                        onChange={(e) => {
                          setMajor(majorList.indexOf(e.target.value) + 1);
                        //   if (majorList.includes(e.target.value)) {
                        //     changeIsCorrect(3, true);
                        //   } else {
                        //     changeIsCorrect(3, false);
                        //   }
                        },setSelectMajor(true)}></input>
                    //   <datalist id="majorList-options" >
                    //       {
                    //         majorList.map((majorName, i) => {
                    //         return (
                    //           <option value={majorName} key={i} ></option>
                    //         )
                    //       })
                    //       }
                         
                    // </datalist>
                    )
                    : (<button onClick={ ()=>{{}
                        axios.get('/major-list')
                        .then((payload) => {
                            setMajorList([...payload.data.majorList]);
                        })
                        .catch((error) => {
                            alert("학과리스트를 불러올 수 없습니다.");
                        })
                        } }> </button>) 
                     } */}
                    
                </Container>
            </Navbar>
            <div className='tables'>
                <div className='tableSet'>
                    <div className= "buttons">
                        <button className='submitButton' onClick={()=>{
                                if(leftCheckedList.length === 0){
                                    alert("승인할 학생을 1명 이상 선택하세요 :)")
                                }else{
                                    patchStudent("approval");
                                }
                                setLeftCheckedList([]);
                            }}>승인</button> 
                        <button className='submitButton' onClick={()=>{
                                console.log("거절")
                                setLeftCheckedList([]);
                                if(leftCheckedList.length > 0){
                                    patchStudent("refusal");
                                }else{
                                    alert("거절할 학생을 1명 이상 선택하세요 :)")
                                }
                            }}>거절</button>
                    </div>
                    <table >
                        <thead>
                            <tr >
                                <th colSpan={"3"} style={{borderTopRightRadius:"20px", borderTopLeftRadius:"20px"}}>승인대기</th>
                            </tr>
                        </thead>
                        <div className="tableRadius" style={{borderBottomRightRadius:"20px", borderBottomLeftRadius:"20px"}}>
                        <tbody className = "tableList" style={{borderBottomRightRadius:"20px", borderBottomLeftRadius:"20px"}}>
                            {
                                leftTable.length === 0
                                ?   <tr>
                                        <td colSpan={"3"}>승인대기 학생이 없습니다.</td>
                                    </tr>
                                :leftTable.map((student,i)=>{
                                    console.log(student["email"])
                                    return(
                                            <tr key={i}>
                                            <td >{student.stdID}</td>
                                            <td>{student.name}</td>
                                            <td ><input 
                                                    id= {student}
                                                    type="checkbox" 
                                                    onChange={(e)=>{
                                                    changeHandler(e.target.checked, student["email"] ,setLeftCheckedList,leftCheckedList)
                                                    }}
                                                    checked={leftCheckedList.includes(student["email"]) ? true : false}
                                            /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                            </div>
                    </table>
                </div>

                <div className='tableSet'>
                    <div className= "buttons">
                        <button className='submitButton' style={{width : "110px"}} onClick={()=>{
                                if(rightCheckedList.length === 1){
                                    setRightCheckedList([]);
                                    patchStudent("delegating");
                                }else{
                                    alert("학생회장 위임은 한명만 가능합니다.");
                                }
                            }}>회장권한위임</button> 
                        <button className='submitButton' onClick={()=>{
                                setRightCheckedList([]);
                                if(rightCheckedList.length > 0){
                                    patchStudent("waiting");
                                }
                            }}
                        >대기</button>
                    </div>
                     <table>
                        <thead>
                            <tr>
                                <th colSpan={"3"} style={{borderTopRightRadius:"20px", borderTopLeftRadius:"20px"}}>승인완료</th>
                            </tr>
                        </thead>
                        <div className="tableRadius" style={{borderBottomRightRadius:"20px", borderBottomLeftRadius:"20px"}}>
                        <tbody className = "tableList" style={{borderBottomRightRadius:"20px", borderBottomLeftRadius:"20px"}}>
                        {
                            rightTable.length === 0
                                ?   <tr>
                                        <td colSpan={"3"}>승인완료 학생이 없습니다.</td>
                                    </tr>
                                :rightTable.map((student,i)=>{
                                    return(
                                            <tr key={i}>
                                            <td>{student.stdID}</td>
                                            <td>{student.name}</td>
                                            <td><input 
                                                    id= {student}
                                                    type="checkbox" 
                                                    onChange={(e)=>{
                                                    changeHandler(e.currentTarget.checked, student ,setRightCheckedList,rightCheckedList)
                                                    }}
                                                    checked={rightCheckedList.includes(student) ? true : false}
                                            /></td>
                                        </tr>
                                        
                                    )
                                })
                            }
                        </tbody>
                        </div>
                    </table>
                </div>
            </div>
            </div>
            <div className="managementPageBar">
                    <i className="fas fa-chevron-left" onClick={()=>{history.push('/main') }}></i>
            </div>
           
        </div>

        
    )
}

export default ManagementPage;