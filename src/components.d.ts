/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
  interface MyComponentAttributes extends StencilHTMLAttributes {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }

  interface MyLightboxImage {
    'alt': string;
    'src': string;
  }
  interface MyLightboxImageAttributes extends StencilHTMLAttributes {
    'alt'?: string;
    'onMyImageClickedEvent'?: (event: CustomEvent<string>) => void;
    'src'?: string;
  }

  interface MyLightbox {
    'actualImageIndex': number;
    'opened': boolean;
  }
  interface MyLightboxAttributes extends StencilHTMLAttributes {
    'actualImageIndex'?: number;
    'opened'?: boolean;
  }
}

declare global {
  interface StencilElementInterfaces {
    'MyComponent': Components.MyComponent;
    'MyLightboxImage': Components.MyLightboxImage;
    'MyLightbox': Components.MyLightbox;
  }

  interface StencilIntrinsicElements {
    'my-component': Components.MyComponentAttributes;
    'my-lightbox-image': Components.MyLightboxImageAttributes;
    'my-lightbox': Components.MyLightboxAttributes;
  }


  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };

  interface HTMLMyLightboxImageElement extends Components.MyLightboxImage, HTMLStencilElement {}
  var HTMLMyLightboxImageElement: {
    prototype: HTMLMyLightboxImageElement;
    new (): HTMLMyLightboxImageElement;
  };

  interface HTMLMyLightboxElement extends Components.MyLightbox, HTMLStencilElement {}
  var HTMLMyLightboxElement: {
    prototype: HTMLMyLightboxElement;
    new (): HTMLMyLightboxElement;
  };

  interface HTMLElementTagNameMap {
    'my-component': HTMLMyComponentElement
    'my-lightbox-image': HTMLMyLightboxImageElement
    'my-lightbox': HTMLMyLightboxElement
  }

  interface ElementTagNameMap {
    'my-component': HTMLMyComponentElement;
    'my-lightbox-image': HTMLMyLightboxImageElement;
    'my-lightbox': HTMLMyLightboxElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
