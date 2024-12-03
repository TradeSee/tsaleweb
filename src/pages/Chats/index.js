import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import { authScreen } from "../../contexts/auth";
import { database } from "../../database/config";

import {
  getChats,
  getMensagens,
  salvarMensagem,
  getCompanyName,
} from "../../hooks/chats";
import getUserInfo from "../../hooks/getUsers";

import Drawer from "../../components/Drawer";
import LoadingPage from "../../components/LoadingPage";

import {
  AllChats,
  Chat,
  ChatCard,
  ChatContent,
  ChatHeader,
  Container,
  Empty,
  Message,
  SendMessage,
} from "./styles";
import { ContainerHome } from "../../assets/styles";

import Logo from "../../icons/T-SaleMetals-03.png";
import magnifierQuestion from "../../icons/magnifier-question.svg";
import ChatsEmpty from "./assets/chat.svg";

import formatDate, { getHours } from "./utils/formatDate";
import Spinner from "../../components/Spinner";

function ChatContainer({ chat, selectedChat, setSelectedChat, userId }) {
  const messages = Object.values(chat.messages);
  const [senderId, setSenderId] = useState("");
  const [name, setName] = useState("John Doe");

  useEffect(() => {
    if (chat.user1 !== userId) {
      return setSenderId(chat.user1);
    }

    return setSenderId(chat.user2);
  }, [chat, userId]);

  useEffect(() => {
    if (senderId !== "") {
      getCompanyName(senderId).then((res) => setName(res));
    }
  }, [senderId]);

  return (
    <ChatCard
      key={senderId}
      onClick={() => setSelectedChat(chat)}
      isSelected={
        selectedChat?.user1 === chat.user1 && selectedChat?.user2 === chat.user2
      }
    >
      <img src={Logo} alt="Logo" />

      <div>
        <header>
          <strong>{name}</strong>

          <span>{formatDate(messages[messages.length - 1].date)}</span>
        </header>

        <span>{messages[messages.length - 1].text}</span>
      </div>
    </ChatCard>
  );
}

export default function Chats() {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isChatsLoading, setIsChatsLoading] = useState(true);
  const [name, setName] = useState("John Doe");
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [actualMessages, setActualMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [senderId, setSenderId] = useState("");

  const navigate = useNavigate();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [actualMessages]);

  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        setTimeout(() => {
          setAuth(true);
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  });

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        try {
          const userData = await getUserInfo();
          setUserInfo(userData);
        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
        }
      };

      fetchData();
    }
  }, [auth]);

  useEffect(() => {
    setLoading(true);
    if (userInfo?.uid) {
      getChats(userInfo.uid)
        .then((res) => setChats(Object.values(res)))
        .finally(() => setLoading(false));
    }
  }, [userInfo]);

  useEffect(() => {
    if (senderId !== "") {
      getCompanyName(senderId).then((res) => setName(res));
    }
  }, [senderId]);

  useEffect(() => {
    setIsChatsLoading(true);
    if (userInfo && senderId) {
      getMensagens(userInfo.uid, senderId)
        .then((res) => {
          setActualMessages(Object.values(res));
        })
        .finally(() => setIsChatsLoading(false));
    }
  }, [userInfo, senderId]);

  useEffect(() => {
    const handleNewMessage = (snapshot) => {
      const newMessage = snapshot.val();
      setActualMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    if (selectedChat) {
      const compositeKey = [selectedChat.user1, selectedChat.user2]
        .sort()
        .join("_");
      const chatsRef = database
        .ref("messages")
        .orderByChild("compositeKey")
        .equalTo(compositeKey);

      const listener = chatsRef.on("value", (snapshot) => {
        setActualMessages([]);
        if (snapshot.exists()) {
          const messages = snapshot.val();
          const messagesArray = Object.values(messages).map(
            (chat) => chat.messages
          );
          setActualMessages(Object.values(messagesArray[0]));
        }
      });

      return () => {
        chatsRef.off("value", listener);
      };
    }
  }, [selectedChat]);

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  function isMineMessage(senderId) {
    return senderId === userInfo.uid;
  }

  function handleSelectChat(chat) {
    setSelectedChat(chat);
    if (chat.user1 !== userInfo.uid) {
      return setSenderId(chat.user1);
    }

    return setSenderId(chat.user2);
  }

  function sendMessage(e) {
    e.preventDefault();
    const actualDate = new Date();

    const messageObj = {
      senderId: userInfo.uid,
      text: message,
      date: actualDate.toISOString(),
    };

    salvarMensagem(selectedChat.user1, selectedChat.user2, messageObj).finally(
      () => setMessage("")
    );
  }

  return (
    <>
      {auth && !loading ? (
        <ContainerHome>
          <Grid
            container
            style={{
              height: "100%",
            }}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            <Grid
              item
              xs={toggleDrawer ? 10 : 11}
              container
              alignItems="center"
            >
              <Container>
                <AllChats>
                  {chats.length > 0 &&
                    chats.map((chat) => (
                      <ChatContainer
                        chat={chat}
                        selectedChat={selectedChat}
                        setSelectedChat={handleSelectChat}
                        userId={userInfo.uid}
                        key={chat.user1}
                      />
                    ))}

                  {chats.length === 0 && (
                    <Empty>
                      {" "}
                      <img src={ChatsEmpty} alt="Magnifier Question" />
                      <h2>
                        Looks like you do not have any Chat yet, click on the
                        button below to search for a company and start a new
                        chat.
                      </h2>
                      <button onClick={() => navigate("/myCompany")}>
                        Start a new chat
                      </button>
                    </Empty>
                  )}
                </AllChats>

                {selectedChat !== null && (
                  <Chat>
                    <ChatHeader>
                      <img src={Logo} alt="Logo" />

                      <h2>{name}</h2>
                    </ChatHeader>

                    {actualMessages.length > 0 && !isChatsLoading && (
                      <ChatContent>
                        {actualMessages.map((message, index) => (
                          <Message
                            key={`${index}`}
                            isMine={isMineMessage(message.senderId)}
                          >
                            <p>{message.text}</p>
                            <div
                              className={`arrow ${
                                isMineMessage(message.senderId)
                                  ? "left"
                                  : "right"
                              } `}
                            />

                            <span className="hour">
                              {getHours(message.date)}
                            </span>
                          </Message>
                        ))}

                        <div ref={messagesEndRef} />
                      </ChatContent>
                    )}

                    {isChatsLoading && (
                      <ChatContent
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Spinner size={90} />
                      </ChatContent>
                    )}

                    <SendMessage>
                      <input
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        placeholder="Message"
                      />

                      <button onClick={sendMessage}>&#10146;</button>
                    </SendMessage>
                  </Chat>
                )}
              </Container>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
