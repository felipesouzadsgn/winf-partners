import * as fs from 'fs';

const path = 'src/contexts/WinfContext.tsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/user\?\.id === 'proto-tiago-001'/g, "user?.id?.startsWith('proto-')");
content = content.replace(/user\?\.id \!== 'proto-tiago-001'/g, "!user?.id?.startsWith('proto-')");
fs.writeFileSync(path, content);
console.log('done');
