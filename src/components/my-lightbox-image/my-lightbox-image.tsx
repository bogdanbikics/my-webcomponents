import { Component, Prop, Element, Event, EventEmitter } from "@stencil/core";

@Component({
	tag: 'my-lightbox-image',
	styleUrl: './my-lightbox-image.css',
	shadow: true
})
export class MyLighBoxImage {
	@Event({ bubbles: true, composed: true }) myImageClickedEvent: EventEmitter<string>;
	@Element() el: HTMLElement;
	@Prop({ reflectToAttr: true }) src: string;
	@Prop({ reflectToAttr: true }) alt: string;

	componentDidLoad() {
		const image = this.el.shadowRoot.querySelector('.thumbnail-image') as HTMLImageElement;
		image.onload = (ev: Event) =>
			(ev.target as HTMLImageElement).classList.remove('loading');
		image.addEventListener('click', this.imageClicked.bind(this, image.src));
		if (!image.complete) {
			image.classList.add('loading');
		}
	}

	imageClicked(imgSrc: string) {
		console.log('image clicked...', imgSrc);
		this.myImageClickedEvent.emit(imgSrc);
	}

	render() {
		return (
			<div class="img-wrapper">
				<img class="thumbnail-image" src={this.src} alt={this.alt} />
			</div>
		);
	}
}