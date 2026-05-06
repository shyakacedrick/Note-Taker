import { useEffect, useState } from 'react'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  useEffect(() => {
    personService.getAll().then(res => setPersons(res.data))
  }, [])

  // add person
  const addPerson = (e) => {
    e.preventDefault()

    const newPerson = { name, number }

    personService.create(newPerson).then(res => {
      setPersons(persons.concat(res.data))
      setName('')
      setNumber('')
    })
  }

  // delete person
  const deletePerson = (id) => {
    personService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
  }

return (
  <div className="container">
    <h2>Phonebook</h2>

    <form onSubmit={addPerson}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        value={number}
        onChange={e => setNumber(e.target.value)}
        placeholder="Number"
      />

      <button type="submit">Add</button>
    </form>

    <div className="list">
      {persons.map(person => (
        <div className="card" key={person.id}>
          <div>
            <strong>{person.name}</strong>
            <br />
            <span>{person.number}</span>
          </div>

          <button
            className="delete-btn"
            onClick={() => deletePerson(person.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
) 
}

export default App