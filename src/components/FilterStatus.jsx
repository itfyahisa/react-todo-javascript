import React from 'react'

const FilterStatus = (props) => {
    const {
        filterStatus,
        onChangeFilterStatus,
        statuses
    } = props
    return (
        <div className="filter-status">
            <span>ステータスフィルタ</span>
            <select value={filterStatus} onChange={onChangeFilterStatus} >
                <option value="">すべて</option>
                {statuses.map((status) => {
                    return <option key={status}>{status}</option>
                })}
            </select>
        </div>
    )
}

export default FilterStatus