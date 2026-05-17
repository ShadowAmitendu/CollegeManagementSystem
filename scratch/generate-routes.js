const fs = require('fs');
const path = require('path');

const features = [
  'assignments', 'examinations', 'timetable', 'communication',
  'finance', 'operations', 'analytics', 'reports', 'user-management',
  'system', 'account'
];

features.forEach(f => {
  const componentName = f.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'List';
  const camelName = f.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  
  const content = `import { Routes } from '@angular/router';\n\nexport const ${camelName}Routes: Routes = [\n  { path: '', loadComponent: () => import('./pages/${f}-list/${f}-list').then((m) => m.${componentName}) },\n];\n`;
  
  const filePath = path.join(__dirname, '..', 'src', 'app', 'features', f, `${f}.routes.ts`);
  fs.writeFileSync(filePath, content);
  console.log(`Created ${filePath}`);
});
