/*const userPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
const currentTheme = localStorage.getItem('theme') ?? userPref

if (currentTheme) {
  document.documentElement.setAttribute('saved-theme', currentTheme);
}

const switchTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute('saved-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }
  else {
    document.documentElement.setAttribute('saved-theme', 'light')
    localStorage.setItem('theme', 'light')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Darkmode toggle
  const toggleSwitch = document.querySelector('#darkmode-toggle')

  // listen for toggle
  toggleSwitch.addEventListener('change', switchTheme, false)

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true
  }
}) */

class DarkMode {
  constructor() {
    // define some properties
    this.isActive = false;
    this.cookieTimeoutDays = 30;
    this.cookieName = "darkMode";

    this.toggleBtn = document.querySelectorAll(".js-darkmode-toggle");
    this.init();
  }

  init() {
    // get initial setting, add event listeners
    this.isActive = this.getPreference();
    this.toggleBtn.addEventListener("click", this.toggle);
  }

  getPreference() {
    // read if the user has selected a theme before,
    // otherwise fall back to media query for system defaults.
    const cookie = Cookies.get(this.cookieName);
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;

    switch (cookie) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return systemPreference;
    }
  }

  toggle() {
    // switch between light and dark
    this.isActive = !this.isActive;

    // set the data attribute to trigger CSS changes
    document.documentElement.setAttribute(
      "data-theme",
      this.isActive ? "dark" : "light"
    );
    // update the cookie to save the user preference
    Cookies.set(this.cookieName, String(this.isActive), {
      expires: this.cookieTimeoutDays,
    });

    // toggle the button state for screen readers
    this.toggleBtn.setAttribute("aria-checked", String(this.isActive));
  }
}

// this feature only makes sense if CSS custom properties are supported, 
// so check for that first before we kick things off
if (window.CSS && CSS.supports("color", "var(--fake-var)")) {
  new DarkMode();
}
