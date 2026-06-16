import { MOUNTAINS } from '../data/mountains24.js';
import { LUOSHU_TO_NAME, LUOSHU_TO_DIRECTION, GRID_TO_PALACE } from '../data/luoshu.js';
import { TRIGRAMS } from '../data/trigrams.js';
import { getStarStatus } from '../data/periods.js';
import { numToCn } from '../utils/feixingHelper.js';

const CX = 300, CY = 300;
const R_OUTER = 280;  // 最外圈（24山文字）
const R_24 = 250;     // 24山环外边
const R_24_IN = 210;  // 24山环内边
const R_PALACE = 160; // 八宫环外边
const R_CENTER = 70;  // 中宫半径

// 角度转SVG坐标（南在上/北在下：坐山在下方视角，+90使南=上方）
function degToXY(deg, r) {
  const rad = (deg + 90) * Math.PI / 180;
  return {
    x: CX + r * Math.cos(rad),
    y: CY + r * Math.sin(rad),
  };
}

// 极坐标弧线路径
function arcPath(r, startDeg, endDeg, sweep = 1) {
  const s = degToXY(startDeg, r);
  const e = degToXY(endDeg, r);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} ${sweep} ${e.x} ${e.y}`;
}

// 扇形路径
function sectorPath(r1, r2, startDeg, endDeg) {
  const s1 = degToXY(startDeg, r1);
  const e1 = degToXY(endDeg, r1);
  const s2 = degToXY(startDeg, r2);
  const e2 = degToXY(endDeg, r2);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${s1.x} ${s1.y} A ${r1} ${r1} 0 ${large} 1 ${e1.x} ${e1.y} L ${e2.x} ${e2.y} A ${r2} ${r2} 0 ${large} 0 ${s2.x} ${s2.y} Z`;
}

// 八卦宫顺序（顺时针，从北偏西开始）
const PALACE_SECTORS = [
  { num: 1, name: '坎', startDeg: 337.5, endDeg: 22.5 },   // 北
  { num: 8, name: '艮', startDeg: 22.5, endDeg: 67.5 },    // 东北
  { num: 3, name: '震', startDeg: 67.5, endDeg: 112.5 },   // 东
  { num: 4, name: '巽', startDeg: 112.5, endDeg: 157.5 },  // 东南
  { num: 9, name: '离', startDeg: 157.5, endDeg: 202.5 },  // 南
  { num: 2, name: '坤', startDeg: 202.5, endDeg: 247.5 },  // 西南
  { num: 7, name: '兑', startDeg: 247.5, endDeg: 292.5 },  // 西
  { num: 6, name: '乾', startDeg: 292.5, endDeg: 337.5 },  // 西北
];

export default function YuanPan({ data }) {
  if (!data) return null;
  const { yunPan, shanPan, xiangPan, yun, zuoShanData, xiangShan, zuoShanName, xiangShanName } = data;

  const getStarColor = (star) => {
    const st = getStarStatus(star, yun);
    if (st === '旺') return '#d4a843';
    if (st === '生') return '#f0d68a';
    return '#666050';
  };

  return (
    <div className="yuanpan-container">
      <svg width="600" height="600" viewBox="0 0 600 600" style={{ maxWidth: '100%' }}>
        {/* 渐变背景 */}
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1a0a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2a1a00" />
            <stop offset="100%" stopColor="#1a0f00" />
          </radialGradient>
        </defs>

        {/* 背景圆 */}
        <circle cx={CX} cy={CY} r={R_OUTER + 10} fill="url(#bgGrad)" stroke="#3a3020" strokeWidth="2" />

        {/* 24山环（每格15度） */}
        {MOUNTAINS.map((m, i) => {
          const startDeg = m.degree - 7.5;
          const endDeg = m.degree + 7.5;
          const isZuo = m.name === zuoShanName;
          const isXiang = m.name === xiangShanName;

          const fillColor = isZuo ? 'rgba(139,0,0,0.4)' : isXiang ? 'rgba(91,155,213,0.3)' : 'rgba(212,168,67,0.04)';
          const strokeColor = isZuo ? '#cc2222' : isXiang ? '#5b9bd5' : '#3a3020';

          const mid = degToXY(m.degree, (R_24 + R_24_IN) / 2);

          return (
            <g key={m.name}>
              <path
                d={sectorPath(R_24, R_24_IN, startDeg, endDeg)}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={isZuo || isXiang ? 1.5 : 0.5}
              />
              <text
                x={mid.x} y={mid.y}
                textAnchor="middle" dominantBaseline="central"
                fontSize="13"
                fontFamily="'Noto Serif SC', SimSun, serif"
                fontWeight={isZuo || isXiang ? 'bold' : 'normal'}
                fill={isZuo ? '#ff6666' : isXiang ? '#88bbee' : '#d4a843'}
                transform={`rotate(${m.degree + 180}, ${mid.x}, ${mid.y})`}
              >
                {m.name}
              </text>
            </g>
          );
        })}

        {/* 八宫环 */}
        {PALACE_SECTORS.map(sector => {
          const midDeg = (sector.startDeg + (sector.startDeg > sector.endDeg ? sector.endDeg + 360 : sector.endDeg)) / 2;
          const palaceNum = sector.num;
          const yunStar = yunPan[palaceNum];
          const shanStar = shanPan[palaceNum];
          const xiangStar = xiangPan[palaceNum];
          const trigram = TRIGRAMS[sector.name] || {};

          // 文字位置（宫环中间）
          const midR = (R_PALACE + R_CENTER + 20) / 2;
          const textCenter = degToXY(midDeg % 360, midR);

          return (
            <g key={sector.name}>
              <path
                d={sectorPath(R_PALACE, R_CENTER + 20, sector.startDeg, sector.endDeg)}
                fill="rgba(212,168,67,0.03)"
                stroke="#3a3020"
                strokeWidth="1"
              />
              {/* 宫名 */}
              <text
                x={textCenter.x} y={textCenter.y - 28}
                textAnchor="middle" dominantBaseline="central"
                fontSize="12" fontFamily="'Noto Serif SC', serif"
                fill="#a09080"
              >
                {sector.name}
              </text>
              {/* 向星（上方） */}
              <text
                x={textCenter.x} y={textCenter.y - 10}
                textAnchor="middle" dominantBaseline="central"
                fontSize="16" fontWeight="bold" fontFamily="'Noto Serif SC', serif"
                fill="#5b9bd5"
              >
                {xiangStar}
              </text>
              {/* 运星（中间） */}
              <text
                x={textCenter.x} y={textCenter.y + 10}
                textAnchor="middle" dominantBaseline="central"
                fontSize="20" fontWeight="bold" fontFamily="'Noto Serif SC', serif"
                fill={getStarColor(yunStar)}
              >
                {numToCn(yunStar)}
              </text>
              {/* 山星（下方） */}
              <text
                x={textCenter.x} y={textCenter.y + 28}
                textAnchor="middle" dominantBaseline="central"
                fontSize="16" fontWeight="bold" fontFamily="'Noto Serif SC', serif"
                fill="#cc4444"
              >
                {shanStar}
              </text>
            </g>
          );
        })}

        {/* 中宫圆 */}
        <circle cx={CX} cy={CY} r={R_CENTER + 20} fill="url(#centerGrad)" stroke="#6a5820" strokeWidth="2" />

        {/* 中宫文字 */}
        <text x={CX} y={CY - 42} textAnchor="middle" fontSize="13" fontFamily="'Noto Serif SC', serif" fill="#a09080">中宫</text>
        {/* 中向星（上方） */}
        <text x={CX} y={CY - 22} textAnchor="middle" fontSize="20" fontWeight="bold" fontFamily="'Noto Serif SC', serif" fill="#5b9bd5">{xiangPan[5]}</text>
        {/* 中运星（中间） */}
        <text x={CX} y={CY + 4} textAnchor="middle" fontSize="28" fontWeight="bold" fontFamily="'Noto Serif SC', serif" fill={getStarColor(yunPan[5])}>{numToCn(yunPan[5])}</text>
        {/* 中山星（下方） */}
        <text x={CX} y={CY + 28} textAnchor="middle" fontSize="20" fontWeight="bold" fontFamily="'Noto Serif SC', serif" fill="#cc4444">{shanPan[5]}</text>

        {/* 运数标注 */}
        <text x={CX} y={CY + 48} textAnchor="middle" fontSize="12" fontFamily="'Noto Serif SC', serif" fill="#6a5820">
          {yun}运
        </text>

        {/* 方位标注：上南下北左东右西（坐山在下/向山在上视角） */}
        <text x={CX} y={20} textAnchor="middle" fontSize="14" fontFamily="'Noto Serif SC', serif" fill="#cc4444">南</text>
        <text x={CX} y={588} textAnchor="middle" fontSize="14" fontFamily="'Noto Serif SC', serif" fill="#5b9bd5">北</text>
        <text x={12} y={CY + 5} textAnchor="middle" fontSize="14" fontFamily="'Noto Serif SC', serif" fill="#a09080">东</text>
        <text x={588} y={CY + 5} textAnchor="middle" fontSize="14" fontFamily="'Noto Serif SC', serif" fill="#a09080">西</text>
      </svg>

      <div className="chart-info-card" style={{ maxWidth: '580px' }}>
        坐山 <span className="red">红色高亮</span> ｜ 向 <span className="blue">蓝色高亮</span> ｜
        宫格内（上→下）：<span className="blue">向星</span> <span className="highlight">运星</span> <span className="red">山星</span>
      </div>
    </div>
  );
}
