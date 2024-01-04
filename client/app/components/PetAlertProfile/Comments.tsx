import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

interface CommentsProps {
  threadId: number | undefined;
}

export default function Comments({ threadId }: CommentsProps) {
  const [comments, setComments] = useState<string>('');

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
    console.log(data);
  };

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
