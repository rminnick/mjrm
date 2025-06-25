// Fun dark mode toggle logic
(function() {
  const btn = document.getElementById('darkModeToggle');
  const body = document.body;
  const darkModeKey = 'mjrm-dark-mode';
  const emojiSpan = btn ? btn.querySelector('.toggle-emoji') : null;

  function setDarkMode(enabled, animate = false) {
    if (enabled) {
      body.classList.add('dark-mode');
      if (btn && emojiSpan) {
        emojiSpan.textContent = '☀️';
        btn.childNodes[1].nodeValue = ' Light Mode';
        if (animate) {
          btn.classList.add('pop');
          btn.classList.add('spin');
          setTimeout(() => btn.classList.remove('pop'), 250);
          setTimeout(() => btn.classList.remove('spin'), 600);
        }
      }
    } else {
      body.classList.remove('dark-mode');
      if (btn && emojiSpan) {
        emojiSpan.textContent = '🌙';
        btn.childNodes[1].nodeValue = ' Dark Mode';
        if (animate) {
          btn.classList.add('pop');
          btn.classList.add('spin');
          setTimeout(() => btn.classList.remove('pop'), 250);
          setTimeout(() => btn.classList.remove('spin'), 600);
        }
      }
    }
  }

  function savePref(enabled) {
    localStorage.setItem(darkModeKey, enabled ? 'true' : 'false');
  }

  if (btn) {
    btn.addEventListener('click', function() {
      const enabled = !body.classList.contains('dark-mode');
      setDarkMode(enabled, true);
      savePref(enabled);
    });
  }

  // On load: check preference or system
  const userPref = localStorage.getItem(darkModeKey);
  if (userPref !== null) {
    setDarkMode(userPref === 'true');
  } else {
    // If no preference, use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    savePref(prefersDark);
  }
})();
