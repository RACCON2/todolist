import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ListInsert from './ListInsert';
import ListTemplate from './ListTemplate';
import TodoList from './TodoList'

function App() {
  return (
    <ListTemplate>
      <TodoList>
      </TodoList>
    </ListTemplate>
  );
}

export default App;
