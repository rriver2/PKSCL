import { useState } from 'react';
import { Navbar, Container, Form, FormControl,NavDropdown,Pagination} from 'react-bootstrap';
import './ManagementPage.css';

function ManagementPage(){

    let [waiting,setWaiting] = useState([{  
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
      }]);
    let [refusal,setRefusal] = useState({});
    let [approval,setApproval] = useState([{  
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

    return(
        <div className="ManagementPageContainer">
            <Navbar expand="lg" style={{padding: "30px 0"}}>
                <Container fluid style={{justifyContent: "center", backgroundColor: "none"}}>
                    <h2>학생승인 현황</h2>
                    <Form  className="d-flex" >
                    <NavDropdown id="nav-dropdown" >
                        <NavDropdown.Item eventKey="4.1">이름</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.2">학번</NavDropdown.Item>
                    </NavDropdown>
                        <FormControl style={{border: "none"}}
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <button className='searchButton'><i className="fas fa-search"></i></button>
                    </Form>
                </Container>
            </Navbar>
            <div className='tables'>
                <div className='tableSet'>
                    <div className= "buttons">
                     <button className='submitButton'> 승인</button> <button className='submitButton'>거절</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={"3"}>승인대기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                waiting.map((student,i)=>{
                                    return(
                                        <tr key={i}>
                                            <td>{student.studentID}</td>
                                            <td>{student.name}</td>
                                            <td><Form.Check aria-label="option 1" id = "checkBox" /></td>
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
                        <button className='submitButton' style={{width : "110px"}}>회장권한위임</button> <button className='submitButton'>대기</button>
                    </div>
                     <table>
                        <div></div>
                        <thead>
                            <tr>
                                <th colSpan={"3"}>승인완료</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                approval.map((student,i)=>{
                                    return(
                                        <tr key={i}>
                                            <td>{student.studentID}</td>
                                            <td>{student.name}</td>
                                            <td><Form.Check aria-label="option 1" id = "checkBox"/></td>
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