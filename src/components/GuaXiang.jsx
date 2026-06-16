import { GRID_TO_PALACE, LUOSHU_TO_NAME } from '../data/luoshu.js';
import { TRIGRAMS } from '../data/trigrams.js';

const PALACE_NAMES = ['', '坎', '坤', '震', '巽', '中', '乾', '兑', '艮', '离'];

// 五行颜色
const ELEMENT_COLORS = {
  '水': '#5b9bd5',
  '土': '#d4a843',
  '木': '#5a9e5a',
  '火': '#cc4444',
  '金': '#d4c060',
};

export default function GuaXiang({ data }) {
  if (!data) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{ fontFamily: 'var(--font-classical)', fontSize: '18px', color: 'var(--color-gold)', letterSpacing: '3px' }}>
        卦象
      </div>
      <div style={{ fontSize: '13px', color: 'var(--color-text-dim)', textAlign: 'center', letterSpacing: '2px' }}>
        八卦九宫对应卦象·五行·自然属性
      </div>

      <div className="guaxiang-grid">
        {GRID_TO_PALACE.flat().map(palaceNum => {
          const palaceName = PALACE_NAMES[palaceNum];
          const trigram = TRIGRAMS[palaceName] || { symbol: '☯', element: '土', nature: '中', direction: '中' };
          const elemColor = ELEMENT_COLORS[trigram.element] || 'var(--color-gold)';

          return (
            <div key={palaceNum} className="guaxiang-cell">
              <div className="guaxiang-symbol" style={{ color: elemColor }}>
                {trigram.symbol}
              </div>
              <div className="guaxiang-name">{palaceName}</div>
              <div className="guaxiang-nature" style={{ color: elemColor }}>
                {trigram.nature}
              </div>
              <div className="guaxiang-nature">
                {trigram.element} · {trigram.direction}
              </div>
            </div>
          );
        })}
      </div>

      {/* 八卦详情列表 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', maxWidth: '580px', width: '100%' }}>
        {Object.entries(TRIGRAMS).filter(([k]) => k !== '中').map(([name, t]) => (
          <div key={name} style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '30px', color: ELEMENT_COLORS[t.element] }}>{t.symbol}</div>
            <div style={{ fontFamily: 'var(--font-classical)', color: 'var(--color-gold)' }}>{name}</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>{t.nature} · {t.element}</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>{t.direction} · {t.luoshuNum}宫</div>
          </div>
        ))}
      </div>

      <div className="chart-info-card" style={{ maxWidth: '580px' }}>
        <div><span className="highlight">卦象与五行：</span>坎水·坤土·震木·巽木·乾金·兑金·艮土·离火</div>
        <div>先天八卦乾一，兑二，离三，震四，巽五，坎六，艮七，坤八</div>
      </div>
    </div>
  );
}
