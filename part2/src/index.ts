import express from 'express';
const cors = require('cors')    // front end calls need
console.log('cors: ', cors)
const app = express();
app.use(express.json());
app.use(cors())
const PORT = 3001;

import patientsRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";


app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)


app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
