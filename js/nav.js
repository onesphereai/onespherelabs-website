document.addEventListener('DOMContentLoaded', function () {
  var dropdown = document.querySelector('.nav__item--dropdown');
  var trigger = document.getElementById('products-trigger');
  var dropdownMenu = dropdown ? dropdown.querySelector('.nav__dropdown') : null;
  var hamburger = document.querySelector('.nav__hamburger');
  var menu = document.querySelector('.nav__menu');
  var overlay = document.querySelector('.nav__overlay');

  // Dropdown toggle
  function openDropdown() {
    if (!dropdown) return;
    dropdown.setAttribute('data-open', 'true');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    if (!dropdown) return;
    dropdown.setAttribute('data-open', 'false');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown() {
    var isOpen = dropdown && dropdown.getAttribute('data-open') === 'true';
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  if (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      toggleDropdown();
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      }
      if (e.key === 'Escape') {
        closeDropdown();
        trigger.focus();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openDropdown();
        var firstItem = dropdownMenu ? dropdownMenu.querySelector('a') : null;
        if (firstItem) firstItem.focus();
      }
    });
  }

  // Arrow key navigation in dropdown
  if (dropdownMenu) {
    dropdownMenu.addEventListener('keydown', function (e) {
      var items = Array.from(dropdownMenu.querySelectorAll('a'));
      var current = document.activeElement;
      var idx = items.indexOf(current);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        var next = items[idx + 1] || items[0];
        next.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        var prev = items[idx - 1] || items[items.length - 1];
        prev.focus();
      }
      if (e.key === 'Escape') {
        closeDropdown();
        if (trigger) trigger.focus();
      }
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', function (e) {
    if (dropdown && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Mobile hamburger
  function openMobileMenu() {
    if (menu) menu.setAttribute('data-open', 'true');
    if (overlay) overlay.setAttribute('data-open', 'true');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (menu) menu.setAttribute('data-open', 'false');
    if (overlay) overlay.setAttribute('data-open', 'false');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeDropdown();
    }
  });

  // Active link detection
  var currentPath = window.location.pathname;
  var navLinks = document.querySelectorAll('.nav__link, .nav__dropdown-item');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^\//, ''))) {
      link.classList.add('nav__link--active');
    }
    if (href === '/' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
      link.classList.add('nav__link--active');
    }
  });
});
