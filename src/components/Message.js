import React from 'react';

export default function Message({ message, onClickStar, onClickCheckbox }) {
    const starredClass = message.starred ? 'fa-star' : 'fa-star-o'
    let className = 'row message ' + (message.read ? 'read' : 'unread')
    if (message.selected) {
        className += ' selected'
    }
    return (
        <div className={className} data-test={`message-row-${message.id}`}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input id={`checkbox${message.id}`} type="checkbox" checked={Boolean(message.selected)} onChange={() => onClickCheckbox(message.id)} />
                    </div>
                    <div className="col-xs-2">
                        <i id={`star${message.id}`} className={`star fa ${starredClass}`} onClick={() => onClickStar(message.id)} ></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {message.labels.map((label, index) => <span key={index} className={`label label-warning ${label}`}>{label}</span>)}
                <a href="#">
                    {message.subject}
                </a>
            </div>
        </div>
    )
}

