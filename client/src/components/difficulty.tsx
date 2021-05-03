import React from 'react';

const Difficulty = ({changeDifficulty}):JSX.Element => {
    return (
        <>
            <label>Select Difficutly:</label>
            <select onChange={(ev) => changeDifficulty(ev.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </>
    )
}

export default Difficulty;