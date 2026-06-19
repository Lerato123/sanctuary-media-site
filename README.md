# Sanctuary Media — Photography Website

A one-page photography website showcasing the work of **Njabulo**,
trading as **Sanctuary Media**. Built with plain HTML, CSS, and
JavaScript — no frameworks, no build tools required to run it.

---

## What This Project Is

This site exists to show off Njabulo's photography work and let
potential clients get in touch to book a shoot. It includes:

- A portfolio gallery, sorted by category (portraits, weddings,
  maternity, fashion, events, commercial)
- An about section introducing Njabulo
- A services overview
- A team section
- A booking enquiry form
- Direct WhatsApp and Instagram contact links

This is a living project — content, images, and features are being
filled in and personalised over time. Some sections are placeholders
until real content replaces them, and more changes/features are
planned for later (see below).

---

## How to Run This Locally

Most of the site can be opened directly — just double-click
`index.html` and it loads in a browser.

**Exception:** the contact form submits to `sendmail.php`, which
means it needs a PHP-capable environment to actually send mail. PHP
won't run by just opening the HTML file. To test the form locally,
use a local server such as XAMPP, MAMP, or PHP's built-in server
(`php -S localhost:8000`).

---

## File Structure
sanctuary-media-site/

├── README.md

├── claude.md

├── index.html

├── style.css

├── script.js

├── sendmail.php          ← handles form email sending

└── assets/

└── images/

├── logo-dark.jpeg

├── logo-light.jpeg

├── logo-dark-removebg-preview.png

├── Portrait/

├── Weddings/

├── Maternity/

├── Fashion/

├── Commercial/

├── Team/

└── Ministry/      ← empty, awaiting images


---

## Current Contact Details (Live)
- Phone: +27 67 201 0558
- Email: NjabuloM19997@gmail.com
- WhatsApp: +27 61 392 5616
- Instagram: @sanctuary_mediasa
- Location: 135 The Gambia St, Jiyana, Thembisa, 1632

These are real and personalised for Njabulo — update them here and
in `index.html` if any of them change.

---

## Before Going Live — Check This

- Confirm `sendmail.php` is configured with the correct recipient
  email address and works on the actual hosting environment (PHP
  mail sending depends on server configuration — test after
  deploying, not just locally)
- Some gallery images are still placeholders (Unsplash) in the Events
  tab — replace with real photos when available
- Team member bios are placeholder text — replace with final wording

---

## Planned Features (Not Yet Built)

This project will keep evolving. Features planned for later include:

- **Booking system** — calendar-based booking with automatic
  confirmations
- **HTML email template** — branded email design (Sanctuary Media
  logo and colours) instead of plain text emails
- Quote/pricing form with a signature field and customer ID, for
  future client invoicing
- Additional changes and personalisation as the project continues

---

## Why This README Exists

A README is the first file anyone opens on a new project — a
collaborator, a future developer, or even the original builder
returning after a few months away. It answers the basic questions
before anyone has to dig through the code:

- What is this project, and who is it for?
- How do I run it?
- What's working, and what's still planned?
- Where do I find things?

It's also a professional norm — almost every real codebase has one,
and it signals that a project was built with other people (or
future-you) in mind, not just short-term memory.

`README.md` is for humans opening the project. `claude.md` is for
AI-assisted coding sessions — it tracks what's been built and what's
pending so context isn't lost between sessions. Keep both; they
serve different readers.

---

## Tech Notes

- No npm, no build step for the front end
- PHP required only for the contact form's email sending
  (`sendmail.php`)
- Custom cursor, lightbox, and tab-switching are in `script.js`,
  commented section by section
- Gallery uses CSS masonry-style layout
- Mobile responsive — breakpoints at 1024px and 768px in `style.css`