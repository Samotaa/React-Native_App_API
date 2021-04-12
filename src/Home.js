import React from 'react';
import {StyleSheet, Button, Text, View, FlatList, Image,  TouchableOpacity,} from 'react-native';
import { set } from 'react-native-reanimated';
import SQLite, { openDatabase } from 'react-native-sqlite-storage'

const API_URL = 'https://api.chucknorris.io/jokes/search?query=dogs'
const COLOR = '#0015b0'
var db;

export default class Home extends React.Component{

    
    static navigationOptions = {
        title: 'Second Lab',
    };
    constructor (props) { 
        super(props)
        this.state = {
        jokesList: [],
        }
       
       db = SQLite.openDatabase(
            {   
            name: 'sqlite',
            createFromLocation: '~sqlite.db',
            location: 'default',
            },
        )
        };
        
        ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
            db.transaction((trans) => {
              trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
              },
                (error) => {
                  reject(error);
                });
            });
          });

        async componentDidMount(){
            this.apiCall()
            let selectQuery = await this.ExecuteQuery('SELECT * FROM pls', [])
            var temp = [];
            for(let i = 0; i < selectQuery.rows.length; ++i){               
                temp.push(selectQuery.rows.item(i));
            }
            console.log(temp.length);
            this.setState({
                jokesList:temp
            });

          
        };

        async apiCall () {
        let resp = await fetch(API_URL)
        let json = await resp.json()
        let cash = [];

        this.setState({
            jokesList: json.result,
            cashList: json.result
        });     
            let deleteQuery = await this.ExecuteQuery('DELETE FROM pls');
            console.log(deleteQuery);         
        cash = json.result;
        let first = cash
        let query = "INSERT INTO pls (created_at, value) VALUES";
            for (let i = 0; i < 6; ++i) {               
                    query = query + "('"
                    + first[i].created_at
                    + "','"
                    + first[i].value 
                    + "')";
              if (i != 6 - 1) {
                query = query + ",";
              }
            }
            query = query + ";";
            console.log(query);
            let multipleInsert = await this.ExecuteQuery(query, []); 
            console.log(multipleInsert);
        };

    
        render(){
            const { navigate } = this.props.navigation;
    
            return(
                <View style={styles.container}>
          
                {<FlatList
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
                />  }
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