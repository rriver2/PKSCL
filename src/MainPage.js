import quarter1 from './img/quarter1.png';
import quarter2 from './img/quarter2.png';
import quarter3 from './img/quarter3.png';
import quarter4 from './img/quarter4.png';

import giraffe from './img/giraffe.png';
import EditProfile from './EditProfile';
import './css/MainPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PreviewImg from './PreviewImg';


function MainPage(props) {

    const history = useHistory();

    const [studentPresident, setStudentPresident] = useState();

    const [quarter, setQuarter] = useState();
    const [quarterDate, setQuarterDate] = useState();

    const [eventAmount, setEventAmount] = useState([]);
    const [quarterAmount, setQuarterAmount] = useState(0);
    const [currentQuarter, setCurrentQuarter] = useState(props.todayQuarter);
    const [showAllReceiptButton, setShowAllReceiptButton] = useState([]);
    const [editProfileState, setEditProfileState] = useState(false);

    const [major, setMajor] = useState();
    const [majorList, setMajorList] = useState();

    const [searchButton, setSearchButton] = useState("search");

    const [tempQuarter, setTempQuarter] = useState(false);

    const [showImg, setShowImg] = useState(false);
    const [previewImg, setPreviewImg] = useState();

    const [showCurrentQuerter, setShowCurrentQuerter] = useState();

    const [logoImgPath, setLogoImgPath] = useState();

    const [wrongApproach, setWrongApproach] = useState(false);
    const [wrongApproachContext, setWrongApproachContext] = useState();
    const [editProfileButton, setEditProfileButton] = useState(true);

    const [userLoginPosition, setUserLoginPosition] = useState();
    const [alertContainer,setAlertContainer] = useState(false);
    const [userStatus,setUserStatus] = useState();

    function resetShowAllReceiptButton() {
        let resetArray = [];
        if (quarter[currentQuarter]["eventList"] !== undefined) {
            for (let i = 0; i < quarter[currentQuarter]["eventList"].length; i++) {
                resetArray.push(true)
            }
        }
        setShowAllReceiptButton(resetArray)
    }

    function reset(quarterData) {
        if (quarter !== undefined && quarter[quarterData]["eventList"] !== undefined) {
            CalculateCurrentQuarterReceiptSumList(quarter[quarterData]["eventList"]);
            resetShowAllReceiptButton();
        }else{
            setQuarterAmount(0);
        }
        window.scrollTo(0, 0);
    }

    function showQuarter(selectedQuarter) {
        if (userLoginPosition === "student" || userLoginPosition === "president") {
            if (quarter[selectedQuarter]["status"] === "true") {
                reset(selectedQuarter);
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
                setShowCurrentQuerter(quarter[selectedQuarter]["status"]);
            } else {
                reset(selectedQuarter);
                setCurrentQuarter(selectedQuarter);
                defineColor(selectedQuarter);
                setShowCurrentQuerter(quarter[selectedQuarter]["status"]);
            }
        } else if (userLoginPosition === "admin") {
            reset(selectedQuarter);
            setCurrentQuarter(selectedQuarter);
            defineColor(selectedQuarter);
        }
        setLogoImgPath(`./img/${selectedQuarter}.png`);
    }

    function sumItems(price, amount) {
        return price * amount;
    }

    function sumReceipt(receiptDetailList) {
        let sumReceiptValue = 0;
        if (receiptDetailList !== undefined) {
            for (let i = 0; i < receiptDetailList.length; i++) {
                let item = receiptDetailList[i];
                sumReceiptValue = sumReceiptValue + sumItems(item["price"], item["amount"]);
            }
        }
        return sumReceiptValue;
    }

    function sumEvent(receiptList) {
        let sumEventValue = 0;
        for (let i = 0; i < receiptList.length; i++) {
            let receipt = receiptList[i]["receiptDetailList"];
            sumEventValue = sumEventValue + sumReceipt(receipt);
        }
        return sumEventValue
    }

    function CalculateCurrentQuarterReceiptSumList(eventList) {
        if (eventList === undefined) {
            setQuarterAmount(0);
        } else {
            let eventSum = [];
            for (let i = 0; i < eventList.length; i++) {
                eventSum.push(sumEvent(eventList[i]["receiptList"]));
            }
            setEventAmount([...eventSum]);

            let quarterSum = 0;
            for (let i = 0; i < eventSum.length; i++) {
                quarterSum = quarterSum + eventSum[i];
            }
            setQuarterAmount(quarterSum);
        }
    }

    function setColorProperty(colorQuarter, colorQuarterCircle, colorLeftPanel, colorCard, colorBackground) {
        document.documentElement.style.setProperty("--color-quarter", colorQuarter);
        document.documentElement.style.setProperty("--color-quarterCircle", colorQuarterCircle);
        document.documentElement.style.setProperty("--color-leftPanel", colorLeftPanel);
        document.documentElement.style.setProperty("--color-card", colorCard);
        document.documentElement.style.setProperty("--color-background", colorBackground);
        document.documentElement.style.setProperty("--color-clickedButton", colorQuarter);
    }

    function defineColor(quarter) {
        if (quarter === "quarter1") {
            setColorProperty("#db8f8e", "#fdeded", "#f5dede", "#FDEDF0", "#fbf6f6");
        } else if (quarter === "quarter2") {
            setColorProperty("#649d67", "#e9ede9", "#cedbcf", "#dee7df", "#f6f7f6");
        } else if (quarter === "quarter3") {
            setColorProperty("#c18356", "#f9eee5", "#e9d8cd", "#fff5ed", "#fbf7f4");
        } else if (quarter === "quarter4") {
            setColorProperty("#6b8396", "#e0eaf3", "#d0dbe5", "#e6f1fb", "#f8fcff");
        }
    }

    function logout() {
        axios.post(  '/logout')
            .then((payload) => {
                history.push('/');
            }).catch((error) => {
                switch (error.response.status) {
                    case 400:  
                        alert("??????????????? ??????????????????."); 
                        reload();
                    break;
                    default: 
                        alert("???????????? ??????/ error: " + error.response.status); 
                        reload();
                    break;
                }
            })
    }

    function adminButton() {
        if (majorList === undefined) {
            return;
        } else {
            return (<>
                <div className="mainSearchBar" >
                    <input className="majorList"
                        type="text" list="majorList-options" id='major' name="major" placeholder="????????? ???????????????."
                        onChange={(e) => {
                            setMajor(e.target.value);
                            ;
                        }}
                        style={{ width: "250px" }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                adminGetLedger(major);
                            }
                        }}
                        value={major}
                    >
                    </input>
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
                    <button style={{ boxShadow: "0 0 0 white" }} onClick={() => {
                        adminGetLedger(major);
                    }}> {
                            searchButton === "search"
                                ? <i className="fas fa-search"></i>
                                : <i className="fas fa-times"></i>
                        }</button>
                </div>
            </>
            )
        }
    }

    function adminGetLedger(ledgerMajor) {
        if (searchButton === "x") {
            setMajor("");
            setSearchButton("search");
        } else {
            if (major === "") {
                alert("???????????? ?????????????????? :)");
            } else if ((majorList.includes(ledgerMajor))) {
                let findMajorIndex = majorList.indexOf(ledgerMajor)
                getAdminLedger(findMajorIndex);
                adminGetDate(findMajorIndex);
                setMajor("");
                setSearchButton("search");
            } else {
                alert("???????????? ????????? ???????????? ?????? ??????????????????:)");
            }
        }
    }

    function getAdminLedger(findMajorIndex) {
        axios.get(  `/major-info/admin?major-number=${findMajorIndex}`)
            .then((payload) => {
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarter({ ...payload.data["quarter"] });
                reset(props.todayQuarter);
                showQuarter(props.todayQuarter);
                setShowCurrentQuerter(payload.data["quarter"][props.todayQuarter]["status"])
                setWrongApproach(false)
                setEditProfileButton(true);
                setLogoImgPath(`./img/${props.todayQuarter}.png`);
            })
            .catch((error) => {
                if (major === undefined) {
                    alert(`?????????????????? ????????? ????????? ??? ????????????. error :` + error.response.status)
                    // setWrongApproachContext(`?????????????????? ????????? ????????? ??? ????????????. error :` + error.response.status)
                    // setWrongApproach(true)
                    // setEditProfileButton(false);
                    // defineColor(props.todayQuarter);
                    // setLogoImgPath(`./img/${props.todayQuarter}.png`);
                } else {
                    alert(`${major} ????????? ????????? ??? ????????????. error :` + error.response.status)
                    // setWrongApproachContext(`${major} ????????? ????????? ??? ????????????. error :` + error.response.status)
                    // setWrongApproach(true)
                    // setEditProfileButton(false);
                    // defineColor(props.todayQuarter);
                    // setLogoImgPath(`./img/${props.todayQuarter}.png`);
                }
            })

    }

    function adminGetDate(findMajorIndex) {
        axios.get(`/ledger-date?major-number=${findMajorIndex}`)
            .then((payload) => {
                setQuarterDate({ ...payload.data });
                showQuarter(props.todayQuarter);
                setWrongApproach(false)
                setEditProfileButton(false);
            })
            .catch((error) => {
                if (major === undefined) {
                    setWrongApproachContext(`?????????????????? ?????? open, close ????????? ????????? ??? ????????????. error: ` + error.response.status)
                    setWrongApproach(true)
                    setEditProfileButton(false);
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                } else {
                    setWrongApproachContext(`${major}??? ?????? open, close ????????? ????????? ??? ????????????. error: `  + error.response.status)
                    setWrongApproach(true)
                    setEditProfileButton(false);
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                }
            })
    }

    function getExPKSCL() {
        axios.get( '/temp-major-info')
            .then((payload) => {
                setShowCurrentQuerter(payload.data["quarter"][props.todayQuarter]["status"])
                setWrongApproach(false)
                setEditProfileButton(false);
                setStudentPresident({ ...payload.data["studentPresident"] });
                setQuarter({ ...payload.data["quarter"] });
                setTempQuarter(true);
                setLogoImgPath(`./img/${props.todayQuarter}.png`);
                showQuarter("quarter1")
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 400: alert(`?????? ????????? ????????? ??? ????????????.`); break;
                    default: alert("?????? ?????? ?????? ??????/ error: " + error.response.status); break;
                }
            })
    }

    function loginAdmin() {
        let ledgerMajor;
        axios.get('/major-list')
            .then((payload) => {
                setMajorList([...payload.data["majorList"]]);
                if (major === undefined) {
                    let ledgerMajorList = [...payload.data["majorList"]];
                    ledgerMajor = (ledgerMajorList.indexOf("??????????????????"));
                    getAdminLedger(ledgerMajor);
                    adminGetDate(ledgerMajor);
                    defineColor(props.todayQuarter);
                } else {
                    getAdminLedger(major);
                    adminGetDate(major);
                    defineColor(props.todayQuarter);
                }
                setWrongApproach(false)
                setEditProfileButton(false);
            })
            .catch((error) => {
                setWrongApproachContext("?????? ???????????? ????????? ??? ????????????. error: " + error.response.status);
                setWrongApproach(false)
                setEditProfileButton(false); 
            })
    }

    function loginPresident() {

        axios.get('/status')
            .then((payload) => {
                setUserStatus(payload.data["status"])
                if (payload.data["status"] === "refusal") {
                    setWrongApproachContext("?????????(????????????)??? ?????? ?????? ???????????????. PKSCL ????????? ?????? ?????? ????????? ?????? ????????? ????????????.")
                    setWrongApproach(true)
                    setEditProfileButton(true);
                    defineColor(props.todayQuarter);
                }
                else if (payload.data["status"] === "waiting") {
                    setWrongApproachContext("?????????(????????????)??? ?????? ?????? ???????????????. PKSCL ????????? ?????? ?????? ????????? ???????????? :)");
                    setWrongApproach(true)
                    setEditProfileButton(true);
                    defineColor(props.todayQuarter);
                }
                else if (payload.data["status"] === "approval") {
                    axios.get('/major-info')
                        .then((payload) => {
                            setStudentPresident({ ...payload.data["studentPresident"] });
                            setQuarter({ ...payload.data["quarter"] });
                            setShowCurrentQuerter(payload.data["quarter"][props.todayQuarter]["status"])
                            setWrongApproach(false)
                            setEditProfileButton(false);
                            setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        })
                        .catch((error) => {
                            setWrongApproachContext("?????????(????????????)??? ?????? ?????? ???????????????. PKSCL ????????? ?????? ?????? ???????????? :) error: " + error.response.status);
                            setWrongApproach(true)
                            setEditProfileButton(true);
                            defineColor(props.todayQuarter);
                            setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        })
                }
            })
            .catch((error) => {
                switch (error.response.status) {
                case 400: 
                    setWrongApproachContext("??????????????? ?????? ????????? ??? ??? ????????????.");  
                    setEditProfileButton(false)
                    setWrongApproach(true)
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`); 
                break;
                default: 
                    setWrongApproachContext("??????????????? ?????? ?????? ??????/ error: " + error.response.status); 
                    setEditProfileButton(false)
                    setWrongApproach(true)
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                break;
            }  
            })


        reset(props.todayQuarter);
        defineColor(props.todayQuarter);
    }

    function loginStudent() {
        axios.get('/status')
            .then((payload) => {
                if (payload.data["status"] === "refusal") {
                    setWrongApproachContext("?????????(??????)??? ?????? ?????? ???????????????. ????????? ?????? ????????? ?????? ?????? ????????? ???????????? ?????????????????? ?????? ????????????, ????????? ??????????????? ????????? ???????????? ????????? ?????????????????? ????????? ????????? :)");
                    setWrongApproach(true)
                    setEditProfileButton(true);
                    defineColor(props.todayQuarter);
                }
                else if (payload.data["status"] === "waiting") {
                    setWrongApproachContext("?????????(??????)??? ?????? ?????? ???????????????. ????????? ?????? ????????? ?????? ?????? ????????? ???????????? ?????????????????? ?????? ????????????, ????????? ??????????????? ????????? ???????????? ????????? ?????????????????? ????????? ????????? :)");
                    setWrongApproach(true)
                    setEditProfileButton(true);
                    defineColor(props.todayQuarter);
                } else if (payload.data["status"] === "approval") {
                    axios.get(  '/major-info')
                        .then((payload) => {
                            setStudentPresident({ ...payload.data["studentPresident"] });
                            setQuarter({ ...payload.data["quarter"] });
                            setShowCurrentQuerter(payload.data["quarter"][props.todayQuarter]["status"])
                            setWrongApproach(false)
                            setEditProfileButton(false);
                            setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        })
                        .catch((error) => {
                            setWrongApproachContext("?????????(??????)??? ?????? ?????? ???????????????. PKSCL ????????? ?????? ?????? ???????????? :) error: " + error.response.status);
                            setWrongApproach(true)
                            setEditProfileButton(true);
                            defineColor(props.todayQuarter);
                            setLogoImgPath(`./img/${props.todayQuarter}.png`);
                        })
                }
            })
            .catch((error) => {
                switch (error.response.status) {
                case 400: 
                    setWrongApproachContext("????????? ?????? ????????? ??? ??? ????????????.");  
                    setEditProfileButton(false)
                    setWrongApproach(true)
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`); 
                break;
                default: 
                    setWrongApproachContext("????????? ?????? ?????? ??????/ error: " + error.response.status); 
                    setEditProfileButton(false)
                    setWrongApproach(true)
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                break;
                }  
            })
        reset(props.todayQuarter);
        defineColor(props.todayQuarter);
    }

    function reload() {
        axios.get('/position')
            .then((payload) => {
                if (payload.data["position"] === "admin") {
                    setWrongApproach(false)
                    setEditProfileButton(true);
                    loginAdmin()
                } else if (payload.data["position"] === "president") {
                    setWrongApproach(false)
                    setEditProfileButton(true);
                    loginPresident()
                } else if (payload.data["position"] === "student") {
                    setWrongApproach(false)
                    setEditProfileButton(true);
                    loginStudent()
                } else {
                    setWrongApproachContext("????????? ???????????????.");
                    setEditProfileButton(false)
                    setWrongApproach(false)
                }
                setLogoImgPath(`./img/${props.todayQuarter}.png`);
            })
            .catch((error) => {
                switch (error.response.status) {
                case 400: 
                    alert(`????????? ???????????????.`);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`); 
                break;
                default: 
                    alert("?????? position ?????? ??????/ error: " + error.response.status); 
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                break;
            }  
            })
    }

    useEffect(() => {

        // push ?????? ?????? ??????
        axios.get('/position')
            .then((payload) => {
                setUserLoginPosition(payload.data["position"])
                setLogoImgPath(`./img/${props.todayQuarter}.png`);
                reload()
                defineColor(props.todayQuarter);
            })
            .catch((error) => {
                switch (error.response.status) {
                case 400: 
                    setWrongApproachContext(`???????????? Position??? ??? ??? ????????????.`);
                    setWrongApproach(true)
                    setEditProfileButton(false);
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                break;
                default:  
                    setWrongApproachContext("?????? position ?????? ??????/ error: " + error.response.status); 
                    setWrongApproach(true)
                    setEditProfileButton(false);
                    defineColor(props.todayQuarter);
                    setLogoImgPath(`./img/${props.todayQuarter}.png`);
                break;
            }  
            })

        // push ?????? ?????? ??????
    // let answer = {"studentPresident":{"major":"????????????","name":"?????????","phoneNumber":"010-1234-5678","email":"cherisher20@pukyong.ac.kr","majorLogo":"./static/majorLogo/20220317084609677.png"},"quarter":{"quarter1":{"status":"true","eventList":[{"eventNumber":"171","eventTitle":"??????????????? (?????? : 3/27~3/32)","eventContext":"[?????????]??? ????????? ?????????","receiptList":[{"receiptNumber":"181","receiptTitle":"????????? ?????????","receiptImg":{"name":"./static/receiptImg/20220317084939636.JPEG"},"receiptContext":"???????????? ????????? 300???","receiptDetailList":[{"context":"LED ??????","price":"600","amount":"100","totalAmount":"60000"},{"context":"LED ???","price":"500","amount":"100","totalAmount":"50000"},{"context":"LED ??????","price":"400","amount":"100","totalAmount":"40000"}]},{"receiptNumber":"228","receiptTitle":"?????? ?????????","receiptImg":{"name":"./static/receiptImg/20220317084939630.JPEG"},"receiptContext":"","receiptDetailList":[{"context":"\b???????????? ??????","price":"100000","amount":"1","totalAmount":"100000"},{"context":"?????? 4???","price":"39800","amount":"3","totalAmount":"119400"}]}]},{"eventNumber":"228","eventTitle":"??????????????? 2","eventContext":"","receiptList":[]},{"eventNumber":"164","eventTitle":"???????????? ????????? ( 4/20 ?????? )","eventContext":"???????????? ??????????????? ??????????????? ~","receiptList":[{"receiptNumber":"177","receiptTitle":"????????? ?????? ???????????? ??????","receiptImg":{"name":"./static/receiptImg/20220317085128606.JPEG"},"receiptContext":"1???, 2???, 3??? ???","receiptDetailList":[{"context":"\b????????????","price":"50000","amount":"1","totalAmount":"50000"},{"context":"BBQ","price":"12900","amount":"5","totalAmount":"64500"},{"context":"??????????????????","price":"5900","amount":"10","totalAmount":"59000"}]}]},{"eventNumber":"229","eventTitle":"????????? ?????????","eventContext":"","receiptList":[]}]},"quarter2":{"status":"false"},"quarter3":{"status":"true","eventList":[{"eventNumber":"170","eventTitle":"????????? ?????????","eventContext":"","receiptList":[{"receiptNumber":"180","receiptTitle":"","receiptImg":{"name":"./static/receiptImg/defaultReceiptImg.jpg"},"receiptContext":"","receiptDetailList":[{"context":"ww","price":"11","amount":"22","totalAmount":"242"}]}]}]},"quarter4":{"status":"true"}}}
    // let answerDate = {
    //     "quarter1": ["2022-01-01", "2022-01-02"],
    //     "quarter2": ["2022-01-03", "2022-01-04"],
    //     "quarter3": ["2022-01-05", "2022-01-06"],
    //     "quarter4": ["2022-01-07", "2022-01-08"]
    // }
    // let answerMajorList = ["????????????", "??????????????????", "??????????????????", "??????????????????", "?????????", "????????????", "?????????", "????????????", "??????????????????", "????????????", "??????????????????", "??????????????????", "???????????????", "?????????????????????", "?????????????????????", "?????????????????????", "????????????", "??????????????????", "???????????????", "????????????", "????????????", "?????????", "???????????????", "?????????????????????", "????????????", "????????????????????????????????????", "???????????????", "????????????", "???????????????", "????????????????????????", "IT?????????????????????", "???????????????", "??????????????????????????????", "????????????", "???????????????", "???????????????", "?????????????????????", "?????????????????????", "??????????????????????????????", "??????????????????", "???????????????", "??????????????????", "???????????????", "???????????????", "???????????????", "?????????????????????", "????????????????????????", "?????????????????????", "???????????????????????????", "?????????????????????", "???????????????", "???????????????", "?????????????????????", "???????????????", "??????????????????????????????", "?????????????????????????????????", "????????????????????????", "????????????????????????", "??????????????????", "??????????????????", "???????????????", "?????????????????????", "???????????????", "???????????????", "????????????", "?????????????????????", "?????????????????????", "????????????????????????", "??????????????????????????????", "???????????????", "????????????????????????(????????????????????????)", "????????????????????????(???????????????????????????????????)", "?????????????????????????????????(??????????????????)", "?????????????????????????????????(??????ICT????????????)", "???????????????????????????(???????????????)", "???????????????????????????(?????????????????????)", "???????????????????????????(???????????????????????????)", "???????????????????????????(??????????????????)", "???????????????????????????(????????????????????????)", "????????????(???????????????)", "????????????(?????????????????????)", "????????????(?????????????????????)", "??????????????????(???????????????????????????????????)", "??????????????????(?????????????????????)", "??????????????????????????", "???????????????????????????", "????????????????????????????????????", "????????????????????????"] 

    //         setStudentPresident({ ...answer["studentPresident"] });
    //         setQuarter({ ...answer["quarter"] });
    //         reset(props.todayQuarter);
    //         showQuarter(props.todayQuarter);
    //         setLogoImgPath(`./img/${props.todayQuarter}.png`);
    //         setShowCurrentQuerter(answer["quarter"][props.todayQuarter]["status"])
    //         setStudentPresident({ ...answer["studentPresident"] });
    //         setQuarterDate({ ...answerDate });
    //         setUserLoginPosition("president")
    //         setMajorList([...answerMajorList]);
    //         defineColor(props.todayQuarter);
    }, []);

    useEffect(() => {
        if (quarter !== undefined) {
            reset(currentQuarter);
        }
    }, [currentQuarter])

    useEffect(() => {
        if (quarter !== undefined)
            reset(props.todayQuarter);

    }, [quarter])

    useEffect(()=>{
        if (userLoginPosition === "president" ||userLoginPosition === "admin")
        setAlertContainer(true)
    },[userLoginPosition])

    return (
        <>
        {
            defineColor(currentQuarter)
        }
        {wrongApproach === true
            ? (<>
                {
                    editProfileState
                        ?
                        <EditProfile loginPosition={userLoginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                        : null
                }
               
                <div className="MainPageContainer"
                    style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                         <div className="nav" >
                    <div className="logoNav">
                        <img src={logoImgPath} alt="logo"  width={"40px"} height={"40px"} />
                        <div className="PksclNav PCVersion" >PKSCL</div>
                    </div>
                    {
                        editProfileButton === true
                            ? (<>{
                                userLoginPosition === "admin"
                                    ? (<div className="buttonNav">
                                        <i class="fas fa-headset" onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                        <button className='navButton' type='button' onClick={() => { logout(); }}>????????????</button>
                                    </div>)
                                    : (
                                        <div className="buttonNav">
                                            <i class="fas fa-user"  onClick={() => { setEditProfileState(true); }}></i>
                                            <i class="fas fa-headset"  onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                            <button className='navButton' type='button' onClick={() => { logout(); }}>????????????</button>
                                        </div>)
                            }</>
                            )
                            : (<div className="buttonNav">
                                <button className='navButton' type='button' onClick={() => { history.push('/'); }}>?????????</button>
                            </div>)
                    }


                </div>
                    <div className="errorGiraffe">
                        {wrongApproachContext}<br />
                        ????????? ????????? ??????????????? ????????? ??????????????? :)

                        <img onClick={() => { getExPKSCL() }} src={giraffe} className="giraffe" alt="??????"
                            style={{ width: "70px", height: "70px", marginLeft: "20px" }} />
                        <a href="http://pf.kakao.com/_tRxcJb " target="_blank" rel="noreferrer" title="???????????? ???????????????." style={{ color: "black" }}>PKSCL ????????????</a>
                    </div></div></>)
            : (<div className="MainPageContainer">
                {
                    showImg
                        ? <PreviewImg setShowImg={setShowImg} previewImg={previewImg}></PreviewImg>
                        : null
                }
                {
                    editProfileState
                        ?
                        <EditProfile loginPosition={userLoginPosition} setEditProfileState={setEditProfileState}></EditProfile>
                        : null
                }
                {
                    alertContainer === true
                    ?<div className="alertContainer alertContainermobileVersion">
                        <div className="alertBox">
                            <div style={{display : "flex", justifyContent: "flex-end", width: "100%"}}>
                                <button className="alertButton" onClick={()=>{setAlertContainer(false)}}>
                                    <i className="fas fa-times"></i></button>
                            </div>
                            <div className="alertContext">
                                {
                                    userLoginPosition === "president"
                                    ?<div>mobile?????? ?????? ???????????? ?????? ????????? ?????? ??? ????????????.<br/>
                                        ?????? ??????, ?????? ?????? ??? ??? ?????? ???????????? ?????????????????? PC??? ??????????????????.</div>
                                    :<div>mobile??????  ?????? ????????? ?????? ??? ????????????.<br/>
                                        ?????????????????? ??? ?????? ?????? ?????? ??? ?????? ????????? ???????????? PC??? ??????????????????.</div>
                                }
                            </div>
                        </div>
                    </div>
                    

                    : null
                }
                {
                    quarter === undefined
                        ? null
                        : (<>
                            <div className="leftPanel" >
                                <div className="majorCard">
                                    <div className="presidentCard">
                                        <h2>{studentPresident["major"]}</h2>
                                        <img src={studentPresident["majorLogo"]} alt="majorLogo" height={"150"} width={"10"} />
                                        {
                                            userLoginPosition === "president" && studentPresident["majorLogo"] === "./static/majorLogo/templogo.jpg"
                                            ? <p style={{color:"#d32c2c"}}>?????? ????????? ????????? ???????????? ?????? ??????????????? :)</p>
                                            : null
                                        }
                                        <h3>{studentPresident["name"]}</h3>
                                        <p>{studentPresident["email"]}</p>
                                    </div>
                                    <div className="cogExplanation">
                                        ??????????????? {studentPresident["major"]} ?????? {studentPresident["name"]}?????????.
                                        PKSCL ????????? ????????? ?????? ?????? ????????? ???????????? ??????????????? :)
                                        ?????? ?????? ??? ?????? ????????? ??????????????? ???????????? ??????????????????.
                                        <div style={{ color: "#d32c2c" }}>??? ????????? ????????? ????????? ?????? ??? ???????????? ????????? ????????? ?????? ???????????? ????????????.</div>
                                    </div>
                                </div>
                                <div className="quarter">
                                    <div className="quarterButton" onClick={() => { showQuarter("quarter1") }}><div>1??????</div><img src={quarter1} alt="quarter1" ></img></div>
                                    <div className="quarterButton" onClick={() => { showQuarter("quarter2") }}><div>2??????</div><img src={quarter2} alt="quarter2" ></img></div>
                                    <div className="quarterButton" onClick={() => { showQuarter("quarter3") }}><div>3??????</div><img src={quarter3} alt="quarter3" ></img></div>
                                    <div className="quarterButton" onClick={() => { showQuarter("quarter4") }}><div>4??????</div><img src={quarter4} alt="quarter4" ></img></div>
                                </div>
                            </div>

                            <div className="rightPanel">

                                <div className="nav">
                                    <div className="logoNav" onClick={()=>{history.push('/main')}}>
                                         <img src={logoImgPath} alt="logo"  width={"40px"} height={"40px"} />
                                        <div className="PksclNav PCVersion" >PKSCL</div>
                                        <div className="quarterSelecter">
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter1") }}><div>1</div><img src={quarter1} alt="quarter1" ></img></div>
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter2") }}><div>2</div><img src={quarter2} alt="quarter2" ></img></div>
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter3") }}><div>3</div><img src={quarter3} alt="quarter3" ></img></div>
                                            <div className="quarterButton" onClick={() => { showQuarter("quarter4") }}><div>4</div><img src={quarter4} alt="quarter4" ></img></div>
                                        </div>
                                    </div>
                                        {
                                            userLoginPosition === "president"
                                                ? (<>
                                                    {
                                                        tempQuarter === true
                                                            ?<>
                                                            <div className='buttonNav' >
                                                                    <div className="tempAlert PCVersion" >???????????? ?????? ?????? ????????? ?????? ?????? ????????? ?????? ????????????.</div>
                                                                    <i class="fas fa-user" onClick={() => { setEditProfileState(true); }}></i>
                                                                    <i class="fas fa-headset navButtonProfile" onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                                    <button className='navButton' type='button' onClick={() => { logout(); }}>????????????</button >
                                                                    
                                                            </div>
                                                            {/* <div className="tempAlert mobileVersion" >???????????? ?????? ?????? ????????? ?????? ?????? ????????? ?????? ????????????.</div> */}
                                                            </>
                                                            :<>
                                                            <div className='buttonNav' >
                                                                <div className="tempAlert PCVersion" >
                                                                    ?????? {studentPresident["major"]} ??????????????? ????????? ?????? ?????????. </div>
                                                                {/* <button className='navButton' type='button' onClick={() => {history.push('/manage') }}>?????? ??????</button>*/}
                                                                <i class="fas fa-user navButtonProfile"  onClick={() => { setEditProfileState(true); }}></i>
                                                                <i class="fas fa-headset navButtonProfile" onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                                <button className='navButton edit navButtonEdit'  type='button' onClick={() => { history.push('/edit-main') }}>?????? ?????? ?????????</button> 
                                                                <button className='navButton' type='button' onClick={() => { logout(); }}>????????????</button>
                                                            </div>
                                                            {/* <div className="tempAlert mobileVersion" >?????? {studentPresident["major"]} ??????????????? ????????? ?????? ?????????. </div> */}
                                                            </>
                                                    }
                                                </>)
                                                : (<>
{
                                                        userLoginPosition === "admin"
                                                            ? (
                                                                <div  className='buttonNav PCVersion' >
                                                                <button className='navButton' type='button' onClick={() => {history.push('/manage') }}>?????? ??????</button>
                                                            </div>)
                                                            : null
                                                    }
                                        {
                                                        quarterDate !== undefined && userLoginPosition === "admin"
                                                            ? (<div className='adminNav PCVersion' >
                                                                    <div className="dateInput">{quarterDate[currentQuarter][0]}~{quarterDate[currentQuarter][1]}</div>
                                                                    {adminButton()}</div>)
                                                                : null
                                                    }
                                                    <div  className='buttonNav' >
                                                    <i class="fas fa-user"  onClick={() => { setEditProfileState(true); }}></i>
                                                    <i class="fas fa-headset" onClick={() => { window.open("http://pf.kakao.com/_tRxcJb ") }}></i>
                                                    
                                                    <button className='navButton' type='button' onClick={() => { logout(); }}>????????????</button></div>
                                                    
                                                </>)
                                        }

                                </div>
                                {
                                    showCurrentQuerter === "true"
                                        ? (<>
                                            <div className="quarterData">
                                              
                                                <h2 className="quarterTotalAmount" style={{ fontWeight: "bold" }}>
                                                    {currentQuarter[currentQuarter.length - 1]}?????? ??? ?????? : {quarterAmount}???
                                                </h2>
                                                {
                                                    quarter[currentQuarter]["eventList"] === undefined
                                                        ? <div>????????? ????????? ????????????.</div>
                                                        : (quarter[currentQuarter]["eventList"].map((event, i) => {
                                                            return (
                                                                <div className="eventCardBox" >
                                                                    <div className="eventCard" >
                                                                        <div className="cardContent">
                                                                            <div className="eventSource">
                                                                                <div className="eventSourceBox">
                                                                                    <h4 className="titleLimitation">{event["eventTitle"]}</h4>
                                                                                    <div style={{ color: "var(--color-quarter)" }}>?????? ??? ?????? : {eventAmount[i]}???</div>

                                                                                    <div className="contextLimitation">{event["eventContext"]}  </div>
                                                                                </div>
                                                                                <div className="eventButtons">
                                                                                    {
                                                                                        event.receiptList.length <= 1
                                                                                            ? null
                                                                                            : (
                                                                                                showAllReceiptButton[i] === false
                                                                                                    ? (
                                                                                                        <button style={{ width: "50px" }} onClick={() => {
                                                                                                            let array = [...showAllReceiptButton];
                                                                                                            array[i] = !showAllReceiptButton[i];
                                                                                                            setShowAllReceiptButton(array)
                                                                                                        }}><i class="fas fa-angle-double-up"></i></button>
                                                                                                    )
                                                                                                    : (
                                                                                                        <button style={{ width: "50px" }} onClick={() => {
                                                                                                            let array = [...showAllReceiptButton];
                                                                                                            array[i] = !showAllReceiptButton[i];
                                                                                                            setShowAllReceiptButton(array)
                                                                                                        }}><i class="fas fa-angle-double-down"></i></button>
                                                                                                    )
                                                                                            )

                                                                                    }
                                                                                </div>
                                                                            </div>

                                                                            {
                                                                                showAllReceiptButton[i] === true
                                                                                    ? (<div id="receiptContent" style={{ height: "440px", overflowY: "hidden" }}>

                                                                                        <div className="receiptCard">
                                                                                            <div className="receiptResource">
                                                                                                {
                                                                                                    event["receiptList"].length === 0
                                                                                                        ? <div>????????? ???????????? ????????????.</div>
                                                                                                        : (<>
                                                                                                            <h5 className="titleLimitation">{event["receiptList"][0]["receiptTitle"]}</h5>
                                                                                                            {
                                                                                                                event["receiptList"][0]["receiptDetailList"].length === 0
                                                                                                                    ? null
                                                                                                                    : (<div style={{ color: "var(--color-quarter)" }}>1?????? ????????? ?????? : {sumReceipt(event["receiptList"][0]["receiptDetailList"])}???</div>)
                                                                                                            }


                                                                                                            <div className="contextLimitation">{event["receiptList"][0]["receiptContext"]}</div>



                                                                                                            {
                                                                                                                event["receiptList"][0]["receiptDetailList"].length === 0
                                                                                                                    ? <div className="noneContext"> ????????? ????????? ????????? ????????????.</div>
                                                                                                                    : (<><table className="receiptTable"><thead>
                                                                                                                        <tr>
                                                                                                                            <th>??????</th>
                                                                                                                            <th>??????</th>
                                                                                                                            <th>??????</th>
                                                                                                                            <th>??????</th>
                                                                                                                        </tr>
                                                                                                                    </thead>
                                                                                                                        <tbody>{event["receiptList"][0]["receiptDetailList"].map((item, k) => {
                                                                                                                            return (<tr>
                                                                                                                                <td>{item["context"]}</td>
                                                                                                                                <td>{item["price"]}</td>
                                                                                                                                <td>{item["amount"]}</td>
                                                                                                                                <td>{sumItems(item["price"], item["amount"])}</td>
                                                                                                                            </tr>)
                                                                                                                        })}
                                                                                                                        </tbody> </table></>)
                                                                                                            }
                                                                                                        </>
                                                                                                        )
                                                                                                }

                                                                                            </div>
                                                                                            {
                                                                                                event["receiptList"].length === 0
                                                                                                    ? null
                                                                                                    :
                                                                                                    <img className="receiptImg" src={event["receiptList"][0]["receiptImg"]["name"]}
                                                                                                        style={{ backgroundColor: "var(--color-leftPanel)" }} width="400px"
                                                                                                        alt={event["receiptList"][0]["receiptImg"]["name"]}
                                                                                                        onClick={() => { setShowImg(true); setPreviewImg(event["receiptList"][0]["receiptImg"]["name"]); }} />
                                                                                            }
                                                                                        </div>
                                                                                    </div>)
                                                                                    : (<div id="receiptContent" >
                                                                                        {
                                                                                            event["receiptList"].map((receipt, j) => {
                                                                                                return (
                                                                                                    <div className="receiptCard">
                                                                                                        <div className="receiptResource">
                                                                                                            {
                                                                                                                event["receiptList"].length === 0
                                                                                                                    ? <div>????????? ???????????? ????????????.</div>
                                                                                                                    : (<>
                                                                                                                        <h5 className="titleLimitation">{receipt["receiptTitle"]}</h5>
                                                                                                                        {
                                                                                                                            receipt["receiptDetailList"].length === 0
                                                                                                                                ? null
                                                                                                                                : <div style={{ color: "var(--color-quarter)" }}>{j + 1}?????? ????????? ?????? : {sumReceipt(receipt["receiptDetailList"])}???</div>
                                                                                                                        }
                                                                                                                        <div className="contextLimitation">{receipt["receiptContext"]}</div>
                                                                                                                        {
                                                                                                                            receipt["receiptDetailList"].length === 0
                                                                                                                                ? <div>????????? ????????? ????????? ????????????.</div>
                                                                                                                                : (<>
                                                                                                                                    <table className="receiptTable">
                                                                                                                                        <thead>
                                                                                                                                            <tr>
                                                                                                                                                <th>??????</th>
                                                                                                                                                <th>??????</th>
                                                                                                                                                <th>??????</th>
                                                                                                                                                <th>??????</th>
                                                                                                                                            </tr>
                                                                                                                                        </thead>
                                                                                                                                        <tbody>
                                                                                                                                            {receipt["receiptDetailList"].map((item, k) => {
                                                                                                                                                return (<tr>
                                                                                                                                                    <td>{item["context"]}</td>
                                                                                                                                                    <td>{item["price"]}</td>
                                                                                                                                                    <td>{item["amount"]}</td>
                                                                                                                                                    <td>{sumItems(item["price"], item["amount"])}</td>
                                                                                                                                                </tr>)
                                                                                                                                            })
                                                                                                                                            }
                                                                                                                                        </tbody> </table>
                                                                                                                                </>
                                                                                                                                )
                                                                                                                        }

                                                                                                                    </>)}
                                                                                                        </div>
                                                                                                        {
                                                                                                            event["receiptList"].length === 0
                                                                                                                ? null
                                                                                                                : <img src={receipt["receiptImg"]["name"]} alt={receipt["receiptImg"]["name"]}
                                                                                                                    style={{ backgroundColor: "var(--color-leftPanel)" }} width="400px"
                                                                                                                    className="receiptImg"
                                                                                                                    onClick={() => { setShowImg(true); setPreviewImg(receipt["receiptImg"]["name"]); }} />
                                                                                                        }
                                                                                                    </div>

                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>)

                                                                            }


                                                                        </div>

                                                                    </div>
                                                                    {
                                                                        event.receiptList.length > 1 && showAllReceiptButton[i] === false
                                                                            ? <div className="giraffeDiv"><img src={giraffe} className="giraffe" alt="" style={{ width: "70px", height: "70px" }} /><div style={{ marginBottom: "50px", textAlign: "center" }}></div></div>
                                                                            : null
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                        )
                                                }

                                            </div>
                                        </>)
                                        : 
                                        (
                                            <div className="quarterData" style={{ display: "flex", color: "red" }}>
                                                <div className="errorGiraffe">
                                                    {currentQuarter[currentQuarter.length - 1]}?????? ????????? ??????????????? ?????? ???????????? ???????????????.
                                                    <br />????????? ????????? ??????????????? ????????? ??????????????? :)
                                                    <img onClick={() => { getExPKSCL() }} src={giraffe} className="giraffe" alt="" style={{ width: "70px", height: "70px", marginLeft: "20px" }} />
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                        </>
                        )
                }

            </div>)

        }</>

    )
}

export default MainPage;