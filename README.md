# Nehal Hacker-Themed Cybersecurity Portfolio

This is a complete static portfolio website for **MD Mahbubul Bashar Choudhury (Nehal)**.

## Files

```text
nehal_hacker_portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── profile-placeholder.svg
│   └── MD_MAHBUBUL_BASHAR_CHOUDHURY_CV.pdf
└── README.md
```

## How to run

### Simple method
Open `index.html` directly in your browser.

### Better local server method
If you have Python installed, open terminal in this folder and run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How to replace profile image

1. Put your real photo inside the `assets` folder.
2. Rename it to something like `profile.jpg`.
3. In `index.html`, find this line:

```html
<img src="assets/profile-placeholder.svg" alt="Profile placeholder for Nehal" />
```

4. Replace it with:

```html
<img src="assets/profile.jpg" alt="MD Mahbubul Bashar Choudhury Nehal" />
```

## How to replace CV

Replace this file:

```text
assets/MD_MAHBUBUL_BASHAR_CHOUDHURY_CV.pdf
```

with your updated CV using the same file name.

## Hosting suggestions

You can host this website on:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

## Notes

The contact form currently uses `mailto:`. For a real backend form, connect it with Formspree, Netlify Forms, EmailJS, or your own API.
