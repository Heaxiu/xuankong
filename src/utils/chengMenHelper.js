// 城门诀计算
import { MOUNTAIN_MAP } from '../data/mountains24.js';
import { LUOSHU_TO_DIRECTION, NAME_TO_LUOSHU } from '../data/luoshu.js';
import { flyStars } from './feixingHelper.js';
import { resolveShunNi } from './xuankongAlgorithm.js';

// 合生成对（一六同宫、二七同道、三八为朋、四九为友、五十相守）
const SHENG_CHENG_PAIRS = [
  [1, 6], [6, 1],
  [2, 7], [7, 2],
  [3, 8], [8, 3],
  [4, 9], [9, 4],
];

function isShengCheng(a, b) {
  return SHENG_CHENG_PAIRS.some(([x, y]) => x === a && y === b);
}

/**
 * 城门诀计算
 * @param {Object} yunPan - 运盘
 * @param {string} xiangShanName - 向山名
 * @param {number} yunNum - 当运
 * @returns {Object} 城门分析结果
 */
export function calcChengMen(yunPan, xiangShanName, yunNum) {
  const xiangShan = MOUNTAIN_MAP[xiangShanName];
  const xiangPalaceNum = xiangShan.palaceNum;

  // 向首左右两宫（洛书步法中相邻宫位）
  // 根据洛书顺飞路径找向宫的前后宫
  const forwardPath = [5, 6, 7, 8, 9, 1, 2, 3, 4];
  const xiangIdx = forwardPath.indexOf(xiangPalaceNum);

  const leftPalace = forwardPath[(xiangIdx + 8) % 9]; // 左边宫（逆序一步）
  const rightPalace = forwardPath[(xiangIdx + 1) % 9]; // 右边宫（顺序一步）

  const results = [];

  for (const adjPalace of [leftPalace, rightPalace]) {
    if (adjPalace === 5) continue; // 中宫无城门

    const yunStar = yunPan[adjPalace]; // 该宫运盘星
    const xiangYunStar = yunPan[xiangPalaceNum]; // 向宫运盘星

    // 检查是否合生成
    const shengCheng = isShengCheng(yunStar, xiangYunStar) || isShengCheng(xiangYunStar, yunStar);

    let isTrue = false;
    let desc = '';

    if (shengCheng) {
      // 合生成，进一步验证真城门
      // 以运星入中，按向山元龙阴阳飞布，飞回该宫的星若为当运旺星则真
      const shunNi = resolveShunNi(yunStar, xiangShan.yuanLong, yunNum);
      const testPan = flyStars(shunNi.star, shunNi.isForward);
      const returnStar = testPan[adjPalace];

      if (returnStar === yunNum) {
        isTrue = true;
        desc = `真城门（合生成${yunStar}+${xiangYunStar}，飞回旺星${yunNum}）`;
      } else {
        isTrue = false;
        desc = `假城门（合生成但飞回${returnStar}非旺星）`;
      }
    } else {
      desc = `无城门（${yunStar}+${xiangYunStar}不合生成）`;
    }

    results.push({
      palace: adjPalace,
      direction: LUOSHU_TO_DIRECTION[adjPalace],
      yunStar,
      shengCheng,
      isTrue,
      desc,
    });
  }

  return {
    xiangPalace: xiangPalaceNum,
    xiangDirection: LUOSHU_TO_DIRECTION[xiangPalaceNum],
    gates: results,
  };
}
