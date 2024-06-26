import { useEffect, useState } from "react"
// import { useParams, Redirect } from "react-router-dom"




  
    



function Schedule(props){
  const [grid, setGrid] = useState("");
  // const {id} = useParams()







  // console.log(props.studentId)
  useEffect(()=>{

    // const row = document.querySelectorAll(".row")
    var content = document.querySelector(".content")

    fetch("/" + props.studentId + "?format=json").then(
      response => response.json()
    ).then(
      data => {
       data.forEach( d => {

        // console.log(d)
        var div = document.createElement("div")
        div.classList.add("event")
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

  function toggleGrid(){
    console.log(grid)

    if(grid === ""){
      setGrid("row-off")
    } else {
      setGrid("")
    }
  }

  return(
    <div className="container-schedule">
    <div className="title">
      <h3>
        Your weekly schedule
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
      {/* <div className="col weekend" style={{gridColumn: 9}} /> */}



{/*       
      <div className="event W-09">Sample</div>
      <div className="event W-12">Sample</div>
      <div className="event W-15">Sample</div>
      <div className="event W-18">Sample</div>
      <div className="event S-09">Sample</div>
      <div className="event S-12">Sample</div>
      <div className="event S-15">Sample</div>
      <div className="event S-18">Sample</div>

      <div className="event TF-08">Sample</div>
      <div className="event TF-09">Sample</div>
      <div className="event TF-11">Sample</div>
      <div className="event TF-12">Sample</div>
      <div className="event TF-14">Sample</div>
      <div className="event TF-15">Sample</div>
      <div className="event TF-17">Sample</div>
      <div className="event TF-18">Sample</div>
      <div className="event TF-20">Sample</div>

      <div className="event TF-08 TF2">Sample</div>
      <div className="event TF-09 TF2">Sample</div>
      <div className="event TF-11 TF2">Sample</div>
      <div className="event TF-12 TF2">Sample</div>
      <div className="event TF-14 TF2">Sample</div>
      <div className="event TF-15 TF2">Sample</div>
      <div className="event TF-17 TF2">Sample</div>
      <div className="event TF-18 TF2">Sample</div>
      <div className="event TF-20 TF2">Sample</div>

      <div className="event MTh-08">Sample</div>
      <div className="event MTh-09">Sample</div>
      <div className="event MTh-11">Sample</div>
      <div className="event MTh-12">Sample</div>
      <div className="event MTh-14">Sample</div>
      <div className="event MTh-15">Sample</div>
      <div className="event MTh-17">Sample</div>
      <div className="event MTh-18">Sample</div>
      <div className="event MTh-20">Sample</div>

      <div className="event MTh-08 MTh2">Sample</div>
      <div className="event MTh-09 MTh2">Sample</div>
      <div className="event MTh-11 MTh2">Sample</div>
      <div className="event MTh-12 MTh2">Sample</div>
      <div className="event MTh-14 MTh2">Sample</div>
      <div className="event MTh-15 MTh2">Sample</div>
      <div className="event MTh-17 MTh2">Sample</div>
      <div className="event MTh-18 MTh2">Sample</div>
      <div className="event MTh-20 MTh2">Sample</div> */}


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
)
}

export default Schedule;