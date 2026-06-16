// 排龙计算
import { MOUNTAIN_MAP } from '../data/mountains24.js';
import { TRIGRAMS, ELEMENT_SHENG, ELEMENT_KE } from '../data/trigrams.js';
import { LUOSHU_TO_DIRECTION } from '../data/luoshu.js';

/**
 * 排龙计算（坐山来龙五行生克）
 * @param {string} zuoShanName - 坐山名
 * @param {Object} shanPan - 山盘
 * @param {number} yunNum - 当运
 */
export function calcPaiLong(zuoShanName, shanPan, yunNum) {
  const zuoShan = MOUNTAIN_MAP[zuoShanName];
  const zuoPalace = zuoShan.palaceNum;

  // 坐山宫的山盘星
  const shanStar = shanPan[zuoPalace];

  // 坐山宫的五行（八卦五行）
  const zuoPalaceName = TRIGRAMS[Object.keys(TRIGRAMS).find(k => TRIGRAMS[k].luoshuNum === zuoPalace)] || {};
  // 用宫位数找八卦名
  const palaceNames = ['', '坎', '坤', '震', '巽', '中', '乾', '兑', '艮', '离'];
  const zuoPalaceTrigram = TRIGRAMS[palaceNames[zuoPalace]];

  // 山盘星对应宫的五行
  const shanStarTrigram = TRIGRAMS[palaceNames[shanStar]];

  // 分析生克关系
  const zuoElement = zuoPalaceTrigram?.element || '土';
  const shanElement = shanStarTrigram?.element || '土';

  let relation = '';
  let relDesc = '';
  if (ELEMENT_SHENG[zuoElement] === shanElement) {
    relation = 'sheng_out';
    relDesc = `坐山${zuoElement}生山星${shanElement}（生出）`;
  } else if (ELEMENT_SHENG[shanElement] === zuoElement) {
    relation = 'sheng_in';
    relDesc = `山星${shanElement}生坐山${zuoElement}（生入大吉）`;
  } else if (ELEMENT_KE[zuoElement] === shanElement) {
    relation = 'ke_out';
    relDesc = `坐山${zuoElement}克山星${shanElement}（克出）`;
  } else if (ELEMENT_KE[shanElement] === zuoElement) {
    relation = 'ke_in';
    relDesc = `山星${shanElement}克坐山${zuoElement}（克入凶）`;
  } else {
    relation = 'same';
    relDesc = `坐山与山星同五行${zuoElement}（比和）`;
  }

  // 龙脉方向（来自坐山对面）
  const xiangShanName = zuoShan.opposite;
  const xiangShan = MOUNTAIN_MAP[xiangShanName];
  const dragonFrom = `${xiangShanName}方来龙`;

  // 各宫山星能量分析
  const dragonPath = [];
  for (let p = 1; p <= 9; p++) {
    if (p === 5) continue;
    const star = shanPan[p];
    const palName = palaceNames[p];
    const palTrigram = TRIGRAMS[palName];
    const isWang = star === yunNum;
    dragonPath.push({
      palace: p,
      palaceName: palName,
      star,
      direction: LUOSHU_TO_DIRECTION[p],
      element: palTrigram?.element || '土',
      isWang,
      status: isWang ? '旺' : (star === yunNum + 1 || star === yunNum - 1 ? '相' : '衰'),
    });
  }

  return {
    zuoShan: zuoShanName,
    zuoPalace,
    zuoElement,
    shanStar,
    shanElement,
    relation,
    relDesc,
    dragonFrom,
    dragonPath,
  };
}
