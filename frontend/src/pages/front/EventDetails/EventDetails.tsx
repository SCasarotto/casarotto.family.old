import {
	Header,
	HeaderContent,
	HeaderTitle,
	LocationSection,
	LocationContainer,
	LocationLogoWrapper,
	LocationLogo,
	LocationContent,
	LocationTitle,
	LocationCopy,
	LocationLink,
	TimelineSection,
	TimelineContainer,
	TimelineLine,
	TimelineRow,
	TimelineLeftColumn,
	TimelineCenterColumn,
	TimelineRightColumn,
	TimelineTimeTitle,
	TimelineDot,
	TimelineDotIconWrapper,
	TimelineRowTitle,
	TimelineRowCopy,
} from './styledComponents'
import { PageWrapper } from 'components'
import { eventDetails } from 'config/images'
import { FaHeart, FaHotel, FaBus, FaCocktail, FaMusic } from 'react-icons/fa'

const timelineData = [
	{
		time: '3:00pm',
		title: 'Hotel Check-In',
		copy: (
			<>
				Freshen up and get ready for the big day.
				<br />
				See Information Below
			</>
		),
		Icon: FaHotel,
	},
	{
		time: (
			<>
				3:30pm
				<br />
				4:00pm
			</>
		),
		title: 'Shuttle Pick-Up',
		copy: "Hop a bus ride from the Hampton Inn to the venue so you don't have to drive.",
		Icon: FaBus,
	},
	{
		time: '4:30pm',
		title: 'Ceremony',
		copy: 'Make yourselves comfortable and join us for our special moment.',
		Icon: FaHeart,
	},
	{
		time: '5:00pm',
		title: 'Cocktail Hour',
		copy: 'Kick off the celebration and grab a drink.',
		Icon: FaCocktail,
	},
	{
		time: '6:00pm',
		title: 'Reception',
		copy: 'Join us for dinner, drinks, speeches, and dancing.',
		Icon: FaMusic,
	},
	{
		time: (
			<>
				9:30pm
				<br />
				10:30pm
				<br />
				11:30pm
			</>
		),
		title: 'Shuttle Return',
		copy: 'After celebrating all night long, our bus service will drive you back safely.',
		Icon: FaBus,
	},
]

export const EventDetails = () => {
	return (
		<PageWrapper>
			<Header>
				<HeaderContent>
					<HeaderTitle>Be our guest</HeaderTitle>
				</HeaderContent>
			</Header>
			<LocationSection>
				<LocationContainer>
					<LocationLogoWrapper>
						<LocationLogo src={eventDetails.dcEstate} alt='DC Estate Winery' />
					</LocationLogoWrapper>
					<LocationContent>
						<LocationTitle>Ceremony and Reception</LocationTitle>
						<LocationCopy>
							Please join us on Saturday, July 10th 2021 at DC Estate Winery 8877
							State Line Rd, South Beloit, IL 61080.
						</LocationCopy>
						<LocationLink
							href='https://www.dcestatewinery.com/'
							target='_blank'
							rel='noopener noreferrer'
						>
							The Venue
						</LocationLink>
						<LocationLink
							href='https://goo.gl/maps/sBhZoX6aWFAzH65E9'
							target='_blank'
							rel='noopener noreferrer'
						>
							Directions
						</LocationLink>
					</LocationContent>
				</LocationContainer>
			</LocationSection>
			<TimelineSection>
				<TimelineContainer>
					<TimelineLine />
					{timelineData.map((row, index) => {
						const { time, title, copy, Icon } = row
						return (
							<TimelineRow key={index}>
								<TimelineLeftColumn>
									{index % 2 === 0 && (
										<TimelineTimeTitle rightAlign>{time}</TimelineTimeTitle>
									)}
									{index % 2 === 1 && (
										<>
											<TimelineTimeTitle mobile>{time}</TimelineTimeTitle>
											<TimelineRowTitle>{title}</TimelineRowTitle>
											<TimelineRowCopy>{copy}</TimelineRowCopy>
										</>
									)}
								</TimelineLeftColumn>
								<TimelineCenterColumn>
									<TimelineDot>
										<TimelineDotIconWrapper>
											<Icon />
										</TimelineDotIconWrapper>
									</TimelineDot>
								</TimelineCenterColumn>
								<TimelineRightColumn>
									{index % 2 === 1 && (
										<TimelineTimeTitle>{time}</TimelineTimeTitle>
									)}
									{index % 2 === 0 && (
										<>
											<TimelineTimeTitle mobile>{time}</TimelineTimeTitle>
											<TimelineRowTitle>{title}</TimelineRowTitle>
											<TimelineRowCopy>{copy}</TimelineRowCopy>
										</>
									)}
								</TimelineRightColumn>
							</TimelineRow>
						)
					})}
				</TimelineContainer>
			</TimelineSection>
		</PageWrapper>
	)
}
