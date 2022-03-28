import _ from 'lodash';
import React, {Component, useCallback, useState} from 'react';
import {FlatList, StyleSheet, Image as RNImage} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {View, Text, Image, Card, TextField, Button, Switch} from 'react-native-ui-lib'; //eslint-disable-line
import {useWhyDidYouUpdate} from 'react-recipes';

export default class PlaygroundScreen extends Component {
  state = {
    toggleValue: false
  };

  componentDidMount() {
    // this.heavyCode();
  }

  heavySort = n => {
    const array = _.times(n);
    _.shuffle(array);
    array.sort();
  };

  heavyCode = async () => {
    const t1 = performance.now();
    console.log('ethan - start heavy code');
    let n = 10000;
    // this.heavySort(n);

    while (n > 0) {
      console.log('ethan - n', n);
      n--;

      // if (n % 100 === 0) {
      //   console.log('ethan - breath');
      //   await new Promise(resolve => {
      //     setTimeout(resolve, 100);
      //   });
      // }
    }
    const t2 = performance.now();
    console.log('ethan - done heavy code', t2 - t1);
  };

  toggle = () => {
    this.setState({toggleValue: !this.state.toggleValue});
  };

  render() {
    return (
      <View bg-grey80 flex>
        <Box/>
        <View padding-page row spread>
          <Switch value={this.state.toggleValue} onValueChange={this.toggle}/>
          <Button label="Heavy" size="xSmall" onPress={this.heavyCode}/>
        </View>

        <Text margin-page h1>
          List
        </Text>
        {/* <List/> */}
        {/* <List containerStyle={{backgroundColor: 'red'}}/> */}
        <List containerStyle={styles.list}/>
      </View>
    );
  }
}

const List = React.memo(props => {
  const [data] = useState(_.times(500));
  const {containerStyle} = props;

  useWhyDidYouUpdate('List', props);

  const renderItem = useCallback(({item}) => {
    return <ListItem index={item}/>;
  }, []);

  // console.log('ethan - render List');
  // return (
  //   <FlatList data={data} renderItem={({item}) => <ListItem index={item}/>}/>
  // );
  // return <FlatList data={data} renderItem={renderItem}/>;
  return <FlatList data={data} renderItem={renderItem} contentContainerStyle={containerStyle}/>;
});

const ListItem = /* React.memo */ ({index}) => {
  // console.log('ethan - renderItem', index);
  return (
    <View height={48} row spread paddingH-s5>
      <View row>
        <Image source={{uri: `https://picsum.photos/id/${index}/48`}} style={{width: 48, height: 48}}/>
        <Text>Item #{index}</Text>
      </View>
      <View left>
        <Button label="Button" size="xSmall"/>
      </View>
    </View>
  );
};

const Box = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gesture = Gesture.Tap().onBegin(() => {
    console.log('ethan - move box');
    translateX.value = withTiming(Math.random() * 300, {duration: 600});
    translateY.value = withTiming(Math.random() * 500, {duration: 600});
    // runOnJS(onPress)();
  });

  const style = useAnimatedStyle(() => {
    return {
      width: 100,
      height: 100,
      backgroundColor: 'red',
      transform: [{translateX: translateX.value}, {translateY: translateY.value}]
    };
  });

  return (
    <>
      <GestureDetector gesture={gesture}>
        <View reanimated style={{width: 50, height: 50, backgroundColor: 'blue'}}/>
      </GestureDetector>
      <View reanimated style={style}/>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'red'
  }
});
