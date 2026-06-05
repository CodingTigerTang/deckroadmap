# Getting started with deckroadmap

## Overview

`deckroadmap` adds section-aware roadmap footers to Reveal.js
presentations created with Quarto or R Markdown.

The goal is simple: help audiences understand where they are in the flow
of a presentation. Instead of only knowing how many slides are left,
they can see what has been covered, what section is active, and what
comes next.

This vignette shows:

- how to add a roadmap footer
- how to tag slides with section names
- how section inheritance works
- how to hide the roadmap on selected slides
- how to switch styles
- how to preview styles before rendering slides

## Basic idea

The workflow has two parts:

1.  Define the sections of your presentation with
    [`use_roadmap()`](https://codingtigertang.github.io/deckroadmap/reference/use_roadmap.md)
2.  Tag slides with matching `data-roadmap` values

A minimal example looks like this:

``` r

library(deckroadmap)

use_roadmap(
  sections = c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps")
)
```

The function returns an HTML tag with the configuration and dependencies
needed for the roadmap footer.

## Using `deckroadmap` in Quarto

In a Quarto Reveal.js document, call
[`use_roadmap()`](https://codingtigertang.github.io/deckroadmap/reference/use_roadmap.md)
in an R chunk near the top of the file.

By default, you only need to tag the first slide of each section. Later
slides inherit the most recent `data-roadmap` value unless you
explicitly change it.

A minimal example:

```` markdown
---
title: "deckroadmap Quarto demo"
format:
  revealjs:
    theme: default
---


``` r
library(deckroadmap)
use_roadmap(
  c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps"),
  style = "progress",
  active_bg_color = "#87CEEB"
)
```

## Welcome {data-roadmap="Intro"}

This is the opening slide.

## Why this matters 

Some framing content.

## The problem {data-roadmap="Problem"}

Describe the challenge here.

## What changed 

More problem context.

## Analysis overview {data-roadmap="Analysis"}

Start the analysis section.

## Key findings 

Show results here.

## Recommendation {data-roadmap="Recommendation"}

Explain the recommendation.

## Tradeoffs {data-roadmap="Recommendation"}

Discuss caveats and decisions.

## Next steps {data-roadmap="Next Steps"}

End with the action plan.

## Q&A 

Questions.
````

## Using `deckroadmap` in R Markdown

The same idea works for R Markdown Reveal.js slides.

By default, you only need to tag the first slide of each section. Later
slides inherit the most recent `data-roadmap` value unless you
explicitly change it.

``` markdown
---
title: "deckroadmap R Markdown demo"
output:
  revealjs::revealjs_presentation
---



## Welcome {data-roadmap="Intro"}

This is the opening slide.

## Why this matters 

Some framing content.

## The problem {data-roadmap="Problem"}

Describe the challenge here.

## What changed 

More problem context.

## Analysis overview {data-roadmap="Analysis"}

Start the analysis section.

## Key findings

Show results here.

## Recommendation {data-roadmap="Recommendation"}

Explain the recommendation.

## Tradeoffs 

Discuss caveats and decisions.

## Next steps {data-roadmap="Next Steps"}

End with the action plan.

## Q&A 

Questions.
```

## Tagging slides

The roadmap depends on slide-level section tags such as:

``` markdown
## Analysis overview {data-roadmap="Analysis"}
```

The values used in `data-roadmap` should match the section names passed
to
[`use_roadmap()`](https://codingtigertang.github.io/deckroadmap/reference/use_roadmap.md).

For example, if the roadmap is defined as:

``` r

use_roadmap(
  c("Intro", "Analysis", "Recommendation")
)
```

then valid slide tags include:

``` markdown
## Welcome {data-roadmap="Intro"}
## Analysis overview {data-roadmap="Analysis"}
## Recommendation {data-roadmap="Recommendation"}
```

## Inheriting section tags

By default, untagged slides inherit the most recent `data-roadmap`
value. This makes it easier to tag only the first slide of each section.

For example:

``` markdown
## Intro {data-roadmap="Intro"}
## More intro content
## Problem {data-roadmap="Problem"}
## More problem detail
```

In this example, the second slide inherits `Intro`, and the fourth slide
inherits `Problem`.

## Roadmap-free slides

To hide the roadmap on a specific slide, use:

``` markdown
## Break slide {data-roadmap="none"}
```

This is useful for title slides, divider slides, or transitions where
you do not want the roadmap to appear.

## Built-in styles

`deckroadmap` currently includes three built-in styles.

### Pill

The `pill` style is the default polished floating footer.

``` r

use_roadmap(
  c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps"),
  style = "pill"
)
```

### Minimal

The `minimal` style has less visual weight and works well when you want
simpler signposting.

``` r

use_roadmap(
  c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps"),
  style = "minimal"
)
```

### Progress

The `progress` style emphasizes completed, current, and upcoming
sections more strongly.

``` r

use_roadmap(
  c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps"),
  style = "progress"
)
```

## Customization

You can customize font size, position, text colors, and, for the
progress style, background colors.

### Example: text styling

``` r

use_roadmap(
  c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps"),
  style = "pill",
  font_size = "14px",
  bottom = "12px",
  active_color = "#2563eb",
  done_color = "#374151",
  todo_color = "#9ca3af"
)
```

### Example: progress colors

``` r

use_roadmap(
  c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps"),
  style = "progress",
  active_color = "#ffffff",
  done_color = "#ffffff",
  todo_color = "#334155",
  active_bg_color = "#2563eb",
  done_bg_color = "#475569",
  todo_bg_color = "#e2e8f0"
)
```

## Previewing styles

Before rendering a full slide deck, you can preview a roadmap style with
[`preview_roadmap()`](https://codingtigertang.github.io/deckroadmap/reference/preview_roadmap.md).

``` r

preview_roadmap(
  sections = c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps"),
  current = "Analysis",
  style = "progress"
)
```

This is helpful when experimenting with styles, colors, and section
names.

## Summary

`deckroadmap` provides a simple way to add section-aware roadmap footers
to Reveal.js slides in Quarto and R Markdown. Define your sections once,
tag slides with `data-roadmap`, choose a style, and optionally preview
the result before rendering a full deck.

By default, untagged slides inherit the most recent section, and
`data-roadmap="none"` can be used to hide the roadmap on a specific
slide. This small amount of structure can make it easier for audiences
to follow the flow of a presentation.
