/* eslint-disable */
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { useDeleteProduct, useEditProductInfo, useProducts } from '@/services/product';
// import { IProduct } from '@/utils/types';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { getColumns } from './constants';
import EditProduct from './components/EditProduct';
import ConsumeCard from './components/ConsumeCard';
import { useDeleteOrder, useOrders } from '@/services/order';
import { IOrder } from '@/utils/orderType';


/**
* 当前门店下开设的课程
*/
const Product = () => {
  const actionRef = useRef<ActionType>();
  const [curId, setCurId] = useState('');
  // const { refetch, loading } = useProducts();
  const { refetch, loading } = useOrders();
  // const [delHandler, delLoading] = useDeleteProduct();
  const [delHandler, delLoading] = useDeleteOrder();
  const [edit, editLoading] = useEditProductInfo();
  const [showInfo, setShowInfo] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const onClickAddHandler = (id?: string) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId('');
    }
    setShowInfo(true);

  };

  const closeAndRefetchHandler = (isReload?: boolean) => {
    setShowInfo(false);
    if (isReload) {
      actionRef.current?.reload();
    }
  };

  const onCardHandler = (id: string) => {
    setCurId(id);
    setShowCard(true);
  };

  const onDeleteHandler = (id: string) => {
    delHandler(id, () => actionRef.current?.reload());
  };

  const onStatusChangeHandler = (id: string, status: string) => {
    edit(id, {
      status,
    }, () => actionRef.current?.reload());
  };

  return (
    <PageContainer header={{ title: '当前门店下的订单' }}>
      <ProTable<IOrder>
        rowKey="id"
        form={{
          ignoreRules: false,
        }}
        loading={delLoading || editLoading || loading}
        actionRef={actionRef}
        columns={getColumns({
          onEditHandler: onClickAddHandler,
          onCardHandler,
          onDeleteHandler,
          onStatusChangeHandler,
        })}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        request={refetch}
      />
      {showInfo && <EditProduct id={curId} onClose={closeAndRefetchHandler} />}
      {showCard && <ConsumeCard id={curId} onClose={() => setShowCard(false)} />}
    </PageContainer>
  );
};

export default Product;
