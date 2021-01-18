import React, { Fragment, useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';
import GlobalLoading from './globalLoading';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <Fragment>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        <GlobalLoading loading={true} />
      )}
    </Fragment>
  );
}

export default App;
