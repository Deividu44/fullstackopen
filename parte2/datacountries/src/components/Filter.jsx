const Filter = ({ search }) => {
  return (
    <ul>
      {search.map(c => (
        <li key={c}>{c}<button>Show</button></li>
      ))}
    </ul>
  )
}

export default Filter
