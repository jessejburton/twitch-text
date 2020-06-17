import React from 'react'

export const DisplayLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", alignItems: "top", justifyContent: "center" }}>
      {children}
    </div>
  )
}
