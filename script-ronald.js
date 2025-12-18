// ================================
// NAVIGATION
// ================================
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// ================================
// ACTIVE NAVIGATION ON SCROLL
// ================================
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add("active")
    } else {
      navLink?.classList.remove("active")
    }
  })
}

window.addEventListener("scroll", scrollActive)

// ================================
// SKILL BARS ANIMATION
// ================================
const skillBars = document.querySelectorAll(".skill-progress")

const animateSkills = () => {
  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress")
    const barPosition = bar.getBoundingClientRect().top
    const screenPosition = window.innerHeight

    if (barPosition < screenPosition) {
      bar.style.width = progress + "%"
      bar.classList.add("animate")
    }
  })
}

window.addEventListener("scroll", animateSkills)
window.addEventListener("load", animateSkills)

// ================================
// CONTACT FORM VALIDATION
// ================================
const contactForm = document.getElementById("contactForm")
const formSuccess = document.getElementById("form-success")

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Real-time validation
const inputs = contactForm.querySelectorAll("input, textarea")
inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    validateField(input)
  })

  input.addEventListener("input", () => {
    if (input.classList.contains("error")) {
      validateField(input)
    }
  })
})

function validateField(field) {
  const fieldId = field.id
  const errorElement = document.getElementById(`${fieldId}-error`)
  let isValid = true

  if (field.value.trim() === "") {
    field.classList.add("error")
    errorElement.textContent = "Field ini wajib diisi"
    errorElement.style.display = "block"
    isValid = false
  } else if (fieldId === "email" && !emailRegex.test(field.value)) {
    field.classList.add("error")
    errorElement.textContent = "Format email tidak valid"
    errorElement.style.display = "block"
    isValid = false
  } else {
    field.classList.remove("error")
    errorElement.style.display = "none"
  }

  return isValid
}

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  let isFormValid = true
  inputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false
    }
  })

  if (isFormValid) {
    // Hide form and show success message
    contactForm.style.display = "none"
    formSuccess.classList.add("show")

    // Reset form after 3 seconds
    setTimeout(() => {
      contactForm.reset()
      contactForm.style.display = "block"
      formSuccess.classList.remove("show")
    }, 3000)
  }
})

// ================================
// BACK TO TOP BUTTON
// ================================
const backToTop = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show")
  } else {
    backToTop.classList.remove("show")
  }
})

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ================================
// SMOOTH SCROLL FOR ALL LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ================================
const createCursorTrail = () => {
  const trail = document.createElement("div")
  trail.style.position = "fixed"
  trail.style.width = "8px"
  trail.style.height = "8px"
  trail.style.borderRadius = "50%"
  trail.style.background = "rgba(74, 222, 128, 0.5)"
  trail.style.pointerEvents = "none"
  trail.style.zIndex = "9999"
  trail.style.transition = "all 0.3s ease"
  return trail
}

let trails = []
document.addEventListener("mousemove", (e) => {
  if (window.innerWidth > 968) {
    const trail = createCursorTrail()
    trail.style.left = e.clientX + "px"
    trail.style.top = e.clientY + "px"
    document.body.appendChild(trail)
    trails.push(trail)

    setTimeout(() => {
      trail.style.opacity = "0"
      trail.style.transform = "scale(2)"
    }, 10)

    setTimeout(() => {
      trail.remove()
      trails = trails.filter((t) => t !== trail)
    }, 300)

    if (trails.length > 10) {
      const oldTrail = trails.shift()
      oldTrail?.remove()
    }
  }
})

// ================================
// PAGE LOAD ANIMATION
// ================================
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

console.log("Website Portfolio Ronald Parsaulian Simanjuntak loaded successfully!")
