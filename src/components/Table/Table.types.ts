import type { ReactElement } from 'react';
import type {
  FlatListProps,
  RefreshControlProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

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
  dataSource: T[];
  columns: Column<T>[];
  groupBy?: keyof T;
  layout?: 'vertical' | 'horizontal';
  renderHeader?: (columns: Column<T>[]) => React.ReactElement;

  headerStyle?: StyleProp<ViewStyle> | undefined;
  rowStyle?: StyleProp<ViewStyle> | undefined;
  rowKey?: keyof T | ((item: T) => string);
  onRow?: (record: T, index: number) => void;
  style?: StyleProp<ViewStyle> | undefined;
  renderRow?: (props: RenderRowProps<T>) => ReactElement;
  scrollEnabled?: boolean;

  isStickyHeader?: boolean;

  refreshControl?: React.ReactElement<RefreshControlProps>;

  isRefreshing?: boolean;

  onRefresh?: () => void;

  isNoData?: boolean;

  noDataContent?: React.ReactElement | string;

};

export type TableFlatListProps<T = any> = TableProps<T> &
  Omit<FlatListProps<T>, 'data' | 'renderItem'>;

export type RenderRowProps<T = any> = {
  record: T;
  index: number;
  children: ReactElement;
};

export type TableRef = {};
