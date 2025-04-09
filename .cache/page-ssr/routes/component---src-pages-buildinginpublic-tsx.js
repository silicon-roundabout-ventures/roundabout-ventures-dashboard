"use strict";
exports.id = "component---src-pages-buildinginpublic-tsx";
exports.ids = ["component---src-pages-buildinginpublic-tsx"];
exports.modules = {

/***/ "./node_modules/class-variance-authority/dist/index.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/class-variance-authority/dist/index.mjs ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cva: () => (/* binding */ cva),
/* harmony export */   cx: () => (/* binding */ cx)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/**
 * Copyright 2022 Joe Bell. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */ 
const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx__WEBPACK_IMPORTED_MODULE_0__.clsx;
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };



/***/ }),

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

/***/ "./src/components/ui/button.tsx":
/*!**************************************!*\
  !*** ./src/components/ui/button.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button),
/* harmony export */   buttonVariants: () => (/* binding */ buttonVariants)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-slot */ "./node_modules/@radix-ui/react-slot/dist/index.mjs");
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-variance-authority */ "./node_modules/class-variance-authority/dist/index.mjs");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/utils */ "./src/lib/utils.ts");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");






const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__.cva)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  className,
  variant,
  size,
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_4__.Slot : "button";
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_5__.jsx)(Comp, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(buttonVariants({
      variant,
      size,
      className
    })),
    ref: ref
  }, props));
});
Button.displayName = "Button";


/***/ }),

/***/ "./src/pages/buildinginpublic.tsx?export=default":
/*!*******************************************************!*\
  !*** ./src/pages/buildinginpublic.tsx?export=default ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_ParticleBackground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/ParticleBackground */ "./src/components/ParticleBackground.tsx");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/button */ "./src/components/ui/button.tsx");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.development.esm.js");




const BuildingInPublic = () => {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Create Substack feed widget config
    window.SubstackFeedWidget = {
      substackUrl: "blog.siliconroundabout.ventures",
      posts: 8,
      layout: "right",
      colors: {
        primary: "#FFFFFF",
        secondary: "#DBDBDB",
        background: "#000000"
      }
    };

    // Load the Substack API script
    const script = document.createElement('script');
    script.src = 'https://substackapi.com/embeds/feed.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
      delete window.SubstackFeedWidget;
    };
  }, []);
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "min-h-screen pt-20 pb-16"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_ParticleBackground__WEBPACK_IMPORTED_MODULE_1__["default"], null), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "container mx-auto px-4 z-10 relative"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "mb-12 text-center"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("h1", {
    className: "text-4xl font-bold text-white mb-4"
  }, "Building in Public"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
    className: "text-lg text-srv-gray max-w-2xl mx-auto"
  }, "Sharing our journey as we build Silicon Roundabout Ventures.")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "max-w-5xl mx-auto"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "bg-black/70 backdrop-blur-sm border border-white/10 p-8 rounded-lg mb-12"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
    className: "text-xl text-white mb-6 text-center"
  }, "Every month Silicon Roundabout Ventures GP, Francesco Perticarari, sends this public list the (almost identical) update sent to our LPs. Exclusive perks, information, and sensitive information may need to be redacted, but as much as possible is shared publicly."), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "italic text-center border-l-4 border-srv-yellow pl-4 py-2 my-8 text-white"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
    className: "mb-2"
  }, "\"Francesco is blazing the trail, so that others can run along the path.\""), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
    className: "text-srv-gray"
  }, "\u2500 Dave Neumann, Molten Ventures FoF Team & Silicon Roundabout Ventures LP")), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "text-center mb-8"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
    className: "text-white mb-4"
  }, "Get the next report in your inbox:"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
    href: "https://blog.siliconroundabout.ventures/subscribe",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "inline-block"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "default",
    size: "lg",
    className: "bg-srv-yellow text-black hover:bg-srv-yellow/80"
  }, "New Articles Release Signup"))), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
    className: "text-2xl font-bold text-white mb-6 text-center"
  }, "<Latest Posts/>"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    id: "substack-feed-embed",
    className: "h-[600px] overflow-auto mb-8"
  }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "text-center mt-12"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
    className: "text-white mb-6"
  }, "Check out more articles:"), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
    href: "https://blog.siliconroundabout.ventures",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "inline-block"
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "outline",
    size: "lg",
    className: "border-srv-yellow text-srv-yellow hover:bg-srv-yellow hover:text-black"
  }, "View All Posts")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BuildingInPublic);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-buildinginpublic-tsx.js.map