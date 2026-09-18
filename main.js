// ==========================================================================
// TESLA CYBERTRUCK INTERACTIVE CONTROLLER
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMetricCounters();
  initGallerySlider();
  initLightbox();
});

/* --------------------------------------------------------------------------
   Navbar Scroll Effect
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   Metric Counter Animation (Intersection Observer)
   -------------------------------------------------------------------------- */
function initMetricCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const duration = 1800; // ms
          const startTime = performance.now();

          function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            counter.innerText = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal).toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              counter.innerText = isDecimal ? target.toFixed(1) : target.toLocaleString();
            }
          }

          requestAnimationFrame(updateNumber);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsBar = document.querySelector('.metrics-bar');
  if (metricsBar) {
    observer.observe(metricsBar);
  }
}

/* --------------------------------------------------------------------------
   Gallery Showcase Controls
   -------------------------------------------------------------------------- */
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.gallery-slide');
const tabButtons = document.querySelectorAll('.tab-btn');
const thumbCards = document.querySelectorAll('.thumb-card');

function switchSlide(index) {
  currentSlideIndex = index;

  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  tabButtons.forEach((btn, i) => {
    if (i === index) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  thumbCards.forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

function initGallerySlider() {
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      switchSlide(idx);
    });
  });
}

/* --------------------------------------------------------------------------
   Lightbox Modal for Image Zoom
   -------------------------------------------------------------------------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxCaption.innerText = caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function initLightbox() {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeOrderModal();
    }
  });
}

/* --------------------------------------------------------------------------
   Trim Configurator Logic
   -------------------------------------------------------------------------- */
const trimData = {
  rwd: {
    tag: 'RWD SINGLE MOTOR',
    title: '효율과 유틸리티의 완벽한 조화: RWD',
    desc: '도심 주행과 장거리 크루징에 최적화된 후륜구동 모델. 탁월한 에너지 효율성과 사이버트럭의 혁신적 외골격 디자인을 모두 누릴 수 있습니다.',
    img: 'images/tesla1.png',
    accel: '6.7초',
    range: '402 km',
    power: '315 hp',
    towing: '3,400 kg',
    price: '₩ 89,900,000 ~'
  },
  awd: {
    tag: 'AWD DUAL MOTOR',
    title: '모든 조건을 장악하는 듀얼 모터 AWD',
    desc: '두 개의 고성능 전기 모터가 전륜과 후륜을 독립적으로 정밀 제어하여 눈길, 빗길, 오프로드에서도 완벽한 트랙션을 발휘합니다.',
    img: 'images/tesla2.png',
    accel: '4.3초',
    range: '547 km',
    power: '600 hp',
    towing: '4,990 kg',
    price: '₩ 109,900,000 ~'
  },
  beast: {
    tag: 'CYBERBEAST TRI MOTOR',
    title: '지상 최강의 야수: 사이버비스트 (CYBERBEAST)',
    desc: '트라이모터 올-휠 드라이브가 뿜어내는 845마력의 압도적 토크. 슈퍼카를 제압하는 2.7초 제로백으로 트럭의 물리적 한계를 완전히 파괴합니다.',
    img: 'images/tesla3.png',
    accel: '2.7초',
    range: '515 km',
    power: '845 hp',
    towing: '4,990 kg',
    price: '₩ 139,900,000 ~'
  }
};

let currentSelectedTrim = 'awd';

function selectTrim(trimKey) {
  currentSelectedTrim = trimKey;
  const data = trimData[trimKey];

  // Update tabs
  document.querySelectorAll('.trim-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-trim') === trimKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update image with smooth fade
  const imgEl = document.getElementById('trim-image');
  imgEl.style.opacity = '0.3';
  setTimeout(() => {
    imgEl.src = data.img;
    imgEl.style.opacity = '1';
  }, 150);

  // Update text values
  document.getElementById('trim-tag').innerText = data.tag;
  document.getElementById('trim-title').innerText = data.title;
  document.getElementById('trim-description').innerText = data.desc;
  document.getElementById('spec-accel').innerText = data.accel;
  document.getElementById('spec-range').innerText = data.range;
  document.getElementById('spec-power').innerText = data.power;
  document.getElementById('spec-towing').innerText = data.towing;
  document.getElementById('trim-price').innerText = data.price;

  // Sync to modal select if open
  const modalSelect = document.getElementById('modalTrimSelect');
  if (modalSelect) {
    modalSelect.value = trimKey;
  }
}

/* --------------------------------------------------------------------------
   Order Modal & Reservation Form
   -------------------------------------------------------------------------- */
const orderModal = document.getElementById('orderModal');
const reservationForm = document.getElementById('reservationForm');
const orderSuccessMessage = document.getElementById('orderSuccessMessage');

function openOrderModal() {
  const modalSelect = document.getElementById('modalTrimSelect');
  if (modalSelect) {
    modalSelect.value = currentSelectedTrim;
  }
  reservationForm.style.display = 'block';
  orderSuccessMessage.classList.remove('active');
  orderModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openTestDriveModal() {
  openOrderModal();
  document.getElementById('modalTrimHeading').innerText = "사이버트럭 시승 및 상담 신청";
}

function closeOrderModal() {
  orderModal.classList.remove('active');
  document.body.style.overflow = '';
}

function syncTrimSelect(val) {
  selectTrim(val);
}

function handleReservation(event) {
  event.preventDefault();

  // Generate cyber style reservation ID
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `CT-2026-${randomSuffix}`;
  document.getElementById('orderIdText').innerText = orderId;

  // Show success view
  reservationForm.style.display = 'none';
  orderSuccessMessage.classList.add('active');
}
