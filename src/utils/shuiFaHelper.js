// 水法计算
import { LUOSHU_TO_DIRECTION } from '../data/luoshu.js';

/**
 * 根据向盘计算水法吉凶方位
 * @param {Object} xiangPan - 向盘 { 1:n, ..., 9:n }
 * @param {number} yunNum - 当运
 * @returns {Array} 各宫水法状态
 */
export function calcShuiFa(xiangPan, yunNum) {
  const nextYun = yunNum === 9 ? 1 : yunNum + 1;
  const prevYun = yunNum === 1 ? 9 : yunNum - 1;

  const result = [];
  for (let palace = 1; palace <= 9; palace++) {
    if (palace === 5) continue; // 中宫不论水法
    const star = xiangPan[palace];
    let type = '';
    let desc = '';

    if (star === yunNum) {
      type = 'laishui'; // 来水吉（旺星当令）
      desc = '来水大吉（旺星到向）';
    } else if (star === nextYun) {
      type = 'laishui_sheng'; // 生气来水
      desc = '来水吉（生气星）';
    } else if (star === prevYun) {
      type = 'qushui'; // 退气去水
      desc = '去水可（退气）';
    } else if (star <= yunNum - 2 || star > yunNum) {
      // 衰死星
      if (star < yunNum && star !== prevYun) {
        type = 'qushui_xiong'; // 死气去水
        desc = '去水（死气）';
      } else {
        type = 'neutral';
        desc = '平（未来星）';
      }
    } else {
      type = 'neutral';
      desc = '平';
    }

    result.push({
      palace,
      star,
      type,
      desc,
      direction: LUOSHU_TO_DIRECTION[palace],
    });
  }

  return result;
}
