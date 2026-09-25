import axios from 'axios';
import React, { useState, useEffect } from 'react'
import AddProject from '../../components/project/AddProject'
import ProjectCard from '../../components/project/ProjectCard'

function Projects() {
const [projectData, setProjectData] = useState([])


const [showAddProject, setShowAddProject] = useState(false)

function handleProjectAddForm () {
  setShowAddProject(true)
}

async function getDataRequest() {
  try{
    const result = await axios.get("/api/projects/get/all/project/data");
    setProjectData(result.data.body || [])
  } catch (error){
    console.error(error)
  }
}

useEffect(()=>{
getDataRequest()
}, [])

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Top action bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Projects</h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleProjectAddForm}
            className="cursor-pointer rounded-lg bg-[#005ee2] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#005ee2]/20 transition hover:bg-[#004bb5] focus:outline-none focus:ring-4 focus:ring-[#005ee2]/30"
          >
            + Add Project
          </button>
        </div>
      </div>

      {/* Project cards container - fills the remaining width and height */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        {projectData.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-16 text-center">
            <p className="text-base font-medium text-slate-700">No projects yet</p>
            <p className="mt-1 text-sm text-slate-500">Click "+ Add Project" to create your first project.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {projectData.map((project, index)=>(
              <ProjectCard
                key={project.project_id || index}
                id={project.project_id}
                name={project.project_name}
                details={project.project_details}
                createdAt={project.project_created_on}
              />
            ))}
          </div>
        )}
      </div>

      {showAddProject && <AddProject onClose={()=> { setShowAddProject(false); getDataRequest() }} />}
    </div>
  )
}

export default Projects
