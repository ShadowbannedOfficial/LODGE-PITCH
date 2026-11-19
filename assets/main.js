(function () {
  var header = document.getElementById("header");
  var progress = document.getElementById("progress");
  var timeline = document.getElementById("timeline");

  var reveals = document.querySelectorAll(".reveal, .img-reveal, .clip-reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
    if (timeline) {
      var tIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              timeline.classList.add("is-in");
              tIo.unobserve(timeline);
            }
          });
        },
        { threshold: 0.35 }
      );
      tIo.observe(timeline);
    }
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
    if (timeline) timeline.classList.add("is-in");
  }

  function onScroll() {
    var scrolled = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("is-scrolled", scrolled > 40);
    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (scrolled / max) * 100 : 0;
      progress.style.width = pct + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
