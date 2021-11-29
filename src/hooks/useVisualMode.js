import { useState } from 'react'

export function useVisualMode(initialView) {
  const [history, setHistory] = useState([initialView]);
  
  
  function transition(view, replace = false) {
    if(replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), view]);
    } else {
      setHistory(prev => [...prev, view]);
    }
  }
  
  function back() {
    if (history.length <=1) return;
    setHistory(prev => [...prev.slice(0, history.length - 1)]);
  }

  return { mode: history[history.length - 1], transition, back }
};