import * as React from 'react';

import { Table, type Column } from '@pnstack/react-native-table';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
// Define the columns for the table
const columns: Column[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    style: {
      maxWidth: 35,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    style: { flex: 2, alignItems: 'flex-start', justifyContent: 'center' },
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
];

// Generate some mockup data for the table
const data: any[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `User ${i}`,
    age: Math.floor(Math.random() * 50) + 18,
    gender: Math.random() < 0.5 ? 'Male' : 'Female',
    email: `user${i}@example.com`,
    phone: `+84${Math.floor(Math.random() * 1000000000)}`,
  });
}
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
      <ScrollView style={styles.container}>
        <Text>Vertical table</Text>
        <Table
          style={{ height: 300 }}
          headerStyle={{
            backgroundColor: '#ccc',
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
          rowStyle={{
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            paddingVertical: 8,
            borderColor: '#fff',
          }}
          columns={columns}
          dataSource={data}
        />
        <Text>Horizontal table</Text>
        <Table
          headerStyle={{
            backgroundColor: '#ccc',
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
          rowStyle={{
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            paddingVertical: 8,
            borderColor: '#fff',
          }}
          columns={columns}
          dataSource={data}
          layout="horizontal"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
