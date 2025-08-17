import { Routes, Route, Navigate } from "react-router-dom"

import Login from "./components/Login"

import Signup from "./components/Signup"

import LearnerDashBoard from "./components/learner/LearnerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import LearnerProfile from "./components/learner/LearnerProfile";

import LearnerBookings from "./components/learner/LearnerBookings";

import MentorDashBoard from "./components/mentor/MentorDashboard";

import MentorProfile from "./components/mentor/mentorProfile";

import MentorRequests from "./components/mentor/MentorRequests";

import ResetPassword from "./components/ResetPassword"

import NotFound from "./components/NotFound"

import './App.css';

import { getUserRole } from "./utils/auth";

const App = () => {

  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={getUserRole() ? `/${getUserRole()}` : "/login"} />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/learner" requiredRole={"learner"} element={<ProtectedRoute><LearnerDashBoard /></ProtectedRoute>} />
      <Route exact path="/learner/bookings" requiredRole={"learner"} element={<ProtectedRoute> <LearnerBookings /> </ProtectedRoute>} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/learner/profile" requiredRole={"learner"} element={<ProtectedRoute> <LearnerProfile /></ProtectedRoute>}> </Route>
      <Route exact path="/mentor" requiredRole={"mentor"} element={<ProtectedRoute> <MentorDashBoard /> </ProtectedRoute>} />
      <Route exact path="/mentor/profile" requiredRole={"mentor"} element={<ProtectedRoute> <MentorProfile /></ProtectedRoute>} />
      <Route exact path="/mentor/requests" requiredRole={"mentor"} element={<ProtectedRoute> <MentorRequests /></ProtectedRoute>} />
      <Route axact path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
