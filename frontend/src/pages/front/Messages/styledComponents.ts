import styled from 'styled-components'

import { pageHeaders } from 'config/images'
import { TEForm } from 'react-tec'

export const Header = styled.div`
	height: 60vh;
	min-height: 400px;
	background-image: url(${pageHeaders.rsvp});
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
		font-size: 8vw;
	}
	@media only screen and (max-width: 500px) {
		font-size: 44px;
	}
`

export const MessageSection = styled.div`
	padding-top: 50px;
	padding-bottom: 50px;
`
export const MessageContainer = styled.div`
	max-width: 1200px;
	margin: 0px auto;
	padding-left: 30px;
	padding-right: 30px;
`
export const MessageTitle = styled.h2`
	margin-top: 0px;
	margin-bottom: 10px;
	font-size: 36px;
	line-height: 1.2;
	color: ${(props) => props.theme.primary};
	text-align: center;

	@media only screen and (max-width: 1000px) {
		font-size: 32px;
	}
	@media only screen and (max-width: 800px) {
		font-size: 28px;
	}
	@media only screen and (max-width: 600px) {
		font-size: 32px;
	}
	@media only screen and (max-width: 450px) {
		font-size: 26px;
	}
`
export const MessageCopy = styled.p`
	font-size: 20px;
	line-height: 1.5;
	margin-top: 0px;
	margin-bottom: 30px;
	color: ${(props) => props.theme.darkerGray};
	text-align: center;
	max-width: 650px;
	margin-left: auto;
	margin-right: auto;

	@media only screen and (max-width: 1000px) {
		font-size: 18px;
	}
	@media only screen and (max-width: 800px) {
		font-size: 16px;
	}
	@media only screen and (max-width: 600px) {
		max-width: 450px;
	}
	@media only screen and (max-width: 450px) {
		font-size: 14px;
	}
`
export const MessageForm = styled(TEForm)`
	max-width: 840px;
	margin-left: auto;
	margin-right: auto;
`
export const MessageBoardWrapper = styled.div`
	padding: 30px 0px;
`
export const MessageBoardItem = styled.div`
	padding: 20px 0px;
	max-width: 800px;
	margin-left: auto;
	margin-right: auto;
`
export const MessageBoardMessage = styled.p`
	font-size: 18px;
	line-height: 1.5;
	margin-top: 0px;
	margin-bottom: 10px;
	color: ${(props) => props.theme.darkerGray};
	white-space: pre-line;

	@media only screen and (max-width: 1000px) {
		font-size: 16px;
	}
	@media only screen and (max-width: 800px) {
		font-size: 15px;
	}
	@media only screen and (max-width: 600px) {
		font-size: 14px;
	}
	@media only screen and (max-width: 450px) {
		font-size: 12px;
	}
`
export const MessageBoardName = styled.p`
	font-size: 22px;
	line-height: 1.5;
	margin-top: 0px;
	margin-bottom: 0px;
	color: ${(props) => props.theme.primary};
	text-align: right;
	font-weight: 700;

	@media only screen and (max-width: 1000px) {
		font-size: 20px;
	}
	@media only screen and (max-width: 800px) {
		font-size: 18px;
	}
	@media only screen and (max-width: 600px) {
		font-size: 16px;
	}
	@media only screen and (max-width: 450px) {
		font-size: 14px;
	}
`
/*

	Message Board section
		- Copy
		- Form Inputs
			- Name
			- Message
		- Message Board
			- Message Cell
			- Pagination
*/
