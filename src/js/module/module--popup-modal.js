/* global Event */
(function (app, window, document) {
  /*
  *
  * Documentation
  *
  */

  app.popupModal = (function () {
    // modal options
    var defaultOptions = {
      activateScrollLock: true,
      popupModalClass: 'popup-modal',
      popupContentClass: 'content-holder',
      activeClass: 'popup-modal-active',
      closeBtnClass: 'popup-modal__close-btn',
      destoryOnClose: false
    };
    var modalOptions = {};

    // current modal state variables
    var isModalCreated = false;
    var scrollLockActivated = false;

    // base modal content
    var popupModalWrapper;
    var popupModal;
    var popupContentHolderWrapper;
    var popupContentHolder;

    /**
    * @param options object -- optional object containg default option
    * overrides to be passed the the extendOptions() function
    */
    var createModal = function (options) {
      // update default modal options with custom options if any
      extendOptions(options);

      if (isModalCreated === false) {
        // create modal element and assign it wrapper class
        popupModalWrapper = document.createElement('div');
        popupModalWrapper.classList.add(modalOptions.popupModalClass + '__wrapper');
        popupModal = document.createElement('div');
        popupModal.classList.add(modalOptions.popupModalClass);
        popupModalWrapper.append(popupModal);

        // create popup modal content holder
        popupContentHolderWrapper = document.createElement('div');
        popupContentHolderWrapper.classList.add(modalOptions.popupContentClass + '__wrapper');
        popupContentHolder = document.createElement('div');
        popupContentHolder.classList.add(modalOptions.popupContentClass);
        popupContentHolderWrapper.append(popupContentHolder);

        // apend content holder to modal
        popupModal.append(popupContentHolderWrapper);

        // add close button
        addCloseBtn();

        // add event listeners
        createEventListeners();
        // append modal to body
        document.querySelector('body').append(popupModalWrapper);

        // update modal created status
        isModalCreated = true;
      }
    };

    var addCloseBtn = function () {
      var closeDiv = document.createElement('div');
      closeDiv.classList.add(modalOptions.closeBtnClass);
      var closeBtnHolderClass = modalOptions.closeBtnClass + '__wrapper';

      // check if the content holder has a defined close btn container,
      // if not, add one, then load in the close btn
      if (popupContentHolder && popupContentHolder.classList.contains(closeBtnHolderClass)) {
        popupContentHolder.querySelector(closeBtnHolderClass).append(closeDiv);
      } else {
        var closeBtnHolderDiv = document.createElement('div');
        closeBtnHolderDiv.classList.add(closeBtnHolderClass);
        closeBtnHolderDiv.append(closeDiv);
        popupContentHolder.append(closeBtnHolderDiv);
      }
    };

    var destroyModal = function () {
      modalOptions = {};
      isModalCreated = false;
      popupModalWrapper.remove();
    };

    /**
    * @param options object -- optional object containg default option
    * overrides to be merged into modalOptions along with defaultOptions
    * functon called by createModal()
    */
    function extendOptions (options) {
      var key;
      for (key in defaultOptions) {
        if (defaultOptions.hasOwnProperty(key)) {
          modalOptions[key] = defaultOptions[key];
        }
      }

      if (options) {
        for (key in options) {
          if (options.hasOwnProperty(key)) {
            modalOptions[key] = options[key];
          }
        }
      }
    }

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
      addCloseBtn();
    };

    var activateModal = function () {
      popupModalWrapper.classList.add(modalOptions.activeClass);
      lockScroll();
      addEscape();
    };

    var closeModal = function () {
      popupModalWrapper.classList.remove(modalOptions.activeClass);
      popupContentHolder.innerHTML = '';
      unlockScroll();
      removeEscape();

      if (modalOptions.destroyOnClose) {
        setTimeout({function () {
          destroyModal();
        }}, 0);
      }
    };

    // if activateScrollLock is set to true, the modal will lock the scroll
    // position of the screen on while the modal is active.
    // once closed unlockScroll() will be called to reactivate scrolling
    var lockScroll = function () {
      if (modalOptions.activateScrollLock) {
        document.querySelector('body').style.overflow = 'hidden';
        var scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
        document.addEventListener('scroll', scrollToOverride(scrollPos));
        scrollLockActivated = true;
      }
    };

    /**
    * @param scrollPos float -- current scroll position to be used to prevent
    * scolling when the modal is poped up
    */
    var scrollToOverride = function (scrollPos) {
      window.scrollTo(0, scrollPos);
    };

    var unlockScroll = function () {
      if (scrollLockActivated) {
        document.querySelector('body').style.overflow = 'auto';
        document.removeEventListener('scroll', scrollToOverride);
        scrollLockActivated = false;
      }
    };

    var createEventListeners = function () {
      document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains(modalOptions.closeBtnClass)) {
          closeModal();
        }
      });
    };
    function addEscape () {
      document.addEventListener('keyup', triggerCloseOnEsc);
    }

    function removeEscape () {
      document.removeEventListener('keyup', triggerCloseOnEsc);
    }

    function triggerCloseOnEsc (e) {
      if (e.keyCode === 27) {
        var clickEvent = new Event('click');
        var closeBtn = popupModalWrapper.querySelectory('.' + modalOptions.closeBtnClass);
        closeBtn.dispatchEvent(clickEvent);
      }
    }

    return {
      createModal: createModal,
      fillModal: fillModal,
      activateModal: activateModal,
      closeModal: closeModal,
      destroyModal: destroyModal
    };
  })();
})(window.app = window.app || {}, window, document);
