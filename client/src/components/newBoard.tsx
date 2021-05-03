import React from 'react';
import {Button} from 'react-bootstrap';

const NewBoard = ({newBoard}):JSX.Element => {
    return <Button style={{marginTop: "20px", width: "100%"}} onClick={() => newBoard()}>New Board</Button>
}

export default NewBoard;