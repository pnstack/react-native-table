import React, { forwardRef, Fragment, memo, useCallback } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import type { Column, TableFlatListProps, TableRef } from './Table.types';
import type { ViewProps } from 'react-native';

export type NoDataProps = ViewProps & {
  message?: string | null | undefined;
};

const NoData = ({ message }: NoDataProps) => {
  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
};

export const isNullOrUndefined = (data?: any): data is null | undefined =>
  data === null || data === undefined;

const RowItem = memo(
  forwardRef(({ item, index, columns, rowStyle, layout }: any, ref) => {
    return (
      <View
        style={[
          {
            flex: layout === 'vertical' ? 1 : undefined,
            flexDirection: layout === 'horizontal' ? 'column' : 'row',
          },
          rowStyle
            ? typeof rowStyle === 'function'
              ? rowStyle(item, index)
              : rowStyle
            : {},
        ]}
      >
        {columns.map((column: Column, cidx: React.Key | null | undefined) => (
          <View
            key={cidx}
            style={[{ flex: layout == 'horizontal' ? 0 : 1 }, column.style]}
          >
            {column.render ? (
              column.render(
                column.dataIndex ? item[column.dataIndex] : item,
                index
              )
            ) : (
              <Text>{item[column.key]}</Text>
            )}
          </View>
        ))}
      </View>
    );
  })
);

const TableFlatlist = forwardRef(
  (
    {
      dataSource,
      columns,
      groupBy,
      layout,
      renderHeader,
      headerStyle,
      rowStyle,
      rowKey,
      style,
      renderRow,
      scrollEnabled = false,
      isStickyHeader,
      isNoData,
      noDataContent,
      ...flatListProps
    }: TableFlatListProps,
    ref?: React.Ref<TableRef | undefined> | undefined
  ) => {
    const isNoDataSource =
      (isNullOrUndefined(isNoData) && dataSource.length === 0) ||
      (!isNullOrUndefined(isNoData) && isNoData);

    dataSource = isNoDataSource ? noDataSource : dataSource;
    const flatListPropsInner = { ...flatListProps };

    if (!flatListPropsInner.refreshControl) {
      if (flatListPropsInner.onRefresh) {
        const onRefresh = flatListPropsInner.onRefresh;
        const isRefreshing = flatListPropsInner.isRefreshing;
        flatListPropsInner.refreshControl = (
          <RefreshControl refreshing={!!isRefreshing} onRefresh={onRefresh} />
        );
      }
      delete flatListPropsInner.onRefresh;
      delete flatListPropsInner.isRefreshing;
    }

    const renderNoDataItem = useCallback(() => {
      if (
        typeof noDataContent === 'string' ||
        isNullOrUndefined(noDataContent)
      ) {
        return <NoData message={noDataContent} />;
      }

      return noDataContent!;
    }, [noDataContent]);

    const renderItem = useCallback(({ item, index }: any) => {
      if (renderRow) {
        return renderRow({
          record: item,
          index,
          children: (
            <RowItem
              index={index}
              item={item}
              columns={columns}
              rowStyle={rowStyle}
              layout={layout}
            />
          ),
        });
      }

      return (
        <RowItem
          index={index}
          item={item}
          columns={columns}
          rowStyle={rowStyle}
          layout={layout}
        />
      );
    }, []);

    const keyExtractor = useCallback((item: any, index: any) => {
      return rowKey
        ? typeof rowKey === 'function'
          ? rowKey(item)
          : item[rowKey]
        : `row-${index}`;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const listHeaderComponent = useCallback((): React.ReactElement => {
      if (renderHeader) {
        return renderHeader(columns);
      }
      return (
        <View
          style={[
            {
              flexDirection: layout === 'horizontal' ? 'column' : 'row',
              flex: layout === 'vertical' ? 1 : undefined,
            },
            headerStyle,
          ]}
        >
          {columns.map((column, cidx) => (
            <View
              key={cidx}
              style={[
                { flex: layout == 'horizontal' ? 0 : 1 },
                column.style,
                column.headerStyle,
              ]}
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
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <FlatList
        style={[{ display: 'flex' }, style]}
        scrollEnabled={scrollEnabled}
        data={dataSource}
        windowSize={30}
        initialNumToRender={20}
        renderItem={isNoDataSource ? renderNoDataItem : renderItem}
        maxToRenderPerBatch={6}
        keyExtractor={keyExtractor}
        ListHeaderComponent={listHeaderComponent}
        stickyHeaderIndices={isStickyHeader ? [0] : undefined}
        horizontal={layout === 'horizontal'}
        {...flatListPropsInner}
      />
    );
  }
);

export default TableFlatlist;

const noDataSource = [{ id: 'no_data', type: 'no_data' }];
