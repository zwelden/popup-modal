(function (app) {
  /*
  *
  * Documentation
  *
  */

  app.popupModal = (function () {
    var isModalCreated = false;

    // base modal content
    var popupModal,
      popupModalInner,
      popupModalClass = 'popup-modal',
      popupContentHolder,
      popupContentHolderInner,
      popupModalContentClass = 'content-holder';

    var createModal = function () {
      if (isModalCreated === false) {
        // create modal element and assign it wrapper class
        popupModal = document.createElement('div');
        popupModal.classList.add(popupModalClass + '__wrapper');
        popupModalInner = document.createElement('div');
        popupModalInner.classList.add(popupModalClass);

        // create popup modal content holder

        // append modal to body
        document.querySelector('body').append(popupModal);

        // update modal created status
        isModalCreated = true;
      }
    };

    var fillModal = function () {
      // ...
    };

    var activateModal = function () {
      // ...
    };

    var closeModal = function () {
      // ...
    };

    var scrollLock = function () {
      // ...
    };

    return {
      createModal: createModal,
      fillModal: fillModal,
      activateModal: activateModal,
      closeModal: closeModal
    };
  })();
})(window.app = window.app || {});
