// Work case images data
const workData = {
  douyin: {
    title: "抖音/小红书案例",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%9B%BE%E5%83%8F2026-4-29%2022.41-nsXNQ15tSXCT5BZQ5DGm6twgaX1z6I.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%9B%BE%E5%83%8F2026-4-29%2022.47-rPkMPkgFbOuqc8ih1aDpTKVD9xhWo7.jpeg"
    ]
  },
  ecommerce: {
    title: "电商详情页/海报",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%9B%BE%E5%83%8F2026-4-29%2022.39-VgCneSSMuLUA083pErGkiRNb8dh75m.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%9B%BE%E5%83%8F2026-4-29%2022.35-Fm6vTfQf6YccGGZwY04LF0QA2yLKN3.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%9B%BE%E5%83%8F2026-4-29%2022.34-cCufWZCn6KomYEWzg1cXw7lTRCVpGd.jpeg"
    ]
  },
  wechat: {
    title: "公众号/网页设计",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%9B%BE%E5%83%8F2026-4-29%2022.43-ARreEyjZTm3U0rEqvU3eilekQ55DeZ.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%9B%BE%E5%83%8F2026-4-29%2022.45%20%281%29-M7CyFWIAhyhW4D0AafbtZaErNvUDd4.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%9B%BE%E5%83%8F2026-4-29%2022.45-bLisbr5xCVbW5mxFMwqeuJy0IjtmpT.jpeg"
    ]
  },
  miniprogram: {
    title: "小程序策划",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%9B%BE%E5%83%8F2026-4-29%2022.44-MejFikUe3CWLMU1v99ieyrw1ZN48jg.jpeg"
    ]
  }
};

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalImages = document.getElementById('modalImages');
const modalOverlay = document.querySelector('.modal-overlay');
const navItems = document.querySelectorAll('.nav-item');
const workCards = document.querySelectorAll('.work-card');
const sections = document.querySelectorAll('.section');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  mobileMenuBtn.querySelector('.menu-icon').classList.toggle('hidden');
  mobileMenuBtn.querySelector('.close-icon').classList.toggle('hidden');
});

// Navigation
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const sectionId = item.dataset.section;
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.querySelector('.menu-icon').classList.remove('hidden');
      mobileMenuBtn.querySelector('.close-icon').classList.add('hidden');
    }
  });
});

// Active section detection on scroll
function updateActiveSection() {
  let currentSection = 'home';
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom > 150) {
      currentSection = section.id;
    }
  });

  navItems.forEach(item => {
    if (item.dataset.section === currentSection) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateActiveSection);
updateActiveSection();

// Work Cards - Open Modal
workCards.forEach(card => {
  card.addEventListener('click', () => {
    const workKey = card.dataset.work;
    const work = workData[workKey];
    
    if (work) {
      modalTitle.textContent = `[ ${work.title}案例 ]`;
      modalImages.innerHTML = work.images.map((img, index) => 
        `<img src="${img}" alt="${work.title} ${index + 1}">`
      ).join('');
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close Modal
function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Contact Form (prevent default for demo)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('感谢您的留言！我会尽快回复您。');
  contactForm.reset();
});

// Generate pixel footer decorations
function generatePixelFooter() {
  const pixelFooter = document.querySelector('.pixel-footer');
  if (pixelFooter) {
    let html = '';
    for (let i = 0; i < 20; i++) {
      const colorClass = i % 3 === 0 ? 'bg-primary' : (i % 3 === 1 ? 'bg-secondary' : 'bg-accent');
      html += `<span class="pixel small ${colorClass}"></span>`;
    }
    pixelFooter.innerHTML = html;
  }
}

// Add small pixel class
const style = document.createElement('style');
style.textContent = `
  .pixel.small {
    width: 8px;
    height: 8px;
  }
  .pixel-footer {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 48px;
  }
`;
document.head.appendChild(style);

generatePixelFooter();
