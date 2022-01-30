import './css/App.css';
import { useEffect, useState } from 'react';
import AccessPage from './AccessPage';
import MainPage from './MainPage';
import ManagementPage from './ManagementPage';
import EditMainPage from './EditMainPage';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

function loadmonth() {
        let now = new Date();
        let month = now.getMonth();
            return month;
    }
    function selectseason() {
        switch (loadmonth()) {
            case 0:case 1:case 2:
            return "quarter1"
            case 3:case 4:case 5:
            return "quarter2"
            case 6:case 7:case 8:
            return "quarter3"
            case 9:case 10:case 11:
            return "quarter4"
            default:
            return "";
        }
    }
    function setColorProperty(colorQuarter, colorQuarterCircle,colorLeftPanel,colorCard){
            document.documentElement.style.setProperty("--color-quarter", colorQuarter);
            document.documentElement.style.setProperty("--color-quarterCircle", colorQuarterCircle);
            document.documentElement.style.setProperty("--color-leftPanel", colorLeftPanel);
            document.documentElement.style.setProperty("--color-card", colorCard);
    }

    function defineColor(quarter){
        if(quarter === "quarter1"){
            setColorProperty("#db8f8e", "#efbebc", "#f5dede", "#fff5ed");
        }else if(quarter === "quarter2"){
            setColorProperty("#649d67","#cedbcf", "#cedbcf", "#dee7df");
        }else if(quarter === "quarter3"){
            setColorProperty( "#c18356","#efdccd","#e9d8cd", "#fff5ed");
        }else if(quarter === "quarter4"){
            setColorProperty("#6b8396","#d0dbe5", "#d0dbe5", "#e6f1fb");
        }
    }


function App() {

    const [loginPosition, setLoginPosition] = useState("president");
    const [todayQuarter, setTodatQuarter] = useState(selectseason);

    useEffect(()=>{
        let quarter = selectseason();
        defineColor(quarter);
    },[])

  return (
    <div>
      <Switch>
        <Route exact path='/manage'>
          <ManagementPage loginPosition={loginPosition}></ManagementPage>
        </Route>

        <Route exact path='/edit-main'>
          <EditMainPage loginPosition={loginPosition} todayQuarter={todayQuarter}></EditMainPage>
        </Route>

        <Route exact path='/main'>
          <MainPage loginPosition={loginPosition} todayQuarter={todayQuarter}></MainPage>
        </Route>

        <Route path='/' >
          <AccessPage setLoginPosition = {setLoginPosition} todayQuarter={todayQuarter}> </AccessPage>
        </Route>
         
      </Switch>


    </div>
  );
}

export default App;