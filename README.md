# Social Animals — static site

Clean, dependency-free rebuild of socialanimalsdoc.com (plain HTML + one CSS file + one small JS file).
URLs match the Squarespace site (/main/, /trailer/, /filmmakers/, /screenings/, /press/, /gallery/,
/credits/, /festivals/, /presskit/, /press-kit/, /contact/, /updates/, /iTunes/, /kaylyn/), so existing
links keep working. /home/ and /press-kit-copy/ redirect to / and /presskit/.

## Hosting
Upload the folder as-is to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3).
It must be served from the domain root because links use absolute paths (/assets/...).
Preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000

## Before you cancel Squarespace
Gallery, press and press-kit images (listed in remote-images.txt) still load from Squarespace's CDN.
Run `./localize-images.sh` once to download them into assets/remote/ and repoint the pages.

## Forms
Contact and Mailing List forms post via mailto:. To collect sign-ups properly, point the `action`
attribute in contact/index.html and updates/index.html at Formspree, Netlify Forms, Mailchimp, etc.
