function Filter ({ search, handleSearch }) {
  return (
    <div>
      Filter shown with
      <input
        type='search'
        value={search}
        onChange={handleSearch}
      />
    </div>
  )
}

export default Filter
