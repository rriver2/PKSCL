import axios from 'axios';
import React, { useEffect, useState } from 'react';

function EditProfile(props) {
    const [stdID, setStdID] = useState("");
    const [major, setMajor] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [certFile, setCertFile] = useState("");
    const [majorLogo, setMajorLogo] = useState("");
    const [isCorrect, setIsCorrect] = useState(
        {
            stdID: false,
            major: false,
            name: false,
            phoneNumber: false,
            email: false,
            certFile: false,
            majorLogo: false
        }
    );

    const [editButtonState, setEditButtonState] = useState(false);

    const [majorList, setMajorList] = useState(
        [
            "국어국문학과", "영어영문학부", "일어일문학부", "사학과", "경제학부", "법학과", "행정학과", "국제지역학부", "중국학과", "신문방송학과", "정치외교학과", "유아교육과", "시각디자인학과", "공업디자인학과", "패션디자인학과", "경영학부", "국제통상학부", "응용수학과", "통계학과", "물리학과", "화학과", "미생물학과", "해양스포츠학과", "간호학과", "과학시스템시뮬레이션학과", "건축공학과", "건축학과", "소방공학과", "시스템경영공학부", "IT융합응용공학과", "안전공학과", "융합디스플레이공학과", "의공학과", "전기공학과", "전자공학과", "정보통신공학과", "제어계측공학과", "조선해양시스템공학과", "컴퓨터공학과", "토목공학과", "고분자공학과", "공업화학과", "금속공학과", "기계공학과", "기계설계공학과", "기계시스템공학과", "냉동공조공학과", "신소재시스템공학과", "인쇄정보공학과", "재료공학과", "화학공학과", "지속가능공학부", "식품공학과", "해양바이오신소재학과", "해양생산시스템관리학부", "해양수산경영학과", "수해양산업교육과", "자원생물학과", "식품영양학과", "생물공학과", "수산생명의학과", "환경공학과", "해양공학과", "해양학과", "지구환경과학과", "환경대기과학과", "에너지자원공학과", "공간정보시스템공학과", "생태공학과", "데이터정보과학부(빅데이터융합전공)", "데이터정보과학부(통계·데이터사이언스전공)", "미디어커뮤니케이션학부(언론정보전공)", "미디어커뮤니케이션학부(휴먼ICT융합전공)", "스마트헬스케어학부(의공학전공)", "스마트헬스케어학부(해양스포츠전공)", "스마트헬스케어학부(휴먼바이오융합전공)", "전자정보통신공학부(전자공학전공)", "전자정보통신공학부(정보통신공학전공)", "조형학부(건축학전공)", "조형학부(공업디자인전공)", "조형학부(시각디자인전공)", "컴퓨터공학부(소프트웨어·인공지능전공)", "컴퓨터공학부(컴퓨터공학전공)", "평생교육·상담학과", "기계조선융합공학과", "전기전자소프트웨어공학과", "공공안전경찰학과"
        ]);

    function changeIsCorrect(key, type) {
        var temp = { ...isCorrect };
        if (key === "stdID") temp.stdID = type;
        else if (key === "major") temp.major = type;
        else if (key === "name") temp.name = type;
        else if (key === "phoneNumber") temp.phoneNumber = type;
        else if (key === "email") temp.email = type;
        else if (key === "certFile") temp.certFile = type;
        else if (key === "majorLogo") temp.majorLogo = type;
        else console.log("function changeIsCorrect() error ");

        setIsCorrect(temp);

    };

    useEffect(() => {
        if (props.loginPosition === "president") {
            if (isCorrect.stdID && isCorrect.name && isCorrect.phoneNumber && isCorrect.majorLogo) {
                setEditButtonState(true);
            } else {
                setEditButtonState(false);
            }
            console.log("isCorrect.stdID: " + isCorrect.stdID + " isCorrect.name: " + isCorrect.name + " isCorrect.phoneNumber: " + isCorrect.phoneNumber + "  isCorrect.majorLogo: " + isCorrect.majorLogo);
        } else if (props.loginPosition === "student") {
            if (isCorrect.stdID && isCorrect.name && isCorrect.major && isCorrect.certFile) {
                setEditButtonState(true);
            } else {
                setEditButtonState(false);
            }
            console.log("isCorrect.stdID: " + isCorrect.stdID + " isCorrect.name: " + isCorrect.name + " isCorrect.major: " + isCorrect.major + " isCorrect.certFile: " + isCorrect.certFile);
        }

    }, [isCorrect])

    useEffect(() => {
        //debug
        setStdID("123456789");
        setMajor("0");
        setName("홍길동");
        setPhoneNumber("010-0000-0000");
        setEmail("userID@pukyong.ac.kr");
        setCertFile({ name: "학생증.jpg" })
        setMajorLogo({ name: "학과로고.jpg" })

        //get 요청해서 로그인된 정보 가져오기
        axios.get('/profile')
            .then((payload) => {
                switch (payload.status) {
                    case 200:
                        setStdID(...payload.data.stdID);
                        setMajor(...payload.data.major);
                        setName(...payload.data.name);
                        setEmail(...payload.data.email);

                        if (props.loginPosition === "prsident") {
                            setPhoneNumber(...payload.data.phoneNumber);
                            setMajorLogo(...payload.data.majorLogo)
                        } else if (props.loginPosition === "student") {
                            setCertFile(...payload.data.certFile);
                        }
                        return;
                }

            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400: console.log("정보를 로드하는데 실패했습니다."); return;
                    default: console.log("error: " + error.response.status); return;
                }

            })
        //get 요청해서 학과리스트 가져오기
        axios.get('/major-list')
            .then((payload) => {
                setMajorList([...payload.data.majorList]);
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400: alert("학과리스트를 불러올 수 없습니다."); return;
                    default: console.log("error: " + error.response.status); return;
                }
            })


    }, [])

    useEffect(() => {
        if (phoneNumber.length === 10) {
            setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (phoneNumber.length === 13) {
            setPhoneNumber(phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [phoneNumber]);

    return (
        <div className='black-bg'>
            <div className="errorContainer">
                <div className="errorBox">
                    <h2 ><i className="fas fa-users" />프로필 편집</h2>
                    <div className='editField'>
                        <div className="inputField">
                            <i className="fas fa-key"></i>
                            <label>비밀번호</label>
                            <empty style={{ width: "200px" }}></empty>
                            <button type='button'>변경</button>
                        </div>

                        <div className="inputField">
                            <i className="fas fa-lock"></i>
                            <label>학번</label>
                            <input onChange={(e) => {
                                setStdID(e.target.value.replace(/[^0-9]/g, ''));
                                if (e.target.value.length === 9) {
                                    changeIsCorrect("stdID", true);

                                } else {
                                    changeIsCorrect("stdID", false);
                                }
                            }
                            } name="stdID" value={stdID} maxLength="9" placeholder="내용을 입력해주세요" type="text" />

                        </div>

                        <div className="inputField">
                            <i className="fas fa-book-open" style={{ fontSize: "0.85rem" }}></i>
                            <label >학과</label>
                            {
                                props.loginPosition === "president"
                                    ?
                                    <input type="text" list="majorList-options" id='major' name="major" placeholder="학과를 입력하세요." value={major} readOnly></input>
                                    :
                                    <>

                                        <input type="text" list="majorList-options" id='major' name="major" placeholder={majorList[major]}
                                            style={{ textColor: "black" }}
                                            onChange={(e) => {
                                                setMajor(majorList.indexOf(e.target.value) + 1);

                                                if (majorList.includes(e.target.value)) {
                                                    changeIsCorrect("major", true);
                                                } else {
                                                    changeIsCorrect("major", false);
                                                }
                                            }
                                            } ></input>
                                        <datalist id="majorList-options" >
                                            {
                                                majorList.map((majorName, i) => {
                                                    return (
                                                        <option value={majorName} key={i} ></option>
                                                    )
                                                })
                                            }
                                        </datalist>
                                    </>



                            }

                        </div>

                        <div className="inputField">
                            <i className="fas fa-user"></i>
                            <label>이름</label>
                            <input onChange={(e) => {
                                setName(e.target.value)
                                if (e.target.value === "") {
                                    changeIsCorrect("name", false);
                                } else {
                                    changeIsCorrect("name", true);
                                }
                            }
                            } name="name" value={name} type="text" placeholder="이름을 입력해주세요" />
                        </div>

                        {
                            props.loginPosition === "president"
                                ?
                                <div className="inputField">
                                    <i className="fas fa-user"></i>
                                    <label>전화번호</label>
                                    <input onChange={(e) => {
                                        setPhoneNumber(e.target.value)
                                        if (e.target.value === "") {
                                            changeIsCorrect("phoneNum", false);
                                        } else {
                                            changeIsCorrect("phoneNum", true);
                                        }
                                    }
                                    } maxLength="13" name="phoneNum" value={phoneNumber} type="text" placeholder="내용을 입력하세요" />
                                </div>
                                : null
                        }



                        <div className="inputField">
                            <i className="fas fa-envelope"></i>
                            <label>이메일</label>
                            <input id="inputEmail" name="email" value={email} type="text" readOnly />
                        </div>

                        {
                            props.loginPosition === "president"
                                ?
                                <div className="inputField">
                                    <i className="fas fa-key"></i>
                                    <label>학과로고</label>
                                    {/* <empty style={{ width: "200px" }}></empty> */}
                                    <input className='uploadName' placeholder='학과로고를 첨부해주세요' value={majorLogo.name} readOnly />
                                    <label htmlFor="majorLogo">찾기</label>
                                    <input type="file" id='majorLogo' name="majorLogo" accept='image/*'
                                        onChange={(e) => {
                                            majorLogo(e.target.files[0]);
                                            if (e.target.value === "") {
                                                changeIsCorrect("majorLogo", false);
                                            } else {
                                                changeIsCorrect("majorLogo", true);
                                            }
                                        }} />
                                    <button type='button'>변경하기</button>
                                </div>
                                :
                                <div className="inputField">
                                    <i className="fas fa-user-graduate"></i>
                                    <label>학생증</label>
                                    <input style={{ width: "200px" }} value={certFile.name} readOnly></input>
                                    <label className='fileButton' htmlFor="file">찾기</label>
                                    <input type="file" id="file" name="file" style={{ display: "none" }} accept='image/*'
                                        onChange={(e) => {
                                            setCertFile(e.target.files[0]);
                                            if (e.target.value === "") {
                                                changeIsCorrect("certFile", false);
                                            } else {
                                                changeIsCorrect("certFile", true);
                                            }

                                        }}></input>
                                </div>
                        }
                    </div>

                    <div className="errorBtns">
                        <button className="errorBtn" type="button" onClick={() => { editButtonState ? alert("전송") : alert("실패") }}>저장하기</button>
                        <button className="errorBtn" type="button" onClick={() => { props.setEditProfileState(false) }}>나가기</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;