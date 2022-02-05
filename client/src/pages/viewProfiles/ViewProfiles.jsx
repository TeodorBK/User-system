/* importing from react */
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* importing icon */
import { IoIosArrowBack } from 'react-icons/io';

/* importing Axios */
import Axios from 'axios';

/* importing other components */
import RouterContext from '../../store/Router-context';

/* importing css */
import classes from './ViewProfiles.module.css';

/* importing images */
import BackProfileImage1 from '../../images/BackProfileImage1.jpeg';
import BackProfileImage2 from '../../images/BackProfileImage2.jpeg';
import BackProfileImage3 from '../../images/backProfileImage3.jpeg';
import BackProfileImage4 from '../../images/backProfileImage4.jpeg';
import BackProfileImage5 from '../../images/backProfileImage5.jpeg';
import BackProfileImage6 from '../../images/backProfileImage6.jpeg';
import BackProfileImage7 from '../../images/backProfileImage7.jpeg';
import BackProfileImage8 from '../../images/backProfileImage8.jpeg';
import BackProfileImage9 from '../../images/backProfileImage9.jpeg';

/* main react function */
function ViewProfile() {
  const navigate = useNavigate();

  /* storing context from RouterContext on routerCtx variable */
  const routerCtx = useContext(RouterContext);

  /* storing backProfileImage in an variable */
  const [backProfileImage, setbackProfileImage] = useState('');

  /* variables for followers and following */
  const [follow, setFollow] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  /* variables for likes */
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  /* using useEffect to set the mainNavigation on when the profile page loades in */
  useEffect(() => {
    let profileUsername = '';

    let viewProfileName = '';

    routerCtx.viewProfile.map(data => {
      return (viewProfileName = data.username);
    });

    const userReq = {
      method: 'GET',
      url: 'http://localhost:3001/getUserInfo',
      params: { username: viewProfileName },
    };

    /* geting the users imageId to set the backProfileImage */
    Axios.request(userReq).then(response => {
      response.data.map(data => {
        let profileImageId = 0;

        routerCtx.viewProfile.map(profileInfo => {
          return (profileUsername = profileInfo.username);
        });

        if (data.username === profileUsername) {
          profileImageId = data.imageId;
        }
        if (profileImageId === 1) {
          setbackProfileImage(BackProfileImage1);
        } else if (profileImageId === 2) {
          setbackProfileImage(BackProfileImage2);
        } else if (profileImageId === 3) {
          setbackProfileImage(BackProfileImage3);
        } else if (profileImageId === 4) {
          setbackProfileImage(BackProfileImage4);
        } else if (profileImageId === 5) {
          setbackProfileImage(BackProfileImage5);
        } else if (profileImageId === 6) {
          setbackProfileImage(BackProfileImage6);
        } else if (profileImageId === 7) {
          setbackProfileImage(BackProfileImage7);
        } else if (profileImageId === 8) {
          setbackProfileImage(BackProfileImage8);
        } else if (profileImageId === 9) {
          setbackProfileImage(BackProfileImage9);
        }

        return backProfileImage;
      });
    });

    const userReqFollow = {
      method: 'GET',
      url: 'http://localhost:3001/following',
      params: { username: routerCtx.theUser },
    };
    Axios.request(userReqFollow).then(response => {
      response.data.map(data => {
        if (
          routerCtx.theUser === data.username &&
          viewProfileName === data.following
        ) {
          setFollow(true);
        }
        return follow;
      });
    });

    const userReqLike = {
      method: 'GET',
      url: 'http://localhost:3001/likes',
      params: { username: viewProfileName },
    };
    Axios.request(userReqLike).then(response => {
      setLikes(response.data.length);
      response.data.map(data => {
        if (
          routerCtx.theUser === data.username &&
          viewProfileName === data.likes
        ) {
          setLiked(true);
        }

        return liked;
      });
    });

    const userReqFollower = {
      method: 'GET',
      url: 'http://localhost:3001/followers',
      params: { viewProfile: viewProfileName },
    };
    Axios.request(userReqFollower).then(response => {
      setFollowers(response.data.length);
    });

    const userReqFollowing = {
      method: 'GET',
      url: 'http://localhost:3001/following',
      params: { username: viewProfileName },
    };
    Axios.request(userReqFollowing).then(response => {
      setFollowing(response.data.length);
    });
  }, [routerCtx, follow, liked]);

  function setLikedHandler() {
    if (liked) {
      const userReqUnfollow = {
        method: 'DELETE',
        url: 'http://localhost:3001/unlikeUser',
        params: {
          username: routerCtx.theUser,
          viewUsername: profileUsernameFollow,
        },
      };
      Axios.request(userReqUnfollow).then(() => {
        console.log('Unlike');
      });

      setLiked(false);
    } else {
      const userReqfollow = {
        method: 'POST',
        url: 'http://localhost:3001/likeUser',
        params: {
          username: routerCtx.theUser,
          viewUsername: profileUsernameFollow,
        },
      };
      Axios.request(userReqfollow).then(() => {
        console.log('Like');
      });

      setLiked(true);
    }
  }

  let profileUsernameFollow = '';

  routerCtx.viewProfile.map(data => {
    return (profileUsernameFollow = data.username);
  });

  /* storing liked in an variable */

  function setFollowHandler() {
    if (follow) {
      const userReqUnfollow = {
        method: 'DELETE',
        url: 'http://localhost:3001/unfollowUser',
        params: {
          username: routerCtx.theUser,
          viewUsername: profileUsernameFollow,
        },
      };
      Axios.request(userReqUnfollow).then(() => {
        console.log('Unfollow');
      });

      setFollow(false);
    } else {
      const userReqfollow = {
        method: 'POST',
        url: 'http://localhost:3001/followUser',
        params: {
          username: routerCtx.theUser,
          viewUsername: profileUsernameFollow,
        },
      };
      Axios.request(userReqfollow).then(() => {
        console.log('Follow');
      });

      setFollow(true);
    }
  }

  /* returning jsx code */
  return (
    /* main box for the profile page */
    <div className={classes.mainBox}>
      <div
        className={classes.backArrowBox}
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoIosArrowBack className={classes.backArrow} />
      </div>
      {/* the profile card */}
      {routerCtx.viewProfile.map(profile => {
        return (
          <div className={classes.profileCard} key={profile.userId}>
            {/* the back image */}
            <div className={classes.backImageBox}>
              <img
                id="backImage"
                className={classes.backImage}
                src={backProfileImage}
                alt="backImage"
              />
            </div>
            {/* the white box */}
            <div className={classes.whiteBox}>
              {/* profile box for the profile image */}
              <div className={classes.profileImageBox}>
                <img
                  src="https://www.unmc.edu/cihc/_images/faculty/default.jpg"
                  alt="profileImage"
                />
              </div>
              {/* name box to the profile name */}
              <div className={classes.nameBox}>
                <h2>{profile.username}</h2>
              </div>
              {/* box for the profile info as followers, likes and more */}
              <div className={classes.profileInfo}>
                <div>
                  <h3>{followers}</h3>
                  <p>følgere</p>
                </div>
                <div>
                  <h3>{following}</h3>
                  <p>følger</p>
                </div>
                <div>
                  <h3>0</h3>
                  <p>Innleg</p>
                </div>
                <div>
                  <h3>{likes}</h3>
                  <p>likes</p>
                </div>
              </div>
              <div className={classes.buttonBox}>
                <button
                  onClick={() => {
                    setFollowHandler();
                  }}
                >
                  {follow ? 'Slutte å følge' : 'Følg'}
                </button>
                <button
                  onClick={() => {
                    setLikedHandler();
                  }}
                >
                  {liked ? 'Unlike' : 'Like'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* exporting default react function */
export default ViewProfile;
