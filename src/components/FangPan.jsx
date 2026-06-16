import { PALACE_GRID_POS, LUOSHU_TO_DIRECTION, LUOSHU_TO_NAME } from '../data/luoshu.js';
import { GRID_TO_PALACE } from '../data/luoshu.js';
import { getStarStatus } from '../data/periods.js';
import { numToCn } from '../utils/feixingHelper.js';

// 旺星样式
function getStarClass(star, yunNum) {
  const status = getStarStatus(star, yunNum);
  if (status === '旺') return 'star-wang';
  if (status === '生') return 'star-sheng';
  return 'star-shuai';
}

// 单宫格组件
function FangPanCell({ palaceNum, yunStar, shanStar, xiangStar, yunNum, isZuoShan, isXiangShan, isCenter }) {
  const palaceName = LUOSHU_TO_NAME[palaceNum];
  const direction = LUOSHU_TO_DIRECTION[palaceNum];

  let cellClass = 'fangpan-cell';
  if (isZuoShan) cellClass += ' is-zuoshan';
  else if (isXiangShan) cellClass += ' is-xiangshan';
  if (isCenter) cellClass += ' is-center';

  return (
    <div className={cellClass}>
      <div className="cell-palace-name">{palaceName}宫</div>
      <div className="cell-stars">
        <div className={`cell-shan-star ${getStarClass(shanStar, yunNum)}`}>{shanStar}</div>
        <div className={`cell-yun-star ${getStarClass(yunStar, yunNum)}`}>{numToCn(yunStar)}</div>
        <div className={`cell-xiang-star ${getStarClass(xiangStar, yunNum)}`}>{xiangStar}</div>
      </div>
      <div className="cell-direction">{direction}</div>
    </div>
  );
}

export default function FangPan({ data }) {
  if (!data) return null;
  const { yunPan, shanPan, xiangPan, yun, zuoShanData, xiangShan, shanInfo, xiangInfo, jianGuaInfo } = data;

  // 3x3 grid 渲染，上南下北
  return (
    <div className="fangpan-container">
      {/* 方位标签 */}
      <div className="direction-marker south">◎ 南（向首）</div>

      {/* 坐向兼卦信息 */}
      <div className="fangpan-info-bar">
        <span>坐山：{data.zuoShanName}（{zuoShanData.palace}宫·{zuoShanData.yuanLong}元）</span>
        <span>向：{data.xiangShanName}（{xiangShan.palace}宫·{xiangShan.yuanLong}元）</span>
        <span>山盘：{shanInfo.centerStar}入中{shanInfo.isForward ? '顺' : '逆'}飞{shanInfo.hasTiGua ? '（替卦）' : ''}</span>
        <span>向盘：{xiangInfo.centerStar}入中{xiangInfo.isForward ? '顺' : '逆'}飞{xiangInfo.hasTiGua ? '（替卦）' : ''}</span>
      </div>

      <div className="fangpan-grid">
        {GRID_TO_PALACE.flat().map((palaceNum, idx) => {
          const isZuoShan = palaceNum === zuoShanData.palaceNum;
          const isXiangShan = palaceNum === xiangShan.palaceNum;
          const isCenter = palaceNum === 5;
          return (
            <FangPanCell
              key={palaceNum}
              palaceNum={palaceNum}
              yunStar={yunPan[palaceNum]}
              shanStar={shanPan[palaceNum]}
              xiangStar={xiangPan[palaceNum]}
              yunNum={yun}
              isZuoShan={isZuoShan}
              isXiangShan={isXiangShan}
              isCenter={isCenter}
            />
          );
        })}
      </div>

      <div className="direction-marker north">◎ 北（坐山）</div>

      {/* 图例 */}
      <div className="chart-info-card">
        <span className="red">■</span> 山星（坐星）&nbsp;&nbsp;
        <span className="highlight">■</span> 运盘星（中）&nbsp;&nbsp;
        <span className="blue">■</span> 向星（水星）&nbsp;&nbsp;
        旺星<span className="highlight">✦</span> = 当运旺星 &nbsp;&nbsp;
        <span style={{color:'var(--color-red)', fontFamily:'var(--font-classical)'}}>红框</span>=坐山宫&nbsp;&nbsp;
        <span style={{color:'var(--color-blue)', fontFamily:'var(--font-classical)'}}>蓝框</span>=向宫
        {jianGuaInfo.needTiGua && (
          <div style={{ marginTop: '6px', color: 'var(--color-orange)' }}>
            ⚠ {jianGuaInfo.info}
          </div>
        )}
      </div>
    </div>
  );
}
