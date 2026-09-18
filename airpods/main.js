// ==========================================================================
// APPLE AIRPODS PRO 3 - CLEAN SCROLL CONTROLLER
// 100% Crisp Original Image, Smooth Rising & Floating Reveal Motion
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initScrollytelling();
  initTiltCards();
});

/* --------------------------------------------------------------------------
   1. Scrollytelling: 스크롤에 따라 투명했던 에어팟이 위로 솟아오르며 등장
   -------------------------------------------------------------------------- */
function initScrollytelling() {
  const container = document.getElementById('scrolly');
  const unitSingle = document.getElementById('unitSingle');
  const unitDual = document.getElementById('unitDual');
  const unitCase = document.getElementById('unitCase');

  const story1 = document.getElementById('story1');
  const story2 = document.getElementById('story2');
  const story3 = document.getElementById('story3');

  const progressFill = document.getElementById('progressFill');
  const stepDots = document.querySelectorAll('.step-dot');
  const waveGlow = document.getElementById('waveGlow');

  let currentProgress = 0;
  let targetProgress = 0;

  function calculateProgress() {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const currentScroll = -rect.top;

    let p = currentScroll / totalScrollable;
    p = Math.max(0, Math.min(1, p));
    targetProgress = p;
  }

  window.addEventListener('scroll', calculateProgress, { passive: true });
  window.addEventListener('resize', calculateProgress);

  // Smooth LERP animation loop (60fps)
  function renderLoop() {
    // Smooth deceleration
    currentProgress += (targetProgress - currentProgress) * 0.12;
    const p = currentProgress;

    // Progress bar fill
    if (progressFill) {
      progressFill.style.width = `${p * 100}%`;
    }

    // Phase 1: Unit Single (0.00 ~ 0.33)
    if (p <= 0.35) {
      const localP = p / 0.33;
      const clampedP = Math.max(0, Math.min(1, localP));

      // 투명도 0 -> 1, 아래(120px)에서 위(0px)로 플로팅 상승
      const yOffset = (1 - clampedP) * 120;
      const opacity = Math.min(1, clampedP * 1.3);
      const scale = 0.88 + clampedP * 0.12;

      unitSingle.style.opacity = opacity;
      unitSingle.style.transform = `translate(-50%, calc(-50% + ${yOffset}px)) scale(${scale})`;

      unitDual.style.opacity = 0;
      unitCase.style.opacity = 0;

      story1.classList.add('active');
      story2.classList.remove('active');
      story3.classList.remove('active');

      updateStepDots(0);
      if (waveGlow) waveGlow.style.opacity = 0.4 + clampedP * 0.4;
    }
    // Phase 2: Unit Dual (0.35 ~ 0.68)
    else if (p > 0.35 && p <= 0.68) {
      const localP = (p - 0.35) / 0.32;
      const clampedP = Math.max(0, Math.min(1, localP));

      // 이전 유닛은 위로 부드럽게 퇴장
      unitSingle.style.opacity = Math.max(0, 1 - clampedP * 2.5);
      unitSingle.style.transform = `translate(-50%, calc(-50% - ${clampedP * 60}px)) scale(0.95)`;

      // 새 유닛이 아래(120px)에서 위(0px)로 솟아오름
      const yOffset = (1 - clampedP) * 120;
      const opacity = Math.min(1, clampedP * 1.3);
      const scale = 0.88 + clampedP * 0.12;

      unitDual.style.opacity = opacity;
      unitDual.style.transform = `translate(-50%, calc(-50% + ${yOffset}px)) scale(${scale})`;

      unitCase.style.opacity = 0;

      story1.classList.remove('active');
      story2.classList.add('active');
      story3.classList.remove('active');

      updateStepDots(1);
    }
    // Phase 3: Case + Buds (0.68 ~ 1.00)
    else {
      const localP = (p - 0.68) / 0.32;
      const clampedP = Math.max(0, Math.min(1, localP));

      unitDual.style.opacity = Math.max(0, 1 - clampedP * 2.5);
      unitDual.style.transform = `translate(-50%, calc(-50% - ${clampedP * 60}px)) scale(0.95)`;

      const yOffset = (1 - clampedP) * 120;
      const opacity = Math.min(1, clampedP * 1.3);
      const scale = 0.88 + clampedP * 0.12;

      unitCase.style.opacity = opacity;
      unitCase.style.transform = `translate(-50%, calc(-50% + ${yOffset}px)) scale(${scale})`;

      unitSingle.style.opacity = 0;

      story1.classList.remove('active');
      story2.classList.remove('active');
      story3.classList.add('active');

      updateStepDots(2);
    }

    requestAnimationFrame(renderLoop);
  }

  function updateStepDots(activeIndex) {
    stepDots.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Click on dots to jump smoothly
  stepDots.forEach((dot, idx) => {
    dot.style.cursor = 'pointer';
    dot.addEventListener('click', () => {
      if (!container) return;
      const totalScrollable = container.offsetHeight - window.innerHeight;
      const targets = [0.15, 0.5, 0.85];
      const targetY = container.offsetTop + (totalScrollable * targets[idx]);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

  calculateProgress();
  renderLoop();
}

/* --------------------------------------------------------------------------
   2. Interactive ANC Simulator
   -------------------------------------------------------------------------- */
let isANCActive = false;

function toggleANC() {
  const consoleBox = document.querySelector('.anc-console-box');
  const btn = document.getElementById('ancToggleBtn');
  const statusText = document.getElementById('ancStatusText');

  isANCActive = !isANCActive;

  if (isANCActive) {
    consoleBox.classList.add('anc-active');
    btn.innerHTML = `<span class="mode-icon">✓</span><span class="mode-text">노이즈 캔슬링 켜짐 (완벽한 정적)</span>`;
    statusText.innerText = "노이즈 캔슬링: ON (초당 96,000회 역위상 소음 상쇄 활성화)";
  } else {
    consoleBox.classList.remove('anc-active');
    btn.innerHTML = `<span class="mode-icon">🎧</span><span class="mode-text">노이즈 캔슬링 활성화</span>`;
    statusText.innerText = "노이즈 캔슬링: OFF (주변 소음 유입 중)";
  }
}

/* --------------------------------------------------------------------------
   3. Laser Engraving Simulator
   -------------------------------------------------------------------------- */
function updateEngraving(text) {
  const output = document.getElementById('engravedOutput');
  const modalField = document.getElementById('modalEngravingField');
  const cleaned = text.trim();

  if (cleaned.length === 0) {
    output.innerText = "APPLE";
    if (modalField) modalField.value = "기본 (각인 없음)";
  } else {
    output.innerText = cleaned;
    if (modalField) modalField.value = cleaned;
  }
}

function addPreset(emoji) {
  const input = document.getElementById('engraveInput');
  if (input.value.length < 10) {
    input.value += emoji;
    updateEngraving(input.value);
  }
}

/* --------------------------------------------------------------------------
   4. Bento Card Hover Motion
   -------------------------------------------------------------------------- */
function initTiltCards() {
  // subtle hover
}

/* --------------------------------------------------------------------------
   5. Apple Checkout Modal & Order Processing
   -------------------------------------------------------------------------- */
const appleModal = document.getElementById('appleModal');
const orderForm = document.getElementById('orderForm');
const orderCompleteBlock = document.getElementById('orderCompleteBlock');

function openOrderModal() {
  appleModal.classList.add('active');
  orderForm.style.display = 'block';
  orderCompleteBlock.classList.remove('active');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  appleModal.classList.remove('active');
  document.body.style.overflow = '';
}

function submitAppleOrder(e) {
  e.preventDefault();
  const randNum = 'W' + Math.floor(100000000 + Math.random() * 900000000);
  document.getElementById('appleOrderNum').innerText = randNum;

  orderForm.style.display = 'none';
  orderCompleteBlock.classList.add('active');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeOrderModal();
  }
});
