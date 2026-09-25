export const PRIORITIES = {
  high: { label: "High", stripe: "border-l-red-500", badge: "bg-red-50 text-red-700 ring-red-200", dot: "bg-red-500" },
  medium: { label: "Medium", stripe: "border-l-amber-400", badge: "bg-amber-50 text-amber-700 ring-amber-200", dot: "bg-amber-400" },
  low: { label: "Low", stripe: "border-l-emerald-500", badge: "bg-emerald-50 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" },
}

export function getPriority(value) {
  return PRIORITIES[value] || PRIORITIES.medium
}

// "YYYY-MM-DD" in local time, for <input type="date"> and comparisons
export function toDateInput(value) {
  if (!value) return ""
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  const date = new Date(value)
  if (isNaN(date)) return ""
  const pad = (n) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function formatDueDate(value) {
  const day = toDateInput(value)
  if (!day) return ""
  // Parse as local midnight so the shown day doesn't shift with timezone
  const date = new Date(`${day}T00:00:00`)
  if (isNaN(date)) return ""
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
}

export function isOverdue(todo) {
  const due = toDateInput(todo.todo_due_date)
  return Boolean(due) && !todo.todo_completed && due < toDateInput(new Date())
}
