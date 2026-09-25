import React, { useState } from 'react'
import { getPriority, formatDueDate, isOverdue } from './todoUtils'

const ICONS = {
  view: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  edit: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  delete: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
}

function IconButton({ icon, label, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-slate-400 transition ${className}`}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
    </button>
  )
}

function TodoRow({ todo, onToggle, onView, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const priority = getPriority(todo.todo_priority)
  const overdue = isOverdue(todo)
  const done = Boolean(todo.todo_completed)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await onDelete(todo)
    } finally {
      setDeleting(false)
      setConfirmDelete(false)
    }
  }

  // Inline delete confirmation replaces the row content
  if (confirmDelete) {
    return (
      <li className="flex items-center gap-3 rounded-lg border border-red-200 border-l-4 border-l-red-500 bg-red-50 px-3 py-2.5">
        <p className="min-w-0 flex-1 truncate text-sm text-red-700">
          Delete <span className="font-semibold">"{todo.todo_title}"</span>?
        </p>
        <button
          type="button"
          onClick={() => setConfirmDelete(false)}
          className="cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-white"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="cursor-pointer rounded-md bg-red-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </li>
    )
  }

  return (
    <li className={`group flex items-center gap-3 rounded-lg border border-slate-200 border-l-4 ${priority.stripe} bg-white px-3 py-2.5 transition hover:shadow-sm ${done ? "opacity-60" : ""}`}>
      {/* Checkbox */}
      <button
        type="button"
        onClick={() => onToggle(todo)}
        role="checkbox"
        aria-checked={done}
        aria-label={done ? "Mark as not done" : "Mark as done"}
        className={`flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition ${done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-transparent hover:border-emerald-500"}`}
      >
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </button>

      {/* Title + meta */}
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${done ? "text-slate-400 line-through" : "text-slate-800"}`}>
          {todo.todo_title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${priority.badge}`}>
            {priority.label}
          </span>
          {todo.todo_due_date && (
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${overdue ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"}`}>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {overdue ? "Overdue · " : ""}{formatDueDate(todo.todo_due_date)}
            </span>
          )}
        </div>
      </div>

      {/* Actions: always visible on touch screens, on hover for larger screens */}
      <div className="flex shrink-0 items-center transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
        <IconButton icon={ICONS.view} label="View task" onClick={() => onView(todo)} className="hover:bg-slate-100 hover:text-slate-700" />
        <IconButton icon={ICONS.edit} label="Edit task" onClick={() => onEdit(todo)} className="hover:bg-[#005ee2]/10 hover:text-[#005ee2]" />
        <IconButton icon={ICONS.delete} label="Delete task" onClick={() => setConfirmDelete(true)} className="hover:bg-red-50 hover:text-red-600" />
      </div>
    </li>
  )
}

export default TodoRow
