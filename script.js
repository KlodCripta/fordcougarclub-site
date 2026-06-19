// Ford Cougar Club Italia — script condiviso del sito

// Gestione dropdown menu su touch/mobile: tap per apri/chiudi, hover resta attivo su desktop
document.addEventListener('DOMContentLoaded', function () {
  var groupLabels = document.querySelectorAll('.nav-group-label');

  groupLabels.forEach(function (label) {
    label.addEventListener('click', function (e) {
      var parentLi = label.closest('li');
      var alreadyOpen = parentLi.classList.contains('open');

      // chiude tutti gli altri dropdown aperti
      document.querySelectorAll('.main-nav li.open').forEach(function (li) {
        if (li !== parentLi) li.classList.remove('open');
      });

      parentLi.classList.toggle('open', !alreadyOpen);
      e.stopPropagation();
    });
  });

  // chiude i dropdown se si tocca/clicca fuori dal menu
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.main-nav')) {
      document.querySelectorAll('.main-nav li.open').forEach(function (li) {
        li.classList.remove('open');
      });
    }
  });
});
