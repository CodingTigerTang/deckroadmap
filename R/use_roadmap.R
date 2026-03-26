#' Add a roadmap footer to Reveal.js slides
#'
#' @param sections Character vector of section names in order.
#' @param id HTML id for the hidden config node.
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
#' @return An HTML tag with attached dependencies.
#' @export
use_roadmap <- function(
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
) {
  stopifnot(is.character(sections), length(sections) >= 2)
  
  style <- match.arg(style)
  
  tag <- htmltools::tags$div(
    id = id,
    `data-sections` = paste(sections, collapse = "|"),
    `data-style` = style,
    style = paste0(
      "display:none;",
      "--deckroadmap-font-size:", font_size, ";",
      "--deckroadmap-bottom:", bottom, ";",
      "--deckroadmap-active-bg-color:", active_bg_color, ";",
      "--deckroadmap-done-bg-color:", done_bg_color, ";",
      "--deckroadmap-todo-bg-color:", todo_bg_color, ";",
      "--deckroadmap-active-color:", active_color, ";",
      "--deckroadmap-done-color:", done_color, ";",
      "--deckroadmap-todo-color:", todo_color, ";"
    )
  )
  
  htmltools::attachDependencies(tag, roadmap_dependency())
}

#' HTML dependency for deckroadmap assets
#'
#' @return An htmltools dependency object.
#' @noRd
roadmap_dependency <- function() {
  htmltools::htmlDependency(
    name = "deckroadmap",
    version = as.character(utils::packageVersion("deckroadmap")),
    src = "assets",
    package = "deckroadmap",
    stylesheet = "roadmap.css",
    script = "roadmap.js"
  )
}
