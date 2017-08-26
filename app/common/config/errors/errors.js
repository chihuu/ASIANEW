'use strict';

import React, {
  PropTypes,
  Component
} from 'react';

import { Alert } from 'react-native';

class AppErrorsClass {

  showErrors(message) {
    return (
      Alert.alert(
        'Message',
        message,
        [
          {
            text: 'OK',
            onPress: () => {
              return false;
            }
          },
        ]
      )
    )
  }
}

const AppErrors = new AppErrorsClass();

export default AppErrors;
