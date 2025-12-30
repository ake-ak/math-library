# Quick Reference - JSON Data System

## 🚀 Quick Start

### View Current Setup
```bash
ls -la /home/ake/Ake/math-library/data/
```

### Check if Page has Data Integration
```bash
grep "data-page" /home/ake/Ake/math-library/index.html
```

---

## 📝 Common Tasks

### Update Home Page Title
Edit `/data/home.json`:
```json
{
  "hero": {
    "title": "Your New Title"
  }
}
```

### Add a New Section to a Page
Edit the corresponding JSON file, add to `sections` array:
```json
{
  "title": "New Section",
  "content": [
    {
      "type": "paragraph",
      "text": "Your content here"
    }
  ]
}
```

### Add a New Article
```json
{
  "articles": [
    {
      "title": "Article Title",
      "content": "Article text"
    }
  ]
}
```

### Create a Bulleted List
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

### Create a Numbered List
```json
{
  "type": "list",
  "ordered": true,
  "items": [
    "Step 1",
    "Step 2",
    "Step 3"
  ]
}
```

---

## 📊 Data-Page Mappings

| URL | data-page | JSON File |
|-----|-----------|-----------|
| / | home | home.json |
| /learn/ | learn | learn.json |
| /learn/math/ | math | math.json |
| /courses/ | courses | courses.json |
| /courses/algebra/ | algebra | algebra.json |
| /courses/calculus/ | calculus | calculus.json |
| /courses/geometry/ | geometry | geometry.json |
| /courses/statistics/ | statistics | statistics.json |
| /about/ | about | about.json |
| /blog/ | blog | blog.json |
| /discuss/ | discuss | discuss.json |
| /contribute/ | contribute | contribute.json |
| /legacy/ | legacy | legacy.json |

---

## 🛠️ Adding a New Course

1. Create folder: `/courses/newcourse/`
2. Copy HTML: `index.html` with `<body data-page="newcourse">`
3. Create JSON: `/data/newcourse.json` with content
4. Add link in `/data/courses.json` to list new course
5. Done!

---

## 🔍 Debugging

### Check if JSON is loading
Open browser DevTools (F12) → Console tab
- Look for `data-page` values
- Check Network tab for `/data/*.json` requests
- Should see JSON content being fetched

### Test JSON Validity
Paste JSON in https://jsonlint.com/ to validate

### Check script.js Functions
```javascript
// Test in browser console:
fetchPageData('home').then(data => console.log(data))
```

---

## 📚 File Locations

| What | Where |
|------|-------|
| Page Content | `/data/*.json` |
| Page Structure | `/*.html`, `/*/index.html` |
| JavaScript | `/script.js` |
| Styling | `/style.css` |
| Documentation | `/JSON_*.md` |

---

## ⚡ Performance Notes

- 13 JSON files = ~44 KB total
- Each file loads only when needed
- No caching (loads fresh each time)
- Graceful fallback if JSON fails

---

## 💡 Pro Tips

1. **Keep JSON organized** - One JSON file per page
2. **Validate before saving** - Use JSONLint to check syntax
3. **Use consistent formatting** - Makes JSON easier to read
4. **Test in browser** - Always verify changes appear

---

## 🎯 Key Functions

### In script.js:

```javascript
// Get JSON data
fetchPageData('pagename')

// Render to page
renderPageContent(jsonData)

// Check for data attribute
document.body.getAttribute('data-page')
```

---

## 📞 Support

- Check `/JSON_DATA_SYSTEM.md` for complete documentation
- Review `/JSON_IMPLEMENTATION_SUMMARY.md` for full explanation
- Look at existing JSON files for examples

---

**Everything you need to manage your Math Library content!**
