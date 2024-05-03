/* eslint-disable */
import { List, Avatar, Button } from "antd";
import { ChatRequest, Session } from "@/services/chatApi";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/userHooks";
import dayjs from "dayjs";
import { useGoTo } from "@/hooks";
import { ROUTE_KEY } from "@/routes/menus";
import { PageContainer } from "@ant-design/pro-components";

const ChatList = () => {
  const { go } = useGoTo();
  const { store } = useUserContext();
  const userId = store.id;
  const [chatRequest, setChatRequest] = useState<ChatRequest | null>(null);
  const [chatList, setChatList] = useState<any>([]);
  const role = "agent";

  // 从服务器获取所有的信息
  useEffect(() => {
    getChatList()
  }, [userId]); // 将userId添加到依赖数组中

  console.log(chatList, "123");
  const getChatList = async () => {
    const chatRequest: ChatRequest = new ChatRequest(role, userId);
    setChatRequest(chatRequest);
    console.log(role, userId);
    await chatRequest.get_all_sessions().then((res) => setChatList(res));
    setChatRequest(chatRequest);
  };
  
  // 每 2 秒获取一次聊天列表
  useEffect(() => {
    const interval = setInterval(() => {
      getChatList();
    }, 2000);
    return () => clearInterval(interval);
  })

  const formatTime = (time: string) => {
    return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
  };

  const getMessages = (sessionId: string) => {
    go(ROUTE_KEY.CHAT, { id: sessionId });
  };

  return (
    <div>
      <PageContainer header={{ title: "聊天列表" }}>
        <List header="聊天列表" size="small">
          {chatList.map((item: Session, index: number) => (
            <List.Item key={index} onClick={() => getMessages(item.id)}>
              <List.Item.Meta
                key={index}
                avatar={<Avatar src={item.studentAvatar} />}
                title={item.studentName}
                description={`${formatTime(item.createdTime)} 咨询门店: ${
                  item.name
                }`}
              />
              {/* {item.name} */}
              <Button>进入对话</Button>
            </List.Item>
          ))}
        </List>
      </PageContainer>
    </div>
  );
};

export default ChatList;