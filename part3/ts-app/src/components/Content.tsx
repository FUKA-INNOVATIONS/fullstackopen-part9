import React from "react";

interface part {
    name: string,
    exerciseCount: number
}

interface ContentProps {
    parts: part[]
}

const Content = ({ parts }: ContentProps) => {
    return (
            <>
                {parts.map((part, index) => {
                return <p key={index}>{part.name} {part.exerciseCount}</p>
            })}
            </>
    )
}

export default Content