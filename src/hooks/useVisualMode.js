import {useState} from 'react'

export function useVisualMode(initialView) {
  const [mode, setMode] = useState(initialView)
  const [history, setHistory] = useState([initialView])
  
  
  function transition(view, replace = false) {
    if(replace) {
      history.pop()
      setHistory(history)
    }
    setHistory(prev => [...prev, view])
    setMode(view)
  }
  
  function back() {

    if(history.length > 1) {
      history.pop()
    }
    if(history.length > 0) {
      setMode(history.slice(-1)[0])
    }
  }

  return { mode, transition, back }
}