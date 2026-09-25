import React from 'react'

function formatDate(value) {
  if (!value) return ""
  const date = new Date(value)
  if (isNaN(date)) return ""
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const ACTIONS = [
  {
    key: "view",
    label: "View message",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    className: "hover:bg-slate-100 hover:text-slate-700",
  },
  {
    key: "edit",
    label: "Edit message",
    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
    className: "hover:bg-[#005ee2]/10 hover:text-[#005ee2]",
  },
  {
    key: "delete",
    label: "Delete message",
    icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
    className: "hover:bg-red-50 hover:text-red-600",
  },
]

function MessageRow({ message, onView, onEdit, onDelete }) {
  const handlers = { view: onView, edit: onEdit, delete: onDelete }

  return (
    <li className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition hover:border-[#005ee2]/40">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="truncate text-sm font-semibold text-slate-800">{message.message_title}</h4>
          {message.message_created_on && (
            <span className="shrink-0 text-xs text-slate-400">{formatDate(message.message_created_on)}</span>
          )}
        </div>
        <p className="mt-1 line-clamp-2 whitespace-pre-wrap text-sm text-slate-600">{message.message_content}</p>
      </div>

      <div className="flex shrink-0 items-center gap-0.5">
        {ACTIONS.map((action) => (
          <button
            key={action.key}
            type="button"
            onClick={() => handlers[action.key]?.(message)}
            aria-label={action.label}
            title={action.label}
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-slate-400 transition ${action.className}`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
            </svg>
          </button>
        ))}
      </div>
    </li>
  )
}

export default MessageRow
