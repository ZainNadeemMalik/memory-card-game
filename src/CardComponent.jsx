function CreateCard({ pokemons, onCardClick }) {
  return (
    <main className="main">
    {pokemons.map((pokemon) => (
      <div key={pokemon.id} className="card" onClick={() => onCardClick(pokemon.id)}>
        <div className="img-container">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <p className="pokemon-name">{pokemon.name}</p>
      </div>
  ))}
    </main>
  )
}

export default CreateCard