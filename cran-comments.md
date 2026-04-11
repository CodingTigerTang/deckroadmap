## Test environments
* local OS X install, R 4.4.0
* win-builder (devel), R version 4.6.0 beta (2026-04-10 r89860 ucrt)
* rhub v2 (linux, windows, macos)

## R CMD check results
0 errors | 0 warnings | 1 note

## Resubmission Notes
This is a resubmission addressing feedback from Uwe Ligges regarding version 0.1.2.

* **Formatting Fixes:** Added single quotes around software names ('Reveal.js', 'Quarto', and 'R Markdown') in both the Title and Description fields of the DESCRIPTION file as requested.
* **Version Bump:** Increased version to 0.1.3.

## Prior Resubmission History (v0.1.2)
* **Fixed Detritus Issue:** Wrapped examples for `preview_roadmap()` and `use_roadmap()` in `\dontrun{}` blocks. These functions generate HTML tags with dependencies which previously triggered the creation of temporary Calibre folders during the non-interactive check process.
* **Spelling:** Added technical terms ("Roadmap", "js") to `inst/WORDLIST`.

## Note on New Submission
* This is a new submission.