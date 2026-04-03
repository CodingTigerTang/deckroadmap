#' Preview a roadmap footer style
#'
#' @param sections Character vector of section names in order.
#' @param current The current section name to highlight.
#' @param style Roadmap style. One of "pill", "minimal", or "progress".
#' @param font_size CSS font size for the roadmap footer.
#' @param bottom CSS bottom offset for the roadmap footer.
#' @param active_color CSS text color for the active section.
#' @param done_color CSS text color for completed sections.
#' @param todo_color CSS text color for upcoming sections.
#' @param active_bg_color CSS background color for the active section in
#'   progress style.
#' @param done_bg_color CSS background color for completed sections in
#'   progress style.
#' @param todo_bg_color CSS background color for upcoming sections in
#'   progress style.
#'
#' @return A browsable HTML preview.
#' @export
preview_roadmap <- function(
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
) {
  stopifnot(is.character(sections), length(sections) >= 2)
  stopifnot(is.character(current), length(current) == 1)
  
  style <- match.arg(style)
  current_index <- match(current, sections)
  
  if (is.na(current_index)) {
    stop("`current` must match one of the values in `sections`.")
  }
  if (style == "progress") {
    if (is.null(active_color)) active_color <- "#ffffff"
    if (is.null(done_color)) done_color <- "#ffffff"
    if (is.null(todo_color)) todo_color <- "#3f4a5a"
    if (is.null(active_bg_color)) active_bg_color <- "#111111"
    if (is.null(done_bg_color)) done_bg_color <- "#4a4a4a"
    if (is.null(todo_bg_color)) todo_bg_color <- "#e9edf3"
  }
  
  footer <- htmltools::tags$div(
    class = paste("roadmap-footer", paste0("style-", style)),
    style = paste0(
      "--deckroadmap-font-size:", font_size, ";",
      "--deckroadmap-bottom:", bottom, ";",
      "--deckroadmap-active-color:", active_color, ";",
      "--deckroadmap-done-color:", done_color, ";",
      "--deckroadmap-todo-color:", todo_color, ";",
      "--deckroadmap-active-bg-color:", active_bg_color, ";",
      "--deckroadmap-done-bg-color:", done_bg_color, ";",
      "--deckroadmap-todo-bg-color:", todo_bg_color, ";",
      "position: relative;",
      "left: auto;",
      "bottom: auto;",
      "transform: none;",
      "margin: 40px auto;"
    ),
    build_preview_items(sections, current_index, style)
  )
  
  page <- htmltools::tags$div(
    style = paste(
      "min-height: 220px;",
      "padding: 32px 24px;",
      "background: #f8fafc;",
      "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;"
    ),
    htmltools::tags$div(
      style = paste(
        "max-width: 1000px;",
        "margin: 0 auto;"
      ),
      htmltools::tags$div(
        style = paste(
          "font-size: 14px;",
          "font-weight: 600;",
          "color: #475569;",
          "margin-bottom: 18px;"
        ),
        paste0("Preview: ", style, " style")
      ),
      htmltools::tags$div(
        style = paste(
          "height: 140px;",
          "position: relative;",
          "border: 1px solid #e2e8f0;",
          "border-radius: 16px;",
          "background: white;",
          "overflow: hidden;"
        ),
        footer
      )
    )
  )
  
  htmltools::browsable(
    htmltools::attachDependencies(page, roadmap_dependency())
  )
}

#' @noRd
build_preview_items <- function(sections, current_index, style) {
  items <- vector("list", length = 0)
  
  for (i in seq_along(sections)) {
    state_class <- if (i < current_index) {
      "done"
    } else if (i == current_index) {
      "active"
    } else {
      "todo"
    }
    
    item_classes <- c("roadmap-item", state_class)
    
    if (style == "progress") {
      if (i == 1) item_classes <- c(item_classes, "is-first")
      if (i == length(sections)) item_classes <- c(item_classes, "is-last")
    }
    
    label <- htmltools::tags$span(
      class = "roadmap-label",
      sections[i]
    )
    
    items[[length(items) + 1]] <- htmltools::tags$span(
      class = paste(item_classes, collapse = " "),
      label
    )
    
    if (style != "progress" && i < length(sections)) {
      items[[length(items) + 1]] <- htmltools::tags$span(
        class = "roadmap-sep",
        "\u2022"
      )
    }
  }
  
  items
}

