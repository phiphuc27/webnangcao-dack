import React from 'react';

const Profile = ({ user }) => {
  return (
    <div>
      <h5>
        Xin chào, {user.LOAI === 2 ? 'giáo viên' : 'học sinh'} {user.EMAIL}
      </h5>
      {user.LOAI === 2 && (
        <p>Để trở thành giáo viên, bạn cần cung cấp đầy đủ thông tin xác nhận hồ sơ của bạn </p>
      )}
    </div>
  );
};

export default Profile;
