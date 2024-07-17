

const Header = ({ userInput, handleSearch, darkMode, setDarkMode }) => {

  return (
    <>
      <header className="fixed w-full right-0 top-0">
        <nav className="bg-blue-800 p-3 m-5 flex items-center justify-between rounded-xl shadow">
          <div className="logo text-xs md:text-2xl font-bold text-white">WatchME🍿</div>
          <div className="w-7/12 md:w-80">
            <input type="text"
              className={`w-full text-base lg:text-sm shadow outline-none p-2 md:p-2 rounded-lg ${darkMode ? 'bg-blue-600 text-white placeholder:text-white' : 'bg-white text-black'}`}
              value={userInput}
              onChange={handleSearch}
              placeholder="Search movie..."
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-white font-bold hidden md:block">Dark mode</div>
            <div className={`w-7 h-5 md:w-12 md:h-7 rounded-2xl relative ${darkMode ? 'bg-white ' : 'bg-slate-300'}`} onClick={() => setDarkMode(!darkMode)}>
              <div className={`h-3 w-3 md:h-5 md:w-5 rounded-full bg-green-700 absolute m-1 ${darkMode ? 'right-0' : 'left-0'}`}></div>
            </div>
          </div>
        </nav>
      </header>



    </>
  )
}

export default Header