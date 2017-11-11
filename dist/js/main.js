/* one-var-declaration-per-line: ["error", "always"]*/

(function (app) {
  /*
  *
  * Documentation
  *
  */

  app.popupModal = (function () {
    var isModalCreated = false;

    // base modal content
    var popupModal;
    var popupModalInner;
    var popupModalClass = 'popup-modal';
    var popupContentHolder;
    var popupContentHolderInner;
    var popupContentClass = 'content-holder';

    var createModal = function () {
      if (isModalCreated === false) {
        // create modal element and assign it wrapper class
        popupModal = document.createElement('div');
        popupModal.classList.add(popupModalClass + '__wrapper');
        popupModalInner = document.createElement('div');
        popupModalInner.classList.add(popupModalClass + '__inner');
        popupModal.append(popupModalInner);

        // create popup modal content holder
        popupContentHolder = document.createElement('div');
        popupContentHolder.classList.add(popupContentClass + '__wrapper');
        popupContentHolderInner = document.createElement('div');
        popupContentHolderInner.classList.add(popupContentClass + '__inner');
        popupContentHolder.append(popupContentHolderInner);

        // apend content holder to modal
        popupModalInner.append(popupContentHolder);

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
