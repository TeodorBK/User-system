/* importing from react */
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

/* importing icons */
import { GrSearch } from 'react-icons/gr';

/* importing Axios */
import Axios from 'axios';

/* importing other components */
import RouterContext from '../../store/Router-context';

/* importing css */
import classes from './Home.module.css';

/* main react function */
function Home() {
  /* storing the users search in an variable */
  let userSearch = '';

  /* storing context from RouterContext on routerCtx variable */
  const routerCtx = useContext(RouterContext);

  /* storing state for the users search box in an variable */
  const [searchBox, setsearchBox] = useState([]);

  /* storing list of profiles in an varable */
  const listOfProfiles = [];

  useEffect(() => {
    /* geting userId to the user and updating the imageId to the new image */
    Axios.get('http://localhost:3001/allUsers').then(response => {
      response.data.map(data => {
        listOfProfiles.push(data.username);
        return listOfProfiles;
      });
    });
  });

  /* function to search for others profile */
  function searchForProfile(event) {
    /* setting the userSearch variable to the value in the search input */
    userSearch = event;

    /* setting the searchBox to a empty array */
    setsearchBox([]);

    /* looping through the listOfProfiles to set theprofile to the username in the theprofile array */
    for (let profiles = 0; profiles < listOfProfiles.length; profiles++) {
      const theprofile = listOfProfiles[profiles];

      /* setting the profileInLower to theprofile in lower case */
      let profileInLower = theprofile.toLowerCase();

      /* setting the userInLower to theprofile in lower case */
      let userInLower = routerCtx.theUser.toLowerCase();

      /* if userSearch is an empty string then set the searchBox to an empty array */
      if (userSearch === '') {
        setsearchBox([]);

        /* else if the userInLower is not equal to profileInLower */
      } else if (userInLower !== profileInLower) {
        /* if profileInLower starts With userSearch or theprofile starts with userSearch. add the profile to the searchBox */
        if (
          profileInLower.startsWith(userSearch) ||
          theprofile.startsWith(userSearch)
        ) {
          setsearchBox(profileList => {
            return profileList.concat(theprofile);
          });
        }
      }
    }
  }

  /* returning jsx code */
  return (
    /* the main home box */
    <div className={classes.home}>
      {/* box for the search input */}
      <form className={classes.SearchBox}>
        {/* search input */}
        <input
          type="text"
          placeholder="Søk etter brukere"
          onChange={event => {
            event.preventDefault();

            searchForProfile(event.target.value);
          }}
        />
        {/* search button icon */}
        <button
          onClick={event => {
            event.preventDefault();
            searchForProfile(event.target.value);
          }}
        >
          <GrSearch className={classes.SearchIcon} />
        </button>
      </form>

      <div className={classes.profileSearchResult}>
        {searchBox.map(profiles => {
          return (
            <Link
              to="/view-profile"
              className={classes.profileBox}
              key={profiles}
              onClick={() => {
                routerCtx.settingViewProfile(profiles);
              }}
            >
              <img
                src="https://www.unmc.edu/cihc/_images/faculty/default.jpg"
                alt="profileImage"
              />
              <p>{profiles}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* exporting default react function */
export default Home;
