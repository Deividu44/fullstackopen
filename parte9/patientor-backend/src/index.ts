import express  from "express";
import cors from "cors";
import routerDiagnose from "./routes/diagnoses";
import routerPatient from "./routes/patients";
 
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('PONG');
  
  res.send('Vaya toma PONG!!')
})

app.use('/api/diagnoses', routerDiagnose)

app.use('/api/patients', routerPatient)

const PORT = 3000
app.listen(
  PORT,
  () => console.log(`Server is running on port: ${PORT}`)
);
