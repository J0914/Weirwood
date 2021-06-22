import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import CastlesPage from "./components/CastlesPage";
import Navigation from './components/Navigation'
import Splash from "./components/Splash"
import Footer from "./components/Footer"
import Castle from "./components/Castle"
import * as sessionActions from "./store/session";
import * as spotsActions from './store/spots'

import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(dispatch(spotsActions.getSpots()))
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  const allSpots = useSelector((state) => state.spots.list);

  return (
    <>
    <Navigation isLoaded={isLoaded}/>
    {isLoaded &&(
      <Switch>
        <Route exact path="/">
          <Splash />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/castles/:id">
          <Castle allSpots={allSpots}/>
        </Route>
        <Route path="/castles">
          <CastlesPage allSpots={allSpots}/>
        </Route>
      </Switch>
    )}
    <Footer />
    </>
  );
}

export default App;