import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './css/EditEvent.css'
import PreviewImg from './PreviewImg';
import Loading from './Loading';

function EditEvent(props) {

    const [eventData, setEventData] = useState();
    const [deleteReceiptList, SetDeleteReceiptList] = useState([]);
    const [showImg, setShowImg] = useState(false);
    const [editState, setEditState] = useState(true);
    const [showLoadingPage, setShowLoadingPage] = useState(false);

    const [previewImg, setPreviewImg] = useState();
    const [eventAmount, setEventAmount] = useState();


    function changeEventItem(value, item) {
        let tempEditEventData = { ...eventData };
        tempEditEventData[item] = value;
        setEventData(tempEditEventData);
    }

    function changeReceiptItem(value, j, item) {
        let tempEditEventData = { ...eventData };
        tempEditEventData["receiptList"][j][item] = value;
        setEventData(tempEditEventData);
    }

    function changeItem(key, value, j, k) {
        let tempEditEventData = { ...eventData };
        let item = tempEditEventData["receiptList"][j]["receiptDetailList"][k];
        item[key] = value;
        item["totalAmount"] = item["price"] * item["amount"];
        setEventData(tempEditEventData);
    }

    function processImage(file) {
        if (file != null) {
            const imageFile = file;

            if (file["name"] === "" || file["name"].includes('/')) return file.name;
            else {
                const imageUrl = URL.createObjectURL(imageFile);
                return imageUrl;
            }
        }
    }

    function receiptDeleteButton(j) {
            if (eventData["receiptList"][j]["receiptNumber"] !== undefined) {
                SetDeleteReceiptList([...deleteReceiptList, eventData["receiptList"][j]["receiptNumber"]])
            }
            let tempEditEventData = {
                "eventNumber": eventData["eventNumber"],
                "eventTitle": eventData["eventTitle"],
                "eventContext": eventData["eventContext"],
                "receiptList":
                    eventData["receiptList"].filter(
                        (event, i) => {
                            return (i !== j)
                        })
            }
            setEventData(tempEditEventData);
            // alert("???????????? ?????????????????????.");
    }

    function receiptDetailDeleteButton(j, k) {
        let tempEditEventData = {
            "eventNumber": eventData["eventNumber"],
            "eventTitle": eventData["eventTitle"],
            "eventContext": eventData["eventContext"],
            "receiptList":
                eventData["receiptList"].map((receipt, p) => {
                    if (p !== j) return receipt;
                    return ({
                        "receiptNumber": receipt["receiptNumber"],
                        "receiptTitle": receipt["receiptTitle"],
                        "receiptImg": receipt["receiptImg"],
                        "receiptContext": receipt["receiptContext"],
                        "receiptDetailList":
                            receipt["receiptDetailList"].filter(
                                (event, i) => {
                                    return (i !== k)
                                })
                    }
                    )
                })
        }
        setEventData(tempEditEventData);
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

    function uploadImg(img, j) {
        let tempEditEventData = { ...eventData };
        tempEditEventData["receiptList"][j]["receiptImg"] = img;

        setEventData(tempEditEventData);
    }

    function receiptTableAddButton(j) {
        let tempEditEventData = { ...eventData };
        tempEditEventData["receiptList"][j]["receiptDetailList"].push({
            "context": "",
            "price": "",
            "amount": "",
            "totalAmount": ""
        })
        setEventData(tempEditEventData);
    }

    function receiptAddButton() {
        let tempEditEventData = { ...eventData };
        tempEditEventData["receiptList"].push({

            "receiptTitle": "",
            "receiptImg": { name: "./static/receiptImg/defaultReceiptImg.jpg" },
            "receiptContext": "",
            "receiptDetailList": [
                {
                    "context": "",
                    "price": "",
                    "amount": "",
                    "totalAmount": ""

                }
            ]
        })
        setEventData(tempEditEventData);
    }

    function editEventButton() {
        setShowLoadingPage(true)
        let payload = {
            "eventNumber": eventData["eventNumber"],
            "eventTitle": eventData["eventTitle"],
            "eventContext": eventData["eventContext"]
        }

        let promise = new Promise((resolve, reject) => {
            axios.patch("/event", payload)
                .then((payload) => {
                    resolve("?????? ??????, ?????? ?????? ?????? ??????")
                })
                .catch((error) => {
                    reject(`?????? ??????, ?????? ?????? ????????? ?????????????????????. error: ${error.response.status}`)
                })
        })

        promise
            .then(value => {
                if (deleteReceiptList.length !== 0) {
                    deleteReceiptListAPI();
                }
                else {
                    sendReciept();
                }
            })
            .catch((value => {
                alert(value)
                sendReciept();
            }))

    }

    function deleteReceiptListAPI() {
        let deleteReceiptListURL = "";
        for (let i = 0; i < deleteReceiptList.length; i++) {
            if (deleteReceiptListURL === "") {
                deleteReceiptListURL = deleteReceiptListURL + deleteReceiptList[i];
            } else {
                deleteReceiptListURL = deleteReceiptListURL + "," + deleteReceiptList[i];
            }
        }
        let promise = new Promise((resolve, reject) => {
            axios.delete("/receipt?receipt-number=" + deleteReceiptListURL)
                .then((payload) => {
                    resolve("????????? ?????? ??????")
                })
                .catch((error) => {
                    reject(`????????? ????????? ?????????????????????. error: ${error.response.status}`)
                })
        })

        promise
            .then(value => {
                sendReciept();
            })
            .catch((value => {
                alert(value)
                sendReciept();
            }))

    }

    async function postReceipt(receiptData) {

        let payload = new FormData();


        if (!receiptData["receiptImg"]["name"].includes("./static/receiptImg/")) {
            payload.append("receiptImgFile", receiptData["receiptImg"])
        }
        payload.append("receiptImgPath", "./static/receiptImg/" + receiptData["receiptImg"]["name"])

        payload.append("eventNumber", eventData["eventNumber"]);
        payload.append("receiptTitle", receiptData["receiptTitle"]);
        payload.append("receiptContext", receiptData["receiptContext"]);

        for (var i = 0; i < receiptData["receiptDetailList"].length; i++) {
            payload.append(`context[${i}]`, receiptData["receiptDetailList"][i]["context"]);
            payload.append(`price[${i}]`, receiptData["receiptDetailList"][i]["price"]);
            payload.append(`amount[${i}]`, receiptData["receiptDetailList"][i]["amount"]);
        }

           const Axios = await axios.post( "/receipt", payload,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )

     return Axios;

    }

    async function putReceipt(receiptData) {

        let payload = new FormData();

        if (!receiptData["receiptImg"]["name"].includes("./static/receiptImg/")) {
            payload.append("receiptImgFile", receiptData["receiptImg"])
        }

        payload.append("receiptNumber", receiptData["receiptNumber"]);
        payload.append("receiptTitle", receiptData["receiptTitle"]);
        payload.append("receiptContext", receiptData["receiptContext"]);

        for (var i = 0; i < receiptData["receiptDetailList"].length; i++) {
            payload.append(`context[${i}]`, receiptData["receiptDetailList"][i]["context"]);
            payload.append(`price[${i}]`, receiptData["receiptDetailList"][i]["price"]);
            payload.append(`amount[${i}]`, receiptData["receiptDetailList"][i]["amount"]);
        }


        const Axios = await axios.put( "/receipt", payload,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )

         return Axios;
    }

    // function sendReciept() {
    //         Promise.all(
    //             eventData["receiptList"].map(async receipt => {
                    
    //             })
    //             ).then(() => { 
    //                 props.setEditEventState(false)})
    //             .catch(() => alert('?????? ????????? ??????????????????'))
    // }

    async function sendReciept() {
        let failedReceiptArray =[];
        let failedImgReceiptArray =[];
        let success = true;
        const unresolved = eventData["receiptList"].map(async(receipt,i) => {
            if (receipt["receiptNumber"] === undefined) {
                return await postReceipt(receipt).catch((error)=>{
                    success = false;
                    switch (error.response.status) {
                    case 502:
                        failedImgReceiptArray.push(i+1);
                        break;
                    default:
                        failedReceiptArray.push(i+1+ "(error: "+error.response.status+")");
                        break;
                }
                });
            } else {
                return await putReceipt(receipt).catch((error)=>{
                    success = false;
                    switch (error.response.status) {
                    case 502:
                        failedImgReceiptArray.push(i+1);
                        break;
                    default:
                        failedReceiptArray.push(i+1 + "(error: "+error.response.status+")");
                        break;
                    }
                });
            }
        })

       
        await Promise.all(unresolved)
        .then(() => { 
            setShowLoadingPage(false)
            if(success === true){
                props.setEditEventState(false)
            }else{
                if(failedImgReceiptArray.length !== 0){
                    failedImgReceiptArray.sort();
                    alert(failedImgReceiptArray+"?????? ????????? ???????????? ????????? ?????????????????????. ????????? ?????? ???????????? ?????? ????????? 10MB ????????? ???????????? ?????? ????????????????????????.");
                }
                if(failedReceiptArray.length !== 0){
                    failedReceiptArray.sort();
                    alert(failedReceiptArray+"?????? ????????? ???????????? ?????????????????????. ????????? ??????????????? ????????? ?????? PKSCL ???????????? ??????????????????. ");
                }
            }})
    }



    function CalculateCurrentQuarterReceiptSumList(eventList) {
        let amountReceipt = 0;
        if (eventData !== undefined) {
            for (let i = 0; i < eventData["receiptList"].length; i++) {
                amountReceipt = amountReceipt + sumReceipt(eventData["receiptList"][i]["receiptDetailList"])
            }
            setEventAmount(amountReceipt)
        }
    }


    useEffect(() => {
        setEventAmount(props.editEventAmount);
        setEventData(props.editEventData);
    }, [])


    useEffect(() => {
        CalculateCurrentQuarterReceiptSumList();
    }, [eventData]);

    return (
        // <div className="editEventContainer">
        <div className="editEventBox">
            {
                showLoadingPage === true
                ? <Loading></Loading>
                : null                        
            }
            {
                showImg
                    ? <PreviewImg setShowImg={setShowImg} previewImg={previewImg}></PreviewImg>
                    : null
            }
            <div className="quarterData" style={{ marginTop: "0" }}>
                {
                    eventData === undefined
                        ? <div>????????? ????????? ????????????.</div>
                        : (
                            <div className="editEventCard" >
                                <div className="cardContent">
                                    <div className="eventSource">
                                        <div style={{ width: "230px" }}>
                                            <div className="eventTitle">
                                                <h4>
                                                    <input type="text" style={{ border: "transparent", textAlign: "left", width: "400px" }} maxLength="25"
                                                        placeholder={"?????? ????????? ???????????????"}
                                                        value={eventData["eventTitle"]}
                                                        onInput={
                                                            (e) => {
                                                                changeEventItem(e.target.value, "eventTitle");
                                                            }}></input>

                                                </h4>
                                                <div style={{ width: "500px" }}> ?????? ??? ?????? : {eventAmount}???</div>
                                            </div>

                                        </div>


                                        <div className="eventButtons">
                                            {/* <button onClick={() => { eventDeleteButton(); }} style={{ marginRight: "15px" }}>
                                                <i class="far fa-trash-alt"></i> </button> */}
                                            <button onClick={() => {
                                                if (window.confirm("?????? ????????? ????????????????????????? ?????? ??? ???????????? ???????????? ?????? ???????????? ??? ????????????.")) {
                                                    editEventButton();
                                                    // alert("?????????????????????.")
                                                }
                                            }} style={{ marginRight: "15px" }}> <i class="fas fa-check"></i> </button>
                                            <button onClick={() => {
                                                if (window.confirm("?????? ????????? ?????????????????????????")) {
                                                    props.setEditEventState(false)
                                                    // alert("?????????????????????.")
                                                }

                                            }} style={{ marginRight: "15px" }}><i class="fas fa-times"></i> </button>
                                        </div>
                                    </div>

                                    <div>
                                        <input type="text" style={{ border: "transparent", textAlign: "left", width: "650px" }} maxLength="40"
                                            placeholder={"?????? ????????? ???????????????"}
                                            value={eventData["eventContext"]}
                                            onInput={
                                                (e) => {
                                                    changeEventItem(e.target.value, "eventContext");
                                                }}></input>

                                    </div>

                                    {
                                        <div id="receiptContent" >
                                            {
                                                eventData["receiptList"].map((receipt, j) => {
                                                    return (
                                                        <div className="receiptCard" key={j}>
                                                            <div className="receiptResource">
                                                                {
                                                                    eventData["receiptList"].length === 0
                                                                        ? <div>????????? ???????????? ????????????.</div>
                                                                        : (<>
                                                                            <div className="receiptTitle">
                                                                                <h5>
                                                                                    <span onClick={() => { receiptDeleteButton(j); }}>
                                                                                        <i className="far fa-trash-alt"></i>
                                                                                    </span>
                                                                                    <input type="text" style={{ border: "transparent", textAlign: "left", width: "350px" }} maxLength="30"
                                                                                        placeholder={"????????? ????????? ???????????????"}
                                                                                        value={receipt["receiptTitle"]}

                                                                                        onInput={
                                                                                            (e) => {
                                                                                                changeReceiptItem(e.target.value, j, "receiptTitle");
                                                                                            }}></input>

                                                                                </h5>
                                                                                {
                                                                                    receipt["receiptDetailList"].length === 0
                                                                                        ? null
                                                                                        : (<div>
                                                                                            {j + 1}?????? ????????? ?????? : {sumReceipt(receipt["receiptDetailList"])}???
                                                                                        </div>)
                                                                                }


                                                                            </div>

                                                                            <div>


                                                                                <input type="text" style={{ border: "transparent", textAlign: "right", width: "400px" }} maxLength="40"
                                                                                    placeholder={"????????? ????????? ???????????????"}
                                                                                    value={eventData["receiptList"][j]["receiptContext"]}
                                                                                    onInput={
                                                                                        (e) => {
                                                                                            changeReceiptItem(e.target.value, j, "receiptContext");
                                                                                        }}>
                                                                                </input>
                                                                            </div>


                                                                            {
                                                                                receipt["receiptDetailList"].length === 0
                                                                                    ? (<><div>????????? ????????? ????????? ????????????.</div>
                                                                                        <button className='editSubmitButton' type='button'
                                                                                            onClick={() => {
                                                                                                receiptTableAddButton(j);
                                                                                            }}><i class="fas fa-plus"></i></button>
                                                                                    </>)
                                                                                    : (<>
                                                                                        <table className="receiptTable" style={{ width: "400px" }}>
                                                                                            <thead >
                                                                                                <tr>
                                                                                                    <th style={{ width: "40px" }}><i class="far fa-trash-alt"></i></th>
                                                                                                    <th style={{ width: "90px" }}>??????</th>
                                                                                                    <th style={{ width: "90px" }}>??????</th>
                                                                                                    <th style={{ width: "90px" }}>??????</th>
                                                                                                    <th style={{ width: "90px" }}>??????</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {receipt["receiptDetailList"].map((item, k) => {
                                                                                                    return (
                                                                                                        <tr key={k}>
                                                                                                            <td style={{ width: "40px" }}>
                                                                                                                <span onClick={() => {
                                                                                                                    receiptDetailDeleteButton(j, k);
                                                                                                                }}>
                                                                                                                    <i className="far fa-trash-alt"></i>
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td style={{ width: "90px" }}>
                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center", width: "90px" }}
                                                                                                                    placeholder={"??????"}
                                                                                                                    value={item["context"]}
                                                                                                                    onInput={
                                                                                                                        (e) => {
                                                                                                                            changeItem("context", e.target.value, j, k);
                                                                                                                        }}></input>

                                                                                                            </td>


                                                                                                            <td style={{ width: "90px" }}>

                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center", width: "90px" }}
                                                                                                                    placeholder={"??????"}
                                                                                                                    value={item["price"]}
                                                                                                                    onInput={
                                                                                                                        (e) => {
                                                                                                                            changeItem("price", e.target.value.replace(/[^0-9]/g, ''), j, k);
                                                                                                                        }}></input>

                                                                                                            </td>

                                                                                                            <td style={{ width: "90px" }}>
                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center", width: "90px" }}
                                                                                                                    placeholder={"??????"}
                                                                                                                    value={item["amount"]}
                                                                                                                    onInput={
                                                                                                                        (e) => {
                                                                                                                            changeItem("amount", e.target.value.replace(/[^0-9]/g, ''), j, k);
                                                                                                                        }}></input>

                                                                                                            </td>

                                                                                                            <td style={{ width: "90px", textAlign: "center" }}>
                                                                                                                <input  type="text" style={{ border: "transparent", textAlign: "center", width: "90px" }}
                                                                                                                placeholder={"??????"}
                                                                                                                value={item["totalAmount"]} readOnly></input>
                                                                                                            </td>
                                                                                                        </tr>)
                                                                                                })
                                                                                                }
                                                                                            </tbody>
                                                                                            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                                                                                <button className='submitButton' type='button' style={{ margin: "0" }}
                                                                                                    onClick={() => {
                                                                                                        var tempEditEventData = { ...eventData };

                                                                                                        tempEditEventData["receiptList"][j]["receiptDetailList"].push({
                                                                                                            context: "",
                                                                                                            price: "",
                                                                                                            amount: "",
                                                                                                            totalAmount: ""
                                                                                                        })
                                                                                                        setEventData(tempEditEventData)
                                                                                                    }}>?????? ??????</button></div>

                                                                                        </table>

                                                                                    </>
                                                                                    )
                                                                            }


                                                                        </>)}
                                                            </div>

                                                            <div className="uploadimg">

                                                                {/* <label for='receiptImg'> */}
                                                                <img className="receiptImg"
                                                                    src={processImage(receipt["receiptImg"])} style={{ backgroundColor: "var(--color-leftPanel)" }}
                                                                    alt={processImage(receipt["receiptImg"])} height={"150"} width={"100"} title='????????? ??????'
                                                                    onClick={() => { setShowImg(true); setPreviewImg(processImage(receipt["receiptImg"])); }}
                                                                />

                                                                {/* </label> */}

                                                                <input type="file" id="receiptImg" accept="image/*"
                                                                    onChange={(e) => {
                                                                        uploadImg(e.target.files[0], j);
                                                                    }}
                                                                ></input>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>


                                    }

                                    <div style={{
                                        width: "650px", display: "flex", justifyContent: "center", position: "relative",
                                    }}>
                                        <button className='editSubmitButton' type='button'
                                            onClick={() => {
                                                receiptAddButton();
                                            }}><i class="fas fa-plus"></i></button>
                                    </div>

                                </div>
                                <div className="cardImg"></div>

                            </div>
                        )
                }
            </div>
            {/* </div> */}
        </div>
    )
}

export default EditEvent;