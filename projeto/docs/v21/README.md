# CONFLORA V21 — Evidence-led botanical investigation

Date: 2026-11-16. Parent: `23027371a5bf0c6dc5610c4f1824f2778411ba26`.

## Scope
The V21 screen reads user-declared site conditions and the existing 19-species evidence matrix, then presents per-area documentary matches, research-only records, explicit unknowns, and links to source material. It does **not** change the existing V19 planting-draft gate, saved projects, globe or visual language. The existing Herbarium is retained.

## New source review (not new species)
- [Brazilian bioretention literature review](https://www.scielo.br/j/esa/a/wgZfB4CMmJGhsYRycNMhJFk/?lang=en): literature synthesis mentions *Cyperus giganteus*, *Alternanthera brasiliana*, *Rhynchanthera grandiflora*, and *Arachis repens* among species investigated in seasonally wet contexts. This is **not** a controlled Itapeva planting trial, a local-ecology survey, or a hydraulic efficacy measurement.
- [Iowa State University Extension — native perennials for moist/wet soil](https://yardandgarden.extension.iastate.edu/how-to/native-perennials-moist-wet-soils): contextual horticultural guidance for *Carex vulpinoidea* and *Panicum virgatum*. It does **not** measure runoff reduction by individual plants.
- [Iowa State University Extension — wet/shady perennial FAQ](https://yardandgarden.extension.iastate.edu/faq/what-perennials-tolerate-wet-shady-locations): contextual horticultural guidance for *Mertensia virginica*, without establishing prolonged inundation tolerance.

These supplements are linked to existing verified taxa only. Current botanical catalog: **19 species; 0 additions; 7 source annotations**, to avoid unverified photo identity, taxonomy or local adaptation.

## Algorithm
1. Reuse `buildV19Proposal` to resolve annotated areas and inherited conditions.
2. For each species within the declared regional context, use source-linked sun and moisture values from `evidenceClaims.json`. Missing attributes remain unknown.
3. A match appears only for at least one documented comparable field with no known disagreement with another documented field. A guideline outside its listed range is identified as *outside documented range*, not proof of biological intolerance.
4. Background Brazilian studies and reviews remain `research-only`; they never become eligible planting choices.
5. Always surface missing site data and structural constraints (slow apparent drainage, persistent pooling, nearby buildings), without predicting hydraulic performance.
6. Show source URLs and image credits from the existing catalog. Cap view results for readability, without hiding the reasoning for inconclusive cases.

## Regression and field status
- Itapeva BR case (20 m², sunny, slow drainage, wet, 3 pooling marks, 3 roof outlets, 1 paved mark): no new planting approval. Four literature-based research records are available to inspect.
- Iowa: existing guide-backed species may appear as context matches when reported conditions overlap source claims, **not final planting recommendations**.
- V20 and earlier projects are not migrated or modified; the algorithm is derived at render time.
- Browser, build, PDF, globe and deployment verification are contingent upon the accompanying CI run; do not treat file presence as test success.

## Known limitations
No site soil infiltration measurements, runoff volumes, local regulatory review, underground utilities, photographic species inference or hydrologic design. Source statements should be rechecked when guidelines change. The literature coverage is not exhaustive.
