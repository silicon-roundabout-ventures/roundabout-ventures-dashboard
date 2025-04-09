"use strict";
exports.id = "component---src-pages-about-tsx";
exports.ids = ["component---src-pages-about-tsx"];
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

/***/ "./src/pages/about.tsx?export=default":
/*!********************************************!*\
  !*** ./src/pages/about.tsx?export=default ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_ParticleBackground__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/ParticleBackground */ "./src/components/ParticleBackground.tsx");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");


const About = () => {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "min-h-screen pt-20 pb-16"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components_ParticleBackground__WEBPACK_IMPORTED_MODULE_0__["default"], null), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "container mx-auto px-4"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "max-w-4xl mx-auto"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "mb-12 text-center"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("h1", {
    className: "text-4xl font-bold text-white mb-4"
  }, "About Silicon Roundabout Ventures"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
    className: "text-srv-gray"
  }, "We are an early-stage venture capital fund based in London, UK.")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8 mb-10"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
    className: "text-2xl font-bold text-white mb-6"
  }, "Our Mission"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
    className: "text-white/80 mb-6"
  }, "At Silicon Roundabout Ventures, we believe in the power of technology to transform industries and improve lives. Our mission is to identify, invest in, and support the most promising early-stage technology companies that have the potential to make a significant impact."), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
    className: "text-white/80"
  }, "We're passionate about working with founders who are not just building businesses, but are solving real problems and creating meaningful change in the world. Our goal is to be the investor we wish we had when we were building companies.")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
    className: "text-2xl font-bold text-white mb-6"
  }, "Our Approach"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
    className: "space-y-4 text-white/80"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
    className: "flex items-start"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
    className: "text-srv-teal mr-2"
  }, "\u2022"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
    className: "text-white"
  }, "Early-stage focus:"), " We invest at pre-seed and seed stages, typically as the first institutional investor.")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
    className: "flex items-start"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
    className: "text-srv-teal mr-2"
  }, "\u2022"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
    className: "text-white"
  }, "Sector-agnostic:"), " We invest across various sectors, including deep tech, healthtech, fintech, and more.")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
    className: "flex items-start"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
    className: "text-srv-teal mr-2"
  }, "\u2022"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
    className: "text-white"
  }, "Hands-on support:"), " Beyond capital, we provide strategic guidance, network access, and operational support.")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
    className: "flex items-start"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
    className: "text-srv-teal mr-2"
  }, "\u2022"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
    className: "text-white"
  }, "Long-term perspective:"), " We're committed to supporting our portfolio companies for the long haul.")))), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
    className: "text-2xl font-bold text-white mb-6"
  }, "Our Values"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
    className: "space-y-4 text-white/80"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
    className: "flex items-start"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
    className: "text-srv-teal mr-2"
  }, "\u2022"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
    className: "text-white"
  }, "Integrity:"), " We believe in transparency, honesty, and doing what's right, even when it's difficult.")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
    className: "flex items-start"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
    className: "text-srv-teal mr-2"
  }, "\u2022"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
    className: "text-white"
  }, "Collaboration:"), " We work closely with founders, other investors, and ecosystem partners.")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
    className: "flex items-start"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
    className: "text-srv-teal mr-2"
  }, "\u2022"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
    className: "text-white"
  }, "Innovation:"), " We embrace new ideas and approaches, both in our investment strategy and operations.")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
    className: "flex items-start"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
    className: "text-srv-teal mr-2"
  }, "\u2022"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
    className: "text-white"
  }, "Diversity:"), " We value diverse perspectives and are committed to building an inclusive ecosystem."))))), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
    className: "text-2xl font-bold text-white mb-6"
  }, "Our Team"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6"
  }, [1, 2, 3].map(i => (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    key: i,
    className: "text-center"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "bg-srv-blue/20 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
    className: "text-white text-5xl"
  }, "\uD83D\uDC64")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
    className: "text-xl font-bold text-white"
  }, "Team Member ", i), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
    className: "text-srv-teal"
  }, "Position"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
    className: "text-white/80 mt-2"
  }, "Brief bio about the team member and their background."))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (About);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-about-tsx.js.map