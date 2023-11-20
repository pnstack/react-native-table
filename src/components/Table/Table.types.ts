import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type Column<T = any> = {
  title: string;
  key: string;
  style?: StyleProp<ViewStyle> | undefined;
  titleStyle?: StyleProp<TextStyle> | undefined;
  headerStyle?: StyleProp<ViewStyle> | undefined;
  dataIndex?: keyof T;
  render?: (item: T) => React.ReactNode;
  renderTitle?: (title: string, style?: any) => React.ReactNode;
};

export type TableProps<T = any> = {
  dataSource?: T[];
  columns: Column<T>[];
  groupBy?: keyof T;
  layout?: 'vertical' | 'horizontal';
  renderHeader?: (columns: Column<T>[]) => React.ReactNode;
  headerStyle?: StyleProp<ViewStyle> | undefined;
  rowStyle?: StyleProp<ViewStyle> | undefined;
  onRow?: (record: T, index: number) => void;
  style?: StyleProp<ViewStyle> | undefined;
};
export type TableRef = {};
