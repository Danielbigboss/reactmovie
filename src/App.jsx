
import './App.css';
import Header from './Components/Header';
import Movies from './Components/Movies';
import { useEffect, useState } from 'react';

function App() {
  const [movieData, setMovieData] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLaoding] = useState('False')
  const [error, setError] = useState(false);
  const [selectedId, setSelectedId] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(function() {
    document.addEventListener('keydown', function(e) {
    if(e.code === 'Escape'){
     setSelectedId(null)
    }
    })
  }, [])

  if (darkMode) {
    document.querySelector('body').style.backgroundColor = 'rgba(0, 0, 0, 0.956)'
  } else {
    document.querySelector('body').style.backgroundColor = 'whitesmoke'
  };
  const handleSearch = (e) => {
    setUserInput(e.target.value)
    const controller = new AbortController();
    async function getApi() {
      if (e.target.value.length > 2) {
        setIsLaoding(true)
        const api = await fetch(`https://www.omdbapi.com/?apikey=b1832bf5&s=${e.target.value}`)
        const data = await api.json();
        if (data.Response === 'False') {
          console.log(data.Response)
          setIsLaoding(false); setError(true)
        }
        setMovieData(data.Search)
        setIsLaoding(false)
      } else {
        setError(false)
        setIsLaoding(false)
      }

    }
    getApi();

  }
  return (
    <>
      <Header userInput={userInput} handleSearch={handleSearch} movieData={movieData} darkMode={darkMode} setDarkMode={setDarkMode}/>
      {<Movies movieData={movieData} isLoading={isLoading} selectedId={selectedId} setSelectedId={setSelectedId} error={error} darkMode={darkMode} />}
    </>
  );
}



export default App;


