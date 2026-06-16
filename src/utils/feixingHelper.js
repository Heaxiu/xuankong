// 飞星飞布基础算法
import { FORWARD_PATH } from '../data/luoshu.js';

// 飞星数字 → 中文简体
const NUM_CN = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

/**
 * 飞星数字转中文
 */
export function numToCn(n) {
  return NUM_CN[n] ?? String(n);
}

/**
 * 星数环绕: 1~9循环
 */
export function wrapStar(num) {
  return ((num - 1 + 9) % 9) + 1;
}

/**
 * 飞星飞布计算
 * @param {number} centerStar - 入中宫的星数 (1-9)
 * @param {boolean} isForward - true=顺飞, false=逆飞
 * @returns {Object} - { 1: starNum, 2: starNum, ..., 9: starNum }
 *   键为洛书宫位数，值为该宫飞到的星数
 */
export function flyStars(centerStar, isForward) {
  // 顺飞和逆飞都走同一条洛书路径（中→乾→兑→艮→离→坎→坤→震→巽）
  // 区别仅在于星数递增（顺飞）还是递减（逆飞）
  const result = {};

  FORWARD_PATH.forEach((palaceNum, stepIndex) => {
    const starNum = isForward
      ? wrapStar(centerStar + stepIndex)
      : wrapStar(centerStar - stepIndex);
    result[palaceNum] = starNum;
  });

  return result;
}
