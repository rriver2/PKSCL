import { useState } from 'react';
import { Navbar, Container} from 'react-bootstrap';
import './ManagementPage.css';
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

function ManagementPage(){
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
        }
    ]);

    const [refusal,setRefusal] = useState([]);
    const [approval,setApproval] = useState([{  
        "stdID" : "b11111111",
         "name" : "name1"
      } ,
      { 
         "stdID" : "b22222222",
         "name" : "name2"
      },
      {
         "stdID" : "b33333333",
         "name" : "name3"
      },
      {
        "stdID" : "b44444444",
        "name" : "name4"
     },
     {
        "stdID" : "b5555555",
        "name" : "name5"
     }]);

     const [leftTable, setLeftTable] = useState([...waiting]);
     const [rightTable, setRightTable] = useState([...approval]);

     const [leftCheckedList, setLeftCheckedList] = useState([]);
     const [rightCheckedList, setRightCheckedList] = useState([]);

     const changeHandler = (checked, id, setPlace, place) => {
       if (checked) {
        setPlace([...place, id]);
       } else {
         setPlace(place.filter((e) => e !== id));
       }
       console.log(checked)
     };

    const [searchStudent, setSearchStudent] = useState("");
    const [searchButton, setSearchButton] = useState("search");

    function postStudent(studentStatus){
        let payload;
        if(studentStatus === "approval" || studentStatus === "refusal" ){
            payload = leftCheckedList;
        }else{
            payload = rightCheckedList;
        }
        axios.post('/student-list/' + studentStatus, payload)
        .then((payload) => {
          console.log("payload"+payload);
        })
        .catch((error) => {
          alert("학생 전송에 실패했습니다 :)")

        });
    }

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
                                console.log(leftTable);
                                setLeftTable([...waiting]);
                                setRightTable([...approval]);
                            }else{
                                if(searchStudent=== ""){
                                    alert("검색명을 입력해주세요 :)");
                                }else{
                                    setSearchButton("x");

                                    console.log(":"+e.target.value);
                            
                                    let left = waiting.filter((item) => (item.name.includes(searchStudent)||item.stdID.includes(searchStudent)));
                                    let right = approval.filter((item) => (item.name.includes(searchStudent)||item.stdID.includes(searchStudent)));
        
                                    console.log(left);
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
                                console.log("승인")
                                setLeftCheckedList([]);
                                if(leftCheckedList.length > 0){
                                    postStudent("approval");
                                }else{
                                    alert("승인할 학생을 1명 이상 선택하세요 :)")
                                }
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
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={"3"}>승인대기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leftTable.length === 0
                                ?   <tr>
                                        <td colSpan={"3"}>승인대기 학생이 없습니다.</td>
                                    </tr>
                                :leftTable.map((student,i)=>{
                                    return(
                                        <tr key={i}>
                                            <td>{student.stdID}</td>
                                            <td>{student.name}</td>
                                            <td><input 
                                                    id= {student}
                                                    type="checkbox" 
                                                    onChange={(e)=>{
                                                    changeHandler(e.currentTarget.checked, student ,setLeftCheckedList,leftCheckedList)
                                                    }}
                                                    checked={leftCheckedList.includes(student) ? true : false}
                                            /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className = "pagenation">
                        <button><i className="fas fa-chevron-left"></i></button>
                            <button className= "pagenationItem">{2}</button>
                            <button className= "pagenationItem">{3}</button>
                            <button className= "pagenationItem" style={{color : "black"}}>{4}</button>
                            <button className= "pagenationItem">{5}</button>
                            <button className= "pagenationItem">{6}</button>
                        <button><i className="fas fa-chevron-right"></i></button>
                    </div>
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
                                <th colSpan={"3"}>승인완료</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            leftTable.length === 0
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
                    </table>
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
        </div>
    )
}

export default ManagementPage;