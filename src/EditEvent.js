import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './css/EditEvent.css'

function EditEvent(props) {
    let debugAPIURL = "";
    // debugAPIURL = "https://cors-jhs.herokuapp.com/https://pkscl.kro.kr";

    const [eventData,setEventData] = useState();
    const [deleteReceiptList,SetDeleteReceiptList] = useState([]);

    useEffect(() => {
        setEventData(props.editEventData);
    }, []);

    function changeEventTitle(value) {
        let tempEditEventData = { ...eventData };
        tempEditEventData["eventTitle"] = value;
        setEventData(tempEditEventData);
    }

    function changeEventContext(value) {
        let tempEditEventData = { ...eventData };
        tempEditEventData["eventContext"] = value;
        setEventData(tempEditEventData);
    }

    function changeReceiptTitle(value) {
        let tempEditEventData = { ...eventData };
        tempEditEventData["receiptTitle"] = value;
        setEventData(tempEditEventData);
    }

    function changeReceiptContext(value) {
        let tempEditEventData = { ...eventData };
        tempEditEventData["receiptContext"] = value;
        setEventData(tempEditEventData);
    }


    function eventDeleteButton() {
        axios.delete(debugAPIURL + '/ledger/?eventNumber=' + eventData["eventNumber"])
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
        console.log("receiptList")
         console.log(eventData["receiptList"])
        if (answer) {
            if(eventData["receiptList"][j]["receiptNumber"]!==undefined){
                SetDeleteReceiptList([...deleteReceiptList, eventData["receiptList"][j]["receiptNumber"]])
            }
            let tempEditEventData = {
                "eventNumber" : eventData["eventNumber"],
                "eventTitle" : eventData["eventTitle"],
                "eventContext" : eventData["eventContext"],
                "receiptList" : 
                eventData["receiptList"].filter(
                (event,i)=>{ return (i!==j)
            })
        }
            setEventData(tempEditEventData);
            alert("영수증이 삭제되었습니다.");
        }
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

    function changeItem(key, value, j, k) {
        console.log("changeItem");
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

    function uploadImg(img, j) {
        let tempEditEventData = { ...eventData };
        tempEditEventData["receiptList"][j]["receiptImg"] = img;
        setEventData(tempEditEventData);
    }

    function receiptAddButton() {
        let tempEditEventData = { ...eventData };
        tempEditEventData["receiptList"].push({

            "receiptTitle": "영수증 제목을 입력해주세요",
            "receiptImg": { name: "" },
            "receiptContext": "영수증 내용을 입력해주세요",
            "receiptDetailList": [
                {
                    "context": "",
                    "price": "",
                    "amount": "",
                    "totalAmount": ""

                },
            ]
        })
        setEventData(tempEditEventData);
    }

    function editEventButton(){
        editEventNameAPI();
        editReciptAPI();
        if(deleteReceiptList.length !==0)  deleteEventNameAPI();
    }

    function editEventNameAPI(){
        let payload = {
            "eventNumber": eventData["eventNumber"],
            "eventTitle": eventData["eventTitle"],
            "eventContext": eventData["eventContext"]
        }
        axios.patch("/event",payload)
            .then((payload) => {
                alert("행사 이름, 행사 설명 수정 완료")
            })
            .catch((error) => {
                alert("행사 이름, 행사 설명 수정 실패")
            })
    }

    function editReciptAPI(){
        //form으로 보내기 영수증 추가 및 수정
    }

    function deleteEventNameAPI(){
        axios.delete("/receipt",deleteReceiptList)
            .then((payload) => {
                alert("영수증 삭제 완료")
            })
            .catch((error) => {
                alert("영수증 삭제 실패")
            })
    }

    return(
        // <div className="editEventContainer">
            <div className="editEventBox">
                {
                    console.log(eventData)
                }
                                            <div className="quarterData" style={{marginTop:"0"}}>
                {
                                                    eventData === undefined
                                                        ? <div>입력된 행사가 없습니다.</div>
                                                        : (
                                                                <div className="eventCard" style={{height: "90vh", overflow : "overlay"}}>
                                                                    <div className="cardContent">
                                                                        <div className="eventSource">
                                                                            <div style={{ width: "230px" }}>
                                                                                <div className="eventTitle">
                                                                                    <h4>
                                                                                        
                                                                                                <input type="text" style={{ border: "transparent", textAlign: "left" }} placeholder={eventData["eventTitle"]}
                                                                                                    onInput={
                                                                                                        (e) => {
                                                                                                            changeEventTitle(e.target.value);
                                                                                                        }}></input>
                                                                    
                                                                                    </h4>
                                                                                    <div style={{ width: "500px" }}> 행사 총 금액 : {props.editEventAmount}원</div>
                                                                                </div>

                                                                            </div>


                                                                            <div className="eventButtons">
                                                                                <button onClick={() => { eventDeleteButton(); }} style={{ marginRight: "15px" }}> <i class="far fa-trash-alt"></i> </button>
                                                                                <button onClick={() => {
                                                                                    alert("행사수정API")
                                                                                    //행사 수정 API
                                                                                    editEventButton();
                                                                                    props.setEditEventState(false)
                                                                                        }} style={{ marginRight: "15px" }}> <i class="fas fa-check"></i> </button>
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                                    <input type="text" style={{ border: "transparent", textAlign: "left", width: "650px" }} placeholder={eventData["eventContext"]}
                                                                                        onInput={
                                                                                            (e) => {
                                                                                                changeEventContext(e.target.value);
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
                                                                                                                                        <input type="text" style={{ border: "transparent", textAlign: "left", width: "160px" }} placeholder={eventData["receiptList"][j]["receiptTitle"]}
                                                                                                                                            onInput={
                                                                                                                                                (e) => {
                                                                                                                                                    changeReceiptTitle(e.target.value);
                                                                                                                                                }}></input>

                                                                                                                        </h5>
                                                                                                                        {
                                                                                                                            eventData["receiptList"][j]["receiptDetailList"].length === 0
                                                                                                                                ? null
                                                                                                                                : (<div>
                                                                                                                                    {j+1}번째 영수증 금액 : {sumReceipt(eventData["receiptList"][j]["receiptDetailList"])}원
                                                                                                                                </div>)
                                                                                                                        }


                                                                                                                    </div>

                                                                                                                            <div>


                                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "right", width: "400px" }} placeholder={eventData["receiptList"][j]["receiptContext"]}
                                                                                                                                    onInput={
                                                                                                                                        (e) => {
                                                                                                                                            changeReceiptContext(e.target.value);
                                                                                                                                        }}>
                                                                                                                                </input>
                                                                                                                            </div>

                                                                                                                        
                                                                                                                    {
                                                                                                                        receipt["receiptDetailList"].length === 0
                                                                                                                            ? <div>입력된 영수증 내역이 없습니다.</div>
                                                                                                                            : (<>
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
                                                                                                                                        {receipt["receiptDetailList"].map((item, k) => {
                                                                                                                                            return (
                                                                                                                                                <tr key={k}>
                                                                                                                                                    <td>
                                                                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center" }} placeholder={item["context"]}
                                                                                                                                                                    onInput={
                                                                                                                                                                        (e) => {
                                                                                                                                                                            changeItem("context", e.target.value, j, k);
                                                                                                                                                                        }}></input>
                                                                                                                                                                
                                                                                                                                                    </td>

                                                                                                                                                    
                                                                                                                                                    <td>
                                                                                                                                                        
                                                                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center" }} placeholder={item["price"]}
                                                                                                                                                                    onInput={
                                                                                                                                                                        (e) => {
                                                                                                                                                                            changeItem("price", e.target.value.replace(/[^0-9]/g, ''), j, k);
                                                                                                                                                                        }}></input>
                                                                                                                                                                
                                                                                                                                                    </td>

                                                                                                                                                    <td>
                                                                                                                                                                <input type="text" style={{ border: "transparent", textAlign: "center" }} placeholder={item["amount"]}
                                                                                                                                                                    onInput={
                                                                                                                                                                        (e) => {
                                                                                                                                                                            changeItem("amount", e.target.value.replace(/[^0-9]/g, ''), j, k);
                                                                                                                                                                        }}></input>
                                                                                                                                                                
                                                                                                                                                    </td>

                                                                                                                                                    <td>
                                                                                                                                                        {item["totalAmount"]}
                                                                                                                                                    </td>
                                                                                                                                                </tr>)
                                                                                                                                        })
                                                                                                                                        }
                                                                                                                                    </tbody>
                                                                                                                                        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                                                                                                                            <button className='submitButton' type='button' style={{ margin: "0" }}
                                                                                                                                                onClick={() => {
                                                                                                                                                    var tempEditEventData  = { ...eventData };

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

                                                                                                                <label htmlFor='receiptImg'>
                                                                                                                    <img src={processImage(eventData["receiptList"][j]["receiptImg"])} style={{ backgroundColor: "var(--color-leftPanel)" }}
                                                                                                                        alt={processImage(eventData["receiptList"][j]["receiptImg"])} height={"150"} title='변경하시려면 클릭하세요.' />
                                                                                                                </label>
                                                                                                                <input type="file" id="receiptImg" accept="image/*"
                                                                                                                    onChange={(e) => { uploadImg(e.target.files[j], j); }} style={{ display: "none" }}></input>
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
                <div className="editEventBtns">
                <button className="editEventBtn">나가기</button>
                <button className="editEventBtn">저장하기</button>
                </div>
            {/* </div> */}
        </div>
    )
}

export default EditEvent;