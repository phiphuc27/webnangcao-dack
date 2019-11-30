import React, { useState } from 'react';
import { HomeRounded, MenuRounded } from '@material-ui/icons';

import { GoSearch } from 'react-icons/go';

import { IconButton } from '@material-ui/core';

import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [left, setLeft] = useState(false);

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setLeft(open);
  };
  return (
    <nav className="nav-container">
      <div className="container">
        <div className="navbar">
          <div className="nav-mobile">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
            >
              <MenuRounded />
            </IconButton>
          </div>
          <div className="nav-logo">
            <Link to="/">
              <HomeRounded />
              <span>LOGO</span>
            </Link>
          </div>
          <div className="nav-search">
            <input type="text" placeholder="Tìm kiếm ..." />
            <button type="button">
              <span>
                <GoSearch />
              </span>
            </button>
          </div>
          <div className="nav-user">
            <button> Login</button>
            {/* <div className="user-info">
              <AccountCircleRounded />
              <div>
                <h4>
                  <b>Văn Văn</b>
                </h4>
                <span>Khách hàng thân thiết</span>
              </div>
            </div> */}

            {/* <div className="dropdown-menu user-menu">
              <ul>
                <li>Đơn hàng của tôi</li>
                <li>Tài khoản của tôi</li>
                <li>Sản phẩm đã xem</li>
                <li>Sản phẩm yêu thích</li>
                <hr />
                <li>Thoát tài khoản</li>
              </ul>
            </div> */}
          </div>
        </div>
        <div className="menubar">
          <div className="nav-search">
            <input type="text" placeholder="Tìm kiếm sản phẩm mong muốn..." />
            <button type="button">
              <span>
                <GoSearch />
              </span>
            </button>
          </div>
          <ul>
            <li>
              <span>
                <Link to="/">Trang chủ</Link>
              </span>
            </li>
            <li className="menu-man">
              <span>
                <Link to="/products">Nam</Link>
              </span>
              <div className="dropdown-menu product-menu">
                <ul>
                  <li>
                    <h4>
                      <Link to="/products">Áo</Link>
                    </h4>
                  </li>
                  <li>
                    <Link to="/products">Áo thun</Link>
                  </li>
                  <li>
                    <Link to="/products">Áo sơ mi</Link>
                  </li>
                  <li>
                    <Link to="/products">Áo khoác</Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <h4>
                      <Link to="/products">Quần</Link>
                    </h4>
                  </li>
                  <li>
                    <Link to="/products">Quần thun</Link>
                  </li>
                  <li>
                    <Link to="/products">Quần tây</Link>
                  </li>
                  <li>
                    <Link to="/products">Quần short</Link>
                  </li>
                  <li>
                    <Link to="/products">Quần jean</Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <h4>
                      <Link to="/products">Khác</Link>
                    </h4>
                  </li>
                  <li>
                    <Link to="/products">Đồ lót, đồ ngủ, đồ bơi</Link>
                  </li>
                  <li>
                    <Link to="/products">Tất, vớ</Link>
                  </li>
                  <li>
                    <Link to="/products">Nón</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-woman">
              <span>
                <Link to="/products">Nữ</Link>
              </span>
              <div className="dropdown-menu product-menu">
                <ul>
                  <li>
                    <h4>
                      <Link to="/products">Áo</Link>
                    </h4>
                  </li>
                  <li>
                    <Link to="/products">Áo thun</Link>
                  </li>
                  <li>
                    <Link to="/products">Áo sơ mi</Link>
                  </li>
                  <li>
                    <Link to="/products">Áo khoác</Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <h4>
                      <Link to="/products">Quần</Link>
                    </h4>
                  </li>
                  <li>
                    <Link to="/products">Quần thun</Link>
                  </li>
                  <li>
                    <Link to="/products">Quần tây</Link>
                  </li>
                  <li>
                    <Link to="/products">Quần short</Link>
                  </li>
                  <li>
                    <Link to="/products">Quần jean</Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <h4>
                      <Link to="/products">Khác</Link>
                    </h4>
                  </li>
                  <li>
                    <Link to="/products">Đồ lót, đồ ngủ, đồ bơi</Link>
                  </li>
                  <li>
                    <Link to="/products">Tất, vớ</Link>
                  </li>
                  <li>
                    <Link to="/products">Nón</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <span>
                <Link to="/products">Phụ kiện</Link>
              </span>
            </li>
            <li>
              <span>
                <Link to="/products">Ưu đãi</Link>
              </span>
            </li>
            <li>
              <span>Liện hệ</span>
            </li>
          </ul>
        </div>
      </div>
      <MobileMenu
        className="nav-mobile-container"
        toggleDrawer={open => toggleDrawer(open)}
        left={left}
      />
    </nav>
  );
};

export default Navbar;
