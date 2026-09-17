---
title: "Markdown Syntax Showcase"
date: "2026-04-06"
description: "A comprehensive guide demonstrating every Markdown feature supported on this blog."
tags: ["markdown", "guide", "reference"]
---

## Headings

Content under h2. Below are the remaining heading levels.

### Third-level heading

#### Fourth-level heading

##### Fifth-level heading

###### Sixth-level heading

---

## Paragraphs and inline formatting

This is a regular paragraph. You can write **bold text**, *italic text*, and ***bold italic*** together. You can also use ~~strikethrough~~ for deleted content and `inline code` for technical terms.

Here is a [link to GitHub](https://github.com) and an autolinked URL: https://example.com.

---

## Blockquotes

> This is a blockquote. It can span multiple lines and is useful for highlighting important information.
>
> > Nested blockquotes are also supported. This is a second level.

---

## Lists

### Unordered list

- First item
- Second item
  - Nested item one
  - Nested item two
- Third item

### Ordered list

1. Step one
2. Step two
   1. Sub-step A
   2. Sub-step B
3. Step three

### Task list

- [x] Completed task
- [x] Another done task
- [ ] Pending task
- [ ] One more to do

---

## Code blocks

Inline code looks like `const x = 42;` within a sentence.

Fenced code block with syntax highlighting:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function greet(user: User): string {
  return `Hello, ${user.name}!`;
}
```

```python
def fibonacci(n: int) -> list[int]:
    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[-1] + sequence[-2])
    return sequence

print(fibonacci(10))
```

```bash
# Clone and run the project
git clone https://github.com/example/repo.git
cd repo
pnpm install && pnpm dev
```

---

## Tables

| Feature       | Status      | Notes              |
| ------------- | ----------- | ------------------ |
| Headings      | Supported   | h1 through h6      |
| Code blocks   | Supported   | With highlighting   |
| Tables        | Supported   | GFM syntax          |
| Task lists    | Supported   | Checkboxes render   |

Right-aligned and centered columns:

| Left | Center | Right |
| :--- | :----: | ----: |
| A    |   B    |     C |
| D    |   E    |     F |

---

## Images

![Sample image](/images/blog/sample.svg)

---

## Horizontal rules

Three different syntaxes produce the same rule:

---

***

___

---

## Footnotes

Here is a sentence with a footnote[^1].

[^1]: This is the footnote content.

---

## HTML in Markdown

<details>
<summary>Click to expand</summary>

This content is hidden by default. Useful for FAQs or supplementary information.

</details>

---

That covers all the major Markdown constructs. Use this post as a reference when writing your own content.
