import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import EditProfileModal from './EditProfileModal';
import EditSkillModal from './EditSkillModal';

const AccountTab = ({ user, handleProfileChange, handleAddNewSkill }) => {
  const [modalProfile, setModalProfile] = useState(false);
  const [modalSkill, setModalSkill] = useState(false);

  const skill = user.KYNANG;

  let skillList = null;

  if (skill) {
    skillList = skill.map(value => {
      return <li key={value.ID}>{value.KYNANG}</li>;
    });
  }

  return (
    <div className="profile-info">
      <div className="info-container">
        <div className="profile-header">
          <div className="row">
            <div className="col-10">
              <h3>Thông tin cá nhân</h3>
            </div>
            <div className="col-2" style={{ textAlign: 'end' }}>
              <button type="button" className="btn" onClick={() => setModalProfile(true)}>
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
        <div className="profile-body">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <h5>Họ và tên</h5>
            </div>
            <div className="col-lg-9 col-sm-6">
              <p>
                {user.HO} {user.TEN}
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <h5>Giới tính</h5>
            </div>
            <div className="col-lg-9 col-sm-6">
              <p>{user.GIOITINH}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <h5>Địa chỉ</h5>
            </div>
            <div className="col-lg-9 col-sm-6">
              <p>{user.DIACHI}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <h5>Thành phố</h5>
            </div>
            <div className="col-lg-9 col-sm-6">
              <p>{user.THANHPHO}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <h5>Điện thoại</h5>
            </div>
            <div className="col-lg-9 col-sm-6">
              <p>{user.DIENTHOAI}</p>
            </div>
          </div>
          <hr />
          {user.LOAI === 2 && (
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <h5>Giá theo giờ</h5>
              </div>
              <div className="col-lg-9 col-sm-6">
                <p style={{ color: 'red', fontWeight: '600' }}>
                  <NumberFormat value={user.GIA} displayType="text" thousandSeparator suffix="₫" />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {user.LOAI === 2 && (
        <>
          <div className="info-container">
            <div className="profile-header">
              <div className="row">
                <div className="col-10">
                  <h3>Giới thiệu bản thân</h3>
                </div>
                <div className="col-2" style={{ textAlign: 'end' }}>
                  <button type="button" className="btn" onClick={() => setModalProfile(true)}>
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            </div>
            <div className="profile-body">
              <div className="row">
                <div className="col-12">
                  <p>{user.GIOITHIEU}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="info-container">
            <div className="profile-header">
              <div className="row">
                <div className="col-10">
                  <h3>Kỹ năng</h3>
                </div>
                <div className="col-2" style={{ textAlign: 'end' }}>
                  <button type="button" className="btn" onClick={() => setModalSkill(true)}>
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            </div>
            <div className="profile-body">
              <div className="row">
                <div className="col-12">
                  <ul className="profile-skill">{skillList}</ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <EditProfileModal
        user={user}
        show={modalProfile}
        onHide={() => setModalProfile(false)}
        onProfileChange={data => handleProfileChange(data)}
      />
      <EditSkillModal
        user={user}
        show={modalSkill}
        onHide={() => setModalSkill(false)}
        onSubmitNewSkill={item => handleAddNewSkill(item)}
      />
    </div>
  );
};

export default AccountTab;
