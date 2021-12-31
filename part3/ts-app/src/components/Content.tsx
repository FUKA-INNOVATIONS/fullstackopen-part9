import React from "react";
import { CoursePart } from "../types";

import Part from "./Part";


interface part {
    name: string,
    exerciseCount: number
}

interface ContentProps {
    parts: CoursePart[]
}


/**
 * Helper function for exhaustive type checking
 */
const assertNever = ( value: never ): never => {
    throw new Error(
        `Unhandled discriminated union member: ${ JSON.stringify( value ) }`
    );
};


const Content = ( { parts }: ContentProps ): JSX.Element => {
    return (
        <>

            { parts.map((part: CoursePart) => {
                    switch (part.type) {
                        case 'normal':
                            return <Part key={part.name} {...part} />
                        case 'groupProject':
                            return <Part key={part.name} {...part} />
                        case 'submission':
                            return <Part key={part.name} {...part} />
                        case 'special':
                            return <Part key={part.name} {...part} />
                        default:
                            return assertNever(part)
                    }
                })
            }

        </>
    )
}

export default Content


