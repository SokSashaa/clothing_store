import 'react-alice-carousel/lib/alice-carousel.css';
import sl1 from './images/sl1.jpg'
import sl2 from './images/sl2.jpeg'
import AliceCarousel from "react-alice-carousel";
import './Carousel.scss'
import {ControlsStrategy} from "react-alice-carousel/lib/types";
import React from 'react';

const Carousel = () => {

	const items = [
		<img src={sl1}/>,
		<img src={sl2}/>
	]

	return (
		<div className={'wrapper_carousel'}>
			<AliceCarousel mouseTracking autoPlay autoPlayInterval={3000} infinite items={items}
			               controlsStrategy={ControlsStrategy.RESPONSIVE} disableButtonsControls/>
		</div>
	)


}
export default Carousel
