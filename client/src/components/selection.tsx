import React from 'react';

const Selection = ({setSelection}):JSX.Element => {
    return (<table className="selection-table">
                <tbody onClick={(ev) => setSelection(ev['target']['innerHTML'])}>
                        <tr>
                            <td className="selection-td">1</td>
                            <td className="selection-td">2</td>
                            <td className="selection-td">3</td>
                        </tr>
                        <tr>
                            <td className="selection-td">4</td>
                            <td className="selection-td">5</td>
                            <td className="selection-td">6</td>
                        </tr>
                        <tr>
                            <td className="selection-td">7</td>
                            <td className="selection-td">8</td>
                            <td className="selection-td">9</td>
                        </tr>
                </tbody>
            </table>)
}

export default Selection