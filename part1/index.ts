import express from 'express';

const app = express();
app.use( express.json() )
import calculateBmi from "./bmiCalculator";
import exerciseCalculator from './exerciseCalculator'

app.post( '/exercise', ( req, res ) => {
    const daily_exercises = req.body.daily_exercises
    const target = Number( req.body.target )

    if ( !isNaN( target ) && Array.isArray( daily_exercises ) ) {
        try {
            const result = exerciseCalculator( daily_exercises, target )
            res.json( result )
        } catch ( err ) {
            res.status(400).json( { error: 'malformatted parameters' } )
        }
    } else {
        res.status(400).json( { error: 'malformatted parameters' } )
    }
} )

app.get( '/hello', ( _req, res ) => {
    res.send( 'Hello Full Stack!' )
} );


app.get( '/bmi', ( req, res ) => {
    const height = Number( req.query.height )
    const weight = Number( req.query.weight )

    if ( !isNaN( height ) && !isNaN( weight ) ) {
        const object = {
            weight,
            height,
            bmi: calculateBmi( height, weight )
        }
        res.json( object )
    } else {
        res.status(400).json( { error: 'malformatted parameters' } )
    }
} );

const PORT = 3003;

app.listen( PORT, () => {
    console.log( `Server running on port ${ PORT }` );
} );