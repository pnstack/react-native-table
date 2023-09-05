import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Table } from '@pnstack/react-react-native-table';

export default function App() {
  return (
    <View style={styles.container}>
      <Table
        columns={[
          {
            title: 'id',
            key: 'id',
            dataIndex: 'id',
          },
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
        ]}
        dataSource={[
          {
            id: 1,
            name: 'name 1',
          },
          {
            id: 2,
            name: 'name 2',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
