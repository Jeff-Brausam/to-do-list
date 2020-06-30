import React from 'react';
import Item from '../Item/Item';
import classes from './List.module.css';

const list = (props) => {
    return (props.items.map((item) => {
        return (
            <Item className={classes}
                key={item.id}
                itemid={item.id}
                itemcomplete={item.complete}
                editstate={item.editing}
                text={item.text}
                value={props.value}
                change={props.change}
                edittoggle={() => props.edittoggle(item.id)}
                delete={() => props.delete(item.id)}
                complete={() => props.complete(item.id)}
                />
            )})
    )
}

export default list;
