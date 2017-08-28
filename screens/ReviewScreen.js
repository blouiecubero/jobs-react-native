import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => {

        let { navigate } = navigation;

        return ({
            title: 'Review Jobs',
            headerRight:  <Button title="Settings" onPress={() => navigate('settings')} backgroundColor="rgba(0,0,0,0)" color="rgba(0,122,255,1)"/>,
            style: {
                marginTop: (Platform.OS === 'android') ? 24: 0 
            },
            tabBarIcon: ({ tintColor }) => {
                    return <Icon name="favorite" size={30} color={tintColor}/>
               
            }
        })
    }

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const initialRegion = {
                longitude: job.longitude,
                latitude: job.latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            }
            return (
                <Card title={job.jobtitle} key={job.jobkey}>
                    <View style={{ height: 200 }}>
                        <MapView
                            style={{ flex: 1 }}
                            cacheEnabled = {Platform.OS === 'android'}
                            scrollEnabled={false}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{job.company}</Text>
                            <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
                        </View>
                        <Button
                            title="Apply Now!"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL (job.url )}
                        />
                    </View>
                </Card>
            );
        })
    }
    

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        )
    }
}

const styles = {
    detailWrapper: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    italics: {
        fontStyle: 'italic'
    }
}

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs }
}

export default connect(mapStateToProps)(ReviewScreen);