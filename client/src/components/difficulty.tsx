import React from 'react';

const Difficulty = ({changeDifficulty, newBoard}):JSX.Element => {
    return (
        <>
            <select onChange={(ev) => changeDifficulty(ev.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button onClick={() => newBoard()}>New Board</button>
        </>
    )
}

export default Difficulty;