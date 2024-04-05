import { useState } from 'react';
import './App.css';
import Header from './assets/components/Header';
import MarvelData from './assets/components/MarvelData';
import { createContext } from 'react';

export const contextData = createContext();

function App() {
  const [word, setWord] = useState('A');
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <contextData.Provider
      value={{
        word,
        setWord,
        characters,
        setCharacters,
        isLoading,
        setIsLoading,
      }}
    >
      <div className='relative'>
        <div className="absolute inset-0 bg-[url('../public/2.jpg')]  bg-top  "></div>
        <div className='absolute inset-0 bg-black opacity-80 '></div>
        <div className='flex flex-col justify-center items-center relative z-10 py-10 lg:py-32   '>
          <Header word={word} setWord={setWord} setIsLoading={setIsLoading} />
          <MarvelData
            word={word}
            setWord={setWord}
            characters={characters}
            setCharacters={setCharacters}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
      </div>
    </contextData.Provider>
  );
}

export default App;
