import Schedule from "../components/schedule";
import  { Navigate } from 'react-router-dom'

function HomePage(props) {
  // const navigate = useNavigate()
  if (props.studentId === 0){
    return <Navigate to="/login" />
  }

    return <div className='main-container'>
    <Schedule studentId={props.studentId}/>
</div>;
  }
  
export default HomePage;