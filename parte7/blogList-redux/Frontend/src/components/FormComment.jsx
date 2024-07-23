import { useField } from '../hooks'

function FormComment ({ handleComment }) {
  const contentField = useField('text')

  const submitComment = e => {
    e.preventDefault()
    handleComment(contentField.value)
  }

  return (
    <form onSubmit={submitComment}>
      <input {...contentField} />
      <button type='submit'>Add comment</button>
    </form>

  )
}

export default FormComment
