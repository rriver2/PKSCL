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
    case 0: case 1: case 2:
      return "quarter1"
    case 3: case 4: case 5:
      return "quarter2"
    case 6: case 7: case 8:
      return "quarter3"
    case 9: case 10: case 11:
      return "quarter4"
    default:
      return "";
  }
}

function setColorProperty(colorQuarter, colorQuarterCircle, colorLeftPanel, colorCard, colorBackground) {
  document.documentElement.style.setProperty("--color-quarter", colorQuarter);
  document.documentElement.style.setProperty("--color-quarterCircle", colorQuarterCircle);
  document.documentElement.style.setProperty("--color-leftPanel", colorLeftPanel);
  document.documentElement.style.setProperty("--color-card", colorCard);
  document.documentElement.style.setProperty("--color-background", colorBackground);
}

function defineColor(quarter) {
  if (quarter === "quarter1") {
    setColorProperty("#db8f8e", "#fdeded", "#f5dede", "#fff5ed", "#fbf6f6");
  } else if (quarter === "quarter2") {
    setColorProperty("#649d67", "#e9ede9", "#cedbcf", "#dee7df", "#f6f7f6");
  } else if (quarter === "quarter3") {
    setColorProperty("#c18356", "#f9eee5", "#e9d8cd", "#fff5ed", "#fbf7f4");
  } else if (quarter === "quarter4") {
    setColorProperty("#6b8396", "#e0eaf3", "#d0dbe5", "#e6f1fb", "#f8fcff");
  }
}


function App() {

  const [loginPosition, setLoginPosition] = useState("");
  const [todayQuarter, setTodatQuarter] = useState(selectseason);

  useEffect(() => {
    let quarter = selectseason();
    defineColor(quarter);
  }, [])

  return (
    <div>
      <Switch>
        <Route exact path='/manage'>
          <ManagementPage loginPosition={loginPosition} todayQuarter={todayQuarter}></ManagementPage>
        </Route>

        <Route exact path='/edit-main'>
          <EditMainPage loginPosition={loginPosition} todayQuarter={todayQuarter}></EditMainPage>
        </Route>

        <Route exact path='/main'>
          <MainPage loginPosition={loginPosition} todayQuarter={todayQuarter}></MainPage>
        </Route>

        <Route path='/'>
          <AccessPage loginPosition={loginPosition} setLoginPosition={setLoginPosition} todayQuarter={todayQuarter}> </AccessPage>
        </Route>

      </Switch>

    </div>
  );
}

export default App;