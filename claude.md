# CLAUDE.md — Sanctuary Media Project
> Read this file at the start of every session before touching any code.

---

## Project Overview
Photography & media production website for **Njabulo** (lead photographer),
trading as **Sanctuary Media** — based in Thembisa, Gauteng, South Africa.

**Brand colours (from logo):**
- Black:      `#0a0a0a`
- Gold:       `#c9a030`
- Gold light: `#e8c060`
- White:      `#ffffff`

**Fonts:**
- Display: Cormorant Garamond (elegant, editorial)
- UI/Body:  Rajdhani (sharp, modern)

---

## File Structure
sanctuary-media-site/

├── README.md

├── claude.md              ← you are here

├── index.html             ← all page structure & content

├── style.css              ← all styling, responsive included

├── script.js              ← all JS behaviour (tabs, lightbox, cursor, etc.)

├── sendmail.php           ← handles contact form email sending

└── assets/

└── images/

├── logo-dark.jpeg

├── logo-light.jpeg

├── logo-dark-removebg-preview.png   ← used in nav + footer

├── Portrait/

├── Weddings/

├── Maternity/

├── Fashion/

├── Commercial/

├── Team/

└── Ministry/      ← empty, awaiting images

> When a booking backend is added, new folders will appear:
> `server/`, `api/`, or a separate `booking/` module. Update this file when that happens.

---

## Current Status & What's Done
- [x] Full one-page site built: Hero, Portfolio, About, Services, Team, Contact
- [x] Portfolio tabs: All | Portraits | Weddings | Maternity | Events | Commercial | Fashion
- [x] Lightbox with keyboard + swipe navigation
- [x] Custom gold cursor
- [x] Scroll reveal animations
- [x] Mobile responsive
- [x] Sanctuary Media logos wired into nav and footer
- [x] Real contact details added — phone, email, physical address
- [x] Real WhatsApp and Instagram links added (contact section + footer)
- [x] Team section uncommented and live — includes Njabulo (Lead Photographer)
      and Lerato (Developer)
- [x] Contact form switched from Formspree to a custom **PHP script**
      (`sendmail.php`) — this is the chosen email method going forward
- [x] Many real gallery images wired in across Portraits, Weddings,
      Maternity, Fashion, Commercial

> Note: this project has moved through a couple of different approaches
> for sending form emails (fake success message → Formspree → PHP).
> **PHP (`sendmail.php`) is the current and intended method** — don't
> reintroduce Formspree unless explicitly asked.

---

## What Still Needs Doing (Placeholders)
- [ ] Confirm `sendmail.php` is correctly configured with the right
      recipient address, and test that it actually sends mail once
      deployed to real hosting (PHP mail sending depends on server
      config — won't work when just opening index.html locally)
- [ ] Hero background image (currently Unsplash) — replace in
      `style.css` under `.hero-bg`
- [ ] Events tab still uses an Unsplash placeholder image
- [ ] About section photo of Njabulo (currently Unsplash placeholder)
- [ ] About section bio, quote, and stats — currently placeholder text
- [ ] Team member bios — currently placeholder/generic text
- [ ] Some gallery image paths still use Windows backslashes
      (`assets\images\...`) instead of forward slashes — these will
      not load in a browser. Flagged to the client; not yet fixed,
      as they mentioned redesigning/adjusting the gallery themselves
- [ ] Ministry images — folder exists but is empty (no tab/service
      card built for it yet either)

---

## Sections & Key Notes

### Portfolio / Gallery
- Every `.gallery-item` needs: `data-src` (full res, used by lightbox)
  + `data-caption` + `<img src>` (same or compressed version)
- Tabs filter by category — add/remove tab buttons and matching
  `#tab-{name}` divs freely
- Zoom icons are injected by JS — no SVG needed in HTML markup
- **Reminder:** always use forward slashes in image paths
  (`assets/images/...`), never backslashes — backslashes are a
  Windows file-path convention and don't work on the web

### Team Section
- **Now live** (previously commented out) — currently features:
  - Njabulo — Lead Photographer & Creative Director
  - Lerato — Developer
- A third team-card slot exists in the HTML, commented out, ready to
  uncomment if another member joins later

### Contact Form
- Submits to `sendmail.php` via POST — **this is the current,
  intended method**
- All fields have proper `name` attributes for PHP to read
- Still shows a static success message on submit (no live AJAX/fetch
  handling added yet for the PHP version — worth revisiting once the
  PHP script itself is confirmed working)

### Contact Details (Live, Real)
- Phone: +27 67 201 0558
- Email: NjabuloM19997@gmail.com
- WhatsApp: +27 61 392 5616 (pre-filled enquiry message)
- Instagram: @sanctuary_mediasa
- Address: 135 The Gambia St, Jiyana, Thembisa, 1632

---

## Booking System (In Progress / Planned)
Full feature spec below. Not yet built.

### What it should do:
1. Client fills in booking form (service, date, time, details)
2. Njabulo reviews and confirms/declines from an admin panel or email
3. On confirmation:
   - Google Calendar event created automatically for that date
   - Confirmation email sent to client
   - WhatsApp message sent to client (via Twilio or WhatsApp Business API)
   - Njabulo also gets a confirmation notification
4. If booking is rescheduled or cancelled FROM the calendar:
   - Client gets email + WhatsApp notification
   - Njabulo gets a confirmation that the notification was sent
5. Client can also cancel/reschedule via a link in their confirmation email

### Planned Tech Stack for Booking:
| Need | Tool | Notes |
|------|------|-------|
| Booking form | Existing contact form (extend it) | Add time picker, service select |
| Backend | Node.js + Express OR Next.js API routes, OR extend PHP | Keep it simple — may stay PHP-based given current form |
| Database | Supabase (free tier, Postgres) | Stores bookings + status |
| Calendar sync | Google Calendar API | OAuth2, creates/updates events |
| Email | Nodemailer + Gmail SMTP, SendGrid, OR continue with PHP mail | Confirmation + reminder emails |
| WhatsApp | Twilio WhatsApp API OR WhatsApp Business API | Needs Twilio account |
| Calendar webhook | Google Calendar Push Notifications | Triggers on reschedule/cancel |
| Hosting | Vercel/Netlify (frontend) + Railway/Render (backend) OR shared PHP hosting | Depends on final stack decision |

### Booking Status Flow:
PENDING → CONFIRMED → [COMPLETED]

↘ CANCELLED

↘ RESCHEDULED → CONFIRMED
### Other Planned Features (mentioned by client, not yet built)
- **HTML email template** — branded email design (Sanctuary Media
  logo/colours in the email body) rather than plain text
- **Quote/pricing form** — different prices per service, with a
  signature field and a customer ID / account number. Likely needs
  its own page (e.g. `quote.html`) since a signature pad typically
  needs a `<canvas>` element
- A dashboard for managing client records — intentionally deferred;
  client wants to focus on small working pieces first
- **General note from client:** more changes and personalisation
  will continue to be made over time — this file should keep being
  updated as that happens, not treated as a final spec

---

## Developer Notes
- **Stack:** Vanilla HTML/CSS/JS + PHP for form email — no frontend
  framework, no build tools (intentional, keep it simple)
- **Future plan:** Migrate to TypeScript + component-based (React or
  similar) later when the developer is more comfortable — components
  will map 1:1 with current sections
- **Do not** introduce npm/bundlers/build tools into the frontend
  without discussion
- **Do not** reintroduce Formspree — PHP (`sendmail.php`) is the
  chosen method now
- Mobile-first responsive is already handled in style.css (`@media`
  at bottom of file)
- All JS is in one file (script.js), clearly sectioned with numbered
  comments
- Custom cursor is toggleable — instructions are in both style.css
  and script.js comments
- **Past mistake to avoid:** an earlier session rewrote `index.html`
  from scratch in one shot and broke the custom cursor and other
  working features. Always prefer small, targeted edits to the
  existing file over full rewrites

---

## Contacts / People
- **Njabulo** — photographer, business owner, client
- **Developer (Lerato)** — building and maintaining the site;
  learning/improving JS skills; also listed on the live site's Team
  section as Developer
  - Strong in HTML & CSS
  - Growing JavaScript knowledge — keep code clean, well-commented,
    no magic
  - Plans to move to TypeScript + components in the future

---

## Session Log

### June 2026 — Sessions 1–2
- Built full site from scratch (HTML/CSS/JS separated)
- Wired in real images across most categories
- Added Formspree integration (later replaced — see below)
- Added WhatsApp contact options

### 19 June 2026 — Session 3
- Client personalised the site directly:
  - Switched form email handling from Formspree to a custom PHP
    script (`sendmail.php`)
  - Added real contact details (phone, email, address)
  - Added real WhatsApp and Instagram links
  - Uncommented and populated the Team section (Njabulo + Lerato)
  - Continued wiring in real gallery images
- Created `README.md` for the project (human-facing project overview,
  separate from this file)
- Updated this file to reflect PHP as the current email method and
  to note that further personalisation/changes will continue over
  time — this is an evolving project, not a fixed spec

---
*Last updated: 19 June 2026*