import React from 'react';
import {Button} from 'react-bootstrap';

const Progress = ({validateBoard}):JSX.Element => {
    return (
        <Button onClick={() => validateBoard()}>How am I doing?</Button>
    )
}

export default Progress