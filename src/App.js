import SearchBar from "./Components/SearchBar/SearchBar";
import "./App.css";
import RecipesLayout from "./Components/RecipesLayout/RecipesLayout";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <RecipesLayout />
    </div>
  );
}

export default App;
