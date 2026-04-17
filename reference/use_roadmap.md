# Add a roadmap footer to Reveal.js slides

Add a roadmap footer to Reveal.js slides

## Usage

``` r
use_roadmap(
  sections,
  id = "roadmap-config",
  style = c("pill", "minimal", "progress"),
  font_size = "16px",
  bottom = "16px",
  active_color = NULL,
  done_color = NULL,
  todo_color = NULL,
  active_bg_color = NULL,
  done_bg_color = NULL,
  todo_bg_color = NULL
)
```

## Arguments

- sections:

  Character vector of section names in order.

- id:

  HTML id for the hidden config node.

- style:

  Roadmap style. One of "pill", "minimal", or "progress".

- font_size:

  CSS font size for the roadmap footer.

- bottom:

  CSS bottom offset for the roadmap footer.

- active_color:

  CSS text color for the active section.

- done_color:

  CSS text color for completed sections.

- todo_color:

  CSS text color for upcoming sections.

- active_bg_color:

  CSS background color for the active section in progress style.

- done_bg_color:

  CSS background color for completed sections in progress style.

- todo_bg_color:

  CSS background color for upcoming sections in progress style.

## Value

An HTML tag with attached dependencies.

## Examples

``` r
# \donttest{
# Add a simple roadmap footer
use_roadmap(
  sections = c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps")
)
#> <div id="roadmap-config" data-sections="Intro|Problem|Analysis|Recommendation|Next Steps" data-style="pill" style="display:none;--deckroadmap-font-size:16px;--deckroadmap-bottom:16px;--deckroadmap-active-bg-color:;--deckroadmap-done-bg-color:;--deckroadmap-todo-bg-color:;--deckroadmap-active-color:;--deckroadmap-done-color:;--deckroadmap-todo-color:;"></div>


# Customize the progress style
use_roadmap(
  sections = c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps"),
  style = "progress",
  active_color = "#ffffff",
  done_color = "#ffffff",
  todo_color = "#334155",
  active_bg_color = "#2563eb",
  done_bg_color = "#475569",
  todo_bg_color = "#e2e8f0"
)
#> <div id="roadmap-config" data-sections="Intro|Problem|Analysis|Recommendation|Next Steps" data-style="progress" style="display:none;--deckroadmap-font-size:16px;--deckroadmap-bottom:16px;--deckroadmap-active-bg-color:#2563eb;--deckroadmap-done-bg-color:#475569;--deckroadmap-todo-bg-color:#e2e8f0;--deckroadmap-active-color:#ffffff;--deckroadmap-done-color:#ffffff;--deckroadmap-todo-color:#334155;"></div>
# }
```
