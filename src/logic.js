import React from "react"
import Square from "./square"
import "./index.css"

class Logic extends React.Component{

    constructor(props){

        super(props)

        this.state = {
            numbersArray: this.props.numbersArray,
            graphArray: []
        }
    }

    main(){
        
        // initialise graph array
        this.state.graphArray.splice(0, this.state.graphArray.length) // start with empty list
        this.state.graphArray.push(this.state.numbersArray) // add initial array to list

        let currentArray = this.state.graphArray[this.state.graphArray.length-1]       

        // split until maximum of 2 in each subsection
        while (this.continueSplit(currentArray)){   
                     
            currentArray =  this.splitArray()
            this.addToGraphArray(this.splitArray())
        }

        // swap pairs if required        
        this.addToGraphArray(this.swapPair())
        
        // merge arrays together
        while (this.getCurrentArray().length > 1){
            this.addToGraphArray(this.mergeSort())
        }

    }

    splitArray(){

        let currentArray = this.getCurrentArray()
        let newArray = []        

        currentArray.map(section => {
                let left = section.slice(0, section.length/2)
                let right = section.slice(section.length/2, section.length)

                newArray.push(left)
                newArray.push(right)
        })

        return newArray
    }

    swapPair(){

        let currentArray = this.getCurrentArray()

        currentArray.map((pair, i) => {

            if (pair.length !== 2)
                return

            if (pair[0] > pair[1]){
                // swap
                let temp = pair[0]
                pair[0] = pair[1]
                pair[1] = temp
            }
        })

        return currentArray
    }

    mergeSort(){

        let currentArray = this.getCurrentArray()
        let returnedArray = []       

        for (let i=0;i< Math.floor(currentArray.length/2);i++){

            let array1 = currentArray[i * 2]
            let array2 = currentArray[i * 2 + 1]
            let newArray = []

            let index1 = 0
            let index2 = 0

            // merge until one array is completed
            while (index1 < array1.length && index2 < array2.length){

                if (array1[index1] < array2[index2]){

                    newArray.push(array1[index1])
                    index1++
                }else{
                    newArray.push(array2[index2])
                    index2++
                }
            }

            // add remaining values
            if (index1 >= array1.length){
                
                for (let i=index2;i<array2.length;i++){
                    newArray.push(array2[i])
                }
            }

            if (index2 >= array2.length){
                
                for (let i=index1;i<array1.length;i++){
                    newArray.push(array1[i])
                }
            }

            returnedArray.push(newArray)
        }

        if (currentArray.length % 2 === 1){
            returnedArray.push(currentArray[currentArray.length-1])
        }

        return returnedArray
    }    

    getCurrentArray(){
        let array = JSON.parse(JSON.stringify(this.state.graphArray[this.state.graphArray.length-1]))
        return array
    }

    addToGraphArray(array){
        this.state.graphArray.push(JSON.parse(JSON.stringify(array)))
    }

    // determines if any sections are still greater than 2
    continueSplit(){

        let currentArray = this.getCurrentArray()
        let continueSplit = false

        for (let i=0;i<currentArray.length;i++){
            if (currentArray[i].length > 2){
                continueSplit = true
            }
        }

        return continueSplit
    }

    static getDerivedStateFromProps(nextProps, prevState){

        if (nextProps !== prevState){
            return{
                numbersArray: nextProps.numbersArray
            }
        }
    }

    renderSquares(){

        let array = this.state.graphArray

        return array.map(row =>{
            return(
                <div id="row">{
                    row.map((section, rowIndex) =>{
                        return section.map((square, squareIndex) =>{
                            return(
                                <div>                           
                                    <Square value={square}/>
                                    {squareIndex === section.length-1 ? <div id="space" /> : ""}
                                    
                                    {/* new line*/}
                                    {squareIndex === section.length-1 &&
                                    rowIndex === row.length-1 ?
                                    <div id="newLine" /> : ""}
                                </div>
                            )                               
                        })             
                    })
                }
            </div>)
        })
    }

    render(){
        
        this.main()

        return(
            
            <div>
                {this.renderSquares()}
            </div>
        )
    }
}

export default Logic