import { useState } from 'react';
import './Button.css';
function Button(props){

    const {onChange} = props;
    const name = "Change"; 
    return(
        <input type="button" id="btnChange" value={name} onClick={onChange}/>
    )
}

export default Button;