#!/usr/bin/env python3
"""Replace placeholder stock photos with SVG initial avatars and clear picsum dinner photos."""
import json
import glob

# Update member photos to use SVG avatars
member_files = glob.glob("content/members/*.json")
member_count = 0
for f in member_files:
    with open(f) as fp:
        data = json.load(fp)
    slug = data.get("slug", "")
    photo = data.get("photo", "")
    if slug and ("unsplash" in photo or "picsum" in photo):
        data["photo"] = f"/images/members/{slug}.svg"
        with open(f, "w") as fp:
            json.dump(data, fp, indent=2)
            fp.write("\n")
        member_count += 1

print(f"Updated {member_count} member photos")

# Clear picsum dinner group photos
dinner_files = glob.glob("content/dinners/*.json")
dinner_count = 0
for f in dinner_files:
    with open(f) as fp:
        data = json.load(fp)
    photo = data.get("groupPhoto", "")
    if "picsum" in photo:
        data["groupPhoto"] = ""
        with open(f, "w") as fp:
            json.dump(data, fp, indent=2)
            fp.write("\n")
        dinner_count += 1

print(f"Cleared {dinner_count} dinner group photos")
