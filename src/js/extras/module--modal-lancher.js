(function (app, window, document) {
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('js-main-modal')) {
      var content = e.target.dataset.target;

      app.popupModal.createModal({destroyOnClose: true});
      app.popupModal.fillModal(content);
      setTimeout(function () {
        app.popupModal.activateModal();
      }, 0);
    }
  });
})(window.app = window.app || {}, window, document);
