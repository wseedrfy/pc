/* eslint-disable */
import { useMemo } from 'react';
import { message } from 'antd';
import {
  TBaseProduct, TProductQuery, TProductsQuery, TProductTypeQuery,
} from '@/utils/types';
import { TBaseOrder, TOrderInfoQuery, TOrdersQuery } from '@/utils/orderType'
import { useQuery, useMutation } from '@apollo/client';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import {
  GET_PRODUCTS, GET_PRODUCT, COMMIT_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_TYPES,
} from '@/graphql/product';
import { GET_ORDERS , GET_ORDER, COMMIT_ORDER, DELETE_ORDER } from '@/graphql/order';

//查询订单列表
export const useOrders = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const { loading, data, refetch } = useQuery<TOrdersQuery>(GET_ORDERS, {
    skip: true,
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  });
  console.log("订单loading",loading);
  console.log("订单data",data);
  console.log("订单refetch",refetch);

  const refetchHandler = async (params: {
    name?: string;
    pageSize?: number;
    current?: number;
  }) => {
    const { data: res, errors } = await refetch({
      name: params.name,
      page: {
        pageNum: params.current || 1,
        pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
      },
    });

    if (errors) {
      console.log("获取订单错误");
      
      return {
        success: false,
      };
    }
    console.log("订单res",res);
    
    console.log("refetch得到订单的数据",{
      total: res?.getOrders.page.total,
      data: res?.getOrders.data,
      success: true,
      params:params
    });
    
    return {
      total: res?.getOrders.page.total,
      data: res?.getOrders.data,
      success: true,
    };
  };

  return {
    loading,
    refetch: refetchHandler,
    page: data?.getOrders.page,
    data: data?.getOrders.data,
  };
};
//查询单个订单
export const useOrderInfo = (id?: string) => {
  const { data, loading, refetch } = useQuery<TOrderInfoQuery>(GET_ORDER, {
    skip: !id,
    variables: {
      id,
    },
  });

  const newData = useMemo(() => ({
    ...data?.getOrderInfo.data,
  }), [data]);

  return { data: data?.getOrderInfo.data ? newData : undefined, loading, refetch };
};
//修改订单
export const useEditOrderInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_ORDER);

  const handleEdit = async (
    id: number,
    params: TBaseOrder,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitOrderInfo.code === 200) {
      message.success(res.data.commitOrderInfo.message);
      callback(true);
      return;
    }
    message.error(res.data.commitOrderInfo.message);
  };

  return [handleEdit, loading];
};
//删除订单
export const useDeleteOrder = (): [handleEdit: Function, loading: boolean] => {
  const [del, { loading }] = useMutation(DELETE_ORDER);

  const delHandler = async (id: string, callback: () => void) => {
    const res = await del({
      variables: {
        id,
      },
    });
    if (res.data.deleteOrder.code === 200) {
      message.success(res.data.deleteOrder.message);
      callback();
      return;
    }
    message.error(res.data.deleteOrder.message);
  };

  return [delHandler, loading];
};

