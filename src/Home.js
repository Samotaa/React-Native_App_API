import React from 'react';
import {StyleSheet, Button, Text, View, FlatList, Image} from 'react-native';

const API_URL = 'https://api.chucknorris.io/jokes/search?query=dogs'
const COLOR = '#0015b0'

export default class Home extends React.Component{

    static navigationOptions = {
        title: 'Second Lab',
    };
    constructor (props) {
        super(props)
        this.state = {
        jokesList: []
        }
        }
        
        componentDidMount () {
        this.apiCall()
        }
        
        async apiCall () {
        let resp = await fetch(API_URL)
        let json = await resp.json()
        this.setState({jokesList: json.result})
        }

    render(){
        const { navigate } = this.props.navigation;

        return(
        <View style={styles.container}>


            <FlatList
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
                data={this.state.jokesList}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                <View style={styles.item}>
                    <View style={{width: '15%'}}>
                        <Image style={styles.tinyIcon}
                        source={{uri: item.icon_url}}
                        />
                    </View>
                    <View style={{width: '85%'}}>
                        <Text style={{fontWeight: 'bold'}}>{item.created_at}</Text>
                        <Text style={{fontSize: 17}}>{item.value}</Text>
                    </View>
                    <Button style={styles.button}
                        onPress={() => this.props.navigation.navigate('Profile', {
                        name: item.created_at,
                        title: item.id,
                        text: item.value})}
                        title="Read"
                        color="blue"
                        accessibilityLabel="Details"
                    />
                </View>
                )}
            />
        </View>
        )
            
    }
}


const styles = StyleSheet.create({
    statusBar: {
    backgroundColor: COLOR
    },
    headerText: {
    color: '#FFF'
    },
    container: {
    backgroundColor: '#fff',
    },
    separator: {
    height: 2,
    backgroundColor: '#CED0CE'
    },
    item: {
    padding: 5,
    },
    tinyIcon: {
    width: 60,
    height: 60,
    },
    button: {
    marginTop: 14,
    },
    })