function FormPerson ({ handleSubmit, newName, handleNewName, newPhone, handleNewPhone }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input
          value={newName}
          onChange={handleNewName}
              />
      </div>
      <div>
        Phone number: <input
          value={newPhone}
          onChange={handleNewPhone}
                      />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default FormPerson
