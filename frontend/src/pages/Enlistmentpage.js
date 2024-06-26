import Schedule from "../components/schedule";
import Schedule2 from "../components/schedule2";
import EnlistmentPanel from "../components/enlistmentPanel";
import  { Navigate, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from "react"
var popupBG
var popupContent
var enlistedContent
var enlistSubjectsSlider
var wait = 100
var studentId
var reload = true
var student_enlisted

var ee

var interval

const table = ["Subject code","Section","Course Title","Instructor","Lang","Slots left", ""]


function openPopUp () {
  popupBG.classList.add("active")
  popupContent.classList.add("active")

}
function closePopUp(e) {
  popupBG.classList.remove("active")
  popupContent.classList.remove("active")
  console.log(e.target.innerHTML)
  if(e.target.innerHTML === "Confirm"){
    fetch("student/enlisted/" + studentId)
  }
}












//COMMENT THIS OUT TO REMOVE DELIST
// function delist(e){
//   if(!e.target.disabled){
//     fetch("remove/classlist?student_id=" + studentId + "&class_id=" + e.target.id)
//     const event = document.getElementById(e.target.value)

//     var content = document.querySelector(".content")
//     var children = content.childNodes

//     children.forEach(c => {
//       if(c.classList.contains("event")& !c.classList.contains("enlisted")){
//         content.removeChild(c)

//       }
//       });
//     children.forEach(c => {
//       if(c.classList.contains("event") & !c.classList.contains("enlisted")){
//         content.removeChild(c)
//       }
//       });

//     //console.log(e.target.value)
//     //console.log(event)
//     event.remove()
//     const event2 = document.getElementById(e.target.value + "-")
//     if(event2){
//       event2.remove()
//     }
//   }

// }


function EnlistmentPage(props) {
  const [grid, setGrid] = useState("");

  useEffect(()=>{
    
    if (props.studentId === 0){
      return
    }

    // setTimeout(()=> {console.log("ggg")}, 10)
    studentId = props.studentId
    popupBG = document.getElementById("confirmation-popup")
    popupContent = document.getElementById("confirmation-popup-content")
    enlistedContent = document.getElementById("enlisted-popup-content")
    enlistSubjectsSlider = document.querySelector(".enlist-subjects-slider")
    var subjectsContainer = document.querySelector(".subjects-container")

    var enlistmentbtns = document.querySelectorAll(".enlistbtn")
    enlistmentbtns.forEach(b => {
      wait += 50
      setTimeout(() => b.classList.add("auto"), wait)
    });

    

    fetch("/student/" + props.studentId + "?format=json").then(
      response => response.json()
    ).then(
      data => {
      //  console.log(data.is_enlisted)
      student_enlisted = data.is_enlisted
      if(student_enlisted){
        popupBG.classList.add("active")
        // popupContent.classList.add("active")
        enlistedContent.classList.add("active")
      }
      while(subjectsContainer.childNodes  > 1){
        subjectsContainer.removeChild(subjectsContainer.secondChild)
      }
       var classesToEnlist = data.course_code.subjects
      //  console.log(classesToEnlist)
      classesToEnlist.forEach(c => {
        // console.log(c)
        var b = document.createElement("button")
        b.innerHTML = c
        b.classList.add("enlistbtn")
        b.addEventListener("click", openSlider)
        subjectsContainer.appendChild(b)
        
      });
      }
      
    ).then(
      data => {
        var enlistmentbtns = document.querySelectorAll(".enlistbtn")
        enlistmentbtns.forEach(b => {
          wait += 50
          setTimeout(() => b.classList.add("auto"), wait)
        });
      }
    )

    var content = document.querySelector(".content")

    fetch("/" + props.studentId + "?format=json").then(
      response => response.json()
    ).then(
      data => {
       data.forEach( d => {

        // console.log(d)
        var div = document.createElement("div")
        div.classList.add("event")
        div.classList.add("enlisted")
        div.classList.add((d.day_of_week + "-" + d.start_time[0] + d.start_time[1]))
        if(d.minutes_per_session === 60){
          div.classList.add("onehour")
        }
        var text1 = document.createTextNode (d.class_code.class_code)
        div.appendChild(text1)
        content.appendChild(div)

        // console.log(d)
        if(d.minutes_per_session === 90 ){
          var div2 = document.createElement("div")
          div2.classList.add("event")
          div2.classList.add("enlisted")
          div2.classList.add((d.day_of_week + "-" + d.start_time[0] + d.start_time[1]))
          div2.classList.add(d.day_of_week + "2")
          var text2 = document.createTextNode (d.class_code.class_code)
          div2.appendChild(text2)
          content.appendChild(div2)
        }


        

       })

      }
      
    )

    var container = document.querySelector(".container-schedule")
    setTimeout(() => container.classList.add("visible"), 100)

    document.getElementById("switch-box").checked = true;
    

      
      }, [])

  if (props.studentId === 0){
    return <Navigate to="/login" />
  }

  function reloadData() {
    // console.log("=============================");
    // console.log("zzzzzz");
  
    // console.log(ee.target.innerHTML)
    // while(reload){
  
      fetch("/classes/?format=json").then(
        response => response.json()
      ).then(
        data => {
          data.forEach(dt=> {
            if(dt.class_code.class_code === ee.target.innerHTML){
            // console.log(dt.instructor_id.last_name + "-" + dt.class_section);
            let slot = document.getElementById(dt.instructor_id.last_name + "-" + dt.class_section)
            slot.innerHTML = dt.available_slots
  
            if(dt.available_slots === 0){
              let b = document.getElementById(dt.class_id)
              b.disabled=true
            } else {
              let b = document.getElementById(dt.class_id)
              b.addEventListener("click", enlist)
            }
            }
          })
        })
  
  }

  function openSlider(e){
    enlistSubjectsSlider.classList.add("active")
    ee = e;
    var tb = document.getElementById("tb")
    while(tb.firstChild){
      tb.removeChild(tb.firstChild)
    }
    var row = tb.insertRow()
    var cell
    table.forEach(t => {
      cell = row.insertCell()
      cell.innerHTML = t
    }); 
    // console.log(ee.target.innerHTML)
    // while(reload){
  
      fetch("/classes/?format=json").then(
        response => response.json()
      ).then(
        data => {
          data.forEach(dt=> {
            if(dt.class_code.class_code === ee.target.innerHTML){
              // console.log(d.class_code.class_code)
              // console.log(dt)
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
              cell.innerHTML = dt.available_slots
              cell.id = dt.instructor_id.last_name + "-" + dt.class_section
      
                cell = row.insertCell()
                var b = document.createElement("button")
                b.innerHTML = "Enlist"
                b.id = dt.class_id
                // b.value = dt.class_code.class_code + "-" + dt.class_section
                b.value = dt.class_code.class_code
                if(dt.available_slots === 0){
                  b.disabled=true
                } else {
                  b.addEventListener("click", enlist)
                }
                
                //COMMENT THIS OUT TO REMOVE DELIST
                cell.appendChild(b)
                // cell = row.insertCell()
                // var bd = document.createElement("button")
                // bd.innerHTML = "Delist"
                // bd.id = dt.class_id
                // // bd.value = dt.class_code.class_code + "-" + dt.class_section
                // bd.value = dt.class_code.class_code
                // if(dt.available_slots === 0){
                //   bd.disabled=true
                // } else {
                //   bd.addEventListener("click", delist)
                // }
    
                // cell.appendChild(bd)
    
            }
    
    
    
          })
        })
    interval = setInterval(reloadData, 2000)
    // var tb = document.getElementById("tb")
    // while(tb.firstChild){
    //   tb.removeChild(tb.firstChild)
    // }
    // var row = tb.insertRow()
    // var cell
    // table.forEach(t => {
    //   cell = row.insertCell()
    //   cell.innerHTML = t
    // }); 
    // // console.log(e.target.innerHTML)
    // // while(reload){
  
    //   fetch("/classes/?format=json").then(
    //     response => response.json()
    //   ).then(
    //     data => {
    //       data.forEach(dt=> {
    //         if(dt.class_code.class_code === e.target.innerHTML){
    //           // console.log(d.class_code.class_code)
    //           // console.log(dt)
    //           row = tb.insertRow()
    
    //           row.addEventListener("mouseenter", (e)=>{
    
    //             var content = document.querySelector(".content")
    //             var div = document.createElement("div")
    //             div.classList.add("event")
    //             div.classList.add((dt.day_of_week + "-" + dt.start_time[0] + dt.start_time[1]))
    //             if(dt.minutes_per_session === 60){
    //               div.classList.add("onehour")
    //             }
    //             var text1 = document.createTextNode (dt.class_code.class_code)
    //             div.appendChild(text1)
    //             div.id = dt.class_code.class_code + "-" + dt.class_section
    //             content.appendChild(div)
          
    //             if(dt.minutes_per_session === 90 ){
    //               var div2 = document.createElement("div")
    //               div2.classList.add("event")
    //               div2.classList.add((dt.day_of_week + "-" + dt.start_time[0] + dt.start_time[1]))
    //               div2.classList.add(dt.day_of_week + "2")
    //               var text2 = document.createTextNode (dt.class_code.class_code)
    //               div2.appendChild(text2)
    //               div2.id = dt.class_code.class_code + "-" + dt.class_section + "-"
    //               content.appendChild(div2)
    //             }
              
    //           })
          
          
    //           row.addEventListener("mouseleave", (e)=>{
          
    //             var content = document.querySelector(".content")
    //             var children = content.childNodes
          
    //             children.forEach(c => {
    //                 if(c.classList.contains("event")& !c.classList.contains("enlisted")){
    //                   content.removeChild(c)
          
    //                 }
    //             });
    //             children.forEach(c => {
    //               if(c.classList.contains("event") & !c.classList.contains("enlisted")){
    //                 content.removeChild(c)
    //               }
    //           });
    //         })
    
    //           cell = row.insertCell()
    //           cell.innerHTML = dt.class_code.class_code
    
    //           cell = row.insertCell()
    //           cell.innerHTML = dt.class_section
    
    //           cell = row.insertCell()
    //           cell.innerHTML = dt.class_code.class_name
    
    //           cell = row.insertCell()
    //           cell.innerHTML = dt.instructor_id.first_name + " " + dt.instructor_id.last_name
    
    //           cell = row.insertCell()
    //           var lang
    //           if(dt.language === "E") { lang = "Eng"} else { lang = "Fil"}
    //           cell.innerHTML = lang
    //           cell = row.insertCell()
    //           cell.innerHTML = dt.available_slots
      
    //             cell = row.insertCell()
    //             var b = document.createElement("button")
    //             b.innerHTML = "Enlist"
    //             b.id = dt.class_id
    //             b.value = dt.class_code.class_code + "-" + dt.class_section
    //             if(dt.available_slots === 0){
    //               b.disabled=true
    //             } else {
    //               b.addEventListener("click", enlist)
    //             }
                
    //             //COMMENT THIS OUT TO REMOVE DELIST
    //             cell.appendChild(b)
    //             cell = row.insertCell()
    //             var bd = document.createElement("button")
    //             bd.innerHTML = "Delist"
    //             bd.id = dt.class_id
    //             bd.value = dt.class_code.class_code + "-" + dt.class_section
    //             if(dt.available_slots === 0){
    //               bd.disabled=true
    //             } else {
    //               bd.addEventListener("click", delist)
    //             }
    
    //             cell.appendChild(bd)
    
    //         }
    
    
    
    //       })
    //     })
        // setTimeout(() => {}, 100)
    // }
    
   
  }

  function reloadSchedule() {
    console.log("ggg");
    var content = document.querySelector(".content")
    var children = content.childNodes

    children.forEach(c => {
      if(c.classList.contains("event")){
        content.removeChild(c)

      }
      });
    children.forEach(c => {
      if(c.classList.contains("event")){
        content.removeChild(c)
      }
      });
    children.forEach(c => {
        if(c.classList.contains("event")){
          content.removeChild(c)
  
        }
        });


    var content = document.querySelector(".content")

    fetch("/" + props.studentId + "?format=json").then(
      response => response.json()
    ).then(
      data => {
       data.forEach( d => {
  
        // console.log(d)
        var div = document.createElement("div")
        div.classList.add("event")
        div.classList.add("enlisted")
        div.classList.add((d.day_of_week + "-" + d.start_time[0] + d.start_time[1]))
        if(d.minutes_per_session === 60){
          div.classList.add("onehour")
        }
        var text1 = document.createTextNode (d.class_code.class_code)
        div.appendChild(text1)
        content.appendChild(div)
  
        // console.log(d)
        if(d.minutes_per_session === 90 ){
          var div2 = document.createElement("div")
          div2.classList.add("event")
          div2.classList.add("enlisted")
          div2.classList.add((d.day_of_week + "-" + d.start_time[0] + d.start_time[1]))
          div2.classList.add(d.day_of_week + "2")
          var text2 = document.createTextNode (d.class_code.class_code)
          div2.appendChild(text2)
          content.appendChild(div2)
        }
  
  
        
  
       })
  
      }
      
    )
  }

  function closeSlider(){
    enlistSubjectsSlider.classList.remove("active")
    reload = false
    clearInterval(interval)
    console.log("G");
    // reloadSchedule()
  }


  function toggleGrid(){
    console.log(grid)

    if(grid === ""){
      setGrid("row-off")
    } else {
      setGrid("")
    }
  }

  function enlist(e){
    if(!e.target.disabled){
      fetch("add/classlist?student_id=" + studentId + "&class_id=" + e.target.id + "&class_code=" + e.target.value).then(()=>{
        reloadSchedule()
      })
      // const event = document.getElementById(e.target.value)
      // console.log(e.target.value)
      // console.log(event)
      // event.classList.add("enlisted")
      // const event2 = document.getElementById(e.target.value + "-")
      // if(event2){
      //   event2.classList.add("enlisted")
  
      // }
    }
  
  }



    return <>
    <div id='confirmation-popup'></div>
    <div id='enlisted-popup-content'>
    <div id='enlisted-popup'>
    <h2>Notice!</h2>
    <p>You have already finished enlistment. If you need to revise your load you may now only do so through the Load Revision process.</p>
    <Link  to="/">
    <button id='confirm-enlistment-btn' onClick={closePopUp}>
        Return
    </button>    
      </Link>

    </div>
    </div>
    <div id='confirmation-popup-content'>
    <div id='confirm-enlistment'>
    <button id='close-popup-btn' onClick={closePopUp}>
        <i className='fas fa-times'> </i>
    </button>

    <h2>Warning!</h2>
    <p>I certify that my enlistment is FINAL. and If I wish to make any changes in my enlisted classes, I can only do so through the Load Revision process</p>
    <Link  to="/">
    <button id='confirm-enlistment-btn' onClick={closePopUp}>
        Confirm
    </button>    
      </Link>

    </div> 

    </div>

    <div className="enlist-subjects-slider">
    <button id='close-slider-btn' onClick={closeSlider}>
        <i className='fas fa-times'> </i>
    </button>

    <table style={{borderRadius: 15, backgroundColor: "white", overflow: "hidden"}}>
    <tbody id='tb' style={{marginRight: 10, marginLeft: 10}}>
      <tr>
          <th>Subject code</th>
          <th>Section</th>
          <th>Course Title</th>
          <th>Instructor</th>
          <th>Lang</th>
          <th>Slots left</th>
          <th></th>
          <th></th>
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


    <div className="enlistment-main">
    <div className="enlistment-subjects-container">
          <div className="subjects-container">
            <h3> Enlist in a class</h3>
            {/* <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button> */}
            {/* <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button> */}
          </div>
          <p>Total Units:</p>
          <button className="confirm-enlistbtn" onClick={openPopUp}>Confirm enlistment</button>
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










    </div>
    <div>
    <button id="auto-enlist-btn" onClick={()=>{
      fetch("auto-enlist/" + studentId).then(()=>{
        reloadSchedule()
      })
    }}>
      Auto Enlist
      </button>  
    </div>;
    </>
    

  }
  
export default EnlistmentPage;