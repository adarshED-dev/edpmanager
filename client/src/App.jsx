import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Projects from './pages/dashboard/Projects'
import Reminder from './pages/dashboard/Reminder'
import Trash from './pages/dashboard/Trash'
import Analytics from './pages/dashboard/Analytics'
import ProjectView from './pages/dashboard/ProjectView'
import AddProject from './components/project/AddProject'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Navigate to="projects" replace />} />
        <Route path="projects" element={<Projects />} />
        <Route path="/projects/project-view/:project_id" element={<ProjectView />} />
        <Route path="reminder" element={<Reminder />} />
        <Route path="trash" element={<Trash />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      <Route path="/project/add-new-project" element={<AddProject />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
