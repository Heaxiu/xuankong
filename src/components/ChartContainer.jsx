import FangPan from './FangPan.jsx';
import YuanPan from './YuanPan.jsx';
import ShuiFa from './ShuiFa.jsx';
import ChengMen from './ChengMen.jsx';
import PaiLong from './PaiLong.jsx';
import GuaXiang from './GuaXiang.jsx';

const TABS = [
  { id: 'fangpan', label: '方盘' },
  { id: 'yuanpan', label: '圆盘' },
  { id: 'shuifa', label: '水法' },
  { id: 'chengmen', label: '城门' },
  { id: 'pailong', label: '排龙' },
  { id: 'guaxiang', label: '卦象' },
];

export default function ChartContainer({ data, mode, onModeChange }) {
  return (
    <div>
      {/* Tab 切换 */}
      <div className="chart-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`chart-tab ${mode === tab.id ? 'active' : ''}`}
            onClick={() => onModeChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 排盘内容区 */}
      <div style={{ minHeight: '500px' }}>
        {!data ? (
          <div className="empty-hint">
            请选择运和坐山以开始排盘
          </div>
        ) : (
          <>
            {mode === 'fangpan' && <FangPan data={data} />}
            {mode === 'yuanpan' && <YuanPan data={data} />}
            {mode === 'shuifa' && <ShuiFa data={data} />}
            {mode === 'chengmen' && <ChengMen data={data} />}
            {mode === 'pailong' && <PaiLong data={data} />}
            {mode === 'guaxiang' && <GuaXiang data={data} />}
          </>
        )}
      </div>
    </div>
  );
}
