function Persons ({ personToShow, handleDelete }) {
  return (
    <ul className='listPersons'>
      {personToShow.map(person =>
        <li key={person.id}>
          <p>{person.name}</p>
          <p>{person.number}</p>
          <button className='deleteBtn' onClick={() => handleDelete(person.id)}>Eliminar</button>
        </li>

      )}
    </ul>
  )
}

export default Persons
