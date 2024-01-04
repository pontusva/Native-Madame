import { Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
interface Alert {
  alert: {
    id: number;
    name: string;
    description: string;
    date_lost: string;
    owner_uid: string;
    created_at: string;
    image_name: string;
  }[];
}
export default function PetAlert() {
  const [alerts, setAlerts] = useState<Alert | null>(null);
  const getAlerts = async () => {
    const response = await fetch('http://192.168.1.237:8080/pet-alert');
    const data = await response.json();
    setAlerts(data);
  };

  console.log();

  useEffect(() => {
    getAlerts();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Senast försvunna</Text>
      {alerts &&
        alerts.alert.map(alert => {
          return (
            <View key={alert.id}>
              <Text>{alert.name}</Text>
              <Image
                style={{ width: 200, height: 200, borderRadius: 20 }}
                source={{
                  uri: `http://192.168.1.237:8080/static/${alert.image_name}`,
                }}
              />
            </View>
          );
        })}
    </View>
  );
}
