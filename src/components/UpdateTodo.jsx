import React from 'react'
import DatePicker from 'react-datepicker'

const UpdateTodo = (props) => {
    const {
        editTodo,
        editTodoText,
        editTodoDetail,
        editTodoStatus,
        statuses,
        editTodoDeadLine,
        onClickUpdate
    } = props

    return (
        <div>
            <p>■ 編集<br />
                ※テーブルの編集ボタン → 内容編集 → 更新ボタン → テーブル反映</p>
            <input type="text" placeholder="タイトルを入力" value={editTodo.title} onChange={editTodoText} />
            <input type="text" placeholder="詳細を入力" value={editTodo.detail} onChange={editTodoDetail} />
            <select value={editTodo.status} onChange={editTodoStatus} >
                {statuses.map((status) => {
                    return <option key={status}>{status}</option>
                })}
            </select>
            <label>期限</label>
            <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={editTodo.DeadLine}
                onChange={editTodoDeadLine}
                value={editTodo.deadLine}
            />
            <button onClick={onClickUpdate}>更新</button>
        </div>
    )
}

export default UpdateTodo