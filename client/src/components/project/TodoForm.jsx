import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Drawer from './Drawer'
import { PRIORITIES, toDateInput } from './todoUtils'

// Pass `todo` to open in edit mode, leave it out to add a new task
function TodoForm({ todo, onClose, onSaved }) {
const { project_id } = useParams()
const isEdit = Boolean(todo)
const [saving, setSaving] = useState(false)
const [error, setError] = useState("")

const [formData, setFormData] = useState({
    project_id: project_id,
    todo_title: todo?.todo_title || "",
    todo_notes: todo?.todo_notes || "",
    todo_priority: todo?.todo_priority || "medium",
    todo_due_date: toDateInput(todo?.todo_due_date)
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
    setSaving(true)
    setError("")
    try {
        const url = isEdit
            ? "/api/projects/update/project-detail/todo"
            : "/api/projects/add/project-detail/todo"
        const result = await axios.post(url, formData)
        if(onSaved) await onSaved(result.data)
        onClose()
    } catch (error) {
        console.error(error)
        setError(error.response?.data?.message || "Unable to save task")
    } finally {
        setSaving(false)
    }
}

const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#005ee2] focus:ring-4 focus:ring-[#005ee2]/15"

  return (
    <Drawer
        title={isEdit ? "Edit Task" : "New Task"}
        subtitle="To-Do"
        onClose={onClose}
        footer={
            <>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    form="todo-form"
                    disabled={saving}
                    className="flex-1 cursor-pointer rounded-lg bg-[#005ee2] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#005ee2]/20 transition hover:bg-[#004bb5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Task"}
                </button>
            </>
        }
    >
        <form id="todo-form" onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}

            {/* Title (todo_title is VARCHAR(50)) */}
            <div>
                <label htmlFor="todo_title" className="mb-1.5 flex justify-between text-sm font-medium text-slate-700">
                    Task <span className="font-normal text-slate-400">{formData.todo_title.length}/50</span>
                </label>
                <input type="text" name="todo_title" id="todo_title" placeholder="What needs to be done?" onChange={handleChange} value={formData.todo_title} required autoFocus maxLength={50}
                    className={inputClass} />
            </div>

            {/* Priority */}
            <div>
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Priority</span>
                <div className="grid grid-cols-3 gap-2">
                    {Object.entries(PRIORITIES).map(([value, priority]) => {
                        const selected = formData.todo_priority === value
                        return (
                            <label
                                key={value}
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${selected ? "border-[#005ee2] bg-[#005ee2]/5 text-[#005ee2]" : "border-slate-300 text-slate-600 hover:bg-slate-50"}`}
                            >
                                <input type="radio" name="todo_priority" value={value} checked={selected} onChange={handleChange} className="sr-only" />
                                <span className={`h-2 w-2 rounded-full ${priority.dot}`} />
                                {priority.label}
                            </label>
                        )
                    })}
                </div>
            </div>

            {/* Due Date */}
            <div>
                <label htmlFor="todo_due_date" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Due Date <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input type="date" name="todo_due_date" id="todo_due_date" onChange={handleChange} value={formData.todo_due_date}
                    className={inputClass} />
            </div>

            {/* Description */}
            <div>
                <label htmlFor="todo_notes" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Notes <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <textarea name="todo_notes" id="todo_notes" rows={6} placeholder="Add more details..." onChange={handleChange} value={formData.todo_notes}
                    className={`${inputClass} resize-y`} />
            </div>
        </form>
    </Drawer>
  )
}

export default TodoForm
