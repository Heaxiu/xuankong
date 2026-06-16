import { useState } from 'react';
import './App.css';
import ControlPanel from './components/ControlPanel.jsx';
import ChartContainer from './components/ChartContainer.jsx';
import { useXuankong } from './hooks/useXuankong.js';
import { PERIOD_MAP } from './data/periods.js';

export default function App() {
  const [yun, setYun] = useState(8);         // 默认八运
  const [zuoShan, setZuoShan] = useState('子'); // 默认子山
  const [jianGua, setJianGua] = useState(null);
  const [chartMode, setChartMode] = useState('fangpan');

  const data = useXuankong(yun, zuoShan, jianGua);
  const period = PERIOD_MAP[yun];

  return (
    <div className="app">
      {/* 头部 */}
      <header className="header">
        <div className="header-title">玄空飛星排盤</div>
        <div className="header-subtitle">三元玄空 · 飞星排盘 · 紫白九星</div>
      </header>

      {/* 控制面板 */}
      <ControlPanel
        yun={yun}
        zuoShan={zuoShan}
        jianGua={jianGua}
        onYunChange={setYun}
        onZuoShanChange={setZuoShan}
        onJianGuaChange={setJianGua}
      />

      {/* 主内容区 */}
      <main className="main-content">
        {/* 当前配置摘要 */}
        {data && (
          <div style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '16px',
            padding: '10px 16px',
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border-gold)',
            borderRadius: 'var(--radius-md)',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-classical)', color: 'var(--color-gold)', fontSize: '16px', letterSpacing: '2px' }}>
              {period?.name}（{period?.startYear}—{period?.endYear}）
            </span>
            <span style={{ color: 'var(--color-text-dim)', fontSize: '13px' }}>·</span>
            <span style={{ fontFamily: 'var(--font-classical)', color: 'var(--color-gold-light)', fontSize: '15px', letterSpacing: '2px' }}>
              {data.zuoShanName}山{data.xiangShanName}向
              {jianGua && <span style={{ color: 'var(--color-orange)', marginLeft: '8px', fontSize: '13px' }}>兼{jianGua}</span>}
            </span>
            <span style={{ color: 'var(--color-text-dim)', fontSize: '13px' }}>·</span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>
              山盘：{data.shanInfo.centerStar}入中{data.shanInfo.isForward ? '顺' : '逆'}飞
              {data.shanInfo.hasTiGua && <span style={{ color: 'var(--color-orange)' }}> (替)</span>}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>
              向盘：{data.xiangInfo.centerStar}入中{data.xiangInfo.isForward ? '顺' : '逆'}飞
              {data.xiangInfo.hasTiGua && <span style={{ color: 'var(--color-orange)' }}> (替)</span>}
            </span>
          </div>
        )}

        <ChartContainer
          data={data}
          mode={chartMode}
          onModeChange={setChartMode}
        />
      </main>

      {/* 页脚 */}
      <footer className="footer">
        玄空飞星排盘 · 三元玄空六法 · 仅供学习参考
      </footer>
    </div>
  );
}
