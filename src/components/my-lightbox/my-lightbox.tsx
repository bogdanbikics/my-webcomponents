import { Component, Element, Prop, Watch, Listen } from "@stencil/core";
import { MyLighBoxImage } from "../my-lightbox-image/my-lightbox-image";

@Component({
    tag: 'my-lightbox',
    styleUrl: './my-lightbox.css',
    shadow: true
})
export class MyLightBox {
    images: MyLighBoxImage[];
    modalImage: HTMLImageElement;
    
    @Element() el: HTMLElement;
    @Prop({reflectToAttr: true, mutable: true}) opened: boolean;
    @Prop({reflectToAttr: true, mutable: true})  actualImageIndex: number;

    @Watch('actualImageIndex')
    imageIndexChanged(newValue: number, oldValue: number) {
        if (newValue !== oldValue) {
            this.modalImage.src = this.images[newValue].src;
        }
    }

    @Listen('body:myImageClickedEvent')
    onThumbnailClicked(event: CustomEvent) {
        console.log('thumbnail clicked...', event.detail);
        this.modalImage.src = event.detail;
        this.openModal(event);
    }


    componentDidLoad() {
        this.modalImage = this.el.shadowRoot.querySelector(".image") as HTMLImageElement;
        const slotElement = this.el.shadowRoot.querySelector('slot') as HTMLSlotElement;
        this.images = slotElement.assignedElements() as any[];
    }

    openModal(event: Event) {
        this.opened = true;
        const selectedImage = event.target;
        console.log(selectedImage);
        this.actualImageIndex = this.images.indexOf(selectedImage as any);
    }

    closeModal() {
        this.opened = false;
    }

    navigateBack() {
        this.actualImageIndex--; // do this with watch
        if (this.actualImageIndex < 0) {
            this.actualImageIndex = 0;
            // hide nav button
        }
    }

    navigateForward() {
        this.actualImageIndex++;
        if (this.actualImageIndex > this.images.length - 1) {
            this.actualImageIndex = this.images.length - 1;
            // hide nav button
        }
    }

    render() {
        return [
            <div class="thumbnails-container">
                <slot></slot>
            </div>,
            <div class="backdrop" onClick={this.closeModal.bind(this)}></div>,
            <div class="images-modal">
                <div class="nav-back" onClick={this.navigateBack.bind(this)}>Back</div>
                <img class="image"/>
                <div class="nav-forward" onClick={this.navigateForward.bind(this)}>Next</div>
            </div>
        ];
    }
}