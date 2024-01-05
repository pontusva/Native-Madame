import { Dispatch, SetStateAction } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
interface CommentModalProps {
  commentModalVisibile: boolean;
  setCommentModalVisibile: Dispatch<SetStateAction<boolean>>;
  comments: string;
  setComments: Dispatch<SetStateAction<string>>;
  handleComments: () => void;
}

const CommentModal = ({
  commentModalVisibile,
  setCommentModalVisibile,
  comments,
  setComments,
  handleComments,
}: CommentModalProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={commentModalVisibile}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setCommentModalVisibile(!commentModalVisibile);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: 300,
                height: 150,
                justifyContent: 'center',
              }}>
              <TextInput
                label="Skriv något"
                value={comments}
                onChangeText={text => setComments(text)}
                onSubmitEditing={handleComments}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setCommentModalVisibile(!commentModalVisibile)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
              <Pressable
                style={[styles.button]}
                onPress={() => setCommentModalVisibile(!commentModalVisibile)}>
                <Text style={styles.textStyle}>Skicka Meddelande</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setCommentModalVisibile(true)}>
        <Text style={styles.textStyle}>Kommentera</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CommentModal;
