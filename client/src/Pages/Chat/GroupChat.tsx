import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/button";

// import { LoggedIn } from "../../Utilitites/LoggedIn";
// import { SocketConnect } from "../../Utilitites/Socket";
// import { useDispatch, useSelector } from "react-redux";
// import { postChat, fetchChats } from "../../Utilitites/Slice/ChatSlice";

const GroupChat: React.FC = () => {
  
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const chats = useSelector((state) => state.chat.data);
  const chats:string[] = [];
  // const socket = SocketConnect();
  // const loggedIn = LoggedIn();
  const closeButton = <FontAwesomeIcon icon={faXmark} />;
  const [chat, setChat] = useState("");
  const bottomRef = useRef(null);

  // useEffect(() => {
  //   dispatch(fetchChats());
  // }, [dispatch]);

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [chats]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    setChat((event.target as HTMLInputElement).value);
  };

  const onSendSubmitHandler = async (): Promise<void> => {
    if (!chat) {
      alert("Chat input is required!");
      return;
    }

    // const today = new Date();
    // const dateSend =
    //   today.getFullYear() +
    //   "-" +
    //   String(today.getMonth() + 1).padStart(2, "0") +
    //   "-" +
    //   String(today.getDate()).padStart(2, "0") +
    //   " " +
    //   String(today.getHours()).padStart(2, "0") +
    //   ":" +
    //   String(today.getMinutes()).padStart(2, "0") +
    //   ":" +
    //   String(today.getSeconds()).padStart(2, "0");

    // const chatData = {
    //   userId: loggedIn.userId,
    //   userName: loggedIn.fullname,
    //   dateSend: dateSend,
    //   message: chat,
    // };

    // const newChat = {
    //   userId: { fullname: loggedIn.fullname },
    //   dateSend: dateSend,
    //   message: chat,
    // };

    // dispatch(postChat({ chatData, newChat })).then(() => {
    //   setChat("");
    //   socket.emit("send_message", { message: newChat });
    // });

    return;
  };
  return (
    <div className="main">
      <div className="gc-header">
        GroupChat<div className="gc-close">{closeButton}</div>
      </div>
      <div className="gc-body">
        <div id="message-container">
          {chats.map((chat, i) => (
            <div key={i} className="gc-message">
              {/* {`[${chat.dateSend}] ${chat.user.fullname} : ${chat.message}`} */}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="gc-footer">
        <span>{/*loggedIn.fullname*/}</span>
        <input name="chat" value={chat} onChange={onChangeHandler}></input>

        <Button
          name="send"
          text="Send"
          variant="light"
          onClick={onSendSubmitHandler}
        />
        <Button
          name="refresh"
          text="Refresh"
          variant="light"
          onClick={() => navigate(0)}
        />
      </div>
    </div>
  );
};

export default GroupChat;
