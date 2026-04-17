## Test environments
* local OS X install, R 4.4.0
* win-builder (devel), R version 4.6.0 beta (2026-04-16 r89860 ucrt)
* rhub v2 (linux, windows, macos)

## R CMD check results
0 errors | 0 warnings | 1 note

## Resubmission Notes
This is a resubmission addressing feedback from Benjamin Altmann regarding version 0.1.3.

* **Example Structure:** Replaced `\dontrun{}` with `if (interactive()) {}` for the `preview_roadmap()` function, as it is intended for interactive browser use. 
* **Example Testing:** Replaced `\dontrun{}` with `\donttest{}` for `use_roadmap()` to allow users to see and run examples easily while avoiding automated check issues in non-interactive environments.
* **Version Bump:** Increased version to 0.1.4.

## Prior Resubmission History
* **v0.1.3 (Uwe Ligges):** Added single quotes around software names ('Reveal.js', 'Quarto', and 'R Markdown') in both the Title and Description fields of the DESCRIPTION file.
* **v0.1.2:** Resolved "detritus in temp directory" NOTE by wrapping HTML-generating examples. Added technical terms ("Roadmap", "js") to `inst/WORDLIST`.

## Note on New Submission
* This is a new submission.