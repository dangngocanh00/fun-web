var menuToggle = document.querySelector(".menu-toggle");
var mobileMenu = document.getElementById("mobile-menu");
var mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
var openFaqButtons = document.querySelectorAll("[data-open-faq]");
var closeFaqButtons = document.querySelectorAll("[data-close-faq]");
var faqScreen = document.getElementById("faq-screen");
var faqItems = document.querySelectorAll(".faq-item");
var languageToggle = document.querySelector(".language-toggle");
var languageMenu = document.getElementById("language-menu");
var languageOptions = document.querySelectorAll(".language-option");
var typingTarget = document.querySelector(".typing-text");
var typingValue = typingTarget ? typingTarget.querySelector(".typing-text-value") : null;

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (languageToggle && languageMenu) {
  languageToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    var isOpen = languageMenu.classList.toggle("is-open");
    languageToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

mobileMenuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (mobileMenu && menuToggle) {
      mobileMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

languageOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    languageOptions.forEach(function (item) {
      item.classList.remove("is-active");
    });

    option.classList.add("is-active");

    if (languageToggle) {
      var selectedFlag = option.querySelector(".flag");
      var toggleFlag = languageToggle.querySelector(".flag");

      if (selectedFlag && toggleFlag) {
        toggleFlag.className = selectedFlag.className;
      }
    }

    if (languageMenu) {
      languageMenu.classList.remove("is-open");
    }

    if (languageToggle) {
      languageToggle.setAttribute("aria-expanded", "false");
    }
  });
});

openFaqButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (!faqScreen) {
      return;
    }

    faqScreen.classList.add("is-open");
    faqScreen.setAttribute("aria-hidden", "false");
    document.body.classList.add("faq-open");

    if (mobileMenu && menuToggle) {
      mobileMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

closeFaqButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (!faqScreen) {
      return;
    }

    faqScreen.classList.remove("is-open");
    faqScreen.setAttribute("aria-hidden", "true");
    document.body.classList.remove("faq-open");
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && faqScreen && faqScreen.classList.contains("is-open")) {
    faqScreen.classList.remove("is-open");
    faqScreen.setAttribute("aria-hidden", "true");
    document.body.classList.remove("faq-open");
  }

  if (event.key === "Escape" && languageMenu && languageMenu.classList.contains("is-open")) {
    languageMenu.classList.remove("is-open");
    if (languageToggle) {
      languageToggle.setAttribute("aria-expanded", "false");
    }
  }
});

document.addEventListener("click", function (event) {
  if (!languageMenu || !languageToggle) {
    return;
  }

  var clickInsideMenu = languageMenu.contains(event.target);
  var clickToggle = languageToggle.contains(event.target);

  if (!clickInsideMenu && !clickToggle) {
    languageMenu.classList.remove("is-open");
    languageToggle.setAttribute("aria-expanded", "false");
  }
});

faqItems.forEach(function (item) {
  var button = item.querySelector(".faq-question");
  var icon = item.querySelector(".faq-icon");

  if (!button || !icon) {
    return;
  }

  button.addEventListener("click", function () {
    var isOpen = item.classList.toggle("is-open");
    icon.textContent = isOpen ? "-" : "+";
  });
});

if (typingTarget && typingValue) {
  var fullText = typingTarget.getAttribute("data-text") || typingValue.textContent || "";
  var currentIndex = 0;
  var isDeleting = false;

  typingValue.textContent = "";

  function runTypingLoop() {
    if (!isDeleting) {
      currentIndex += 1;
      typingValue.textContent = fullText.slice(0, currentIndex);

      if (currentIndex === fullText.length) {
        isDeleting = true;
        setTimeout(runTypingLoop, 1400);
        return;
      }

      setTimeout(runTypingLoop, 85);
      return;
    }

    currentIndex -= 1;
    typingValue.textContent = fullText.slice(0, currentIndex);

    if (currentIndex === 0) {
      isDeleting = false;
      setTimeout(runTypingLoop, 360);
      return;
    }

    setTimeout(runTypingLoop, 42);
  }

  setTimeout(runTypingLoop, 500);
}
