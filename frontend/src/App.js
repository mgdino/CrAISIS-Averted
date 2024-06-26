// import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation } from "react-router-dom"
import HomePage from './pages/Homepage';
import LoginPage from './pages/Loginpage';
import EnlistmentPage from './pages/Enlistmentpage';
import Footer from './components/footer';
import LoginHeader from './components/loginheader';
import StandardHeader from './components/standardheader';
import IPSPage from './pages/IPSpage';
import ClassSchedulesPage from './pages/ClassSchedulesPage';
import { useEffect, useState } from "react"



function App() {

  const [nav, setNavState] = useState("");
  const [studentId, setStudentId] = useState(0)
  // console.log(studentId)

  return (
    <div>
      <Routes>
        {/* <Route path="/:id" element={<StandardHeader nav={nav}/>} /> */}
        <Route path="/login" element={ <LoginHeader nav={nav}/>} />
        <Route path="*" element={<StandardHeader studentId={studentId} setStudentId={setStudentId} />} />
        {/* <Route path="/enlist" element={<StandardHeader nav={nav}/>} />
        <Route path="/class-schedules" element={<StandardHeader nav={nav}/>} />
        <Route path="/individual-program-of-study" element={<StandardHeader nav={nav}/>} /> */}
      </Routes>
{/* <LoginHeader nav={nav}/> */}
    <div className='main-content'>
      <Routes>
        <Route path="/" element={<HomePage studentId={studentId}/>} />
        <Route path="/:id" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setNavState={setNavState} nav={nav} setStudentId={setStudentId} />} />
        <Route path="/enlist" element={<EnlistmentPage studentId={studentId}/>} />
        <Route path="/class-schedules" element={<ClassSchedulesPage  studentId={studentId}/>} />
        <Route path="/individual-program-of-study" element={<IPSPage studentId={studentId}/>} />
      </Routes>
    </div>
      <Footer />


    </div>
  );
}

export default App;
