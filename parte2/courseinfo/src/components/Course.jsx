const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const total = (sum, part) => sum + part.exercises
  const sumExercises = parts.reduce(total, 0)
  return <p><b>Total of {sumExercises} exercises</b></p>
}

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}

  </>

function Course ({ course }) {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
