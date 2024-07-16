import { useState } from "react";
import "./style.css";
import { v4 as uuidv4 } from 'uuid';

function App() {
  // const [todos, setTodos] = useState(['todo1', 'todo2'])
  const [todos, setTodos] = useState([
    { id: uuidv4(), title: 'todo1', status: '未着手', detail: 'testtesttest' },
    { id: uuidv4(), title: 'todo2', status: '着手', detail: 'testtesttest' },
    { id: uuidv4(), title: 'todo3', status: '完了', detail: 'testtesttest' }
  ])

  const statuses = ['未着手', '着手', '完了']

  //todoAdd
  const [todoText, setTodoText] = useState('')
  const onChangeTodoText = (event) => setTodoText(event.target.value)

  const [detailText, setDetailText] = useState('')
  const onChangeDetailText = (event) => setDetailText(event.target.value)

  const [statusSelect, setStatusSelect] = useState('未着手')
  const onChangeStatus = (event) => setStatusSelect(event.target.value)

  const onClickAdd = () => {
    const newTodo = { id: uuidv4(), title: todoText, status: statusSelect, detail: detailText }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
    setTodoText('')
    setDetailText('')
    setStatusSelect('未着手')
  }

  //todoEdit
  const [editTodo, setEditTodo] = useState({ id: '', title: '', status: '', detail: '' })
  const onClickEdit = (todo) => setEditTodo(todo)
  const editTodoText = (event) => setEditTodo((prev) => { return { ...prev, title: event.target.value } })
  const editTodoDetail = (event) => setEditTodo((prev) => ({ ...prev, detail: event.target.value })) //オブジェクトはかっこで囲ったらreturn を削除してもいい
  const editTodoStatus = (event) => setEditTodo((prev) => ({ ...prev, status: event.target.value }))

  //todoUpdate
  const onClickUpdate = () => {
    const updateTodos = todos.map((todo) => todo.id === editTodo.id ? editTodo : todo)
    setTodos(updateTodos)
    setEditTodo({ id: '', title: '', status: '', detail: '' })
  }

  //todoDelete
  const onClickDelete = (deleteTodo) => {
    setTodos(todos.filter((todo) => todo.id !== deleteTodo.id))
  }

  return (
    <div className="body">
      <h1>TODO一覧</h1>

      <div>
        <input type="text" placeholder="タイトルを入力" value={todoText} onChange={onChangeTodoText} />
        <input type="text" placeholder="詳細を入力" value={detailText} onChange={onChangeDetailText} />
        <select value={statusSelect} onChange={onChangeStatus}>
          {statuses.map((status) => {
            return <option key={status}>{status}</option>
          })}
        </select>
        <button onClick={onClickAdd}>新規作成</button>
      </div>

      <div>
        <input type="text" placeholder="タイトルを入力" value={editTodo.title} onChange={editTodoText} />
        <input type="text" placeholder="詳細を入力" value={editTodo.detail} onChange={editTodoDetail} />
        <select value={editTodo.status} onChange={editTodoStatus} >
          {statuses.map((status) => {
            return <option key={status}>{status}</option>
          })}
        </select>
        <button onClick={onClickUpdate}>編集完了</button>
      </div>

      <table className="todo-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>タイトル</th>
            <th>ステータス</th>
            <th>詳細</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td>{todo.title}</td>
              <td>{todo.status}</td>
              <td>{todo.detail}</td>
              <td><button onClick={() => onClickEdit(todo)}>編集</button></td>
              <td><button onClick={() => onClickDelete(todo)}>削除</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
