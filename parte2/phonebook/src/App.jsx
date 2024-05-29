import { useState } from 'react'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import Persons from './components/Persons'

function App () {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '654548356', id: 1 },
    { name: 'Firulais Menendez', number: '654315835', id: 2 },
    { name: 'Jaime Jimenez', number: '34242342', id: 3 },
    { name: 'Zacarias Hashimir', number: '34242342', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const handleNewName = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNewPhone = (e) => {
    setNewPhone(e.target.value)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const personToShow = search.trim() === ''
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().includes(search))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newName.trim() === '') return alert('Name input field cannnot be empty ')
    if (newPhone.trim() === '') return alert('Phone input field cannto be empty')

    const isPerson = persons.find(person => person.name === newName)
    if (!isPerson) {
      const addPerson = { name: newName, number: newPhone, id: persons.length + 1 }
      setPersons(persons.concat(addPerson))
      setNewName('')
      setNewPhone('')
    } else {
      return alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add a new </h2>

      <FormPerson
        handleSubmit={handleSubmit}
        newName={newName}
        handleNewName={handleNewName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone}
      />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} />
    </div>
  )
}

export default App
