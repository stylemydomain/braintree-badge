
import {AppElement, html} from '@smyd/app-shared/app-element.js';
import {
  braintreeConfig
}                 from 'app.config.js';
import {
  isOnScreen,
  schedule
}                 from '@smyd/app-functions/utils.js';
import htmlString from './braintree-badge.html';
import '@polymer/iron-image/iron-image.js';


class BraintreeBadge extends AppElement {
  static get is() { return 'braintree-badge'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _merchantId: String,

      _src: String
      
    };
  }


  connectedCallback() {
    super.connectedCallback();
    const {merchantId} = braintreeConfig || {};
    this._merchantId   = merchantId      || '';
    this.__lazyLoad(merchantId);
  }


  __computeHref(id) {
    if (!id) { return ''; }
    return `https://www.braintreegateway.com/merchants/${id}/verified`;
  }


  async __lazyLoad(merchantId) {
    await schedule();
    await isOnScreen(this);
    this._src          = merchantId      ? 
      'https://s3.amazonaws.com/braintree-badges/braintree-badge-wide-light.png' : '#';
  }

}

window.customElements.define(BraintreeBadge.is, BraintreeBadge);
