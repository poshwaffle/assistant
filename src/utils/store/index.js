import { useEffect, useState } from 'react'
import { createStore, bindActionCreators } from 'redux'
import { createActions } from './actions'
import { createReducers } from './reducers'
import { createEnhancers } from './middleware'

/**
 * The main registry object. Holds all stores and actions
 * that have been registered.
 */
const registry = {}

/**
  * Addes a new store to the registry.
  *
  * Actions and reducers are optional! If you do not provide
  * an action or reducer for a state key, a setter will be
  * generated for you.
  */
export const registerStore = ( key, {
	state = {},
	actions = {},
	reducers = {},
	effects = {},
} ) => {

	if ( ! key ) {
		throw new Error( 'Missing key required for registerStore.' )
	} else if ( registry[ key ] ) {
		throw new Error( `A store with the key '${ key }' already exists.` )
	}

	registry[ key ] = {
		actions: createActions( actions, reducers, state ),
		store: createStore(
			createReducers( reducers, state ),
			state,
			createEnhancers( key, effects )
		)
	}
}

/**
 * Custom hook for subscribing local state to changes
 * in a registry store. Returns the store's state object.
 */
export const useStore = ( key ) => {
	const { store } = registry[ key ]
	const [ state, setState ] = useState( store.getState() )
	useEffect( () => {
		setState( store.getState() )
		const unsubscribe = store.subscribe( () => setState( store.getState() ) )
		return () => unsubscribe()
	}, [] )
	return { ...state }
}

/**
 * Returns the main object for a store in the registry.
 */
export const getStore = ( key ) => {
	const { store } = registry[ key ]
	return store
}

/**
 * Returns an object with all actions bound to dispatch
 * for a store in the registry.
 */
export const getDispatch = ( key ) => {
	const { actions, store } = registry[ key ]
	return bindActionCreators( actions, store.dispatch )
}
