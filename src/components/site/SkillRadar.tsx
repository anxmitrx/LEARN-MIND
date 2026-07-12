type Datum = { label: string; value: number };

export function SkillRadar({ data, size = 320 }: { data: Datum[]; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 44;
  const n = data.length;

  const point = (i: number, v: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const rr = (r * v) / 100;
    return [cx + rr * Math.cos(angle), cy + rr * Math.sin(angle)];
  };

  const polygon = data.map((d, i) => point(i, d.value).join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md">
      {[0.25, 0.5, 0.75, 1].map((p) => (
        <polygon
          key={p}
          points={Array.from({ length: n }, (_, i) => {
            const a = (Math.PI * 2 * i) / n - Math.PI / 2;
            return `${cx + r * p * Math.cos(a)},${cy + r * p * Math.sin(a)}`;
          }).join(" ")}
          fill="none"
          stroke="#3A3532"
          strokeWidth="1.5"
          strokeOpacity={p === 1 ? 1 : 0.18}
        />
      ))}
      {data.map((_, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + r * Math.cos(a)}
            y2={cy + r * Math.sin(a)}
            stroke="#3A3532"
            strokeOpacity={0.15}
          />
        );
      })}
      <polygon
        points={polygon}
        fill="#8AA392"
        fillOpacity={0.7}
        stroke="#3A3532"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {data.map((d, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        const [x, y] = [cx + (r + 22) * Math.cos(a), cy + (r + 22) * Math.sin(a)];
        return (
          <text
            key={d.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#3A3532"
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            {d.label}
          </text>
        );
      })}
      {data.map((d, i) => {
        const [x, y] = point(i, d.value);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={5} fill="#3A3532" />
            <circle cx={x} cy={y} r={2.5} fill="#8AA392" />
          </g>
        );
      })}
    </svg>
  );
}
