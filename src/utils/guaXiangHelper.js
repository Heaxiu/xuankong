// 卦象推算
import { TRIGRAMS } from '../data/trigrams.js';

const PALACE_NAMES = ['', '坎', '坤', '震', '巽', '中', '乾', '兑', '艮', '离'];

/**
 * 获取各宫卦象信息
 * @returns {Array} 各宫卦象数据
 */
export function calcGuaXiang() {
  return Array.from({ length: 9 }, (_, i) => {
    const palace = i + 1;
    const name = PALACE_NAMES[palace];
    const trigram = TRIGRAMS[name] || { symbol: '☯', element: '土', nature: '中', direction: '中' };
    return {
      palace,
      name,
      symbol: trigram.symbol,
      element: trigram.element,
      nature: trigram.nature,
      direction: trigram.direction,
    };
  });
}

/**
 * 根据洛书数获取卦象
 */
export function getGuaByNum(num) {
  const name = PALACE_NAMES[num];
  const trigram = TRIGRAMS[name];
  return { name, ...trigram };
}
