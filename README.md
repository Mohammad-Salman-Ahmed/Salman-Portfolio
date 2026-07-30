# Salman Portfolio

Personal portfolio website for **Mohammad Salman Ahmed** — Java Backend Developer (Spring Boot · Hibernate · REST APIs · MySQL).

Live structure:

```
Salman-Portfolio/
├── index.html              # homepage
├── style.css                # all styles (dark glassmorphism theme)
├── script.js                 # loader, animations, nav, tilt cards, contact form
├── assets/
│   ├── images/                # add profile.jpg and project screenshots here
│   └── resume/
│         Salman_Resume.pdf
├── projects/
│   ├── eshop.html              # case study: E-shop Management System
│   └── bloodbank.html          # case study: Blood Bank Management System
└── README.md
```

## Before you deploy

1. Drop a professional photo into `assets/images/profile.jpg`, then in `index.html` find the
   commented `<img>` line inside `.photo-inner` and swap it in for the initials placeholder.
2. Replace the `#` placeholders for LinkedIn (there are three — hero, contact, and footer) with
   your real profile URL.
3. Add real screenshots for each project into `assets/images/` and reference them inside the
   `.proj-shot` divs on the homepage and the `.shot-slot` gallery placeholders on both case study
   pages (each slot is labeled, e.g. "Login / OTP screen" — replace the div's content with
   `<img src="../assets/images/eshop-login.png" alt="Login screen">`).
4. The GitHub Activity section on the homepage pulls live stats from
   `github-readme-stats.vercel.app` using your real GitHub username — no setup needed, it updates
   automatically as your public repos change.
5. The E-shop case study includes a "Representative endpoints" block, clearly labeled as
   illustrative of the REST design rather than a literal API reference. If you want it to reflect
   your actual routes, swap in the real paths from your controllers before interviews.

## Run locally

Just open `index.html` in a browser, or serve the folder with any static server
(e.g. VS Code's "Live Server" extension) so relative paths resolve correctly.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository (e.g. `salman-portfolio`).
2. Go to **Settings → Pages**, set the source to the `main` branch, root folder.
3. Your site goes live at `https://<your-username>.github.io/salman-portfolio/`.
4. Add the link to your resume, LinkedIn, and job applications.

## Contact form

The form on the Contact section submits via **Formspree** (free tier, no server or API key
management needed) so messages actually land in your inbox instead of just opening a mail client.

**You must finish this one-time setup before it works:**
1. Go to [formspree.io](https://formspree.io) and sign up free with `reachmdsalman@gmail.com`.
2. Create a new form — Formspree gives you an endpoint like `https://formspree.io/f/abcd1234`.
3. Open `index.html`, find this line:
   ```html
   <form class="glass form-card tilt-card" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Replace `YOUR_FORM_ID` with the ID Formspree gave you.
4. Formspree will send a confirmation email the first time someone submits the form — verify your
   email address to activate delivery.
5. Re-upload `index.html` to GitHub. Test it by sending yourself a message through the live form.

Until step 3 is done, submissions will fail with a "Something went wrong" message — the form needs
that real endpoint to have anywhere to send the message.
