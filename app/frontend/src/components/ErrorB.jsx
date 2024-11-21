import React from 'react'

export default function ErrorB({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
    <p>Oops algo esta mal:</p>
    <pre>{error.message}</pre>
  </div>
  )
}
