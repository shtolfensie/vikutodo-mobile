import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet } from 'react-native';
import { Colors, ListItem, Text } from 'react-native-ui-lib';
import Drawer from 'react-native-ui-lib/src/components/drawer';
import View from 'react-native-ui-lib/src/components/view';

const queryClient = new QueryClient()

export default function App() {
  return (
<QueryClientProvider client={queryClient}>
    <View style={styles.container}>
      <Todos/>
      <StatusBar style="auto" />

    </View>
</QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});


function Todos() {

  const {data: todos, isSuccess, isLoading} = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  if (isLoading) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    // <FlatList
    //   data={todos}
    //   renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
    // />

    <View width="100%">
    {todos.map(t => 
        <Drawer
          rightItems={[{text: 'Read', background: Colors.blue30, onPress: () => console.log('read pressed')}, {text: 'Mute', background: Colors.gray30, onPress: () => console.log('mute pressed')}]}
          leftItem={{text: 'Delete', background: Colors.red30, onPress: () => console.log('delete pressed')}}
          width="100%"
          fullLeftThreshold={0.18}
          fullSwipeLeft={true}
          onFullSwipeLeft={() => console.log("left")}
        >
          <View centerV padding-s4 bg-white style={{height: 50}}>
            <Text >{t.title}</Text>
          </View>
        </Drawer>
    )}
    </View>
  )
}

type Todo = {
  id: number,
  title: string,
  description: string,
  done: boolean,
  done_at: string,
  due_date: string,
  reminder_dates: null | string[],
  list_id: number,
  repeat_after: number,
  repeat_mode: number,
  priority: number,
  start_date: string,
  end_date: string,
  assignees: null,  // TODO(filip): 
  labels: null, // TODO(filip): 
  hex_color: string,
  percent_done: number,
  identifier: string,
  index: number,
  related_tasks: {},
  attachments: null, // TODO(filip): 
  cover_image_attachment_id: number,
  is_favorite: boolean,
  created: string,
  updated: string,
  bucket_id: number,
  position: number,
  kanban_position: number,
  created_by: {
    id: number,
    name: string,
    username: string,
    created: string,
    updated: string
  }
}

const BASE_API = "http://192.168.0.107:3456/api/v1";

async function getTodos(): Promise<Todo[]> {
  const t = await fetch(`${BASE_API}/tasks/all`, {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBoaWxsaXBzdG9sZmFAZ21haWwuY29tIiwiZW1haWxSZW1pbmRlcnNFbmFibGVkIjpmYWxzZSwiZXhwIjoxNjg5NzEwNTQ0LCJpZCI6MSwiaXNMb2NhbFVzZXIiOnRydWUsImxvbmciOnRydWUsIm5hbWUiOiIiLCJ0eXBlIjoxLCJ1c2VybmFtZSI6ImZpbGlwIn0.R9hZeAgVp2e-Tit2l2ociO-Z0X_KjEWdXgIsmpNQZIg",

    }
  });
  const b = await t.json() as Todo[];
  return b;
}

