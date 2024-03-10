import type { ReactElement } from 'react';
import type {
  FlatListProps,
  RefreshControlProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

/**
 * Represents a column in a table.
 * @template T The type of data in the table.
 */
export type Column<T = any> = {
  /**
   * The title of the column.
   */
  title: string;
  /**
   * The key of the column.
   */
  key: string;
  /**
   * The style for the column.
   */
  style?: StyleProp<ViewStyle> | undefined;
  /**
   * The style for the column title.
   */
  titleStyle?: StyleProp<TextStyle> | undefined;
  /**
   * The style for the column header.
   */
  headerStyle?: StyleProp<ViewStyle> | undefined;
  /**
   * The data index for the column.
   */
  dataIndex?: keyof T;
  /**
   * A function that renders the content of the column for each row.
   * @param item The data item for the row.
   * @returns The rendered React node.
   */
  render?: (item: T) => React.ReactNode;
  /**
   * A function that renders the title of the column.
   * @param title The title of the column.
   * @param style The style for the title.
   * @returns The rendered React node.
   */
  renderTitle?: (title: string, style?: any) => React.ReactNode;
};

/**
 * Props for the Table component.
 *
 * @template T - The type of data in the dataSource array.
 */
export type TableProps<T = any> = {
  /**
   * An array of data objects to be rendered in the table.
   */
  dataSource: T[];
  /**
   * An array of column configurations for the table.
   */
  columns: Column<T>[];
  /**
   * The key to group the data by.
   */
  groupBy?: keyof T;
  /**
   * The layout direction of the table.
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * A function to render the table header.
   *
   * @param columns - The array of column configurations.
   * @returns The React element representing the table header.
   */
  renderHeader?: (columns: Column<T>[]) => React.ReactElement;
  /**
   * The style for the table header.
   */
  headerStyle?: StyleProp<ViewStyle>;
  /**
   * The style for each table row.
   */
  rowStyle?: StyleProp<ViewStyle>;
  /**
   * The key to use as the unique identifier for each row.
   * It can be a key of the data object or a function that returns a string.
   */
  rowKey?: keyof T | ((item: T) => string);
  /**
   * A function to be called when a row is pressed.
   *
   * @param record - The data object of the pressed row.
   * @param index - The index of the pressed row.
   */
  onRow?: (record: T, index: number) => void;
  /**
   * The style for the table container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * A function to render each table row.
   *
   * @param props - The props for rendering the row.
   * @returns The React element representing the table row.
   */
  renderRow?: (props: RenderRowProps<T>) => ReactElement;
  /**
   * Determines whether the table can be scrolled.
   */
  scrollEnabled?: boolean;
  /**
   * Determines whether the table header should stick to the top of the table when scrolling.
   */
  isStickyHeader?: boolean;
  /**
   * A React element representing the refresh control for the table.
   */
  refreshControl?: React.ReactElement<RefreshControlProps>;
  /**
   * Determines whether the table is currently refreshing.
   */
  isRefreshing?: boolean;
  /**
   * A function to be called when the table is refreshed.
   */
  onRefresh?: () => void;
  /**
   * Determines whether there is no data to display in the table.
   */
  isNoData?: boolean;
  /**
   * The content to display when there is no data in the table.
   */
  noDataContent?: React.ReactElement | string;
};

/**
 * Props for the TableFlatList component.
 * Extends TableProps and Omit<FlatListProps<T>, 'data' | 'renderItem'>.
 * @template T - The type of data items in the FlatList.
 */
export type TableFlatListProps<T = any> = TableProps<T> &
  Omit<FlatListProps<T>, 'data' | 'renderItem'>;

/**
 * Props for rendering a row in the table.
 *
 * @template T - The type of the record.
 */
export type RenderRowProps<T = any> = {
  record: T;
  index: number;
  children: ReactElement;
};

/**
 * Represents a reference to a table.
 */
export type TableRef = {};
