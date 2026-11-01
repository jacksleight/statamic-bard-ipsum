---
id: 34b45e34-75ec-4a17-a91d-68ce1239b53c
blueprint: contexts
title: Contexts
summary: 'The trigger typed inside a heading, a list item, a blockquote and a table cell rather than a top-level paragraph.'
template: tests/contexts
content:
  -
    type: paragraph
    content:
      -
        type: text
        text: 'Empty heading below.'
  -
    type: heading
    attrs:
      level: 2
  -
    type: paragraph
    content:
      -
        type: text
        text: 'Second empty heading below.'
  -
    type: heading
    attrs:
      level: 3
  -
    type: paragraph
    content:
      -
        type: text
        text: 'Bullet list below.'
  -
    type: bulletList
    content:
      -
        type: listItem
        content:
          -
            type: paragraph
            content:
              -
                type: text
                text: 'First item'
      -
        type: listItem
        content:
          -
            type: paragraph
  -
    type: paragraph
    content:
      -
        type: text
        text: 'Ordered list below.'
  -
    type: orderedList
    attrs:
      start: 1
    content:
      -
        type: listItem
        content:
          -
            type: paragraph
  -
    type: paragraph
    content:
      -
        type: text
        text: 'Blockquote below.'
  -
    type: blockquote
    content:
      -
        type: paragraph
  -
    type: paragraph
    content:
      -
        type: text
        text: 'Table below.'
  -
    type: table
    content:
      -
        type: tableRow
        content:
          -
            type: tableHeader
            attrs:
              colspan: 1
              rowspan: 1
              colwidth: null
            content:
              -
                type: paragraph
                content:
                  -
                    type: text
                    text: 'Name'
          -
            type: tableHeader
            attrs:
              colspan: 1
              rowspan: 1
              colwidth: null
            content:
              -
                type: paragraph
                content:
                  -
                    type: text
                    text: 'Notes'
      -
        type: tableRow
        content:
          -
            type: tableCell
            attrs:
              colspan: 1
              rowspan: 1
              colwidth: null
            content:
              -
                type: paragraph
                content:
                  -
                    type: text
                    text: 'Palace Pier'
          -
            type: tableCell
            attrs:
              colspan: 1
              rowspan: 1
              colwidth: null
            content:
              -
                type: paragraph
  -
    type: paragraph
    content:
      -
        type: text
        text: 'End.'
---
