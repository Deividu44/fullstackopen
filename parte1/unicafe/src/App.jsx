import { useState } from 'react'

function Statistics ({ good, neutral, bad }) {
  const all = good + neutral + bad
  if (all !== 0) {
    return (
      <>
        <h2>Statistics</h2>
        <table style={{ border: '1px solid black', background: 'aliceblue' }}>
          <tbody>
            <StatisticsLine text='Good' value={good} />
            <StatisticsLine text='Neutral' value={neutral} />
            <StatisticsLine text='Bad' value={bad} />
            <StatisticsLine text='All' value={all} />
            <StatisticsLine text='Average' value={(good * 1 + bad * -1) / all} />
            <StatisticsLine text='Positive' value={(good * 100) / all} />
          </tbody>
        </table>
      </>
    )
  }

  return (
    <>
      <h1>No feedback given</h1>
    </>
  )
}

function StatisticsLine ({ text, value }) {
  if (text === 'Positive') {
    return (
      <tr>
        <td>{text}: {value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}: {value}</td>
    </tr>
  )
}

function Button ({ handleButton, value }) {
  return (
    <button onClick={handleButton}>{value}</button>
  )
}

function App () {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleButton={handleGood} value='Good' />
      <Button handleButton={handleNeutral} value='Neutral' />
      <Button handleButton={handleBad} value='Bad' />
      <hr />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
