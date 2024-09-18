import express from 'express';
import { calculateBmi } from './bmiCalculator';


const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query

  try {
    if ([height, weight].some(v => v === undefined)) throw new Error('malformatted parameters');
    if ([height, weight].some(v => v === '')) throw new Error('malformatted parameters');
    if ([height, weight].some(v => isNaN(Number(v)))) throw new Error('malformatted parameters');

    const bmi = calculateBmi(Number(height), Number(weight));
    
    res.status(200).json({ 
      weight,
      height,
      bmi
     });

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    
  }

});

const PORT = 3003

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));