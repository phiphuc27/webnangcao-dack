/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaDribbble } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container" style={{ marginBlockEnd: '3rem' }}>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <h6>Giới thiệu</h6>
            <p className="text-justify">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat nihil dolores ducimus
              beatae ut, eos necessitatibus natus, mollitia nisi, enim minima. Voluptatum est odit,
              dolores impedit architecto obcaecati cupiditate dolor minima accusantium. Minima,
              voluptate ipsum. Quis maxime sit cupiditate est porro obcaecati fugit ipsam, id nam
              enim odio commodi, eos voluptate blanditiis facere quibusdam, ad quaerat accusantium!
              Perspiciatis distinctio hic provident quaerat magni pariatur qui vel accusamus
              consequatur repellendus a doloremque quidem at necessitatibus, modi soluta eligendi
              illo officiis deleniti quasi explicabo vero sequi tempore assumenda! Praesentium quam
              sapiente impedit, perferendis repellat tempore molestiae illum repudiandae qui
              consequatur. Molestiae, officiis molestias cumque tenetur dolores dolor? Cumque
              explicabo et at consequatur dignissimos dolore exercitationem doloribus veritatis
              reprehenderit illo, quibusdam laboriosam eaque repudiandae commodi adipisci corrupti
              eum, obcaecati blanditiis animi quas! Tempore, optio voluptas. Aperiam, amet. Non
              veniam nisi excepturi saepe adipisci!
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
                <a href="#">Thời trang nam</a>
              </li>
              <li>
                <a href="#">Thời trang nữ</a>
              </li>
              <li>
                <a href="#">Phụ kiện</a>
              </li>
              <li>
                <a href="#">Ưu đãi</a>
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
              Copyright &copy; 2019 All Rights Reserved by <a href="#">Nhom 20</a>.
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
