import React, { useState } from "react";
import "./style.css";
// import { v4 as uuidv4 } from 'uuid';
// import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import dayjs from 'dayjs';
import CreateTodo from "./components/CreateTodo";
import UpdateTodo from "./components/UpdateTodo";
import Todos from "./components/Todos";
import FilterStatus from "./components/FilterStatus";

function App() {

  const today = dayjs().format('YYYY/MM/DD')

  // const [todos, setTodos] = useState(['todo1', 'todo2'])
  const [todos, setTodos] = useState([
    // { id: uuidv4(), title: 'todo0', status: '未着手', detail: 'testtesttest', deadLine: today }, uuidで出すとこれ
    { id: 1, title: 'todo1', status: '未着手', detail: 'testtesttest', deadLine: "2024/07/17" },
    { id: 2, title: 'todo2', status: '着手', detail: 'testtesttest', deadLine: "2024/07/18" },
    { id: 3, title: 'todo2', status: '着手', detail: 'testtesttest', deadLine: "2024/07/17" },
    { id: 4, title: 'todo2', status: '完了', detail: 'testtesttest', deadLine: "2024/07/19" },
    { id: 5, title: 'todo2', status: '未着手', detail: 'testtesttest', deadLine: "2024/07/18" },
    { id: 6, title: 'todo3', status: '完了', detail: 'testtesttest', deadLine: "2024/07/19" }
  ])
  const statuses = ['未着手', '着手', '完了']

  console.log(todos)

  //todoAdd
  const [todoText, setTodoText] = useState('')
  const onChangeTodoText = (event) => setTodoText(event.target.value)

  const [detailText, setDetailText] = useState('')
  const onChangeDetailText = (event) => setDetailText(event.target.value)


  const [statusSelect, setStatusSelect] = useState('未着手')
  const onChangeStatus = (event) => setStatusSelect(event.target.value)

  const [todoDeadLine, setTodoDeadLine] = useState(today)
  const onChangeTodoDeadLine = (selectDate) => {
    const formatDate = dayjs(selectDate).format('YYYY/MM/DD')
    setTodoDeadLine(formatDate || today)
  }

  const onClickAdd = () => {
    const newTodo = {
      id: todos.length + 1,
      title: todoText,
      status: statusSelect,
      detail: detailText,
      deadLine: todoDeadLine
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
    setFilteredTodos(newTodos)
    setTodoText('')
    setDetailText('')
    setStatusSelect('未着手')
    setTodoDeadLine(today)
  }

  //todoEdit
  const [editTodo, setEditTodo] = useState({ id: '', title: '', status: '', detail: '', deadLine: today })
  const onClickEdit = (todo) => setEditTodo(todo)
  const editTodoText = (event) => setEditTodo((prev) => { return { ...prev, title: event.target.value } })
  const editTodoDetail = (event) => setEditTodo((prev) => ({ ...prev, detail: event.target.value })) //オブジェクトはかっこで囲ったらreturn を削除してもいい
  const editTodoStatus = (event) => setEditTodo((prev) => ({ ...prev, status: event.target.value }))
  const editTodoDeadLine = (selectEditDate) => {
    const formatEditDate = dayjs(selectEditDate).format('YYYY/MM/DD')
    setEditTodo((prev) => ({ ...prev, deadLine: formatEditDate }))
  }

  //todoUpdate
  const onClickUpdate = () => {
    const updateTodos = todos.map((todo) => todo.id === editTodo.id ? editTodo : todo)
    setTodos(updateTodos)
    setFilteredTodos(updateTodos)
    setEditTodo({ id: '', title: '', status: '', detail: '', deadLine: today })
  }

  //todoDelete
  const onClickDelete = (deleteTodo) => {
    const deletedTodo = todos.filter((todo) => todo.id !== deleteTodo.id)
    setTodos(deletedTodo)
    setFilteredTodos(deletedTodo)
  }

  //sortTodoId
  const sortTodoId = () => {
    const sortedTodos = [...todos].sort((a, b) => a.id - b.id)
    setTodos(sortedTodos)
    setFilteredTodos(sortedTodos)
  }

  //sortTodoDeadLine
  const sortDeadLine = () => {
    const sortedDeadLine = [...todos].sort((a, b) => dayjs(a.deadLine).diff(dayjs(b.deadLine)))
    setTodos(sortedDeadLine)
    setFilteredTodos(sortedDeadLine)
  }

  const getStatusOrder = (status) => {
    const statusOrder = { '未着手': 1, '着手': 2, '完了': 3 }
    return statusOrder[status]
  }

  //sortTodoStatus
  const sortStatus = () => {
    const sortedStatus = [...todos].sort((a, b) => getStatusOrder(a.status) - getStatusOrder(b.status))
    setTodos(sortedStatus)
    setFilteredTodos(sortedStatus)
  }

  //statusStyle
  const statusStyle = (status) => {
    switch (status) {
      case '未着手':
        return { color: 'gray' }
      case '着手':
        return { color: 'blue' }
      case '完了':
        return { color: 'green' }
      default:
        return { color: 'black' }
    }
  }

  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [filterStatus, setFilterStatus] = useState('')
  const onChangeFilterStatus = (event) => {
    setFilterStatus(event.target.value)
    if (event.target.value) {
      const filtered = todos.filter((todo) => todo.status === event.target.value)
      setFilteredTodos(filtered)
    } else {
      setFilteredTodos(todos) // フィルターが選択されていない場合はすべて表示
    }
  }


  return (
    <div className="body">
      <h1>TODO一覧</h1>

      <CreateTodo
        todoText={todoText}
        onChangeTodoText={onChangeTodoText}
        onChangeDetailText={onChangeDetailText}
        onChangeStatus={onChangeStatus}
        statuses={statuses}
        detailText={detailText}
        statusSelect={statusSelect}
        todoDeadLine={todoDeadLine}
        onChangeTodoDeadLine={onChangeTodoDeadLine}
        onClickAdd={onClickAdd}
      />

      <UpdateTodo
        editTodo={editTodo}
        editTodoText={editTodoText}
        editTodoDetail={editTodoDetail}
        editTodoStatus={editTodoStatus}
        statuses={statuses}
        editTodoDeadLine={editTodoDeadLine}
        onClickUpdate={onClickUpdate}
      />

      <div className="sort-button">
        <button onClick={sortTodoId}>IDソート</button>
        <button onClick={sortDeadLine}>期限ソート</button>
        <button onClick={sortStatus}>ステータスソート</button>
      </div>

      <FilterStatus
        filterStatus={filterStatus}
        onChangeFilterStatus={onChangeFilterStatus}
        statuses={statuses}
      />

      <Todos
        todos={filteredTodos}
        statusStyle={statusStyle}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
    </div>
  );
}

export default App;
