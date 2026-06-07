const fs = require('fs');
const path = require('path');

const SHOWCASE_DIR = path.join(__dirname, '../src/app/components/showcase');

// Helpers
const read = (p) => fs.readFileSync(path.join(SHOWCASE_DIR, p), 'utf8');
const write = (p, d) => fs.writeFileSync(path.join(SHOWCASE_DIR, p), d);
const rm = (p) => fs.unlinkSync(path.join(SHOWCASE_DIR, p));

// 1. Move AlertDot.tsx to compositions/AlertDot.tsx
const alertDotContent = read('AlertDot.tsx');
write('compositions/AlertDot.tsx', alertDotContent);
rm('AlertDot.tsx');

// 2. Move AuthCards.tsx and SignInCard.tsx to compositions/
const authCardsContent = read('AuthCards.tsx');
write('compositions/AuthCards.tsx', authCardsContent.replace(/\.\/MetronicButton/g, '../_shared/MetronicButton'));
rm('AuthCards.tsx');

const signInContent = read('SignInCard.tsx');
write('compositions/SignInCard.tsx', signInContent);
rm('SignInCard.tsx');

const authProxy = read('compositions/Auth.tsx');
write('compositions/Auth.tsx', authProxy.replace(/\.\.\//g, './'));

// 3. Move Avatar.tsx to primitives/
const avatarContent = read('Avatar.tsx');
write('primitives/Avatar.tsx', avatarContent); // Was exported as primitives/Avatars.tsx proxy
rm('Avatar.tsx');
const avatarsProxy = read('primitives/Avatars.tsx');
write('primitives/Avatars.tsx', avatarsProxy.replace(/\.\.\/Avatar/g, './Avatar'));

// 4. Move ColorSwatch.tsx to foundations/
const colorSwatchContent = read('ColorSwatch.tsx');
write('foundations/ColorSwatch.tsx', colorSwatchContent);
rm('ColorSwatch.tsx');
const colorsContent = read('foundations/Colors.tsx');
write('foundations/Colors.tsx', colorsContent.replace(/\.\.\/ColorSwatch/g, './ColorSwatch'));

// 5. Move DataGrid.tsx to compositions/
const dataGridContent = read('DataGrid.tsx');
write('compositions/DataGrid.tsx', dataGridContent.replace(/\.\/MetronicBadge/g, '../_shared/MetronicBadge'));
rm('DataGrid.tsx');

// 6. MetronicBadge & Button
rm('MetronicBadge.tsx');
rm('MetronicButton.tsx');

// 7. Misc.tsx - it contains EmptyState, ContainerDemo, FooterDemo, CalendarRangeMock, CommandPaletteMock
const miscContent = read('Misc.tsx');
// These were proxied by:
// compositions/EmptyState.tsx
// compositions/Container.tsx
// compositions/Footer.tsx
// primitives/Calendar.tsx
// primitives/Command.tsx

// Let's just move Misc.tsx to compositions/Misc.tsx and update proxies.
write('compositions/Misc.tsx', miscContent.replace(/\.\/MetronicButton/g, '../_shared/MetronicButton'));
rm('Misc.tsx');

const replaceMiscProxy = (filePath) => {
  if (fs.existsSync(path.join(SHOWCASE_DIR, filePath))) {
    let content = read(filePath);
    content = content.replace(/\.\.\/Misc/g, filePath.startsWith('primitives/') ? '../compositions/Misc' : './Misc');
    write(filePath, content);
  }
};
replaceMiscProxy('compositions/EmptyState.tsx');
replaceMiscProxy('compositions/Container.tsx');
replaceMiscProxy('compositions/Footer.tsx');
replaceMiscProxy('primitives/Calendar.tsx');
replaceMiscProxy('primitives/Command.tsx');

console.log('Done moving files!');
