import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { HomeRounded } from '@material-ui/icons';
import { GoSearch, GoBell } from 'react-icons/go';
import {
  getTutorRequest,
  getTutorContract,
  getStudentRequest,
  getStudentContract
} from '../../Actions/contract';

import { updateType } from '../../Actions/user';

const Navbar = ({ user, logout, history }) => {
  const dispatch = useDispatch();
  const { all, sent } = useSelector(state => state.contract.request);
  const { onGoing } = useSelector(state => state.contract.contract);

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!all && user && user.LOAI === 2) {
    dispatch(getTutorRequest(user.ID));
    dispatch(getTutorContract(user.ID));
  }

  if (!all && user && user.LOAI === 3) {
    dispatch(getStudentRequest(user.ID));
    dispatch(getStudentContract(user.ID));
  }

  const handleSearch = () => {
    if (search === '') {
      return;
    }
    window.location = `/tutors?search=${search}`;
  };

  const handleLogout = e => {
    e.preventDefault();
    logout();
    history.push('/');
  };
  return (
    <nav className="nav">
      <div className="container navbar">
        <div className="nav-logo">
          <a href="/">
            <HomeRounded />
            <span>Logo</span>
          </a>
        </div>
        <div className="nav-menu">
          <ul>
            <li>
              <a href="/tutors">Danh sách gia sư</a>
            </li>
            {user && user.LOAI === 3 && (
              <li>
                <button type="button" className="btn btn-primary" onClick={() => handleShow(true)}>
                  Trở thành gia sư
                </button>
              </li>
            )}
          </ul>
        </div>
        <div className="nav-search">
          <input
            type="text"
            placeholder="Tìm kiếm kỹ năng bạn muốn học..."
            onChange={e => setSearch(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button type="button" onClick={handleSearch}>
            <span>
              <GoSearch />
            </span>
          </button>
        </div>

        {user ? (
          <>
            <div className="nav-note">
              {user.LOAI === 2 ? (
                <>
                  <a href="/profile/class">
                    <GoBell />
                    {sent && sent.length > 0 && <span>{sent.length}</span>}
                  </a>
                  <div className="dropdown-menu note-menu">
                    <p>{sent && <span>{sent.length}</span>} yêu cầu chưa duyệt</p>
                  </div>
                </>
              ) : (
                <>
                  <a href="/profile/contract?tab=accepted">
                    <GoBell />
                    {onGoing && onGoing.length > 0 && <span>{onGoing.length}</span>}
                  </a>
                  <div className="dropdown-menu note-menu">
                    <p>{onGoing && <span>{onGoing.length}</span>} hợp đồng chưa hoàn tất</p>
                  </div>
                </>
              )}
            </div>
            <div className="nav-user">
              <div className="user-info">
                <img src={user.AVATARURL} alt="hình đại diện" />
                <p>
                  <b>
                    {user.HO} {user.TEN}
                  </b>
                </p>
              </div>

              <div className="dropdown-menu user-menu">
                <ul>
                  <li>
                    <Link to="/profile/account">Hồ sơ</Link>
                  </li>
                  {user.LOAI === 3 ? (
                    <>
                      <li>
                        <Link to="/profile/contract">Quản lí hợp đồng học</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/profile/class">Quản lí yêu cầu học</Link>
                      </li>
                      <li>
                        <Link to="/profile/revenue">Doanh thu</Link>
                      </li>
                    </>
                  )}
                  <hr />
                  <li>
                    <button type="button" onClick={e => handleLogout(e)}>
                      Thoát tài khoản
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="nav-user">
            <Link to="/register" className="btn btn-secondary">
              Đăng kí
            </Link>
            <Link to="/login" className="btn btn-primary">
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Trở thành gia sư</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Để đăng kí trở thành gia sư, bạn phải hoàn tất cung cấp thông tin xác nhận hồ sơ của bạn
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(updateType({ id: user.ID, type: 2 }));
              window.alert('Đăng kí gia sư thành công');
              window.location = '/profile/account';
            }}
          >
            Đăng kí thành gia sư
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
