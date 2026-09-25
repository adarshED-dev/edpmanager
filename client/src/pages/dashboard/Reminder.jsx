import React from 'react'

// Placeholder data until a reminders API exists
const reminders = [
  { id: 1, text: 'Send invoice to client', when: '2026-09-26 10:00' },
  { id: 2, text: 'Team standup', when: '2026-09-26 09:30' },
  { id: 3, text: 'Review Mobile App specs', when: '2026-09-28 15:00' },
]

function Reminder() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Reminders</h2>
      <ul className="flex flex-col gap-2">
        {reminders.map((r)=>(
          <li key={r.id} className="border p-2">
            <div>{r.text}</div>
            <div className="text-sm text-gray-600">{r.when}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Reminder
