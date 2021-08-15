import React, { useState } from 'react'

import {
	NavbarContainer,
	NavbarContent,
	NavList,
	NavListItem,
	NavLink,
	Name,
	MenuButton,
	MenuButtonIcon,
	MobileMenuContainer,
	MobileMenuList,
	MobileMenuListItem,
	MobileMenuNavLink,
} from './styledComponents'
import { RouteComponentProps } from 'react-router'

const navLinks = [
	{ to: '/', label: 'Home', exact: true },
	{ to: '/our-story', label: 'Our Story' },
	{ to: '/bridal-party', label: 'Bridal Party' },
	{ to: '/event-details', label: 'Event Details' },
	{ to: '/messages', label: 'Messages' },
]
const leftNavLinks = navLinks.filter((linkData, index) => index <= Math.floor(navLinks.length / 2))
const rightNavLinks = navLinks.filter((linkData, index) => index > Math.floor(navLinks.length / 2))

interface Props {
	location: RouteComponentProps['location']
}
export const Navbar: React.FC<Props> = (props) => {
	const [mobileNavVisible, setMobileNavVisible] = useState(false)

	return (
		<>
			<NavbarContainer>
				<NavbarContent>
					<NavList>
						{leftNavLinks.map((linkData) => (
							<NavListItem key={linkData.to}>
								<NavLink to={linkData.to} exact={linkData.exact}>
									{linkData.label}
								</NavLink>
							</NavListItem>
						))}
					</NavList>
					<Name to='/'>Stuart & Courtney</Name>
					<NavList>
						{rightNavLinks.map((linkData) => (
							<NavListItem key={linkData.to}>
								<NavLink to={linkData.to} exact={linkData.exact}>
									{linkData.label}
								</NavLink>
							</NavListItem>
						))}
					</NavList>
					<MenuButton aria-label='Open Navigation'>
						<MenuButtonIcon onClick={() => setMobileNavVisible(true)} />
					</MenuButton>
				</NavbarContent>
			</NavbarContainer>
			<MobileMenuContainer visible={mobileNavVisible}>
				<MobileMenuList>
					{navLinks.map((linkData) => (
						<MobileMenuListItem key={linkData.to}>
							<MobileMenuNavLink
								to={linkData.to}
								exact={linkData.exact}
								onClick={() => setMobileNavVisible(false)}
							>
								{linkData.label}
							</MobileMenuNavLink>
						</MobileMenuListItem>
					))}
					<MobileMenuListItem>
						<MobileMenuNavLink
							to={props.location.pathname}
							onClick={() => setMobileNavVisible(false)}
						>
							close
						</MobileMenuNavLink>
					</MobileMenuListItem>
				</MobileMenuList>
			</MobileMenuContainer>
		</>
	)
}
