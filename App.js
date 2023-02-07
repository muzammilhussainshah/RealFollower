import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Navigation from './src/navigation';
import { ActivityIndicator } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

export default App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator />}
        persistor={persistor}
      >
        <RootSiblingParent>
          <Navigation />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  </GestureHandlerRootView>
);