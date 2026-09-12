# Marketing story: sections 02–04

The landing view renders the approved FreightHero followed by FreightNetwork,
EmptyReturn, and MatchingEngine. Later marketing sections are intentionally
not implemented. Existing application views and their API handlers remain.

## Data and content

- Network totals derive from the existing loads and trucks responses. Corridors
  are distinct directed origin/destination pairs, normalized for case and spaces.
- Loading or unavailable responses show a dash, not a fabricated count.
- The network graphic is a schematic, not a live vehicle map or geographic boundary.
- MatchingEngine is explicitly an illustrative Delhi–Jaipur match. Its truck,
  payload, price, and distance are examples, not a booking or a live match.
- Find your next load uses the existing openFreight/auth entry point.

## Motion

useScrollScene updates CSS variables in a requestAnimationFrame callback only
while a section is near the viewport. It removes listeners and observers on
unmount. Routes draw progressively; the empty-return copy reveals and its
background translates subtly. Matching progresses from searching to connecting
at 28%, then matched at 68%, and reverses when scrolling back.

The page wrapper uses overflow-x-clip so it does not create a scroll ancestor
that disables native sticky positioning. Reduced motion shows all copy and the
completed match without parallax or a sticky hold. Short mobile viewports also
use a natural-flow completed matching scene to keep the CTA reachable.

## Validation

- TypeScript and production build.
- Desktop and 390px mobile visual inspection.
- Searching, connecting, matched, and reverse-scroll states; 74px sticky offset.
- Mobile image loading and no page-level horizontal overflow.
- Reduced-motion copy visibility, completed matching state, and disabled parallax.
- Current live API responses were unavailable during browser verification;
  successful live totals and authenticated transactions were not verified.
