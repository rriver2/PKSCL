import majorlogo from './img/majorlogo.png';
import quarter1 from './img/quarter1.png';
import quarter2 from './img/quarter2.png';
import quarter3 from './img/quarter3.png';
import quarter4 from './img/quarter4.png';
import receipt from './img/receipt.png';

import './MainPage.css';

function MainPage(){

    return(
        <div className="MainPageContainer">
            <div className="leftPanel">
                <div className="majorCard">
                    <div className = "presidentCard">
                        <h2>컴퓨터공학부</h2>
                        <p>온라인 장부 입니다.</p>
                        <img src={majorlogo} alt="majorlogo" height={"150"} width={"10"}/>
                        <h3>홍길동</h3>
                        <p>010-1234-1234</p>
                        <p>PKCOG@gmail.com</p>
                    </div>
                    <div className = "cogExplanation">
                    안녕하세요 컴퓨터공학부 회장 홍길동입니다. 
                    PKCOG 온라인 장부를 통해 학과 장부를 분기별로 확인하세요 :) 
                    장부 확인 중 문의 사항이 있으시다면 이메일로 연락주십시오.
                    </div> 
                </div>
                <div className="quarter">
                    <img src={quarter1} alt="quarter1"/>
                    <img src={quarter2} alt="quarter2"/>
                    <img src={quarter3} alt="quarter3"/>
                    <img src={quarter4} alt="quarter4"/>
                </div>
                <div className="managementPageBar">
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>

            <div className="rightPanel">
                <div className="nav">
                    <div className= "buttons">
                        <button className='submitButton'>프로필 편집</button> <button className='submitButton'>로그아웃</button>
                    </div>
                </div>
                <div className="quarterData">
                    <h2 className="quarterTotalAmount">
                        2분기 총 금액 : 267475원
                    </h2>
                    <div className="eventCard">
                       <div className="cardContent">
                            <h4> 행사 제목 </h4> 
                            <div> 행사 총 금액 : 123456원</div>
                            {/* <div> 행사 설명입니다. 영수증들의 제목을 입력해주세요. 최대 글자수는 200자입니다.</div> */}
                            <div className="receiptContent">
                                <h5>영수증 제목</h5>
                                <div> 행사 총 금액 : 12345원</div>
                                {/* <div> 비고 : 최대 글자수는 100자입니다.</div> */}
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
                                        <tr>
                                            <td>물품 1</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 2</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 3</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 2</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 3</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 10</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 311</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                    </tbody>
                                </table>
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
                    <div className="eventCard">
                       <div className="cardContent">
                            <h4> 행사 제목 </h4> 
                            <div> 행사 총 금액 : 123456원</div>
                            {/* <div> 행사 설명입니다. 영수증들의 제목을 입력해주세요. 최대 글자수는 200자입니다.</div> */}
                            <div className="receiptContent">
                                <h5>영수증 제목</h5>
                                <div> 행사 총 금액 : 12345원</div>
                                {/* <div> 비고 : 최대 글자수는 100자입니다.</div> */}
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
                                        <tr>
                                            <td>물품 1</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 2</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 3</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 2</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 3</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 10</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                        <tr>
                                            <td>물품 311</td>
                                            <td>가격</td>
                                            <td>3</td>
                                            <td>총액</td>
                                        </tr>
                                    </tbody>
                                </table>
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
                </div>

            </div>
        </div>
    )
}

export default MainPage;