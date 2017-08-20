import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

    renderSlides() {
        return this.props.data.map((slide, idx) => {
            return (
                <View key={slide.text} style={[styles.slide, { backgroundColor: slide.color}]}>
                    <Text style={styles.slideText}>{slide.text}</Text>

                    {this.renderLastSlide(idx)}
                </View>
            )
        });
    }

    renderLastSlide(idx) {
        if (idx === this.props.data.length - 1) {
            return (
                <Button
                    buttonStyle={styles.buttonStyle}
                    title="Onwards!"
                    raised
                    onPress={this.props.onComplete}
                />
            )
        }
    }

    render() {
        return (
            <ScrollView horizontal style={{flex:1}} pagingEnabled>
                {this.renderSlides() }
            </ScrollView>
        );
    }
}

const styles = {
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    slideText : {
        fontSize: 23,
        color: 'white',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        marginTop: 15
    }
}

export default Slides;