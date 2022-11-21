import React, {useState, useCallback, useRef, useMemo} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard as RNKeyboard} from 'react-native';
import {
  Text,
  Spacings,
  NumberInput,
  NumberInputResult,
  View,
  Typography,
  Constants,
  Incubator
} from 'react-native-ui-lib';

const NumberInputErrorOnChangeScreen = () => {
  const currentData = useRef<NumberInputResult>();
  const minimum = useRef<number>(5000);
  // const [initialNumber, setInitialNumber] = useState<number>(100);
  const [text, setText] = useState<string>('');

  const onChangeNumber = useCallback((result: NumberInputResult) => {
    currentData.current = result;
  }, []);

  const processInput = useCallback(() => {
    let newText = '';
    if (currentData.current) {
      switch (currentData.current.type) {
        case 'valid':
          newText = currentData.current.formattedNumber;
          break;
        case 'empty':
          newText = 'Empty';
          break;
        case 'error':
          newText = `Error: value '${currentData.current.userInput}' is invalid`;
          break;
      }
    }

    setText(newText);
  }, []);

  const isValid = useCallback(() => {
    return currentData.current?.type === 'valid';
  }, []);

  const minimumPrice = useCallback(() => {
    if (currentData.current?.type === 'valid') {
      return currentData.current.number >= minimum.current;
    }
  }, []);

  const validate = useMemo((): Incubator.TextFieldProps['validate'] => [isValid, minimumPrice],
    [isValid, minimumPrice]);

  const validationMessage = useMemo((): Incubator.TextFieldProps['validationMessage'] => [
    'Please enter a valid number',
    `Make sure your number is above ${minimum.current}`
  ],
  []);

  return (
    <TouchableWithoutFeedback onPress={RNKeyboard.dismiss}>
      <View flex centerH>
        <Text text40 margin-s10>
          Number Input
        </Text>

        <View flex center>
          <NumberInput
            // initialNumber={initialNumber}
            onChangeNumber={onChangeNumber}
            placeholder={'Price'}
            leadingText={'$'}
            leadingTextStyle={styles.leadingText}
            style={styles.mainText}
            containerStyle={styles.containerStyle}
            label={'Enter Price'}
            labelStyle={styles.label}
            validate={validate}
            validationMessage={validationMessage}
            validationMessageStyle={styles.validationMessage}
            marginLeft={Spacings.s4}
            marginRight={Spacings.s4}
            onBlur={processInput}
            validateOnChange
          />
          <Text marginT-s5>{text}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NumberInputErrorOnChangeScreen;

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    marginBottom: 30,
    marginLeft: Spacings.s5,
    marginRight: Spacings.s5
  },
  mainText: {
    height: 36,
    marginVertical: Spacings.s1,
    textAlign: 'center',
    ...Typography.text30M
  },
  leadingText: {
    marginTop: Constants.isIOS ? Spacings.s2 : 0,
    ...Typography.text50M
  },
  label: {
    textAlign: 'center',
    marginBottom: Spacings.s1,
    ...Typography.bodySmallMedium
  },
  validationMessage: {
    flexGrow: 1,
    textAlign: 'center',
    ...Typography.bodySmallMedium
  }
});
