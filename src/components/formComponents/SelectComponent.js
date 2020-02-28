import React from 'react';


export default (props) => {
    console.log(props);
    return (
        <div className="form-group" >
            <label className="control-label">{props.label}
                <span className="text-danger"> *
                    </span>
            </label>
            <select className="form-control"
                tabIndex="-98" required name={props.name}
                onChange={props.handleChange}
               >
                {props.options}
            </select>
            <span className="material-input"></span>
        </div >
    );
}