/**
 * Following the Supercharged livestream found here: https://www.youtube.com/watch?v=e5CXg1sjTqQ
**/

'use strict';

class SideNav {
  constructor () {
    this.showButtonEl = document.querySelector('.js-menu-show');
    this.hideButtonEl = document.querySelector('.js-menu-hide');
    this.sideNavEl = document.querySelector('.js-side-nav');
    this.sideNavContainerEl = document.querySelector('.js-side-nav-container');

    this.showSideNav = this.showSideNav.bind(this); /* creates a new function that, when called, has its this keyword set to the provided value */
    this.hideSideNav = this.hideSideNav.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.update = this.update.bind(this);

    this.startX = 0;
    this.currentX = 0;
    this.touchingSideNav = false;

    this.addEventListeners();
  }

  addEventListeners () {
    this.showButtonEl.addEventListener('click', this.showSideNav);
    this.hideButtonEl.addEventListener('click', this.hideSideNav);
    this.sideNavEl.addEventListener('click', this.hideSideNav);
    this.sideNavContainerEl.addEventListener('click', this.blockClicks);

    document.addEventListener('touchstart', this.onTouchStart);
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onTouchEnd);
  }

  onTouchStart (evt) {
    if (!this.sideNavEl.classList.contains('side-nav--visible'))
      return;

    this.startX = evt.touches[0].pageX;
    this.currentX = this.startX;

    this.touchingSideNav = true;
    requestAnimationFrame(this.update);
  }

  onTouchMove (evt) {
    this.currentX = evt.touches[0].pageX;
    const translateX = Math.min(0, this.currentX - this.startX);

    if (translateX < 0) {
      evt.preventDefault();
    }
  }

  onTouchEnd (evt) {
    this.touchingSideNav = false;

    const translateX = Math.min(0, this.currentX - this.startX);
    this.sideNavContainerEl.style.transform = '';

    if (translateX < 0) {
      this.hideSideNav();
    }
  }

  update () {
    if (!this.sideNavEl.classList.contains('side-nav--visible')) return;

    if (this.touchingSideNav) {
      requestAnimationFrame(this.update);
    }

    const translateX = Math.min(0, this.currentX - this.startX);
    this.sideNavContainerEl.style.transform = `translateX(${translateX}px)`;
  }

  blockClicks (evt) {
    evt.stopPropagation();
  }

  onTransitionEnd (evt) {
    this.sideNavEl.classList.remove('side-nav--animatable');
    this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd);
  }

  showSideNav () {
    this.sideNavEl.classList.add('side-nav--animatable');
    this.sideNavEl.classList.add('side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
  }

  hideSideNav () {
    this.sideNavEl.classList.add('side-nav--animatable');
    this.sideNavEl.classList.remove('side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
  }

}

new SideNav();
