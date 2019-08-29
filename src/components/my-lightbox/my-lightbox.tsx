import { Component, Element, Prop, Watch, Listen } from "@stencil/core";

@Component({
	tag: 'my-lightbox',
	styleUrl: './my-lightbox.css',
	shadow: true
})
export class MyLightBox {
	images: any[];
	modalImage: HTMLImageElement;
	buttonBack: HTMLDivElement;
	buttonForward: HTMLDivElement;

	@Element() el: HTMLElement;
	@Prop({ reflectToAttr: true, mutable: true }) opened: boolean;
	@Prop({ reflectToAttr: true, mutable: true }) actualImageIndex: number;

	@Listen('body:myImageClickedEvent')
	onThumbnailClicked(event: CustomEvent) {
		this.modalImage.src = event.detail;
		this.openModal(event);
	}

	@Watch('actualImageIndex')
	imageIndexChanged(newValue: number, oldValue: number) {
		if (newValue !== oldValue) {
			this.updateNavButtonsVisiblity(newValue);
			this.modalImage.src = this.images[newValue].src;
		}
	}

	updateNavButtonsVisiblity(index: number) {
		this.buttonBack.hidden = false;
		this.buttonForward.hidden = false;
		if (index <= 0) {
			this.buttonBack.hidden = true;
		}
		else if (index >= this.images.length - 1) {
			this.buttonForward.hidden = true;
		}
	}

	openModal(event: Event) {
		this.opened = true;
		const selectedImage = event.target;
		this.actualImageIndex = this.images.indexOf(selectedImage as any);
	}

	closeModal() {
		this.opened = false;
	}

	navigateBack() {
		if (this.actualImageIndex <= 0) {
			this.actualImageIndex = 0;
		}
		else {
			this.actualImageIndex--;
		}
	}

	navigateForward() {
		if (this.actualImageIndex >= this.images.length - 1) {
			this.actualImageIndex = this.images.length - 1;
		}
		else {
			this.actualImageIndex++;
		}
	}

	componentDidLoad() {
		const slotElement = this.el.shadowRoot.querySelector('slot') as HTMLSlotElement;
		this.images = slotElement.assignedElements();
	}
	
	render() {
		return [
			<div class="thumbnails-container">
				<slot></slot>
			</div>,
			<div class="backdrop" onClick={this.closeModal.bind(this)}></div>,
			<div class="modal-wrapper">
				<div class="images-modal">
					<div
						class="nav-back"
						ref={el => this.buttonBack = el}
						onClick={this.navigateBack.bind(this)}>Back
                </div>
					<img
						class="image"
						ref={el => this.modalImage = el} />
					<div
						class="nav-forward"
						ref={el => this.buttonForward = el}
						onClick={this.navigateForward.bind(this)}>Next
				</div>
				</div>
			</div>
		];
	}
}