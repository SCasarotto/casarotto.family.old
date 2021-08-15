import firebase from 'firebase/app'
import 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Message } from 'interfaces'
import { collectionToDataArray } from 'helpers'

export const useMessages = () => {
	const [messageArray, setMessageArray] = useState<Message[]>([])

	useEffect(() => {
		const messagesWatcher = firebase
			.firestore()
			.collection('WeddingMessages')
			.where('showMessage', '==', true)
			.onSnapshot(
				(snapshot) => {
					setMessageArray(
						collectionToDataArray(snapshot).sort(
							(a: Message, b: Message) => b.dateCreated - a.dateCreated,
						),
					)
				},
				(e) => {
					console.log(e)
					setMessageArray([])
				},
			)

		return () => {
			messagesWatcher()
			setMessageArray([])
		}
	}, [])

	return { messageArray }
}
