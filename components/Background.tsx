"use client";

export default function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-50 overflow-hidden bg-white">
        {/* Animated Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/5 animate-gradient" />

        {/* Animated Grid */}
        <div className="absolute inset-0 grid-pattern" />

        {/* Noise */}
        <div className="absolute inset-0 noise opacity-[0.015]" />
      </div>

      <style jsx>{`
        .grid-pattern {
          background-image:
            linear-gradient(rgba(15, 27, 51, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 27, 51, 0.04) 1px, transparent 1px);

          background-size: 48px 48px;

          animation: gridMove 25s linear infinite;
          mask-image: radial-gradient(circle at center, black, transparent 90%);
        }

        @keyframes gridMove {
          from {
            background-position: 0 0, 0 0;
          }
          to {
            background-position: 48px 48px, 48px 48px;
          }
        }

        .noise {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(15, 27, 51, 0.08) 1px, transparent 1px),
            radial-gradient(circle at 70% 60%, rgba(15, 27, 51, 0.06) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(15, 27, 51, 0.04) 1px, transparent 1px);

          background-size:
            180px 180px,
            140px 140px,
            120px 120px;

          animation: noise 0.35s steps(3) infinite;
          mix-blend-mode: multiply;
        }

        @keyframes noise {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-2%, 1%);
          }
          50% {
            transform: translate(2%, -1%);
          }
          75% {
            transform: translate(-1%, 2%);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 15s ease infinite;
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}