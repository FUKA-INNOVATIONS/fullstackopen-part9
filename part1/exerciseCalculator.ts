const lodash = require('lodash')

interface Review {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: String,
    target: number,
    average: number
}

interface Rating {
    value: number,
    description: String
}

const getRate =  ( average: number ): Rating => {
    if ( average <= 1 ) {
        return {
            value: 1,
            description: 'You have done progress, keep on!'
        }
    } else if ( average <= 2  ) {
        return {
            value: 2,
            description: 'Not too bad but could be better!'
        }
    } else {
        return {
            value: 3,
            description: 'Well done, keep on learning!'
        }
    }
}

const exerciseCalculator = ( dailyHours: Array<number>, target: number ): Review => {

    const  trainingDays: number
        = dailyHours.map(dayHour => dayHour > 0 ).length
    const periodLength: number
        = dailyHours.length
    const totalHours: number
        = lodash.sum(dailyHours)
    const average = totalHours / trainingDays
    const rate: Rating = getRate(average)

    return {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter(dayHour => dayHour > 0 ).length,
        success: average >= target,
        rating: rate.value,
        ratingDescription: rate.description,
        target: target,
        average: average
    }
}

console.log(
    exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2 )
)

