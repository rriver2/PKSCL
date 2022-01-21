// import log from './img/log.svg';
// import {Nav} from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';
import AccessPage from './AccessPage';
import MainPage from './MainPage';
import ManagementPage from './ManagementPage';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

function loadmonth() {
        let now = new Date();
        console.log(now)
        let month = now.getMonth();
        console.log(month);
            return month;
    }
    function selectseason() {
        switch (loadmonth()) {
            case 0:
            case 1:
            case 2:
            return "quarter1"
            case 3:
            case 4:
            case 5:
            return "quarter2"
            case 6:
            case 7:
            case 8:
            return "quarter3"
            case 9:
            case 10:
            case 11:
            return "quarter4"
            default:
            return "";
        }
    }
    function defineColor(quarter){
        quarter = "quarter4"
        if(quarter === "quarter1"){
            document.documentElement.style.setProperty("--color-quarter", "#c89034");
            document.documentElement.style.setProperty("--color-quarterCircle", "linear-gradient(0deg, rgba(200, 144, 52, 1) 0%, rgba(213, 178, 121, 1) 67%");
            document.documentElement.style.setProperty("--color-leftPanel", "rgb(242 227 215)");
            document.documentElement.style.setProperty("--color-card", "rgb(255 245 237)");
        }else if(quarter === "quarter2"){
            document.documentElement.style.setProperty("--color-quarter", "#578e5a");
            document.documentElement.style.setProperty("--color-quarterCircle","linear-gradient(0deg, rgba(87,142,90,1) 0%, rgba(126,199,130,1) 67%)");
            document.documentElement.style.setProperty("--color-leftPanel", "#cedbcf");
            document.documentElement.style.setProperty("--color-card", "#dee7df");
        }else if(quarter === "quarter3"){
            document.documentElement.style.setProperty("--color-quarter", "#9b4346");
            document.documentElement.style.setProperty("--color-quarterCircle","linear-gradient(0deg, rgba(155,67,70,1) 0%, rgba(231,140,145,1) 67%)");
            document.documentElement.style.setProperty("--color-leftPanel", "#e6bdbd");
            document.documentElement.style.setProperty("--color-card", "#f3dddd");
        }else if(quarter === "quarter4"){
            document.documentElement.style.setProperty("--color-quarter", "#597082");
            document.documentElement.style.setProperty("--color-quarterCircle","linear-gradient(0deg, rgba(89,112,130,1) 0%, rgba(145,186,217,1) 67%)");
            document.documentElement.style.setProperty("--color-leftPanel", "#d0dbe5");
            document.documentElement.style.setProperty("--color-card", "#e6f1fb");
        }
    }


function App() {
    useEffect(()=>{
        let quarter = selectseason();
        defineColor(quarter);
    },[])

  return (
    <div>
      <Switch>
        <Route path='/manage/:major'>
          <ManagementPage></ManagementPage>
        </Route>

        <Route path='/main/:major'>
          <MainPage></MainPage>
        </Route>

        <Route path='/' >
          <AccessPage> </AccessPage>
        </Route>

      </Switch>


    </div>
  );
}

export default App;