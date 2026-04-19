#!/usr/bin/env python3
"""Update member JSON files to reference stock photo paths."""
import json
import os

MEMBERS_DIR = os.path.join(os.path.dirname(__file__), '..', 'content', 'members')

files = sorted(f for f in os.listdir(MEMBERS_DIR) if f.endswith('.json'))
updated = 0
for filename in files:
    filepath = os.path.join(MEMBERS_DIR, filename)
    with open(filepath) as f:
        data = json.load(f)
    slug = data.get('slug', filename.replace('.json', ''))
    if data.get('photo', '').endswith('.svg'):
        data['photo'] = '/images/stock/members/' + slug + '.jpg'
        data['isStockPhoto'] = True
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
            f.write('\n')
        updated += 1
        print('Updated:', filename)

print('Total updated:', updated)
