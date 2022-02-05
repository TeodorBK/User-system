import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

/* importing Axios */
import Axios from 'axios';

/* importing other components */
import RouterContext from '../../store/Router-context';

import classes from './Friends.module.css';

function Friends() {
  const routerCtx = useContext(RouterContext);

  const [categoryFollowers, setCategoryFollowers] = useState(true);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const userReqFollowers = {
      method: 'GET',
      url: 'http://localhost:3001/followers',
      params: { viewProfile: routerCtx.theUser },
    };
    Axios.request(userReqFollowers).then(response => {
      response.data.map(user => {
        setFollowers(users => {
          return users.concat(user);
        });
        return followers;
      });
    });

    const userReqFollowing = {
      method: 'GET',
      url: 'http://localhost:3001/following',
      params: { username: routerCtx.theUser },
    };
    Axios.request(userReqFollowing).then(response => {
      response.data.map(user => {
        setFollowing(users => {
          return users.concat(user);
        });
        return following;
      });
    });
  }, [routerCtx]);

  function changeFriendCategory(category) {
    if (category === 'follower') {
      setCategoryFollowers(true);
    } else {
      setCategoryFollowers(false);
    }
  }

  return (
    <div>
      <nav className={classes.friendNav}>
        <ul className={classes.friendNavList}>
          <li
            id="followerNavItem"
            className={
              categoryFollowers
                ? classes.friendCategoryActive
                : classes.friendNavItem
            }
            onClick={() => {
              changeFriendCategory('follower');
            }}
          >
            Følgere
          </li>
          <li
            id="followingNavItem"
            className={
              !categoryFollowers
                ? classes.friendCategoryActive
                : classes.friendNavItem
            }
            onClick={() => {
              changeFriendCategory('following');
            }}
          >
            Følger
          </li>
        </ul>
      </nav>
      <div>
        {categoryFollowers ? (
          <div className={classes.profileContainer}>
            {followers.map(users => {
              return (
                <Link
                  to="/view-profile"
                  className={classes.profileBox}
                  key={users.username}
                  onClick={() => {
                    routerCtx.settingViewProfile(users.username);
                  }}
                >
                  <img
                    src="https://www.unmc.edu/cihc/_images/faculty/default.jpg"
                    alt="profileImage"
                  />
                  <p>{users.username}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={classes.profileContainer}>
            {following.map(users => {
              return (
                <Link
                  to="/view-profile"
                  className={classes.profileBox}
                  key={users.following}
                  onClick={() => {
                    routerCtx.settingViewProfile(users.following);
                  }}
                >
                  <img
                    src="https://www.unmc.edu/cihc/_images/faculty/default.jpg"
                    alt="profileImage"
                  />
                  <p>{users.following}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Friends;
