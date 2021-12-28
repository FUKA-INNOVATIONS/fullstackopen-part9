const hours = JSON.parse( ( process.argv[ 2 ] ) )

//process.argv.map( a => console.log( typeof a ) )


function loopHoursTest( hours: Array<string> ): Array<number> {
    // Create hoursList from input
    const hoursList: Array<number> = hours.filter((hour, index) => index > 2).map(hour => Number(hour))
    return hoursList
}
loopHoursTest(
    [
        '/Users/koulu/.npm-packages/bin/ts-node',
        '/Users/koulu/Desktop/hel-uni/fullstackopen-part9/part1/playground.ts',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6'
    ]

)

//console.log( process.argv )