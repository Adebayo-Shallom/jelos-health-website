(function () {
  "use strict";

  var COMPANY_EMAIL = "theguardianhealth@gmail.com";
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/" + COMPANY_EMAIL;

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Highlight the current section in the nav
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a[href^='#']:not(.btn)"));
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && byId[entry.target.id]) {
          links.forEach(function (a) { a.classList.remove("is-active"); });
          byId[entry.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // Contact form
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var button = form.querySelector("button[type='submit']");
  var next = form.querySelector("input[name='_next']");
  if (next) next.value = window.location.origin + "/thank-you.html";

  function setStatus(kind, html) {
    status.className = "form__status" + (kind ? " is-" + kind : "");
    status.innerHTML = html;
  }

  function clearErrors() {
    Array.prototype.forEach.call(form.querySelectorAll(".field"), function (f) {
      f.classList.remove("has-error");
      var msg = f.querySelector(".field__error");
      if (msg) msg.remove();
    });
  }

  function showError(input, text) {
    var field = input.closest(".field");
    field.classList.add("has-error");
    var msg = document.createElement("span");
    msg.className = "field__error";
    msg.textContent = text;
    field.appendChild(msg);
  }

  function validate() {
    clearErrors();
    var ok = true;
    var first = null;
    var checks = [
      ["name", "Please enter your name."],
      ["email", "Please enter a valid email address."],
      ["request_type", "Please choose the nature of your request."],
      ["message", "Please write a short message."]
    ];
    checks.forEach(function (c) {
      var input = form.elements[c[0]];
      var value = (input.value || "").trim();
      var bad = !value || (c[0] === "email" && !input.checkValidity());
      if (bad) {
        ok = false;
        showError(input, c[1]);
        if (!first) first = input;
      }
    });
    if (first) first.focus();
    return ok;
  }

  function mailtoLink() {
    var f = form.elements;
    var subject = "Website request: " + (f.request_type.value || "General enquiry");
    var body = [
      "Name: " + f.name.value,
      "Email: " + f.email.value,
      "Organisation: " + f.organisation.value,
      "Phone: " + f.phone.value,
      "",
      f.message.value
    ].join("\n");
    return "mailto:" + COMPANY_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function fallbackMessage(reason) {
    return reason + ' You can also <a href="' + mailtoLink() + '">send your request by email</a> to ' +
      '<a href="mailto:' + COMPANY_EMAIL + '">' + COMPANY_EMAIL + "</a>.";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.elements._honey && form.elements._honey.value) return; // bot
    if (!validate()) {
      setStatus("error", "Please correct the highlighted fields.");
      return;
    }

    var data = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name && el.name !== "_next" && el.name !== "_honey") data[el.name] = el.value.trim();
    });
    data._subject = "Website request: " + data.request_type + " (" + data.name + ")";

    button.disabled = true;
    button.textContent = "Sending…";
    setStatus("", "");

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json().catch(function () { return {}; }); })
      .then(function (json) {
        if (json && String(json.success) === "true") {
          form.reset();
          setStatus("success", "<strong>Thank you.</strong> Your request has been sent to our team. We will reply to the email address you provided.");
        } else {
          setStatus("error", fallbackMessage("Sorry, your request could not be sent right now."));
        }
      })
      .catch(function () {
        setStatus("error", fallbackMessage("Sorry, we could not reach the server."));
      })
      .then(function () {
        button.disabled = false;
        button.textContent = "Send Request";
      });
  });
})();
