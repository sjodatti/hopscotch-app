import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridTile} from 'material-ui/GridList';

import './index.css';

class ProductTile extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        return(
            <GridTile className={`product-tile-container ${(this.props.quantity>0)?'':'sold-out-tile'}`} title={this.props.name}  subtitle={this.props.retailPrice}>
                <img src={this.props.imgUrl}/>
                {!(this.props.quantity>0) && 
                <div className='sold-out'>Sold Out</div>
                }
            </GridTile>
        )
    }


}

export default ProductTile;