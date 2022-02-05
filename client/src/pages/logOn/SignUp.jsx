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
function SignUp(props) {
  /* variable to change page when loged on */
  let navigate = useNavigate();

  /* variables state for mail, username, password, and verifiePassword */
  const [mail, setMail] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [verifiePassword, setverifiePassword] = useState('');

  /* storing context from RouterContext in RouterCtx variable */
  const RouterCtx = useContext(RouterContext);

  /* function to register a user */
  function register() {
    /* if the password is not equal to the verifiePassword and the mail, username and password is shorter 
    than 1 letter cant the user make a profile. else use Axios to talk to the server file to se if there are a user 
    for that mail or if there are a user with that username */
    if (password !== verifiePassword) {
      alert('Du må verifisere passordet');
    } else if (mail.length < 1 && username.length < 1 && password.length < 1) {
      alert('fyll ut alt for å registrere en bruker');
    } else {
      const userReq = {
        method: 'GET',
        url: 'http://localhost:3001/user',
        params: { username: username },
      };

      /* looks to se if there are any users for the mail the user is using or any user that has that username the user is trying to use */
      Axios.request(userReq).then(response => {
        /* storing the response.data in an variable */
        const feedback = response.data;

        /* boolean variable to se if the user can make an profile */
        let notUser = true;

        /* maping to se if there are any user for the main or any user that is using the username and setting the notUser to false */
        feedback.map(data => {
          if (data.eMail === mail) {
            alert('Du har alt en bruker med denne mailen');
            notUser = false;
          } else if (data.username === username) {
            alert('Dette brukernavnet er tatt');
            notUser = false;
          }
          return notUser;
        });

        /* if notUser is true use Axios to insert the user information to the database and send the user to the profile page */
        if (notUser) {
          Axios.post('http://localhost:3001/register', {
            eMail: mail,
            username: username,
            password: password,
          })
            .then(() => {
              RouterCtx.setUser(username);

              console.log('Success');
            })
            .then(
              /* function to add an default background image to the user */
              function addDefaultImageAndLike() {
                let theUserId = 0;
                Axios.get('http://localhost:3001/userId')
                  .then(response => {
                    response.data.map(data => {
                      if (data.username === username) {
                        theUserId = data.userId;
                      }
                      return theUserId;
                    });
                  })
                  .then(() => {
                    Axios.post('http://localhost:3001/addDefaultImage', {
                      userId: theUserId,
                    });
                  })
                  .then(() => {
                    navigate('/profile', { replace: true });
                  });
              }
            );
        }
      });
    }
  }

  /* returning jsx code */
  return (
    /* register card */
    <div className={classes.card}>
      {/* logo box */}
      <div className={classes.logoContainer}>
        <img
          src="https://vias3d.com/wp-content/uploads/2020/09/leaf-logo.png"
          alt="logo"
        />
      </div>
      {/* register form */}
      <form className={classes.form}>
        {/* mail */}
        <label className={classes.label} htmlFor="eMailInput">
          E-Mail
        </label>
        <input
          className={classes.input}
          id="eMailInput"
          type="mail"
          placeholder="E-mail"
          required
          onChange={event => {
            setMail(event.target.value);
          }}
        />

        {/* username */}
        <label className={classes.label} htmlFor="usernameInput">
          Brukernavn
        </label>
        <input
          className={classes.input}
          id="usernameInput"
          type="text"
          placeholder="Brukernavn"
          required
          onChange={event => {
            setusername(event.target.value);
          }}
        />

        {/* password */}
        <label className={classes.label} htmlFor="passwordInput">
          Passord
        </label>
        <input
          className={classes.input}
          id="passwordInput"
          type="password"
          placeholder="Passord"
          required
          onChange={event => {
            setpassword(event.target.value);
          }}
        />
        <input
          className={classes.input}
          id="passwordInputVerified"
          type="password"
          placeholder="Verifiser passord"
          required
          onChange={event => {
            setverifiePassword(event.target.value);
          }}
        />

        {/* register button */}
        <button
          className={classes.logOnBtn}
          onClick={event => {
            event.preventDefault();

            register();
          }}
        >
          Registrer bruker
        </button>
      </form>

      <div className={classes.spacerContainer}>ELLER</div>

      {/* change log on form button */}
      <div className={classes.signUpContainer}>
        <button
          className={classes.changeFormBtn}
          onClick={() => {
            props.changeForm();
          }}
        >
          Logg inn
        </button>
      </div>
    </div>
  );
}

/* exporting default react function */
export default SignUp;
