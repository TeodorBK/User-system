/* importing from react */
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* importing icon */
import { RiImageEditFill } from 'react-icons/ri';
import { FiMoreVertical } from 'react-icons/fi';

/* importing Axios */
import Axios from 'axios';

/* importing other components */
import BackImageEditor from './BackImageEditor';
import RouterContext from '../../store/Router-context';
import ProfileSettings from './ProfileSettings';

/* importing css */
import classes from './Profile.module.css';

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
function Profile() {
  /* variable to change page when loged on */
  let navigate = useNavigate();

  /* storing context from RouterContext on routerCtx variable */
  const routerCtx = useContext(RouterContext);

  /* storing backProfileImage in an variable */
  const [backProfileImage, setbackProfileImage] = useState('');

  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [likes, setLikes] = useState(0);

  /* storing editBackImage state in an boolean variable */
  const [editBackImage, setEditBackImage] = useState(false);

  /* using useEffect to set the mainNavigation on when the profile page loades in */
  useEffect(() => {
    if (routerCtx.theUser === '') {
      navigate('/');
    } else {
      routerCtx.loginHandler(false);

      const userReq = {
        method: 'GET',
        url: 'http://localhost:3001/getUserInfo',
        params: { username: routerCtx.theUser },
      };
      /* geting the users imageId to set the backProfileImage */
      Axios.request(userReq).then(response => {
        response.data.map(data => {
          if (routerCtx.theUser === data.username) {
            if (data.imageId === 1) {
              setbackProfileImage(BackProfileImage1);
            } else if (data.imageId === 2) {
              setbackProfileImage(BackProfileImage2);
            } else if (data.imageId === 3) {
              setbackProfileImage(BackProfileImage3);
            } else if (data.imageId === 4) {
              setbackProfileImage(BackProfileImage4);
            } else if (data.imageId === 5) {
              setbackProfileImage(BackProfileImage5);
            } else if (data.imageId === 6) {
              setbackProfileImage(BackProfileImage6);
            } else if (data.imageId === 7) {
              setbackProfileImage(BackProfileImage7);
            } else if (data.imageId === 8) {
              setbackProfileImage(BackProfileImage8);
            } else if (data.imageId === 9) {
              setbackProfileImage(BackProfileImage9);
            }
          }
          return backProfileImage;
        });
      });

      const userReqFollowing = {
        method: 'GET',
        url: 'http://localhost:3001/following',
        params: { username: routerCtx.theUser },
      };

      Axios.request(userReqFollowing).then(response => {
        setFollowing(response.data.length);
      });

      const userReqFollowers = {
        method: 'GET',
        url: 'http://localhost:3001/followers',
        params: { viewProfile: routerCtx.theUser },
      };
      Axios.request(userReqFollowers).then(response => {
        setFollowers(response.data.length);
      });

      const userReqLikes = {
        method: 'GET',
        url: 'http://localhost:3001/likes',
        params: { username: routerCtx.theUser },
      };
      Axios.request(userReqLikes).then(response => {
        setLikes(response.data.length);
      });
    }
  }, [routerCtx, backProfileImage]);

  /* storing editProfile state in an boolean variable */
  const [editProfile, setEditProfile] = useState(false);

  /* function to set the editProfile state to true or false */
  function editProfileHandler() {
    if (editProfile) {
      setEditProfile(false);
    } else {
      setEditProfile(true);
    }
  }

  /* function to set the editBackImage state to true or false */
  function editBackImageHandler() {
    if (editBackImage) {
      setEditBackImage(false);
    } else {
      setEditBackImage(true);
    }
  }

  /* function to set the backProfileImage to the image that is selected */
  function changeBackImageHandler(image) {
    /* variable for the userId to the user */
    let theUserId = 0;

    /* geting userId to the user and updating the imageId to the new image */
    Axios.get('http://localhost:3001/userId')
      .then(response => {
        response.data.map(data => {
          if (data.username === routerCtx.theUser) {
            theUserId = data.userId;
          }
          return theUserId;
        });
      })
      .then(() => {
        Axios.put('http://localhost:3001/updateBackImage', {
          userId: theUserId,
          newImageId: image,
        });
      })
      .then(() => {
        const userReq = {
          method: 'GET',
          url: 'http://localhost:3001/getUserInfo',
          params: { username: routerCtx.theUser },
        };
        /* geting the users imageId to set the backProfileImage */
        Axios.request(userReq).then(response => {
          response.data.map(data => {
            if (routerCtx.theUser === data.username) {
              if (data.imageId === 1) {
                setbackProfileImage(BackProfileImage1);
              } else if (data.imageId === 2) {
                setbackProfileImage(BackProfileImage2);
              } else if (data.imageId === 3) {
                setbackProfileImage(BackProfileImage3);
              } else if (data.imageId === 4) {
                setbackProfileImage(BackProfileImage4);
              } else if (data.imageId === 5) {
                setbackProfileImage(BackProfileImage5);
              } else if (data.imageId === 6) {
                setbackProfileImage(BackProfileImage6);
              } else if (data.imageId === 7) {
                setbackProfileImage(BackProfileImage7);
              } else if (data.imageId === 8) {
                setbackProfileImage(BackProfileImage8);
              } else if (data.imageId === 9) {
                setbackProfileImage(BackProfileImage9);
              }
            }
            return backProfileImage;
          });
        });
      });
  }

  /* returning jsx code */
  return (
    /* main box for the profile page */
    <div className={classes.mainBox}>
      {/* the profile card */}
      <div className={classes.profileCard}>
        {/* edit profile icon */}
        <FiMoreVertical
          className={classes.editProfileIcon}
          onClick={() => {
            editProfileHandler();
          }}
        />
        {/* the back image */}
        <div className={classes.backImageBox}>
          <img
            id="backImage"
            className={classes.backImage}
            src={backProfileImage}
            alt="backImage"
          />
          {/* the edit backImage icon */}
          <RiImageEditFill
            className={classes.backImageEditor}
            onClick={() => {
              editBackImageHandler();
            }}
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
            <h2>{routerCtx.theUser}</h2>
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
          {/* log out button that takes the user to the log in page */}
          <Link to="/" className={classes.logOutBtn}>
            Logg ut
          </Link>
        </div>
      </div>

      {/* if editBackImage is true then the backDrop for selecting backImage is visible. else show nothing */}
      {editBackImage ? (
        <div className={classes.backDrop}>
          <BackImageEditor
            editBackImage={editBackImageHandler}
            changeBackImage={changeBackImageHandler}
          />
        </div>
      ) : (
        ''
      )}

      {/* if editBackImage is true then the backDrop for selecting backImage is visible. else show nothing */}
      {editProfile ? (
        <div className={classes.backDrop}>
          <ProfileSettings
            editProfile={editProfileHandler}
            changeBackImage={changeBackImageHandler}
          />
        </div>
      ) : null}
    </div>
  );
}

/* exporting default react function */
export default Profile;
