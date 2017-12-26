import React, { Component } from 'react';
import './index.css';

class SortBlock extends Component {
    constructor(props){
        super(props);

    }

    render() {
        const sortbyLabel = this.props.sortbyFlag ? 'Low to High' : 'High to Low';
        return(
            <div>
                <span>Sort By: </span>    
                <a href='#' onClick={this.props.clickHandler}>{sortbyLabel}</a>
            </div>
        );
    }

}

export default SortBlock;