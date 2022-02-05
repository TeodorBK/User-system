/* importing from react */
import { Link } from 'react-router-dom';

/* importing icons */
import { FaBell, FaHome } from 'react-icons/fa';
import { BsPersonFill, BsFillPeopleFill } from 'react-icons/bs';

/* importing css */
import classes from '../Layout.module.css';

/* main react function */
function MainNavigation() {
  /* returning jsx code */
  return (
    /* the main navbar container */
    <nav className={classes.navbar}>
      {/* box for the logo */}
      <div className={classes.navLogoBox}>
        {/* link to the logo so you gets send to the home page */}
        <Link to="/home">
          {/* image of the logo */}
          <img
            className={classes.logo}
            src="https://vias3d.com/wp-content/uploads/2020/09/leaf-logo.png"
            alt="logo"
          />
        </Link>
      </div>

      {/* navigation box */}
      <div className={classes.navigationBox}>
        {/* the navigation list with the diffrent navigation */}
        <ul className={classes.navigationList}>
          <li>
            {/* link to the home page */}
            <Link to="/home" className={classes.navigationItem}>
              <FaHome />
            </Link>
          </li>
          <li>
            {/* link to the profile page */}
            <Link to="/profile" className={classes.navigationItem}>
              <BsPersonFill />
            </Link>
          </li>
          <li>
            {/* link to the alertes page */}
            <Link to="/friends" className={classes.navigationItem}>
              <BsFillPeopleFill />
            </Link>
          </li>
          <li>
            {/* link to the alertes page */}
            <Link to="/alerts" className={classes.navigationItem}>
              <FaBell />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/* exporting default react function */
export default MainNavigation;
