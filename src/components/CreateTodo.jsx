import React from 'react'
import DatePicker from 'react-datepicker'

const CreateTodo = (props) => {
    const {
        todoText,
        onChangeTodoText,
        onChangeDetailText,
        onChangeStatus,
        statuses,
        detailText,
        statusSelect,
        todoDeadLine,
        onChangeTodoDeadLine,
        onClickAdd
    } = props

    return (
        <div>
            <p>■ 新規作成</p>
            <input type="text" placeholder="タイトルを入力" value={todoText} onChange={onChangeTodoText} />
            <input type="text" placeholder="詳細を入力" value={detailText} onChange={onChangeDetailText} />
            <select value={statusSelect} onChange={onChangeStatus}>
                {statuses.map((status) => {
                    return <option key={status}>{status}</option>
                })}
            </select>
            <label>期限</label>
            <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={todoDeadLine}
                onChange={onChangeTodoDeadLine}
            />
            <button onClick={onClickAdd}>新規作成</button>
        </div>
    )
}

export default CreateTodo