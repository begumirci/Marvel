import { useEffect, useContext } from 'react';
import CryptoJS from 'crypto-js';
import { contextData } from '../../App';
import imgHydra from '../../../public/hydra.jpg';

export default function MarvelData() {
  const { word, characters, setCharacters, isLoading, setIsLoading } =
    useContext(contextData);
  const publicKey = '7ded2f7a3a8c86213e73c67cff1393f3';
  const privateKey = '653720ca2ca0c204c026a7994af56d91652946d2';
  const timeStamp = Date.now();
  const hash = CryptoJS.MD5(timeStamp + privateKey + publicKey).toString();

  useEffect(() => {
    fetchMarvelData();
  }, [word]);

  async function fetchMarvelData() {
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${word}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=30`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setCharacters(data.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  }
  const generateLink = (name) => {
    if (!name) return '';
    const characterName = name.includes('(')
      ? name.split('(')[0].trim().toLowerCase().replace(/\s+/g, '-')
      : name.trim().toLowerCase().replace(/\s+/g, '-');
    return characterName;
  };

  return (
    <div className='pl-10 pr-10 md:pl-20 md:pr-20 lg:pl-40 lg:pr-40 '>
      {isLoading ? (
        <>
          <div className='h-screen pt-10 md:pt-20 lg:pt-2  w-full '>
            <img
              className='w-52 h-52  logo animate-slow  mt-8 md:mt-20 lg:mt-24'
              src='../../../public/loading2.png'
              alt=''
            />
          </div>
        </>
      ) : (
        <>
          {characters.length > 0 ? (
            <div>
              <div className='grid xl:grid-cols-5 gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-40'>
                {characters.map((character) => (
                  <a
                    href={`https://www.marvel.com/characters/${generateLink(
                      character.name
                    )}`}
                    key={character.id}
                    className='rounded-lg flex flex-col items-center justify-center group overflow-hidden cursor-pointer w-auto md:w-full'
                  >
                    <img
                      className=' h-52 w-48 rounded-t-lg transform scale-100 object-fill transition-transform duration-300 border-red border-b-8 group-hover:scale-110'
                      src={character.thumbnail.path + '.jpg'}
                      alt=''
                    />
                    <div className='bg-gray z-0 pt-2 pl-2 h-32 text-white w-full cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:shadow-lg before:absolute before:top-[-100%] before:left-0 before:w-full before:h-full before:bg-gradient-to-b before:from-red before:to-red before:transition-all before:duration-500 before:ease-in-out before:z-[-1] group-hover:before:top-0'>
                      <h2 className='flex flex-col'>
                        {character.name.includes('(') &&
                        character.name.includes(')') ? (
                          <>
                            <span className='pb-8'>
                              {character.name.split('(')[0]}
                            </span>
                            <span className='justify-self-end text-zinc-500 group-hover:text-white transition-all duration-700'>
                              ({character.name.split('(')[1].split(')')[0]})
                            </span>
                          </>
                        ) : (
                          <div>
                            <h2>{character.name}</h2>
                          </div>
                        )}
                      </h2>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className='h-screen text-white flex flex-col  items-center gap-10 pt-10 md:pt-20 lg:pt-2  w-full '>
              <img
                className='w-52 h-52  animate-slow  mt-8 md:mt-20 lg:mt-24'
                src={imgHydra}
                alt=''
              />
              <h2 className='text-2xl text-center '>
                There is no character start with - {word} -
              </h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}
