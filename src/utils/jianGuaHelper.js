// 兼卦/替卦判断逻辑
import { MOUNTAIN_MAP } from '../data/mountains24.js';

/**
 * 判断兼卦是否需要用替卦
 * @param {Object} originalMountain - 坐山数据
 * @param {string} jianMountainName - 兼向的山名
 * @returns {boolean}
 */
function checkTiGuaNeeded(originalMountain, jianMountainName) {
  if (!jianMountainName) return false;
  const jianMountain = MOUNTAIN_MAP[jianMountainName];
  if (!jianMountain) return false;

  // 出卦兼：不同八卦宫 → 必用替卦
  if (originalMountain.palace !== jianMountain.palace) {
    return true;
  }

  // 同卦宫天人互兼 → 不用替卦（阴阳相同）
  const yl1 = originalMountain.yuanLong;
  const yl2 = jianMountain.yuanLong;
  if ((yl1 === '天' && yl2 === '人') || (yl1 === '人' && yl2 === '天')) {
    return false;
  }

  // 同卦宫天地互兼 或 地人互兼 → 用替卦（阴阳不同）
  return true;
}

/**
 * 处理兼卦，返回替星（若不需要替卦则返回null）
 * @param {string} zuoShanName - 坐山名
 * @param {string|null} jianMountainName - 兼向的相邻山名（null=正向不兼）
 * @returns {{ shanTiStar: number|null, xiangTiStar: number|null, needTiGua: boolean, info: string }}
 */
export function resolveJianGua(zuoShanName, jianMountainName) {
  if (!jianMountainName) {
    return { shanTiStar: null, xiangTiStar: null, needTiGua: false, info: '正向下卦，不兼' };
  }

  const zuoShan = MOUNTAIN_MAP[zuoShanName];
  const xiangShanName = zuoShan.opposite;
  const xiangShan = MOUNTAIN_MAP[xiangShanName];

  // 确定兼向的山名
  // 根据兼山在坐山的哪个方向，向山的兼向是对侧相反的方向
  const jianMountain = MOUNTAIN_MAP[jianMountainName];
  // 找向山的对应兼向（向山的相邻山中，找与兼山对向的山）
  const jianXiangName = jianMountain.opposite;

  // 判断坐山是否需要替卦
  const shanNeedTi = checkTiGuaNeeded(zuoShan, jianMountainName);
  // 判断向山是否需要替卦
  const xiangNeedTi = checkTiGuaNeeded(xiangShan, jianXiangName);

  const shanTiStar = shanNeedTi ? (MOUNTAIN_MAP[jianMountainName].tiStar) : null;
  const xiangTiStar = xiangNeedTi ? (MOUNTAIN_MAP[jianXiangName]?.tiStar ?? null) : null;

  const needTiGua = shanNeedTi || xiangNeedTi;

  let info = `兼${jianMountainName}`;
  if (needTiGua) {
    if (shanNeedTi) info += `，坐山用替星${shanTiStar ?? '(无替)'}`;
    if (xiangNeedTi) info += `，向山用替星${xiangTiStar ?? '(无替)'}`;
  } else {
    info += '，同宫天人互兼，不用替卦';
  }

  return { shanTiStar, xiangTiStar, needTiGua, info };
}
