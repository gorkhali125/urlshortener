import React from 'react';

const Input = (props) => {
    const { inputType, handleChange, ...otherProps } = props
    return (
        <div className="form-group">
            <label htmlFor={otherProps.name} className="form-label">{otherProps.title}</label>
            <input
                className="form-control"
                id={otherProps.name}
                name={otherProps.name}
                type={inputType}
                value={otherProps.value}
                onChange={handleChange}
                placeholder={otherProps.placeholder}
                autoComplete={otherProps.autoComplete}
                {...otherProps} />
        </div>
    )
}

export default Input;