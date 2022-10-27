import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/button";
import { loggedInData } from "../../utilities/loggedIn";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { postChat, fetchUserChats } from "../../utilities/slice/chatSlice";

const GroupChat: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chats.data);
  const loggedIn = loggedInData();
  const closeButton = <FontAwesomeIcon icon={faXmark} />;
  const [chat, setChat] = useState<string>("");
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchUserChats(loggedIn.id));
  }, [dispatch, loggedIn.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    setChat((event.target as HTMLInputElement).value);
  };

  const onSendSubmitHandler = async (): Promise<void> => {
    if (!chat) {
      alert("Chat input is required!");
      return;
    }

    const today = new Date();
    const dateSend =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0") +
      " " +
      String(today.getHours()).padStart(2, "0") +
      ":" +
      String(today.getMinutes()).padStart(2, "0") +
      ":" +
      String(today.getSeconds()).padStart(2, "0");

    interface ChatData {
      user: string;
      dateSend: string;
      message: string;
    }

    const chatData = {
      user: loggedIn.id,
      dateSend: dateSend,
      message: chat,
    } as ChatData;

    dispatch(postChat(chatData)).then(() => {
      setChat("");
    });

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
              {`[${chat.dateSend}] ${chat.chatUser.fullname} : ${chat.message}`}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="gc-footer">
        <span>{loggedIn.fullname}</span>
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
