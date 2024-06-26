import  { Navigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import Schedule from '../components/schedule';
import SubjectsRow from '../components/SubjectsRow'

import SchedulesPanel from '../components/SchedulesPanel';

const departments = ["-- DEPARTMENT --", "ALL INTERDISCIPLINARY ELECTIVES", "ATENEO TEACHER CENTER", "BIOLOGY", "CHEMISTRY", "CHINESE STUDIES PROGRAM", "CITIZENS MILITARY TRAINING",
"COMMUNICATION", "DEPARTMENT OF CATHOLIC EDUCATION PHILOSOPHY AND PRACTICE", 
"DEPARTMENT OF CURRICULUM, PEDAGOGY AND ASSESSMENT", "DEPARTMENT OF EDUCATIONAL LEADERSHIP AND MANAGEMENT",
"DEVELOPMENT STUDIES PROGRAM", "ECONOMICS", "EDUCATION", "ELECTRONICS, COMPUTER and COMMUNICATIONS ENG.",
"ENGLISH", "ENVIRONMENTAL SCIENCE", "EUROPEAN STUDIES", "FILIPINO", "FINANCE AND ACCOUNTING",
"FINE ARTS", "HEALTH SCIENCES PROGRAM", "HISTORY", "HUMANITIES", "INFORMATION SYSTEMS AND COMPUTER SCIENCE",
"INSTITUTE FOR THE SCIENCE AND ART OF LEARNING AND TEACHING (SALT)", "INTAC", 
"INTERDISCIPLINARY STUDIES DEPARTMENT", "JAPANESE STUDIES PROGRAM", "KOREAN STUDIES PROGRAM",
"LEADERSHIP AND STRATEGY", "MANAGEMENT", "MANAGEMENT ENGINEERING", "MARKETING AND LAW", "MATHEMATICS",
"MODERN LANGUAGES", "NATIONAL SERVICE TRAINING PROGRAM (ADAST)", "NATIONAL SERVICE TRAINING PROGRAM (OSCI)",
"NSTP", "OFFICE OF SOCIAL CONCERN AND INVOLVEMENT", "PASTORAL STUDIES", "PATHWAYS TO HIGHER EDUCATION",
"PHILOSOPHY", "PHYSICAL EDUCATION", "PHYSICS", "POLITICAL SCIENCE", "PSYCHOLOGY", 
"QUANTITATIVE METHODS AND INFORMATION TECHNOLOGY", "SCIENCE BLOCK", "SOCIAL SCIENCES", 
"SOCIAL SCIENCES", "THEOLOGY", "THEOLOGY AND MINISTRY PROGRAM"]

const sy = ["-- SEMESTER --", "First Sem 22'-23'", "Second Sem 22'-23'", "Intersession 23'-24'", "First Sem 23'-24'",
      "Second Sem 23'-24'"]

const table = ["Subject code","Section","Course Title","Instructor","Lang", "", "Room", "Time", "Units", "Max Slots"]

function enterFullScreen(){
  var fs = document.getElementById("fullscreen").firstChild
  var sm = document.querySelector(".container-schedule")

  var tb = document.getElementById("tb")
  var tbc = tb.childNodes

  if(fs.classList.contains("fa-expand")){
    fs.classList.remove("fa-expand")
    fs.classList.add("fa-compress")
    sm.classList.add("hide")
    tbc.forEach(e => {
      var zzz = e.childNodes
      zzz.forEach(z => {
        if(z.classList.contains("fs-fd")){
          z.classList.remove("fs-hide")
        }

        if(z.classList.contains("fs-b")){
          z.classList.add("fs-hide")
        }
      });

    });

  } else {
    fs.classList.remove("fa-compress")
    fs.classList.add("fa-expand")
    sm.classList.remove("hide")

    tbc.forEach(e => {
      var zzz = e.childNodes
      zzz.forEach(z => {
        if(z.classList.contains("fs-fd")){
          z.classList.add("fs-hide")
        }

        if(z.classList.contains("fs-b")){
          z.classList.remove("fs-hide")
        }
      });

    });
  }




}

function addToSchedule(e){
  if(!e.target.disabled){
    const event = document.getElementById(e.target.value)
    if(!event.classList.contains("enlisted")){
      e.target.innerHTML = "Remove"
      e.target.classList.add("red")
      event.classList.add("enlisted")
      const event2 = document.getElementById(e.target.value + "-")
      if(event2){
        event2.classList.add("enlisted")
  
      }
    } else {
      e.target.innerHTML = "Add"
      e.target.classList.remove("red")
      event.classList.remove("enlisted")
      const event2 = document.getElementById(e.target.value + "-")
      if(event2){
        event2.classList.remove("enlisted")
      }

      var content = document.querySelector(".content")
      var children = content.childNodes

      children.forEach(c => {
        if(c.classList.contains("event")& !c.classList.contains("enlisted")){
          content.removeChild(c)

        }
    });
    children.forEach(c => {
      if(c.classList.contains("event") & !c.classList.contains("enlisted")){
        content.removeChild(c)
      }
    });
    children.forEach(c => {
      if(c.classList.contains("event") & !c.classList.contains("enlisted")){
        content.removeChild(c)
      }
    });

    }
    

  }
}

function getData(){
  var d = document.getElementById("dept").value;
  var sy = document.getElementById("sem").value;
  var semester

  const tb = document.getElementById("tb")
  while(tb.firstChild){
    tb.removeChild(tb.firstChild)
  }

  
  var row = tb.insertRow()
  var cell
  var counter = 0
  table.forEach(t => {
    cell = row.insertCell()
    if(counter>5){
      cell.classList.add("fs-fd")
      cell.classList.add("fs-hide")
    }
    if(counter === 4){
      cell.classList.add("fs-b")
    }
    cell.innerHTML = t
    counter++
  }); 



  // row = tb.insertRow()
  // cell = row.insertCell(0)
  // cell.innerHTML = "g2"



  if(sy[0]==="F"){semester=1} else if(sy[0]==="S"){semester=2} else {{semester=0}}
  var urls = "/schedules/?" + "dep_id=" + (d-1) + "&sem=" + semester +"&yr=" + sy.slice(-7)[0] + sy.slice(-7)[1] + "&format=json"
  fetch(urls).then(
    response => response.json()
  ).then(
    data => {
     data.forEach( dt => {

      row = tb.insertRow()

      row.addEventListener("mouseenter", (e)=>{

        var content = document.querySelector(".content")
        var div = document.createElement("div")
        div.classList.add("event")
        div.classList.add((dt.day_of_week + "-" + dt.start_time[0] + dt.start_time[1]))
        if(dt.minutes_per_session === 60){
          div.classList.add("onehour")
        }
        var text1 = document.createTextNode (dt.class_code.class_code)
        div.appendChild(text1)
        div.id = dt.class_code.class_code + "-" + dt.class_section
        content.appendChild(div)
  
        if(dt.minutes_per_session === 90 ){
          var div2 = document.createElement("div")
          div2.classList.add("event")
          div2.classList.add((dt.day_of_week + "-" + dt.start_time[0] + dt.start_time[1]))
          div2.classList.add(dt.day_of_week + "2")
          var text2 = document.createTextNode (dt.class_code.class_code)
          div2.appendChild(text2)
          div2.id = dt.class_code.class_code + "-" + dt.class_section + "-"
          content.appendChild(div2)
        }
    
    })


    row.addEventListener("mouseleave", (e)=>{

      var content = document.querySelector(".content")
      var children = content.childNodes

      children.forEach(c => {
        if(c.classList.contains("event")& !c.classList.contains("enlisted")){
          content.removeChild(c)

        }
    });
    children.forEach(c => {
      if(c.classList.contains("event") & !c.classList.contains("enlisted")){
        content.removeChild(c)
      }
    });




    })









      // console.log(dt)
      cell = row.insertCell()
      cell.innerHTML = dt.class_code.class_code

      cell = row.insertCell()
      cell.innerHTML = dt.class_section

      cell = row.insertCell()
      cell.innerHTML = dt.class_code.class_name

      cell = row.insertCell()
      cell.innerHTML = dt.instructor_id.first_name + " " + dt.instructor_id.last_name

      cell = row.insertCell()
      var lang
      if(dt.language === "E") { lang = "Eng"} else { lang = "Fil"}
      cell.innerHTML = lang

      cell = row.insertCell()
      var b = document.createElement("button")
      b.classList.add("add-to-schedule")
      b.innerHTML = "Add"
      b.id = dt.class_id
      b.value = dt.class_code.class_code + "-" + dt.class_section
      // if(dt.available_slots === 0){
      //   b.disabled=true
      // } else {
        b.addEventListener("click", addToSchedule)
      // }

      cell.classList.add("fs-b")
      // cell.classList.add("fs-hide")

      cell.appendChild(b)


      cell = row.insertCell()
      cell.classList.add("fs-fd")
      cell.classList.add("fs-hide")
      cell.innerHTML = dt.room

      cell = row.insertCell()
      // cell.innerHTML = dt.start_time
      cell.classList.add("fs-fd")
      cell.classList.add("fs-hide")
      cell.innerHTML = dt.day_of_week + " " + dt.start_time.substring(0, 5)



      cell = row.insertCell()
      cell.classList.add("fs-fd")
      cell.classList.add("fs-hide")
      cell.innerHTML = dt.class_code.units

      cell = row.insertCell()
      cell.classList.add("fs-fd")
      cell.classList.add("fs-hide")
      cell.innerHTML = dt.max_slots

      // cell = row.insertCell()
      // cell.innerHTML = t
        // console.log(dt.class_code.class_code)
        // console.log(dt.class_section)
        // console.log(dt.class_code.class_name)
        // console.log(dt.instructor_id.first_name + " " + dt.instructor_id.last_name)
        // console.log(dt.language)

    

})


    }
    
  ).then( data => {
    var tb = document.getElementById("tb")
    var tbc = tb.childNodes
    var fs = document.getElementById("fullscreen").firstChild
    console.log("g")
    if(!fs.classList.contains("fa-expand")){
      tbc.forEach(e => {
        var zzz = e.childNodes
        zzz.forEach(z => {
          if(z.classList.contains("fs-fd")){
            z.classList.remove("fs-hide")
          }
  
          if(z.classList.contains("fs-b")){
            z.classList.add("fs-hide")
          }
        });
  
      });
  
    } else {
  
      tbc.forEach(e => {
        var zzz = e.childNodes
        zzz.forEach(z => {
          if(z.classList.contains("fs-fd")){
            z.classList.add("fs-hide")
          }
  
          if(z.classList.contains("fs-b")){
            z.classList.remove("fs-hide")
          }
        });
  
      }
      
      );
      
    
    }
  })

}
function ClassSchedulesPage(props) {

  const [grid, setGrid] = useState("");
  

  useEffect(()=>{
    if (props.studentId === 0){
      return
    }


    const dept = document.getElementById("dept")
    var i = 1
    departments.forEach(d => {
      var option = document.createElement("option")
      option.value = i;
      option.text = d;
      dept.add(option)
      i += 1
    });

    const sem = document.getElementById("sem")
    sy.forEach(s => {
      var option = document.createElement("option")
      option.value = s
      option.text = s
      sem.add(option)
    });



    var container = document.querySelector(".container-schedule")
    setTimeout(() => container.classList.add("visible"), 100)

    document.getElementById("switch-box").checked = true;

  }, [])

  function toggleGrid(){
    console.log(grid)

    if(grid === ""){
      setGrid("row-off")
    } else {
      setGrid("")
    }
  }


  if (props.studentId === 0){
    return <Navigate to="/login" />
  }

    return <div className='schedule-main'>
    <div className='schedule-subjects'>
    <button id='fullscreen' onClick={enterFullScreen}>
    <i className="fa fa-expand"></i>
    </button>
    <form>
    {/* <label>Department</label> */}
        {/* <label>Semester</label> */}
    <select id="sem" name="sem" onChange={getData}> </select>
    <select id="dept" name="dept" onChange={getData}> </select>


    </form>
    {/* <SchedulesPanel id="sp"/> */}
    <div className='table-container'>
    <table>
    <tbody id='tb'>
      <tr>
          <th>Subject code</th>
          <th>Section</th>
          <th>Course Title</th>
          <th>Instructor</th>
          <th>Lang</th>
          <th className='fs-b'></th>
          <th className='fs-fd fs-hide'>Time</th>
          <th className='fs-fd fs-hide'>Room</th>
          <th className='fs-fd fs-hide'>Units</th>
          <th className='fs-fd fs-hide'>Max Slots</th>
          
        </tr>
        {/* <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow /> */}
    </tbody>
    </table>
    </div>
   
    </div>









    <div className="container-schedule">
    <div className="title">
      <h3>
        Weekly View
      </h3>
      <label className="switch" >
        <input id="switch-box" type="checkbox" onChange={toggleGrid} />
        <span className="slider round" />
      </label>
    </div>
    <div className="days">
      <div className="filler" />
      <div className="filler" />
      <div className="day">Mon</div>
      <div className="day">Tue</div>
      <div className="day">Wed</div>
      <div className="day">Thu</div>
      <div className="day current">Fri</div>
      <div className="day">Sat</div>
      {/* <div className="day">Sun 10</div> */}
    </div>
    <div className="content">
      <div className="time" style={{gridRow: 1}}>07:00</div>
      <div className="time" style={{gridRow: 3}}>08:00</div>
      <div className="time" style={{gridRow: 5}}>09:00</div>
      <div className="time" style={{gridRow: 7}}>10:00</div>
      <div className="time" style={{gridRow: 9}}>11:00</div>
      <div className="time" style={{gridRow: 11}}>12:00</div>
      <div className="time" style={{gridRow: 13}}>13:00</div>
      <div className="time" style={{gridRow: 15}}>14:00</div>
      <div className="time" style={{gridRow: 17}}>15:00</div>
      <div className="time" style={{gridRow: 19}}>16:00</div>
      <div className="time" style={{gridRow: 21}}>17:00</div>
      <div className="time" style={{gridRow: 23}}>18:00</div>
      <div className="time" style={{gridRow: 25}}>19:00</div>
      <div className="time" style={{gridRow: 27}}>20:00</div>
      <div className="time" style={{gridRow: 29}}>21:00</div>
      <div className="filler-col" />
      <div className="col" style={{gridColumn: 3}} />
      <div className="col" style={{gridColumn: 4}} />
      <div className="col" style={{gridColumn: 5}} />
      <div className="col" style={{gridColumn: 6}} />
      <div className="col" style={{gridColumn: 7}} />
      <div className="col weekend" style={{gridColumn: 8}} />



      <div className={"row " + grid} style={{gridRow: 2}} />
      <div className={"row " + grid} style={{gridRow: 4}} />
      <div className={"row " + grid} style={{gridRow: 6}} />
      <div className={"row " + grid} style={{gridRow: 8}} />
      <div className={"row " + grid} style={{gridRow: 10}} />
      <div className={"row " + grid} style={{gridRow: 12}} />
      <div className={"row " + grid} style={{gridRow: 14}} />
      <div className={"row " + grid} style={{gridRow: 16}} />
      <div className={"row " + grid} style={{gridRow: 18}} />
      <div className={"row " + grid} style={{gridRow: 20}} />
      <div className={"row " + grid} style={{gridRow: 22}} />
      <div className={"row " + grid} style={{gridRow: 24}} />
      <div className={"row " + grid} style={{gridRow: 26}} />
      <div className={"row " + grid} style={{gridRow: 28}} />
    </div>
  </div>








    </div>;
  }
  
export default ClassSchedulesPage;