import { LUOSHU_TO_NAME, LUOSHU_TO_DIRECTION } from '../data/luoshu.js';
import { numToCn } from '../utils/feixingHelper.js';

export default function ChengMen({ data }) {
  if (!data) return null;
  const { chengMen, yun, zuoShanName, xiangShanName, yunPan } = data;
  const { gates, xiangPalace, xiangDirection } = chengMen;

  return (
    <div className="chengmen-container">
      <div className="chengmen-title">城门诀</div>

      <div style={{ fontSize: '13px', color: 'var(--color-text-dim)', textAlign: 'center', letterSpacing: '2px' }}>
        {yun}运 · {zuoShanName}山{xiangShanName}向
      </div>

      {/* 向首信息 */}
      <div className="chengmen-card">
        <div className="chengmen-gate-title">
          向首：{LUOSHU_TO_NAME[xiangPalace]}宫（{xiangDirection}）
          <span style={{ marginLeft: '12px', fontSize: '14px', color: 'var(--color-gold)' }}>
            运星 {numToCn(yunPan[xiangPalace])}
          </span>
        </div>
        <div className="chengmen-gate-desc" style={{ color: 'var(--color-text-dim)' }}>
          城门诀：向首左右两宫与向宫运盘合生成数（一六、二七、三八、四九），
          且飞回旺星者为真城门，可立门路引吉气。
        </div>
      </div>

      {/* 各城门分析 */}
      {gates.length === 0 ? (
        <div className="chengmen-card">
          <div className="chengmen-gate-desc gate-none">向首两旁宫位均为中宫，无法判断城门。</div>
        </div>
      ) : (
        gates.map((gate, i) => {
          const palaceName = LUOSHU_TO_NAME[gate.palace];
          const direction = LUOSHU_TO_DIRECTION[gate.palace];
          return (
            <div className="chengmen-card" key={gate.palace}>
              <div className="chengmen-gate-title">
                {i === 0 ? '左城门' : '右城门'}：{palaceName}宫（{direction}）
                <span style={{ marginLeft: '12px', fontSize: '14px', color: 'var(--color-gold)' }}>
                  运星 {numToCn(gate.yunStar)}
                </span>
              </div>
              <div className="chengmen-gate-desc">
                <div>
                  合生成：
                  {gate.shengCheng ? (
                    <span style={{ color: 'var(--color-gold)' }}>✓ 合（{numToCn(gate.yunStar)} + {numToCn(yunPan[xiangPalace])} = 生成数）</span>
                  ) : (
                    <span className="gate-none">✗ 不合（{numToCn(gate.yunStar)} + {numToCn(yunPan[xiangPalace])} 非生成对）</span>
                  )}
                </div>
                <div style={{ marginTop: '8px' }}>
                  判断结果：
                  {gate.isTrue ? (
                    <span className="gate-true">★ 真城门！可在{direction}方开门立路引吉气</span>
                  ) : gate.shengCheng ? (
                    <span className="gate-false">△ 假城门（合生成但飞布后非旺星）</span>
                  ) : (
                    <span className="gate-none">— 无城门</span>
                  )}
                </div>
                <div style={{ marginTop: '6px', color: 'var(--color-text-dim)', fontSize: '12px' }}>
                  {gate.desc}
                </div>
              </div>
            </div>
          );
        })
      )}

      <div className="chart-info-card">
        <div><span className="highlight">城门诀口诀：</span>城门一诀最为良，水路指南北。</div>
        <div>一六共宗水 · 二七同道火 · 三八为朋木 · 四九为友金</div>
      </div>
    </div>
  );
}
