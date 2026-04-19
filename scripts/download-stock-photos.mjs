/**
 * Downloads curated stock photos for dinners and member headshots.
 * Run once: node scripts/download-stock-photos.mjs
 */

import { createWriteStream, existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { get } from 'https';
import { join } from 'path';

const BASE = new URL('..', import.meta.url).pathname;

// Curated Unsplash photos — specific IDs, not random
const DINNER_PHOTOS = [
  { file: 'dinner-stock-1.jpg', id: '1414235180640-cafa232d3a09' }, // restaurant dinner table
  { file: 'dinner-stock-2.jpg', id: '1529543544282-ea669407fca3' }, // dinner party group
  { file: 'dinner-stock-3.jpg', id: '1567521464027-f127ff144326' }, // group dinner gathering
  { file: 'dinner-stock-4.jpg', id: '1544025162-d76694265947' },    // social dinner event
  { file: 'dinner-stock-5.jpg', id: '1485182708500-e8f1f318ba72' }, // dining table scene
  { file: 'dinner-stock-6.jpg', id: '1600891964599-f61ba0e24092' }, // restaurant social
];

// Diverse professional headshots — assigned to members deterministically
const HEADSHOT_PHOTOS = [
  { file: 'headshot-01.jpg', id: '1560250097-0b93528c311a' }, // man, professional
  { file: 'headshot-02.jpg', id: '1573496359142-b8d87734a5a2' }, // woman, professional
  { file: 'headshot-03.jpg', id: '1507003211169-0a1dd7228f2d' }, // man, casual
  { file: 'headshot-04.jpg', id: '1494790108377-be9c29b29330' }, // woman, casual
  { file: 'headshot-05.jpg', id: '1519085360753-af0119f7cbe7' }, // man, professional
  { file: 'headshot-06.jpg', id: '1438761681033-6461ffad8d80' }, // woman, professional
  { file: 'headshot-07.jpg', id: '1472099645785-5658abf4ff4e' }, // man, casual
  { file: 'headshot-08.jpg', id: '1534528741775-53994a69daeb' }, // woman, casual
  { file: 'headshot-09.jpg', id: '1500648767791-00dcc994a43e' }, // man, professional
  { file: 'headshot-10.jpg', id: '1580489944761-15a19d654956' }, // woman, professional
  { file: 'headshot-11.jpg', id: '1506794778202-cad84cf45f1d' }, // man, professional
  { file: 'headshot-12.jpg', id: '1531123897727-579c4ded60e2' }, // woman, casual
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (existsSync(dest)) {
      console.log(`  skip (exists): ${dest}`);
      return resolve();
    }
    const file = createWriteStream(dest);
    get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

async function main() {
  const dinnersDir = join(BASE, 'public/images/stock/dinners');
  const membersDir = join(BASE, 'public/images/stock/members');
  await mkdir(dinnersDir, { recursive: true });
  await mkdir(membersDir, { recursive: true });

  console.log('Downloading dinner stock photos...');
  for (const { file, id } of DINNER_PHOTOS) {
    const url = `https://images.unsplash.com/photo-${id}?w=1400&q=85&fit=crop&crop=center`;
    console.log(`  ${file}`);
    await download(url, join(dinnersDir, file));
  }

  console.log('Downloading headshot stock photos...');
  for (const { file, id } of HEADSHOT_PHOTOS) {
    const url = `https://images.unsplash.com/photo-${id}?w=600&h=800&q=85&fit=crop&crop=face`;
    console.log(`  ${file}`);
    await download(url, join(membersDir, file));
  }

  console.log('Done.');
}

main().catch(console.error);
