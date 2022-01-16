import { Navbar, Container, Form, FormControl,NavDropdown,Pagination} from 'react-bootstrap';
import './학생관리.css';

function 학생관리(){
    return(
        <div className='학생관리container'>
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
                        <button className='searchButton'><i class="fas fa-search"></i></button>
                    </Form>
                </Container>
            </Navbar>
            <div className='tables'>
                <div className='tableSet'>
                    <div className= "buttons">
                     <button className='전송버튼'> 승인</button> <button className='전송버튼'>거절</button>
                    </div>
                    <table className='승인대기'>
                        <thead>
                            <tr>
                                <th colSpan={"3"}>승인대기</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>202013245</td>
                                <td>이가은</td>
                                <td><Form.Check aria-label="option 1" id = "checkBox"/></td>
                            </tr>
                            <tr>
                                <td>202013245</td>
                                <td>이가은</td>
                                <td><Form.Check aria-label="option 1" id = "checkBox"/></td>
                            </tr>
                            <tr>
                                <td>202013245</td>
                                <td>이가은</td>
                                <td><Form.Check aria-label="option 1" id = "checkBox"/></td>
                            </tr>
                            <tr>
                                <td>202013245</td>
                                <td>이가은</td>
                                <td><Form.Check aria-label="option 1" id = "checkBox"/></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className = "pagenation">
                        <button><i class="fas fa-chevron-left"></i></button>
                            <button className= "pagenationItem">{2}</button>
                            <button className= "pagenationItem">{3}</button>
                            <button className= "pagenationItem" style={{color : "black"}}>{4}</button>
                            <button className= "pagenationItem">{5}</button>
                            <button className= "pagenationItem">{6}</button>
                        <button><i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>

                <div className='tableSet'>
                    <div className= "buttons">
                        <button className='전송버튼' style={{width : "110px"}}>회장권한위임</button> <button className='전송버튼'>대기</button>
                    </div>
                     <table className='승인완료'>
                        <div></div>
                        <thead>
                            <tr>
                                <th colSpan={"3"}>승인완료</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>202013245</td>
                                <td>이가은</td>
                                <td><Form.Check aria-label="option 1" id = "checkBox"/></td>
                            </tr>
                            <tr>
                                <td>202013245</td>
                                <td>이가은</td>
                                <td> <Form.Check aria-label="option 1" id = "checkBox"/></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className = "pagenation">
                        <button><i class="fas fa-chevron-left"></i></button>
                            <button className= "pagenationItem">{4}</button>
                            <button className= "pagenationItem">{5}</button>
                            <button className= "pagenationItem" style={{color : "black"}}>{6}</button>
                            <button className= "pagenationItem">{7}</button>
                            <button className= "pagenationItem">{8}</button>
                        <button><i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default 학생관리;