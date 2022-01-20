// import log from './img/log.svg';
// import {Nav} from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import AccessPage from './AccessPage';
import ManagementPage from './ManagementPage';
import MainPage from './MainPage';
import { Button } from 'bootstrap';


function App() {

  return (
    <div>
      {/* <AccessPage></AccessPage> */}

      <ManagementPage></ManagementPage>

      {/* <MainPage></MainPage> */}

      {/* <Hi></Hi> */}

    </div>
  );
}


function Hi(){
  const [checkedWaiting, setCheckedWaiting] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedWaiting([...checkedWaiting, id]);
    } else {
      // 체크 해제
      setCheckedWaiting(checkedWaiting.filter((el) => el !== id));
    }
    console.log(checked)
  };

  let [waiting,setWaiting] = useState([{  
    "studentID" : "1111111111",
     "name" : "대기1"
    } ,
  { 
     "studentID" : "222222222",
     "name" : "대기2"
  },
  {
     "studentID" : "333333333",
     "name" : "대기3"
  }]);
  
  return (
    <div>
      {
        waiting.map((waitingStudent)=>{
          return(
            <div>
              <input 
                id= {waitingStudent}
                type="checkbox" 
                onChange={(e)=>{
                  changeHandler(e.currentTarget.checked, waitingStudent)
                }}
                checked={checkedWaiting.includes(waitingStudent) ? true : false}
              />
            </div>
          )
        })
        }
    <button className='searchButton' onClick={()=>{
        checkedWaiting.map((checkedWaiting)=>{
          console.log(checkedWaiting)
        })
    }}>button</button>
                   
    </div>
                   
  	
  )
}

export default App;
