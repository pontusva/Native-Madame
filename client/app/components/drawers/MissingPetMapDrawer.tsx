import * as React from 'react';
import { Drawer } from 'react-native-paper';
import PetMap from '../../PetMap';

const MissingPetMapDrawer = () => {
  const [active, setActive] = React.useState('');

  return (
    <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <PetMap />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
  );
};

export default MissingPetMapDrawer;
