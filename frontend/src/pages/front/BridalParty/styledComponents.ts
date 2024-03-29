import styled from 'styled-components'

import { pageHeaders } from 'config/images'

export const Header = styled.div`
	height: 60vh;
	min-height: 400px;
	background-image: url(${pageHeaders.bridalParty});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: center;
`
export const HeaderContent = styled.div``
export const HeaderTitle = styled.h1`
	margin-top: 0px;
	margin-bottom: 0px;
	font-size: 5vw;
	color: #ffffff;
	line-height: 1.1;
	text-align: center;
	text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
	max-width: 60vw;

	@media only screen and (max-width: 800px) {
		font-size: 10vw;
	}
	@media only screen and (max-width: 500px) {
		font-size: 44px;
	}
`

export const PartyContainer = styled.div`
	padding-top: 100px;
`
export const PartyContent = styled.div`
	max-width: 1200px;
	margin: 0px auto;
	padding: 0px 30px;
`
export const PartyRow = styled.div`
	display: flex;
	justify-content: center;
`
export const PartyLeftColumn = styled.div`
	width: 50%;
	padding-right: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 30px;
`
export const PartyRightColumn = styled.div`
	width: 50%;
	padding-left: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 30px;
`
export const PartyImage = styled.img`
	width: 250px;
	height: 250px;
	display: block;
	border-radius: 50%;
	margin-bottom: 15px;

	@media only screen and (max-width: 900px) {
		width: 200px;
		height: 200px;
	}
	@media only screen and (max-width: 650px) {
		width: 150px;
		height: 150px;
	}
`
export const PartyName = styled.h3`
	font-size: 32px;
	margin-top: 0px;
	margin-bottom: 10px;
	line-height: 1.2;
	text-align: center;

	@media only screen and (max-width: 900px) {
		font-size: 28px;
	}
	@media only screen and (max-width: 650px) {
		font-size: 22px;
	}
`
export const PartyTitle = styled.h5`
	font-size: 22px;
	margin-top: 0px;
	margin-bottom: 15px;
	line-height: 1.25;
	text-align: center;

	@media only screen and (max-width: 900px) {
		font-size: 20px;
	}
	@media only screen and (max-width: 650px) {
		font-size: 16px;
	}
`
export const PartyCopy = styled.p`
	font-size: 16px;
	margin-top: 0px;
	margin-bottom: 0px;
	line-height: 1.5;
	text-align: center;
	max-width: 500px;
`
