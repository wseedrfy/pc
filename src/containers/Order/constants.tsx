/* eslint-disable */
import { IOrder } from '@/utils/orderType';
import { IProduct } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import {
  Image, Popconfirm, Space,
} from 'antd';

interface IProps {
  onEditHandler: (id: string) => void;
  onCardHandler: (id: string) => void;
  onDeleteHandler: (id: string) => void;
  onStatusChangeHandler: (id: string, status: string) => void;
}

const PRODUCT_STATUS = {
  LIST: 'LIST',
  UN_LIST: 'UN_LIST',
};

export const getColumns: (props: IProps) => ProColumns<IOrder, 'text'>[] = ({
  onEditHandler,
  onCardHandler,
  onDeleteHandler,
  onStatusChangeHandler,
}) => [
  {
    dataIndex: 'id',
    title: '#',
    valueType: 'indexBorder',
    search: false,
    align: 'center',
    width: 50,
  },
  {
    title: '封面',
    dataIndex: 'coverUrl',
    search: false,
    align: 'center',
    width: 100,
    render: (_, record: IOrder) => <Image src={"https://mooc-drop.oss-cn-beijing.aliyuncs.com/03f6cff6-6f28-4006-8c96-ed9435107513.jpg"} />,
  },
  {
    title: '订单id',
    dataIndex: 'id',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项必填',
        },
      ],
    },
  },
  {
    title: '商品id',
    dataIndex: 'productId',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项必填',
        },
      ],
    },
  },
  {
    title: '学生id',
    dataIndex: 'studentId',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项必填',
        },
      ],
    },
  },
  {
    title: 'outTradeNo',
    search: false,
    dataIndex: 'outTradeNo',
    width: 80,
  },
  {
    title: '实付款(元)',
    search: false,
    dataIndex: 'amount',
    width: 80,
  },
  {
    title: '数量',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'quantity',
  },
  {
    title: '订单状态',
    search: false,
    width: 50,
    align: 'center',
    dataIndex: 'status',
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 200,
    render: (text, entity) => (
      <Space>
        <a
          key="edit"
          onClick={() => onEditHandler(entity.id)}
        >
          编辑
        </a>
        <Popconfirm
          title="提醒"
          description="确认要删除吗？"
          onConfirm={() => onDeleteHandler(entity.id)}
        >
          <a
            key="delete"
            type="link"
            style={{
              color: 'red',
            }}
          >
            删除
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];
