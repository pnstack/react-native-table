import { groupBy as lodashGroupBy } from 'lodash';
import React, { type ForwardedRef, Fragment, forwardRef, memo } from 'react';
import type { TextStyle } from 'react-native';
import {
  type StyleProp,
  View,
  Text,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';

export type Column = {
  title: string;
  key: string;
  style?: StyleProp<ViewStyle> | undefined;
  titleStyle?: StyleProp<TextStyle> | undefined;
  headerStyle?: StyleProp<ViewStyle> | undefined;
  dataIndex?: string;
  render?: (item: any) => React.ReactNode;
  renderTitle?: (title: string, style?: any) => React.ReactNode;
};

export type TableProps = {
  dataSource?: any[];
  columns: Column[];
  groupBy?: string;
  layout?: 'vertical' | 'horizontal';
  renderHeader?: (columns: Column[]) => React.ReactNode;
  headerStyle?: StyleProp<ViewStyle> | undefined;
  rowStyle?: StyleProp<ViewStyle> | undefined;
  onRow?: (record: any, index: number) => void;
};
export type TableRef = {};

const Table = forwardRef(
  (
    {
      dataSource,
      columns,
      groupBy,
      layout = 'vertical',
      renderHeader,
      headerStyle,
      rowStyle,
      onRow,
    }: TableProps,
    ref?: ForwardedRef<TableRef | undefined> | undefined
  ) => {
    if (groupBy) {
      const groupedData = lodashGroupBy(dataSource, groupBy);
      return (
        <View style={{ width: '100%', height: '100%' }}>
          {Object.keys(groupedData).map((key) => (
            <Table key={key} dataSource={groupedData[key]} columns={columns} />
          ))}
        </View>
      );
    }

    return (
      <View
        style={{
          flexDirection: layout == 'horizontal' ? 'row' : 'column',
          display: 'flex',
          flex: 1,
        }}
      >
        {renderHeader ? (
          renderHeader(columns)
        ) : (
          <View
            style={[
              {
                flexDirection: layout == 'horizontal' ? 'column' : 'row',
                flex: layout === 'vertical' ? 1 : undefined,
              },
              headerStyle,
            ]}
          >
            {columns.map((column, cidx) => (
              <View
                key={cidx}
                style={[{ flex: 1 }, column.style, column.headerStyle]}
              >
                {column.renderTitle ? (
                  <Fragment>{column.renderTitle(column.title)}</Fragment>
                ) : (
                  <>
                    <Text style={[column.titleStyle]}>{column.title}</Text>
                  </>
                )}
              </View>
            ))}
          </View>
        )}

        {dataSource &&
          dataSource.map((item, ridx) => (
            <TouchableOpacity
              key={ridx}
              onPress={() => {
                onRow && onRow(item, ridx);
              }}
              style={[
                {
                  flex: 1,
                  flexDirection: layout == 'horizontal' ? 'column' : 'row',
                },
                rowStyle,
              ]}
            >
              {columns.map((column, cidx) => (
                <View key={cidx} style={[{ flex: 1 }, column.style]}>
                  {column.render ? (
                    column.render(
                      column.dataIndex ? item[column.dataIndex] : item
                    )
                  ) : (
                    <Text>{item[column.key]}</Text>
                  )}
                </View>
              ))}
            </TouchableOpacity>
          ))}
      </View>
    );
  }
);
export default memo(Table);
