import { useEffect, useState } from "react"
import SubjectsRow from '../components/SubjectsRow'

function SchedulesPanel(){


  useEffect(()=>{
  }, [])


    return(
        <>
        <table>
    <tbody>
    <tr>
          <th>Subject code</th>
          <th>Section</th>
          <th>Course Title</th>
          <th>Instructor</th>
          <th>Lang</th>
        </tr>
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
        <SubjectsRow />
    </tbody>
    </table>
        </>
    )
}

export default SchedulesPanel;