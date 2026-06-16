// 八卦数据

export const TRIGRAMS = {
  '坎': { nature: '水', symbol: '☵', luoshuNum: 1, element: '水', direction: '北', yao: '阳' },
  '坤': { nature: '地', symbol: '☷', luoshuNum: 2, element: '土', direction: '西南', yao: '阴' },
  '震': { nature: '雷', symbol: '☳', luoshuNum: 3, element: '木', direction: '东', yao: '阳' },
  '巽': { nature: '风', symbol: '☴', luoshuNum: 4, element: '木', direction: '东南', yao: '阴' },
  '中': { nature: '中', symbol: '☯', luoshuNum: 5, element: '土', direction: '中', yao: '中' },
  '乾': { nature: '天', symbol: '☰', luoshuNum: 6, element: '金', direction: '西北', yao: '阳' },
  '兑': { nature: '泽', symbol: '☱', luoshuNum: 7, element: '金', direction: '西', yao: '阴' },
  '艮': { nature: '山', symbol: '☶', luoshuNum: 8, element: '土', direction: '东北', yao: '阳' },
  '离': { nature: '火', symbol: '☲', luoshuNum: 9, element: '火', direction: '南', yao: '阴' },
};

// 洛书数 → 八卦名
export const LUOSHU_TO_TRIGRAM = {
  1: '坎', 2: '坤', 3: '震', 4: '巽',
  5: '中', 6: '乾', 7: '兑', 8: '艮', 9: '离',
};

// 五行相生
export const ELEMENT_SHENG = {
  '木': '火', '火': '土', '土': '金', '金': '水', '水': '木',
};

// 五行相克
export const ELEMENT_KE = {
  '木': '土', '火': '金', '土': '水', '金': '木', '水': '火',
};
