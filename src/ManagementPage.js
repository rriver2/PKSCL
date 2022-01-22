import { useEffect, useState } from 'react';
import { Navbar, Container} from 'react-bootstrap';
import './css/ManagementPage.css';
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

function ManagementPage(props){
    const history = useHistory();
    const [waiting,setWaiting] = useState([
        {  
            "stdID" : "a111111111",
            "name" : "이름1"
        } ,
        { 
            "stdID" : "a22222222",
            "name" : "이름2"
        },
        {
            "stdID" : "a33333333",
            "name" : "이름3"
        },
        {  
            "stdID" : "a111111111",
            "name" : "이름1"
        } ,
        { 
            "stdID" : "a22222222",
            "name" : "이름2"
        },
        {
            "stdID" : "a33333333",
            "name" : "이름3"
        },
        {  
            "stdID" : "a111111111",
            "name" : "이름1"
        } ,
        { 
            "stdID" : "a22222222",
            "name" : "이름2"
        },
        {
            "stdID" : "a33333333",
            "name" : "이름3"
        },
        {  
            "stdID" : "a111111111",
            "name" : "이름1"
        } ,
        { 
            "stdID" : "a22222222",
            "name" : "이름2"
        },
        {
            "stdID" : "a33333333",
            "name" : "이름3"
        }
    ]);

    const [refusal,setRefusal] = useState([]);
    const [approval,setApproval] = useState([{  
        "stdID" : "b11111111",
         "name" : "1이름"
      } ,
      { 
         "stdID" : "b22222222",
         "name" : "2이름"
      },
      {
         "stdID" : "b33333333",
         "name" : "3이름"
      },
      {
        "stdID" : "b44444444",
        "name" : "4이름"
     },
     {
        "stdID" : "b5555555",
        "name" : "5이름"
     },
    {  
        "stdID" : "b11111111",
         "name" : "1이름"
      } ,
      { 
         "stdID" : "b22222222",
         "name" : "2이름"
      },
      {
         "stdID" : "b33333333",
         "name" : "3이름"
      },
      {
        "stdID" : "b44444444",
        "name" : "4이름"
     },
     {
        "stdID" : "b5555555",
        "name" : "5이름"
     },
    {  
        "stdID" : "b11111111",
         "name" : "1이름"
      } ,
      { 
         "stdID" : "b22222222",
         "name" : "2이름"
      },
      {
         "stdID" : "b33333333",
         "name" : "3이름"
      },
      {
        "stdID" : "b44444444",
        "name" : "4이름"
     },
     {
        "stdID" : "b5555555",
        "name" : "5이름"
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


    function postStudent(studentStatus){
        let payload;
        if(studentStatus === "approval" || studentStatus === "refusal" ){
            payload = leftCheckedList;
        }else if(studentStatus === "delegating" || studentStatus === "waiting" ){
            payload = rightCheckedList;
        }else{
            alert("error!");
        }
        axios.post('/student-list/' + studentStatus, payload)
        .then((payload) => {
          setWaiting([...payload.data.studentPresidentList.waiting]);
          setRefusal([...payload.data.studentPresidentList.refusal]);
          setApproval([...payload.data.studentPresidentList.approval]);
        })
        .catch((error) => {
          alert("학생 전송에 실패했습니다 :)")
        });
    }

    useEffect(() => {
    axios.get('/student-list')
      .then((payload) => {
        setWaiting([...payload.data.studentPresidentList.waiting]);
        setRefusal([...payload.data.studentPresidentList.refusal]);
        setApproval([...payload.data.studentPresidentList.approval]);
      })
      .catch((error) => {
        alert("학과리스트를 불러올 수 없습니다.");
      })
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
                        }} 
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
                                    postStudent("approval");
                                }
                                setLeftCheckedList([]);
                            }}>승인</button> 
                        <button className='submitButton' onClick={()=>{
                                console.log("거절")
                                setLeftCheckedList([]);
                                if(leftCheckedList.length > 0){
                                    postStudent("refusal");
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
                        <tbody className = "tableList" style={{borderBottomRightRadius:"20px", borderBottomLeftRadius:"20px"}}>
                            {
                                leftTable.length === 0
                                ?   <tr>
                                        <td colSpan={"3"} style={{borderBottomRightRadius:"20px", borderBottomLeftRadius:"20px"}}>승인대기 학생이 없습니다.</td>
                                    </tr>
                                :leftTable.map((student,i)=>{
                                    return(
                                        i === leftTable.length -1
                                        ?(
                                            <tr key={i}>
                                            <td style={{borderBottomLeftRadius:"20px"}}>{student.stdID}</td>
                                            <td>{student.name}</td>
                                            <td style={{borderBottomRightRadius:"20px"}}><input 
                                                    id= {student}
                                                    type="checkbox" 
                                                    onChange={(e)=>{
                                                    changeHandler(e.target.checked, student ,setLeftCheckedList,leftCheckedList)
                                                    }}
                                                    checked={leftCheckedList.includes(student) ? true : false}
                                            /></td>
                                        </tr>
                                        )
                                        :(
                                            <tr key={i}>
                                            <td >{student.stdID}</td>
                                            <td>{student.name}</td>
                                            <td ><input 
                                                    id= {student}
                                                    type="checkbox" 
                                                    onChange={(e)=>{
                                                    changeHandler(e.target.checked, student ,setLeftCheckedList,leftCheckedList)
                                                    }}
                                                    checked={leftCheckedList.includes(student) ? true : false}
                                            /></td>
                                        </tr>
                                        )
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className='tableSet'>
                    <div className= "buttons">
                        <button className='submitButton' style={{width : "110px"}} onClick={()=>{
                                if(rightCheckedList.length === 1){
                                    setRightCheckedList([]);
                                    postStudent("delegating");
                                }else{
                                    alert("학생회장 위임은 한명만 가능합니다.");
                                }
                            }}>회장권한위임</button> 
                        <button className='submitButton' onClick={()=>{
                                setRightCheckedList([]);
                                if(rightCheckedList.length > 0){
                                    postStudent("waiting");
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
                        <tbody className = "tableList" style={{borderBottomRightRadius:"20px", borderBottomLeftRadius:"20px"}}>
                        {
                            rightTable.length === 0
                                ?   <tr>
                                        <td colSpan={"3"}>승인완료 학생이 없습니다.</td>
                                    </tr>
                                :rightTable.map((student,i)=>{
                                    return(
                                        i === rightTable.length -1
                                        ?(
                                        <tr key={i}>
                                            <td style={{borderBottomLeftRadius:"20px"}}>{student.stdID}</td>
                                            <td>{student.name}</td>
                                            <td style={{borderBottomRightRadius:"20px"}}><input 
                                                    id= {student}
                                                    type="checkbox" 
                                                    onChange={(e)=>{
                                                    changeHandler(e.currentTarget.checked, student ,setRightCheckedList,rightCheckedList)
                                                    }}
                                                    checked={rightCheckedList.includes(student) ? true : false}
                                            /></td>
                                        </tr>
                                        )
                                        :(
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
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManagementPage;