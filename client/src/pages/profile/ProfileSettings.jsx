import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import { FiMoreVertical } from 'react-icons/fi';
import { RiImageEditFill } from 'react-icons/ri';

/* importing Axios */
import Axios from 'axios';

import classes from './Profile.module.css';
import BackImageEditor from './BackImageEditor';
import RouterContext from '../../store/Router-context';

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

function ProfileSettings(props) {
  const routerCtx = useContext(RouterContext);

  let newEMail = '';
  let newUsername = '';
  let newPassword = '';

  let oldImageId = 0;

  /* storing backProfileImage in an variable */
  const [oldBackProfileImage, setOldBackProfileImage] = useState('');
  const [changeImage, setChangeImage] = useState(false);
  const [newImageId, setNewImageId] = useState(0);

  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [likes, setLikes] = useState(0);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const userReqUserInfo = {
      method: 'GET',
      url: 'http://localhost:3001/user',
      params: { username: routerCtx.theUser },
    };
    Axios.request(userReqUserInfo).then(response => {
      response.data.map(user => {
        return setUserInfo({
          eMail: user.eMail,
          username: user.username,
          password: user.password,
        });
      });
    });

    if (!changeImage) {
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
              setOldBackProfileImage(BackProfileImage1);
            } else if (data.imageId === 2) {
              setOldBackProfileImage(BackProfileImage2);
            } else if (data.imageId === 3) {
              setOldBackProfileImage(BackProfileImage3);
            } else if (data.imageId === 4) {
              setOldBackProfileImage(BackProfileImage4);
            } else if (data.imageId === 5) {
              setOldBackProfileImage(BackProfileImage5);
            } else if (data.imageId === 6) {
              setOldBackProfileImage(BackProfileImage6);
            } else if (data.imageId === 7) {
              setOldBackProfileImage(BackProfileImage7);
            } else if (data.imageId === 8) {
              setOldBackProfileImage(BackProfileImage8);
            } else if (data.imageId === 9) {
              setOldBackProfileImage(BackProfileImage9);
            }
            oldImageId = data.imageId;
          }
          return oldBackProfileImage;
        });
      });

      setChangeImage(true);
    }

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

    setUsername(routerCtx.theUser);
  }, [routerCtx, oldBackProfileImage]);

  const [eMail, setEMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vPassword, setVPassword] = useState('');

  const [editBackImage, setEditBackImage] = useState(false);

  function editbackImageState() {
    if (editBackImage) {
      setEditBackImage(false);
    } else {
      setEditBackImage(true);
    }
  }

  /* function to set the backProfileImage to the image that is selected */
  function changeBackImageHandler(image) {
    if (image === 1) {
      setOldBackProfileImage(BackProfileImage1);
    } else if (image === 2) {
      setOldBackProfileImage(BackProfileImage2);
    } else if (image === 3) {
      setOldBackProfileImage(BackProfileImage3);
    } else if (image === 4) {
      setOldBackProfileImage(BackProfileImage4);
    } else if (image === 5) {
      setOldBackProfileImage(BackProfileImage5);
    } else if (image === 6) {
      setOldBackProfileImage(BackProfileImage6);
    } else if (image === 7) {
      setOldBackProfileImage(BackProfileImage7);
    } else if (image === 8) {
      setOldBackProfileImage(BackProfileImage8);
    } else if (image === 9) {
      setOldBackProfileImage(BackProfileImage9);
    }

    setNewImageId(image);
  }

  function setNewUserInfo() {
    if (eMail !== '') {
      newEMail = eMail;
    }

    if (username !== '') {
      newUsername = username;
    }

    if (password !== '') {
      newPassword = password;
    }

    if (password !== '') {
      newPassword = password;
    }
  }

  function editProfileinfo() {
    const userReqUser = {
      method: 'GET',
      url: 'http://localhost:3001/getUserInfo',
      params: { username: routerCtx.theUser },
    };
    Axios.request(userReqUser)
      .then(response => {
        response.data.map(user => {
          newEMail = user.eMail;
          newUsername = user.username;
          newPassword = user.password;

          return newEMail;
        });
      })
      .then(() => {
        setNewUserInfo();

        const userReqUpdate = {
          method: 'PUT',
          url: 'http://localhost:3001/editProfile',
          params: {
            oldUserName: routerCtx.theUser,
            newEMail: newEMail,
            newUsername: newUsername,
            newPassword: newPassword,
          },
        };
        Axios.request(userReqUpdate).then(response => {
          routerCtx.setUser(newUsername);
        });
      })
      .then(() => {
        if (newImageId !== oldImageId) {
          props.changeBackImage(newImageId);
        }
      });

    if (newUsername !== '') {
      routerCtx.setUser(newUsername);
    }
  }

  return (
    <div className={classes.editProfileContainer}>
      <div className={classes.profileBox}>
        <div className={classes.profileCard}>
          {/* edit profile icon */}
          <FiMoreVertical className={classes.editProfileIcon} />
          {/* the back image */}
          <div className={classes.backImageBox}>
            <img
              id="backImage"
              className={classes.backImage}
              src={oldBackProfileImage}
              alt="backImage"
            />
            {/* the edit backImage icon */}
            <RiImageEditFill className={classes.backImageEditor} />
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
              <h2>{username}</h2>
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
            <Link to="" className={classes.logOutBtn}>
              Logg ut
            </Link>
          </div>
        </div>
      </div>

      <div className={classes.editProfileBox}>
        <form action="" className={classes.editForm}>
          <label htmlFor="eMail">E-mail</label>
          <input
            id="eMail"
            type="text"
            placeholder={userInfo.eMail}
            onChange={event => {
              setEMail(event.target.value);
            }}
          />

          <label htmlFor="username">Brukernavn</label>
          <input
            id="username"
            type="text"
            placeholder={userInfo.username}
            onChange={event => {
              if (event.target.value === '') {
                setUsername(routerCtx.theUser);
              } else {
                setUsername(event.target.value);
              }
            }}
          />

          <label htmlFor="password">Passord</label>
          <input
            id="password"
            type="password"
            placeholder="Passord"
            onChange={event => {
              setPassword(event.target.value);
            }}
          />

          <input
            id="VPassword"
            type="password"
            placeholder="Verifiser passord"
            onChange={event => {
              setVPassword(event.target.value);
            }}
          />
        </form>

        <button
          className={classes.editBackIageBtn}
          onClick={event => {
            event.preventDefault();
            editbackImageState();
          }}
        >
          Endre bakgrunnsbilde
        </button>

        {/* box for the save and cancle button */}
        <div className={classes.btnBox}>
          {/* cancle button */}
          <button
            className={classes.closeBtn}
            onClick={() => {
              props.editProfile();
            }}
          >
            Lukk
          </button>

          {/* save button */}
          <button
            className={classes.saveBackImageBtn}
            onClick={() => {
              if (password !== vPassword) {
                alert('Du må verifisere passordet');
              } else {
                editProfileinfo();
                props.editProfile();
              }
            }}
          >
            Lagre
          </button>
        </div>

        {/* if editBackImage is true then the backDrop for selecting backImage is visible. else show nothing */}
        {editBackImage ? (
          <BackImageEditor
            editBackImage={editbackImageState}
            changeBackImage={changeBackImageHandler}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default ProfileSettings;
