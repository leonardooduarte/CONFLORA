# CONFLORA V21.2 — Journey, integrated results and premium quality

Base: `feat/conflora-v21-1-premium-refinement` at `84e7ada122a050f05356582b93fae4faa2051d36`.
Source development branch: `feat/conflora-v21-2-integrated-experience`.

## Implemented in V21.2

- One data-backed five-stage guided journey, built over the original StudioJourney handlers. The first four actions retain their existing event handlers. A fifth distinct planning stage opens the existing plan. Photo remains optional; completion statuses are based on user-reported data, not guessed site measurements.
- Site-wide or observation-specific condition editing from the journey. Switching does not merge or overwrite unrelated annotation attributes.
- New integrated results reading combines the existing `buildV20Insight` and `reviewBotanicalV21` with the V21.1 display-only grouping. Shows observation counts, site image, regional conditions and provenance, documented botanical matches, research-only taxa, uncertainties, next field checks, A/B state and direct access to the original report and editor.
- Dedicated selected-area tabs and source links. No new plant selection or hydraulic calculations. All original scientific models and detailed views stay accessible and testable.
- Clean photo view: toggles a read-only render with an empty view-only annotation array, without changing the underlying project, marker IDs, persisted JSON or undo history. Switching off restores all marks.
- More visible editor focus and selection states, responsive touch targets, concise labels.
- An authentic V21.1 automated-browser screenshot of the existing editor is used in the home explanation, explicitly labeled as a demonstration and *not* a real environmental diagnosis. It was copied from the project's own GitHub Pages validation snapshot; no photo or license was invented.
- Original gallery's nine photos and the COBE globe's 16 Polaroids are preserved.

## Limitations and scientific caution

- Neither the image nor the markers establish infiltration, water volume, runoff, slope or plant effectiveness.
- Brazil research-only records stay research-only; Iowa guide-backed matches are contextual evidence, not a planting instruction.
- Summaries disclose data not reported, and area-specific conditions override global ones only for that observation.
- Existing V19/V20/V21 panels remain available for depth and legacy behavior; the integrated view is their shared starting point, not a separate computational engine.
- No new external photographs are introduced without verified licensing. A further documentary photo collection would require source vetting.
- Lighthouse is a synthetic laboratory measurement if available, not real-user Core Web Vitals; INP requires sufficient interactions or field data to interpret.

## Validation

Run `node tests/v21-2-model.mjs` in `projeto` for deterministic checks of Itapeva, Iowa, missing data, per-area conditions and JSON compatibility.
Run `node tests/v21-2-browser.mjs` against Vite on port 5176 for five-stage actions, integrated reading, touch mark creation, PDF, screenshots and responsiveness.
Run regressions for V19, V20, V21 and V21.1, including the globe and 16 Polaroids. Validation results are published as `review/validation.json` with accompanying screenshots if the workflow passes.

## Deployment and screenshots

Only the new `/CONFLORA/previews/conflora-v21-2/` directory may be published. Keep all previous previews and `/CONFLORA/` official files unchanged. See the GitHub Actions run for test evidence and before/after snapshots.
