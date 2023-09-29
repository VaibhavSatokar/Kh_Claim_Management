import React from 'react';
import './App.css';
import { useAppDispatch } from './app/hooks';
import { getUser } from './service/cmsservices';
import { useLocation } from 'react-router-dom';
import { setAuthToken } from './service/ServiceInstance';
import SidebarRoute from './components/SideBarRoute';


function App() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("t");

  const Id = token ? token.slice(-1) : null;
  const AuthToken = token ? token.slice(0, -1) : null;
  
  const HRMS_ENDPOINT = process.env.REACT_APP_HRMS_ENDPOINT

  // Set the token in the 'Authorization' header before making the API request
  setAuthToken(AuthToken);

  const dispatch = useAppDispatch();

  // Use useEffect to dispatch getUser only when both token and Id are available
  React.useEffect(() => {
    dispatch(getUser(Id));
  }, [dispatch]);

  if (AuthToken && Id) {
    return <SidebarRoute />;
  } else {
    // Replace 'http://example.com/sign-in' with the actual URL of the signIn page in the other React project.
    window.location.href = HRMS_ENDPOINT ? HRMS_ENDPOINT : '/';
    return null;
  }
}

export default App;
