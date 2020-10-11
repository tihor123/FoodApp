import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

import { incrementCount, decrementCount } from '../Redux/Slices/product'


const imageUri =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';

const SelectFood = () => {
  console.log("hello world")
    const navigation = useNavigation();
    //const [itemCount, setItemCount] = useState(0);
    const foodlist = useSelector(state => state.products);
    const dispatch = useDispatch();

    const updateCount = (id, action) =>{
      if(action=='increment'){
        dispatch(incrementCount({id}))
      }
      else{
        dispatch(decrementCount({id}))
      }
    }

    const countItems = () =>{
      let count = 0;
      foodlist.forEach(element => {
        count += element.count;
      });
      return count;
    }

    const navigateToPlaceOrder = () =>{
      if(countItems()>0){
        navigation.navigate('PlaceOrder');
      }
      else{
        alert('Select food')
      }
    }

    const renderItem = ({item})=>{
        return(
            <View style={styles.flatListItem} key={item.id}>
                <View style={{flex:1}}>
                    <Text style={{color: '#929292', fontSize: 14, marginBottom: 5}}>{item.name}</Text>
                    <Text style={{color: '#929292', fontSize: 12, marginBottom: 5}}>{item.description}</Text>
                    <Text style={{color: '#FBC290', fontSize: 16}}>{'\u20AC'}{item.price}</Text>
                </View>
                <View>
                    {
                        item.count > 0 ?
                        <View style={styles.plusMinusBtn}>
                            <TouchableOpacity onPress={()=>{updateCount(item.id, 'decrement')}}>
                              <IconMaterial name="minus" style={{fontSize: 18}}/>
                            </TouchableOpacity>
                            
                            <Text style={{marginHorizontal:8}}>{item.count}</Text>
                            <TouchableOpacity onPress={()=>{updateCount(item.id, 'increment')}}>
                              <IconMaterial name="plus" style={{fontSize: 18}}/>
                            </TouchableOpacity>
                        </View>:
                        <TouchableOpacity style={styles.addBtn} onPress={()=>{updateCount(item.id, 'increment')}}>
                            <Text>ADD</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.view1}>
        <ImageBackground source={{ uri: imageUri }} style={styles.backgroundImageView}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <IconMaterial name="arrow-left" style={styles.leftIcon}/>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <IconMaterial name="export-variant" style={[styles.leftIcon,{marginRight:6}]}/>
              <IconMaterial name="information-outline" style={styles.leftIcon}/>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.view2}>
        <View style={{ flex: 1 }}>
          <Text style={styles.restaurantName}>Inka Restaurant</Text>
        </View>
        <View style={styles.restaurantInformation}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconMaterial name="star-outline" style={styles.starIcon}/>
            <Text style={{ fontSize: 14, color: '#929292' }}>
              5.0(200+) | All days: 09:00 AM - 06:00 PM
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconMaterial name="phone-in-talk" style={styles.callIcon}/>
            <Text style={{ fontSize: 14, color: '#929292' }}>
              Reach us at: 9854562142
            </Text>
          </View>
          <View style={{ paddingBottom: 10 }}>
            <TouchableOpacity style={styles.bookATablebtn}>
                <Text style={styles.bookATableText}>BOOK A TABLE</Text>
            </TouchableOpacity>
           </View>
        </View>
        
      </View>

      <View style={styles.view3}>
          <Text style={styles.starter}>Starter</Text>
          <FlatList
             data = {foodlist}
             renderItem = {renderItem}
          />
      </View>
      <View style={styles.menuView}>
          <TouchableOpacity style={styles.menubtn}>
              <Icon name = "restaurant-menu" style={{fontSize: 24, marginRight: 5}}/>
              <Text>MENU</Text>
          </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={navigateToPlaceOrder}>
        <IconMaterial name="cart-outline" style={[styles.leftIcon,{marginRight:4}]}/>
        <Text style={{ fontWeight: 'bold', color: '#fff' }}>VIEW CART{countItems()>0? "("+countItems()+" items)":""}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectFood;

const styles = StyleSheet.create({
  view1: {
    flex: 1,
  },
  view2: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: -30,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: 'center',
  },
  view3: {
    flex: 2,
    paddingHorizontal: 20
  },
  btn: {
    padding: 16,
    backgroundColor: '#436264',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "center"
  },
  restaurantInformation: {
    alignItems: 'center',
    paddingTop: 12,
    justifyContent: 'space-between',
    flex: 2
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  bookATablebtn: {
    backgroundColor: '#436264',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 6,
  },
  bookATableText: {
    color: '#fff',
  },
  starIcon:{
      fontSize: 16,
      color: '#C3C4C4'
  },
  callIcon:{
    fontSize: 16,
    color: '#929292',
    marginRight: 4
  },
  leftIcon:{
      fontSize: 26,
      color: '#fff'
  },
  backgroundImageView:{
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 15
  },
  starter:{
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 15,
      marginBottom: 10
  },
  flatListItem:{
      flexDirection: "row",
      marginBottom: 14
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
  addBtn:{ 
    paddingVertical: 4, 
    borderRadius: 2,
    paddingHorizontal: 22,
    borderWidth: 0.5,
    borderColor: '#FBC290'
  },
  menuView:{
    paddingVertical: 10, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  menubtn:{
    flexDirection: 'row', 
    backgroundColor:'#FBC290', 
    padding: 5, 
    borderRadius: 4,
    alignItems: "center"
  }
});
