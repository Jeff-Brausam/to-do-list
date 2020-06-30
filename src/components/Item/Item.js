import React, { Component } from 'react';
import classes from './Item.module.css';

class item extends Component {
    render() {  
            let userItem;

            if (this.props.editstate){
                userItem = <form onSubmit={() => this.props.edittoggle(this.props.itemid)} className={classes.EditForm}>
                                <input 
                                    type="text" 
                                    onChange={(e) => this.props.change(e, this.props.itemid)}
                                    className={classes.EditInput}
                                    value={this.props.text}
                                    />
                            </form>
                   
            } else {
                userItem = 
                    <p className={this.props.itemcomplete ? classes.Completed : null }>
                        {this.props.text}
                    </p>
            }
        
            return (
            <li className={classes.Item}>
                    <button className={this.props.itemcomplete ? classes.CompleteBtnActive : classes.CompleteBtn} 
                       onClick={() => this.props.complete(this.props.itemid)}>&#10003;</button>
                <span className={classes.ItemTextContainer}>
                    {userItem}
                </span>
                <span className={classes.BtnRightContainer}>
                    
                    <button className={this.props.editstate ? classes.EditActive : classes.EditBtn} 
                       onClick={() => this.props.edittoggle(this.props.itemid)}>&#x270E;</button>
                    <button className={classes.RemoveBtn} 
                       onClick={() => this.props.delete(this.props.itemid)}>X</button>
                </span>
            </li>      
        );
    }
}

export default item;