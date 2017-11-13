(function (app, window, document) {
  if (document.querySelector('.js-main-modal')) {
    app.popupModal.createModal();
  }

  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('js-main-modal')) {
      var content = e.target.dataset.target;
      app.popupModal.fillModal(content);
      app.popupModal.activateModal();
    }
  });
})(window.app = window.app || {}, window, document);
