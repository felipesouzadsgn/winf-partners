const fs = require('fs');

const files = fs.readdirSync('src/components').filter(f => f.startsWith('Module'));
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
  
  // also handle some other replacements
  content = content.replace(/shadow-winf-primary/g, 'shadow-white');
  
  fs.writeFileSync(path, content, 'utf8');
}
console.log('Done replacement');
