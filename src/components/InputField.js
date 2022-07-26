import React, { useState } from 'react';

function InputField(props) {
    const [showPassword, setShowPassword] = useState('');

    return <div style={{ display: "flex"}}>
        <input 
        type={showPassword}
        value={props.value} 
        onChange={(val) => props.onChange(val.target.value)}
        placeholder={props.placeholder} 
        >
    </input>
        <button 
            onClick={() => setShowPassword(showPassword === 'text' ? 'password' : 'text')}
            style={{ margin: '1rem', padding: '.5rem', width: '4rem'}}
        >
        {showPassword === 'text' ? 'Hide' : 'Show'}
    </button>

    </div>
}

export default InputField;
