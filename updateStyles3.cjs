const fs = require('fs');

const files = fs.readdirSync('src/components').filter(f => f.endsWith('.tsx'));
for (const file of files) {
  const path = 'src/components/' + file;
  let content = fs.readFileSync(path, 'utf8');
  
  content = content.replace(/bg-winf-background/g, 'bg-[#050505]');
  content = content.replace(/bg-winf-surface/g, 'bg-[#0A0A0A]');
  content = content.replace(/bg-winf-surface_hover/g, 'hover:bg-white/5');
  content = content.replace(/border-winf-border/g, 'border-white/10');
  
  content = content.replace(/text-winf-text_primary/g, 'text-white');
  content = content.replace(/text-winf-text_secondary/g, 'text-white/80');
  content = content.replace(/text-winf-text_muted/g, 'text-white/40');
  
  content = content.replace(/text-winf-primary/g, 'text-white');
  content = content.replace(/bg-winf-primary/g, 'bg-white');
  content = content.replace(/bg-winf-primary_hover/g, 'hover:bg-zinc-200');
  content = content.replace(/text-winf_primary_hover/g, 'hover:text-zinc-200');
  
  content = content.replace(/shadow-winf-primary/g, 'shadow-white');
  
  content = content.replace(/rounded-lg/g, 'rounded-none');
  content = content.replace(/rounded-md/g, 'rounded-none');
  content = content.replace(/rounded-xl/g, 'rounded-none');
  
  content = content.replace(/bg-\[#0a0a0a\]/gi, 'bg-[#0A0A0A]');
  content = content.replace(/text-zinc-400/gi, 'text-white/40');
  content = content.replace(/text-gray-500/gi, 'text-white/40');
  content = content.replace(/text-gray-400/gi, 'text-white/40');
  content = content.replace(/text-gray-300/gi, 'text-white/60');
  content = content.replace(/text-gray-200/gi, 'text-white/80');
  content = content.replace(/bg-white\/\[0\.02\]/gi, 'bg-black');
  
  fs.writeFileSync(path, content, 'utf8');
}
console.log('Done replacement text styles');
