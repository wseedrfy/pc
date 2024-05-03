/* eslint-disable */
export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface Course {
  name: string;
  desc: string;
  group: string;
  baseAbility: string;
  limitNumber: number;
  duration: number;
  reserveInfo: string;
  refundInfo: string;
  otherInfo: string;
  coverUrl: string;
  org: Organization;
  cards: Card;
}


export interface Card {
  name: string;
  type: string;
  time: number;
  validityDay: number;
  course?: Course;
  org: Organization;

}


export interface Wxorder {
  appid: string;
  mchid: string;
  openid: string;
  trade_type: string;
  trade_state: string;
  bank_type: string;
  transaction_id: string;
  out_trade_no: string;
  attach: string;
  trade_state_desc: string;
  success_time: string;
  total: number;
  payer_total: number;
  currency: string;
  payer_currency: string;
  org?: Organization;
  order?: IOrder;
}

export interface Student {
  name: string;
  tel: string;
  avatar: string;
  password: string;
  account: string;
  openid?: string;
}

export interface Product {
  name: string;
  desc: string;
  type: string;
  status: string;
  stock: number;
  curStock: number;
  buyNumber: number;
  limitBuyNumber: number;
  coverUrl: string;
  bannerUrl: string;
  originalPrice: number;
  preferentialPrice: number;
  org: Organization;
  cards: Card[];
}

export interface Organization {
  businessLicense: string;
  identityCardFrontImg: string;
  identityCardBackImg: string;
  tags: string;
  description: string;
  name: string;
  logo: string;
  address: string;
  longitude: string;
  latitude: string;
  tel: string;
  courses: Course[];
  cards: Card[];
  products: Product[];
}

export interface IOrder {
  id:string;
  quantity: number;
  amount: number;
  status: string;
  outTradeNo:string;
  studentId:Date;
  productId: string;
}



export type TOrdersQuery = { [key: string]: { __typename?: 'Query', data: IOrder[], page: IPage } };

export type TOrderInfoQuery = { [key: string]: { __typename?: 'Query', data: IOrder[], page: IPage } };

export type TBaseOrder = Partial<IOrder>;

