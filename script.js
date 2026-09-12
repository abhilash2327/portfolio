/**
 * ABHILASH G PORTFOLIO — INTERACTIVITY & RECRUITER INTERACTIONS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Smooth Cursor
  const cursor = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');

  if (cursor && cursorTrail && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = mouseX;
    let trailY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const renderTrail = () => {
      trailX += (mouseX - trailX) * 0.16;
      trailY += (mouseY - trailY) * 0.16;
      cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderTrail);
    };
    requestAnimationFrame(renderTrail);

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .exp-card, .project-card, .skill-matrix-card, .edu-card, .award-featured-box, .cert-item-card, .stacked-skill-card, .stacked-nav-btn, .dot-indicator');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  } else {
    if (cursor) cursor.style.display = 'none';
    if (cursorTrail) cursorTrail.style.display = 'none';
  }

  // 2. Animated Counter for Stats (Supports integers & decimals like 7.96)
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const runCounterAnimation = () => {
    if (animated) return;
    animated = true;

    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      const duration = 1400; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = ease * target;
        
        counter.textContent = currentVal.toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toFixed(decimals);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  // Run on load with a slight organic delay
  setTimeout(runCounterAnimation, 250);

  // 3. Connect / Contact Modal Dialog Handling
  const modal = document.getElementById('bookCallModal');
  const openModalBtns = [
    document.getElementById('openBookCallModal'),
    document.getElementById('footerBookBtn')
  ].filter(Boolean);
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccessMsg = document.getElementById('bookingSuccessMsg');

  const openModal = (e) => {
    if (e) e.preventDefault();
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (bookingForm) bookingForm.style.display = 'flex';
        if (bookingSuccessMsg) bookingSuccessMsg.style.display = 'none';
      }, 400);
    }
  };

  openModalBtns.forEach((btn) => btn.addEventListener('click', openModal));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // 4. Copy to Clipboard Utility
  window.copyToClipboard = (text, buttonElement) => {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = buttonElement.textContent;
      buttonElement.textContent = 'Copied!';
      buttonElement.style.backgroundColor = '#121413';
      buttonElement.style.color = '#fff';
      setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.style.backgroundColor = '';
        buttonElement.style.color = '';
      }, 2000);
    }).catch((err) => {
      console.warn('Clipboard write failed:', err);
    });
  };

  // 5. Direct Message Form Submission Handler
  window.handleBookingSubmit = () => {
    const name = document.getElementById('clientName')?.value || '';
    const email = document.getElementById('clientEmail')?.value || '';
    const topic = document.getElementById('projectType')?.value || '';
    const notes = document.getElementById('projectNotes')?.value || '';

    // Prepare mailto link
    const subject = encodeURIComponent(`Inquiry from Portfolio: ${topic} - ${name}`);
    const body = encodeURIComponent(
      `Hello Abhilash,\n\nName: ${name}\nEmail: ${email}\nDiscussion Topic: ${topic}\n\nMessage:\n${notes}\n\nSent from your portfolio website.`
    );
    const mailtoUrl = `mailto:abhilashg.hdp@gmail.com?subject=${subject}&body=${body}`;

    if (bookingForm && bookingSuccessMsg) {
      bookingForm.style.display = 'none';
      bookingSuccessMsg.style.display = 'block';

      // Open email client
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      setTimeout(closeModal, 3500);
    }
  };

  // 6. Smooth Scroll for Navigation and Anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#') && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 7. Back To Top
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 8. Active Navigation Highlight on Scroll
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 9. 3D Horizontally Swipeable Stacked Card Carousel for Skills
  const initSkillsCarousel = () => {
    const wrapper = document.getElementById('skillsCarousel');
    const stage = document.getElementById('carouselStage');
    const cards = Array.from(document.querySelectorAll('.stacked-skill-card'));
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    const activeNumEl = document.getElementById('carouselActiveNum');
    const dots = Array.from(document.querySelectorAll('#carouselDots .dot-indicator'));

    if (!stage || cards.length === 0) return;

    const totalCards = cards.length;
    let currentIndex = 0;

    // Reset inline styles on cards so CSS classes take full control
    const resetCardStyles = () => {
      cards.forEach((card) => {
        card.style.transform = '';
        card.style.opacity = '';
        card.style.filter = '';
        card.style.transition = '';
      });
    };

    // Render 3D stacked classes and update indicators
    const renderPositions = () => {
      resetCardStyles();

      cards.forEach((card, i) => {
        card.classList.remove('pos-active', 'pos-prev', 'pos-next', 'pos-back');

        let diff = (i - currentIndex) % totalCards;
        while (diff < -1) diff += totalCards;
        while (diff > 2) diff -= totalCards;

        if (diff === 0) {
          card.classList.add('pos-active');
          card.setAttribute('aria-hidden', 'false');
        } else if (diff === -1) {
          card.classList.add('pos-prev');
          card.setAttribute('aria-hidden', 'true');
        } else if (diff === 1) {
          card.classList.add('pos-next');
          card.setAttribute('aria-hidden', 'true');
        } else {
          card.classList.add('pos-back');
          card.setAttribute('aria-hidden', 'true');
        }
      });

      // Update counter badge
      if (activeNumEl) {
        activeNumEl.textContent = String(currentIndex + 1).padStart(2, '0');
      }

      // Update dot indicators
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const goTo = (index) => {
      currentIndex = ((index % totalCards) + totalCards) % totalCards;
      renderPositions();
    };

    const goToPrev = () => goTo(currentIndex - 1);
    const goToNext = () => goTo(currentIndex + 1);

    // Initial render
    renderPositions();

    // Nav button event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToPrev();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToNext();
      });
    }

    // Pagination dots event listeners
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(targetIdx)) goTo(targetIdx);
      });
    });

    // Touch & Pointer Drag Gestures
    let isPointerDown = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let dragDeltaX = 0;
    let dragDeltaY = 0;
    let pointerId = null;
    let hasMovedSignificantly = false;

    // Apply real-time drag translation for tactile physical response
    const applyDragTransforms = (deltaX) => {
      cards.forEach((card, i) => {
        let diff = (i - currentIndex) % totalCards;
        while (diff < -1) diff += totalCards;
        while (diff > 2) diff -= totalCards;

        if (diff === 0) {
          const scale = Math.max(0.88, 1 - Math.abs(deltaX) * 0.00035);
          card.style.transform = `translateX(calc(-50% + ${deltaX}px)) translateZ(0) scale(${scale})`;
        } else if (diff === -1) {
          card.style.transform = `translateX(calc(-50% - clamp(220px, 28vw, 340px) + ${deltaX}px)) translateZ(-85px) scale(0.85)`;
        } else if (diff === 1) {
          card.style.transform = `translateX(calc(-50% + clamp(220px, 28vw, 340px) + ${deltaX}px)) translateZ(-85px) scale(0.85)`;
        }
      });
    };

    const onPointerDown = (e) => {
      if (e.button && e.button !== 0) return;
      isPointerDown = true;
      isDragging = false;
      hasMovedSignificantly = false;
      startX = e.clientX;
      startY = e.clientY;
      dragDeltaX = 0;
      dragDeltaY = 0;
      pointerId = e.pointerId;
    };

    const onPointerMove = (e) => {
      if (!isPointerDown) return;

      dragDeltaX = e.clientX - startX;
      dragDeltaY = e.clientY - startY;

      if (!isDragging) {
        // If vertical scroll intent is dominant, cancel pointer tracking to allow natural page scroll
        if (Math.abs(dragDeltaY) > 15 && Math.abs(dragDeltaY) > Math.abs(dragDeltaX)) {
          isPointerDown = false;
          return;
        }

        // Horizontal threshold to initiate drag
        if (Math.abs(dragDeltaX) > 8) {
          isDragging = true;
          hasMovedSignificantly = true;
          stage.classList.add('is-dragging');
          try {
            stage.setPointerCapture(e.pointerId);
          } catch (err) {}
        }
      }

      if (isDragging) {
        applyDragTransforms(dragDeltaX);
      }
    };

    const onPointerUp = (e) => {
      if (!isPointerDown && !isDragging) return;

      const wasDragging = isDragging;
      const delta = dragDeltaX;

      isPointerDown = false;
      isDragging = false;
      stage.classList.remove('is-dragging');

      if (pointerId !== null) {
        try {
          stage.releasePointerCapture(pointerId);
        } catch (err) {}
        pointerId = null;
      }

      if (wasDragging) {
        const threshold = 45; // Minimum drag distance to flip card
        if (delta < -threshold) {
          goToNext();
        } else if (delta > threshold) {
          goToPrev();
        } else {
          // Snap back if dragged below threshold
          renderPositions();
        }
      }
    };

    stage.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // Prevent click on action links if user actually dragged
    stage.addEventListener('click', (e) => {
      if (hasMovedSignificantly) {
        e.preventDefault();
        e.stopPropagation();
        hasMovedSignificantly = false;
        return;
      }

      // If user simply clicked on an inactive surrounding card, bring it to center
      const clickedCard = e.target.closest('.stacked-skill-card');
      if (!clickedCard) return;

      if (clickedCard.classList.contains('pos-prev')) {
        goToPrev();
      } else if (clickedCard.classList.contains('pos-next')) {
        goToNext();
      }
    }, true);

    // Keyboard navigation when carousel is focused
    if (wrapper) {
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        }
      });
    }
  };

  // Initialize skills carousel
  initSkillsCarousel();
});

