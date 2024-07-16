import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import AuthService from '../services/authService';
import Login from '../components/Login';
import Profile from '../components/Profile';

// Lazy loaded components
const FullLayout = lazy(() => import('../layouts/FullLayout'));
const Starter = lazy(() => import('../views/Starter'));
const About = lazy(() => import('../views/About'));
const Alerts = lazy(() => import('../views/ui/Alerts'));
const Badges = lazy(() => import('../views/ui/Badges'));
const Buttons = lazy(() => import('../views/ui/Buttons'));
const Cards = lazy(() => import('../views/ui/Cards'));
const Grid = lazy(() => import('../views/ui/Grid'));
const Tables = lazy(() => import('../views/ui/Tables'));
const Forms = lazy(() => import('../views/ui/Forms'));
const Breadcrumbs = lazy(() => import('../views/ui/Breadcrumbs'));
const Garajes = lazy(() => import('../components/dashboard/Garajes'));

const PrivateRoute = ({ element: Component, ...rest }) => {
  const currentUser = AuthService.getCurrentUser();
  return currentUser ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

const ThemeRoutes = () => [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/starter" /> },
      { path: 'starter', element: <Starter /> },
      { path: 'about', element: <About /> },
      { path: 'alerts', element: <Alerts /> },
      { path: 'badges', element: <Badges /> },
      { path: 'buttons', element: <Buttons /> },
      { path: 'cards', element: <Cards /> },
      { path: 'grid', element: <Grid /> },
      { path: 'table', element: <Tables /> },
      { path: 'forms', element: <Forms /> },
      { path: 'breadcrumbs', element: <Breadcrumbs /> },
      { path: 'garajes', element: <Garajes /> },
      { path: 'profile', element: <PrivateRoute element={Profile} /> },
    ],
  },
  { path: 'login', element: <Login /> },
];

export default ThemeRoutes;