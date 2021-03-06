import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import {mirrorStatus, acceptUrl, logout} from '../../actions/find-mirror-action'
import {getUsers} from '../../actions/user-actions'
import {getMirrorStatus, getUrl} from '../../selectors' 
import {UrlFormView} from './url-form-view'

class HeaderView extends Component {
    constructor(props) {
        super(props);
        this.state = {url: ''}

        this.handleSubmitUrl = this.handleSubmitUrl.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleSubmitUrl(event) {
        //alert(this.state.url)
        if (this.props.isMirrorUp)
            this.props.acceptUrl(this.state.url)
            event.preventDefault();
    }

    handleUrlChange(event) {
        this.setState({url: event.target.value})
        this.props.mirrorStatus(event.target.value)
    }

    handleLogout(event) {
        this.setState({url: ''})
        this.props.logout()
    }

    render () {
        const url = this.props.url
        let form;
        if(url.length === 0) {
            form = <UrlFormView 
                    url={this.state.url} 
                    isMirrorUp={this.props.isMirrorUp}
                    handleSubmitUrl={this.handleSubmitUrl}
                    handleUrlChange={this.handleUrlChange}/>   
        } else {
            form =  <div>
                        <button className="button rightFloat" onClick={e => this.handleLogout(e)}>Logout</button>
                        <button className="button rightFloat" onClick={e => this.props.getUsers(this.state.url)}>Refresh</button>
                    </div>
        }
            return (
                <div className="header">
                    <h1>Smart Mirror Web App</h1>
                    {form}
                </div>
            )
    }

    /*render() {
        const url = this.props.url
        if (url.length === 0) {
            return (
                <React.Fragment>
                    <div className="headerLabel">
                         SmartMirror Web App
                    </div>
                    <div className="headerUrlForm">
                        <UrlFormView 
                            url={this.state.url} 
                            handleSubmitUrl={this.handleSubmitUrl}
                            handleUrlChange={this.handleUrlChange}
                        />
                    </div>
                        <div className="headerSubmitButton">   
                        {this.props.isMirrorUp === true &&
                            <UrlAcceptButton
                                handleSubmitUrl={this.handleSubmitUrl}
                            />
                        }
                    </div>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
            <div className="headerLabel">
            SmartMirror Web App
            </div>
            <div className="headerRefreshButton">
                <button onClick={e => this.props.getUsers(this.state.url)}>Refresh</button>
            </div>
            <div className="headerAddUser">
                <button onClick={e => {}}>Add user</button>
            </div>
            <div className="headerLogoutButton"> 
                <button onClick={e => this.handleLogout(e)}>Logout</button>
            </div>
            </React.Fragment>
        );
    }*/
}


function mapStateToProps(state) {
    return {
        isMirrorUp: getMirrorStatus(state),
        url: getUrl(state)
    };
}

function dispatchInput(dispatch) {
    return bindActionCreators({
        mirrorStatus: mirrorStatus,
        acceptUrl: acceptUrl,
        logout: logout,
        getUsers
    }, dispatch);
}

export default connect(mapStateToProps, dispatchInput)(HeaderView);
