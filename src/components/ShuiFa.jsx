import { GRID_TO_PALACE, LUOSHU_TO_NAME, LUOSHU_TO_DIRECTION } from '../data/luoshu.js';

const WATER_ARROWS = {
  laishui: { arrow: '⬇', color: '#5a9e5a', label: '来水大吉' },
  laishui_sheng: { arrow: '↙', color: '#8ac888', label: '来水吉' },
  qushui: { arrow: '↗', color: '#d4884a', label: '去水可' },
  qushui_xiong: { arrow: '⬆', color: '#cc2222', label: '去水凶' },
  neutral: { arrow: '－', color: '#666050', label: '平' },
};

// 将shuiFa数组转为palace→item的map
function buildShuiFaMap(shuiFa) {
  const map = {};
  if (!shuiFa) return map;
  shuiFa.forEach(item => { map[item.palace] = item; });
  return map;
}

// 辅星水法九星颜色
const FU_STAR_COLORS = {
  ji: '#5a9e5a',
  xiong: '#cc2222',
  neutral: '#666050',
};

export default function ShuiFa({ data }) {
  if (!data) return null;
  const { shuiFa, fuXing, yun, zuoShanName, xiangShanName } = data;
  const sfMap = buildShuiFaMap(shuiFa);

  return (
    <div className="shuifa-container">
      <div style={{ fontFamily: 'var(--font-classical)', fontSize: '16px', color: 'var(--color-gold)', letterSpacing: '3px', textAlign: 'center' }}>
        水法吉凶方位
      </div>
      <div style={{ fontSize: '13px', color: 'var(--color-text-dim)', textAlign: 'center' }}>
        {yun}运 · {zuoShanName}山{xiangShanName}向 · 以向盘（水盘）论
      </div>

      {/* 沈氏玄空水法 */}
      <div style={{ fontFamily: 'var(--font-classical)', fontSize: '14px', color: 'var(--color-gold)', letterSpacing: '2px', textAlign: 'center', marginTop: '12px' }}>
        ── 沈氏玄空水法 ──
      </div>
      <div className="shuifa-grid">
        {GRID_TO_PALACE.flat().map(palaceNum => {
          if (palaceNum === 5) {
            return (
              <div key={5} className="shuifa-cell center">
                <div className="shuifa-direction">中宫</div>
                <div className="shuifa-arrow" style={{ color: '#6a5820' }}>☯</div>
              </div>
            );
          }
          const item = sfMap[palaceNum];
          const config = item ? (WATER_ARROWS[item.type] || WATER_ARROWS.neutral) : WATER_ARROWS.neutral;
          const palaceName = LUOSHU_TO_NAME[palaceNum];
          const direction = LUOSHU_TO_DIRECTION[palaceNum];

          return (
            <div key={palaceNum} className="shuifa-cell">
              <div className="shuifa-direction" style={{ fontFamily: 'var(--font-classical)' }}>
                {palaceName}宫·{direction}
              </div>
              <div className="shuifa-arrow" style={{ color: config.color }}>
                {config.arrow}
              </div>
              <div className="shuifa-desc" style={{ color: config.color }}>
                {item?.desc || config.label}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>
                向星：{item?.star || '-'}
              </div>
            </div>
          );
        })}
      </div>

      {/* 图例说明 */}
      <div className="chart-info-card" style={{ maxWidth: '440px' }}>
        <div>水法口诀：<span className="highlight">旺星到水方来吉，衰星到水方去吉</span></div>
        <div style={{ marginTop: '6px' }}>
          <span style={{ color: '#5a9e5a' }}>⬇ 来水大吉</span>（旺星）&nbsp;
          <span style={{ color: '#8ac888' }}>↙ 来水吉</span>（生气）&nbsp;
          <span style={{ color: '#d4884a' }}>↗ 去水可</span>（退气）&nbsp;
          <span style={{ color: '#cc2222' }}>⬆ 去水凶</span>（死气）
        </div>
      </div>

      {/* ===== 辅星水法 ===== */}
      {fuXing && (
        <>
          <div style={{ fontFamily: 'var(--font-classical)', fontSize: '14px', color: 'var(--color-gold)', letterSpacing: '2px', textAlign: 'center', marginTop: '28px' }}>
            ── 辅星水法 ──
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-dim)', textAlign: 'center' }}>
            {xiangShanName}向 · 纳甲{fuXing.naJiaGua}卦起辅
          </div>

          {/* 辅星水法九宫格 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            maxWidth: '580px',
            width: '100%',
            margin: '12px auto 0',
          }}>
            {fuXing.directions.map(d => {
              const bgColor = d.isXiang
                ? 'rgba(212,168,67,0.12)'
                : d.type === 'ji'
                  ? 'rgba(90,158,90,0.08)'
                  : d.type === 'xiong'
                    ? 'rgba(204,34,34,0.08)'
                    : 'var(--color-bg-card)';
              const borderColor = d.isXiang
                ? 'var(--color-gold-dark)'
                : 'var(--color-border)';

              return (
                <div key={d.trigram} style={{
                  background: bgColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px',
                  textAlign: 'center',
                  position: 'relative',
                }}>
                  {d.isXiang && (
                    <div style={{
                      position: 'absolute', top: '3px', right: '5px',
                      fontSize: '9px', color: 'var(--color-gold)', fontFamily: 'var(--font-classical)',
                    }}>向</div>
                  )}
                  <div style={{ fontFamily: 'var(--font-classical)', fontSize: '12px', color: 'var(--color-text-dim)' }}>
                    {d.trigram}宫·{d.direction}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-classical)',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: FU_STAR_COLORS[d.type],
                    margin: '4px 0',
                  }}>
                    {d.star}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: FU_STAR_COLORS[d.type],
                  }}>
                    {d.type === 'ji' ? '来水吉' : d.type === 'xiong' ? '去水凶' : '-'}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-dim)', marginTop: '2px' }}>
                    {d.element}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 辅星水法说明 */}
          <div className="chart-info-card" style={{ maxWidth: '580px' }}>
            <div><span className="highlight">辅星水法口诀：</span>辅星翻卦从向起，贪巨武辅四吉星，禄文廉破四凶星。</div>
            <div style={{ marginTop: '6px' }}>
              <span style={{ color: '#5a9e5a' }}>吉星方</span>：来水吉（辅、贪狼、巨门、武曲）&nbsp;&nbsp;
              <span style={{ color: '#cc2222' }}>凶星方</span>：去水凶（禄存、文曲、廉贞、破军）
            </div>
            <div style={{ marginTop: '6px', color: 'var(--color-text-dim)' }}>
              吉方来水：{fuXing.jiFang.join('、')} &nbsp;|&nbsp; 凶方去水：{fuXing.xiongFang.join('、')}
            </div>
          </div>
        </>
      )}
    </div>
  );
}