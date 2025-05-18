
  pageFunctions.addFunction('cursorMask', function() {
    // Check if device has fine pointer support
    if (window.matchMedia('(pointer: fine)').matches) {
      const containers = document.querySelectorAll('.cursor_content_wrap');
      containers.forEach(container => {
        const mask = container.querySelector('.cursor_mask');
        if (!mask) return;

        // Calculate offset (2rem in pixels)
        const htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const offset = 10 * htmlFontSize;

        // Initial state - no center position set
        gsap.set(mask, {
          opacity: 0
        });

        function handleMouseMove(e) {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left - offset;
          const y = e.clientY - rect.top - offset;

          gsap.to(mask, {
            maskPosition: `${x}px ${y}px`,
            duration: 0.6,
            ease: 'power2.out'
          });
        }

        function handleMouseEnter(e) {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left - offset;
          const y = e.clientY - rect.top - offset;

          // Set position instantly to mouse entry point
          gsap.set(mask, {
            maskPosition: `${x}px ${y}px`,
            opacity: 0
          });

          // Then animate in
          gsap.to(mask, {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
          });
        }

        function handleMouseLeave(e) {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left - offset;
          const y = e.clientY - rect.top - offset;

          // Animate out at the current mouse position
          gsap.to(mask, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            maskPosition: `${x}px ${y}px`
          });
        }

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
      });
    } else {
      // For devices without fine pointer support
      const masks = document.querySelectorAll('.cursor_mask');
      masks.forEach(mask => {
        gsap.set(mask, {
          opacity: 1,
          maskPosition: 'center center'
        });
      });
    }
  });
