import React, { useState } from 'react'
import axios from 'axios'
import Modal from './Modal'

function DeleteMessage({ message, onClose, onDeleted }) {
const [deleting, setDeleting] = useState(false)

const handleDelete = async ()=>{
    setDeleting(true)
    try {
        const result = await axios.delete(`/api/projects/delete/project-detail/message/${encodeURIComponent(message.message_id)}`)
        if(onDeleted) await onDeleted(result.data)
        onClose()
    } catch (error) {
        console.error(error)
    } finally {
        setDeleting(false)
    }
}

  return (
    <Modal title="Delete Message" onClose={onClose} maxWidth="max-w-md">
      <div className="px-5 py-5 sm:px-6">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <span className="font-semibold text-slate-800">"{message.message_title}"</span>? This can't be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="cursor-pointer rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-600/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteMessage
