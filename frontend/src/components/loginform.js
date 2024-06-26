import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function LoginForm(props) {
  const navigate = useNavigate();
  console.log(props)
  console.log(props.nav)

    function handleSubmit(event) {
        let p = document.getElementById("password-field")
        let w = document.getElementById("error-login")
        p.classList.remove("active")
        p.classList.remove("error")
        event.preventDefault();
        const csrftoken = getCookie('csrftoken');
        axios.post('/api/login/', {
            username: event.target.username.value,
            password: event.target.password.value,
        }, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
            .then(response => {
                console.log('login response:', response.data);
                if (response.data.success) {
                    navigate('/');
                    props.setStudentId(event.target.username.value);
                } else {
                    console.log('login failed');
                    p.classList.add("error")
                    w.innerHTML = "Username and Password does not match!"
                    w.classList.add("active")
                }
            })
            .catch(error => {
                console.error(error);
                w.innerHTML = "Invalid Username"
                w.classList.add("active")
            });
    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


  return (<div className="login-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="text" autoFocus={true} name="username" placeholder='Username' required/>

        <input id='password-field' type="password" name="password"placeholder='Password' required/>
        <p id='error-login'></p>
        <div id='submit-containter'>
        <input type="submit" id="login-btn" />
        <Link to="#">Forgot your password?</Link>
        </div>

    </form>

  </div>

  )
}

export default LoginForm