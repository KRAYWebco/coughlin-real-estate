# Lovable Export: Christine Coughlin Realty

Update the entire existing React/Vite real estate site, including the public landing page, admin login, protected admin dashboard, loading states, notices, forms, listings, and footer, to use a clean white-and-green visual system.

## Visual Direction

- Primary background: pure white `#ffffff`.
- Primary text: deep forest green `#103f25` or `#173824`.
- Secondary text: muted green `#55715d` or `#6c8973`.
- Accent green: `#2f9e55`.
- Strong green: `#218344` and `#196b38`.
- Light green surfaces: `#f1fbf3` and `#def5e3`.
- Borders and dividers: pale green `#bde8c7` or `#e2eee4`.
- Do not use orange, beige, brown, charcoal, black, amber, blue, red, purple, gradients, or dark photo overlays in the UI.
- Keep cards and controls square or subtly rounded with a maximum radius of 2px.
- Use Playfair Display for headings and Inter for body copy.
- Preserve generous whitespace, thin green rules, restrained shadows, and editorial real-estate typography.

## Public Page

- Keep the existing routes and functionality.
- Navigation is white with green logo text, green links, green CTA borders, and pale green dividers.
- Replace the dark photographic hero treatment with a white editorial hero.
- Hero headline: `Clear decisions for your next move.`
- Hero supporting copy should describe calm guidance, market clarity, and responsive residential/commercial service.
- Hero actions should be white buttons with green borders and green text, plus the phone contact link.
- Show licensed states as white outlined chips with green text: IN, IL, FL, TX.
- About, services, listings, and contact sections remain fully usable on white backgrounds with green headings and accents.
- Preserve listing imagery as content, but keep badges, cards, filters, modal overlays, and metadata within the white-and-green palette.
- Contact CTA should be white with green top and bottom rules rather than a dark banner.
- Footer should be white with a pale green top border, forest-green typography, green icons, and pale green dividers.

## Admin Login

- White page background.
- White bordered form surface with pale green border and restrained green shadow.
- Forest-green headings and labels.
- Green icons, links, inputs, focus rings, and bordered CTA buttons.
- Loading spinner must remain visible on white using a green border.
- Keep sign-in, sign-up, password visibility, redirect, and Supabase behavior unchanged.

## Admin Dashboard

- White page background and white header.
- Green header typography, green links, pale green borders, and pale green tab rail.
- Active tabs use a white background with a stronger green border and green text.
- Submission status labels use only green/white variants:
  - Unread: pale green surface with green text.
  - Read: white surface with pale green border and green text.
  - Contacted: light green surface with forest-green text.
- Listing manager forms, listing rows, action buttons, loading states, and notices use the same system.
- Do not change Supabase data behavior, local fallback behavior, authentication protection, or listing CRUD behavior.

## Functional Requirements

- Preserve the existing React/Vite setup, routing, Framer Motion animations, Lucide icons, Supabase integration, and responsive behavior.
- Public route: `/`.
- Admin login route: `/auth`.
- Protected admin route: `/admin`.
- Signed-out users visiting `/admin` must be redirected to `/auth?returnTo=/admin`.
- Successful login must return to `/admin`.
- Keep the contact form, listings filters/modal, Supabase fallback notices, realtime submissions refresh, listing CRUD, and sign-out behavior working.
- Ensure all text fits on mobile and desktop without overlap.
- Verify with TypeScript: `bun tsc -b --noEmit`.

## Acceptance Criteria

1. Every visible route is white with green text and green UI accents.
2. No orange, beige, brown, charcoal, amber, blue, red, purple, or dark hero/footer surface remains in the application UI.
3. The public hero is white and green rather than a dark image overlay.
4. Admin login and dashboard match the same visual system.
5. Existing auth, forms, listings, and Supabase workflows continue to function.
6. The project typechecks successfully.
