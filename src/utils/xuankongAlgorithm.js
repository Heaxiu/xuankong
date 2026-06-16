// 玄空飞星核心算法
import { flyStars } from './feixingHelper.js';
import { MOUNTAIN_MAP, PALACE_MOUNTAINS } from '../data/mountains24.js';
import { LUOSHU_TO_TRIGRAM } from '../data/trigrams.js';

/**
 * 顺逆判断核心函数
 * @param {number} starNum   - 运盘飞到坐/向宫的星数
 * @param {string} yuanLong  - 坐/向山的元龙类型（天/地/人）
 * @param {number} yunNum    - 当运运数（用于五黄处理）
 * @returns {{ isForward: boolean, star: number, reason: string }}
 */
export function resolveShunNi(starNum, yuanLong, yunNum) {
  let targetPalaceName;
  let effectiveStar = starNum;

  if (starNum === 5) {
    // 五黄特殊处理：用运数所在宫（运数对应的原始宫）找同元龙定阴阳
    // 五黄无固定宫，借用当运的宫位
    targetPalaceName = LUOSHU_TO_TRIGRAM[yunNum];
    // 但入中飞布仍用5
    effectiveStar = 5;
  } else {
    // 将星数映射回其原始八卦宫
    targetPalaceName = LUOSHU_TO_TRIGRAM[starNum];
  }

  // 在该八卦宫中找同元龙类型的山
  const palaceMountains = PALACE_MOUNTAINS[targetPalaceName];
  if (!palaceMountains) {
    return { isForward: true, star: effectiveStar, reason: '默认顺飞' };
  }

  const targetMountainName = palaceMountains.find(
    name => MOUNTAIN_MAP[name].yuanLong === yuanLong
  );

  if (!targetMountainName) {
    return { isForward: true, star: effectiveStar, reason: '找不到同元龙山，默认顺飞' };
  }

  const targetMountain = MOUNTAIN_MAP[targetMountainName];
  const isForward = targetMountain.yinYang === '阳';

  return {
    isForward,
    star: effectiveStar,
    reason: `${starNum}→${targetPalaceName}宫·${yuanLong}元→${targetMountainName}山·${targetMountain.yinYang}→${isForward ? '顺' : '逆'}飞`,
  };
}

/**
 * 计算完整的玄空飞星盘面
 * @param {number} yunNum - 当运（1-9）
 * @param {string} zuoShanName - 坐山名（如'子'）
 * @param {number|null} shanTiStar - 坐山替星（兼卦时使用，null=不替）
 * @param {number|null} xiangTiStar - 向山替星（兼卦时使用，null=不替）
 * @returns {{ yunPan, shanPan, xiangPan, shanInfo, xiangInfo, zuoShan, xiangShan }}
 */
export function calcFullChart(yunNum, zuoShanName, shanTiStar = null, xiangTiStar = null) {
  const zuoShan = MOUNTAIN_MAP[zuoShanName];
  if (!zuoShan) {
    throw new Error(`找不到山：${zuoShanName}`);
  }

  const xiangShanName = zuoShan.opposite;
  const xiangShan = MOUNTAIN_MAP[xiangShanName];

  // 1. 运盘（永远顺飞）
  const yunPan = flyStars(yunNum, true);

  // 2. 查坐山、向山的运盘星数
  const shanStarRaw = yunPan[zuoShan.palaceNum];
  const xiangStarRaw = yunPan[xiangShan.palaceNum];

  // 3. 判断山盘顺逆（顺逆由原山元龙决定，不受替星影响）
  const shanShunNi = resolveShunNi(shanStarRaw, zuoShan.yuanLong, yunNum);
  const xiangShunNi = resolveShunNi(xiangStarRaw, xiangShan.yuanLong, yunNum);

  // 4. 确定入中宫的星（替卦时用替星）
  const shanCenterStar = shanTiStar !== null ? shanTiStar : shanShunNi.star;
  const xiangCenterStar = xiangTiStar !== null ? xiangTiStar : xiangShunNi.star;

  // 5. 飞布山盘和向盘
  const shanPan = flyStars(shanCenterStar, shanShunNi.isForward);
  const xiangPan = flyStars(xiangCenterStar, xiangShunNi.isForward);

  return {
    yunPan,
    shanPan,
    xiangPan,
    shanInfo: {
      rawStar: shanStarRaw,
      centerStar: shanCenterStar,
      isForward: shanShunNi.isForward,
      reason: shanShunNi.reason,
      hasTiGua: shanTiStar !== null,
    },
    xiangInfo: {
      rawStar: xiangStarRaw,
      centerStar: xiangCenterStar,
      isForward: xiangShunNi.isForward,
      reason: xiangShunNi.reason,
      hasTiGua: xiangTiStar !== null,
    },
    zuoShan,
    xiangShan,
  };
}
