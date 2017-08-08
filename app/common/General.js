import {NetInfo} from 'react-native';

class General {
  checkNetWorkInfo() {
    NetInfo.fetch().then((reach) => {
      console.log('Initial: ' + reach);
    });

    NetInfo.addEventListener(
      'change',
      this.handleFirstConnectivityChange
    );
  }

  handleFirstConnectivityChange(reach) {
    NetInfo.removeEventListener(
      'change',
      this.handleFirstConnectivityChange
    );
    return reach;
  }

}

export default new General();
