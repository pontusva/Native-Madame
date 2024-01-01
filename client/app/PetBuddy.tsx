import 'react-native-get-random-values';
import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GiftedChat } from 'react-native-gifted-chat';
import { getAuth } from 'firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
import { Modal, View } from 'react-native';

type Message = {
  _id: string | number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
};
export function PetPuddy() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const petBuddyChat = async (messageText: string) => {
    setIsLoading(true);
    const response = await fetch('http://192.168.1.237:8080/openai/oai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: getAuth().currentUser!.uid,
        chatMsg: messageText,
      }),
    });
    const result = await response.json();
    console.log(result.messages.body.data[0].content[0].text.value);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {
          _id: uuidv4(),
          text: result.messages.body.data[0].content[0].text.value,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    );
    setIsLoading(false);
  };

  const onSend = useCallback((messages: Message[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    petBuddyChat(messages[0].text);
  }, []);

  return (
    <>
      <Modal transparent={true} visible={isLoading}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={50} animating={true} color="#000" />
        </View>
      </Modal>
      <GiftedChat
        messages={messages}
        onSend={(messages: Message[]) => {
          const convertedMessages: Message[] = messages.map(message => ({
            ...message,
            createdAt: new Date(message.createdAt),
          }));
          onSend(convertedMessages);
        }}
        user={{
          _id: 1,
        }}
      />
    </>
  );
}
export default PetPuddy;
