import React from 'react'
import { Link } from 'react-router-dom'

function getInitials(name = "") {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return "--"
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

function formatDate(value) {
  if (!value) return "—"
  const date = new Date(value)
  if (isNaN(date)) return "—"
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function ProjectCard({ id, name, details, createdAt }) {
  return (
    <Link to={`/projects/project-view/${encodeURIComponent(id)}`} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#005ee2]/40 hover:shadow-md">
      {/* Created time */}
      <div className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{formatDate(createdAt)}</span>
      </div>

      {/* Icon + title */}
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#005ee2]/10 text-sm font-bold text-[#005ee2]">
          {getInitials(name)}
        </span>
        <h3 className="truncate text-base font-semibold text-slate-800" title={name}>
          {name}
        </h3>
      </div>

      {/* Details */}
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
        {details}
      </p>
    </Link>
  )
}

export default ProjectCard
