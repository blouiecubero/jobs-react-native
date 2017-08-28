import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SettingsScreen extends Component {

    logout = () => {
        let { logout, navigation } = this.props;

        if (logout) {
            navigation.navigate('welcome');
            logout();
        }
    }

    render() {
        
        return (
            <View>
                <Button onPress={ this.props.clearLikedJobs } title="Reset Liked Jobs"
                    large icon={{ name: 'delete-forever'}} backgroundColor="#F44336" />
                <Button onPress={this.logout} title="Logout"/>
            </View>
        )
    }
}


export default connect(null, actions)(SettingsScreen);