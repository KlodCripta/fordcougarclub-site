// Ford Cougar Club Italia — script condiviso del sito

// Gestione dropdown menu su touch/mobile: tap per apri/chiudi, hover resta attivo su desktop
document.addEventListener('DOMContentLoaded', function () {
  var groupLabels = document.querySelectorAll('.nav-group-label');

  // Memorizza la posizione originale di ogni dropdown nel DOM,
  // cosi possiamo "restituirlo" al suo posto quando si chiude o su desktop.
  var originalPositions = new Map();

  function isMobileLayout() {
    return window.matchMedia('(max-width: 640px)').matches;
  }

  function closeDropdown(li) {
    li.classList.remove('open');
    var dropdown = li.querySelector(':scope > .nav-dropdown') ||
                    document.querySelector('.nav-dropdown[data-open-for]');
    // ripristina nel DOM originale eventuali dropdown spostati nel body
    document.querySelectorAll('body > .nav-dropdown').forEach(function (d) {
      var homeLi = originalPositions.get(d);
      if (homeLi) {
        homeLi.appendChild(d);
        d.style.left = '';
        d.style.right = '';
        d.style.top = '';
      }
    });
  }

  groupLabels.forEach(function (label) {
    var parentLi = label.closest('li');
    var dropdown = parentLi.querySelector('.nav-dropdown');
    if (dropdown) originalPositions.set(dropdown, parentLi);

    label.addEventListener('click', function (e) {
      var alreadyOpen = parentLi.classList.contains('open');

      // chiude tutti gli altri dropdown aperti (e li riporta al loro posto nel DOM)
      document.querySelectorAll('.main-nav li.open').forEach(function (li) {
        if (li !== parentLi) closeDropdown(li);
      });

      if (alreadyOpen) {
        closeDropdown(parentLi);
      } else {
        parentLi.classList.add('open');

        // Su mobile, sposta il dropdown nel <body> cosi esce da qualsiasi
        // contenitore con overflow che lo clipperebbe (es. nav scrollabile).
        if (isMobileLayout() && dropdown) {
          document.body.appendChild(dropdown);
          dropdown.style.left = '0';
          dropdown.style.right = '0';
        }
      }

      e.stopPropagation();
    });
  });

  // chiude i dropdown se si tocca/clicca fuori dal menu
  document.addEventListener('click', function (e) {
    var clickedInsideNav = e.target.closest('.main-nav');
    var clickedInsideDropdown = e.target.closest('.nav-dropdown');
    if (!clickedInsideNav && !clickedInsideDropdown) {
      document.querySelectorAll('.main-nav li.open').forEach(function (li) {
        closeDropdown(li);
      });
    }
  });

  // se si ridimensiona la finestra (es. rotazione schermo), riallinea tutto
  window.addEventListener('resize', function () {
    document.querySelectorAll('.main-nav li.open').forEach(function (li) {
      closeDropdown(li);
    });
  });

  // Deterrente base anti-copia: disabilita click destro e drag su tutte le immagini.
  // NB: non è una protezione reale (resta possibile con DevTools, screenshot, ecc.),
  // serve solo a scoraggiare il salvataggio occasionale da parte dell'utente medio.
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    img.addEventListener('dragstart', function (e) { e.preventDefault(); });
  });

  // Lightbox condivisa per galleria evoluzione
  var evLightbox = document.getElementById('ev-lightbox');
  var evLightboxImg = document.getElementById('ev-lightbox-img');
  if (evLightbox && evLightboxImg) {
    document.querySelectorAll('.evolution-item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        evLightboxImg.src = item.getAttribute('data-src');
        evLightbox.style.display = 'flex';
      });
    });
    evLightbox.querySelector('.lightbox-close').addEventListener('click', function (e) {
      e.preventDefault();
      evLightbox.style.display = 'none';
      evLightboxImg.src = '';
    });
    evLightbox.addEventListener('click', function (e) {
      if (e.target === evLightbox) {
        evLightbox.style.display = 'none';
        evLightboxImg.src = '';
      }
    });
  }
});
