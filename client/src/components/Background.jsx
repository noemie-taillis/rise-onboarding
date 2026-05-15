const SPHERES = [
  {
    size: 420,
    style: { left: '8%', top: '12%' },
    color: 'rgba(199, 185, 245, 0.6)',
    anim: 'float1 10s ease-in-out infinite 0s',
  },
  {
    size: 340,
    style: { left: '62%', top: '55%' },
    color: 'rgba(255, 212, 194, 0.55)',
    anim: 'float2 12s ease-in-out infinite 1.5s',
  },
  {
    size: 500,
    style: { left: '72%', top: '-4%' },
    color: 'rgba(184, 223, 255, 0.5)',
    anim: 'float3 9s ease-in-out infinite 0.8s',
  },
  {
    size: 260,
    style: { left: '20%', top: '72%' },
    color: 'rgba(255, 139, 148, 0.4)',
    anim: 'float4 11s ease-in-out infinite 2s',
  },
];

const STARS = [
  { size: 3, left: '12%', top: '18%', delay: '0s'   },
  { size: 2, left: '78%', top: '14%', delay: '0.6s' },
  { size: 4, left: '44%', top: '6%',  delay: '1.3s' },
  { size: 2, left: '91%', top: '42%', delay: '0.9s' },
  { size: 3, left: '4%',  top: '52%', delay: '1.9s' },
  { size: 2, left: '58%', top: '82%', delay: '0.4s' },
  { size: 4, left: '28%', top: '88%', delay: '1.6s' },
  { size: 3, left: '73%', top: '68%', delay: '2.2s' },
  { size: 2, left: '50%', top: '45%', delay: '0.2s' },
  { size: 3, left: '86%', top: '90%', delay: '1.1s' },
  { size: 2, left: '35%', top: '35%', delay: '2.5s' },
  { size: 4, left: '65%', top: '28%', delay: '0.7s' },
];

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Mesh gradient */}
      <div className="absolute inset-0 mesh-bg" />

      {/* Floating spheres */}
      {SPHERES.map((sphere, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: sphere.size,
            height: sphere.size,
            ...sphere.style,
            background: `radial-gradient(circle, ${sphere.color} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            animation: sphere.anim,
          }}
        />
      ))}

      {/* Stars */}
      {STARS.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
            animation: `twinkle 3.5s ease-in-out infinite ${star.delay}`,
          }}
        />
      ))}
    </div>
  );
}
