---
id: 95bf30df-835e-4aa6-ad9a-63bebb315bfe
blueprint: basic
title: Basic
summary: 'lorem3, lorem3p, lorem4s and lorem12w typed into empty paragraphs, on the first line and mid-document.'
template: tests/basic
content:
  -
    type: paragraph
  -
    type: heading
    attrs:
      level: 2
    content:
      -
        type: text
        text: 'Mid document'
  -
    type: paragraph
    content:
      -
        type: text
        text: 'Paragraph before.'
  -
    type: paragraph
  -
    type: paragraph
    content:
      -
        type: text
        text: 'Paragraph after.'
  -
    type: heading
    attrs:
      level: 2
    content:
      -
        type: text
        text: 'Sentences'
  -
    type: paragraph
  -
    type: heading
    attrs:
      level: 2
    content:
      -
        type: text
        text: 'Words'
  -
    type: paragraph
---
