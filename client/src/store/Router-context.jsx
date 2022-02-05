/* import from react */
import { createContext, useState } from 'react';

/* importing Axios */
import Axios from 'axios';

//making a default context with all the context that is going to be used
const RouterContext = createContext({
  /* logingIn state and function */
  loadingIn: '',
  loginHandler: () => {},

  /* user state and function */
  theUser: '',
  setUser: username => {},

  viewProfile: '',
  settingViewProfile: () => {},
});

/* exporting react function where all the context changes */
export function RouterContextProvider(props) {
  /* storing isLogingIn in an boolean state */
  const [isLogingIn, setIsLogingIn] = useState(false);

  /* changing the isLogingIn state when the user changes page */
  function loginHandler(login) {
    if (login === true) {
      setIsLogingIn(true);
    } else {
      setIsLogingIn(false);
    }
  }

  /* storing USER in an string state */
  const [USER, setUSER] = useState('');

  /* function for seting the USER state to the username */
  function setUserHandler(username) {
    setUSER(username);
  }

  /* storing viewProfile in an string state */
  const [viewProfile, setviewProfile] = useState([]);

  /* function for seting the viewProfile state to the username */
  function setViewProfileHandler(username) {
    const listOfProfiles = [];
    setviewProfile([]);

    /* geting userId to the user and updating the imageId to the new image */
    Axios.get('http://localhost:3001/allUsers')
      .then(response => {
        response.data.map(data => {
          listOfProfiles.push(data);
          return listOfProfiles;
        });
      })
      .then(() => {
        listOfProfiles.map(theprofile => {
          if (theprofile.username === username) {
            setviewProfile(profileList => {
              return profileList.concat(theprofile);
            });
          }
          return viewProfile;
        });
      });
  }

  //context
  //variable for the new context that should be used if the user needs some of the context
  //over running the default context
  const context = {
    /* logingIn state and function */
    logingIn: isLogingIn,
    loginHandler: loginHandler,

    /* user state and function */
    theUser: USER,
    setUser: setUserHandler,

    viewProfile: viewProfile,
    settingViewProfile: setViewProfileHandler,
  };

  /* returning jsx code */
  return (
    //the tag with the context as a value so that all the components in this tag can use the context
    <RouterContext.Provider value={context}>
      {/* using the props.children to get all the pages under the mainNavigation */}
      {props.children}
    </RouterContext.Provider>
  );
}

/* exporting default RouterContext context */
export default RouterContext;
