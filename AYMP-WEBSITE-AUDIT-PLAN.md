# AYMP Website — Audit & Cleanup Plan

## Objective
Create a clear global visitor journey without breaking existing working pages.

## Order of work
1. Verify Home and navigation.
2. Verify every Game Zone card and game link.
3. Verify Global Trending: live source timeout, fallback, mobile rendering and no permanent Loading state.
4. Verify Food Discovery links and content.
5. Verify Ask AYMP and clearly label its current public-knowledge capability until a real AI backend is connected.
6. Add Future Technology as a separate discovery section only after the existing navigation is stable.
7. Review AYMP / 999xyz999 displays for clarity; never imply guaranteed token value or profit.
8. Remove or consolidate only confirmed duplicate/dead sections after checking their links and assets.
9. Add revenue only after usability, retention and sharing are stable.

## Visitor structure
HOME
→ GLOBAL DISCOVERY
→ GAME ZONE
→ FOOD DISCOVERY
→ ASK AYMP
→ FUTURE TECHNOLOGY
→ COMMUNITY / SHARE
→ OPTIONAL REVENUE

## UX rules
- Every primary card must have one clear purpose and one clear action.
- Working games are shown first; unfinished games are marked Coming Soon.
- No page should depend on one external API without a timeout and fallback.
- Loading indicators must have a visible timeout/fallback state.
- Mobile landscape games must have a clear fullscreen control and enough playable space.
- Token displays are informational and should not dominate the visitor experience.
- Avoid unnecessary popups, duplicate headings and repeated calls-to-action.

## Current known issues
- Home has repeated Sacred Products sections and needs consolidation after link/asset verification.
- Global Trending previously had a permanent-loading risk; fallback/timeout logic is now the priority to verify.
- Ask AYMP currently uses public knowledge search rather than a full general AI assistant.
- Mystic 3D Quest needs simple, immediately understandable gameplay and visual hierarchy.

## Definition of done
A new visitor should understand within seconds: what AYMP is, what they can do now, where the games are, how to discover content, how to ask a question, and how to share the experience.

## Change policy
Inspect before changing. Make the smallest safe update. Do not delete working content without evidence that it is duplicate, broken or unnecessary. Verify the updated file on the main branch after every change.
