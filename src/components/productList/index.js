import React, { Component } from 'react';
import './index.css';
import ProductTile from '../../components/productTile/';
import SortBlock from '../../components/sortBlock/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList } from 'material-ui/GridList';
import { VIEWPORT_TYPE, watchForBreakpoint, breakpointsMax as Breakpoints } from '../../breakpoints';
import { colors } from 'material-ui';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSVP: true,
            isLVP: false,
            isMVP: false,
            data: [],
            requestSent: false,
            loading:true,
            sortbyFlag: false,
            sortedRecords :this.props.records
        }
    }

    componentDidMount() {
        this.state.sortedRecords.sort((a,b)=>{
            return parseInt(a.retailPrice) - parseInt(b.retailPrice);
        });
        window.addEventListener('scroll', this.handleOnScroll);
        this.getInitialData();

        const mqlMVP = watchForBreakpoint(VIEWPORT_TYPE.TABLET_L, true);
        const mqlLVP = watchForBreakpoint(VIEWPORT_TYPE.DESKTOP);
        const mqlSVP = watchForBreakpoint(VIEWPORT_TYPE.MOBILE, true);

        this.checkMVP(mqlMVP);
        this.checkLVP(mqlLVP);
        this.checkSVP(mqlSVP);

        mqlMVP.addListener(mql => {

            this.checkMVP(mql);
        });
        mqlLVP.addListener(mql => {

            this.checkLVP(mql);
        });
        mqlSVP.addListener(mql => {

            this.checkSVP(mql);
        });


    }
    componentWillUnmount() {

        window.removeEventListener('scroll', this.handleOnScroll);

    }

    handleOnScroll = () => {
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight || window.innerHeight;
        let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            this.queryResult();
        }
    }

    queryResult = () => {
        if (this.state.requestSent) {
            return;
        }

        // enumerate a slow query
        setTimeout(this.doQuery, 2000);

        this.state.loading && this.setState({ requestSent: true });
    }

    doQuery = () => {

        let data = this.getData(this.state.data.length, 20);
        //if(this.state.loading){
        let newData = this.state.data.concat(data);
        this.setState({ data: newData, requestSent: false });
        //}
    }

    getInitialData = () => {
        let data = this.getData(this.state.data.length, 20);

        this.setState({ data: data });
    }

    getData = (startKey, counter) => {
        let data = [];
            for (let i = startKey; i < startKey + counter; i++) {
                if(this.state.sortedRecords[i]){
                    data.push(<ProductTile {...this.state.sortedRecords[i]} />);
                }else{
                    this.setState({loading:false,
                        requestSent:false
                    });
                }    
            }
        return data;
    }

    checkSVP = (mql) => {

        if (mql.matches) {

            this.setState({
                isSVP: true
            });
            this.forceUpdate();
        }
        else {

            this.setState({
                isSVP: false
            });
        }
    }

    checkMVP = (mql) => {

        if (mql.matches) {

            this.setState({
                isMVP: true
            });
            this.forceUpdate();
        }
        else {

            this.setState({
                isMVP: false
            });
        }
    }

    checkLVP = (mql) => {

        if (mql.matches) {

            this.setState({
                isLVP: true
            });
            this.forceUpdate();
        }
        else {

            this.setState({
                isLVP: false
            });
        }
    }

    sortbyClickHandler = (e) => {
        e.preventDefault();
        if(this.state.sortbyFlag){
            this.state.sortedRecords.sort((a,b)=>{
                return parseInt(a.retailPrice) - parseInt(b.retailPrice);
            });
        }else{
            this.state.sortedRecords.sort((a,b)=>{
                return parseInt(b.retailPrice) - parseInt(a.retailPrice);
            });
        }

        this.setState({sortbyFlag:!this.state.sortbyFlag,
            data:[]
        },()=>{
            this.getInitialData();
        });
    }

    render() {
        
        const columns = this.state.isSVP ? 1 : this.state.isMVP ? 2 : 3;
        const sortProps = {
            clickHandler: this.sortbyClickHandler,
            sortbyFlag : this.state.sortbyFlag
        }
        return (
            
            <MuiThemeProvider>
                <SortBlock {...sortProps} />
                <div className='product-list-container'>
                    <GridList cellHeight='auto' cols={columns} padding={10}>
                        {this.state.data}
                    </GridList>
                </div>
                {this.state.requestSent &&
                    <div className="data-loading">
                    </div>
                }
            </MuiThemeProvider>
        )
    }


}

export default ProductList;