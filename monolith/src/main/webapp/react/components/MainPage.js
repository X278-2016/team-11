import { connect } from 'react-redux'
import { fetchCommitData } from '../actions'
import Sample from './sample'

var MainPage = React.createClass({
    componentDidMount: function(){
        this.props.fetchCommitData();
    },
    render: function() {
        return(<div>
            <Sample name="My" commitData={this.props.commit}/>
            </div>);
    }
});

const mapStateToProps = (state) => {
    //updateCompany
    return {
        commit: state.getCommits.myData
    };
};

//in this method, call the action method
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCommitData:() => {
            dispatch(fetchCommitData());
        },
        fetchSamCommits: () => {
        	dispatch(fetchSamCommits());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)