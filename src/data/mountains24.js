// 24山核心数据（玄空三元龙阴阳体系）
// 阴阳判断遵循玄空派三元龙：阳=顺飞，阴=逆飞
// 与三合派纳甲阴阳不同！

export const MOUNTAINS = [
  // ===== 坎宫 (洛书1, 北) =====
  {
    name: '壬', palace: '坎', palaceNum: 1,
    yuanLong: '地', yinYang: '阳',
    degree: 337.5, opposite: '丙',
    tiStar: 2,
    adjacent: ['亥', '子'],
    label: '壬'
  },
  {
    name: '子', palace: '坎', palaceNum: 1,
    yuanLong: '天', yinYang: '阴',
    degree: 352.5, opposite: '午',
    tiStar: null,
    adjacent: ['壬', '癸'],
    label: '子'
  },
  {
    name: '癸', palace: '坎', palaceNum: 1,
    yuanLong: '人', yinYang: '阴',
    degree: 7.5, opposite: '丁',
    tiStar: null,
    adjacent: ['子', '丑'],
    label: '癸'
  },

  // ===== 艮宫 (洛书8, 东北) =====
  {
    name: '丑', palace: '艮', palaceNum: 8,
    yuanLong: '地', yinYang: '阴',
    degree: 22.5, opposite: '未',
    tiStar: 7,
    adjacent: ['癸', '艮'],
    label: '丑'
  },
  {
    name: '艮', palace: '艮', palaceNum: 8,
    yuanLong: '天', yinYang: '阳',
    degree: 37.5, opposite: '坤',
    tiStar: 7,
    adjacent: ['丑', '寅'],
    label: '艮'
  },
  {
    name: '寅', palace: '艮', palaceNum: 8,
    yuanLong: '人', yinYang: '阳',
    degree: 52.5, opposite: '申',
    tiStar: 9,
    adjacent: ['艮', '甲'],
    label: '寅'
  },

  // ===== 震宫 (洛书3, 东) =====
  {
    name: '甲', palace: '震', palaceNum: 3,
    yuanLong: '地', yinYang: '阳',
    degree: 67.5, opposite: '庚',
    tiStar: 1,
    adjacent: ['寅', '卯'],
    label: '甲'
  },
  {
    name: '卯', palace: '震', palaceNum: 3,
    yuanLong: '天', yinYang: '阴',
    degree: 82.5, opposite: '酉',
    tiStar: 2,
    adjacent: ['甲', '乙'],
    label: '卯'
  },
  {
    name: '乙', palace: '震', palaceNum: 3,
    yuanLong: '人', yinYang: '阴',
    degree: 97.5, opposite: '辛',
    tiStar: 2,
    adjacent: ['卯', '辰'],
    label: '乙'
  },

  // ===== 巽宫 (洛书4, 东南) =====
  {
    name: '辰', palace: '巽', palaceNum: 4,
    yuanLong: '地', yinYang: '阴',
    degree: 112.5, opposite: '戌',
    tiStar: 6,
    adjacent: ['乙', '巽'],
    label: '辰'
  },
  {
    name: '巽', palace: '巽', palaceNum: 4,
    yuanLong: '天', yinYang: '阳',
    degree: 127.5, opposite: '乾',
    tiStar: 6,
    adjacent: ['辰', '巳'],
    label: '巽'
  },
  {
    name: '巳', palace: '巽', palaceNum: 4,
    yuanLong: '人', yinYang: '阳',
    degree: 142.5, opposite: '亥',
    tiStar: 6,
    adjacent: ['巽', '丙'],
    label: '巳'
  },

  // ===== 离宫 (洛书9, 南) =====
  {
    name: '丙', palace: '离', palaceNum: 9,
    yuanLong: '地', yinYang: '阳',
    degree: 157.5, opposite: '壬',
    tiStar: 7,
    adjacent: ['巳', '午'],
    label: '丙'
  },
  {
    name: '午', palace: '离', palaceNum: 9,
    yuanLong: '天', yinYang: '阴',
    degree: 172.5, opposite: '子',
    tiStar: null,
    adjacent: ['丙', '丁'],
    label: '午'
  },
  {
    name: '丁', palace: '离', palaceNum: 9,
    yuanLong: '人', yinYang: '阴',
    degree: 187.5, opposite: '癸',
    tiStar: null,
    adjacent: ['午', '未'],
    label: '丁'
  },

  // ===== 坤宫 (洛书2, 西南) =====
  {
    name: '未', palace: '坤', palaceNum: 2,
    yuanLong: '地', yinYang: '阴',
    degree: 202.5, opposite: '丑',
    tiStar: null,
    adjacent: ['丁', '坤'],
    label: '未'
  },
  {
    name: '坤', palace: '坤', palaceNum: 2,
    yuanLong: '天', yinYang: '阳',
    degree: 217.5, opposite: '艮',
    tiStar: null,
    adjacent: ['未', '申'],
    label: '坤'
  },
  {
    name: '申', palace: '坤', palaceNum: 2,
    yuanLong: '人', yinYang: '阳',
    degree: 232.5, opposite: '寅',
    tiStar: 1,
    adjacent: ['坤', '庚'],
    label: '申'
  },

  // ===== 兑宫 (洛书7, 西) =====
  {
    name: '庚', palace: '兑', palaceNum: 7,
    yuanLong: '地', yinYang: '阳',
    degree: 247.5, opposite: '甲',
    tiStar: 9,
    adjacent: ['申', '酉'],
    label: '庚'
  },
  {
    name: '酉', palace: '兑', palaceNum: 7,
    yuanLong: '天', yinYang: '阴',
    degree: 262.5, opposite: '卯',
    tiStar: null,
    adjacent: ['庚', '辛'],
    label: '酉'
  },
  {
    name: '辛', palace: '兑', palaceNum: 7,
    yuanLong: '人', yinYang: '阴',
    degree: 277.5, opposite: '乙',
    tiStar: null,
    adjacent: ['酉', '戌'],
    label: '辛'
  },

  // ===== 乾宫 (洛书6, 西北) =====
  {
    name: '戌', palace: '乾', palaceNum: 6,
    yuanLong: '地', yinYang: '阴',
    degree: 292.5, opposite: '辰',
    tiStar: null,
    adjacent: ['辛', '乾'],
    label: '戌'
  },
  {
    name: '乾', palace: '乾', palaceNum: 6,
    yuanLong: '天', yinYang: '阳',
    degree: 307.5, opposite: '巽',
    tiStar: null,
    adjacent: ['戌', '亥'],
    label: '乾'
  },
  {
    name: '亥', palace: '乾', palaceNum: 6,
    yuanLong: '人', yinYang: '阳',
    degree: 322.5, opposite: '巳',
    tiStar: null,
    adjacent: ['乾', '壬'],
    label: '亥'
  },
];

// 山名 → 数据的快速查找表
export const MOUNTAIN_MAP = Object.fromEntries(
  MOUNTAINS.map(m => [m.name, m])
);

// 八卦宫 → 其下三山 [地元, 天元, 人元]
export const PALACE_MOUNTAINS = {
  '坎': ['壬', '子', '癸'],
  '艮': ['丑', '艮', '寅'],
  '震': ['甲', '卯', '乙'],
  '巽': ['辰', '巽', '巳'],
  '离': ['丙', '午', '丁'],
  '坤': ['未', '坤', '申'],
  '兑': ['庚', '酉', '辛'],
  '乾': ['戌', '乾', '亥'],
};

// 24山按顺序排列（用于圆盘显示）
export const MOUNTAINS_ORDER = MOUNTAINS.map(m => m.name);
