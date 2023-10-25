import { useEffect, useMemo, useRef, useState } from 'react'
import Confetti from 'react-confetti'
import './App.css'

const gameIcons = ["🦺","🚡","🦖","🍊","🐤","🥪","🧞‍♀️","🐹","🥋"]
function App() {
 const [ pieces, setPieces ]= useState([])
 let timeOut = useRef()
 const isGameCompleted = useMemo(()=>{
  if(pieces.length>0 && pieces.every(piece=>piece.solved)){
    return true
  }
},[pieces])
  const startGame = () =>{
    const newGameIcons = []
    const duplicateGameIcons = gameIcons.concat(gameIcons)
    while(newGameIcons.length<gameIcons.length*2){
      const randomIndex = Math.floor(Math.random()*duplicateGameIcons.length)
      newGameIcons.push({
        emoji: duplicateGameIcons[randomIndex],
        flipped: false,
        solved: false,
        position: newGameIcons.length,
      })
      duplicateGameIcons.splice(randomIndex,1)
    }
    setPieces(newGameIcons)
  }
  useEffect(()=>{
    startGame()
  },[])
  const handleActive = (data) =>{
    const flippedData = pieces.filter(data=>data.flipped && !data.solved)
    if(flippedData.length === 2) return
    const newPieces = pieces.map(piece=>{
      if(piece.position === data.position){
        piece.flipped = !piece.flipped
      }
      return piece
    })
    setPieces(newPieces)
  }
  const gameLogicForFlipped = () =>{
    const flippedData = pieces.filter((data) =>data.flipped && !data.solved)
    if(flippedData.length === 2){
      timeOut.current = setTimeout(()=>{
        setPieces(pieces.map(piece=>{
            if(piece.position === flippedData[0].position || 
              piece.position === flippedData[1].position ){
                if(flippedData[0].emoji === flippedData[1].emoji){
                  piece.solved = true
                }
                else{
                  piece.flipped = false
                }
            }
            return piece
        }))
      },800)
    }

  }
  
  
  useEffect(()=>{
    gameLogicForFlipped();
    return()=>{
      clearTimeout(timeOut.current)
    }
  
  },[pieces])
  return (
    
    <main>
      <h1>Memory game</h1>
      <div className="container"> 
      {pieces.map((data, index)=>(
        <div key={index} className={`flip-card ${data.flipped ?"active": ''}`} onClick={()=>handleActive(data)}>
          <div className="flip-card-inner">
            <div className="flip-card-front"/>
            <div className="flip-card-back">{data.emoji}</div>
          </div>
        </div>))}
      </div>
      {isGameCompleted && (
        <div className='game-completed'>
        <h1>You Win!!!</h1>
        <Confetti width={window.innerWidth} height={window.innerHeight}/>
      </div>
      )}
      
    </main>
  )
}

export default App
