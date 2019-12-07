CREATE SCHEMA IF NOT EXISTS `uberfortutordb` DEFAULT CHARACTER SET utf8;
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
  `DIACHI` NVARCHAR(150) NULL,
  `GIOITINH` NVARCHAR(3) NULL,
  `AVATARURL` VARCHAR(150) NULL,
  `GIOITHIEU` NVARCHAR(150) NULL,
  `GOOGLEID` nvarchar(255) NULL,
  `FACEBOOKID` nvarchar(255) NULL,
  CONSTRAINT `fk_thongtintaikhoan`
    FOREIGN KEY (`ID`) 
	REFERENCES `taikhoan`(`ID`))

ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uberfortutordb`.`chuyennganh` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `TEN` NVARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `TEN_UNIQUE` (`TEN` ASC))

ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uberfortutordb`.`monhoc` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `IDND` INT(11) NOT NULL,-- id nguoi day
  `IDCN` INT(11) NOT NULL,-- id chuyen nganh
  `TENMON` NVARCHAR(150) NOT NULL,-- ten mon hoc
  `GIA` INT NOT NULL,-- gia tien hoc VND/h
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_nguoidungmonhoc`
    FOREIGN KEY (`IDND`) 
	REFERENCES `taikhoan`(`ID`),
  CONSTRAINT `fk_monhocchuyennganh`
    FOREIGN KEY (`IDCN`) 
	REFERENCES `chuyennganh`(`ID`))

ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uberfortutordb`.`kynang` (
  `IDND` INT(11) NOT NULL,-- id nguoi dung
  `KYNANG` NVARCHAR(150) NOT NULL,-- ky nang
  PRIMARY KEY (`IDND`, `KYNANG`),
  CONSTRAINT `fk_nguoidungkynang`
    FOREIGN KEY (`IDND`) 
	REFERENCES `taikhoan`(`ID`))

ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uberfortutordb`.`dangkyhoc` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `IDND` INT(11) NOT NULL,-- id nguoi hoc
  `IDMH` INT(11) NOT NULL,-- id mon hoc
  `NGAYBD` datetime NULL,-- thoi gian bat dau hoc
  `NGAYKT` datetime NULL,-- thoi gian ket thuc hoc
  PRIMARY KEY (`ID`))

ENGINE = InnoDB;

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