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
            {/*parts.map((part, index) => {
                return (
                    <p key={index}>{part.name} {part.exerciseCount}</p>
                )
            })*/}

            {
                parts.map((part: CoursePart) => {
                    switch (part.type) {
                        case 'normal':
                            return (
                                <Part
                                    key={part.name}
                                    description={part.description}
                                    type={part.type} name={part.name}
                                    exerciseCount={part.exerciseCount} />
                            )
                            break;
                        case 'groupProject':
                            return (
                                <Part
                                    key={part.name}
                                    type={part.type}
                                    name={part.name}
                                    exerciseCount={part.exerciseCount}
                                    groupProjectCount={part.groupProjectCount} />
                            )
                            break
                        case 'submission':
                            return (
                                <Part
                                    key={part.name}
                                    type={part.type}
                                    name={part.name}
                                    exerciseCount={part.exerciseCount}
                                    description={part.description}
                                    exerciseSubmissionLink={part.exerciseSubmissionLink} />
                            )
                            break;
                        case 'special':
                            return (
                                <Part
                                    key={part.name}
                                    type={part.type}
                                    name={part.name}
                                    exerciseCount={part.exerciseCount}
                                    description={part.description}
                                    requirements={part.requirements} />
                            )
                            break;
                        default:
                            break
                    }
                })
            }

        </>
    )
}

export default Content


