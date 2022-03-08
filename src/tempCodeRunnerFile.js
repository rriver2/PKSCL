("president")
                setStudentPresident({ ...answer["studentPresident"] });
                setQuarter({ ...answer["quarter"] });
                let resetArray=[]
                for (let i = 0; i < answer["quarter"][currentQuarter]["eventList"].length; i++) {
                    resetArray.push(false)
                }
                setShowAllReceiptButton(resetArray);
                setList([...answer["quarter"][currentQuarter]["eventList"]]);
                setLogoImgPath(`./img/${currentQuarter}.png`);
                setWrongApproach(false)
                setEditProfileButton(false)
                setQuarterDate({ ...answerDate });
                let quarter = ["quarter1", "quarter2", "quarter3", "quarter4"]
                quarter.map((quarterName) => {
                    answerDate[quarterName].map((date, i) => {
                        if (date.substr(0, 4) === "9999") {
                            let tempAnswerDate = { ...answerDate };
                            tempAnswerDate[quarterName][i] = "";
                            setQuarterDate({ ...tempAnswerDate });
                        }
                    })
                })
                setWrongApproach(false)
                setEditProfileB