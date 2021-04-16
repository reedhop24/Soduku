import React, {useState} from 'react';
import './App.css';
import Difficulty from './components/difficulty';
import axios from 'axios';

function App():JSX.Element {

  const [difficulty, setDifficulty] = useState<string>('easy');
  const [board, setBoard] = useState<Array<Array<number>>>([]);

  const getBoard = async () => {
    const newBoard = await axios.get(`http://localhost:500/newBoard?difficulty=${difficulty}`);
    if(!newBoard) {
      getBoard();
    } else {
      setBoard(newBoard.data);
    }
  }

  return (
    <>
      <h1>Soduku</h1>
      <Difficulty changeDifficulty={setDifficulty} newBoard={getBoard}/>
    </>
  );
}

export default App;
