import React from 'react'

// Placeholder numbers until an analytics API exists
const stats = [
  { label: 'Total Projects', value: 3 },
  { label: 'In Progress', value: 1 },
  { label: 'Completed', value: 1 },
  { label: 'Reminders', value: 3 },
]

function Analytics() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Analytics</h2>
      <div className="grid grid-cols-2 gap-2 max-w-md">
        {stats.map((s)=>(
          <div key={s.label} className="border p-3">
            <div className="text-sm text-gray-600">{s.label}</div>
            <div className="text-2xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analytics
