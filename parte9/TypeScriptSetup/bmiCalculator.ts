interface NumberValues {
  value1: number,
  value2: number
}

export const parseArguments = (args: string[]): NumberValues => {
  if(args.length < 4) throw new Error('Not enough arguments');
  if(args.length > 4) throw new Error('Too many arguments');

  if( !isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers')
  }
  
}

export const calculateBmi = (height: number, weight: number): string => {
  let heightMeters = height / 100
  let imc = Number((weight / Math.pow(heightMeters, 2)).toFixed(2))
  if (imc < 18.5) {
    return 'Low weight' 
  } 
  else if (imc >= 18.5 && imc <= 24.9) {
    return 'Normal (health weight)'
  }
  else if (imc >= 25.5 && imc <= 29.9) {
    return 'Over weight'
  }
  else return 'Obese' 
}


try {
  const { value1, value2 } = parseArguments(process.argv)
  console.log(calculateBmi(value1, value2));
  
} catch (error: unknown) {
  let errorMessage = 'Something bad happened'
  if(error instanceof Error) errorMessage += ' Error: ' + error.message
  console.log(errorMessage);
}
