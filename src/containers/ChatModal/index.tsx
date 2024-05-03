/* eslint-disable */
import { Modal } from "antd";
import { Chat } from "@/containers/Chat";

export default function ChatModal(props: any){
  const { isOpenChat, setIsOpenChat } = props;

  return (
    <Modal 
    title="Basic Modal" 
    open={isOpenChat} 
    footer={null} 
    onCancel={() => {setIsOpenChat(false)}}
    destroyOnClose={true}
    >
      <Chat/>
    </Modal>
  );
}