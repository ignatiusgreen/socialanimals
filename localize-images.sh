#!/usr/bin/env bash
# Downloads the images that are still served from Squarespace's CDN (gallery, press, press kit)
# into assets/remote/ and rewrites the HTML to point at the local copies.
# Run this from the site folder BEFORE you cancel the Squarespace plan.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p assets/remote
while read -r url; do
  [ -z "$url" ] && continue
  name="$(basename "$url" | sed 's/+/-/g')"
  id="$(echo "$url" | awk -F/ '{print $(NF-1)}' | cut -c1-13)"
  file="assets/remote/${id}-${name}"
  [ -f "$file" ] || curl -fsSL "${url}?format=1500w" -o "$file" || { echo "failed: $url"; continue; }
  # replace every variant (?format=...) of this URL with the local file
  grep -rl --include='*.html' "$url" . | while read -r html; do
    perl -pi -e "s#\Q$url\E(\?format=\d+w)?#/$file#g" "$html"
  done
  echo "ok: $file"
done < remote-images.txt
