// 辅星水法（纳甲辅星翻卦）
import { MOUNTAIN_MAP } from '../data/mountains24.js';

// 八卦三爻 (初爻=yao[0], 二爻=yao[1], 三爻=yao[2])
const TRIGRAM_YAO = {
  '乾': [1, 1, 1],
  '兑': [1, 1, 0],
  '离': [1, 0, 1],
  '震': [1, 0, 0],
  '巽': [0, 1, 1],
  '坎': [0, 1, 0],
  '艮': [0, 0, 1],
  '坤': [0, 0, 0],
};

// 爻数组 → 卦名
const YAO_TO_TRIGRAM = {};
Object.entries(TRIGRAM_YAO).forEach(([name, yao]) => {
  YAO_TO_TRIGRAM[yao.join('')] = name;
});

// 24山 → 纳甲卦归属
const NA_JIA_MAP = {
  '壬': '乾', '子': '坎', '癸': '坤',
  '丑': '兑', '艮': '艮', '寅': '离',
  '甲': '乾', '卯': '震', '乙': '坤',
  '辰': '坎', '巽': '巽', '巳': '兑',
  '丙': '艮', '午': '离', '丁': '兑',
  '未': '震', '坤': '坤', '申': '坎',
  '庚': '震', '酉': '兑', '辛': '巽',
  '戌': '离', '乾': '乾', '亥': '震',
};

// 辅星翻卦爻变顺序：上→中→下→中→上→中→下→中
const YAO_SEQ = [2, 1, 0, 1, 2, 1, 0, 1];

// 九星名称及吉凶
const STAR_INFO = {
  '辅':   { name: '辅',   type: 'ji',  desc: '辅星（吉）' },
  '贪狼': { name: '贪狼', type: 'ji',  desc: '贪狼（吉）' },
  '巨门': { name: '巨门', type: 'ji',  desc: '巨门（吉）' },
  '武曲': { name: '武曲', type: 'ji',  desc: '武曲（吉）' },
  '禄存': { name: '禄存', type: 'xiong', desc: '禄存（凶）' },
  '文曲': { name: '文曲', type: 'xiong', desc: '文曲（凶）' },
  '廉贞': { name: '廉贞', type: 'xiong', desc: '廉贞（凶）' },
  '破军': { name: '破军', type: 'xiong', desc: '破军（凶）' },
};

// 九星顺序（辅星翻卦）
const STAR_ORDER = ['贪狼', '巨门', '禄存', '文曲', '廉贞', '武曲', '破军'];

// 八卦方位
const TRIGRAM_DIR = {
  '坎': '北', '艮': '东北', '震': '东', '巽': '东南',
  '离': '南', '坤': '西南', '兑': '西', '乾': '西北',
};

// 八卦五行
const TRIGRAM_ELEM = {
  '坎': '水', '艮': '土', '震': '木', '巽': '木',
  '离': '火', '坤': '土', '兑': '金', '乾': '金',
};

/**
 * 辅星翻卦计算
 * @param {string} xiangShanName - 向山名
 * @returns {Object} 辅星水法结果
 */
export function calcFuXing(xiangShanName) {
  // 1. 确定向山的纳甲卦
  const naJiaGua = NA_JIA_MAP[xiangShanName];
  if (!naJiaGua) return null;

  // 2. 从向卦起辅，进行翻卦
  const startGua = naJiaGua;
  const result = {};

  // 本卦 = 辅
  result[startGua] = '辅';

  // 依次变爻
  let currentYao = [...TRIGRAM_YAO[startGua]];
  for (let i = 0; i < 7; i++) {
    const pos = YAO_SEQ[i];
    currentYao = [...currentYao];
    currentYao[pos] = currentYao[pos] === 1 ? 0 : 1;

    const guaName = YAO_TO_TRIGRAM[currentYao.join('')];
    if (guaName) {
      result[guaName] = STAR_ORDER[i];
    }
  }

  // 3. 组织输出：八卦方位 → 九星 → 吉凶
  const directions = [];
  const trigrams = ['坎', '艮', '震', '巽', '离', '坤', '兑', '乾'];
  for (const gua of trigrams) {
    const star = result[gua];
    const info = star ? STAR_INFO[star] : null;
    directions.push({
      trigram: gua,
      direction: TRIGRAM_DIR[gua],
      element: TRIGRAM_ELEM[gua],
      star: star || '-',
      type: info ? info.type : 'neutral',
      desc: info ? info.desc : '-',
      isXiang: gua === startGua,
    });
  }

  return {
    xiangShan: xiangShanName,
    naJiaGua: startGua,
    directions,
    jiFang: directions.filter(d => d.type === 'ji').map(d => d.direction),
    xiongFang: directions.filter(d => d.type === 'xiong').map(d => d.direction),
  };
}