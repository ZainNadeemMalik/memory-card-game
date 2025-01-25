function Header({ score, bestScore}) {
  return(
    <div className="header">
      <div className="title-container">
        <h1 className="title">Pokemon Memory Game</h1>
        <p className="title-description">Click on the cards to earn points, but be careful and do not click on the same image twice!</p>
      </div>
      <div className="score">
        <p className="current-score">Score: <span>{score}</span></p>
        <p className="best-score">Best Score: <span>{bestScore}</span></p>
        <p className="target-score">You win when you have selected all 9 Pokemon.</p>
      </div>
    </div>
  )
}

export default Header