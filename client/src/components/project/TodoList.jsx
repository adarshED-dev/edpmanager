import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import TodoRow from './TodoRow'
import TodoForm from './TodoForm'
import ViewTodo from './ViewTodo'
import { toDateInput } from './todoUtils'

// Open tasks first (earliest due date first), completed tasks at the bottom
function sortTodos(todos) {
  return [...todos].sort((a, b) => {
    if (Boolean(a.todo_completed) !== Boolean(b.todo_completed)) return a.todo_completed ? 1 : -1
    const aDue = toDateInput(a.todo_due_date) || "9999"
    const bDue = toDateInput(b.todo_due_date) || "9999"
    return aDue.localeCompare(bDue)
  })
}

function TodoList({ adding, onAddClose, emptyText }) {
const { project_id } = useParams()
const [todos, setTodos] = useState([])
// Which drawer is open: "view" | "edit" | null
const [drawer, setDrawer] = useState(null)
const [activeTodo, setActiveTodo] = useState(null)

const fetchTodos = async () => {
  try {
    const result = await axios.get(`/api/projects/get/project-detail/todo/${encodeURIComponent(project_id)}`)
    const body = result.data.body
    setTodos(Array.isArray(body) ? body : [])
  } catch (error) {
    console.error(error)
  }
}

useEffect(()=>{
  fetchTodos()
}, [project_id])

const openDrawer = (type, todo) => {
  setActiveTodo(todo)
  setDrawer(type)
}
const closeDrawer = () => {
  setDrawer(null)
  setActiveTodo(null)
}

const handleToggle = async (todo) => {
  const updated = { ...todo, project_id, todo_completed: !todo.todo_completed }
  // Update the list straight away, then sync with the server
  setTodos((prev) => prev.map((t) => (t.todo_id === todo.todo_id ? updated : t)))
  try {
    await axios.post("/api/projects/update/project-detail/todo", updated)
  } catch (error) {
    console.error(error)
    fetchTodos()
  }
}

const handleDelete = async (todo) => {
  try {
    await axios.post("/api/projects/delete/project-detail/todo", { project_id, todo_id: todo.todo_id })
    await fetchTodos()
  } catch (error) {
    console.error(error)
  }
}

const doneCount = todos.filter((t) => t.todo_completed).length
const percent = todos.length ? Math.round((doneCount / todos.length) * 100) : 0

  return (
    <>
      {todos.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-sm text-slate-400">{emptyText}</div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Progress */}
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">{doneCount} of {todos.length} done</span>
              <span className="text-slate-400">{percent}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <ul className="flex max-h-72 flex-col gap-2 overflow-y-auto">
            {sortTodos(todos).map((todo, index) => (
              <TodoRow
                key={todo.todo_id ?? index}
                todo={todo}
                onToggle={handleToggle}
                onView={(t) => openDrawer("view", t)}
                onEdit={(t) => openDrawer("edit", t)}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      )}

      {adding && (
        <TodoForm onClose={onAddClose} onSaved={fetchTodos} />
      )}
      {drawer === "view" && activeTodo && (
        <ViewTodo todo={activeTodo} onClose={closeDrawer} onEdit={() => openDrawer("edit", activeTodo)} />
      )}
      {drawer === "edit" && activeTodo && (
        <TodoForm todo={activeTodo} onClose={closeDrawer} onSaved={fetchTodos} />
      )}
    </>
  )
}

export default TodoList
