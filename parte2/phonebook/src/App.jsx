import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import Persons from './components/Persons'
import personAxios from './services/persons'
import './App.css'

function App () {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personAxios.getAll()
      .then(initialData => {
        const dataPersons = initialData
        setPersons(dataPersons)
      })
  }, [])

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewPhone = (e) => {
    setNewPhone(e.target.value)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleDelete = (id) => {
    const isPerson = persons.find(person => person.id === id)
    console.log(isPerson)
    const { name } = isPerson
    if (!(window.confirm(`Delete ${name} ?`))) return
    personAxios.deletePerson(id)
      .then(res => {
        const deletePerson = persons.filter(person => person.id !== res.id)
        setPersons(deletePerson)
      })
  }

  const personToShow = search.trim() === ''
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Check if newName and newPhone are empty
    if (newName.trim() === '') return alert('Name input field cannnot be empty ')
    if (newPhone.trim() === '') return alert('Phone input field cannto be empty')

    const isPerson = persons.find(person => person.name === newName)
    if (!isPerson) {
      const addPerson = { name: newName, number: newPhone }
      personAxios.create(addPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewPhone('')
        })
    } else {
      const areEqualsNumber = newPhone !== isPerson.number
      const changePhone = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (areEqualsNumber) { // Check if number is the same that registered
        if (!changePhone) return // Check if really want to change the number
        const changePerson = { ...isPerson, number: newPhone }
        personAxios.update(isPerson.id, changePerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== isPerson.id ? person : returnedPerson))
            setNewName('')
            setNewPhone('')
          })
      } else {
        alert(`The numbers register for ${isPerson.name} is the same`)
      }
    }
  }

  return (
    <div className='container'>
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
      <h1>Numbers</h1>
      <Persons personToShow={personToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
