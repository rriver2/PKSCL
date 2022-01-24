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


    function patchStudent(studentStatus){
        let payload;
        if(studentStatus === "approval" || studentStatus === "refusal" ){
            payload = {
            "studentStatus" : studentStatus,
            "stdIDApproval" : leftCheckedList
        };
        }else if(studentStatus === "delegating" || studentStatus === "waiting" ){
            payload = {
            "studentStatus" : studentStatus,
            "stdIDApproval" : rightCheckedList
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
    )
}

export default ManagementPage;