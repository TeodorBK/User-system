/* importing from react */
import { useEffect, useState } from 'react';
import { useContext } from 'react';

/* importing other react components */
import SignUp from './SignUp';
import SignIn from './SignIn';
import RouterContext from '../../store/Router-context';

/* importing css */
import classes from './LogOn.module.css';

/* main react function */
function LogOn() {
  /* storing the context from RouterContext in a variable */
  const routerCtx = useContext(RouterContext);

  /* using useEffect to remove the mainNavigation when the log on page is visible */
  useEffect(() => {
    routerCtx.loginHandler(true);
  });

  /* storing signUpForm in a variable */
  const [signUpForm, setSignUpForm] = useState(false);

  /* function to change between log in and register */
  function changeLogOnForm() {
    if (signUpForm) {
      setSignUpForm(false);
    } else {
      setSignUpForm(true);
    }
  }

  /* returning jsx code */
  return (
    /* box for the log in and register forms */
    <div className={classes.mainContainer}>
      {/* if signUpFrom is true show register form. else show log in form */}
      {signUpForm ? (
        <SignUp changeForm={changeLogOnForm} />
      ) : (
        <SignIn changeForm={changeLogOnForm} />
      )}
    </div>
  );
}

/* exporting default react function */
export default LogOn;
