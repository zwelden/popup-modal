(function (app, window, document) {
  /*
  *
  * Documentation
  *
  */

  app.popupModal = (function () {
    var isModalCreated = false;

    // base modal content
    var popupModalWrapper;
    var popupModal;
    var popupModalClass = 'popup-modal';
    var popupContentHolderWrapper;
    var popupContentHolder;
    var popupContentClass = 'content-holder';

    var createModal = function () {
      if (isModalCreated === false) {
        // create modal element and assign it wrapper class
        popupModalWrapper = document.createElement('div');
        popupModalWrapper.classList.add(popupModalClass + '__wrapper');
        popupModal = document.createElement('div');
        popupModal.classList.add(popupModalClass);
        popupModalWrapper.append(popupModal);

        // create popup modal content holder
        popupContentHolderWrapper = document.createElement('div');
        popupContentHolderWrapper.classList.add(popupContentClass + '__wrapper');
        popupContentHolder = document.createElement('div');
        popupContentHolder.classList.add(popupContentClass);
        popupContentHolderWrapper.append(popupContentHolder);

        // apend content holder to modal
        popupModal.append(popupContentHolderWrapper);

        // append modal to body
        document.querySelector('body').append(popupModalWrapper);

        // update modal created status
        isModalCreated = true;
      }
    };

    /**
    * @param targetClass string -- class identifier for targeting
    * the element in the document tree to load into the popup modal
    * Targeted element will be deep cloned (minus event listeners).
    */
    var fillModal = function (targetClass) {
      var targetObj = document.querySelector('.' + targetClass);
      var copyTarget = targetObj.cloneNode(true);
      popupContentHolder.innerHTML = '';
      popupContentHolder.appendChild(copyTarget);
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
})(window.app = window.app || {}, window, document);
