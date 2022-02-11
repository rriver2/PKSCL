import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './css/EditEvent.css'
import PreviewImg from './PreviewImg';

function EditEvent(props) {
    let debugAPIURL = "";
    // debugAPIURL = "https://cors-jhs.herokuapp.com/https://pkscl.kro.kr";

    const [eventData, setEventData] = useState();
    const [deleteReceiptList, SetDeleteReceiptList] = useState([]);
    const [showImg, setShowImg] = useState(false);
    const [editState, setEditState] = useState(true);

    const [previewImg, setPreviewImg] = useState();

    useEffect(() => {
        setEventData(props.editEventData);
    }, []);

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
        // var tempShowAllReceiptButton = [...showAllReceiptButton];
        // tempShowAllReceiptButton[i] = true;
        // console.log(tempShowAllReceiptButton);
        // setShowAllReceiptButton(tempShowAllReceiptButton);
    }

    function eventDeleteButton() {
        axios.delete(debugAPIURL + '/event?event-number=' + eventData["eventNumber"])
            .then((payload) => {
                switch (payload.status) {
                    case 200:
                        alert("행사 장부가 삭제되었습니다.");
                        break;
                    default: break;
                }
            }).catch((error) => {
                alert("장부를 삭제하는데 실패했습니다.");
            })
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
        let answer = window.confirm("영수증을 삭제하시겠습니까?");
        if (answer) {
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
            alert("영수증이 삭제되었습니다.");
        }
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
        // console.log(tempEditEventData["receiptList"][j]["receiptImg"]);
        // console.log(tempEditEventData["receiptList"][j]["receiptImg"]["name"]);


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
            "receiptImg": { name: "" },
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
        let payload = {
            "eventNumber": eventData["eventNumber"],
            "eventTitle": eventData["eventTitle"],
            "eventContext": eventData["eventContext"]
        }

        let promise = new Promise((resolve, reject) => {
            axios.patch("/event", payload)
                .then((payload) => {
                    resolve("행사 이름, 행사 설명 수정 완료")
                })
                .catch((error) => {
                    reject("행사 이름, 행사 설명 수정 실패")
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
                    resolve("영수증 삭제 완료")
                })
                .catch((error) => {
                    reject("영수증 삭제 실패")
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

    function postReceipt(j) {

        let payload = new FormData();

        let receiptData = eventData["receiptList"][j];

        payload.append("receiptImgFile", receiptData["receiptImg"])
        payload.append("receiptImgPath", "./static/receiptImg/" + receiptData["receiptImg"]["name"])

        payload.append("eventNumber", eventData["eventNumber"]);
        payload.append("receiptTitle", receiptData["receiptTitle"]);
        payload.append("receiptContext", receiptData["receiptContext"]);

        for (var i = 0; i < receiptData["receiptDetailList"].length; i++) {
            payload.append(`context[${i}]`, receiptData["receiptDetailList"][i]["context"]);
            payload.append(`price[${i}]`, receiptData["receiptDetailList"][i]["price"]);
            payload.append(`amount[${i}]`, receiptData["receiptDetailList"][i]["amount"]);
        }

        let promise = new Promise((resolve, reject) => {
            axios.post(debugAPIURL + "/receipt", payload,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )
                .then((payload) => {
                    resolve("영수증 추가 완료")
                })
                .catch((error) => {
                    reject("영수증 추가 실패")
                })
        })

        promise
            .then(value => {
            })
            .catch((value => {
                alert(value)
                setEditState(false)
            }))

    }

    function putReceipt(j) {

        let payload = new FormData();
        let receiptData = eventData["receiptList"][j];

        payload.append("receiptImgFile", receiptData["receiptImg"])
        payload.append("receiptImgPath", "./static/receiptImg/" + receiptData["receiptImg"]["name"])

        payload.append("receiptNumber", receiptData["receiptNumber"]);
        payload.append("receiptTitle", receiptData["receiptTitle"]);
        payload.append("receiptContext", receiptData["receiptContext"]);

        for (var i = 0; i < receiptData["receiptDetailList"].length; i++) {
            payload.append(`context[${i}]`, receiptData["receiptDetailList"][i]["context"]);
            payload.append(`price[${i}]`, receiptData["receiptDetailList"][i]["price"]);
            payload.append(`amount[${i}]`, receiptData["receiptDetailList"][i]["amount"]);
        }

        let promise = new Promise((resolve, reject) => {
            axios.put(debugAPIURL + "/receipt", payload,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )
                .then((payload) => {
                    resolve("영수증 수정 완료")
                })
                .catch((error) => {
                    reject("영수증 수정 실패")
                })
        })

        promise
            .then(value => {
            })
            .catch((value => {
                alert(value)
                setEditState(false)
            }))
    }

    function sendReciept() {
        
        let promise = new Promise((resolve, reject) => {
            eventData["receiptList"].map((receipt, j) => {
                    if (receipt["receiptNumber"] === undefined) {
                        postReceipt(j);
                        alert("postReceipt")
                    } else {
                        putReceipt(j);
                        alert("putReceipt")
                    }
                })
                resolve()
            })

        promise
            .then(value => {
                 if (editState === true) props.setEditEventState(false);
            })
            .catch((value => {
            }))
       
    }

    return (
        // <div className="editEventContainer">
        <div className="editEventBox">
            {
                showImg
                    ? <PreviewImg setShowImg={setShowImg} previewImg={previewImg}></PreviewImg>
                    : null
            }
            <div className="quarterData" style={{ marginTop: "0" }}>
                {
                    eventData === undefined
                        ? <div>입력된 행사가 없습니다.</div>
                        : (
                            <div className="editEventCard" >
                                <div className="cardContent">
                                    <div className="eventSource">
                                        <div style={{ width: "230px" }}>
                                            <div className="eventTitle">
                                                <h4>

                                                    <input type="text" style={{ border: "transparent", textAlign: "left", width: "400px" }}
                                                        placeholder={"행사 제목을 입력하세요"}
                                                        value={eventData["eventTitle"]}
                                                        onInput={
                                                            (e) => {
                                                                changeEventItem(e.target.value, "eventTitle");
                                                            }}></input>

                                                </h4>
                                                <div style={{ width: "500px" }}> 행사 총 금액 : {props.editEventAmount}원</div>
                                            </div>

                                        </div>


                                        <div className="eventButtons">
                                            <button onClick={() => { eventDeleteButton(); }} style={{ marginRight: "15px" }}>
                                                <i class="far fa-trash-alt"></i> </button>
                                            <button onClick={() => {
                                                editEventButton();
                                            }} style={{ marginRight: "15px" }}> <i class="fas fa-check"></i> </button>
                                            <button onClick={() => {
                                                if (window.confirm("행사 수정을 취소하시겠습니까?")) {
                                                    props.setEditEventState(false)
                                                    alert("취소되었습니다.")
                                                }

                                            }} style={{ marginRight: "15px" }}><i class="fas fa-times"></i> </button>
                                        </div>
                                    </div>

                                    <div>
                                        <input type="text" style={{ border: "transparent", textAlign: "left", width: "650px" }}
                                            placeholder={"행사 비고를 입력하세요"}
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
                                                                        ? <div>입력된 영수증이 없습니다.</div>
                                                                        : (<>
                                                                            <div className="receiptTitle">
                                                                                <h5>
                                                                                    <span onClick={() => { receiptDeleteButton(j); }}>
                                                                                        <i className="far fa-trash-alt"></i>
                                                                                    </span>
                                                                                    <input type="text" style={{ border: "transparent", textAlign: "left", width: "350px" }}
                                                                                        placeholder={"영수증 제목을 입력하세요"}
                                                                                        value={eventData["receiptList"][j]["receiptTitle"]}

                                                                                        onInput={
                                                                                            (e) => {
                                                                                                changeReceiptItem(e.target.value, j, "receiptTitle");
                                                                                            }}></input>

                                                                                </h5>
                                                                                {
                                                                                    eventData["receiptList"][j]["receiptDetailList"].length === 0
                                                                                        ? null
                                                                                        : (<div>
                                                                                            {j + 1}번째 영수증 금액 : {sumReceipt(eventData["receiptList"][j]["receiptDetailList"])}원
                                                                                        </div>)
                                                                                }


                                                                            </div>

                                                                            <div>


                                                                                <input type="text" style={{ border: "transparent", textAlign: "right", width: "400px" }}
                                                                                    placeholder={"영수증 비고를 입력하세요"}
                                                                                    value={eventData["receiptList"][j]["receiptContext"]}
                                                                                    onInput={
                                                                                        (e) => {
                                                                                            changeReceiptItem(e.target.value, j, "receiptContext");
                                                                                        }}>
                                                                                </input>
                                                                            </div>


                                                                            {
                                                                                receipt["receiptDetailList"].length === 0
                                                                                    ? (<><div>입력된 영수증 내역이 없습니다.</div>
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
                                                                                                    <th style={{ width: "90px" }}>품명</th>
                                                                                                    <th style={{ width: "90px" }}>단가</th>
                                                                                                    <th style={{ width: "90px" }}>수량</th>
                                                                                                    <th style={{ width: "90px" }}>가격</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {receipt["receiptDetailList"].map((item, k) => {
                                                                                                    return (
                                                                                                        <tr key={k}>
                                                                                                            <td style={{ width: "40px" }}>
                                                                                                                <span onClick={() => { receiptDetailDeleteButton(j, k); }}>
                                                                                                                    <i className="far fa-trash-alt"></i>
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td style={{ width: "90px" }}>
                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center", width: "90px" }}
                                                                                                                    placeholder={"품명"}
                                                                                                                    value={item["context"]}
                                                                                                                    onInput={
                                                                                                                        (e) => {
                                                                                                                            changeItem("context", e.target.value, j, k);
                                                                                                                        }}></input>

                                                                                                            </td>


                                                                                                            <td style={{ width: "90px" }}>

                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center", width: "90px" }}
                                                                                                                    placeholder={"가격"}
                                                                                                                    value={item["price"]}
                                                                                                                    onInput={
                                                                                                                        (e) => {
                                                                                                                            changeItem("price", e.target.value.replace(/[^0-9]/g, ''), j, k);
                                                                                                                        }}></input>

                                                                                                            </td>

                                                                                                            <td style={{ width: "90px" }}>
                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center", width: "90px" }}
                                                                                                                    placeholder={"단가"}
                                                                                                                    value={item["amount"]}
                                                                                                                    onInput={
                                                                                                                        (e) => {
                                                                                                                            changeItem("amount", e.target.value.replace(/[^0-9]/g, ''), j, k);
                                                                                                                        }}></input>

                                                                                                            </td>

                                                                                                            <td style={{ width: "90px", textAlign: "center" }}>
                                                                                                                {item["totalAmount"]}
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
                                                                                                    }}>항목 추가</button></div>

                                                                                        </table>

                                                                                    </>
                                                                                    )
                                                                            }


                                                                        </>)}
                                                            </div>

                                                            <div className="uploadimg">

                                                                {/* <label for='receiptImg'> */}
                                                                <img className= "receiptImg"
                                                                    src={processImage(receipt["receiptImg"])} style={{ backgroundColor: "var(--color-leftPanel)" }}
                                                                    alt={processImage(receipt["receiptImg"])} height={"150"} width={"100"} title='영수증 사진'
                                                                    onClick={() => { setShowImg(true); setPreviewImg(processImage(receipt["receiptImg"]));}}
                                                                />

                                                                {/* </label> */}

                                                                <input type="file" id="receiptImg" accept="image/*"
                                                                    onChange={(e) => { uploadImg(e.target.files[0], j); }}
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