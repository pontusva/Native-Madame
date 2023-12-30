import * as React from 'react';
import { Drawer } from 'react-native-paper';

const MyComponent = () => {
  const [active, setActive] = React.useState('');

  return (
    <Drawer.Section
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}
      title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
  );
};

export default MyComponent;
