## Test environments
* local OS X install, R 4.4.0
* win-builder (devel), R version 4.6.0 beta (2026-04-10 r89860 ucrt)
* rhub v2 (linux, windows, macos)

## R CMD check results
0 errors | 0 warnings | 1 note

## Resubmission Notes
This is a resubmission to address the "detritus in temp directory" NOTE found during the Debian pre-test of version 0.1.1.

* **Fixed Detritus Issue:** Wrapped examples for `preview_roadmap()` and `use_roadmap()` in `\dontrun{}` blocks. These functions generate HTML tags with dependencies which triggered the creation of temporary Calibre folders during the non-interactive check process.
* **Spelling:** The noted spelling errors in the DESCRIPTION file ("Roadmap", "js") are intentional technical terms and names of software. These have been added to `inst/WORDLIST` to ensure the check is as clean as possible.

## Note on New Submission
* This is a new submission.