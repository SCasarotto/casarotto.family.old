import validate from 'validate.js'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useTEPopupsFunctions } from 'react-tec'

interface MessageData {
	name: string
	message?: string
	showMessage: string
	popupFunctions: useTEPopupsFunctions
}
export const saveMessage = async (data: MessageData) => {
	const { name, message, showMessage, popupFunctions } = data
	const { showNetworkActivity, hideNetworkActivity, showAlert } = popupFunctions

	const validatorConstraints: { [key: string]: any } = {
		name: {
			presence: {
				allowEmpty: false,
			},
		},
		message: {
			presence: {
				allowEmpty: false,
			},
		},
		showMessage: {
			presence: {
				allowEmpty: false,
			},
		},
	}
	const validationResponse = validate(data, validatorConstraints)
	if (validationResponse) {
		const valuesArray: any[][] = Object.values(validationResponse)
		const firstError: any[] = valuesArray[0]
		const firstErrorMessage: string = firstError[0]
		showAlert({
			title: 'Error',
			message: firstErrorMessage,
		})
		throw new Error(firstErrorMessage)
	}

	try {
		showNetworkActivity('Submitting Message...')
		await firebase
			.firestore()
			.collection('WeddingMessages')
			.add({
				dateCreated: new Date().getTime(),
				createdBy: name,
				message,
				showMessage: showMessage === 'Displayed publicly on the website.',
			})

		hideNetworkActivity()
		showAlert({
			title: 'Thank You!',
			message: 'Your Message has been submitted.',
		})
		return
	} catch (e) {
		console.log(e)
		showAlert({
			title: 'Error',
			message: 'Error submitting your message.',
		})
		throw new Error(e)
	}
}
