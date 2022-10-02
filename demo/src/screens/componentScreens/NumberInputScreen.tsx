import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard as RNKeyboard} from 'react-native';
import {Text, Spacings, NumberInput, View, Typography} from 'react-native-ui-lib';

interface State {
  defaultText: boolean;
  initialValue?: number;
  autoCapitalize: boolean;
  addLabel: boolean;
}

export default class NumberInputScreen extends Component<{}, State> {
  state = {
    defaultText: false,
    autoCapitalize: false,
    addLabel: false
  };

  onChange = (newValue?: number, formattedNumber?: string) => {
    console.log('NumberInputScreen', 'onChange', 'newValue =', newValue, 'formattedNumber =', formattedNumber);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={RNKeyboard.dismiss}>
        <View flex>
          <Text headingXL margin-20>
            Number Input
          </Text>
          <NumberInput
            // initialValue={1506}
            onChange={this.onChange}
            placeholder={'Price'}
            leadingText={'$'}
            leadingTextTypography={'text50M'}
            style={styles.mainText}
            containerStyle={styles.containerStyle}
            label={'Enter Price'}
            labelStyle={styles.label}
            validate={'required'}
            validationMessage={['Please enter a price']}
            validationMessageStyle={styles.validationMessage}
            marginLeft={Spacings.s4}
            marginRight={Spacings.s4}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    marginBottom: 30,
    marginLeft: Spacings.s5,
    marginRight: Spacings.s5
  },
  mainText: {
    height: 36,
    marginBottom: Spacings.s2,
    textAlign: 'center',
    ...Typography.text30M
  },
  label: {
    textAlign: 'center',
    marginBottom: Spacings.s1,
    ...Typography.bodySmallMedium
  },
  validationMessage: {
    textAlign: 'center',
    ...Typography.bodySmallMedium
  }
});
