import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { incrementCount, decrementCount } from '../Redux/Slices/product'

const PlaceOrder = () => {
    const navigation = useNavigation();
    const product = useSelector(state => state.products);
    const [dineIn, setDinrIn] = useState(true);
    const [takeAway, setTakeAway] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const dispatch = useDispatch();

    const totalCost = () => {
        let products = product.slice();
        let price = 0
        product.forEach(element => {
            price = price + (element.price * element.count);
        });
        return price;
    }

    const toggleDineIn = () => {
        setDinrIn(!dineIn);
        setTakeAway(!takeAway);
    }

    const showMore = () =>{
        setShowAll(!showAll)
    }

    const updateCount = (id, action) =>{
        if(action=='increment'){
          dispatch(incrementCount({id}))
        }
        else{
          dispatch(decrementCount({id}))
        }
    }

    const selectedProduct = () =>{
        let count = 0;
        product.forEach(element => {
            if(element.count>0){
                count += 1
            }
        });
        return count;
    }

    const showProducts = selectedProduct()>2 && showAll ? product : product.slice(0,2);

    const renderItem = ({ item }) => {
        if(item.count<1) return null;
        return (
            <View>
                <View style={styles.flatListItem} key={item.id}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#929292', fontSize: 14, marginBottom: 5 }}>{item.name}</Text>
                        <Text style={{ color: '#929292', fontSize: 12, marginBottom: 5 }}>{item.description}</Text>
                        <Text style={{ color: '#FBC290', fontSize: 16 }}>{'\u20AC'}{item.price}</Text>
                    </View>
                    <View>
                        <View style={styles.plusMinusBtn}>
                            <TouchableOpacity onPress={() => { updateCount(item.id, 'decrement') }}>
                                <IconMaterial name="minus" style={{ fontSize: 18 }} />
                            </TouchableOpacity>

                            <Text style={{ marginHorizontal: 8 }}>{item.count}</Text>
                            <TouchableOpacity onPress={() => { updateCount(item.id, 'increment') }}>
                                <IconMaterial name="plus" style={{ fontSize: 18 }} />
                            </TouchableOpacity>
                        </View>
                        <IconMaterial name="forum" style={{fontSize: 24, alignSelf: "flex-end", marginTop:6}}/>
                    </View>
                </View>
                <View style={{flex:1, borderWidth: 0.5, borderColor:'#DFDFDF', marginBottom: 10}}/>
            </View>
            
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <View style={styles.header}>
                    <IconMaterial name="arrow-left" style={styles.leftIcon} onPress={() => { navigation.goBack() }} />
                    <Text style={styles.myCartText}>My Cart</Text>
                </View>
                <View style={styles.costView}>
                    <View style={styles.cost}>
                        <Text style={{ color: '#FBC290' }}>Total Cost</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{'\u20AC'}{totalCost()}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.view2}>
                <Text style={[styles.review,{marginBottom: 14}]}>Review Orders</Text>
                <View style={{paddingLeft: 10}}>
                    <FlatList
                        data={showProducts}
                        renderItem={renderItem}
                    />
                </View>
                {selectedProduct()>2?<TouchableOpacity onPress={showMore}>
                  <Text style={{ alignSelf: "flex-end", textDecorationLine: 'underline' }}>{showAll?'Show less':'Show more'}</Text>
                </TouchableOpacity>:null}
                <Text style={styles.review}>Delivery Options</Text>
                <View style={{ flexDirection: 'row', paddingLeft: 10, marginVertical: 12 }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: "center" }}>
                        <IconMaterial name="table-chair" style={{ marginRight: 10, fontSize: 24 }} />
                        <Text style={{ marginRight: 10 }}>Dine-in</Text>
                        {
                            dineIn ?
                                <Icon name="dot-circle-o" style={{ fontSize: 24, color: '#FBC290' }} onPress={toggleDineIn} /> :
                                <Icon name="circle-o" style={{ fontSize: 24, color: '#929292' }} onPress={toggleDineIn} />
                        }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <IconMaterial name="truck-fast-outline" style={{ marginRight: 10, fontSize: 24 }} />
                        <Text style={{ marginRight: 10 }}>Take way</Text>
                        {
                            takeAway ?
                                <Icon name="dot-circle-o" style={{ fontSize: 24, color: '#FBC290' }} onPress={toggleDineIn} /> :
                                <Icon name="circle-o" style={{ fontSize: 24, color: '#929292' }} onPress={toggleDineIn} />
                        }
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => { alert("Order is placed") }}>
                <Text style={styles.orderText}>
                    PLACE ORDER
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default PlaceOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view1: {
        flex: 1,
        backgroundColor: '#436264'
    },
    view2: {
        flex: 2,
        paddingHorizontal: 12
    },
    btn: {
        padding: 16,
        backgroundColor: '#436264',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "center"
    },
    orderText: {
        fontWeight: 'bold',
        color: '#fff'
    },
    leftIcon: {
        fontSize: 24,
        color: '#fff',
        marginRight: 30
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 14
    },
    myCartText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff'
    },
    costView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    cost: {
        backgroundColor: '#fff',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    review: {
        fontWeight: 'bold',
        marginTop: 10
    },
    icons: {
        fontSize: 18
    },
    flatListItem: {
        flexDirection: "row",
        marginBottom: 4
    },
    plusMinus:{
        fontSize: 18
    },
    plusMinusBtn:{
      flexDirection: 'row', 
      borderWidth: 0.5, 
      borderRadius: 2, 
      padding: 4, 
      alignItems: 'center', 
      borderColor: '#FBC290'
    },
})