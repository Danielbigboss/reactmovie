import { useEffect, useState } from "react"
import { FaLongArrowAltLeft, FaPlus, FaRegTimesCircle } from "react-icons/fa"
import { FaMinus } from "react-icons/fa6"
import Star from "./Star"
import { MdHome, MdOutlineOndemandVideo, MdOutlineWatchLater } from "react-icons/md"


const Movies = ({ movieData, isLoading, movieNotFoundError, selectedId, setSelectedId, error, darkMode }) => {
    const [showmovies, setShowMovies] = useState(true)
    const storedata = JSON.parse(localStorage.getItem('watchedMovie'));
    const [watchedMovie, setWatchedMovie] = useState( storedata ?? [])
    const [movie, setMovie] = useState({})
    const [rating, setRating] = useState(0)
    const [full, setFull] = useState(false)
    const [loadingEffect, setLoadingEffect] = useState(false)
    const [responsive, SetResponsive] = useState(false)




    const isWatched = watchedMovie.map((movie) => movie.imdbID).includes(selectedId);
    const handleSelected = (id) => {

        SetResponsive(true)
        const controller = new AbortController()
        async function movieApi() {
            setLoadingEffect(true)
            const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=b1832bf5&`)
            const data = await res.json();
            setLoadingEffect(false)
            setMovie({ ...data, userRating: 0 })
            document.title = `Movie | ${data.Title}`
        }

        movieApi();
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    if (selectedId === null) document.title = `Movie app`
    if (selectedId === '') document.title = `Movie app`

 
    const handleWatchMovies = (id) => {
        setWatchedMovie([...watchedMovie, movie])
        localStorage.setItem('watchedMovie', JSON.stringify([...watchedMovie, movie]))
    }


    const handleDeleteWatchedMovie = (id) => {

        setWatchedMovie(watchedMovie.filter((item) => item.imdbID !== id));
        
        // localStorage.clear('watchedMovie')

    }

    return (
        <>
            <div className={`container-my mx-auto mt-32 flex gap-5 ${darkMode ? 'text-white' : 'text-black'}`} >
                <div className={`${responsive ? 'hidden' : ''} lg:block w-full lg:w-1/2  my-h scroll-my ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white shadow-lg'}`}>
                    <div className="flex items-center justify-between px-5 py-3">


                        <div className="relative" onClick={() => { SetResponsive(true); setSelectedId(null) }}>
                            <button className={`${responsive ? 'block' : ''} lg:hidden text-xs bg-blue-800 rounded-full p-1 left-0 top-0 text-white`}> <MdOutlineOndemandVideo /> </button>
                            <button className={`${responsive ? 'block' : ''} lg:hidden bg-red-800 absolute movie-count rounded-full  px-1 top-0 left-3 text-white`}> {watchedMovie.length} </button>
                        </div>



                        <button className={` p-1 rounded-full text-xs shadow-lg ${darkMode ? 'bg-black' : 'bg-slate-50'}`} onClick={() => setShowMovies(!showmovies)}>
                            {showmovies ? <FaMinus /> : <FaPlus />}
                        </button>

                    </div>
                    {showmovies && <div>
                        {movieData?.length > 0 ? <div>
                            {isLoading ? <div className={` text-center text-2xl}`}>Loading...</div> : <span>
                                {movieData?.map((item, index) => {
                                    return <div className={`flex gap-3  p-5 cursor-pointer ${darkMode ? 'hover:bg-zinc-800 border-b-my' : ' hover:bg-slate-100 border-b'} ${selectedId === item.imdbID && `${darkMode ? 'bg-zinc-800' : 'bg-slate-50'}`}`} key={index} onClick={() => handleSelected(item.imdbID
                                    )}>
                                        <div>
                                            <img className=" w-16 h-20" src={item.Poster} alt="movie" />
                                        </div>
                                        <div>
                                            <div className="mb-2 text-sm">{item.Title}</div>
                                            <div className="text-xs">{item.Year}</div>
                                        </div>
                                    </div>
                                })}
                            </span>}
                        </div>
                            :
                            <div>{error ? <div className="text-center text-sm font-bold"> ⛔ Movie Not Found </div> : <div className="text-sm font-bold text-center">Search Your Movie</div>}</div>}
                    </div>}
                </div>
                <div className={`${responsive ? '' : 'hidden'} w-full lg:block  lg:w-1/2 my-h scroll-my ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white shadow-lg text-black'}`}>
                    {selectedId ? <>
                        {loadingEffect ? <div className=" p-3 text-center">Loading...</div>
                            :
                            <div className="relative">
                                <button className={` ${responsive ? 'hidden' : ''} lg:block m-2 p-2 rounded-full absolute bg-blue-800 text-white `} onClick={() => setSelectedId(null)}> <FaLongArrowAltLeft /> </button>
                                <button className={` ${responsive ? 'block' : ''} lg:hidden m-2 p-2 rounded-full absolute bg-blue-800 text-white `} onClick={() => { SetResponsive(false); setSelectedId('') }}> <FaLongArrowAltLeft /> </button>
                                <span onClick={() => setSelectedId(null)}>
                                    <button className={`${responsive ? 'block' : ''} lg:hidden bg-blue-800 absolute m-2  rounded-full p-2 right-0 text-white`}> <MdOutlineOndemandVideo /> </button>
                                    <button className={`${responsive ? 'block' : ''} lg:hidden bg-red-800 absolute movie-count rounded-full  px-1 top-1 right-1 text-white`}> {watchedMovie.length} </button>
                                </span>
                                {/* <div className="text-white">{selectedId}</div> */}
                                <div className={`flex gap-2 ${darkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                                    <img src={movie.Poster} alt="" className=" w-32" />
                                    <div className="p-3 w-full">
                                        <div className="font-bold ">{movie.Title}</div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="text-xs">{movie.Released}</div>
                                            <div>.</div>
                                            <div className="text-xs">{movie.Runtime}</div>
                                        </div>
                                        <div className="text-xs mt-2">{movie.Genre}</div>
                                        <div className="text-xs mt-2">⭐ {movie.imdbRating
                                        }</div>
                                    </div>
                                </div>
                                <div className={`w-10/12 mx-auto py-3 rounded-lg  flex items-center justify-center mt-5 gap-1 ${darkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}> {Array.from({ length: 10 }, (_, index) => <Star full={rating >= index + 1} onRate={() => setRating(index + 1)} key={index} />)} <span className="text-xs"> {rating}</span></div>
                                <div className="">
                                    {isWatched ?
                                        <button className={`bg-blue-800 text-xs font-bold py-3 w-10/12 mt-3 rounded-lg flex items-center gap-1 justify-center mx-auto text-white`}><>Movie Already In watchlist</> <MdOutlineWatchLater /></button>
                                        :
                                        <button className="bg-blue-800 text-xs font-bold py-3 w-10/12 mt-3 rounded-lg flex items-center gap-1 justify-center mx-auto text-white" onClick={() => { handleWatchMovies(movie.imdbID) }}><span>Add Movie to watchlist</span> <MdOutlineWatchLater className="text-lg" /> </button>
                                    }
                                </div>
                                <section className="text-xs p-3">
                                    <p className="italic mb-3">{movie.Plot}</p>
                                    <p className="mb-3">Starring {movie.Actors}</p>
                                    <p className="">Directed by {movie.Director}</p>
                                </section>
                            </div>
                        }
                    </> : <div>
                        <div className={`shadow p-5 relative ${darkMode ? 'shadow-black' : ''}`}>
                            <button className={`${responsive && 'block'} lg:hidden text-blue-800 font-bold absolute right-0 px-5`} onClick={() => { SetResponsive(false); setSelectedId('') }}> <MdHome /> </button>
                            <div className="text-sm font-bold mb-2">MOVIES YOU WATCHED</div>
                            <div className="flex justify-between  text-xs">
                                <div>{watchedMovie?.length} Movies</div>
                                <div>⭐⭐ 3.7</div>
                                <div>⭐⭐ 2.5</div>
                                <div>13 mins</div>
                            </div>
                        </div>
                        {watchedMovie?.map((item, index) => {
                            return <div className="flex gap-2 px-5 py-2 items-center cursor-pointer relative" key={index}>
                                <button className="text-sm absolute top-0 right-0 mx-5 mt-2" onClick={() => { handleDeleteWatchedMovie(item.imdbID) }}>❌</button>
                                <div>
                                    <img src={item.Poster} alt="d" className="w-10" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold">{item.Title}</div>
                                    <div className="text-xs mt-1">
                                        <span> {item.imdbRating === null ? `` : `⭐ ${item.imdbRating}`}</span>
                                        <span> - ⏳  {item.Runtime}s</span>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>}
                </div>

            </div>
        </>
    )
}

export default Movies