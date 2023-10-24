import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const gameIcons = ["🦺","🚡","🦖","🍊","🐤","🐫","💃","🧚","🎲","🌿","🦄","🎅"]
function App() {
 
  
  return (
    
    <main>
      <h1>Memory game in react</h1>
      <div className="container"> 
      {gameIcons.map((icon, index)=>(
        <div key={index} className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front"/>
            <div className="flip-card-back">{icon}</div>
          </div>
        </div>))}
      </div>
    </main>
  )
}

export default App
