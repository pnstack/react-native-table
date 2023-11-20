import { groupBy as lodashGroupBy } from 'lodash';
import React, {
  Fragment,
  forwardRef,
  memo,
  type ForwardedRef,
  useImperativeHandle,
} from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { TableProps, TableRef } from './Table.types';

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
      style,
    }: TableProps,
    ref?: ForwardedRef<TableRef | undefined> | undefined
  ) => {
    // implement ref
    useImperativeHandle(ref, () => {
      return {};
    });
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
        style={[
          {
            flexDirection: layout == 'horizontal' ? 'row' : 'column',
            display: 'flex',
            flex: 1,
          },
          style,
        ]}
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

        <ScrollView horizontal={layout === 'horizontal'}>
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
        </ScrollView>
      </View>
    );
  }
);
export default memo(Table);
