import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/en-gb';
import { Spinner } from 'react-bootstrap';
// import { makeStyles } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom';
// import useForm from 'react-hook-form';

const Chat = ({ isFetching, receiver, history, user, socket, close }) => {
  const [message, setMessage] = useState('');
  let scrollPanel;
  let History = null;
  if (history) {
    History = history.map(msg => {
      if (msg.IDG === user.ID) {
        return (
          <div className="row msg_container base_sent" key={msg.ID}>
            <div className="col-md-10 col-xs-10">
              <div className="messages msg_sent">
                <p>{msg.NOIDUNG}</p>
                <time dateTime={msg.NGAYGUI}>
                  {`${user.HO} ${user.TEN}`} • {moment(msg.NGAYGUI).format('DD/MM/YY, h:mm:ss a')}
                </time>
              </div>
            </div>
            <div className="col-md-2 col-xs-2 avatar">
              <img src={user.AVATARURL} alt="" className=" img-responsive " />
            </div>
          </div>
        );
      }
      return (
        <div className="row msg_container base_receive" key={message.ID}>
          <div className="col-md-2 col-xs-2 avatar">
            <img src={receiver.AVATARURL} alt="" className=" img-responsive " />
          </div>
          <div className="col-md-10 col-xs-10">
            <div className="messages msg_receive">
              <p>{msg.NOIDUNG}</p>
              <time dateTime={msg.NGAYGUI}>
                {`${receiver.HO} ${receiver.TEN}`} •{' '}
                {moment(msg.NGAYGUI).format('DD/MM/YY, h:mm:ss a')}
              </time>
            </div>
          </div>
        </div>
      );
    });
  }

  const scrollChatToBottom = () => {
    const { scrollHeight, clientHeight } = scrollPanel;
    const height = clientHeight;
    const maxScrollTop = scrollHeight - height;
    scrollPanel.scrollTop = maxScrollTop;
  };

  const handleClick = () => {
    if (message === '') return;
    socket.message(socket.room, message, user.ID, receiver.ID);
    setMessage('');
    scrollChatToBottom();
  };

  useEffect(() => {
    console.log(scrollPanel.offsetHeight);
    scrollChatToBottom();
  }, []);

  return (
    <div className="container chat">
      <div
        className="row chat-window col-xs-5 col-md-3"
        id="chat_window_1"
        style={{ marginLeft: '10px' }}
      >
        <div className="col-xs-12 col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading top-bar">
              <div className="row">
                <div className="col-md-8 col-xs-8">
                  <h5 className="panel-title">
                    <span className="glyphicon glyphicon-comment" /> Chat -{' '}
                    {receiver ? `${receiver.HO} ${receiver.TEN}` : ''}
                  </h5>
                </div>
                <div className="col-md-4 col-xs-4" style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    className="btn-default chat-btn-heading"
                    onClick={() => {
                      socket.disconnect();
                      close();
                    }}
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="panel-body msg_container_base"
              ref={panel => {
                scrollPanel = panel;
              }}
            >
              {!isFetching ? (
                History
              ) : (
                <Spinner
                  style={{ width: '100px', height: '100px' }}
                  variant="dark"
                  animation="border"
                />
              )}
            </div>
            <div className="panel-footer">
              <div className="input-group">
                <input
                  id="btn-input"
                  type="text"
                  className="form-control input-sm chat_input"
                  placeholder="Tin nhắn..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') handleClick(e);
                  }}
                />
                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    id="btn-chat"
                    style={{ height: '100%' }}
                    onClick={e => handleClick(e)}
                  >
                    Gửi
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
