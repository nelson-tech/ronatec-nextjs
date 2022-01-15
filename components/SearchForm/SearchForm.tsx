const SearchForm = () => {
  return (
    <div className="inline-block my-6 w-full text-left align-middle">
      <div>
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-700">
          Search
        </h2>
      </div>
      <input
        id="desktop-search"
        className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder="Search"
        type="search"
        name="search"
      />
    </div>
  )
}

export default SearchForm
