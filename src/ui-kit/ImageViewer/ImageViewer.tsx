import React, {FC, MouseEvent, useState} from 'react';
import css from './ImageViewer.module.scss';
import cn from 'classnames';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

type ImageViewerProps = {
	images: React.ReactNode[];
};

export const ImageViewer: FC<ImageViewerProps> = ({images}) => {
	const [activeImage, setActiveImage] = useState(0);

	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);

	const handleSwitchToPrevImage = () => {
		if (activeImage - 1 >= 0) {
			setActiveImage(activeImage - 1);
		} else {
			setActiveImage(images.length - 1);
		}
	};

	const handleSwitchToNextImage = () => {
		if (activeImage + 1 <= images.length - 1) {
			setActiveImage(activeImage + 1);
		} else {
			setActiveImage(0);
		}
	};

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		setTouchStart(e.targetTouches[0].clientX);
	};

	const handleMouseStart = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		setTouchStart(e.clientX);
	};

	const handleMouseEnd = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		setTouchEnd(e.clientX);
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (touchStart - touchEnd > 35) {
			handleSwitchToPrevImage();
		}

		if (touchStart - touchEnd < -35) {
			handleSwitchToNextImage();
		}
	};

	return (
		<div className={css.wrapper}>
			{images.length === 0 ? (
				<div className={cn(css.noPhoto, css.img)} />
			) : (
				<div
					className={css.imageBlockWrapper}
					onMouseDown={handleMouseStart}
					onMouseMove={handleMouseEnd}
					onMouseUp={handleTouchEnd}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
				>
					<div className={css.images}>
						{images.map(
							(image, index) =>
								index === activeImage && (
									<div key={index} className={css.image}>
										{image}
									</div>
								)
						)}
					</div>
					{images.length > 1 && (
						<div className={css.arrowsBlock}>
							<span className={css.arrow} onClick={handleSwitchToPrevImage}>
								<LeftOutlined />
							</span>
							<span className={css.arrow} onClick={handleSwitchToNextImage}>
								<RightOutlined />
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
