const Anecdote = ({ anecdote }) => {
  const { content, author, info, votes, } = anecdote
  return (
  <>
    <h2>{content}</h2>
    <ul>
      <li>Autor: {author}</li>
      <li>Info: {info}</li>
      <li>Votes: {votes}</li>
    </ul>
  </>
  )
}

export default Anecdote