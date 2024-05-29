import {ReactNode} from 'react';
import * as React from 'react';
import cn from 'classnames';
import {StickyBlock} from '../../../../ui-kit/StickyBlock/StickyBlock';

import css from './SidebarLayout.module.scss';

export interface SidebarLayoutProps {
	offsetTop?: number
	afterMenuSlot?: React.ReactNode
	beforeMenuSlot?: React.ReactNode
	footerSlot?: React.ReactNode
	children?: ReactNode
}

export class SidebarLayout extends React.Component<SidebarLayoutProps> {
	render() {
		const {children, afterMenuSlot, beforeMenuSlot, offsetTop, footerSlot} = this.props;

		return (
			<>
				<div className={css.contentSectionTable}>
					<div className={css.contentSectionSidebar}>
						<StickyBlock offsetTop={offsetTop} innerClassName={css.contentSectionSidebarInner}>
							{beforeMenuSlot !== undefined && beforeMenuSlot}
							{afterMenuSlot !== undefined && afterMenuSlot}
						</StickyBlock>
					</div>
					<div className={cn(css.contentSectionContent)}>
						{children}
					</div>
				</div>
				{footerSlot !== undefined && footerSlot}
			</>
		);
	}
}
