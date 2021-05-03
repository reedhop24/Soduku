import React, {useState} from 'react';
import { v4 as uuid_v4 } from "uuid";

const Board = ({boardData, selection}):JSX.Element => {
    const [currSquare, setCurrSquare] = useState('');
    const isCol = (coord) => {
        if(coord.split('')[1] === currSquare.split('')[1]) {
            return true;
        } else {
            return false;
        }
    }

    const isRow = (coord) => {
        if(coord.split('')[0] === currSquare.split('')[0]) {
            return true;
        } else {
            return false;
        }
    }

    const isCurr = (coord) => {
        if(coord === currSquare) {
            return true;
        } else {
            return false;
        }
    }

    const isSquare = (coord) => {
        const position = (num) => {
            if(num <= 2) {
                return 2;
            } else if(num <= 5) {
                return 5;
            } else if(num <= 8) {
                return 8;
            }
        }
        
        if(position(parseInt(coord.split('')[0])) === position(parseInt(currSquare.split('')[0])) && position(parseInt(coord.split('')[1])) === position(parseInt(currSquare.split('')[1]))) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <table className="board-table">
            <tbody id="table-body">
                {boardData.length > 0 ? boardData.map((x, a) => {
                    return <tr className="board-tr" key={uuid_v4()}>{x.map((y, b) => {
                            const coord = a.toString()+b.toString();
                            let background = '';
                            const fontWeigh = typeof(boardData[a][b]) === 'number' ? 'bold' : undefined;
                            let value = y;

                            if(isCurr(coord)) {
                                background = '#a8dbe7';
                            } else if(isRow(coord) || isCol(coord) || isSquare(coord)) {
                                background = '#F0F0F0';
                            } else {
                                background = 'white';
                            }

                            if(typeof(boardData[a][b]) !== 'number' && selection && isCurr(coord)) {
                                boardData[a].splice(b, 1, selection);
                                value = selection;
                            }
                            
                            return <td  className="board-td"
                                        onClick={(ev) => setCurrSquare(ev['target']['id'])} 
                                        id={coord} 
                                        key={coord} 
                                        style={{backgroundColor: background, fontWeight: fontWeigh}}>
                                            {value}
                                        </td>
                        })}
                    </tr>}) : null}
            </tbody>
        </table>
    )
}

export default Board;