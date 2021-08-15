import React, { useEffect } from 'react'
import { Route, Switch, RouteChildrenProps } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

import { Navbar } from 'layout/front/Navbar'

import { Home } from 'pages/front/Home'
import { OurStory } from 'pages/front/OurStory'
import { BridalParty } from 'pages/front/BridalParty'
import { EventDetails } from 'pages/front/EventDetails'
import { Messages } from 'pages/front/Messages'

import { NotFound } from 'pages/front/NotFound'

import { MainPanel, FrontContentWrapper } from './styledComponents'
import { preloadImage } from 'helpers'
import { pageHeaders } from 'config/images'
import { SignIn } from 'pages/front/SignIn'

interface Props extends RouteChildrenProps {}
export const ContentWrapper: React.FC<Props> = (props) => {
	const { location } = props
	const transitions = useTransition(location, (location) => location.pathname, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		//This seems to remove the weird ability to scroll during page transition
		leave: { opacity: 0, position: 'fixed', width: '100%' },
		config: { mass: 10, friction: 60 },
	})

	//This is used to preload the front page headers.
	useEffect(() => {
		setTimeout(() => {
			const headerImages = Object.values(pageHeaders)
			for (let i = 0; i < headerImages.length; i++) {
				preloadImage(headerImages[i])
			}
		}, 1000)
	}, [])

	return (
		<MainPanel>
			<Navbar location={location} />
			<FrontContentWrapper>
				{transitions.map(({ item, props, key }) => (
					<animated.div key={key} style={props}>
						<Switch location={item}>
							<Route exact path='/' component={Home} />
							<Route path='/our-story' component={OurStory} />
							<Route path='/bridal-party' component={BridalParty} />
							<Route path='/event-details' component={EventDetails} />
							<Route path='/messages' component={Messages} />

							<Route path='/comeonover' component={SignIn} />

							<Route component={NotFound} />
						</Switch>
					</animated.div>
				))}
			</FrontContentWrapper>
		</MainPanel>
	)
}
