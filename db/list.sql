/*
 Navicat Premium Data Transfer

 Source Server         : juejin
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : 10.99.50.124:3306
 Source Schema         : POPULAR

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 13/01/2020 10:36:40

 我也是刚入门数据库  如结构类型定义有歧义 请勿喷
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for list
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `id` varchar(255) NOT NULL,
  `commentsCount` int(255) DEFAULT NULL,
  `originalUrl` varchar(600) DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4,
  `category` varchar(255) DEFAULT NULL,
  `tags` text,
  `title` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `user` text CHARACTER SET utf8mb4,
  `lastCommentTime` varchar(255) DEFAULT NULL,
  `likeCount` int(255) DEFAULT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
