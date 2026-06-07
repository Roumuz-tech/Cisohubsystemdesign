const fs = require('fs');
const path = require('path');

const SHOWCASE_DIR = path.join(__dirname, '../src/app/components/showcase');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('from "../Metronic')) {
        content = content.replace(/from "\.\.\/Metronic/g, 'from "../_shared/Metronic');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

replaceInDir(SHOWCASE_DIR);
