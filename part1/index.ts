import express from 'express';
const app = express();
import calculateBmi from "./bmiCalculator";

app.get('/hello', ( _req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', ( _req, res) => {
    //res.send(`${_req.query.height}`);

    const height = Number(_req.query.height)
    const weight = Number(_req.query.weight)
    if ( !isNaN(height) && !isNaN(weight) ) {
        const object = {
            weight,
            height,
            bmi: calculateBmi(height, weight)
        }
        res.json(object)
    } else {
        res.json({ error: 'malformatted parameters' })
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});