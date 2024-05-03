/* eslint-disable */
// Chat.tsx
import { useState, useEffect, useCallback } from "react";
import ChatService from "@/services/chat";
import { Button, Input } from "antd";
import { SendOutlined, LeftOutlined } from "@ant-design/icons";
import ChatdataCard from "@/components/ChatdataCard";
import style from "./index.module.less";
import { useUserContext } from "@/hooks/userHooks";
import { useProductInfo } from "@/services/product";
import { useParams } from "react-router-dom";
import { ChatRequest } from "@/services/chatApi";
import dayjs from "dayjs";
import { DotLoading } from "antd-mobile";
import { useGoTo } from "@/hooks";
import { ROUTE_KEY } from "@/routes/menus";


interface Message {
  messageId: string | undefined;
  sessionId: string;
  role: "customer" | "agent";
  message: string;
  userId: string;
  data?: any;
  time?: string;
  type?: "message" | "card";
}
export const Chat = () => {
  const { id, productId } = useParams();
  const isAgent = true;
  const role = "agent";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatService, setChatService] = useState<ChatService | null>(null);
  const { data } = useProductInfo(productId || ""); // 查询商品的信息
  const { store } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const studentId = store.id;
  console.log(studentId);
  const { go } = useGoTo();
  useEffect(() => {
    const fetchMessages = async () => {
      console.log(id);
      
      const chatService = new ChatService(id, isAgent, studentId);
      setChatService(chatService);
      const chatRequest = new ChatRequest(role, studentId);

      if (chatRequest) {
        setIsLoading(true);
        const res = await chatRequest.get_all_messages(id);
        console.log(res);
        const transformedArray = res.map((item) => ({
          messageId: item.id,
          sessionId: item.sessionId,
          role: item.role,
          message: item.message,
          userId: item.senderId,
          data: item.data !== "null" ? JSON.parse(item.data) : undefined,
          time: dayjs(item.createdTime).format("YYYY-MM-DD HH:mm:ss"),
          type:
            item.type === "message" || item.type === "card"
              ? item.type
              : undefined,
        }));
        console.log(transformedArray);

        chatService.setMessageList(transformedArray);
        setIsLoading(false);
      }
    };

    fetchMessages();

    return () => {
      if (chatService) {
        // 确保chatService已经被初始化
        chatService.disconnect();
      }
    };
  }, []); // 空数组意味着这个effect只会在组件挂载时执行一次

  const receiveMessage = useCallback(() => {
    if (chatService) {
      const messageList = chatService.getMessageList();
      setMessages([...messageList]);
    }
  }, [chatService, setMessages]);

  useEffect(() => {
    const timer = setInterval(() => {
      receiveMessage();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [receiveMessage]);

  // 发送信息的方法
  const sendMessage = () => {
    if (chatService && message) {
      // 封装好 message 发过去
      if (!chatService.getIsAgent()) {
        chatService.sendCustomerMessage(message, "message");
      } else {
        chatService.sendAgentMessage(message, "message");
      }
      receiveMessage();
      setMessage("");
    }
  };

  // // 消息列表滚动到底部
  // useEffect(() => {
  //   const chatMessages = document.querySelector(`.${style.chatMessages}`);
  //   if (chatMessages) {
  //     chatMessages.scrollTop = chatMessages.scrollHeight;
  //   }
  // }, [messages]);

  const insertProductCard = () => {
    if (chatService) {
      // 设置 data
      chatService.setData(data);
      chatService.sendCustomerMessage("", "card");
      chatService.setData(null);
    }

    receiveMessage();
    setMessage("");
  };

  return (
    <div className={style.chatContainer}>
      <div className={style.menu}>
        <LeftOutlined onClick={() => go(ROUTE_KEY.CHAT_LIST)} />
      </div>
      {isLoading && <DotLoading />}
      <div className={style.chatMessages}>
        {messages.map((msg, index) => (
          <div key={index} className={style.messageWrapper}>
            {msg.data ? (
              <ChatdataCard data={msg.data} />
            ) : (
              <div
                className={
                  msg.role === "customer"
                    ? style.customerMessage
                    : style.agentMessage
                }
              >
                {msg.message}
                <div className={style.messageTime}>{msg.time}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={style.inputContainer}>
        <Input
          className={style.inputComponent}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="请输入消息..."
          onPressEnter={sendMessage}
        />
        <Button
          className={style.sendMessageButton}
          onClick={sendMessage}
          type="primary"
        >
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
};
