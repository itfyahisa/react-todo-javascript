import React from 'react'

const Todos = (props) => {
    const {
        todos,
        statusStyle,
        onClickEdit,
        onClickDelete
    } = props
    return (
        <>
            <table className="todo-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>タイトル</th>
                        <th>ステータス</th>
                        <th>詳細</th>
                        <th>期限</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td style={statusStyle(todo.status)}>{todo.status}</td>
                            <td>{todo.detail}</td>
                            <td>{todo.deadLine}</td>
                            <td><button onClick={() => onClickEdit(todo)}>編集</button></td>
                            <td><button onClick={() => onClickDelete(todo)}>削除</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Todos