import { Box, Flex, Input, Tag } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container } from "../../../components/Container";
import { ENDPOINT } from "../../../constants";
import { socket } from "../../../lib/Socket";
import Message from "../../../types/Message";

const Chat = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const { room, name } = router.query;

  socket.emit("join", { room, name }, () => {});

  useEffect(() => {
    return () => {
      socket.emit("disconnect");
    };
  }, [ENDPOINT, router.query]);

  useEffect(() => {
    socket.on("message", (message: Message) => {
      setMessages([...messages, message]);
    });
    setSentMessages([]);
  }, [messages]);

  const sendMessage = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <Container>
      <Flex
        flexDir="column"
        maxWidth={600}
        width="100%"
        maxHeight={800}
        height="100vh"
        borderRadius={4}
        overflow="hidden"
      >
        <Box height="100%" bg="gray.600" p={6}>
          {messages.map((message, key) =>
            message.user == "admin" ? (
              <Flex justifyContent="center" mb={2}>
                <Tag bg="gray.400" key={key}>
                  {message.text}
                </Tag>
              </Flex>
            ) : (
              <Flex mb={2}>
                <Tag
                  key={key}
                  ml={
                    message.user === name!.toString().toLowerCase()
                      ? "auto"
                      : "none"
                  }
                  bg={
                    message.user === name!.toString().toLowerCase()
                      ? "teal.200"
                      : "gray.100"
                  }
                >
                  {message.user}: {message.text}
                </Tag>
              </Flex>
            )
          )}
          {sentMessages.map((message, key) => (
            <Flex mb={2} opacity={0.5}>
              <Tag
                key={key}
                ml={
                  message.user === name!.toString().toLowerCase()
                    ? "auto"
                    : "none"
                }
                bg={
                  message.user === name!.toString().toLowerCase()
                    ? "teal.200"
                    : "gray.100"
                }
              >
                {message.user}: {message.text}
              </Tag>
            </Flex>
          ))}
        </Box>
        <Input
          borderRadius={0}
          value={message}
          placeholder="message"
          color="white"
          background="gray.700"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          variant="solid"
          onKeyPress={(event) => {
            if (event.key === "Enter" && message.length > 0) {
              sendMessage(event);
              setSentMessages([
                ...sentMessages,
                { user: name!.toString().toLowerCase(), text: message },
              ]);
            }
          }}
        />
      </Flex>
    </Container>
  );
};

export default Chat;
