/* importing from react */
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/* importing context */
import RouterContext from '../../store/Router-context';

/* importing Axios */
import Axios from 'axios';

/* importing css */
import classes from './LogOn.module.css';

/* main react function */
function SignIn(props) {
  /* storing context from RouterContext in RouterCtx variable */
  const RouterCtx = useContext(RouterContext);

  /* variable to change page when loged on */
  let navigate = useNavigate();

  /* variables state for username and password */
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  /* function for loging in */
  function logIn() {
    const userReq = {
      method: 'GET',
      url: 'http://localhost:3001/user',
      params: { username: username, password: password },
    };
    /* using Axios to get data from the database */
    Axios.request(userReq).then(response => {
      /* boolean variable to se if a  user exists */
      let userExists = false;

      response.data.map(data => {
        if (username === data.username && password === data.password) {
          userExists = true;
        }

        return userExists;
      });

      /* if userExists is true run the setUser function and send the user to the profile page. else alert */
      if (userExists) {
        RouterCtx.setUser(username);
        navigate('/profile', { replace: true });
        console.log('Logget inn');
      } else {
        alert('Du skreiv noe feil eller har ingen bruker');
      }
    });
  }

  /* returning jsx code */
  return (
    /* login card */
    <div className={classes.card}>
      {/* logo box */}
      <div className={classes.logoContainer}>
        <img
          src="https://vias3d.com/wp-content/uploads/2020/09/leaf-logo.png"
          alt="logo"
        />
      </div>
      {/* login form */}
      <form action="" className={classes.form}>
        {/* username */}
        <label className={classes.label} htmlFor="usernameInputSI">
          Brukernavn
        </label>
        <input
          className={classes.input}
          id="usernameInputSI"
          type="text"
          placeholder="Brukernavn"
          required
          onChange={event => {
            setusername(event.target.value);
          }}
        />

        {/* password */}
        <label className={classes.label} htmlFor="passwordInputSI">
          Passord
        </label>
        <input
          className={classes.input}
          id="passwordInputSI"
          type="password"
          placeholder="Passord"
          required
          onChange={event => {
            setpassword(event.target.value);
          }}
        />

        {/* login button */}
        <button
          className={classes.logOnBtn}
          onClick={event => {
            event.preventDefault();

            logIn();
          }}
        >
          Logg inn
        </button>
      </form>

      <div className={classes.spacerContainer}>ELLER</div>

      {/* register form */}
      <div className={classes.signUpContainer}>
        <button
          className={classes.changeFormBtn}
          onClick={() => {
            props.changeForm();
          }}
        >
          Register bruker
        </button>
      </div>
    </div>
  );
}

/* exporting default react function */
export default SignIn;
