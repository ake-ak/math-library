# Math Library - JSON Data System

## Overview

Math Library now uses a **JSON-based data system** where content for each page is stored in separate JSON files. This enables:

- ✅ **Dynamic Content Loading** - Pages fetch and render content from JSON files
- ✅ **Easy Content Updates** - Update content without modifying HTML
- ✅ **Separation of Concerns** - Data is separate from structure and styling
- ✅ **Scalability** - Easy to add new pages or expand content
- ✅ **Maintainability** - Single source of truth for each page's content

---

## Architecture

### File Structure

```
/math-library/
├── data/                         # All JSON data files
│   ├── home.json               # Home page content
│   ├── learn.json              # Learn hub content
│   ├── math.json               # Math subpage content
│   ├── courses.json            # Courses hub content
│   ├── algebra.json            # Algebra course content
│   ├── calculus.json           # Calculus course content
│   ├── geometry.json           # Geometry course content
│   ├── statistics.json         # Statistics course content
│   ├── about.json              # About page content
│   ├── blog.json               # Blog page content
│   ├── discuss.json            # Discussion page content
│   ├── contribute.json         # Contribute page content
│   └── legacy.json             # Legacy page content
│
├── script.js                    # Enhanced with data fetching functions
└── [all HTML pages]            # Now include data-page attribute
```

---

## How It Works

### 1. HTML Pages Include Data Attribute

Each page's `<body>` tag includes a `data-page` attribute:

```html
<body data-page="home">
  <!-- Page structure -->
</body>
```

### 2. JavaScript Fetches Data

When the page loads, `script.js`:

```javascript
// Get page identifier
const pageDataAttr = document.body.getAttribute('data-page');

// Fetch corresponding JSON
fetchPageData(pageDataAttr).then(data => {
  if (data) {
    renderPageContent(data);
  }
});
```

### 3. Content is Rendered Dynamically

The `renderPageContent()` function:
- Updates the page hero (title and subtitle)
- Creates sections from JSON data
- Renders articles with structured content
- Supports paragraphs, lists, nested content

---

## JSON Data Structure

### Basic Structure

```json
{
  "hero": {
    "title": "Page Title",
    "subtitle": "Page subtitle or description"
  },
  "sections": [
    {
      "title": "Section Title",
      "intro": "Optional introductory paragraph",
      "content": [...],
      "articles": [...]
    }
  ]
}
```

### Hero Section

```json
{
  "hero": {
    "title": "Main Heading",
    "subtitle": "Subtitle or description"
  }
}
```

### Sections with Intro

```json
{
  "title": "Section Title",
  "intro": "Introductory paragraph",
  "content": [...]
}
```

### Content Types

#### Paragraph

```json
{
  "type": "paragraph",
  "text": "Your paragraph text here"
}
```

#### Unordered List

```json
{
  "type": "list",
  "items": [
    "First item",
    "Second item",
    "Third item"
  ]
}
```

#### Ordered List

```json
{
  "type": "list",
  "ordered": true,
  "items": [
    "First step",
    "Second step",
    "Third step"
  ]
}
```

### Articles (with Titles)

```json
{
  "articles": [
    {
      "title": "Article Title",
      "content": "Simple text or array of content objects"
    },
    {
      "title": "Another Article",
      "content": [
        {
          "type": "paragraph",
          "text": "First paragraph"
        },
        {
          "type": "list",
          "items": ["Item 1", "Item 2"]
        }
      ]
    }
  ]
}
```

---

## Complete Examples

### Simple Page (Learn Page)

```json
{
  "hero": {
    "title": "Learn Mathematics",
    "subtitle": "Structured learning paths..."
  },
  "sections": [
    {
      "title": "Learning Paths",
      "content": [
        {
          "type": "paragraph",
          "text": "Mathematics is best learned through structured progression..."
        }
      ]
    }
  ]
}
```

### Complex Page (Algebra Course)

```json
{
  "hero": {
    "title": "Algebra",
    "subtitle": "The language of mathematics..."
  },
  "sections": [
    {
      "title": "Learning Objectives",
      "content": [
        {
          "type": "paragraph",
          "text": "Upon completing this course..."
        },
        {
          "type": "list",
          "items": [
            "Solve linear and quadratic equations",
            "Work with polynomials"
          ]
        }
      ]
    },
    {
      "title": "Course Modules",
      "articles": [
        {
          "title": "Module 1: Foundations",
          "content": [
            {
              "type": "paragraph",
              "text": "Variables, expressions, and equations..."
            }
          ]
        }
      ]
    }
  ]
}
```

---

## Key Functions in script.js

### `fetchPageData(pageName)`

Fetches JSON data for a page.

```javascript
async function fetchPageData(pageName) {
  try {
    const response = await fetch(`/data/${pageName}.json`);
    if (!response.ok) {
      console.warn(`Could not load data for ${pageName}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching ${pageName}.json:`, error);
    return null;
  }
}
```

### `renderPageContent(data)`

Renders JSON data into the page.

```javascript
function renderPageContent(data) {
  if (!data) return false;
  
  // Updates page hero
  // Creates sections
  // Renders articles
  // Handles paragraphs and lists
  
  return true;
}
```

---

## Adding a New Page

To add a new page:

1. **Create HTML file** with `data-page="pagename"` attribute
2. **Create JSON file** at `/data/pagename.json`
3. **Structure JSON** with hero and sections
4. **JavaScript automatically loads** the data when page loads

Example:

```html
<!-- /courses/linear-algebra/index.html -->
<body data-page="linear-algebra">
  <!-- Standard page structure -->
</body>
```

```json
// /data/linear-algebra.json
{
  "hero": {
    "title": "Linear Algebra",
    "subtitle": "..."
  },
  "sections": [...]
}
```

---

## Updating Content

To update content:

1. **Edit the JSON file** in `/data/`
2. **No HTML changes needed**
3. **Refresh the page** to see changes
4. **Content is immediately updated**

Example: To update the home page title, edit `/data/home.json`:

```json
{
  "hero": {
    "title": "New Title Here"
  }
}
```

---

## Benefits

### For Content Creators

- ✅ Update content without touching HTML
- ✅ Clear, readable JSON structure
- ✅ Easy to add new sections or articles
- ✅ No need to understand HTML tags

### For Developers

- ✅ Separation of content and presentation
- ✅ Reusable rendering functions
- ✅ Easy to add new content types
- ✅ Simplified page templates

### For Maintainers

- ✅ Single source of truth for each page
- ✅ Easier to backup and version content
- ✅ Can move data to a database later
- ✅ Scalable to many pages

---

## Current Pages with Data

| Page | JSON File | Data Attribute |
|------|-----------|---|
| Home | home.json | `data-page="home"` |
| Learn | learn.json | `data-page="learn"` |
| Math Path | math.json | `data-page="math"` |
| Courses | courses.json | `data-page="courses"` |
| Algebra | algebra.json | `data-page="algebra"` |
| Calculus | calculus.json | `data-page="calculus"` |
| Geometry | geometry.json | `data-page="geometry"` |
| Statistics | statistics.json | `data-page="statistics"` |
| About | about.json | `data-page="about"` |
| Blog | blog.json | `data-page="blog"` |
| Discussion | discuss.json | `data-page="discuss"` |
| Contribute | contribute.json | `data-page="contribute"` |
| Legacy | legacy.json | `data-page="legacy"` |

---

## Fallback Behavior

If JSON data fails to load:

- ✅ Page displays static HTML content (hardcoded fallback)
- ✅ No error is thrown
- ✅ Site continues to function
- ✅ Browser console shows warning

This ensures the site remains functional even if JSON loading fails.

---

## Future Enhancements

Possible improvements to the data system:

1. **Database Integration** - Replace JSON with database queries
2. **Content Management System** - Admin interface for editing
3. **Internationalization** - Translate JSON files for multiple languages
4. **Caching** - Cache JSON data for performance
5. **Compression** - Gzip JSON files to reduce size
6. **API Endpoints** - Expose data through API
7. **Search** - Index and search JSON content
8. **Analytics** - Track which content is most viewed

---

**The JSON data system makes Math Library flexible, maintainable, and scalable for the future!**
