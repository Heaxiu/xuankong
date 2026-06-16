import { PERIODS } from '../data/periods.js';
import { MOUNTAINS, MOUNTAIN_MAP } from '../data/mountains24.js';

// 按八卦宫分组24山
const PALACE_GROUPS = [
  { palace: '坎', mountains: ['壬', '子', '癸'] },
  { palace: '艮', mountains: ['丑', '艮', '寅'] },
  { palace: '震', mountains: ['甲', '卯', '乙'] },
  { palace: '巽', mountains: ['辰', '巽', '巳'] },
  { palace: '离', mountains: ['丙', '午', '丁'] },
  { palace: '坤', mountains: ['未', '坤', '申'] },
  { palace: '兑', mountains: ['庚', '酉', '辛'] },
  { palace: '乾', mountains: ['戌', '乾', '亥'] },
];

export default function ControlPanel({ yun, zuoShan, jianGua, onYunChange, onZuoShanChange, onJianGuaChange }) {
  const xiangShanName = zuoShan ? MOUNTAIN_MAP[zuoShan]?.opposite : '';
  const currentMountain = zuoShan ? MOUNTAIN_MAP[zuoShan] : null;

  // 获取坐山的相邻山作为兼卦选项
  const jianGuaOptions = currentMountain ? currentMountain.adjacent : [];

  const handleZuoShanChange = (e) => {
    onZuoShanChange(e.target.value);
    onJianGuaChange(null); // 重置兼卦
  };

  return (
    <div className="control-panel">
      {/* 运选择 */}
      <div className="control-group">
        <span className="control-label">运：</span>
        <select value={yun} onChange={e => onYunChange(Number(e.target.value))}>
          {PERIODS.map(p => (
            <option key={p.yun} value={p.yun}>
              {p.name}（{p.startYear}—{p.endYear}）
            </option>
          ))}
        </select>
      </div>

      <div className="divider" />

      {/* 坐山选择 */}
      <div className="control-group">
        <span className="control-label">坐山：</span>
        <select value={zuoShan} onChange={handleZuoShanChange}>
          {PALACE_GROUPS.map(group => (
            <optgroup key={group.palace} label={`── ${group.palace}宫 ──`}>
              {group.mountains.map(m => {
                const mData = MOUNTAIN_MAP[m];
                return (
                  <option key={m} value={m}>
                    {m}山{mData.opposite}向（{mData.yuanLong}元·{mData.yinYang}）
                  </option>
                );
              })}
            </optgroup>
          ))}
        </select>
      </div>

      {/* 坐向展示 */}
      {zuoShan && (
        <div className="zuoxiang-info">
          {zuoShan}山{xiangShanName}向
          {currentMountain && <span style={{ fontSize: '12px', marginLeft: '8px', color: 'var(--color-text-dim)' }}>
            {currentMountain.palace}宫·{currentMountain.yuanLong}元·{currentMountain.yinYang}
          </span>}
        </div>
      )}

      <div className="divider" />

      {/* 兼卦选择 */}
      <div className="control-group">
        <span className="control-label">兼卦：</span>
        <select
          value={jianGua || ''}
          onChange={e => onJianGuaChange(e.target.value || null)}
          disabled={!zuoShan}
        >
          <option value="">正向下卦（不兼）</option>
          {jianGuaOptions.map(adj => (
            <option key={adj} value={adj}>兼{adj}</option>
          ))}
        </select>
        {jianGua && (
          <span className="jiangua-tag">兼{jianGua}</span>
        )}
      </div>
    </div>
  );
}
