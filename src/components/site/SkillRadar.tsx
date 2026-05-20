type Datum = { label: string; value: number };

export function SkillRadar({ data, size = 320 }: { data: Datum[]; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 40;
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
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
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
            stroke="rgba(255,255,255,0.06)"
          />
        );
      })}
      <polygon
        points={polygon}
        fill="rgba(255, 204, 0, 0.25)"
        stroke="#FFCC00"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 12px rgba(255,204,0,0.5))" }}
      />
      {data.map((d, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        const [x, y] = [cx + (r + 20) * Math.cos(a), cy + (r + 20) * Math.sin(a)];
        return (
          <text
            key={d.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-zinc-300"
            style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}
          >
            {d.label}
          </text>
        );
      })}
      {data.map((d, i) => {
        const [x, y] = point(i, d.value);
        return <circle key={i} cx={x} cy={y} r={4} fill="#FFCC00" />;
      })}
    </svg>
  );
}
