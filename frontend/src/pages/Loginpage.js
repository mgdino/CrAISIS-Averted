import LoginForm from '../components/loginform';
// import logo from './pics/ateneo-logo.svg'

function LoginPage(props) {
  // console.log(props.nav)

    return <div className='main-container'>
        <div className='aisis-text-wrapper'>
          <div className='aisis-text-container'>
            <div id='aisis-container-text'>
              <h1 id='aisis-text'>aisis </h1> <h1 id='online-text'>online</h1>
            </div>
          <p>Ateneo Integrated Student Information System</p>
          </div> 
        </div>
        <LoginForm setNavState={props.setNavState}  setStudentId={props.setStudentId} />
    </div>;
  }
  
export default LoginPage;