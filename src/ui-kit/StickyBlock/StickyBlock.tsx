import React, {CSSProperties, createRef, ReactNode} from 'react';
import cn from 'classnames';
import {isNil} from 'lodash';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import {debounceRAF} from '../../utils/debounceRAF';

import offset from '../../utils/offset';
import {withDefaultProps} from '../../hoc/withDefaultProps';

interface IStickyBlockProps {
	className?: string
	innerClassName?: string
	fixedClassName: string
	notFixedClassName: string
	offsetTop: number
	offsetBottom: number
	children: ReactNode
}

interface IStickyBlockState {
	style: CSSProperties
	placeholderStyle: CSSProperties
}

export const StickyBlock = withDefaultProps(
	{
		offsetTop: 0,
		offsetBottom: 0,
		fixedClassName: 'sticky-block_fixed',
		notFixedClassName: 'sticky-block_not-fixed',
	},
	class StickyBlock extends React.Component<IStickyBlockProps, IStickyBlockState> {
		private nodes = {
			wrap: createRef<HTMLDivElement>(),
			placeholder: createRef<HTMLDivElement>(),
			container: createRef<HTMLDivElement>(),
		};

		private scrollTop?: number;
		calcAndSetPosition = debounceRAF(() => {
			const {
				offsetTop: _propsOffsetTop,
				offsetBottom: propsOffsetBottom,
			} = this.props;

			const _stickyHeaderHeight = getComputedStyle(this.nodes.wrap.current!).getPropertyValue('--sticky-header-height');
			const stickyHeaderHeight = _stickyHeaderHeight.length !== 0 ? Number(_stickyHeaderHeight.replace('px', '')) : 0;

			const propsOffsetTop = _propsOffsetTop + stickyHeaderHeight;

			const wrapNode = this.nodes.wrap.current!;
			const placeholderNode = this.nodes.placeholder.current!;
			const containerNode = this.nodes.container.current!;
			const parentNode = wrapNode.parentNode! as HTMLElement;

			const viewportHeight = Math.max(document.documentElement!.clientHeight, window.innerHeight || 0);
			const scrollLeft = window.pageXOffset || document.documentElement!.scrollLeft;
			const fixedOffsetLeft = Math.round(offset(placeholderNode).left - scrollLeft);
			const startPoint = Math.round(offset(placeholderNode).top);
			const width = placeholderNode.offsetWidth;
			const height = containerNode.offsetHeight;
			const endPoint = (parentNode.offsetHeight) + offset(parentNode).top;
			const scrollTop = window.pageYOffset || document.documentElement!.scrollTop;
			const prevScrollTop = isNil(this.scrollTop) ? scrollTop : this.scrollTop;
			const maxOffsetFromStartPoint = endPoint - startPoint - height;
			const offsetFromStartPoint = Math.round(offset(containerNode).top - startPoint);

			this.scrollTop = scrollTop;

			if (scrollTop > startPoint - propsOffsetTop) {
				if (scrollTop + Math.min(height + propsOffsetTop, viewportHeight - propsOffsetBottom) >= endPoint) {
					this.setState({
						style: {
							transform: `translateY(${maxOffsetFromStartPoint}px)`,
						},
						placeholderStyle: {},
					});
				} else if (height + propsOffsetTop + propsOffsetBottom <= viewportHeight) {
					this.setState({
						style: {
							position: 'fixed',
							transform: 'translateZ(0)',
							top: propsOffsetTop,
							left: fixedOffsetLeft,
							width,
						},
						placeholderStyle: {
							height,
						},
					});
				} else if (prevScrollTop <= scrollTop) {
					if (
						scrollTop >= (height + propsOffsetBottom) - viewportHeight + startPoint + offsetFromStartPoint
					) {
						this.setState({
							style: {
								position: 'fixed',
								transform: 'translateZ(0)',
								bottom: propsOffsetBottom,
								left: fixedOffsetLeft,
								width,
							},
							placeholderStyle: {
								height,
							},
						});
					} else {
						this.setState({
							style: {
								transform: `translateY(${offsetFromStartPoint}px)`,
							},
							placeholderStyle: {},
						});
					}
				} else if (scrollTop <= startPoint + offsetFromStartPoint - propsOffsetTop) {
					this.setState({
						style: {
							position: 'fixed',
							transform: 'translateZ(0)',
							top: propsOffsetTop,
							left: fixedOffsetLeft,
							width,
						},
						placeholderStyle: {
							height,
						},
					});
				} else {
					this.setState({
						style: {
							transform: `translateY(${offsetFromStartPoint}px)`,
						},
						placeholderStyle: {},
					});
				}
			} else {
				this.setState({
					style: {},
					placeholderStyle: {},
				});
			}
		});

		constructor(props: IStickyBlockProps) {
			super(props);

			this.state = {
				style: {},
				placeholderStyle: {},
			};
		}

		componentDidMount() {
			const parentNode = this.nodes.wrap.current!.parentNode as HTMLElement;
			const containerNode = this.nodes.container.current!;

			window.addEventListener('scroll', this.calcAndSetPosition);
			window.addEventListener('resize', this.calcAndSetPosition);
			window.addEventListener('load', this.calcAndSetPosition);

			// eslint-disable-next-line no-new
			new ResizeSensor(parentNode, this.calcAndSetPosition);
			// eslint-disable-next-line no-new
			new ResizeSensor(containerNode, this.calcAndSetPosition);
		}

		componentWillUnmount() {
			const parentNode = this.nodes.wrap.current!.parentNode as HTMLElement;
			const containerNode = this.nodes.container.current!;

			window.removeEventListener('scroll', this.calcAndSetPosition);
			window.removeEventListener('resize', this.calcAndSetPosition);
			window.removeEventListener('load', this.calcAndSetPosition);

			ResizeSensor.detach(parentNode);
			ResizeSensor.detach(containerNode);
			this.calcAndSetPosition.cancel();
		}

		render() {
			const {style, placeholderStyle} = this.state;
			const
				{
					children,
					className,
					innerClassName,
					fixedClassName,
					notFixedClassName,
				} = this.props;

			return (
				<div className={className} ref={this.nodes.wrap}>
					<div ref={this.nodes.placeholder} style={placeholderStyle} />
					<div
						className={cn(innerClassName, {
							[fixedClassName]: style.position === 'fixed',
							[notFixedClassName]: style.position !== 'fixed',
						})}
						style={style}
						ref={this.nodes.container}
					>
						<div>
							{children}
						</div>
					</div>
				</div>
			);
		}
	},
);
