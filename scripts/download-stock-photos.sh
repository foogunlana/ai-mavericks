#!/usr/bin/env bash
# Download curated stock photos for members and dinners.
# Run once to populate public/images/stock/members/ with real headshots.
# Photos are from Unsplash (free to use under the Unsplash License).
#
# Usage: bash scripts/download-stock-photos.sh

set -e

MEMBERS_DIR="$(dirname "$0")/../public/images/stock/members"
mkdir -p "$MEMBERS_DIR"

echo "Downloading member stock photos..."

# Each entry: output_filename unsplash_photo_id
# Curated diverse professional headshots
declare -a PHOTOS=(
  "headshot-01.jpg 1507003211169-0a1dd7228f2d"  # white male, casual
  "headshot-02.jpg 1500648767791-00dcc994a43e"  # white male, beard
  "headshot-03.jpg 1506794778202-cad84cf45f1d"  # young white male
  "headshot-04.jpg 1472099645785-5658abf4ff4e"  # white male, glasses
  "headshot-05.jpg 1463453091185-61582044d556"  # Black male
  "headshot-06.jpg 1504257432389-52343af06ae3"  # South Asian male
  "headshot-07.jpg 1552058544-f2b08422138a"     # white male, older
  "headshot-08.jpg 1494790108377-be9c29b29330"  # white female
  "headshot-09.jpg 1580489944761-15a19d654956"  # Black female
  "headshot-10.jpg 1607746882042-944635dfe10e"  # South Asian female
  "headshot-11.jpg 1544005313-94ddf0286df2"     # white female, glasses
  "headshot-12.jpg 1541101767792-f9b2b1c4f127"  # Black male, suit
)

for entry in "${PHOTOS[@]}"; do
  filename=$(echo "$entry" | cut -d' ' -f1)
  photo_id=$(echo "$entry" | cut -d' ' -f2)
  url="https://images.unsplash.com/photo-${photo_id}?w=600&h=800&fit=crop&q=80"
  output="$MEMBERS_DIR/$filename"

  if [ -f "$output" ]; then
    echo "  Skipping $filename (already exists)"
  else
    echo "  Downloading $filename..."
    curl -sL "$url" -o "$output"
  fi
done

echo ""
echo "Done. Stock photos saved to public/images/stock/members/"
echo "Run 'grep -r isStockPhoto.*true content/members/' to see all members still using stock photos."
