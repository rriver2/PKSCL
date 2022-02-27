udentPresident({ ...answer["studentPresident"] });
            setQuarter({ ...answer["quarter"] });
            reset(props.todayQuarter);
            showQuarter(props.todayQuarter);
            setLogoImgPath(`./img/${props.todayQuarter}.png`);
            setShowCurrentQuerter(answer["quarter"][props.todayQuarter]["status"])
            setStudentPresident({ ...answer["studentPresident"] });
            setQuarterDate({ ...answerDate });
            setUserLoginPosition("student")
            setMajorList([...answerMajorList]);
            defineColor(props.todayQuarter);