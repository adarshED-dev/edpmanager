import React from 'react'
import Drawer from './Drawer'
import { getPriority, formatDueDate, isOverdue } from './todoUtils'

function DetailItem({ label, children }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-slate-700">{children}</dd>
    </div>
  )
}

function ViewTodo({ todo, onClose, onEdit }) {
  const priority = getPriority(todo.todo_priority)
  const overdue = isOverdue(todo)

  return (
    <Drawer
      title={todo.todo_title}
      subtitle="To-Do"
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 cursor-pointer rounded-lg bg-[#005ee2] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#005ee2]/20 transition hover:bg-[#004bb5]"
          >
            Edit Task
          </button>
        </>
      }
    >
      <dl className="grid grid-cols-2 gap-2">
        <DetailItem label="Status">
          {todo.todo_completed ? (
            <span className="text-emerald-600">Completed</span>
          ) : overdue ? (
            <span className="text-red-600">Overdue</span>
          ) : (
            <span>In progress</span>
          )}
        </DetailItem>
        <DetailItem label="Priority">
          <span className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${priority.dot}`} />
            {priority.label}
          </span>
        </DetailItem>
        <div className="col-span-2">
          <DetailItem label="Due Date">
            <span className={overdue ? "text-red-600" : ""}>{formatDueDate(todo.todo_due_date) || "No due date"}</span>
          </DetailItem>
        </div>
      </dl>

      <h3 className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wide text-slate-400">Notes</h3>
      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700">
        {todo.todo_notes || <span className="text-slate-400">No notes added.</span>}
      </p>
    </Drawer>
  )
}

export default ViewTodo
