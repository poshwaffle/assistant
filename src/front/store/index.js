import { useEffect, useState, useContext } from 'react'
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
import { applyEffects, composeEnhancers } from './middleware'
import * as reducers from './reducers'
import * as actions from './actions'
import { AppContext } from 'components'
import './testing'

const store = createStore( combineReducers( reducers ), {
	...( 'undefined' === typeof FL_ASSISTANT_INITIAL_STATE ? {} : FL_ASSISTANT_INITIAL_STATE ),
}, composeEnhancers( applyMiddleware( applyEffects ) ) )

/**
 * Custom hook for subscribing local state to changes
 * in the redux store. Returns the store's state object.
 */
export const useStore = () => {
	const [ state, setState ] = useState( store.getState() )
	useEffect( () => {
		setState( store.getState() )
		const unsubscribe = store.subscribe( () => setState( store.getState() ) )
		return () => unsubscribe()
	}, [] )
	return { ...state }
}

/**
 * Custom hook for accessing and updating state values defined
 * when an app is registered. These values persist between page
 * views as the app state is cached to local storage.
 */
export const useAppState = ( key ) => {
	const { appState } = useStore()
	const { app } = useContext( AppContext )
	if ( undefined === appState[ app ][ key ] ) {
		throw new Error( `Key '${ key }' not found on '${ app }' app state.` )
	}
	return [
		appState[ app ][ key ],
		newState => store.dispatch( actions.setAppState( app, key, newState ) )
	]
}

/**
 * Returns the main store object.
 */
export const getStore = () => {
	return store
}

/**
 * Returns an object with all actions bound to dispatch.
 */
export const getDispatch = () => {
	return bindActionCreators( actions, store.dispatch )
}

/**
 * Returns the global config object.
 */
export const getConfig = () => {
	return { ...FL_ASSISTANT_CONFIG }
}
