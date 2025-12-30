// ========== DATA FETCHING SYSTEM ==========
// Fetch JSON data for pages and render content dynamically

async function fetchPageData(pageName) {
  try {
    const response = await fetch(`/data/${pageName}.json`);
    if (!response.ok) {
      console.warn(`Could not load data for ${pageName}. Using fallback content.`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching ${pageName}.json:`, error);
    return null;
  }
}

function renderPageContent(data) {
  if (!data) return false;

  // Render page hero
  const pageHero = document.querySelector('.page-hero-content');
  if (pageHero && data.hero) {
    if (data.hero.title) {
      const h1 = pageHero.querySelector('h1');
      if (h1) h1.textContent = data.hero.title;
    }
    if (data.hero.subtitle) {
      const p = pageHero.querySelector('p');
      if (p) p.textContent = data.hero.subtitle;
    }
  }

  // Render main content sections
  const mainContent = document.querySelector('.main-content .container');
  if (mainContent && data.sections) {
    // Clear existing sections (keep page hero)
    const existingSections = mainContent.querySelectorAll('section');
    existingSections.forEach(section => section.remove());

    // Add new sections from data
    data.sections.forEach(section => {
      const sectionEl = document.createElement('section');
      sectionEl.className = 'section';

      if (section.title) {
        const h2 = document.createElement('h2');
        h2.textContent = section.title;
        sectionEl.appendChild(h2);
      }

      if (section.intro) {
        const p = document.createElement('p');
        p.textContent = section.intro;
        sectionEl.appendChild(p);
      }

      if (section.articles && Array.isArray(section.articles)) {
        section.articles.forEach(article => {
          const articleEl = document.createElement('article');
          articleEl.className = 'article';

          if (article.title) {
            const h3 = document.createElement('h3');
            h3.textContent = article.title;
            articleEl.appendChild(h3);
          }

          if (article.content) {
            if (Array.isArray(article.content)) {
              article.content.forEach(item => {
                if (item.type === 'paragraph') {
                  const p = document.createElement('p');
                  p.textContent = item.text;
                  articleEl.appendChild(p);
                } else if (item.type === 'list') {
                  const list = document.createElement('ul');
                  item.items.forEach(listItem => {
                    const li = document.createElement('li');
                    li.textContent = listItem;
                    list.appendChild(li);
                  });
                  articleEl.appendChild(list);
                }
              });
            } else {
              const p = document.createElement('p');
              p.textContent = article.content;
              articleEl.appendChild(p);
            }
          }

          sectionEl.appendChild(articleEl);
        });
      } else if (section.content) {
        if (Array.isArray(section.content)) {
          section.content.forEach(item => {
            if (item.type === 'paragraph') {
              const p = document.createElement('p');
              p.textContent = item.text;
              sectionEl.appendChild(p);
            } else if (item.type === 'list') {
              const list = document.createElement(item.ordered ? 'ol' : 'ul');
              item.items.forEach(listItem => {
                const li = document.createElement('li');
                li.textContent = listItem;
                list.appendChild(li);
              });
              sectionEl.appendChild(list);
            }
          });
        } else {
          const p = document.createElement('p');
          p.textContent = section.content;
          sectionEl.appendChild(p);
        }
      }

      mainContent.appendChild(sectionEl);
    });
  }

  return true;
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    // Toggle menu visibility
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = navMenu.contains(event.target) || mobileToggle.contains(event.target);
      
      if (!isClickInside && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    });
  }

  // Load page data
  const pageDataAttr = document.body.getAttribute('data-page');
  if (pageDataAttr) {
    fetchPageData(pageDataAttr).then(data => {
      if (data) {
        renderPageContent(data);
      }
    });
  }

  // Form submission handler (prevents default submission)
  const contactForms = document.querySelectorAll('.contact-form');
  contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const email = formData.get('email');
      const subject = encodeURIComponent(formData.get('subject'));
      const message = encodeURIComponent(formData.get('message'));
      
      // Redirect to email
      window.location.href = `mailto:${email}?subject=${subject}&body=${message}`;
      
      // Reset form
      form.reset();
    });
  });
});
