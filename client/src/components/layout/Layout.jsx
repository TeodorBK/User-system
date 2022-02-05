/* importing from react */
import { useContext } from 'react';

/* importing context */
import RouterContext from '../../store/Router-context';

/* importing mainnavigation */
import MainNavigation from './mainNavigation/MainNavigation';

/* main react function that uses prop */
function Layout(props) {
  /* storing the context from RouterContext */
  const routerCtx = useContext(RouterContext);

  /* returning jsx code */
  return (
    <div>
      {/* if the user is on the log in or register pages the mainNavigation is hidden. else the mainNavigating is visable */}
      {routerCtx.logingIn ? '' : <MainNavigation />}
      {/* using the props.children to get all the pages under the mainNavigation */}
      {props.children}
    </div>
  );
}

/* exporting default react function */
export default Layout;
