interface NumberValues {
  time: number[],
  target: number
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number
  average: number
}

export const parseArguments = (args: string[]): NumberValues => {
  if(args.length < 4) throw new Error('Not enough arguments');

  const time: number[] = []

  for (let i = 3; i < args.length; i++) {
    time.push(Number(args[i]))
  }
  return {
    time,
    target: Number(args[2])
  }
  
}

const calculateExercises = (hoursOfExercise: number[], target: number): Result => {

  const periodLength = hoursOfExercise.length
  const trainingDays = hoursOfExercise.filter(h => h !== 0).length
  const average = hoursOfExercise.reduce((a, b) => a + b, 0) / hoursOfExercise.length
  const success = average >= target
  
  const ratingNumber = (average: number, target: number): number => {
    const rates = average / target
    if (rates < target) return 1
    if (rates === 2) return 2
    return 3 
  }

  const makeDescription = (rating: number): string => {
    switch(rating) {
      case 1: return 'U need to do more'
      case 2: return 'Not too bad but could be better'
      case 3: return 'Excellent keep it up'
    }
  }

  const rating = ratingNumber(average, target)
  const ratingDescription = makeDescription(rating)

  return {
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    ratingDescription,
    target
  }
}


try {
  const { time, target } = parseArguments(process.argv)
  console.log(calculateExercises(time, target));
  
} catch (error: unknown) {
  let errorMessage = 'Something bad happened'
  if(error instanceof Error) errorMessage += ' Error: ' + error.message
  console.log(errorMessage);
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
