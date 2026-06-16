export default function PaiLong({ data }) {
  if (!data) return null;
  const { paiLong, yun, zuoShanName, xiangShanName } = data;
  const { relDesc, dragonFrom, dragonPath, zuoElement, shanStar, shanElement, relation } = paiLong;

  const relColor = {
    sheng_in: 'var(--color-green)',
    sheng_out: 'var(--color-gold)',
    ke_in: 'var(--color-red)',
    ke_out: 'var(--color-orange)',
    same: 'var(--color-blue)',
  }[relation] || 'var(--color-text)';

  return (
    <div className="pailong-container">
      <div className="pailong-title">排龙</div>

      <div style={{ fontSize: '13px', color: 'var(--color-text-dim)', textAlign: 'center', letterSpacing: '2px' }}>
        {yun}运 · {zuoShanName}山{xiangShanName}向
      </div>

      {/* 来龙总结 */}
      <div className="pailong-summary">
        <div style={{ fontSize: '15px', color: 'var(--color-gold)', marginBottom: '10px', letterSpacing: '2px' }}>
          来龙分析
        </div>
        <div style={{ lineHeight: '2.2', fontSize: '14px' }}>
          <div>
            <span style={{ color: 'var(--color-text-dim)' }}>龙脉来源：</span>
            <span style={{ color: 'var(--color-gold-light)' }}>{dragonFrom}</span>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-dim)' }}>坐山宫五行：</span>
            <span style={{ color: 'var(--color-gold-light)' }}>{zuoElement}</span>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-dim)' }}>坐山宫山盘星：</span>
            <span style={{ color: 'var(--color-red)', fontFamily: 'var(--font-classical)', fontSize: '18px' }}>{shanStar}</span>
            <span style={{ color: 'var(--color-text-dim)', marginLeft: '8px' }}>（{shanElement}）</span>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-dim)' }}>生克关系：</span>
            <span style={{ color: relColor, fontWeight: 'bold', fontSize: '15px' }}>{relDesc}</span>
          </div>
        </div>
      </div>

      {/* 各宫山星详情 */}
      <div style={{ fontFamily: 'var(--font-classical)', fontSize: '14px', color: 'var(--color-text-dim)', letterSpacing: '2px' }}>
        山盘各宫山星分布
      </div>
      <div className="pailong-grid">
        {dragonPath.map(item => (
          <div key={item.palace} className={`pailong-item ${item.isWang ? 'wang' : ''}`}>
            <div className="pailong-palace">{item.palaceName}宫·{item.direction}</div>
            <div className="pailong-star">{item.star}</div>
            <div className="pailong-elem">{item.element} · {item.status}</div>
          </div>
        ))}
      </div>

      <div className="chart-info-card">
        <div><span className="highlight">排龙口诀：</span>山管人丁水管财，山星论山，向星论水。</div>
        <div>生入吉，克入凶；旺山旺向财丁两旺。</div>
      </div>
    </div>
  );
}
