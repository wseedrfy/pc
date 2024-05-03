/* eslint-disable */
import axios from "axios";


const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export interface Session {
  id: string;
  customerId: string;
  agentId: string;
  createdTime: string;
  updatedTime: string;
  customerSocketId: string;
  agentSocketId: string | null;
  name: string;
  logo: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
}

export interface Message {
  id: string;
  sessionId: string;
  message: string;
  type: 'card' | 'message';
  data: any;
  createdTime: string;
  senderId: string;
  role: 'agent' | 'customer'
}


export class ChatRequest {
  private role: string;
  private userId: string;

  constructor(role: "agent" | "customer", userId: string) {
    this.role = role;
    this.userId = userId;
  }

  async get_all_sessions(): Promise<Session[]> {
    const res = await instance
      .post("/sessions/all", { 
        userId: this.userId,
        role: this.role,
      })
      .then((res) => res);
    return res.data;
  }
  async get_all_messages(
    sessionId: string | undefined
  ): Promise<Message[]> {
    console.log(sessionId);
    
    if (sessionId) {
      const res = await instance
        .post("/messages/all", {
          sessionId,
        })
        .then((res) => res);
      return res.data;
    }
    throw new Error("Session ID is required");
  }
  // async get_customer_messages(sessionId: string | undefined): Promise<Message[]> {
  //  if (sessionId){
  //    const res = await instance
  //      .post("/messages/customer", {
  //        data: {
  //          userId: this.userId,
  //          sessionId,
  //        },
  //      })
  //      .then((res) => res);
  //    return res.data;
  //  }
  //  throw new Error("Session ID is required");
  // }

  // async get_agent_messages(sessionId: string | undefined): Promise<Message[]> {
  //   if (sessionId){
  //     const res = await instance
  //       .post("/messages/agent", {
  //         data: {
  //           userId: this.userId,
  //           sessionId,
  //         },
  //       })
  //       .then((res) => res);
  //     return res.data;
  //   }
  //   throw new Error("Session ID is required");
  // }
}