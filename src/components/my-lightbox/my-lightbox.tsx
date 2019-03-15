import { Component, Element, Prop, Watch } from "@stencil/core";

@Component({
    tag: 'my-lightbox',
    styleUrl: './my-lightbox.css',
    shadow: true
})
export class MyLightBox {
    images: HTMLImageElement[];
    modalImage: HTMLImageElement;
    
    @Element() el: HTMLElement;
    @Prop({reflectToAttr: true, mutable: true}) opened: boolean;
    @Prop({reflectToAttr: true, mutable: true})  actualImageIndex: number;

    @Watch('actualImageIndex')
    imageIndexChanged(newValue: number, oldValue: number) {
        console.log('Hey')
        if (newValue !== oldValue) {
            this.modalImage.src = this.images[newValue].src;
        }
    }

    componentDidLoad() {
        this.modalImage = this.el.shadowRoot.querySelector(".image") as HTMLImageElement;
        const slotElement = this.el.shadowRoot.querySelector('slot') as HTMLSlotElement;
        this.images = slotElement.assignedElements() as HTMLImageElement[];
        this.images.forEach((imgElement: HTMLImageElement) => {
            imgElement.className = 'thumbnail-image';
            imgElement.addEventListener('click', this.openModal.bind(this));
        });
    }

    openModal(event: Event) {
        this.opened = true;
        const selectedImage = event.target as HTMLImageElement;
        this.actualImageIndex = this.images.indexOf(selectedImage);
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