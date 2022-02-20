/*
 Navicat Premium Data Transfer

 Source Server         : 81.70.8.101
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : 81.70.8.101:3306
 Source Schema         : st_edu

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 20/02/2022 22:34:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for edu_admin_user
-- ----------------------------
DROP TABLE IF EXISTS `edu_admin_user`;
CREATE TABLE `edu_admin_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isdel` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of edu_admin_user
-- ----------------------------
BEGIN;
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (57, 'superadmin', '$2a$10$bUywXavwO/YD/w1qzDS/3O/FV44YpSpWlCQEHHSdhFYaYWyeBRzt6', 'avatarlpQxtMNTXwjcHqED.jpg', 0);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (58, '2222232', '$2a$10$ObJdyX2y0IuxleMUPtMeZeyaQ8eOcnlmg7t8fQ.Xhs9ftSYJvBa2e', 'avatarpAnYlPNfsFYKvRKc.jpg', 1);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (59, 'erooend', '$2a$10$Wt6Ov1Osu37VYsJzS14yduwqylcCysjGeZH3mRaPSyvcd1BA2xkoG', 'http://file.wwywwy.top/FrKwEmE-0z5Ise5BjiINVdAocn6N', 0);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (60, 'dwiojawd', '$2a$10$uUGM80konVx2f4hBErwkh.5z8O5P.ljImkZrbAKoaQySpeleVbrey', 'http://file.wwywwy.top/FrKwEmE-0z5Ise5BjiINVdAocn6N', 0);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (61, '2238293', '$2a$10$lq2839FDxQqWgaeRcFKqKuh5e867M4ullw6p9afCDNtI4GA.ApXQu', 'avatarLMIgXZOOdSgAPaHs.jpg', 1);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (62, '238934', '$2a$10$LOklk9h.C4Dq0yGBh6WSUuUzxfVboGqXWMmlOgDifOgel1gwhB1XC', 'avatarZyRROgpBEHAUiqde.jpg', 0);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (63, 'dawiodjoaw', '$2a$10$eznFWFggC.SE.flJaGWKH.2TDvSTJ5PPdpbwniUt00JUtq4IzLizC', 'avatarniaWgEaGNeSJJvit.jpg', 0);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (64, 'wwyd1234564', '$2a$10$VnrYRjgjPO72QD6FCFBdduuqRoRFiKy0QbhTndCzahDEZOmz5P5Xu', 'avatarChPIAZHitNyoaQge.jpg', 0);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (65, 'wwyd12345611', '$2a$10$lQUvl.ZJXgTFmEK06Da02O/qPKV.NuG6TTlHY.sXpCTQi9AJUSWcq', 'http://file.wwywwy.top/FrKwEmE-0z5Ise5BjiINVdAocn6N', 0);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (66, 'wdiuad', '$2a$10$Ayruu7wG7zyAGMtjIWRpsuGZ8FHk9C1cV20kp2gAClA6CbnPE3JFG', 'avatarcGdPoGNRGIjdBaLD.jpg', 0);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (67, 'heiuwe', '$2a$10$d72oBl2aIvjxjIL0gbJAZu1r8I6rWtoNRaeWfvtioiFR9g8PFSr2m', 'http://file.wwywwy.top/FrKwEmE-0z5Ise5BjiINVdAocn6N', 0);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (69, '2222232', '$2a$10$Qr8XBkZuzeDzvW0RlU1u6uExL2J6zZQhfDuOlNFX.OTCzhySn40cO', 'http://file.wwywwy.top/FrKwEmE-0z5Ise5BjiINVdAocn6N', 0);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (70, 'wwyd123456', '$2a$10$eG9LBMeJ3.cAegNGUqDOIeRLR3aiQE65nsjdyBa3Rrk7zgWONaJTO', 'avataryRaFHjatslcBzoMN.jpg', 0);
INSERT INTO `edu_admin_user` (`id`, `username`, `password`, `avatar`, `isdel`) VALUES (71, 'admintest', '$2a$10$mR28.eMlK3t16RFmz/HlC.JWM2B/mELFzJfnPMztn4f/ws0Xlraxi', 'http://file.wwywwy.top/FrKwEmE-0z5Ise5BjiINVdAocn6N', 0);
COMMIT;

-- ----------------------------
-- Table structure for edu_course
-- ----------------------------
DROP TABLE IF EXISTS `edu_course`;
CREATE TABLE `edu_course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_num` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `course_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `course_teacher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isdel` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_num` (`course_num`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of edu_course
-- ----------------------------
BEGIN;
INSERT INTO `edu_course` (`id`, `course_num`, `course_name`, `course_teacher`, `isdel`) VALUES (1, 'dawd', 'dawndjkaw', 'dawdfw', 1);
INSERT INTO `edu_course` (`id`, `course_num`, `course_name`, `course_teacher`, `isdel`) VALUES (2, 'dawjfd', 'dawndjkaw', 'dawdfwkk=', 0);
INSERT INTO `edu_course` (`id`, `course_num`, `course_name`, `course_teacher`, `isdel`) VALUES (3, 'dawfd', 'dawndjkaw', 'dawd', 0);
INSERT INTO `edu_course` (`id`, `course_num`, `course_name`, `course_teacher`, `isdel`) VALUES (4, 'dawfdww', 'dawndjkaw', 'dawd', 1);
INSERT INTO `edu_course` (`id`, `course_num`, `course_name`, `course_teacher`, `isdel`) VALUES (5, '2222', '22', '222', 0);
INSERT INTO `edu_course` (`id`, `course_num`, `course_name`, `course_teacher`, `isdel`) VALUES (6, 'dwdwqe', 'qwe', 'wqe', 0);
INSERT INTO `edu_course` (`id`, `course_num`, `course_name`, `course_teacher`, `isdel`) VALUES (7, 'qwe', 'qe', 'qwe', 0);
INSERT INTO `edu_course` (`id`, `course_num`, `course_name`, `course_teacher`, `isdel`) VALUES (8, 'qweqw', 'eqweqwe', 'qeqeqwe', 0);
COMMIT;

-- ----------------------------
-- Table structure for edu_score
-- ----------------------------
DROP TABLE IF EXISTS `edu_score`;
CREATE TABLE `edu_score` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_num` varchar(255) NOT NULL,
  `student_num` varchar(255) NOT NULL,
  `score` float NOT NULL,
  `isdel` tinyint(1) NOT NULL DEFAULT '0',
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_st_cs` (`course_num`,`student_num`) USING BTREE,
  KEY `f_snum` (`student_num`),
  CONSTRAINT `f_cnum` FOREIGN KEY (`course_num`) REFERENCES `edu_course` (`course_num`),
  CONSTRAINT `f_snum` FOREIGN KEY (`student_num`) REFERENCES `edu_student` (`student_num`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of edu_score
-- ----------------------------
BEGIN;
INSERT INTO `edu_score` (`id`, `course_num`, `student_num`, `score`, `isdel`, `date`) VALUES (1, 'dawfd', 'wwdw22', 34, 1, '2022-02-20 19:33:49');
INSERT INTO `edu_score` (`id`, `course_num`, `student_num`, `score`, `isdel`, `date`) VALUES (3, '2222', 'dkldalkw', 78.2, 0, '2022-02-20 19:33:52');
INSERT INTO `edu_score` (`id`, `course_num`, `student_num`, `score`, `isdel`, `date`) VALUES (4, '2222', 'dkldalkw', 77.5, 0, '2022-02-20 19:33:55');
INSERT INTO `edu_score` (`id`, `course_num`, `student_num`, `score`, `isdel`, `date`) VALUES (5, '2222', 'dkldalkw', 23, 0, '2022-02-20 19:33:58');
INSERT INTO `edu_score` (`id`, `course_num`, `student_num`, `score`, `isdel`, `date`) VALUES (6, '2222', 'dkldalkw', 77.8, 0, '2022-02-20 19:40:31');
INSERT INTO `edu_score` (`id`, `course_num`, `student_num`, `score`, `isdel`, `date`) VALUES (7, '2222', 'dkldalkw', 77.8, 0, '2022-02-20 19:40:32');
INSERT INTO `edu_score` (`id`, `course_num`, `student_num`, `score`, `isdel`, `date`) VALUES (8, '2222', 'dkldalkw', 77.8, 0, '2022-02-20 21:32:17');
INSERT INTO `edu_score` (`id`, `course_num`, `student_num`, `score`, `isdel`, `date`) VALUES (9, '2222', 'dkldalkw', 10.2, 0, '2022-02-20 22:05:23');
INSERT INTO `edu_score` (`id`, `course_num`, `student_num`, `score`, `isdel`, `date`) VALUES (10, '2222', 'dkldaw', 2, 0, '2022-02-20 22:28:33');
INSERT INTO `edu_score` (`id`, `course_num`, `student_num`, `score`, `isdel`, `date`) VALUES (11, '2222', '2222', 1, 0, '2022-02-20 22:29:08');
COMMIT;

-- ----------------------------
-- Table structure for edu_student
-- ----------------------------
DROP TABLE IF EXISTS `edu_student`;
CREATE TABLE `edu_student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_num` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_grade` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_class` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_sex` tinyint NOT NULL DEFAULT '0',
  `isdel` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_num` (`student_num`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of edu_student
-- ----------------------------
BEGIN;
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (1, 'wwdw22', 'test', '', '222', 2, 1);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (2, 'wwdw22', 'test', '222', '222', 2, 0);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (3, 'wwdw22w', 'test', '666', '222', 1, 0);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (4, 'wdaww22w', 'test', '728', '222', 2, 1);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (5, 'wddwlkw22w', 'test', '728', '222', 1, 0);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (6, 'dklwdwlkw22w', 'test', '728', '222', 2, 1);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (7, 'dkldalkw', 'test', '728', '222', 0, 0);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (8, 'dkldaw', 'test', '728', '222', 2, 0);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (9, 'dkldalw', 'test', '728', '222', 2, 0);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (10, '20190823', 'daw', 'wad', 'wad', 0, 1);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (11, '232321', 'xad', 'dawd', 'awd', 2, 0);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (12, '2222', 'iu', 'uu', '', 0, 0);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (13, 'wwww', '777', '', '', 0, 0);
INSERT INTO `edu_student` (`id`, `student_num`, `student_name`, `student_grade`, `student_class`, `student_sex`, `isdel`) VALUES (14, '222213', '', '2', '', 0, 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
