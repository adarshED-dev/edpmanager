import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddProject({ onClose }) {
const navigate = useNavigate()
const handleClose = onClose || (()=> navigate("/projects"))

useEffect(()=>{
    const handleEscape = (e)=>{
        if(e.key === "Escape") handleClose()
    }
    document.addEventListener("keydown", handleEscape)
    return ()=> document.removeEventListener("keydown", handleEscape)
}, [])

const [formData, setFormData] = useState({
    project_name: "",
    project_details: ""
})

const handleChange = async (e)=>{
    const {name, value} = e.target
    setFormData((prevData)=>({
        ...prevData,
        [name]: value
    })) 
}

const handleSubmit = async (e)=>{
    e.preventDefault() 
    try {
        const result = await axios.post("/api/projects/add/new/project", formData)
        if(result.data.status == "successfull"){
                alert(result.data.message)
            }
            handleClose()
    } catch (error){
        console.error(error)
    }
}


  return (
    <main
        className="project-add-template new-project-template fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
        onClick={handleClose}
    >
        <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
            onClick={(e)=> e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                <h2 className="text-lg font-semibold text-slate-800">Add New Project</h2>
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-5 py-5 sm:px-6">
                {/* Project Name */}
                <div>
                    <label htmlFor="project_name" className="mb-1.5 block text-sm font-medium text-slate-700">Project Name</label>
                    <input type="text" name="project_name" id="project_name" placeholder="Write Project Name" onChange={handleChange} value={formData.project_name}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#005ee2] focus:ring-4 focus:ring-[#005ee2]/15" />
                </div>
                {/* Project Details */}
                <div>
                    <label htmlFor="project_details" className="mb-1.5 block text-sm font-medium text-slate-700">Project Details</label>
                    <input type="text" name="project_details" id="project_details" placeholder="Write Project Details" onChange={handleChange} value={formData.project_details}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#005ee2] focus:ring-4 focus:ring-[#005ee2]/15" />
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <input
                        type="submit"
                        value="Add"
                        className="cursor-pointer rounded-lg bg-[#005ee2] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#005ee2]/20 transition hover:bg-[#004bb5] focus:outline-none focus:ring-4 focus:ring-[#005ee2]/30"
                    />
                </div>
            </form>
        </div>
    </main>
  )
}

export default AddProject