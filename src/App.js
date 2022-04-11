import './App.css'
import { useState, useEffect } from 'react'
import SingleCard from './Components/SingleCard'

const Images = [
    { "src": "/images/naruto-wallpaper-7.png", matched: false },
    { "src": "/images/killua.png", matched: false },
    { "src": "/images/saitama.png", matched: false },
    { "src": "/images/luffy.png", matched: false },
    { "src": "/images/kakashi.png", matched: false },
    { "src": "/images/goku.png", matched: false },
]

function App() {
    const [tiles, setTiles] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disableTile, setDisableTile] = useState(false)

    const shuffleHandler = () => {
        const shuffledCards = [...Images, ...Images]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        setChoiceOne(null)
        setChoiceTwo(null)
        setTiles(shuffledCards)
        setTurns(0)
    }

    const choiceHandler = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {

        if (choiceOne && choiceTwo) {
            setDisableTile(true)
            if (choiceOne.src === choiceTwo.src) {
                setTiles(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                reset()
            }
            else {
                setTimeout(() => reset(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    // console.log(tiles)

    useEffect(() => {
        shuffleHandler()
    }, [])

    const reset = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisableTile(false)
    }
    return (
        <div className="App">
            <p>Ohayō</p>
            <h1>Match The MC(s)</h1>
            <button onClick={shuffleHandler}>New Game (Shuffle Tiles)</button>
            <div className="card-grid">
                {tiles.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        choiceHandle={choiceHandler}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disableTile}
                    />
                ))}
            </div>
            <p>Turns: {turns}</p>
            <p>Arigatō gozaimas</p>
        </div>
    );
}

export default App