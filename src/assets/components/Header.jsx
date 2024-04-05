import { useContext } from 'react';
import { contextData } from '../../App';

export default function Header() {
  const { word, setWord, setIsLoading } = useContext(contextData);

  function handleInput(e) {
    setWord(e.target.value.toUpperCase());
    setIsLoading(true);
  }

  return (
    <div className='flex flex-col items-center justify-center pl-10 pr-10 md:pl-20 md:pr-20 lg:pl-40 lg:pr-40'>
      <div className='flex items-center justify-center gap-2 mt-2'>
        <img
          className='w-24 md:w-28'
          src='https://seeklogo.com/images/M/Marvel_Comics-logo-D489AEB9C1-seeklogo.com.png'
          alt='Marvel Comics Logo'
        />
        <h1 className='font-bold text-3xl md:text-5xl text-white'>
          Characters
        </h1>
      </div>
      <input
        className='m-6 md:m-8 mb-12 md:mb-16 border-b-2 bg-transparent w-28 md:w-44 outline-none pl-2 text-white py-2 font-bold focus:w-full transition-all ease-in duration-800 placeholder:text-slate-300 placeholder:font-bold placeholder:text-xl'
        type='text'
        placeholder='SEARCH'
        value={word}
        onChange={handleInput}
      />
    </div>
  );
}
