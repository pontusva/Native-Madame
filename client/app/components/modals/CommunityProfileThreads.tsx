import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
interface Props {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  thread: {
    thread_id: number;
    comment_id: number;
    content: string;
  } | null;
}

interface RetrievedReplies {
  comments: {
    content: string;
    id: number;
  }[];
}

const CommunityProfileThreads = ({
  modalVisible,
  setModalVisible,
  thread,
}: Props) => {
  const [reply, setReply] = useState('');
  const [retrievedReplies, setRetrievedReplies] =
    useState<RetrievedReplies | null>(null);
  console.log(thread);
  const replyToComment = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.237:8080/community-searcher/comments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: reply,
            comment_id: thread?.comment_id,
            thread_id: thread?.thread_id,
            user_uid: getAuth().currentUser?.uid,
          }),
        }
      );
      if (response.ok) {
        getComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    const response = await fetch(
      `http://192.168.1.237:8080/community-searcher/comments/${thread?.comment_id}`
    );
    const data = await response.json();

    setRetrievedReplies(data);
  };

  useEffect(() => {
    thread && getComments();
  }, [thread?.comment_id]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: 300,
              }}>
              <TextInput
                label="Skriv något"
                value={reply}
                onChangeText={text => setReply(text)}
                onSubmitEditing={() => reply !== '' && replyToComment()}
              />
            </View>
            <ScrollView contentContainerStyle={styles.modalScrollView}>
              {thread && <Text style={styles.modalText}>{thread.content}</Text>}
              {retrievedReplies &&
                retrievedReplies.comments.map((comment, index) => {
                  console.log(comment);
                  return (
                    <View key={comment.id}>
                      <Text>{comment.content}</Text>
                    </View>
                  );
                })}
            </ScrollView>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 350,
    height: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalScrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CommunityProfileThreads;
