const HALOS = [
  { size: 520, style: { left: '5%',  top: '-8%' }, anim: 'float1 12s ease-in-out infinite 0s'    },
  { size: 640, style: { left: '55%', top: '25%' }, anim: 'float2 15s ease-in-out infinite 2s'    },
  { size: 450, style: { left: '-8%', top: '52%' }, anim: 'float3 10s ease-in-out infinite 1s'    },
  { size: 500, style: { left: '68%', top: '65%' }, anim: 'float4 13s ease-in-out infinite 0.5s'  },
];

const STARS = [
  { w: 2, left: '8%',  top: '5%',  delay: '0s'    },
  { w: 1, left: '23%', top: '12%', delay: '0.8s'  },
  { w: 2, left: '45%', top: '3%',  delay: '1.5s'  },
  { w: 1, left: '67%', top: '8%',  delay: '0.3s'  },
  { w: 2, left: '89%', top: '15%', delay: '2.1s'  },
  { w: 1, left: '15%', top: '28%', delay: '1.2s'  },
  { w: 2, left: '92%', top: '32%', delay: '0.6s'  },
  { w: 1, left: '38%', top: '22%', delay: '1.9s'  },
  { w: 2, left: '72%', top: '40%', delay: '0.4s'  },
  { w: 1, left: '5%',  top: '48%', delay: '2.4s'  },
  { w: 2, left: '55%', top: '55%', delay: '1.0s'  },
  { w: 1, left: '80%', top: '60%', delay: '0.2s'  },
  { w: 2, left: '28%', top: '65%', delay: '1.7s'  },
  { w: 1, left: '95%', top: '72%', delay: '0.9s'  },
  { w: 2, left: '18%', top: '78%', delay: '2.2s'  },
  { w: 1, left: '62%', top: '82%', delay: '0.5s'  },
  { w: 2, left: '42%', top: '88%', delay: '1.3s'  },
  { w: 1, left: '85%', top: '90%', delay: '0.7s'  },
  { w: 2, left: '12%', top: '92%', delay: '1.6s'  },
  { w: 1, left: '50%', top: '70%', delay: '2.8s'  },
  { w: 2, left: '35%', top: '42%', delay: '0.1s'  },
  { w: 1, left: '77%', top: '20%', delay: '2.0s'  },
  { w: 2, left: '3%',  top: '18%', delay: '1.4s'  },
  { w: 1, left: '58%', top: '35%', delay: '0.6s'  },
  { w: 2, left: '32%', top: '7%',  delay: '2.6s'  },
  { w: 1, left: '48%', top: '95%', delay: '1.8s'  },
  { w: 2, left: '75%', top: '85%', delay: '0.9s'  },
  { w: 1, left: '20%', top: '55%', delay: '2.3s'  },
];

export default function BackgroundDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 dark-bg" />

      {HALOS.map((halo, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: halo.size,
            height: halo.size,
            ...halo.style,
            background:
              'radial-gradient(circle, rgba(124,58,237,0.38) 0%, rgba(167,139,250,0.2) 40%, transparent 70%)',
            filter: 'blur(90px)',
            animation: halo.anim,
          }}
        />
      ))}

      {STARS.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: star.w,
            height: star.w,
            left: star.left,
            top: star.top,
            background: 'white',
            animation: `twinkle 3.5s ease-in-out infinite ${star.delay}`,
          }}
        />
      ))}
    </div>
  );
}
