/* eslint-disable */
import { v4 as uuidv4 } from "uuid";

import { io, Socket } from "socket.io-client";

interface IMessage {
  messageId: string;
  sessionId: string;
  role: "customer" | "agent";
  message: string;
  userId: string;
  data?: any;
  time?: string;
  type?: "message" | "card";
}

export default class ChatService {
  private socket: Socket;
  private sessionId: string;
  private isAgent: boolean;
  private messageList: IMessage[] = [];
  private userId: string;
  private data: any = null;

  constructor(sessionId: string | undefined, isAgent: boolean, userId: string) {
    console.log(sessionId);
    if (sessionId) {
      this.sessionId = sessionId;
    } else {
      throw new Error("没有传入 sessionId");
    }
    this.isAgent = isAgent;
    this.userId = userId;
    this.socket = io("http://localhost:4000");

    this.bindEvents();
  }

  private messageLocks: string[] = [];

  public getIsAgent() {
    return this.isAgent;
  }

  public setMessageList(message: IMessage[]) {
    this.messageList = message;
  }

  public getMessageList(): IMessage[] {
    // 使用reduce方法去重
    const uniqueMessages = this.messageList.reduce(
      (acc: IMessage[], current: IMessage) => {
        // 检查acc数组中是否已经有相同messageId的消息
        const isDuplicate = acc.some(
          (msg) => msg.messageId === current.messageId
        );
        // 如果没有，将当前消息添加到acc数组中
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      },
      []
    );

    return uniqueMessages;
  }

  public setData(data: any) {
    this.data = data;
  }

  public disconnect() {
    this.socket.disconnect();
  }

  private bindEvents() {
    this.socket.on("connect", () => {
      console.log("连接到了服务器");
      this.startSession();
    });
    this.socket.on("disconnect", () => {
      console.log("断开了连接");
      this.startSession();
    });
    this.socket.on("sessionStarted", (data: any) => {
      console.log("Session started:", data);
      // 这里可以调用一个方法来处理会话开始的事件
    });

    this.socket.on("agentMessage", (message: IMessage) => {
      console.log("收到对方信息:", message);
      if (this.messageLocks.includes(message.messageId)) {
        return;
      }
      this.messageList.push(message);
      console.log(this.messageList);
    });

    this.socket.on("customerMessage", (message: IMessage) => {
      console.log("收到对方信息:", message);
      if (this.messageLocks.includes(message.messageId)) {
        return;
      }
      this.messageList.push(message);
      console.log(this.messageList);
    });
  }

  private getMessageBody(message: string): IMessage {
    return {
      messageId: uuidv4().toString(),
      sessionId: this.sessionId,
      message: message,
      role: this.isAgent ? "agent" : "customer",
      time: new Date().toLocaleTimeString(),
      data: null,
      userId: this.userId,
      type: "message",
    };
  }

  private getCardMessageBody(): IMessage {
    return {
      messageId: uuidv4().toString(),
      sessionId: this.sessionId,
      message: "",
      role: this.isAgent ? "agent" : "customer",
      time: new Date().toLocaleTimeString(),
      data: this.data,
      userId: this.userId,
      type: "card",
    };
  }

  private startSession() {
    this.socket.emit(
      "startSession",
      {
        sessionId: this.sessionId,
        isAgent: this.isAgent,
        userId: this.userId,
      },
      (response: any) => {
        if (response.status === "error") {
          console.error(response.message);
          // 处理启动会话失败的逻辑
        } else {
          console.log(response.message);
        }
      }
    );
  }

  public sendCustomerMessage(message: string, type: "card" | "message") {
    console.log("调用");

    if (this.isAgent) {
      throw new Error("Agent cannot send customer messages");
    }
    // 封装
    let messageBody: IMessage;
    if (type === "card") {
      messageBody = this.getCardMessageBody();
    } else {
      messageBody = this.getMessageBody(message);
    }
    this.messageList.push(messageBody);
    this.socket.emit("customerMessage", messageBody, (response: any) => {
      if (response.status === "error") {
        console.error(response.message);
        // 处理发送消息失败的逻辑
      } else {
        console.log(response.message);
      }
    });
  }

  public sendAgentMessage(message: string, type: "card" | "message") {
    if (!this.isAgent) {
      throw new Error("Customer cannot send agent messages");
    }
    // 封装
    let messageBody: IMessage;
    if (type === "card") {
      messageBody = this.getCardMessageBody();
    } else {
      messageBody = this.getMessageBody(message);
    }
    this.messageList.push(messageBody);
    this.socket.emit("agentMessage", messageBody, (response: any) => {
      if (response.status === "error") {
        console.error(response.message);
        // 处理发送消息失败的逻辑
      } else {
        console.log(response.message);
      }
    });
  }
}
