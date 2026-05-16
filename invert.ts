import * as fs from 'fs';

const files = [
  'src/components/PublicConsultancy.tsx',
  'src/components/SimulatorTechnicalCharts.tsx',
  'src/components/FilmVisualizer.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Reverse convert2.ts:
  content = content.replace(/bg-\[\#050505\] text-\[\#FAFAFA\]/g, 'bg-white text-black');
  content = content.replace(/hover:text-white/g, 'hover:text-black');
  content = content.replace(/text-\[\#FAFAFA\]/g, 'text-black');

  // Reverse convert.ts:
  // overlays
  content = content.replace(/mix-blend-multiply/g, 'mix-blend-overlay');

  // bg-[#FAFAFA] -> bg-[#050505]
  content = content.replace(/bg-\[\#FAFAFA\]/g, 'bg-[#050505]');

  // text-[#050505] -> text-white
  content = content.replace(/text-\[\#050505\]/g, 'text-white');

  // bg-white -> bg-black (except if followed by text-black)
  content = content.replace(/bg-white(?!\s+text-black)/g, 'bg-black');

  // border-[#050505] -> border-white
  content = content.replace(/border-\[\#050505\]/g, 'border-white');

  // bg-[#050505] opacity classes -> bg-white opacity classes
  content = content.replace(/bg-\[\#050505\]\/(\d+)/g, 'bg-white/$1');
  content = content.replace(/bg-\[\#050505\]\/(\[0\.\d+\])/g, 'bg-white/$1');

  fs.writeFileSync(file, content);
});

console.log("Inverted successfully!");
