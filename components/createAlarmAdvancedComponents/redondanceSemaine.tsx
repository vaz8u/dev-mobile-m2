import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Card, Avatar, Switch, } from 'react-native-paper';

const RedondanceSemaine = (
    { isRandondence, rendondanceSwitch, isClickedAvatar, handleAvatarClick }
) => {
    return (
        <Card style={styles.cartes}>
        <Card.Title title="Redondance sur la semaine" titleStyle={styles.carteTitre} 
        right={(props) => <Switch style={{marginRight:5}} value={isRandondence} onValueChange={() => rendondanceSwitch()} />} />
        <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={handleAvatarClick(0)}>
            <Avatar.Text size={30} label='Lu' style={{ backgroundColor: isClickedAvatar[0] ? 'lightblue' : 'grey' }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAvatarClick(1)}>
            <Avatar.Text size={30} label='Ma' style={{ backgroundColor: isClickedAvatar[1] ? 'lightblue' : 'grey' }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAvatarClick(2)}>
            <Avatar.Text size={30} label='Me' style={{ backgroundColor: isClickedAvatar[2] ? 'lightblue' : 'grey' }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAvatarClick(3)}>
            <Avatar.Text size={30} label='Je' style={{ backgroundColor: isClickedAvatar[3] ? 'lightblue' : 'grey' }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAvatarClick(4)}>
            <Avatar.Text size={30} label='Ve' style={{ backgroundColor: isClickedAvatar[4] ? 'lightblue' : 'grey' }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAvatarClick(5)}>
            <Avatar.Text size={30} label='Sa' style={{ backgroundColor: isClickedAvatar[5] ? 'lightblue' : 'grey' }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAvatarClick(6)}>
            <Avatar.Text size={30} label='Di' style={{ backgroundColor: isClickedAvatar[6] ? 'lightblue' : 'grey' }}/>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    );
}

const styles = StyleSheet.create({
    cartes:{
        marginTop:5,
      },
      carteTitre:{
        fontSize:18,
        fontWeight:'bold'
      }
});

export default RedondanceSemaine;