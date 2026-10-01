import Image from 'next/image';
import { TOURNAMENT_MAPS } from '@/lib/constants';

export function MapGallerySection() {
  const maps = TOURNAMENT_MAPS.filter(
    (map): map is typeof map & { src: string } => 'src' in map && Boolean(map.src)
  );

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#00ff66]/20 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-1">
            <span className="w-2 h-2 bg-[#00ff66]"></span>
            <span>TACTICAL MAP INTEL // OPERATIONAL ZONES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold uppercase tracking-tight text-white glow-text-green">
            COMBAT ARENAS
          </h2>
        </div>
        <p className="text-xs font-mono text-gray-400 mt-2 md:mt-0 uppercase tracking-wider">
          OFFICIAL LAN MAP rotation // COD4 MODERN WARFARE
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {maps.map((map) => (
          <div
            key={map.id}
            className="group relative hud-border bg-[#0b0e14]/90 rounded-lg overflow-hidden border border-[#00ff66]/30 hover:border-[#00ff66] transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(0,255,102,0.25)]"
          >
            {/* Image Container */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={map.src}
                alt={map.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-[#050709]/90 border border-[#00ff66]/60 px-2.5 py-1 text-[10px] font-mono text-[#00ff66] uppercase tracking-wider rounded">
                {map.name}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 bg-[#0b0e14]">
              <div className="text-xs font-mono text-[#00ff66] tracking-widest uppercase mb-1">
                {map.tag}
              </div>
              <h3 className="text-lg font-display font-bold uppercase text-white tracking-wide group-hover:text-[#00ff66] transition-colors">
                {map.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
