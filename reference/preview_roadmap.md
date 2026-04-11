# Preview a roadmap footer style

Preview a roadmap footer style

## Usage

``` r
preview_roadmap(
  sections,
  current = sections[1],
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

- current:

  The current section name to highlight.

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

A browsable HTML preview.

## Examples

``` r
# Preview the default pill style
preview_roadmap(
  sections = c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps"),
  current = "Analysis"
)

  
    Preview: pill style
    
      
        
          Intro
        
        •
        
          Problem
        
        •
        
          Analysis
        
        •
        
          Recommendation
        
        •
        
          Next Steps
        
      
    
  


# Preview the progress style with custom colors
preview_roadmap(
  sections = c("Intro", "Problem", "Analysis", "Recommendation", "Next Steps"),
  current = "Analysis",
  style = "progress",
  active_color = "#ffffff",
  done_color = "#ffffff",
  todo_color = "#334155",
  active_bg_color = "#2563eb",
  done_bg_color = "#475569",
  todo_bg_color = "#e2e8f0"
)

  
    Preview: progress style
    
      
        
          Intro
        
        
          Problem
        
        
          Analysis
        
        
          Recommendation
        
        
          Next Steps
        
      
    
  


```
