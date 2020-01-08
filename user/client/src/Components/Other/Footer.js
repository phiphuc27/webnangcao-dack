/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaDribbble } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container" style={{ marginBlockEnd: '3rem' }}>
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <h6>Giới thiệu</h6>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aliquid perferendis
              dolore iure fugit maxime adipisci mollitia, voluptatum temporibus accusamus quaerat
              cum ex, beatae pariatur libero sint, natus porro consectetur?
            </p>
          </div>
          <div className="col-sm-6 col-md-6">
            <h6>Bản đồ</h6>
            <p className="text-justify">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam fuga quia esse
              ducimus, explicabo non possimus! Cupiditate officia velit obcaecati ut similique dolor
              eligendi. Aspernatur, sit. Delectus veniam suscipit dolorem!
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-md-6">
            <h6>Danh mục</h6>
            <ul className="footer-links">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <a href="#">Danh sách gia sư</a>
              </li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-6">
            <h6>Liên kết</h6>
            <ul className="footer-links">
              <li>
                <a href="#">Giới thiệu</a>
              </li>
              <li>
                <a href="#">Liên hệ</a>
              </li>
              <li>
                <a href="#">Thành tựu</a>
              </li>
              <li>
                <a href="#">Chính sách</a>
              </li>
              <li>
                <a href="#">Bản đồ</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2019 All Rights Reserved by <a href="#">Nhom P2P</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li>
                <a className="facebook" href="#">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a className="twitter" href="#">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a className="dribbble" href="#">
                  <FaDribbble />
                </a>
              </li>
              <li>
                <a className="linkedin" href="#">
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
