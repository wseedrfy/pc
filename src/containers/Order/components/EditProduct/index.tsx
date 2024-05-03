/* eslint-disable */
import {
  Button,
  Col,
  Divider,
  Drawer, Form, Input, InputNumber, Row, Space, Spin,
} from 'antd';
import UploadImage from '@/components/OSSImageUpload';
import { useEditProductInfo, useProductInfo } from '@/services/product';
import { useState } from 'react';
import TypeSelect from '@/components/TypeSelect';
import { useEditOrderInfo, useOrderInfo } from '@/services/order';

const { TextArea } = Input;

interface IProps {
  id?: string;
  onClose: (isReload?: boolean) => void;
}

/**
* 创建/编辑商品
*/
const EditCourse = ({
  onClose,
  id,
}: IProps) => {
  const [form] = Form.useForm();
  const [edit, editLoading] = useEditOrderInfo();
  // const { data, loading } = useProductInfo(id);
  const { data, loading } = useOrderInfo(id);
  const [open, setOpen] = useState(true);

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      const newValues = {
        ...values,
      };
      edit(id, newValues, onClose);
    }
  };

  return (
    <Drawer
      title={id ? '编辑订单' : '没有id'}
      width={900}
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={(o) => !o && onClose()}
      extra={(
        <Space>
          <Button onClick={() => onClose()}>取消</Button>
          <Button loading={editLoading} onClick={onSubmitHandler} type="primary">
            提交
          </Button>
        </Space>
      )}
    >
      <Spin spinning={loading}>
        {(data || !id) && (
        <Form
          form={form}
          initialValues={data}
        >
          <Row gutter={20}>
            <Col span={18}>
              <Form.Item
                style={{ width: '100%' }}
                label="商品id"
                name="productId"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={18}>
              <Form.Item
                style={{ width: '100%' }}
                label="学生id"
                name="studentId"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={18}>
              <Form.Item
                style={{ width: '100%' }}
                label="outTradeNo"
                name="outTradeNo"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
          <Col span={6}>
              <Form.Item
                label="实付款(元)"
                name="amount"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="购买数量"
                name="quantity"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="订单状态"
                name="status"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        )}
      </Spin>
    </Drawer>
  );
};

EditCourse.defaultProps = {
  id: '',
};

export default EditCourse;
