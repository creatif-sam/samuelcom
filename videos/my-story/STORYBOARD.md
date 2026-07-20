---
format: 1920x1080
message: "A life worth living is one shared in service to others."
arc: story-explainer — setup → tension → turn → resolution → lesson
audience: visitors to samuelgyasi.com's My Story page — people meeting Samuel for the first time
mode: collaborative
music: warm, minimal piano and strings — reflective, dignified, unhurried underscore
---

## Video direction

- **Palette system** (from `frame.md`, Cartesian pack): `bg-primary` (#f0ede8, warm stone paper) is the ground on every frame — no dark canvas. `text-primary` (#0a0908 ink) carries every headline. `text-secondary` (#5A5A5A gray) carries body copy only. `accent` (#546cfa indigo) marks labels, numerals, stat figures, and the single hero emphasis word per frame. `line` (#f2a93b amber) is every hairline, geo-ring, and structural rule — never a fill. No populist third color; no shadows; no rounded rectangles (circles only).
- **Motion grammar + reveal model** — `power3` long-tail settle on every entrance, no bounce/overshoot. Nothing appears before its spoken cue; each frame's content builds across the back ~50% of its duration, timed to the VO phrase breaks (marked by — in the script). Holds read as stillness, at most a subtle jitter (`sine-wave-loop`, low amplitude) — never lazy breathing, never a back-half pan/push.
- **Rhythm / held-frame allocation** — Frame 1 (hook) and Frame 6 (distinction) are the video's two deliberate held/breather beats: content resolves early in the window and then simply reads, still. Frame 9 (close) holds as its entire second half — the thesis line lands and does not move again. All other frames build continuously to their own held final second.
- **Negative list** — no bouncy easing; no lazy breathing/circular pulse; no slideshow front-load (nothing dumps at t=0); no generic AI bokeh or purple-blue gradients; no drop shadows or rounded rectangles (the Cartesian ceiling); no camera pan/push in a frame's back half.

## Frame 1 — Hook

- scene: A warm paper-toned canvas; a label types in, then the date and place settle beneath it, framed by a single geo-ring
- voiceover: "Every story starts somewhere small. — His started in Mpohor."
- duration: 4.011s
- transition_in: cut
- status: animated
- src: compositions/frames/01-hook.html
- type: hook
- persuasion: Concept announcement — the date and place are stated first, before the name, so the viewer leans in to learn whose story this is
- beat: curiosity, intrigue
- blueprint: typewriter-reveal (Adapt)
- focal: the two-line date/place headline
- roles: headline = foreground subject · geo-ring = background ambient (opacity 0.35) · label = supporting
- sfx: soft-type-tick

Adapt: keep the typewriter-reveal's type-on signature move; drop its logo payoff (there is no brand mark this early) and land on the held headline instead.

Scene 1 (0.0–2.0s): bare paper ground, geo-ring already faint in place (static, no entrance). The `label` "A story begins" types on with caret (`type-on with caret` → `discrete-text-sequence` + `context-sensitive-cursor`), synced to "Every story starts somewhere small." Centered-left template, ~30% of frame.
Scene 2 (2.0–5.0s): as the VO says "His started in Mpohor," the headline "22 June 1999 / Mpohor, Ghana" builds in via per-word staggered reveal (`dynamic-content-sequencing`), landing on a smooth `power3` settle — "Mpohor" in accent italic as the emphasized word.
Scene 3 (5.0–7.0s): held read — headline and ring sit still; subtle jitter only (`sine-wave-loop`, low amplitude) on the ring. No further motion.

narrativeRole: Opens the film on the smallest possible fact — a date, a town — before revealing whose life it belongs to. Creates the curiosity gap the rest of the video resolves.
keyMessage: This is a life that began somewhere quiet and unremarkable — and grew into something much larger.

## Frame 2 — Origins

- scene: Two-column editorial split — name and family copy on the left, a crossed-X placeholder standing in for a tailor-shop family photo on the right
- voiceover: "Second of three brothers. — Raised on his father's craftsmanship, and his mother's faith."
- duration: 5.312s
- transition_in: crossfade
- status: animated
- src: compositions/frames/02-origins.html
- type: product_intro
- persuasion: Concretization — the abstract idea of "upbringing" is made tangible through the tailor shop and the two named virtues
- beat: warmth, orientation
- blueprint: titlecard-reveal (Adapt)
- focal: "Samuel Kobina Gyasi" name-lock
- roles: name + body = foreground subject (left column) · image-placeholder = supporting (right column, dim ~90% — it is a stand-in, not a photo) · label = supporting
- sfx: none

Adapt: keep titlecard-reveal's one-restrained-move discipline (a single slide-up crossfade), applied here to a two-column editorial split rather than a single centered card.

Scene 1 (0.0–2.5s): left column: `label` "Origins" crossfades in first (`crossfade`), then "Samuel Kobina Gyasi" locks in via a slide-up crossfade — nothing on the right column yet. Asymmetric 60/40, left-anchored.
Scene 2 (2.5–6.0s): as the VO says "Second of three brothers," the body line reveals via per-word staggered reveal beneath the name; at "his father's craftsmanship," the right-column image-placeholder crossfades in (its crossed-X mark, tagged "Tailor shop — family").
Scene 3 (6.0–9.0s): held read on both columns; on "his mother's faith" the body's final clause gets a quiet keyword-glow (`asr-keyword-glow`) on "faith," then settles still.

narrativeRole: Names the protagonist and grounds him in family — the discipline and faith that became, in his own words, "the first architecture of his soul."
keyMessage: Samuel's foundation was craftsmanship and faith, modeled by his parents.

## Frame 3 — Leadership awakens

- scene: A hairline stat rule — the number "10" beside "Class Prefect," Ghana-China Friendship School, 2009
- voiceover: "At ten years old — he was elected Class Prefect. — His first lesson in leadership."
- duration: 5.184s
- transition_in: push-slide RIGHT
- status: animated
- src: compositions/frames/03-leadership-awakens.html
- type: feature_showcase
- persuasion: Anchoring on a familiar referent — a child's age (ten) anchors the scale of the responsibility that follows
- beat: surprise, recognition
- blueprint: kinetic-type-beats (Reproduce)
- focal: the "10" stat figure
- roles: "10" = foreground subject · role title/body = supporting · hairline rule = structural
- sfx: soft-tick

Reproduce: the age counts up to its landing value and the role-name locks beside it on the same beat — kinetic-type-beats' in-place statement build.

Scene 1 (0.0–2.5s): `label` "Leadership awakens · 2009" crossfades in at top (carried in by the push-slide RIGHT transition). Full-width strip template.
Scene 2 (2.5–5.5s): on "at ten years old," the stat "10" counts up 0→10 (`value-scaled counter` → `counting-dynamic-scale`) with the hairline rule drawing in beneath it (`svg-path-draw`).
Scene 3 (5.5–9.0s): on "elected Class Prefect," the role-title + body reveal via per-word staggered reveal beside the stat, then holds still — subtle jitter only on the "10."

narrativeRole: The first turning point — leadership found him earlier than expected, and the video marks it as the seed of everything that follows.
keyMessage: Samuel's leadership journey began at age ten, not in adulthood.

## Frame 4 — Tested early

- scene: The same hairline-stat stage carries forward — "10" morphs to "17," "Class Prefect" is replaced by "Managing Director"
- voiceover: "By seventeen — he was running a business. — Profit, loss, people. Before he'd even finished school."
- duration: 6.165s
- transition_in: push-slide RIGHT
- status: animated
- src: compositions/frames/04-tested-early.html
- type: feature_showcase
- persuasion: Before/after — the age counter transforming (10 → 17) makes the escalation of responsibility visible in one motion
- beat: momentum, confidence
- blueprint: kinetic-type-beats (Reproduce)
- focal: the "17" stat figure
- roles: "17" = foreground subject · role title/body = supporting · hairline rule = structural (continuity from Frame 3)
- sfx: soft-tick

Reproduce: same stat-rule stage as Frame 3 (consistent stage across the pair), so the two frames read as one continuous beat rather than a fresh template.

Scene 1 (0.0–2.0s): `label` "Tested early · 2017" crossfades in (carried by the push-slide RIGHT seam); hairline rule already in place (continuity from Frame 3, no re-draw).
Scene 2 (2.0–5.5s): on "by seventeen," the stat morphs 10→17 via a `scale-swap` handoff at the same screen position (the outgoing "10" shrinks+fades as "17" arrives) — the escalation is the beat.
Scene 3 (5.5–9.0s): on "running a business… profit, loss, people," the role-title "Managing Director" and body reveal via per-word staggered reveal, then holds — subtle jitter only.

narrativeRole: Shows responsibility compounding — from a school role to real entrepreneurial stakes — before adulthood even begins.
keyMessage: Samuel's leadership wasn't theoretical — it was tested early, with real consequences.

## Frame 5 — The crossing

- scene: A single hairline route line draws from "Ghana" to "Fès, Morocco," with the scholarship headline beneath it
- voiceover: "Then — a scholarship carried him across the Sahara. — A new country. A new language. Computer Science, from scratch."
- duration: 7.189s
- transition_in: crossfade
- status: animated
- src: compositions/frames/05-the-crossing.html
- type: pain_point
- persuasion: Stakes / consequence — displacement into an unfamiliar country and language is framed as the risk that makes the coming achievement meaningful
- beat: tension, anticipation
- blueprint: spatial-pan-stations (Adapt)
- focal: the Ghana → Fès route line
- roles: route line + city labels = foreground subject · headline/body = supporting · label = supporting
- sfx: whoosh-soft

Adapt: keep the "traverse from station to station" signature but compress it to two stations (Ghana, Fès) on a single static line rather than a panned camera — the crossing itself is the whole shot, not a multi-stop tour.

Scene 1 (0.0–2.0s): `label` "The crossing · 2020" crossfades in; "Ghana" locks in on the left, alone. Full-width strip template.
Scene 2 (2.0–5.0s): on "carried him across the Sahara," the hairline route line self-draws left to right (`svg-path-draw`) and "Fès, Morocco" lands on its arrival via a smooth `power3` settle.
Scene 3 (5.0–7.5s): on "a new country, a new language," the headline "A scholarship carried him across the Sahara" reveals via per-word staggered reveal beneath the route.
Scene 4 (7.5–10.0s): on "Computer Science, from scratch," the body line reveals, then the whole frame holds still — subtle jitter only on the route line's arrival point.

narrativeRole: The story's turn — leaving everything familiar behind is the risk that makes the next frame's payoff land.
keyMessage: Samuel left Ghana for Morocco on a scholarship, starting over in a new language and field.

## Frame 6 — Distinction

- scene: A single centered stat — "Highest GPA / in the school" — with the commission line beneath it
- voiceover: "He graduated top of his class. — Not the reward for the past — a commission for what came next."
- duration: 6.08s
- transition_in: crossfade
- status: animated
- src: compositions/frames/06-distinction.html
- type: social_proof
- persuasion: Statistical proof + Distillation — the single concrete claim ("highest GPA") is the proof point, then the line compresses its meaning to one thought
- beat: "aha", conviction
- blueprint: dataviz-countup (Adapt)
- focal: "Highest GPA in the school"
- roles: stat headline = foreground subject (centered, ~50% of frame) · sub-line = supporting
- sfx: none — this is a held/breather beat, deliberately quiet after Frame 5's motion

Adapt: drop the count-up ring mechanic (there is no numeric GPA to display, the site itself doesn't state one) — keep dataviz-countup's "land the hero metric center-frame and hold" signature, applied to a stated superlative instead of a ticking number.

Scene 1 (0.0–3.0s): centered ground, `label` "Distinction · 2023" crossfades in above center — nothing else yet. Centered template, deliberately sparse (this is the video's other held/breather beat).
Scene 2 (3.0–6.0s): on "graduated top of his class," "Highest GPA / in the school" builds in via per-word staggered reveal, dead-center, on a smooth `power3` settle — no ring, no count, just the claim landing.
Scene 3 (6.0–9.0s): on "a commission for what came next," the sub-line reveals beneath, then everything holds fully still (no jitter here — this frame's stillness IS the "aha" beat).

narrativeRole: Pays off the risk from Frame 5 with hard evidence, then reframes achievement as responsibility rather than a finish line.
keyMessage: The displacement paid off — Samuel earned the highest GPA in his school, and understood it as a debt to repay forward.

## Frame 7 — Mastery

- scene: A dashed geo-ring with four small nodes orbiting it; "Master's in Collective Intelligence, UM6P" locks beside it
- voiceover: "Next: a Master's in Collective Intelligence. — How do groups think, decide, and build — together?"
- duration: 6.144s
- transition_in: crossfade
- status: animated
- src: compositions/frames/07-mastery.html
- type: feature_showcase
- persuasion: Question→answer pairing — the central research question is posed directly to the viewer, framing the field itself
- beat: focus, fascination
- blueprint: constellation-hub (Reproduce)
- focal: the four-node ring (the "collective" motif)
- roles: node ring = foreground subject (background dim ~40%) · headline/body = supporting
- sfx: soft-chime

Reproduce: constellation-hub's node-ring-plus-center-resolve signature, cast as four nodes settling into orbit around the ring while the headline locks beside it.

Scene 1 (0.0–2.5s): `label` "Mastery · 2023–2025" crossfades in; the dashed ring is present but the four nodes have not yet sprung in. Asymmetric 60/40 — ring left, text right.
Scene 2 (2.5–5.5s): on "Master's in Collective Intelligence," the four nodes spring into their ring positions in sequence (`orbit` → `orbit-3d-entry`), each on its own beat, as the headline builds in via per-word staggered reveal.
Scene 3 (5.5–9.0s): on "how do groups think, decide, and build — together," the body question reveals beneath the headline, then holds — subtle jitter only on the node ring (a faint, finite drift, not a loop).

narrativeRole: Names the intellectual core of Samuel's present work — the question that now organizes his career.
keyMessage: Samuel's Master's work centers on how groups think and decide together — collective intelligence.

## Frame 8 — The present chapter

- scene: Three hairline-ruled rows self-assemble in sequence — Program Officer, Mentor, Group Intelligence Facilitator
- voiceover: "Today: he coordinates programs. — Mentors the next generation. — And still shows up, for anyone finding their way."
- duration: 7.893s
- transition_in: push-slide RIGHT
- status: animated
- src: compositions/frames/08-present-chapter.html
- type: benefit_highlight
- persuasion: Rule of three — three co-equal roles, each landing on its own beat, show the breadth of his present service
- beat: momentum, satisfaction
- blueprint: grid-card-assemble (Adapt)
- focal: the three-row list
- roles: rows = foreground subject · heading = supporting · label = supporting
- sfx: soft-tick (×3, one per row)

Adapt: grid-card-assemble's staggered self-assembly, applied to a vertical three-row hairline list (matching Cartesian's agenda-row component) instead of a card grid.

Scene 1 (0.0–2.0s): `label` "The present chapter · 2025–now" and the heading "Building, serving, rooting" crossfade in together (carried by the push-slide RIGHT seam). Full-width, left-anchored.
Scene 2 (2.0–7.0s): each row reveals on its own spoken clause — "01 Program Officer" on "coordinates programs," "02 Mentor" on "mentors the next generation," "03 Group Intelligence Facilitator" on "shows up, for anyone finding their way" — each via a slide-up crossfade onto its hairline rule, staggered strictly one-per-beat (never all three at once).
Scene 3 (7.0–9.0s): all three rows held, still — subtle jitter only on the numerals.

narrativeRole: Shows where all the earlier chapters converge — Samuel's current, ongoing work as officer, mentor, and facilitator.
keyMessage: Samuel now spends his life in service — coordinating programs, mentoring others, and facilitating collective thinking.

## Frame 9 — Lesson and close

- scene: A large centered geo-ring frames the thesis line, revealed word by word, closed by a single ink accent rule
- voiceover: "A life worth living — is one shared in service to others."
- duration: 3.648s
- transition_in: crossfade
- status: animated
- src: compositions/frames/09-lesson-close.html
- type: branding
- persuasion: Distillation — the entire video compresses to the one line that has been true since Frame 2
- beat: clarity, resolve
- blueprint: titlecard-reveal (Reproduce)
- focal: the thesis line
- roles: thesis line = foreground subject, centered · geo-ring = background ambient · horizontal-accent = closing mark
- sfx: none — the video's quietest beat by design

Reproduce: titlecard-reveal's exactly-one-restrained-move discipline — a single slide-up crossfade lands the line, then it is never touched again.

Scene 1 (0.0–1.0s): the large centered geo-ring is already in place, static (no entrance — it was building presence since Frame 7's smaller ring, a visual callback).
Scene 2 (1.0–4.5s): on "a life worth living," the first clause reveals via per-word staggered reveal, centered; on "is one shared in service to others," the second clause continues the same reveal, with "shared in service to others" landing in accent italic as the emphasized close.
Scene 3 (4.5–6.0s): the ink horizontal-accent rule draws in beneath (`svg-path-draw`), then the entire frame holds dead still — no jitter, no motion of any kind. This is the film's final image.

narrativeRole: Lands the thesis in Samuel's own words — the idea every chapter has been building toward.
keyMessage: The throughline of Samuel's story is a life given in service to others.
