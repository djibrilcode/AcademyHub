import { Routes, Route } from 'react-router-dom'
import Home from "./pages/home"
import Contact from './pages/contact'
import About from './pages/about'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Logout from './pages/auth/logout'
import Footer from './components/footer'
import ForgotPassword from './pages/auth/forgotPassword'
import Navbar from './components/navbar'
import DashboardEtudiant from './pages/Dashboards/DashboardEtudiant'
import Profile from './pages/Profile'
import SuperAdmin from './pages/Dashboards/SuperAdmin'
import CreateUserByAdmin from './pages/createUserByAdmin'
import OAuthSuccess from './pages/auth/OAuthSuccess'
import ProtectedRoute from './components/ProtectedRoute'
import ResetPassword from './pages/auth/reset-password'
import InstitutionDashboard from './pages/Dashboards/InstitutionDashboard'
import AgencyDashboard from './pages/Dashboards/AgencyDashboard'


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20">
 <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          {/* Routes protégées */}
          <Route path="/dashboard-etudiant" element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardEtudiant />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute allowedRoles={['student', 'institution-user', 'agency-admin', 'super-admin']}>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/dashboard-institution" element={
            <ProtectedRoute allowedRoles={['institution-user']}>
              <InstitutionDashboard />
            </ProtectedRoute>
          }/>
          <Route path="/agency-admin" element={
            <ProtectedRoute allowedRoles={['agency-admin']}>
              <AgencyDashboard />
            </ProtectedRoute>
          } />
          <Route path="/super-admin" element={
            <ProtectedRoute allowedRoles={['super-admin']}>
              <SuperAdmin />
            </ProtectedRoute>
          } />
          <Route path="/create-user" element={
            <ProtectedRoute allowedRoles={['super-admin']}>
              <CreateUserByAdmin />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
