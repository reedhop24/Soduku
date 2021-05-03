import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './App.css';
import Difficulty from './components/difficulty';
import axios from 'axios';
import Board from './components/board';
import NewBoard from './components/newBoard';
import Selection from './components/selection';
import Progress from './components/progress';
import Message from './components/message';

function App():JSX.Element {

  const [difficulty, setDifficulty] = useState<string>('easy');
  const [board, setBoard] = useState<Array<Array<number>>>([]);
  const [selection, setSelection] = useState<string>('');
  const [progress, setProgress] = useState<string>('All Clear! Keep up the good work!');
  const [display, setDisplay] = useState<string>('none');

  const getBoard = async () => {
    const newBoard = await axios.get(`http://localhost:5000/newBoard?difficulty=${difficulty}`);
    if(!newBoard) {
      getBoard();
    } else {
      setBoard(newBoard.data);
    }
  }

  const validateBoard = async () => {
    const validate = await axios.post('http://localhost:5000/validate', { board: board});

    if(validate.data.valid && validate.data.complete) {
      setProgress('Nice job! Play Again?');
      setDisplay('block');
    } else if(validate.data.valid && !validate.data.complete) {
      setProgress('All Clear! Keep up the good work!');
      setDisplay('block');
    } else {
      setProgress('Oops! Re-Check your board!');
      setDisplay('block');
    }
  }

  useEffect(() => {
    getBoard();
  }, []);

  useEffect(() => {
    setSelection('');
  });

  return (
    <Container>
      <Row style={{textAlign: "center", marginTop: "40px", marginBottom: "40px"}}>
        <Col>
          <h1>Soduku</h1>
        </Col>
      </Row>
      <Row style={{textAlign: "center", marginTop: "20px"}}>
        <Col/>
        <Col xs={5} style={{textAlign: "center"}}>
          <Board boardData={board} selection={selection}/>
        </Col>
        <Col xs={4}>
          <Container className="form justify-content-md-center">
            <Row>
              <Col>
                <Difficulty changeDifficulty={setDifficulty}/>
              </Col>
            </Row>
            <Row>
              <Col xs={2}/>
              <Col>
                <NewBoard newBoard={getBoard}/>
              </Col>
              <Col xs={2}/>
            </Row>
            <Row>
              <Col xs={2}/>
              <Col style={{textAlign: "center"}}>
                <Selection setSelection={setSelection}/>
              </Col>
              <Col xs={2}/>
            </Row>
          </Container>
          <Container className="form justify-content-md-center" style={{marginTop: "20px"}}>
            <Row>
              <Col>
                <Progress validateBoard={validateBoard}/>
              </Col>
            </Row>
            <Row style={{display: display, marginTop: "20px"}}>
              <Col>
                <Message message={progress}/>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col/>
      </Row>
    </Container>
  );
}

export default App;
