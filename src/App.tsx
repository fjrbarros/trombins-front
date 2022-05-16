import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { removeUser, updateUser } from './redux/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux';
import Login from './Page/Login';
import Dashboard from './Page/Dashboard';
import ChangeUserData from './Page/ChangeUserData';
import CandidateForm from './Page/CandidateForm';
import api from './api';

function PrivateRoute() {
  const userId = useSelector((data: RootState) => data.user.id);

  return userId ? <Outlet /> : <Navigate to="/" />;
}

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  api
    .get('user/')
    .then(resp => {
      const data = {
        ...resp.data,
        avatar: `${api.defaults.baseURL}files/${resp.data.avatar}`,
      };
      dispatch({ ...updateUser(), payload: { user: data } });
      setLoading(false);
    })
    .catch(() => {
      dispatch(removeUser());
      setLoading(false);
    });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/change-user-data" element={<PrivateRoute />}>
          <Route path="/change-user-data" element={<ChangeUserData />} />
        </Route>
        <Route path="/candidate-form" element={<CandidateForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
