import React, { Fragment } from 'react';

import classes from './Cockpit.module.css';

const cockpit = (props) => {
    return(
        <Fragment>
            <h1>To Do List</h1>
            <form onSubmit={props.submit} className={classes.Form}>
                <input onChange={props.change} 
                    className={classes.Input}
                    placeholder="Enter a to-do..."
                    value={props.value}
                    />
                <button type="submit" onSubmit={props.submit} className={classes.SubmitBtn}>Submit</button>
            </form>
        </Fragment>  
    )
}

export default cockpit;