/*
let bmi = (weight / ((height * height)
    / 10000)).toFixed(2);

Class 1: underweight (under 18.5 kg/m2)
Class 2: normal weight (18.5 to 24.9)
Class 3: overweight (25 to 29.9)
Class 4: obese (30 or more)
 */


type BmiResult = String;

const calculateBmi = ( height: number, weight: number ): String => {
    const bmi = Number(( weight / ( ( height * height ) / 10000 ) ).toFixed( 2 ));

    if ( bmi > 0 && bmi < 18.5 ) {
        return '1'
    } else if ( bmi >= 18.5 && bmi < 25 ) {
        return 'Normal (healthy weight)\n'
    } else if ( bmi >= 25 && bmi <= 29.9 ) {
        return '3'
    } else if ( bmi >= 30 ) {
        return '3'
    } else {
        throw new Error( 'Please double-check given values and try again!!' );
    }
}

try {
    console.log( calculateBmi( 180, 74 ) );
} catch ( error: unknown ) {
    let errorMessage = 'Something went wrong.'
    if ( error instanceof Error ) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log( errorMessage );
}