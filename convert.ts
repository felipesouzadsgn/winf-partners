import * as fs from 'fs';

const files = [
  'src/components/PublicConsultancy.tsx',
  'src/components/SimulatorTechnicalCharts.tsx',
  'src/components/FilmVisualizer.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace background colors
  content = content.replace(/bg-\[\#050505\]/g, 'bg-[#FAFAFA]');
  content = content.replace(/bg-\[\#080808\]/g, 'bg-[#FAFAFA]');
  content = content.replace(/bg-black/g, 'bg-white');
  
  // Replace text colors
  content = content.replace(/text-white/g, 'text-[#050505]');
  
  // Custom text-white/XX to text-[#050505]/XX
  content = content.replace(/text-white\/(\d+)/g, 'text-[#050505]/$1');
  
  // Replace borders
  content = content.replace(/border-white/g, 'border-[#050505]');
  content = content.replace(/border-white\/(\d+)/g, 'border-[#050505]/$1');

  // Replace backgrounds with opacity map
  content = content.replace(/bg-white\/(\d+)/g, 'bg-[#050505]/$1');
  content = content.replace(/bg-white\/(\[0\.\d+\])/g, 'bg-[#050505]/$1');

  // Specific color HEX
  content = content.replace(/#ffffff/g, '#050505');
  
  // Specific for overlay
  content = content.replace(/mix-blend-overlay/g, 'mix-blend-multiply');

  fs.writeFileSync(file, content);
});

console.log("Converted successfully!");
