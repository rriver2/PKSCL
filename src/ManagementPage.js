import { useEffect, useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import './css/ManagementPage.css';
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import PreviewImg from './PreviewImg';

function ManagementPage(props) {
    let debugAPIURL = "";
    // debugAPIURL = "https://cors-jhs.herokuapp.com/https://pkscl.kro.kr";

    let 임시리스트 = {
        waiting:
            [{
                "major": "학과1",
                "email": "aaaaa@naver.com",
                "stdID": "111111111",
                "name": "이름1",
                "phoneNumber": "01011111111",
                "studentImgPath": "/img/time.png",
            },
            {
                "major": "학과1",
                "email": "aaaaa@naver.com",
                "stdID": "111111111",
                "name": "이름1",
                "phoneNumber": "01011111111",
                "studentImgPath": "/img/time.png",
            },
            {
                "major": "학과1",
                "email": "aaaaa@naver.com",
                "stdID": "111111111",
                "name": "이름1",
                "phoneNumber": "01011111111",
                "studentImgPath": "/img/time.png",
            },
            {
                "major": "학과1",
                "email": "aaaaa@naver.com",
                "stdID": "111111111",
                "name": "이름1",
                "phoneNumber": "01011111111",
                "studentImgPath": "/img/time.png",
            },
            {
                "major": "학과1",
                "email": "aaaaa@naver.com",
                "stdID": "111111111",
                "name": "이름1",
                "phoneNumber": "01011111111",
                "studentImgPath": "/img/time.png",
            },
            {
                "major": "학과2",
                "email": "bbbbb@naver.com",
                "stdID": "22222222",
                "name": "이름2",
                "phoneNumber": "01022222222",
                "studentImgPath": "/img/time.png",
            },
            {
                "major": "학과3",
                "email": "ccccc@naver.com",
                "stdID": "333333",
                "name": "이름3",
                "phoneNumber": "010333333",
                "studentImgPath": "/img/time.png",
            }],
        refusal: [],
        approval: [{
            "major": "학과4",
            "email": "dddd@naver.com",
            "stdID": "444444",
            "name": "이름4",
            "phoneNumber": "010444444",
            "studentImgPath": "/img/time.png",
        }, {
            "major": "학과5",
            "email": "eeee@naver.com",
            "stdID": "555555",
            "name": "이름5",
            "phoneNumber": "010555555",
            "studentImgPath": "/img/time.png",
        }, {
            "major": "학과6",
            "email": "ffff@naver.com",
            "stdID": "666666",
            "name": "이름6",
            "phoneNumber": "010666666",
            "studentImgPath": "/img/time.png",
        }],
    }

    const history = useHistory();
    const [waiting, setWaiting] = useState([]);
    const [refusal, setRefusal] = useState([]);
    const [approval, setApproval] = useState([]);

    const [leftTable, setLeftTable] = useState([...waiting]);
    const [rightTable, setRightTable] = useState([...approval]);

    const [leftCheckedList, setLeftCheckedList] = useState([]);
    const [rightCheckedList, setRightCheckedList] = useState([]);

    const [searchStudent, setSearchStudent] = useState("");
    const [searchButton, setSearchButton] = useState("search");
    const [showImg, setShowImg] = useState(false);
    const [previewImg, setPreviewImg] = useState();

    const changeHandler = (checked, studentInfo, setCheckedList, checkedList) => {
        if (checked) {
            setCheckedList([...checkedList, studentInfo]);
        } else {
            setCheckedList(checkedList.filter((e) => e !== studentInfo));
        }
        console.log(checked)
    };

    function patchStudent(studentStatus) {
        let payload;
        if (studentStatus === "approval" || studentStatus === "refusal") {
            payload = {
                "status": studentStatus,
                "email": leftCheckedList
            };
        } else if (studentStatus === "delegating" || studentStatus === "waiting") {
            payload = {
                "status": studentStatus,
                "email": rightCheckedList
            };
        } else {
            alert("error!");
        }
        console.log("patch")
        console.log(leftCheckedList)
        console.log(rightCheckedList)
        if (props.loginPosition === "president") {
            axios.patch(debugAPIURL + '/student-list', payload)
                .then((payload) => {
                    getList();
                })
                .catch((error) => {
                    getList();
                    alert("학생 전송에 실패했습니다 :)")
                });
        } else if (props.loginPosition === "admin") {
            axios.patch(debugAPIURL + '/president-list', payload)
                .then((payload) => {
                    getList();
                })
                .catch((error) => {
                    getList();
                    alert("학과 전송에 실패했습니다 :)")
                });
        }
    }


    useEffect(() => {
        getList();
    }, []);

    function getList() {
        if (props.loginPosition === "president") {
            axios.get(debugAPIURL + '/student-list')
                .then((payload) => {
                    console.log(payload)
                    setWaiting([...payload.data["waiting"]]);
                    setRefusal([...payload.data["refusal"]]);
                    setApproval([...payload.data["approval"]]);
                    setLeftTable([...payload.data["waiting"]]);
                    setRightTable([...payload.data["approval"]]);
                })
                .catch((error) => {
                    alert("학생리스트를 불러올 수 없습니다.");
                    setWaiting([...임시리스트["waiting"]]);
                    setRefusal([...임시리스트["refusal"]]);
                    setApproval([...임시리스트["approval"]]);
                    setLeftTable([...임시리스트["waiting"]]);
                    setRightTable([...임시리스트["approval"]]);
                });
        } else if (props.loginPosition === "admin") {
            axios.get(debugAPIURL + '/president-list')
                .then((payload) => {
                    console.log(payload)
                    setWaiting([...payload.data["waiting"]]);
                    setRefusal([...payload.data["refusal"]]);
                    setApproval([...payload.data["approval"]]);
                    setLeftTable([...payload.data["waiting"]]);
                    setRightTable([...payload.data["approval"]]);
                })
                .catch((error) => {
                    alert("학과리스트를 불러올 수 없습니다.");
                    setWaiting([...임시리스트["waiting"]]);
                    setRefusal([...임시리스트["refusal"]]);
                    setApproval([...임시리스트["approval"]]);
                    setLeftTable([...임시리스트["waiting"]]);
                    setRightTable([...임시리스트["approval"]]);
                });
        }
    }

    function pressSearchStudent() {
        if (searchButton === "x") {
            setSearchStudent("");
            setSearchButton("search");
            setLeftTable([...waiting]);
            setRightTable([...approval]);
        } else {
            if (searchStudent === "") {
                alert("검색명을 입력해주세요 :)");
            } else {
                setSearchButton("x");

                let left = waiting.filter((item) => (item.name.includes(searchStudent) || item.stdID.includes(searchStudent)));
                let right = approval.filter((item) => (item.name.includes(searchStudent) || item.stdID.includes(searchStudent)));

                setLeftTable(left);
                setRightTable(right);
            }

        }
    }

    return (
        <div className="ManagementPageContainer">
            {
                showImg === true
                    ? (<PreviewImg previewImg={previewImg} setShowImg={setShowImg}></PreviewImg>)
                    : null
            }
            {
                props.loginPosition === "student"
                    ? <div>잘못된 접근입니다.</div>
                    : (
                        <>
                            <div className="pageContainer">
                                <div className="nav">
                                    <h2 style={{ margin: "0" }}>학생승인 현황</h2>
                                    <div className="searchBar" >
                                        <input onChange={(e) => {
                                            setSearchStudent(e.target.value);
                                            setSearchButton("search");
                                            if (e.target.value === "") {
                                                setSearchButton("search");
                                                setLeftTable([...waiting]);
                                                setRightTable([...approval]);
                                            }
                                        }}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    pressSearchStudent()
                                                }
                                            }}
                                            name="q" value={searchStudent} type="search" placeholder="Search" ></input>

                                        <button onClick={() => {
                                            pressSearchStudent()
                                        }}
                                            className='searchButton' type='button'>
                                            {
                                                searchButton === "search"
                                                    ? <i className="fas fa-search"></i>
                                                    : <i className="fas fa-times"></i>
                                            }
                                        </button>

                                    </div>
                                    <button className="submitButton" onClick={() => {
                                        if (props.loginPosition === "admin") {
                                            history.push('/main')
                                        } else if (props.loginPosition === "president") {
                                            history.push('/edit-main')
                                        }
                                    }}>장부 수정</button>
                                </div>
                                <div className='tables'>
                                    <div className="tableSet" >
                                        <div className="buttons">
                                            <button className='submitButton' onClick={() => {
                                                if (leftCheckedList.length === 0) {
                                                    alert("승인할 학생을 1명 이상 선택하세요 :)")
                                                } else {
                                                    patchStudent("approval");
                                                }
                                                setLeftCheckedList([]);
                                            }}>승인</button>
                                            <button className='submitButton' onClick={() => {
                                                console.log("거절")
                                                setLeftCheckedList([]);
                                                if (leftCheckedList.length > 0) {
                                                    patchStudent("refusal");
                                                } else {
                                                    alert("거절할 학생을 1명 이상 선택하세요 :)")
                                                }
                                            }}>거절</button>
                                        </div>
                                        <table >
                                            <thead>
                                                <tr >
                                                    <th colSpan={"3"} style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }}>승인대기</th>
                                                </tr>
                                            </thead>
                                            <div className="tableRadius" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                <tbody className="tableList" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                    {
                                                        leftTable.length === 0
                                                            ? <tr>
                                                                <td colSpan={"3"}>승인대기 학생이 없습니다.</td>
                                                            </tr>
                                                            : leftTable.map((student, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        {
                                                                            props.loginPosition === "president"
                                                                                ? (<><td>{student.stdID}</td>
                                                                                    <td>{student.name}</td>
                                                                                    <td><button className="certFileButton" type='button' onClick={() => {
                                                                                        setPreviewImg(student);
                                                                                        setShowImg(true);
                                                                                    }}>학생증</button></td>
                                                                                    <td ><input
                                                                                        id={student}
                                                                                        type="checkbox"
                                                                                        onChange={(e) => {
                                                                                            changeHandler(e.target.checked, student["email"], setLeftCheckedList, leftCheckedList)
                                                                                        }}
                                                                                        checked={leftCheckedList.includes(student["email"]) ? true : false}
                                                                                    /></td>
                                                                                </>)
                                                                                : (<><tr>
                                                                                    <td>{student.major}</td>
                                                                                    <td>{student.name}</td>
                                                                                    <td>{student.stdID}</td>
                                                                                </tr><tr>
                                                                                        <td>{student.phoneNumber}</td>
                                                                                        <td>{student.email}</td>
                                                                                        <td><button className="certFileButton" type='button' onClick={() => {
                                                                                            setPreviewImg(student);
                                                                                            setShowImg(true);
                                                                                        }}>학생증</button></td>
                                                                                    </tr>
                                                                                    <td style={{ width: "100px" }}><input
                                                                                        id={student}
                                                                                        type="checkbox"
                                                                                        onChange={(e) => {
                                                                                            changeHandler(e.target.checked, student["email"], setLeftCheckedList, leftCheckedList)
                                                                                        }}
                                                                                        checked={leftCheckedList.includes(student["email"]) ? true : false}
                                                                                    /></td>
                                                                                </>)
                                                                        }

                                                                    </tr>
                                                                )
                                                            })
                                                    }
                                                </tbody>
                                            </div>
                                        </table>
                                    </div>

                                    <div className='tableSet'>
                                        <div className="buttons">
                                            {
                                                props.loginPosition === "president"
                                                    ? (<button className='submitButton' style={{ width: "110px" }} onClick={() => {
                                                        if (rightCheckedList.length === 1) {
                                                            setRightCheckedList([]);
                                                            patchStudent("delegating");
                                                        } else {
                                                            alert("학생회장 위임은 한명만 가능합니다.");
                                                        }
                                                    }}>회장권한위임</button>)
                                                    : null
                                            }
                                            <button className='submitButton' onClick={() => {
                                                setRightCheckedList([]);
                                                if (rightCheckedList.length > 0) {
                                                    patchStudent("waiting");
                                                }
                                            }}
                                            >대기</button>
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th colSpan={"3"} style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }}>승인완료</th>
                                                </tr>
                                            </thead>
                                            <div className="tableRadius" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                <tbody className="tableList" style={{ borderBottomRightRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                                    {
                                                        rightTable.length === 0
                                                            ? <tr>
                                                                <td colSpan={"3"}>승인대기 학생이 없습니다.</td>
                                                            </tr>
                                                            : rightTable.map((student, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        {
                                                                            props.loginPosition === "president"
                                                                                ? (<><td>{student.stdID}</td>
                                                                                    <td>{student.name}</td>
                                                                                    <td><button className="certFileButton" type='button' onClick={() => {
                                                                                        setShowImg(true);
                                                                                    }}>학생증</button></td>
                                                                                    <td ><input
                                                                                        id={student}
                                                                                        type="checkbox"
                                                                                        onChange={(e) => {
                                                                                            changeHandler(e.target.checked, student["email"], setRightCheckedList, rightCheckedList)
                                                                                        }}
                                                                                        checked={rightCheckedList.includes(student["email"]) ? true : false}
                                                                                    /></td>
                                                                                </>)
                                                                                : (<><tr>
                                                                                    <td>{student.major}</td>
                                                                                    <td>{student.name}</td>
                                                                                    <td>{student.stdID}</td>
                                                                                </tr><tr>
                                                                                        <td>{student.phoneNumber}</td>
                                                                                        <td>{student.email}</td>
                                                                                        <td><button className="certFileButton" type='button' onClick={() => {
                                                                                            setShowImg(true);
                                                                                        }}>학생증</button></td>
                                                                                    </tr>
                                                                                    <td style={{ width: "100px" }}><input
                                                                                        id={student}
                                                                                        type="checkbox"
                                                                                        onChange={(e) => {
                                                                                            changeHandler(e.target.checked, student["email"], setRightCheckedList, rightCheckedList)
                                                                                        }}
                                                                                        checked={rightCheckedList.includes(student["email"]) ? true : false}
                                                                                    /></td>
                                                                                </>)
                                                                        }

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
                        </>)}
        </div>


    )
}

export default ManagementPage;