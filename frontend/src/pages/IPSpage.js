import  { Navigate } from 'react-router-dom'

function IPSPage(props) {
  if (props.studentId === 0){
    return <Navigate to="/login" />
  }

    return <div className="ips-main">
      {/* <div className="ips-main-container">
      <div className="year-container">
      <div className="year-label">
        <h2>First Year</h2>
      </div>

      <div className="sem-container">
        <table>
        <tr>
          <th>Status</th>
          <th>Category No</th>
          <th>Units</th>
          <th>Category	</th>
          <th>Required?</th>
          <th>Override Prerequisite?</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        </table>
      </div>
      <div className="sem-container">
      <table>
        <tr>
         <th>Status</th>
          <th>Category No</th>
          <th>Units</th>
          <th>Category	</th>
          <th>Required?</th>
          <th>Override Prerequisite?</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        </table>
      </div>
      </div>

      <div className="year-container">
      <div className="year-label">
      <h2>Second Year</h2>
      </div>

      <div className="sem-container">
        <table>
        <tr>
          <th>Status</th>
          <th>Category No</th>
          <th>Units</th>
          <th>Category	</th>
          <th>Required?</th>
          <th>Override Prerequisite?</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        </table>
      </div>
      <div className="sem-container">
      <table>
        <tr>
         <th>Status</th>
          <th>Category No</th>
          <th>Units</th>
          <th>Category	</th>
          <th>Required?</th>
          <th>Override Prerequisite?</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        <tr>
        <th>P</th>
        <th>ENGL 11</th>
        <th>3</th>
        <th>C</th>
        <th>Y</th>
        <th>N</th>
        </tr>
        </table>
      </div>
      </div>

      <h2>Third Year</h2>
      <h2>Fourth Year</h2>
      </div>
       */}


    </div>;
  }
  
export default IPSPage;