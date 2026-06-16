// 玄空飞星主计算Hook
import { useMemo } from 'react';
import { calcFullChart } from '../utils/xuankongAlgorithm.js';
import { resolveJianGua } from '../utils/jianGuaHelper.js';
import { calcShuiFa } from '../utils/shuiFaHelper.js';
import { calcChengMen } from '../utils/chengMenHelper.js';
import { calcPaiLong } from '../utils/paiLongHelper.js';
import { calcGuaXiang } from '../utils/guaXiangHelper.js';
import { calcFuXing } from '../utils/fuXingHelper.js';
import { MOUNTAIN_MAP } from '../data/mountains24.js';

/**
 * 玄空飞星主计算Hook
 * @param {number} yun - 当运（1-9）
 * @param {string} zuoShan - 坐山名（如'子'）
 * @param {string|null} jianGua - 兼向山名（null=正向不兼）
 * @returns 完整排盘数据
 */
export function useXuankong(yun, zuoShan, jianGua) {
  return useMemo(() => {
    if (!yun || !zuoShan) return null;

    try {
      // 1. 处理兼卦替星
      const jianGuaResult = resolveJianGua(zuoShan, jianGua);
      const { shanTiStar, xiangTiStar } = jianGuaResult;

      // 2. 计算主盘（运盘/山盘/向盘）
      const chart = calcFullChart(yun, zuoShan, shanTiStar, xiangTiStar);
      const { yunPan, shanPan, xiangPan, shanInfo, xiangInfo, zuoShan: zuoShanData, xiangShan } = chart;

      // 3. 水法
      const shuiFa = calcShuiFa(xiangPan, yun);

      // 4. 城门
      const chengMen = calcChengMen(yunPan, xiangShan.name, yun);

      // 5. 排龙
      const paiLong = calcPaiLong(zuoShan, shanPan, yun);

      // 6. 卦象
      const guaXiang = calcGuaXiang();

      // 7. 辅星水法
      const fuXing = calcFuXing(xiangShan.name);

      return {
        yun,
        zuoShanName: zuoShan,
        xiangShanName: xiangShan.name,
        zuoShanData,
        xiangShan,
        jianGuaInfo: jianGuaResult,
        yunPan,
        shanPan,
        xiangPan,
        shanInfo,
        xiangInfo,
        shuiFa,
        chengMen,
        paiLong,
        guaXiang,
        fuXing,
      };
    } catch (e) {
      console.error('排盘计算错误:', e);
      return null;
    }
  }, [yun, zuoShan, jianGua]);
}
