import React, { Component } from 'react';
import styled from 'styled-components';
import { withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';

import { getAppSettings, updateAppSettings } from '../../actions/adminAction';

import PageTitle from '../../shared/PageTitle/PageTitle';
import PageLoader from '../../shared/PageLoader/PageLoader';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	margin-left: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-top: 100px;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const Wrapper = styled.div`
    width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: -20px;
    position: relative;
`

const SettingsBtn = styled.button`
    width: 220px;
    height: 220px;
    background: none;
    border: 3px solid ${({isOn}) => isOn ? '#8bc34a' : '#f44336'};
    color: ${({isOn}) => isOn ? '#8bc34a' : '#f44336'};
    font-family: ${props => props.theme.mainFont};
    text-transform: uppercase;
    font-weight: bold;
    font-size: 28px;
    margin: 20px;

    &:first-line {
        color: #fff;
    }
`

const SettingsSaveBtn = styled.button`
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    bottom: -60px;
    width: 80px;
    height: 40px;
    background: none;
    border: 2px solid #8bc34a;
    color: #fff;
    text-transform: uppercase;

`

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            settingsState: null
        }
    }

    componentDidMount() {
        this.props.getAppSettings(this.props.firestore);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.appSettings !== this.props.appSettings) {
            this.setState({
                settingsState: this.props.appSettings
            })
        }
    }

    changeSettings = e => {
        this.setState({
            settingsState: {...this.state.settingsState, [e.target.name]: !this.state.settingsState[e.target.name]}
        })
    }

    updateSettings = () => {
        this.props.updateAppSettings(this.props.firestore, this.state.settingsState);
    }

    render() {
        return (
            <Container>
                <PageTitle>Settings</PageTitle>
                <Wrapper>
                    {
                        this.state.settingsState ? (
                            <>
                                <SettingsBtn onClick={this.changeSettings} name="register" isOn={this.state.settingsState.register}>
                                    Register <br /> {this.state.settingsState.register ? 'ON' : 'OFF'}
                                </SettingsBtn>
                                <SettingsBtn onClick={this.changeSettings} name="save" isOn={this.state.settingsState.save}>
                                    Save <br /> {this.state.settingsState.save ? 'ON' : 'OFF'}
                                </SettingsBtn>
                                <SettingsSaveBtn onClick={this.updateSettings}>Save</SettingsSaveBtn>
                            </>
                        ) : (
                            <PageLoader />
                        )
                    }
                </Wrapper>
            </Container>
        )
    };
};

const mapStateToProps = state => {
    return {
        appSettings: state.adminReducer.appSettings
    }
}

export default connect(mapStateToProps, { getAppSettings, updateAppSettings })(withFirestore(Settings));