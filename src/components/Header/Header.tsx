import {FC, useCallback, useEffect, useState} from "react";
import './Header.scss'
import MiniHeader from "./MiniHeader/MiniHeader";
import MainHeader from "./MainHeader/MainHeader";
import React from "react";

enum ScrollDirections {
	Up,
	Down
}

const Header: FC = () => {
	const [scrollOffset, setScrollOffset] = useState(0);
	const [scrollDirection, setScrollDirection] = useState(ScrollDirections.Down);
	
	const handleNavigation = useCallback(
		() => {
			if (scrollOffset > window.scrollY) {
				setScrollDirection(ScrollDirections.Up)
			} else if (scrollOffset < window.scrollY) {
				setScrollDirection(ScrollDirections.Down)
			}
			setScrollOffset(window.scrollY);
		}, [scrollOffset]
	);
	
	useEffect(() => {
		window.addEventListener('scroll', handleNavigation)
		
		return () => window.removeEventListener("scroll", handleNavigation);
	}, [handleNavigation]);
	return (
		<header
			className={
				'wrapper_header'
				+ (scrollDirection === ScrollDirections.Up && scrollOffset > 70 ? ' scrolledUp' : ' scrolledDown')}>
			<MainHeader/>
			{
				scrollOffset < 70 && <MiniHeader/>
			}
		</header>
	)
}

export default Header