import React, { useState } from "react"

const SyncButton: React.FC = (props) => {
  const handleSync: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    const things = fetch("/api/categories/sync/wc")
  }

  const handleParents: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    const things = fetch("/api/categories/sync/wc_parents")
  }

  const handleTagLanco: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    const things = fetch("/api/categories/sync/fix_orphans")
  }

  return (
    <div
      className=""
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={handleSync}>Sync Now</button>
      <button onClick={handleParents}>Sync Parents</button>
      <button onClick={handleTagLanco}>Fix Orphans</button>
    </div>
  )
}

export default SyncButton
