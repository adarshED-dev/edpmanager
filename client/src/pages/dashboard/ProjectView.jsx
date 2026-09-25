import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddMessage from '../../components/project/AddMessage'
import MessageRow from '../../components/project/MessageRow'
import ViewMessage from '../../components/project/ViewMessage'
import DeleteMessage from '../../components/project/DeleteMessage'
import TodoList from '../../components/project/TodoList'

function formatDate(value) {
  if (!value) return "—"
  const date = new Date(value)
  if (isNaN(date)) return "—"
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const PROJECT_CARDS = [
  {
    key: "messages",
    title: "Messages",
    emptyText: "No messages yet.",
    icon: "M8 10h8M8 14h5m-9 6l2.5-3H19a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14z",
  },
  {
    key: "todo",
    title: "To-Do",
    emptyText: "No tasks added.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    key: "github",
    title: "GitHub Details",
    emptyText: "No repository linked.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    key: "files",
    title: "Files & Docs",
    emptyText: "No files uploaded.",
    icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
]

function ProjectCard({ title, icon, emptyText, onAdd, children }) {
  return (
    <div className="flex min-h-[220px] flex-col rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        <svg className="h-4 w-4 text-[#005ee2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            aria-label={`Add ${title}`}
            title={`Add ${title}`}
            className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-[#005ee2] transition hover:bg-[#005ee2]/10"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        {React.Children.toArray(children).length > 0 ? children : (
          <div className="flex flex-1 items-center justify-center text-sm text-slate-400">{emptyText}</div>
        )}
      </div>
    </div>
  )
}

function ProjectView() {
const { project_id } = useParams()
const [project, setProject] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")
const [messages, setMessages] = useState([])
// Which message popup is open: "add" | "view" | "edit" | "delete" | null
const [messageModal, setMessageModal] = useState(null)
const [activeMessage, setActiveMessage] = useState(null)
const [addingTodo, setAddingTodo] = useState(false)

const openMessageModal = (type, message = null) => {
  setActiveMessage(message)
  setMessageModal(type)
}
const closeMessageModal = () => {
  setMessageModal(null)
  setActiveMessage(null)
}

const fetchMessages = async () => {
  try {
    const result = await axios.post(`/api/projects/get/project-detail/message/${encodeURIComponent(project_id)}`)
    const body = result.data.body
    setMessages(Array.isArray(body) ? body : [])
  } catch (error) {
    console.error(error)
  }
}

useEffect(()=>{
  fetchMessages()
}, [project_id])

useEffect(()=>{
(async function() {
  setLoading(true)
  setError("")
  try{
    const result = await axios.get(`/api/projects/project-view/${encodeURIComponent(project_id)}`)
    const body = result.data.body
    console.log(result.data.body)
    const data = Array.isArray(body) ? body[0] : body
    if(!data){
      setError(result.data.message || "Project not found")
    }
    setProject(data || null)
  } catch (error){
    console.error(error)
    setError(error.response?.data?.message || "Unable to fetch project")
  } finally {
    setLoading(false)
  }
})()
}, [project_id])

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <Link
          to="/projects"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-200"
          title="Back to projects"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h2 className="truncate text-xl font-semibold text-slate-800">
          {project?.project_name || "Project"}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        {loading ? (
          <div className="flex h-full items-center justify-center py-16 text-sm text-slate-500">Loading project...</div>
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center py-16 text-center">
            <p className="text-base font-medium text-slate-700">{error}</p>
            <Link to="/projects" className="mt-2 text-sm font-medium text-[#005ee2] hover:underline">Back to projects</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
              <span>ID: <span className="font-mono text-slate-700">{project.project_id}</span></span>
              <span>Created: <span className="text-slate-700">{formatDate(project.project_created_on)}</span></span>
            </div>

            <section>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Details</h3>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {project.project_details || "No details provided."}
              </p>
            </section>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {PROJECT_CARDS.map((card) => (
                <ProjectCard
                  key={card.key}
                  title={card.title}
                  icon={card.icon}
                  emptyText={card.emptyText}
                  onAdd={
                    card.key === "messages" ? () => openMessageModal("add")
                    : card.key === "todo" ? () => setAddingTodo(true)
                    : undefined
                  }
                >
                  {card.key === "todo" && (
                    <TodoList adding={addingTodo} onAddClose={() => setAddingTodo(false)} emptyText={card.emptyText} />
                  )}
                  {card.key === "messages" && messages.length > 0 && (
                    <ul className="flex max-h-72 flex-col gap-2 overflow-y-auto">
                      {messages.map((message, index) => (
                        <MessageRow
                          key={message.message_id ?? index}
                          message={message}
                          onView={(m) => openMessageModal("view", m)}
                          onEdit={(m) => openMessageModal("edit", m)}
                          onDelete={(m) => openMessageModal("delete", m)}
                        />
                      ))}
                    </ul>
                  )}
                </ProjectCard>
              ))}
            </div>
          </div>
        )}
      </div>

      {messageModal === "add" && (
        <AddMessage onClose={closeMessageModal} onSubmit={fetchMessages} />
      )}
      {messageModal === "view" && activeMessage && (
        <ViewMessage
          message={activeMessage}
          onClose={closeMessageModal}
          onEdit={(latest) => openMessageModal("edit", latest)}
        />
      )}
      {messageModal === "edit" && activeMessage && (
        <AddMessage message={activeMessage} onClose={closeMessageModal} onSubmit={fetchMessages} />
      )}
      {messageModal === "delete" && activeMessage && (
        <DeleteMessage message={activeMessage} onClose={closeMessageModal} onDeleted={fetchMessages} />
      )}
    </div>
  )
}

export default ProjectView
