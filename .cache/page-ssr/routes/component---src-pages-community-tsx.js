"use strict";
exports.id = "component---src-pages-community-tsx";
exports.ids = ["component---src-pages-community-tsx"];
exports.modules = {

/***/ "./src/components/ClientOnly.tsx":
/*!***************************************!*\
  !*** ./src/components/ClientOnly.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");


/**
 * ClientOnly component - only renders its children on the client side
 * Use this to wrap components that rely on browser APIs
 */
const ClientOnly = ({
  children,
  fallback = null
}) => {
  const {
    0: hasMounted,
    1: setHasMounted
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, fallback);
  }
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientOnly);

/***/ }),

/***/ "./src/components/ParticleBackground.tsx":
/*!***********************************************!*\
  !*** ./src/components/ParticleBackground.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ClientOnly__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClientOnly */ "./src/components/ClientOnly.tsx");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");



// The actual particle background implementation
const ParticleBackgroundContent = () => {
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Check if we're in a browser environment
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reset particles when resizing
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth / 10, 120);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.1,
          // Smaller particles for more subtle effect
          speedX: (Math.random() - 0.5) * 0.9,
          speedY: (Math.random() - 0.5) * 0.9,
          color: '#ffffff',
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each particle
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Check boundaries and reverse direction if needed
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        // Connect nearby particles with lines
        connectParticles(particle, i);
      });
    };

    // Connect particles with lines if they're close enough
    const connectParticles = (particle, index) => {
      for (let j = index + 1; j < particles.length; j++) {
        const otherParticle = particles[j];
        const distance = Math.sqrt(Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2));
        if (distance < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(167, 167, 167, ${0.4 * (1 - distance / 130)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    };

    // Animation loop
    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize and start the animation
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "particles-container"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("canvas", {
    ref: canvasRef,
    className: "absolute inset-0",
    style: {
      opacity: 0.8,
      zIndex: 1
    }
  }));
};

// Main component that uses ClientOnly to prevent SSR issues
const ParticleBackground = () => {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ClientOnly__WEBPACK_IMPORTED_MODULE_1__["default"], {
    fallback: (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "particles-container"
    })
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(ParticleBackgroundContent, null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ParticleBackground);

/***/ }),

/***/ "./src/pages/community.tsx?export=default":
/*!************************************************!*\
  !*** ./src/pages/community.tsx?export=default ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_ParticleBackground__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/ParticleBackground */ "./src/components/ParticleBackground.tsx");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");


const Community = () => {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "min-h-screen pt-20 pb-16"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components_ParticleBackground__WEBPACK_IMPORTED_MODULE_0__["default"], null), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "container mx-auto px-4 z-10 relative"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "mb-12 text-center"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("h1", {
    className: "text-4xl font-bold text-white mb-4"
  }, "Community"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
    className: "text-lg text-srv-gray max-w-2xl mx-auto"
  }, "Join our vibrant community of founders, engineers, and investors passionate about deep tech and innovation.")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "max-w-5xl mx-auto"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-12"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
    className: "text-2xl font-bold text-white mb-6"
  }, "<Upcoming Events/>"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
    className: "text-white mb-6"
  }, "Connect with like-minded innovators and industry leaders at our upcoming events."), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "h-[600px] overflow-hidden rounded-lg"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("iframe", {
    src: "https://lu.ma/embed-checkout/evt-IDeEvnIYsqkgKkL",
    width: "100%",
    height: "100%",
    frameBorder: "0",
    style: {
      borderRadius: '8px',
      border: 'none'
    },
    allowFullScreen: true,
    title: "Silicon Roundabout Events"
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Community);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-community-tsx.js.map