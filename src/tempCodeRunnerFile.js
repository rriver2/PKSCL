QuarterDate({ ...answerDate });
                 let quarter = ["quarter1","quarter2","quarter3","quarter4"]
                    quarter.map((quarterName)=>{
                        answerDate[quarterName].map((date,i)=>{
                        if(date.substr(0,4)=== "1111"){
                        let tempAnswerDate = { ...answerDate };
                        tempAnswerDate[quarterName][i] = "";
                        setQuarterDate({ ...tempAnswerDate });
                    }
                })
                 })