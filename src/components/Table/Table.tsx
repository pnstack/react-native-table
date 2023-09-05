import { groupBy as lodashGroupBy } from 'lodash';
import React, { memo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export type renderFormatCellProps = {
  value: number;
  unit?: string;
};

export type Column = {
  title: string;
  key: string;
  style?: StyleProp<ViewStyle> | undefined;
  dataIndex?: string;
  render?: (item: any) => React.ReactNode;
  renderTitle?: (title: string, style?: any) => React.ReactNode;
};

export type TableProps = {
  dataSource: any[];
  columns: Column[];
  groupBy?: string;
  layout?: 'vertical' | 'horizontal';
  renderHeader?: (columns: Column[]) => React.ReactNode;
  headerStyle?: any;
};

const Table = ({
  dataSource,
  columns,
  groupBy,
  layout,
  renderHeader,
  headerStyle,
}: TableProps) => {
  if (groupBy) {
    const groupedData = lodashGroupBy(dataSource, groupBy);
    return (
      <View>
        {Object.keys(groupedData).map((key, index) => (
          <Table
            key={key}
            dataSource={groupedData[key] as any[]}
            columns={columns}
          />
        ))}
      </View>
    );
  }

  if (layout === 'horizontal') {
    return (
      <View>
        {columns.map((column, cidx) => (
          <View key={cidx} style={[styles.rowHorizontal, column.style]}>
            {column.renderTitle ? (
              column.renderTitle(column.title, column.style)
            ) : (
              <Text style={[{ flex: 1 }]}>{column.title}</Text>
            )}

            {dataSource.map((item, ridx) => (
              <View
                key={ridx}
                style={[{ flex: 1, alignItems: 'flex-end' }, column.style]}
              >
                {column.render ? (
                  column.render(
                    column.dataIndex ? item[column.dataIndex] : item
                  )
                ) : (
                  <Text>{item[column.key] || '_'}</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }

  return (
    <View>
      {renderHeader ? (
        renderHeader(columns)
      ) : (
        <View style={[styles.header, headerStyle]}>
          {columns.map((column, cidx) => (
            <View key={cidx} style={[{ flex: 1 }, column.style]}>
              <Text>{column.title}</Text>
            </View>
          ))}
        </View>
      )}
      {dataSource.map((item, ridx) => (
        <View key={ridx} style={styles.row}>
          {columns.map((column, cidx) => (
            <View key={cidx} style={[{ flex: 1 }, column.style]}>
              {column.render ? (
                column.render(column.dataIndex ? item[column.dataIndex] : item)
              ) : (
                <Text>{item[column.key]}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default memo(Table);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  rowHorizontal: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '100%',
  },
});
