import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card';

const cardImages = [
  { "src": "/img/natasha.png" , matched:false },
  { "src": "/img/bruce.jpg" , matched:false },
  { "src": "/img/ironman.jpg" , matched:false },
  { "src": "/img/scott.jpg" , matched:false },
  { "src": "/img/strange.jpg" , matched:false },
  { "src": "/img/spiderman.jpg" , matched:false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setChoiceOne(null)
    setChoiceTwo(null)  
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    

    if (choiceOne&&choiceTwo){
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map( card => {
            if (card.src === choiceOne.src){
              return {...card, matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      } else{
       setTimeout(() => resetTurn() , 1000);
        
      }
    }
  },[choiceOne,choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  useEffect( ()=> {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <p className='title'>Avengers Edition !!</p>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
          {cards.map(card => (
            <Card 
              card={card} 
              key={card.id} 
              handleChoice={handleChoice} 
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled = {disabled}
              
            />
          ))}
      </div>
      <p>Number of Turns : {turns}</p>
    </div>
  );
}

export default App