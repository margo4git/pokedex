import logo from "./logo.svg";
import { PokemonContext, PokemonProvider, usePokemon } from "./context/pokemon";
import { PokemonCards } from "./containers/pokemonCards";
import { DetailsCard } from "./components/detailsCard";

function App() {
  return (
    <PokemonProvider>
      <h1>Pokedex</h1>
      <div className="app">
        <PokemonCards />
        <DetailsCard />
      </div>
    </PokemonProvider>
  );
}

export default App;
