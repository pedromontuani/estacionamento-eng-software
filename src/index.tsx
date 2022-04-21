import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Router from './router';
import {store} from './store';

const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
