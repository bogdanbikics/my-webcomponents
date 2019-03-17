import { Component, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
	tag: 'my-lightbox-image',
	styleUrl: './my-lightbox-image.css',
	shadow: true
})
export class MyLighBoxImage {
	image: HTMLImageElement;
	
	@Event({ bubbles: true, composed: true }) myImageClickedEvent: EventEmitter<string>;
	@Prop({ reflectToAttr: true, mutable: true }) thumbnailSrc: string;
	@Prop({ reflectToAttr: true }) src: string;
	@Prop({ reflectToAttr: true }) alt: string;

	componentDidLoad() {
		if (!this.thumbnailSrc) {
			this.thumbnailSrc = this.src;
		}
		this.image.onload = (ev: Event) =>
			(ev.target as HTMLImageElement).classList.remove('loading');
		this.image.addEventListener('click', this.imageClicked.bind(this, this.image.src));
		if (!this.image.complete) {
			this.image.classList.add('loading');
		}
	}

	imageClicked(imgSrc: string) {
		this.myImageClickedEvent.emit(imgSrc); //TODO: send the bigSrc not the thumb!
	}

	render() {
		return (
			<div class="img-wrapper">
				<img 
					class="thumbnail-image" 
					src={this.thumbnailSrc} 
					ref={el => this.image = el}
					alt={this.alt} />
			</div>
		);
	}
}