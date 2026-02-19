export default function Speedometer() {
  return (
    <div className="relative" style={{ width: 176, height: 176 }}>
      {/* Gauge arc */}
      <div className="absolute overflow-visible" style={{ top: '-3px', left: '-3px', right: '86px', bottom: '22px' }}>
        <img alt="" className="block w-full h-full" src="/assets/speedometer-gauge.svg" />
      </div>

      {/* Dial ring — centered, rotated 45° */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          width: 248.902,
          height: 248.902,
          left: '50%',
          top: 'calc(50% - 0.16px)',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div style={{ transform: 'rotate(45deg)', flexShrink: 0 }}>
          <img alt="" style={{ display: 'block', width: 176, height: 176 }} src="/assets/speedometer-dial.svg" />
        </div>
      </div>

      {/* Text */}
      <div
        className="absolute flex flex-col items-end"
        style={{ left: 34.5, top: 53.86, width: 130.645, fontFamily: 'Henus, sans-serif' }}
      >
        <span style={{ fontSize: 8.448, letterSpacing: -0.034, lineHeight: '15.5px', width: 55.616, textAlign: 'right', fontWeight: 400 }}>
          SPEED RIDER
        </span>
        <div className="flex items-end" style={{ gap: 6.037 }}>
          <span style={{ fontSize: 37.88, letterSpacing: -0.15, lineHeight: 'normal', fontWeight: 400 }}>55.5</span>
          <span style={{ fontSize: 18.94, letterSpacing: -0.076, lineHeight: '34.7px', fontWeight: 400 }}>KPH</span>
        </div>
        <span style={{ fontSize: 18.94, letterSpacing: -0.076, lineHeight: '34.7px', opacity: 0.6, fontWeight: 400 }}>
          29.96 KT
        </span>
      </div>

      {/* Needle — top center, flipped */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          width: 11.264,
          height: 11.264,
          left: '50%',
          top: -14.08,
          transform: 'translateX(-50%) scaleY(-1)',
        }}
      >
        <img alt="" style={{ display: 'block', width: 11.264, height: 11.264 }} src="/assets/speedometer-needle.svg" />
      </div>
    </div>
  );
}
