import React, { useState } from 'react'
import { TEInputRow, TETextareaRow, TEButton, useTEPopups, TESegmentedGroup } from 'react-tec'

import { PageWrapper } from 'components'

import {
	Header,
	HeaderContent,
	HeaderTitle,
	MessageSection,
	MessageContainer,
	MessageTitle,
	MessageCopy,
	MessageForm,
	MessageBoardWrapper,
	MessageBoardItem,
	MessageBoardMessage,
	MessageBoardName,
} from './styledComponents'
import { saveMessage } from './requests'
import { useMessages } from './hooks'

export const Messages = () => {
	const popupFunctions = useTEPopups()
	const { messageArray } = useMessages()

	const [messageName, setMessageName] = useState('')
	const [messageMessage, setMessageMessage] = useState('')
	const [showMessage, setShowMessage] = useState('Displayed publicly on the website.')

	const handleSubmitMessgae = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const data = {
				name: messageName,
				message: messageMessage,
				showMessage,
				popupFunctions,
			}
			await saveMessage(data)
			setMessageName('')
			setMessageMessage('')
			setShowMessage('Displayed publicly on the website.')
		} catch (e) {
			console.log(e)
			alert(
				'An error occured while attempting to submit your message. If this continues to occur reach out to Stuart or Courtney. Thanks!',
			)
		}
	}

	return (
		<PageWrapper>
			<Header>
				<HeaderContent>
					<HeaderTitle>Messages</HeaderTitle>
				</HeaderContent>
			</Header>
			<MessageSection>
				<MessageContainer>
					<MessageTitle>Leave Us A Message</MessageTitle>
					<MessageCopy>
						We would love to hear from you before or after the wedding.
					</MessageCopy>
					<MessageForm onSubmit={handleSubmitMessgae}>
						<TEInputRow
							labelForKey='measageName'
							title='Name'
							value={messageName}
							onChange={(e) => setMessageName(e.target.value)}
							required
						/>
						<TETextareaRow
							labelForKey='messageMessage'
							title='Message'
							value={messageMessage}
							onChange={(e) => setMessageMessage(e.target.value)}
							required
						/>
						<TESegmentedGroup
							labelForKey='editPublic'
							title='I would like my message:'
							buttonArray={[
								'Displayed publicly on the website.',
								'Sent privately to the couple.',
							]}
							checkedValue={showMessage}
							onChange={(e) => setShowMessage(e.target.value)}
							required
						/>
						<TEButton type='submit'>Submit</TEButton>
					</MessageForm>
					<MessageBoardWrapper>
						{messageArray &&
							messageArray.map((m) => {
								const { uid, createdBy, message } = m
								return (
									<MessageBoardItem key={uid}>
										<MessageBoardMessage>{message}</MessageBoardMessage>
										<MessageBoardName>{createdBy}</MessageBoardName>
									</MessageBoardItem>
								)
							})}
					</MessageBoardWrapper>
				</MessageContainer>
			</MessageSection>
		</PageWrapper>
	)
}
