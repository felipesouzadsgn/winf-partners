import * as fs from 'fs';
let content = fs.readFileSync('src/components/PublicConsultancy.tsx', 'utf8');
content = content.replace(/bg-white text-black/g, 'bg-[#050505] text-[#FAFAFA]');
content = content.replace(/hover:text-black/g, 'hover:text-white');
content = content.replace(/text-black/g, 'text-[#FAFAFA]');
fs.writeFileSync('src/components/PublicConsultancy.tsx', content);
