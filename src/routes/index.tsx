/* eslint-disable */
import Home from '@/containers/Home';
import My from '@/containers/My';
import Page404 from '@/containers/Page404';
import Org from '@/containers/Org';
import NoOrg from '@/containers/NoOrg';
import Student from '@/containers/Student';
import Course from '@/containers/Course';
import Product from '@/containers/Product';
import Teacher from '@/containers/Teacher';
import Order from '@/containers/Order';
import ChatList from '@/containers/ChatList';
import { Chat } from '@/containers/Chat';
import { ROUTE_KEY } from './menus';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG]: Org,
  [ROUTE_KEY.COURSE]: Course,
  [ROUTE_KEY.NO_ORG]: NoOrg,
  [ROUTE_KEY.STUDENT]: Student,
  [ROUTE_KEY.PRODUCT]: Product,
  [ROUTE_KEY.TEACHER]: Teacher,
  [ROUTE_KEY.ORDER]: Order,
  [ROUTE_KEY.PAGE_404]: Page404,
  [ROUTE_KEY.CHAT_LIST]: ChatList,
  [ROUTE_KEY.CHAT]: Chat,
};
