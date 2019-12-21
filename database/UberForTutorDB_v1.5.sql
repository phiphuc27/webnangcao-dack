DROP SCHEMA IF EXISTS `uberfortutordb`;

CREATE SCHEMA IF NOT EXISTS `uberfortutordb` DEFAULT CHARACTER SET utf8;

use `uberfortutordb`;

CREATE TABLE IF NOT EXISTS `uberfortutordb`.`taikhoan` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `EMAIL` VARCHAR(45) NULL,
  `MATKHAU` VARCHAR(100) NULL,
  `LOAI` INT(2) NOT NULL,-- 0 - admin root; 1 - admin; 2 - tutor; 3 - student
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `EMAIL_UNIQUE` (`EMAIL` ASC))
  
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uberfortutordb`.`thongtin` (
  `ID` INT(11) NOT NULL PRIMARY KEY,
  `TEN` NVARCHAR(100) NULL,
  `HO` NVARCHAR(100) NULL,
  `DIENTHOAI` varchar(10) NULL,
  `DIACHI` NVARCHAR(255) NULL,
  `THANHPHO` NVARCHAR(150) NULL,
  `GIOITINH` NVARCHAR(3) NULL,
  `AVATARURL` VARCHAR(255) NULL,
  `GIOITHIEU` NVARCHAR(150) NULL,
  `GIA` INT NULL,-- gia tien hoc VND/h
  `GOOGLEID` nvarchar(255) NULL,
  `FACEBOOKID` nvarchar(255) NULL,
  CONSTRAINT `fk_thongtintaikhoan`
    FOREIGN KEY (`ID`) 
	REFERENCES `taikhoan`(`ID`))

ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uberfortutordb`.`kynang` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `KYNANG` NVARCHAR(150) NOT NULL,-- ky nang
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `KYNANG_UNIQUE` (`ID` ASC)
  )
  
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uberfortutordb`.`kynang_nguoidung` (
`IDKN` INT(11) NOT NULL,-- id ky nang
`IDND` INT(11) NOT NULL,-- id nguoi dung
PRIMARY KEY (`IDKN`, `IDND`),
CONSTRAINT `fk_nguoidung_kynang_nguoidung`
    FOREIGN KEY (`IDND`) 
	REFERENCES `taikhoan`(`ID`),
CONSTRAINT `fk_kynang_kynang_nguoidung`
    FOREIGN KEY (`IDKN`) 
	REFERENCES `kynang`(`ID`)
    )

ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uberfortutordb`.`dangkyhoc` (
    `ID` INT(11) NOT NULL AUTO_INCREMENT,
    `IDNH` INT(11) NOT NULL,
    `IDND` INT(11) NOT NULL,
    `TIEUDE` VARCHAR(255) NULL,
    `DIACHI` VARCHAR(255) NULL,
    `DIENTHOAI` VARCHAR(255) NULL,
    `NGAYBD` DATETIME NULL, -- ngay bat dau hoc
    `NGAYKT` DATETIME NULL, -- ngay ket thuc hoc
    `NOIDUNG` VARCHAR(255) NULL,
    `SOBUOIDAY` int(2) NULL, -- so buoi day 1 tuan
    `SOGIODAY` int(2) NULL, -- so gio day 1 buoi
    `TRANGTHAI` int(2) NULL, -- 0: da dang ki , 1: da chap nhan, 2:da tu choi
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`IDNH`)
        REFERENCES `taikhoan` (`ID`),
    FOREIGN KEY (`IDND`)
        REFERENCES `kynang` (`ID`)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS `uberfortutordb`.`hopdonghoc` (
    `ID` INT(11) NOT NULL AUTO_INCREMENT,
    `IDDK` INT(11) NOT NULL, -- id dangkyhoc
    `TONGTIEN` INT(20) NULL,
    `NGAYBD` DATETIME NULL, -- ngay lap hop dong
    `NGAYKT` DATETIME NULL, -- ngay ket thuc hop dong
    `TRANGTHAI` int(2) NULL, -- 0: da lap , 1: da hoan tat chua thanh toan, 2: da thanh toan
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`IDDK`)
        REFERENCES `dangkyhoc` (`ID`)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS `uberfortutordb`.`danhgia` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `IDND` INT(11) NOT NULL,-- id nguoi hoc danh gia
  `IDDK` INT(11) NOT NULL,-- id mon dang ky
  `DANHGIA` INT NOT NULL,-- so sao danh gia
  `NOIDUNG` NVARCHAR(150) NOT NULL,-- noi dung danh gia
  PRIMARY KEY (`ID`))

ENGINE = InnoDB;

INSERT INTO `uberfortutordb`.`taikhoan` (`EMAIL`, `MATKHAU`, `LOAI`) VALUES
('root@admin.com', '$2a$10$iVODj3s48SCg1B45SA9aA.FDikPqUoWas9tqHrNtgItSRDG24NDnq', 0);
-- root@admin.com - 1234567

-- test acc
INSERT INTO `uberfortutordb`.`taikhoan` (`EMAIL`, `MATKHAU`, `LOAI`) VALUES
('tutor1@gmail.com', '$2a$10$iVODj3s48SCg1B45SA9aA.FDikPqUoWas9tqHrNtgItSRDG24NDnq', 2);
INSERT INTO `uberfortutordb`.`taikhoan` (`EMAIL`, `MATKHAU`, `LOAI`) VALUES
('tutor2@gmail.com', '$2a$10$iVODj3s48SCg1B45SA9aA.FDikPqUoWas9tqHrNtgItSRDG24NDnq', 2);
INSERT INTO `uberfortutordb`.`taikhoan` (`EMAIL`, `MATKHAU`, `LOAI`) VALUES
('tutor3@gmail.com', '$2a$10$iVODj3s48SCg1B45SA9aA.FDikPqUoWas9tqHrNtgItSRDG24NDnq', 2);
INSERT INTO `uberfortutordb`.`taikhoan` (`EMAIL`, `MATKHAU`, `LOAI`) VALUES
('student1@gmail.com', '$2a$10$iVODj3s48SCg1B45SA9aA.FDikPqUoWas9tqHrNtgItSRDG24NDnq', 3);
INSERT INTO `uberfortutordb`.`taikhoan` (`EMAIL`, `MATKHAU`, `LOAI`) VALUES
('student2@gmail.com', '$2a$10$iVODj3s48SCg1B45SA9aA.FDikPqUoWas9tqHrNtgItSRDG24NDnq', 3);
INSERT INTO `uberfortutordb`.`taikhoan` (`EMAIL`, `MATKHAU`, `LOAI`) VALUES
('student3@gmail.com', '$2a$10$iVODj3s48SCg1B45SA9aA.FDikPqUoWas9tqHrNtgItSRDG24NDnq', 3);

INSERT INTO `uberfortutordb`.`thongtin` (`ID`, `TEN`, `HO`, `DIACHI`, `GIOITINH`, `AVATARURL`, `GIOITHIEU`, `GIA`) VALUES
(2, 'Phúc 1', 'Đỗ', 'Quận 2', 'Nam', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', 'testing..... tutor', 10000);
INSERT INTO `uberfortutordb`.`thongtin` (`ID`, `TEN`, `HO`, `DIACHI`, `GIOITINH`, `AVATARURL`, `GIOITHIEU`, `GIA`) VALUES
(3, 'Phúc 2', 'Đỗ', 'Quận 2', 'Nam', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', 'testing..... tutor', 10000);
INSERT INTO `uberfortutordb`.`thongtin` (`ID`, `TEN`, `HO`, `DIACHI`, `GIOITINH`, `AVATARURL`, `GIOITHIEU`, `GIA`) VALUES
(4, 'Phúc 3', 'Đỗ', 'Quận 2', 'Nam', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', 'testing..... tutor', 10000);

INSERT INTO `uberfortutordb`.`thongtin` (`ID`, `TEN`, `HO`, `DIACHI`, `GIOITINH`, `AVATARURL`, `GIOITHIEU`) VALUES
(5, 'Phúc 4', 'Hồng', 'Quận 2', 'Nam', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', 'testing..... student');
INSERT INTO `uberfortutordb`.`thongtin` (`ID`, `TEN`, `HO`, `DIACHI`, `GIOITINH`, `AVATARURL`, `GIOITHIEU`) VALUES
(6, 'Phúc 5', 'Hồng', 'Quận 2', 'Nam', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', 'testing..... student');
INSERT INTO `uberfortutordb`.`thongtin` (`ID`, `TEN`, `HO`, `DIACHI`, `GIOITINH`, `AVATARURL`, `GIOITHIEU`) VALUES
(7, 'Phúc 6', 'Hồng', 'Quận 2', 'Nam', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', 'testing..... student');

INSERT INTO `uberfortutordb`.`kynang` (`KYNANG`) VALUES
('c#'),('c++'),('c'),('java'),('javascript'),('react'),('angular'),('vue');

INSERT INTO `uberfortutordb`.`kynang_nguoidung` (`IDKN`,`IDND`) VALUES
('1','4'),('2','4'),('3','4'),('1','2'),('6','2'),('7','3'),('5','3');
