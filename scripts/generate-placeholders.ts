import { writeFileSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MEMBERS_DIR = join(__dirname, '..', 'content', 'members');
const IMAGES_DIR = join(__dirname, '..', 'public', 'images', 'members');

mkdirSync(IMAGES_DIR, { recursive: true });

const gradients = [
  ['#7c3aed', '#4f46e5'], ['#2563eb', '#059669'], ['#059669', '#0d9488'],
  ['#dc2626', '#d97706'], ['#d97706', '#ea580c'], ['#0891b2', '#7c3aed'],
  ['#ec4899', '#8b5cf6'], ['#6366f1', '#2563eb'], ['#14b8a6', '#3b82f6'],
  ['#f59e0b', '#ef4444'], ['#8b5cf6', '#06b6d4'], ['#10b981', '#6366f1'],
];

const files = readdirSync(MEMBERS_DIR).filter((f) => f.endsWith('.json'));

files.forEach((file, i) => {
  const member = JSON.parse(readFileSync(join(MEMBERS_DIR, file), 'utf-8'));
  const initials = member.name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const [c1, c2] = gradients[i % gradients.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533" viewBox="0 0 400 533">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${c1}"/>
    <stop offset="100%" stop-color="${c2}"/>
  </linearGradient></defs>
  <rect width="400" height="533" fill="url(#g)"/>
  <text x="200" y="280" font-family="Helvetica Neue, Arial, sans-serif" font-size="96" font-weight="300" fill="rgba(255,255,255,0.6)" text-anchor="middle" dominant-baseline="middle">${initials}</text>
</svg>`;

  writeFileSync(join(IMAGES_DIR, `${member.slug}.svg`), svg);
});

console.log(`Created ${files.length} placeholder SVGs.`);
