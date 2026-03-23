const fadeItems = document.querySelectorAll('.fade-item');

fadeItems.forEach((item, index) => {
  setTimeout(() => {
    item.classList.add('show');
  }, index * 300);
});

const aboutSection = document.querySelector('#about');
const bio = document.querySelector('.bio');
const skillItems = document.querySelectorAll('.skill-item');

let aboutStarted = false;

function startTypewriter(element, speed = 18) {
  const text = element.dataset.text;
  element.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

function revealSkills() {
  skillItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('show');
    }, index * 220);
  });
}

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !aboutStarted) {
      aboutStarted = true;

      startTypewriter(bio, 18);

      setTimeout(() => {
        revealSkills();
      }, 400);

      aboutObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.35
});

aboutObserver.observe(aboutSection);

const portfolioItems = document.querySelectorAll('.portfolio-item');
const previewText = document.querySelector('#projectPreview .project-preview-text');
const revealItems = document.querySelectorAll('.reveal-item');

portfolioItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    previewText.textContent = item.dataset.description;
    previewText.classList.add('show');
  });

  item.addEventListener('mouseleave', () => {
    previewText.classList.remove('show');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 90}ms`;
  revealObserver.observe(item);
});

const links = document.querySelectorAll('.portfolio-item');
const transition = document.querySelector('.page-transition');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const url = this.getAttribute('href');

    transition.classList.add('active');

    setTimeout(() => {
      window.location.href = url;
    }, 500); // mesmo tempo do CSS
  });
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});