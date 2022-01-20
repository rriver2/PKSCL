import { useState } from 'react';
import { Navbar, Container, Form, FormControl,NavDropdown,Pagination} from 'react-bootstrap';
import './ManagementPage.css';

function ManagementPage(){

    const [waiting,setWaiting] = useState([
        {  
            "studentID" : "1111111111",
            "name" : "대기1"
        } ,
        { 
            "studentID" : "222222222",
            "name" : "대기2"
        },
        {
            "studentID" : "333333333",
            "name" : "대기3"
        }
    ]);

    const [refusal,setRefusal] = useState([]);
    const [approval,setApproval] = useState([{  
        "studentID" : "111111111",
         "name" : "승인1"
      } ,
      { 
         "studentID" : "222222222",
         "name" : "승인2"
      },
      {
         "studentID" : "222222222",
         "name" : "승인3"
      },
      {
        "studentID" : "222222222",
        "name" : "승인4"
     },
     {
        "studentID" : "222222222",
        "name" : "승인5"
     }]);

     const [leftTable, setLeftTable] = useState([...waiting]);
     const [rightTable, setRightTable] = useState([...approval]);

     const [leftCheckedList, setLeftCheckedList] = useState([]);
     const [rightCheckedList, setRightCheckedList] = useState([]);

     const changeHandler = (checked, id, setPlace, place) => {
       if (checked) {
        setPlace([...place, id]);
       } else {
         // 체크 해제
         setPlace(place.filter((e) => e !== id));
       }
       console.log(checked)
     };

    const [searchStudent, setSearchStudent] = useState("");
    const [searchKinds,setSearchKinds] = useState("");
    const [searchstudentList, setSearchStudentList] = useState([]);
    const [searchButton, setSearchButton] = useState("search");

    return(
        
        <div className="ManagementPageContainer">
            <Navbar expand="lg" style={{padding: "30px 0"}}>
                <Container fluid style={{justifyContent: "center", backgroundColor: "none"}}>
                    <h2>학생승인 현황</h2>
                    <Form  className="d-flex" >
                    <NavDropdown id="nav-dropdown" >
                        <NavDropdown.Item eventKey="name" onClick={(e)=>{
                            setSearchKinds("이름");
                        }}>이름</NavDropdown.Item>
                        <NavDropdown.Item eventKey="number" onClick={(e)=>{
                            setSearchKinds("학번");
                        }}>학번</NavDropdown.Item>
                    </NavDropdown>
                        <input className="searchBar" onChange={(e) => { setSearchStudent(e.target.value); setSearchButton("search");}} 
                            name="q" value={searchStudent} type="search" placeholder="Search" ></input>
                            
                        <button onClick={(e) => {
                            if( searchButton === "x"){
                                setSearchStudent("");
                                setSearchButton("search");
                                console.log(leftTable);
                                setLeftTable([...waiting]);
                                setRightTable([...approval]);
                            }else{
                                if(searchKinds === "" || searchStudent=== ""){
                                    alert("검색 카테고리를 정하고, 검색명을 입력해주세요 :)");
                                }else if(searchKinds === "이름"){
                                    setSearchButton("x");

                                    console.log( waiting);
                            
                                    let left = waiting.filter((item) => item.name === searchStudent);
                                    let right = approval.filter((item) => item.name === searchStudent);
        
                                    console.log(left);
                                    setLeftTable(left);
                                    setRightTable(right);
                                }else if(searchKinds === "학번"){
                                    // setSearchButton("x");
                                    // console.log("학번 찾기")
                            
                                    // let left = waiting.filter((item) => item.stID === String(searchStudent));
                                    // let right = approval.filter((item) => item.stID === String(searchStudent));
        
                                    // console.log(left);
                                    // setLeftTable(left);
                                    // setRightTable(right);
                                }
                                
                            }
                        }}
                            // var ob = [{
                            //     name: 'john',
                            //     surname: 'fox'
                            //   }
                            // ];
                            // var searchText = 'fox';
                            // var res = ob.filter((item)=>{
                            //   return Object.keys(item).some((key)=>item[key].includes(searchText));
                            // });
                            // console.log(res);
                        
                            className='searchButton' type='button'>
                                {
                                searchButton === "search"
                                ?<i className="fas fa-search"></i>
                                :<i className="fas fa-times"></i>
                                }
                                </button>
                    </Form>
                </Container>
            </Navbar>
            <div className='tables'>
                <div className='tableSet'>
                    <div className= "buttons">
                        <button className='submitButton' onClick={()=>{
                                console.log("승인")
                                leftCheckedList.map((leftCheckedList)=>{
                                console.log(leftCheckedList)
                                })
                                setLeftCheckedList([]);
                            }}>승인</button> 
                        <button className='submitButton' onClick={()=>{
                                console.log("거절")
                                leftCheckedList.map((leftCheckedList)=>{
                                console.log(leftCheckedList)
                                })
                                setLeftCheckedList([]);
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
                                leftTable.map((student,i)=>{
                                    return(
                                        <tr key={i}>
                                            <td>{student.studentID}</td>
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
                                console.log("회장권한위임")
                                rightCheckedList.map((rightCheckedList)=>{
                                console.log(rightCheckedList)
                                })
                                if(rightCheckedList.length === 1){
                                    setRightCheckedList([]);
                                }else{
                                    alert("학생회장 위임은 한명만 가능합니다.");
                                }
                            }}>회장권한위임</button> 
                        <button className='submitButton' onClick={()=>{
                                console.log("대기")
                                rightCheckedList.map((rightCheckedList)=>{
                                console.log(rightCheckedList)
                                })
                                setRightCheckedList([]);
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
                                rightTable.map((student,i)=>{
                                    return(
                                        <tr key={i}>
                                            <td>{student.studentID}</td>
                                            <td>{student.name}</td>
                                            <td><input 
                                                    id= {student}
                                                    type="checkbox" 
                                                    onChange={(e)=>{
                                                    changeHandler(e.currentTarget.checked, student,setRightCheckedList,rightCheckedList)
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