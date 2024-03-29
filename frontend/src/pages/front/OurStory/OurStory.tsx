import React from 'react'

import {
	Header,
	HeaderContent,
	HeaderTitle,
	GallerySection,
	GalleryContainer,
	GalleryRow,
	CopyWrapper,
	CopyTitle,
	CopySubtitle,
	Copy,
} from './styledComponents'
import { PageWrapper, Gallery } from 'components'
import {
	processedImages,
	howWeMetImages,
	datingThroughTheYearsImages,
	proposalEngagementImages,
} from 'config/images'

export const OurStory = () => {
	return (
		<PageWrapper>
			<Header>
				<HeaderContent>
					<HeaderTitle>How it all started</HeaderTitle>
				</HeaderContent>
			</Header>
			<GallerySection>
				<GalleryContainer>
					<GalleryRow>
						<CopyWrapper>
							<CopyTitle>How We Met</CopyTitle>
							<Copy>
								In April 2013, Courtney was a freshman and was buying lunch at the
								Augustana College Center and waiting in line minding her own
								business. When out of the blue, this guy behind her, our lovable
								Stuart complimented her on a dress that she was wearing. When a
								normal person would say thank you and go about her day without
								thinking twice about it, Courtney was pleasantly surprised by a
								random person saying something nice just because. She said thank you
								and asked for his name, where Stuart then was equally surprised that
								this compliment conversation was still going. After introducing
								themselves and a kind smile, they went on with their day not knowing
								that they met their life best friend.
							</Copy>
							<Copy>
								To put of funny twist on the situation, one of Courtney’s sorority
								sisters, Melanie, who was high school friends with Stuart, was
								standing in line behind him and saw the whole interaction take
								place. She teased him by saying “She’s a little young for you…”.
								Poor Stuart then went on to say “I wasn’t hitting on her! I just
								thought that she should know that she looked very nice and people
								should know that”. Then out of left field, the checkout lady in the
								lunch line chimed in and said, “It definitely looked like you were
								hitting on her”. What started out as an honest and simple
								compliment, turned out to be something that Courtney did not forget.
								But it wasn't until later that summer that their paths crossed
								again.
							</Copy>
							<Copy>
								In July 2013, Courtney returned to Augie to be a Camp Kesem
								counselor. Courtney’s friend, sorority sister, and fellow Camp Kesem
								counselor, Kelsey, said that one of her good friends just got a new
								kitten and we HAD to go over and see it. The good friend turned out
								to be that same guy who Courtney remembered from the lunch line, and
								Courtney was super excited. After hanging out and playing with baby
								Joni (our current cat), Courtney went off to Camp Kesem, and Stuart
								was asking about who that girl was.
							</Copy>
							<Copy>
								After connecting on the oh so romantic Facebook after camp, Courtney
								and Stuart spent hours messaging back and forth and texting. But
								only as friends of course :) After 3 months of almost dating, to
								just being friends, to just kidding we should date, to nah maybe we
								will just be friends (cough cough Courtney will take the blame on
								this one for taking so long!), Courtney and Stuart made it official
								on October 23rd, 2013 and started dating. So the adventure began!
							</Copy>
						</CopyWrapper>
						<Gallery pageSize={12} images={howWeMetImages} altPrefix='How We Met' />
					</GalleryRow>
					<GalleryRow>
						<CopyWrapper>
							<CopyTitle>Through The Years</CopyTitle>
							<Copy>
								We have been through lots of adventures together while dating. We
								were fortunate to have 1 year together at Augie, but there was a
								solid chunk of our relationship that we toughed through the long
								distance.
							</Copy>
							<Copy>
								While Courtney stayed at Augie for her junior and senior year,
								Stuart initially started graduate school at Boulder University. But
								when medical needs with his hip kicked in during his first semester
								and he had to return home, Stuart ended up down the path of starting
								his company, 38th Street Studios. Courtney was happy to have Stuart
								back in Illinois, but the long distance continued as she pursued
								graduate school at Eastern Illinois University.
							</Copy>
							<Copy>
								After 4 years of long distance dating with phone calls, Skype dates,
								and weekend visits, we got an apartment together in Lincoln Park
								while Courtney completed her final clinical internship at the
								Shirley Ryan AbilityLab in the Spring of 2018. We made our studio
								apartment our own with lots of love and creative furniture layouts!
								In many ways, Lincoln Park was a new chapter in our relationship
								with a place we could call our own and end the period of long
								distance dating.
							</Copy>
							<Copy>
								In August 2018, we ended up shifting to a 2 bedroom apartment with
								Stu’s sister, Blair. Living with Blair was an amazing chance for us
								to all get close while we were all chasing down our early careers in
								Chicago. Then come October 2018, our relationship would take the
								next step with our engagement!
							</Copy>
						</CopyWrapper>
						<Gallery
							pageSize={12}
							images={datingThroughTheYearsImages}
							altPrefix='Through The Years'
						/>
					</GalleryRow>
					<GalleryRow>
						<CopyWrapper>
							<CopyTitle>The Proposal</CopyTitle>
							<CopySubtitle>As written by the surprised fiancé</CopySubtitle>
							<Copy>
								What started as a fun weekend plan with good friends visiting,
								turned out to be one of my biggest surprises and exciting days that
								I could ever ask for.
							</Copy>
							<Copy>
								I was told that Hayden and Forrest Wilsey would be staying with us
								for the weekend and that Forrest needed to get some Chicago footage
								for a work project he was working on. I was so excited to see good
								friends and visit some of our favorite Chicago sites. So Blair, Stu,
								Hayden, Forrest and I started off with some yummy brunch at one of
								our favorite places followed by checking out places like Millennium
								Park, Jay Pritzker Pavilion, the Lurie gardens, and walking near the
								lake. While we ran around the city having such a fun day, Forrest
								was capturing so many moments “for work” but also of all the little
								moments and fun.
							</Copy>
							<Copy>
								As the day is coming to a close, of course we make a pit stop to
								Lincoln Park, where our relationship experienced so many firsts and
								big moments. As we are walking on the South Pond Park bridge (aka
								one of my favorite places on earth) Stuart takes Courtney to look at
								the skyline. Stuart then leans over and breaks the news, that our
								friends were not here to hang out with us for work, but instead we
								were here to bring our journey full circle. And with big surprise in
								my face, Stuart gets down on one knee and asks me to marry him and
								of course I say yes with the biggest smile on my face!
							</Copy>
							<Copy>
								Not only was being asked to spend the rest of my life with my best
								friend enough to make my day, I was surprised by dinner party at one
								of our favorite sushi restaurants near our old apartment with our
								families and some close friends. I could not be more thankful for
								all the love that we have in our life. We are so excited to be
								moving forward together as partners for life.
							</Copy>
						</CopyWrapper>
						<Gallery
							pageSize={12}
							images={[...proposalEngagementImages, ...processedImages]}
							altPrefix='The Proposal'
						/>
					</GalleryRow>
				</GalleryContainer>
			</GallerySection>
		</PageWrapper>
	)
}
