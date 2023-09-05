# react-native-table

React native table component

## Installation

```sh
yarn install @pnstack/react-native-table
```

## Usage

```js
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
