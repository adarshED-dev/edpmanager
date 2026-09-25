import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Modal from './Modal'

// Pass `message` to open in edit mode, leave it out to add a new message
function AddMessage({ message, onClose, onSubmit }) {
const { project_id } = useParams()
const isEdit = Boolean(message)

const [formData, setFormData] = useState({
    project_id: project_id,
    message_id: message?.message_id,
    message_title: message?.message_title || "",
    message_content: message?.message_content || ""
})

const handleChange = (e)=>{
    const {name, value} = e.target
    setFormData((prevData)=>({
        ...prevData,
        [name]: value
    }))
}

const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
        const result = isEdit
            ? await axios.put(`/api/projects/update/project-detail/message/${encodeURIComponent(message.message_id)}`, {
                message_title: formData.message_title,
                message_content: formData.message_content
            })
            : await axios.post("/api/projects/add/project-detail/message", formData)
        if(onSubmit) await onSubmit(result.data)
        onClose()
    } catch (error) {
        console.error(error)
    }
}


  return (
    <Modal title={isEdit ? "Edit Message" : "New Message"} onClose={onClose}>
        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-5 sm:px-6">
            {/* Message Title */}
            <div>
                <label htmlFor="message_title" className="mb-1.5 block text-sm font-medium text-slate-700">Message Title</label>
                <input type="text" name="message_title" id="message_title" placeholder="Write Message Title" onChange={handleChange} value={formData.message_title} required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#005ee2] focus:ring-4 focus:ring-[#005ee2]/15" />
            </div>
            {/* Message Content */}
            <div>
                <label htmlFor="message_content" className="mb-1.5 block text-sm font-medium text-slate-700">Message Content</label>
                <textarea name="message_content" id="message_content" rows={5} placeholder="Write Message Content" onChange={handleChange} value={formData.message_content} required
                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#005ee2] focus:ring-4 focus:ring-[#005ee2]/15" />
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    Cancel
                </button>
                <input
                    type="submit"
                    value={isEdit ? "Save" : "Add"}
                    className="cursor-pointer rounded-lg bg-[#005ee2] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#005ee2]/20 transition hover:bg-[#004bb5] focus:outline-none focus:ring-4 focus:ring-[#005ee2]/30"
                />
            </div>
        </form>
    </Modal>
  )
}

export default AddMessage
