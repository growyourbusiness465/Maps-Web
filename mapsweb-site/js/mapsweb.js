/* MAPSWEB - INTERACTIONS */
document.addEventListener("DOMContentLoaded", function () {
  var typingElement = document.querySelector(".typing");
  if (typingElement) {
    var typingMessages = [
      "plus de leads grâce à une fiche Google optimisée",
      "plus de clients en magasin et en ligne",
      "la première position sur Google Maps",
      "une croissance durable et mesurable",
    ];
    var messageIndex = 0;
    var characterIndex = 0;
    var isDeleting = false;
    var typingSpeed = 55;
    var deletingSpeed = 30;
    var pauseAfterTyping = 1800;
    var pauseAfterDeleting = 500;

    function typeNextCharacter() {
      var currentMessage = typingMessages[messageIndex];

      if (isDeleting) {
        typingElement.textContent = currentMessage.substring(
          0,
          characterIndex--,
        );
        if (characterIndex < 0) {
          isDeleting = false;
          messageIndex = (messageIndex + 1) % typingMessages.length;
          setTimeout(typeNextCharacter, pauseAfterDeleting);
          return;
        }
        setTimeout(typeNextCharacter, deletingSpeed);
        return;
      }

      typingElement.textContent = currentMessage.substring(0, characterIndex++);
      if (characterIndex > currentMessage.length) {
        isDeleting = true;
        setTimeout(typeNextCharacter, pauseAfterTyping);
        return;
      }
      setTimeout(typeNextCharacter, typingSpeed);
    }

    typingElement.textContent = "";
    setTimeout(typeNextCharacter, 900);
  }

  var counterElements = document.querySelectorAll(
    ".counter-number[data-target]",
  );
  if (counterElements.length && "IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          var counter = entry.target;
          var target = parseInt(counter.getAttribute("data-target"), 10);
          var animationDuration = 1800;
          var animationStart;

          function animateCounter(timestamp) {
            if (!animationStart) animationStart = timestamp;
            var progress = Math.min(
              (timestamp - animationStart) / animationDuration,
              1,
            );
            var value = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
            counter.textContent = value + "+";

            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            } else {
              counter.textContent = target + "+";
            }
          }

          requestAnimationFrame(animateCounter);
          counterObserver.unobserve(counter);
        });
      },
      { threshold: 0.3 },
    );

    counterElements.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = this.getAttribute("href");
      if (targetId.length < 2) return;

      var target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        var targetTop =
          target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    });
  });

  document.querySelectorAll(".faq-item").forEach(function (faqItem) {
    var question = faqItem.querySelector(".faq-q");
    if (!question) return;

    question.addEventListener("click", function () {
      var wasOpen = faqItem.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        openItem.classList.remove("open");
      });
      if (!wasOpen) faqItem.classList.add("open");
    });
  });

  var cookieBanner = document.getElementById("mw-cookie");
  var cookieAcceptButton = document.getElementById("mw-cookie-accept");
  if (cookieBanner && localStorage.getItem("mw_cookie") === "ok") {
    cookieBanner.style.display = "none";
  }
  if (cookieAcceptButton) {
    cookieAcceptButton.addEventListener("click", function () {
      localStorage.setItem("mw_cookie", "ok");
      if (cookieBanner) {
        cookieBanner.style.transition = "opacity .4s";
        cookieBanner.style.opacity = "0";
      }
      setTimeout(function () {
        if (cookieBanner) cookieBanner.remove();
      }, 400);
    });
  }

  var backToTopButton = document.getElementById("mw-back-to-top");
  if (backToTopButton) {
    var updateBackToTopVisibility = function () {
      backToTopButton.classList.toggle("mw-visible", window.pageYOffset > 400);
    };
    window.addEventListener("scroll", updateBackToTopVisibility, {
      passive: true,
    });
    updateBackToTopVisibility();
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
