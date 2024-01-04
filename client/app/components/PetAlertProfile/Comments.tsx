import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { create } from 'zustand';

interface CommentsProps {
  threadId: number | undefined;
}

interface GetComments {
  comments: {
    id: number;
    content: string;
    created_at: string;
    parent_comment_id: number;
    thread_id: number;
    user_uid: string;
  }[];
}

export default function Comments({ threadId }: CommentsProps) {
  const [comments, setComments] = useState<string>('');
  const [retrievedComments, setRetrievedComments] =
    useState<GetComments | null>(null);

  const handleComments = async () => {
    const response = await fetch(
      'http://192.168.1.237:8080/pet-alert-profile/comments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comments,
          thread_id: threadId,
          user_uid: getAuth().currentUser?.uid,
        }),
      }
    );
    const data = await response.json();
  };

  const getComments = async () => {
    const response = await fetch(
      `http://192.168.1.237:8080/pet-alert-profile/comments/${threadId}`
    );
    const data = await response.json();
    setRetrievedComments(data);
  };

  useEffect(() => {
    threadId && getComments();
  }, []);

  return (
    <View>
      <TextInput
        value={comments}
        onChangeText={text => setComments(text)}
        onSubmitEditing={handleComments}
      />
    </View>
  );
}
