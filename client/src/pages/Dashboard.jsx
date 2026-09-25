import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

const links = [
  { to: 'projects', label: 'Projects' },
  { to: 'reminder', label: 'Reminder', disabled: true },
  { to: 'trash', label: 'Trash', disabled: true },
  { to: 'analytics', label: 'Analytics', disabled: true },
]

function Home() {
const navigate = useNavigate()
const [user, setUser] = useState("")
const [menuOpen, setMenuOpen] = useState(false)
const menuRef = useRef(null)

useEffect(()=>{
(async function() {
  try{
    const result = await axios.post("http://localhost:5000/api/user/session/verification")
    if(result.data.message != "success"){
      console.log("working")
      navigate('/login', {replace: true})
    } else {
      const u = result.data.user
      setUser(typeof u === "string" ? u : u?.email || "")
    }
  } catch (error){
    console.error(error)
  }
})()
}, [])

useEffect(()=>{
  const handleClickOutside = (e)=>{
    if(menuRef.current && !menuRef.current.contains(e.target)){
      setMenuOpen(false)
    }
  }
  document.addEventListener("mousedown", handleClickOutside)
  return ()=> document.removeEventListener("mousedown", handleClickOutside)
}, [])

const handleLogout = async ()=>{
  try{
    const result = await axios.post("/api/user/session/logout")
    console.log(result.data.message)
  } catch (error){
    console.error(error)
  }
  navigate('/login', {replace: true})
}

const username = user ? user.split("@")[0] : "User"

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-[#005ee2] px-4 text-white shadow-md sm:px-6">
        <h1 className="truncate text-base font-bold sm:text-xl">
          EngineDigital <span className="font-light">Project Management</span>
        </h1>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={()=> setMenuOpen((prev)=> !prev)}
            className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 sm:pr-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold uppercase text-[#005ee2]">
              {username.charAt(0)}
            </span>
            <span className="hidden max-w-[10rem] truncate text-sm font-medium sm:block">{username}</span>
            <svg className={`h-4 w-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl bg-white text-slate-700 shadow-xl ring-1 ring-slate-200">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="truncate text-sm font-semibold text-slate-800">{username}</p>
                {user && <p className="truncate text-xs text-slate-500">{user}</p>}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="border-b border-slate-200 bg-white p-2 md:w-56 md:border-b-0 md:border-r md:p-4">
          <nav className="flex gap-1 overflow-x-auto md:flex-col">
            {links.map((link)=>(
              link.disabled ? (
                <abbr key={link.to} title="Under development" className="block cursor-not-allowed no-underline">
                  <button
                    type="button"
                    disabled
                    className="pointer-events-none w-full whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm text-slate-400"
                  >
                    {link.label}
                  </button>
                </abbr>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-[#005ee2]/10 font-semibold text-[#005ee2]' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  {link.label}
                </NavLink>
              )
            ))}
          </nav>
        </aside>
        <main className="flex flex-1 flex-col p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Home
