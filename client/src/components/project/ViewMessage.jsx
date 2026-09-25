import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from './Modal'

function formatDate(value) {
  if (!value) return ""
  const date = new Date(value)
  if (isNaN(date)) return ""
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// `message` is the row from the list; the latest copy is fetched from the server by message_id
function ViewMessage({ message: initialMessage, onClose, onEdit }) {
  const [message, setMessage] = useState(initialMessage)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    (async function () {
      setLoading(true)
      setError("")
      try {
        const result = await axios.get(`/api/projects/view/project-detail/message/${encodeURIComponent(initialMessage.message_id)}`)
        if (result.data.body) setMessage(result.data.body)
      } catch (error) {
        console.error(error)
        setError(error.response?.data?.message || "Unable to load message")
      } finally {
        setLoading(false)
      }
    })()
  }, [initialMessage.message_id])

  return (
    <Modal title={message.message_title} onClose={onClose} maxWidth="max-w-2xl">
      <div className="flex min-h-0 flex-col gap-4 px-5 py-5 sm:px-6">
        {loading && <p className="text-xs text-slate-400">Loading latest version...</p>}
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
        {message.message_created_on && (
          <p className="text-xs text-slate-500">{formatDate(message.message_created_on)}</p>
        )}
        <p className="overflow-y-auto whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700">
          {message.message_content}
        </p>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(message)}
              className="cursor-pointer rounded-lg bg-[#005ee2] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#005ee2]/20 transition hover:bg-[#004bb5]"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ViewMessage
