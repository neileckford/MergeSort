import React from "react"
import Logic from "./logic"

import "./index.css"

class App extends React.Component{

    constructor(){
        super()

        this.state = {
            startingArray: [21, 5, 8, 79, 54, 11, 88, 1],
            numbersArray: []
        }
    }

    renderInputForm(){

        return(
            <div id="inputNumbers"> 

                <h2>Enter your own numbers</h2>   
                <table>
                    <tbody>
                        <tr>
                            {this.state.startingArray.map((number, index) =>
                                <td><input type="text" value={number} id={index} onChange={(e) => this.handleChange(e, index)}></input></td>
                            )}
                        </tr>
                    </tbody>
                </table>

                <input type="button" id="sortButton" value="Merge Sort" onClick={this.handleClick.bind(this)} />
            </div>
        )
    }

    handleClick(){

        this.setState(prevState =>{

            let startingArray = prevState.startingArray
            let numbersArray = [startingArray.map(x => x)]
            
            return{
                numbersArray: numbersArray
            }
        })
        
    }

    handleChange(e, index){

        let newNumber = e.target.value

        this.setState(prevState =>{

            let array = prevState.startingArray           
            array[index] = Number(newNumber)

            return{
                startingArray: array,
            }
        })
    }

    render(){

        return(
            
            <div>
                {this.renderInputForm()}

                <Logic numbersArray={this.state.numbersArray} />
            </div>
            
        )
    }
}

export default App