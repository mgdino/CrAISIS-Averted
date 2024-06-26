import { useEffect, useState } from "react"

function EnlistmentPanel({openPopup, openSlider}){
  var wait = 100

  useEffect(()=>{

    var enlistmentbtns = document.querySelectorAll(".enlistbtn")
    enlistmentbtns.forEach(b => {
      wait += 50
      setTimeout(() => b.classList.add("auto"), wait)
    });



  }, [])


    return(
        <div className="enlistment-subjects-container">
          <div className="subjects-container">
            <h3> Enlist in a class</h3>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
            <button className="enlistbtn" onClick={openSlider}>Enlist in a class</button>
          </div>
          <p>Total Units:</p>
          <button className="confirm-enlistbtn" onClick={openPopup}>Confirm enlistment</button>
      </div>
    )
}

export default EnlistmentPanel;