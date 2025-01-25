import { useState, useEffect } from 'react'
import Header from './Header.jsx'
import CreateCard from './CardComponent.jsx'


const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
} 
// preferred way to shuffle an array for performance and more randomness Fisher-Yates shuffle algorithm; 

function App() {
  const [pokemons, setPokemons] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [clickedCards, setClickedCards] = useState([])


  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9')
        const data = await response.json()
        const results = data.results

        const pokemonDetails = await Promise.all(
          results.map(async (pokemon, index) => {
            const getPokeData = await fetch(pokemon.url)
            const pokeData = await getPokeData.json()
            return {
              name: pokemon.name,
              id: index,
              image: pokeData.sprites.front_default,
            }
            
          })
        )
        setPokemons(pokemonDetails)
      }
      catch (error) {
        console.error("Error fetching pokemon data:", error)
      }
    }
    fetchPokemons()
  }, [])

  useEffect(() => {
    const savedBestScore = localStorage.getItem('bestScore')
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('bestScore', bestScore)
  }, [bestScore])

  // function shuffleArray(array) {
  //   return array.sort(() => Math.random() - 0.5)
  // } simpler approach for shuffling

  function resetGame() {
    setScore(0)
    setClickedCards([])
    setPokemons(shuffleArray([...pokemons]))
  }

  function handleCardClick(id) {
    if(!clickedCards.includes(id)) {
      setScore(score + 1)
      setClickedCards([...clickedCards, id])

      if (score + 1 > bestScore) {
        setBestScore(score + 1)
      }

      if (clickedCards.length === 8) {
        alert('Congratulations! You WIN! Click OK to play again.')
        resetGame()
      }
    } else {
      if (score > bestScore) {
        setBestScore(score)
      }
      setScore(0)
      setClickedCards([])

      alert('Whoops! You selected the same Pokemon twice. Click OK to play again.')
    }
    setPokemons(shuffleArray([...pokemons]))
  }


  return (
    <>
    <Header score={score} bestScore={bestScore}/>
    <CreateCard pokemons={pokemons} onCardClick={handleCardClick}/>
    </>
  )
}

export default App
