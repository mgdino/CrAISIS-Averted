function Schedule2(props){
    return(
        <div className="container-schedule">
        <div className="title">Your weekly schedule</div>
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
          {/* <div className="row" style={{gridRow: 1}} />
          <div className="row" style={{gridRow: 2}} />
          <div className="row" style={{gridRow: 3}} />
          <div className="row" style={{gridRow: 4}} />
          <div className="row" style={{gridRow: 5}} />
          <div className="row" style={{gridRow: 6}} />
          <div className="row" style={{gridRow: 7}} />
          <div className="row" style={{gridRow: 8}} />
          <div className="row" style={{gridRow: 9}} />
          <div className="row" style={{gridRow: 10}} />
          <div className="row" style={{gridRow: 11}} />
          <div className="row" style={{gridRow: 12}} />
          <div className="row" style={{gridRow: 13}} />
          <div className="row" style={{gridRow: 14}} />
          <div className="row" style={{gridRow: 15}} />
          <div className="row" style={{gridRow: 16}} />
          <div className="row" style={{gridRow: 17}} />
          <div className="row" style={{gridRow: 18}} />
          <div className="row" style={{gridRow: 19}} />
          <div className="row" style={{gridRow: 20}} />
          <div className="row" style={{gridRow: 21}} />
          <div className="row" style={{gridRow: 22}} />
          <div className="row" style={{gridRow: 23}} /> */}
          <div className="event event1 calendar1">Event 1</div>
          <div className="event event2 calendar2">Event 2</div>
          <div className="event event3 calendar2">Event 3</div>
          <div className="event event4 calendar1">Event 4</div>
          <div className="current-time">
            <div className="circle" />
          </div>
        </div>
      </div>
    )
}

export default Schedule2;