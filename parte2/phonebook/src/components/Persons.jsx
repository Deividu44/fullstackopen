function Persons ({ personToShow, handleDelete }) {
  return (
    <ul className='listPersons'>
      {personToShow.map(person =>
        <li key={person.id}>{person.name} - {person.number}
          <button className='deleteBtn' onClick={() => handleDelete(person.id)}>Eliminar</button>
        </li>

      )}
    </ul>
  )
}

export default Persons
