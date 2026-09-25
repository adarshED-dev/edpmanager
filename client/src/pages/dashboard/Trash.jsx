import React from 'react'

// Placeholder data until a trash API exists
const trashed = [
  { id: 1, name: 'Old Landing Page', deletedOn: '2026-09-20' },
  { id: 2, name: 'Test Project', deletedOn: '2026-09-18' },
]

function Trash() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Trash</h2>
      {trashed.length === 0 ? (
        <p>Trash is empty.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {trashed.map((t)=>(
            <li key={t.id} className="border p-2 flex justify-between">
              <span>{t.name}</span>
              <span className="text-sm text-gray-600">Deleted {t.deletedOn}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Trash
