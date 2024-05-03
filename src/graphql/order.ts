/* eslint-disable */
import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
query getOrders($page: PageInput!) {
  getOrders(page: $page){
    code
    message
    page {
      total
      pageNum
      pageSize
    }
    data {
      id
      quantity
      amount
      status
      outTradeNo
      studentId
      productId
    }
  }
}
`;

export const GET_ORDER = gql`
query getOrderInfo($id: String!) {
  getOrderInfo(id: $id){
    code
    message
    data {
      id
      quantity
      amount
      status
      outTradeNo
      studentId
      productId
    }
  }
}
`;

export const COMMIT_ORDER = gql`
mutation commitOrderInfo($params: PartialOrderInput!, $id: String) {
  commitOrderInfo(params: $params, id: $id) {
    code
    message
  }
}
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: String!) {
    deleteOrder(id: $id) {
      code
      message
    }
  }
`;
