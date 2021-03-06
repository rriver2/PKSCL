import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './css/EditProfile.css'
import { useHistory } from 'react-router-dom';

function EditProfile(props) {

    const history = useHistory();
    const modalRef = useRef();

    const [boxState, setBoxState] = useState("profile");
    const [stdID, setStdID] = useState("");
    const [major, setMajor] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [certFile, setCertFile] = useState({ name: "" });
    const [majorLogo, setMajorLogo] = useState({ name: "" });
    const [isCorrect, setIsCorrect] = useState(
        {
            stdID: false,
            major: false,
            name: false,
            phoneNumber: false,
            email: false,
            certFile: false,
            majorLogo: false,
            inputEmail: false,
            inputPassword: false,
            inputNewPassword: false,
            inputCheckNewPassword: false,
        }
    );

    const [editButtonState, setEditButtonState] = useState(false);

    const [majorList, setMajorList] = useState([]);

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const [inputNewPassword, setInputNewPassword] = useState("");
    const [inputCheckNewPassword, setInputCheckNewPassword] = useState("");

    const [newPasswordButton, setNewPasswordButton] = useState(false);
    const [userApprovalStatus, setUserApprovalStatus] = useState(false);


    function changeIsCorrect(key, type) {
        var temp = { ...isCorrect };
        if (key === "stdID") temp.stdID = type;
        else if (key === "major") temp.major = type;
        else if (key === "name") temp.name = type;
        else if (key === "phoneNumber") temp.phoneNumber = type;
        else if (key === "email") temp.email = type;
        else if (key === "certFile") temp.certFile = type;
        else if (key === "majorLogo") temp.majorLogo = type;
        else if (key === "inputEmail") temp.inputEmail = type;
        else if (key === "inputPassword") temp.inputPassword = type;
        else if (key === "inputNewPassword") temp.inputNewPassword = type;
        else if (key === "inputCheckNewPassword") temp.inputCheckNewPassword = type;

        setIsCorrect(temp);
    };

    function withdrawal() {
        if (isCorrect.inputEmail && isCorrect.inputPassword) {
            if (window.confirm('?????? ?????????????????????????')) {
                const payload = { "inputEmail": inputEmail, "inputPassword": inputPassword }
                //axio.??????
                axios.post('/withdrawal', payload)
                    .then((payload) => {
                        alert("?????? ????????? ??????????????? ?????? ???????????????.");
                        logout();
                    })
                    .catch((error) => {
                        switch (error.response.status) {
                            case 401:
                                alert("???????????? ??????????????? ???????????? ????????????.");
                                break;
                            default:
                                alert("?????? ?????? ??????/ error: " + error.response.status);
                                break;
                        }
                    })
            }
            else {
                setBoxState("profile");
                reset();
            }
        } else {
            alert("???????????? ??????????????? ?????? ??????????????????.");
        }
    }

    function newPassword() {


        const payload = { "inputPassword": inputPassword, "inputNewPassword": inputNewPassword, "inputCheckNewPassword": inputCheckNewPassword }
        axios.patch('/password', payload)
            .then((payload) => {
                alert("??????????????? ?????????????????????.");
                logout();
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 401:
                        alert("??????????????? ???????????? ????????????.");
                        break;
                    default:
                        alert("???????????? ?????? ??????/ error: " + error.response.status); // ????????????
                        break;
                }

            })
    }

    function putProfile() {
        let payload = new FormData();
        payload.append("stdID", stdID);
        payload.append("name", name);
        payload.append("majorNumber", major);

        if (props.loginPosition === "student") { //??????
            if (!certFile["name"].includes("./static/studentCertFile/")) {
                payload.append("certFile", certFile);
            }
        }
        else if (props.loginPosition === "president") { //????????????
            payload.append("phoneNumber", phoneNumber);

            if (!majorLogo["name"].includes("./static/majorLogo/")) {
                payload.append("majorLogo", majorLogo);
            }
        }

        axios.put("/profile/" + props.loginPosition, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((payload) => {
            alert("????????? ?????????????????????.");
            if (props.loginPosition === "student") {
                logout();
            } else if (props.loginPosition === "president" && userApprovalStatus === false) {
                logout();
            }
            props.setEditProfileState(false);
        })
            .catch((error) => {
                switch (error.response.status) {
                    case 400:
                        alert(error.response.data.errorMessage);
                        break;
                    default:
                        alert("????????? ?????? ??????/ error: " + error.status);
                        break;
                }
            })


    }

    function reset() {
        setInputEmail("");
        setInputPassword("");
        setInputNewPassword("");
        setInputCheckNewPassword("");
    }

    function logout() {
        axios.post('/logout')
            .then((payload) => {
                history.push('/');
            }).catch((error) => {
                switch (error.response.status) {
                    case 400: alert("??????????????? ?????????????????????."); break;
                    default: alert("???????????? ??????/ error: " + error.response.status); break;
                }
            })
    }

    useEffect(() => {
        if (props.loginPosition === "president") {
            if (isCorrect.stdID && isCorrect.name && isCorrect.phoneNumber && isCorrect.majorLogo) {
                setEditButtonState(true);
            } else {
                setEditButtonState(false);
            }
        } else if (props.loginPosition === "student") {
            if (isCorrect.stdID && isCorrect.name && isCorrect.major && isCorrect.certFile) {
                setEditButtonState(true);
            } else {
                setEditButtonState(false);
            }
        }

        if (isCorrect.inputPassword && isCorrect.inputNewPassword && isCorrect.inputCheckNewPassword) {
            if (inputNewPassword === inputCheckNewPassword)
                setNewPasswordButton(true);
            else {
                setNewPasswordButton(false);
            }
        } else {
            setNewPasswordButton(false);
        }

    }, [isCorrect])

    function getProfileStudent() {
        axios.get('/profile')
            .then((payload) => {
                setStdID(payload.data["stdID"]);
                setMajor(payload.data["major"]);
                setName(payload.data["name"]);
                setEmail(payload.data["email"]);

                setCertFile(payload.data["certFile"]);
                setIsCorrect(
                    {
                        stdID: true,
                        major: true,
                        name: true,
                        phoneNumber: false,
                        email: true,
                        certFile: true,
                        majorLogo: false,
                        inputEmail: false,
                        inputPassword: false,
                        inputNewPassword: false,
                        inputCheckNewPassword: false,
                    }
                );
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400: alert("????????? ????????? ??????????????? ??????????????????."); break;
                    default: alert("????????? ?????? ?????? ??????/ error" + error.response.status); break;
                }
            })
    }

    function getProfilePresident() {
        axios.get('/profile')
            .then((payload) => {
                setStdID(payload.data["stdID"]);
                setMajor(payload.data["major"]);
                setName(payload.data["name"]);
                setEmail(payload.data["email"]);

                setPhoneNumber(payload.data["phoneNumber"]);
                setMajorLogo(payload.data["majorLogo"]);
                setIsCorrect(
                    {
                        stdID: true,
                        major: true,
                        name: true,
                        phoneNumber: true,
                        email: true,
                        certFile: false,
                        majorLogo: true,
                        inputEmail: false,
                        inputPassword: false,
                        inputNewPassword: false,
                        inputCheckNewPassword: false,
                    }
                );

            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400: alert("????????? ????????? ??????????????? ??????????????????."); break;
                    default: alert("????????? ?????? ?????? ??????/ error" + error.response.status); break;
                }
            })
    }

    function getMajorList() {
        //get ???????????? ??????????????? ????????????
        axios.get('/major-list')
            .then((payload) => {
                setMajorList([...payload.data.majorList]);
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400: alert("?????????????????? ????????? ??? ????????????."); break;
                    default: alert("?????? ????????? ?????? ??????/ error: " + error.response.status); break;
                }
            })
    }

    function getUserApprovalStatus() {
        axios.get('/status')
            .then((payload) => {
                if (payload.data["status"] === "approval") {
                    setUserApprovalStatus(true)
                }
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400:
                        alert("???????????? ?????? ????????? ??? ??? ????????????.");
                        break;

                    default:
                        alert("?????? ?????? ?????? ??????/ error: " + error.response.status);
                        break;
                }
            })
    }

    useEffect(() => {
        setIsCorrect(
            {
                stdID: true,
                major: true,
                name: true,
                phoneNumber: true,
                email: true,
                certFile: true,
                majorLogo: true,
                inputEmail: false,
                inputPassword: false,
                inputNewPassword: false,
                inputCheckNewPassword: false
            }
        );

        //get ???????????? ???????????? ?????? ????????????
        if (props.loginPosition === "president") {
            getProfilePresident()
            getMajorList()
            getUserApprovalStatus()
        } else if (props.loginPosition === "student") {
            getProfileStudent()
            getMajorList()
        }


        //push ?????? ??????
        // setStdID("202013245");
        // setMajor(0);
        // setName("?????????");
        // setEmail("hongildong@naver.com");
        // setPhoneNumber("01057925915");
        // setUserApprovalStatus(false)

        document.addEventListener('mousedown', clickModalOutside);

        return () => {
            document.removeEventListener('mousedown', clickModalOutside);
        };


    }, [])

    const clickModalOutside = event => {
        if (props.editProfileState && (event.target === modalRef.current)) {
            props.setEditProfileState(false);
        }
    };


    useEffect(() => {
        if (phoneNumber.length === 10) {
            setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (phoneNumber.length === 13) {
            setPhoneNumber(phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [phoneNumber]);

    return (
        <div className="editProfileContainer" ref={modalRef}>
            <div className="editProfileBox">
                {
                    boxState === "profile"
                        ? <>
                            <div className='boxTitle'>
                                {/* <i className="fas fa-user" /> */}
                                <div className="profileEditTitle">????????? ??????</div>
                                <button className="btn btn-danger dangerButton" onClick={() => { setBoxState("withdrawal") }}>????????????</button>
                            </div>

                            <div className='editField'>
                                {
                                    props.loginPosition === "admin"
                                        ? setBoxState("newPassword")
                                        : <>
                                            <div className="inputField" style={{ justifyContent: "space-between" }}>
                                                <div>
                                                    <i className="fas fa-key"></i>
                                                    <label>????????????</label></div>
                                                <button type='button' style={{ fontWeight: "bold" }} onClick={() => { setBoxState("newPassword") }}>??????</button>
                                            </div>

                                            <div className="inputField">
                                                <i className="fas fa-lock"></i>
                                                <label>??????</label>
                                                {
                                                    props.loginPosition === "president" && userApprovalStatus === true
                                                        ?
                                                        <>
                                                            <input name="stdID" value={stdID} maxLength="9" placeholder="????????? ??????????????????" type="text" readOnly />
                                                        </>
                                                        : <input onChange={(e) => {
                                                            setStdID(e.target.value.replace(/[^0-9]/g, ''));
                                                            if (e.target.value.length === 9) {
                                                                changeIsCorrect("stdID", true);
                                                            } else {
                                                                changeIsCorrect("stdID", false);
                                                            }
                                                        }
                                                        } name="stdID" value={stdID} maxLength="9" placeholder="????????? ??????????????????" type="text" />
                                                }
                                            </div>

                                            <div className="inputField">
                                                <i className="fas fa-book-open" style={{ fontSize: "0.85rem" }}></i>
                                                <label >??????</label>

                                                {
                                                    props.loginPosition === "student"
                                                        ?
                                                        <>
                                                            <input type="text" list="majorList-options" id='major' name="major" placeholder={majorList[major]}
                                                                style={{ textColor: "black" }}
                                                                onChange={(e) => {
                                                                    setMajor(majorList.indexOf(e.target.value));

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
                                                                        if (i !== 0) {
                                                                            return (
                                                                                <option value={majorName} key={i} ></option>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </datalist>
                                                        </>
                                                        : null
                                                }

                                                {
                                                    props.loginPosition === "president" && userApprovalStatus === true
                                                        ?
                                                        <>
                                                            <input type="text" list="majorList-options" id='major' name="major" placeholder={majorList[major]}
                                                                style={{ textColor: "black" }} readOnly ></input>
                                                        </>
                                                        : null
                                                }
                                                {
                                                    props.loginPosition === "president" && userApprovalStatus === false
                                                        ? <>
                                                            <input type="text" list="majorList-options" id='major' name="major" placeholder={majorList[major]}
                                                                style={{ textColor: "black" }}
                                                                onChange={(e) => {
                                                                    setMajor(majorList.indexOf(e.target.value));

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
                                                                        if (i !== 0) {
                                                                            return (
                                                                                <option value={majorName} key={i} ></option>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </datalist>
                                                        </>
                                                        : null
                                                }


                                            </div>

                                            <div className="inputField">
                                                <i className="fas fa-user"></i>
                                                <label>??????</label>
                                                <input onChange={(e) => {
                                                    setName(e.target.value)
                                                    if (e.target.value === "") {
                                                        changeIsCorrect("name", false);
                                                    } else {
                                                        changeIsCorrect("name", true);
                                                    }
                                                }
                                                } name="name" value={name} type="text" placeholder="????????? ??????????????????" />
                                            </div>

                                            {
                                                props.loginPosition === "president"
                                                    ?
                                                    <div className="inputField">
                                                        <i className="fas fa-user"></i>
                                                        <label>????????????</label>
                                                        <input onChange={(e) => {
                                                            setPhoneNumber(e.target.value)
                                                            if (e.target.value === "") {
                                                                changeIsCorrect("phoneNum", false);
                                                            } else {
                                                                changeIsCorrect("phoneNum", true);
                                                            }
                                                        }
                                                        } maxLength="13" name="phoneNum" value={phoneNumber} type="text" placeholder="????????? ???????????????" />
                                                    </div>
                                                    : null
                                            }



                                            <div className="inputField">
                                                <i className="fas fa-envelope"></i>
                                                <label>?????????</label>
                                                <input id="inputEmail" name="email" value={email} type="text" readOnly />
                                            </div>

                                            {
                                                props.loginPosition === "president" && userApprovalStatus === true
                                                    ? <div className="inputField">
                                                        <i className="fas fa-user-graduate" style={{ fontSize: "1.25rem" }}></i>
                                                        <label>????????????</label>
                                                        <input placeholder="??????????????? ??????????????????."
                                                            value={majorLogo["name"].replace(/^.*\//, '')} readOnly></input>
                                                        <label className='fileButton' htmlFor="file">??????</label>
                                                        <input type="file" id="file" name="file" style={{ display: "none" }} accept='image/*'
                                                            onChange={(e) => {
                                                                setMajorLogo(e.target.files[0]);
                                                                if (e.target.value === "") {
                                                                    changeIsCorrect("majorLogo", false);
                                                                } else {
                                                                    changeIsCorrect("majorLogo", true);
                                                                }

                                                            }}></input>
                                                    </div>
                                                    : null
                                            }

                                            {
                                                props.loginPosition === "student"
                                                    ?
                                                    <>
                                                        <div className="inputField" style={{ justifyContent: "space-between" }}>
                                                            <i className="fas fa-user-graduate"></i>
                                                            <label>?????????</label>
                                                            <input placeholder="???????????? ??????????????????."
                                                                value={certFile["name"].replace(/^.*\//, '')}
                                                                readOnly></input>
                                                            <label className='fileButton' htmlFor="file">??????</label>
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
                                                    </>
                                                    : null

                                            }
                                        </>
                                }
                            </div>

                            <div className="editProfileBtns">
                                {
                                    editButtonState
                                        ?
                                        <>
                                            <button className="editProfileBtn" type="button" onClick={() => {
                                                props.loginPosition === "student"
                                                    ? (<>{window.confirm('????????? ????????? ?????? ?????? ??????????????? ?????? ?????? ?????? ????????? ?????? ????????? ?????????. ???????????? ?????????????????????????')
                                                        ? putProfile()
                                                        : alert("??????????????? ?????????????????????. ")}</>)
                                                    : (<>{
                                                        props.loginPosition === "president"
                                                            ? putProfile()
                                                            : null
                                                    }</>)
                                            }}>????????????</button>
                                        </>
                                        :
                                        <>
                                            <button className="editProfileBtn" type="button" style={{ backgroundColor: "white", color: "black" }}
                                                onClick={() => { alert('????????? ?????? ??????????????????.'); }}>????????????</button>
                                        </>
                                }

                                {/* 
                                <button className="editProfileBtn" type="button" onClick={() => {
                                    editButtonState ? putProfile() : alert('????????? ?????? ??????????????????.');
                                    props.loginPosition === "student"
                                        ? (<>{window.confirm('????????? ????????? ?????? ?????? ??????????????? ?????? ?????? ?????? ????????? ?????? ????????? ?????????. ???????????? ?????????????????????????')
                                            ? putProfile()
                                            : alert("??????????????? ?????????????????????. ")}</>)
                                        : (<>{
                                            props.loginPosition === "president"
                                                ? (<>{window.confirm('????????? ????????? ???????????? ?????? ????????? ????????? ??????????????? ??????????????? ?????? ?????????. ???????????? ?????????????????????????')
                                                    ? putProfile()
                                                    : alert("??????????????? ?????????????????????. ")}</>)
                                                : null
                                        }</>)
                                }}>????????????</button> */}

                                <button className="editProfileBtn" type="button" style={{ backgroundColor: "white", color: "black" }} onClick={() => { props.setEditProfileState(false); reset(); }}>??????</button>

                            </div>
                        </>
                        : boxState === "withdrawal"
                            ? <>
                                <div className='boxTitle' style={{ justifyContent: "center" }}  >
                                    <h2 ><i className="fas fa-user" style={{ color: "#dc3545" }} />????????????</h2>
                                </div>

                                <div className='editField' style={{ borderColor: "#dc3545" }}>

                                    <div className="inputField">
                                        <i className="fas fa-envelope"></i>
                                        <label>?????????</label>
                                        <input id="inputEmail" onChange={(e) => {
                                            setInputEmail(e.target.value)
                                            if (e.target.value === "") {
                                                changeIsCorrect("inputEmail", false);
                                            } else {
                                                changeIsCorrect("inputEmail", true);
                                            }
                                        }} value={inputEmail} type="text" placeholder='???????????? ???????????????.' />
                                    </div>

                                    <div className="inputField">
                                        <i className="fas fa-key"></i>
                                        <label>????????????</label>
                                        <input type="password" onChange={(e) => {
                                            setInputPassword(e.target.value)
                                            if (e.target.value === "") {
                                                changeIsCorrect("inputPassword", false);
                                            } else {
                                                changeIsCorrect("inputPassword", true);
                                            }
                                        }} value={inputPassword} placeholder='??????????????? ???????????????.' />

                                    </div>
                                </div>

                                <div className="editProfileBtns">
                                    <button className="editProfileBtn" type="button" style={{ backgroundColor: "#dc3545" }} onClick={() => { withdrawal(); }}>??????</button>
                                    <button className="editProfileBtn" type="button" style={{ backgroundColor: "white", color: "black" }} onClick={() => { setBoxState("profile") }}>??????</button>

                                </div>
                            </>
                            : boxState === "newPassword"
                                ? <>
                                    <div className='boxTitle'  >
                                        <h2 ><i className="fas fa-user" />???????????? ??????</h2>
                                    </div>

                                    <div className='editField' >
                                        <div className="inputField" >

                                            <i className="fas fa-key" style={isCorrect["inputPassword"] === true ? { color: "var(--color-quarter)" } : null}></i>
                                            <label >????????????</label>
                                            <input type="password" onChange={(e) => {
                                                setInputPassword(e.target.value)
                                                if (e.target.value === "") {
                                                    changeIsCorrect("inputPassword", false);
                                                } else {
                                                    changeIsCorrect("inputPassword", true);
                                                }
                                            }} value={inputPassword} placeholder='?????? ??????????????? ???????????????.' />
                                        </div>

                                        <div className="inputField">
                                            <i className="fas fa-key" style={isCorrect["inputNewPassword"] === true ? { color: "var(--color-quarter)" } : null}></i>
                                            <label >??? ????????????</label>
                                            <div style={{ width: "70%" }}>
                                                <input type="password" style={{ width: "100%" }} onChange={(e) => {
                                                    setInputNewPassword(e.target.value)
                                                    if (e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/)) {
                                                        changeIsCorrect("inputNewPassword", true);
                                                    } else {
                                                        changeIsCorrect("inputNewPassword", false);
                                                    }
                                                }} value={inputNewPassword} placeholder='??? ??????????????? ???????????????.' />
                                                {
                                                    isCorrect["inputNewPassword"] === false && inputNewPassword !== ""
                                                        ? <span style={{ fontSize: "1px", color: "red", display: "flex", alignItems: "center", justifyContent: "center" }}>8~16??? ?????? ??? ?????????, ??????, ??????????????? ???????????????. </span>
                                                        : null
                                                }
                                            </div>
                                        </div>

                                        <div className="inputField">
                                            <i className="fas fa-key" style={isCorrect["inputCheckNewPassword"] === true && inputNewPassword === inputCheckNewPassword ? { color: "var(--color-quarter)" } : null}></i>
                                            <label  >??? ???????????? ??????</label>
                                            <div style={{ width: "70%" }}>
                                                <input type="password" style={{ width: "100%" }} onChange={(e) => {
                                                    setInputCheckNewPassword(e.target.value)
                                                    if (inputNewPassword === e.target.value) {
                                                        changeIsCorrect("inputCheckNewPassword", true);
                                                    } else {
                                                        changeIsCorrect("inputCheckNewPassword", false);
                                                    }
                                                }} value={inputCheckNewPassword} placeholder='??? ??????????????? ?????? ???????????????.' />
                                                {
                                                    isCorrect["inputCheckNewPassword"] === false && inputCheckNewPassword !== ""
                                                        ? <span style={{ fontSize: "1px", color: "red", display: "flex", alignItems: "center", justifyContent: "center" }}>??????????????? ???????????? ????????????. </span>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="editProfileBtns">
                                        {
                                            newPasswordButton
                                                ?
                                                <button className="editProfileBtn" type="button" onClick={() => { newPassword(); }}>??????</button>
                                                :
                                                <button className="editProfileBtn" type="button" style={{ backgroundColor: "white", color: "black" }}
                                                    onClick={() => {
                                                        if (inputNewPassword !== inputPassword) {
                                                            alert("??? ???????????? ?????? ???????????? ????????????.")
                                                        } else {
                                                            alert("????????? ?????? ??????????????????")
                                                        }

                                                    }}>??????</button>

                                        }

                                        <button className="editProfileBtn" type="button" style={{ backgroundColor: "white", color: "black" }}
                                            onClick={() => {
                                                if (props.loginPosition === "admin") {
                                                    props.setEditProfileState(false);
                                                } else {
                                                    setBoxState("profile");
                                                }
                                                reset();
                                            }}>??????</button>

                                    </div>
                                </>
                                : null
                }

            </div>
        </div >

    );
}

export default EditProfile;