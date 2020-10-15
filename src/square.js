import React from "react"

class Square extends React.Component{

    render(){

        let value = this.props.value
        return (
            <div className="square">
                {value}
            </div>
        )
    }
}

export default Square