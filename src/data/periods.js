// 三元九运时间范围数据

export const PERIODS = [
  { yun: 1, name: '一运', startYear: 1864, endYear: 1883, element: '水', trigram: '坎' },
  { yun: 2, name: '二运', startYear: 1884, endYear: 1903, element: '土', trigram: '坤' },
  { yun: 3, name: '三运', startYear: 1904, endYear: 1923, element: '木', trigram: '震' },
  { yun: 4, name: '四运', startYear: 1924, endYear: 1943, element: '木', trigram: '巽' },
  { yun: 5, name: '五运', startYear: 1944, endYear: 1963, element: '土', trigram: '中' },
  { yun: 6, name: '六运', startYear: 1964, endYear: 1983, element: '金', trigram: '乾' },
  { yun: 7, name: '七运', startYear: 1984, endYear: 2003, element: '金', trigram: '兑' },
  { yun: 8, name: '八运', startYear: 2004, endYear: 2023, element: '土', trigram: '艮' },
  { yun: 9, name: '九运', startYear: 2024, endYear: 2043, element: '火', trigram: '离' },
];

export const PERIOD_MAP = Object.fromEntries(PERIODS.map(p => [p.yun, p]));

// 当运旺星、生气星（下一运）、退气星（上一运）
export function getStarStatus(starNum, yunNum) {
  if (starNum === yunNum) return '旺';
  const nextYun = yunNum === 9 ? 1 : yunNum + 1;
  const prevYun = yunNum === 1 ? 9 : yunNum - 1;
  if (starNum === nextYun) return '生';
  if (starNum === prevYun) return '退';
  // 上山下水（死气）判断：与当运相克
  return '衰';
}
