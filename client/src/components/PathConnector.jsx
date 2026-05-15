import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function buildPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    let c1x, c1y, c2x, c2y;
    if (Math.abs(dx) >= Math.abs(dy)) {
      c1x = p0.x + dx * 0.5; c1y = p0.y;
      c2x = p1.x - dx * 0.5; c2y = p1.y;
    } else {
      c1x = p0.x; c1y = p0.y + dy * 0.5;
      c2x = p1.x; c2y = p1.y - dy * 0.5;
    }
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p1.x},${p1.y}`;
  }
  return d;
}

export default function PathConnector({ points, width, height, accents, avatarSrc, avatarInitials }) {
  const measureRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [ready, setReady] = useState(false);

  const valid = points.length >= 2 && points.every(p => p.x !== 0 || p.y !== 0);
  const pathD = valid ? buildPath(points) : '';

  useLayoutEffect(() => {
    if (measureRef.current && pathD) {
      setPathLength(measureRef.current.getTotalLength());
      setReady(true);
    }
  }, [pathD]);

  if (!valid || width === 0) return null;

  const pathId = 'rise-connector-path';
  const clipId = 'rise-avatar-clip';
  const travelDuration = Math.max(6, (points.length - 1) * 1.6);
  const R = 14; // avatar radius

  return (
    <svg
      className="hidden sm:block absolute pointer-events-none"
      style={{ top: 0, left: 0, width, height, zIndex: 0, overflow: 'visible' }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx={0} cy={0} r={R} />
        </clipPath>
      </defs>

      {/* Invisible path for measurement + mpath reference */}
      <path ref={measureRef} id={pathId} d={pathD} stroke="none" fill="none" />

      {ready && pathLength > 0 && (
        <>
          {/* Soft glow trail */}
          <path
            d={pathD}
            stroke="#A78BFA"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity="0.06"
          />

          {/* Dashed line — draws in once */}
          <motion.path
            d={pathD}
            stroke="#A78BFA"
            strokeWidth="2"
            strokeDasharray="6 10"
            strokeLinecap="round"
            fill="none"
            style={{ filter: 'drop-shadow(0 0 6px rgba(167,139,250,0.5))' }}
            initial={{ strokeDashoffset: pathLength, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 0.4 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />

          {/* Avatar traveler — starts after draw-in */}
          <g>
            <animateMotion
              dur={`${travelDuration}s`}
              repeatCount="indefinite"
              begin="2.2s"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.37 0 0.63 1"
              rotate="0"
            >
              <mpath href={`#${pathId}`} />
            </animateMotion>

            {/* Outer glow pulse */}
            <circle cx={0} cy={0} r={R + 4} fill="#7C3AED" opacity="0.2" />

            {/* Border ring */}
            <circle
              cx={0} cy={0} r={R + 2}
              fill="none"
              stroke="#A78BFA"
              strokeWidth="2"
              opacity="0.9"
            />

            {/* White background for initials fallback */}
            <circle cx={0} cy={0} r={R} fill="#1A1530" />

            {avatarSrc ? (
              /* Photo clipped to circle */
              <image
                href={avatarSrc}
                x={-R} y={-R}
                width={R * 2} height={R * 2}
                clipPath={`url(#${clipId})`}
                preserveAspectRatio="xMidYMid slice"
              />
            ) : (
              /* Initials fallback */
              <>
                <circle cx={0} cy={0} r={R} fill="#7C3AED" />
                <text
                  x={0} y={0}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize={R * 0.72}
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >
                  {avatarInitials}
                </text>
              </>
            )}
          </g>
        </>
      )}

      {/* Checkpoint dots with pulse rings */}
      {points.map((pt, i) => (
        <motion.g
          key={i}
          style={{ x: pt.x, y: pt.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25 + i * 0.38, duration: 0.3, type: 'spring', stiffness: 260 }}
        >
          <circle cx={0} cy={0} r={6} fill="none" stroke={accents[i]} strokeWidth="1.5">
            <animate attributeName="r" values="7;16" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.35}s`} />
            <animate attributeName="opacity" values="0.55;0" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.35}s`} />
          </circle>
          <circle cx={0} cy={0} r={6} fill={accents[i]} style={{ filter: `drop-shadow(0 0 7px ${accents[i]}cc)` }} />
          <circle cx={0} cy={0} r={3} fill="rgba(15,10,31,0.85)" />
        </motion.g>
      ))}
    </svg>
  );
}
