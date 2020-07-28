import React from 'react'

const Test = (props) => {
    console.log(props.status)
    return (
        <div>
           TEST PROPS {props.status}
        </div>
    )
}

export default Test
