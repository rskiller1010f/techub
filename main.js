/**
 * The Tech Learn Hub - Main JavaScript
 * Vanilla JS: Mobile menu + Category filtering
 * ===========================================
 */

(function () {
  'use strict';

  // ========== Mobile Navigation Toggle ==========
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('#main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a nav link (for mobile)
    mainNav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ========== Category Filtering (data-category) ==========
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const noResults = document.getElementById('no-results');

  if (filterButtons.length && productCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const category = this.getAttribute('data-category');

        // Update button states (aria-pressed)
        filterButtons.forEach(function (b) {
          b.classList.remove('filter-btn--active');
          b.setAttribute('aria-pressed', b.getAttribute('data-category') === category ? 'true' : 'false');
        });
        this.classList.add('filter-btn--active');
        this.setAttribute('aria-pressed', 'true');

        // Filter products
        let visibleCount = 0;
        productCards.forEach(function (card) {
          const cardCategory = card.getAttribute('data-category');
          const show = category === 'all' || cardCategory === category;

          if (show) {
            card.classList.remove('is-hidden');
            visibleCount++;
          } else {
            card.classList.add('is-hidden');
          }
        });

        // Show/hide no-results message
        if (noResults) {
          noResults.classList.toggle('hidden', visibleCount > 0);
        }
      });
    });
  }
})();
