import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { UI } from './ui'
import { UIToggleButton } from 'system'
import { UIContext, PageViewContext, useModals } from 'components'
import { useActiveApp } from 'system'
import { getSystemConfig, getSystemStore, getSystemActions, useSystemState } from 'store'
import { redirect } from 'utils/location'
import './api'
import './apps'

/**
 * The Root Component
 */
const Assistant = () => {
	const { currentPageView } = getSystemConfig()
	const { isShowingUI, panelPosition, appFrameSize } = useSystemState()
	const {
		setIsShowingUI,
		togglePanelPosition,
		setPanelPosition,
		setIsShowingAppsMenu,
		setAppFrameSize,
	} = getSystemActions()
	const { activeApp, activeAppName, setActiveApp } = useActiveApp()

	const { renderModals, presentModal, dismissModal, presentNotification, modalExists } = useModals()

	// Create a toggle function to show/hide the panel
	const toggleIsShowingUI = () => isShowingUI ? setIsShowingUI( false ) : setIsShowingUI( true )

	const activateApp = name => {
		setActiveApp( name )
		dismissModal( 'fl-apps' )
		setIsShowingAppsMenu( false )
	}

	// Create a store-bound value object for UIContext.Provider
	const ui = {
		isShowingUI,
		setIsShowingUI,
		toggleIsShowingUI,

		activeApp,
		activeAppName,
		setActiveApp: activateApp,

		appFrameSize,
		setAppFrameSize,

		panelPosition,
		togglePanelPosition,
		setPanelPosition,

		presentModal,
		dismissModal,
		renderModals,
		modalExists,
		presentNotification,

		goToURL: redirect,
	}

	return (
		<Provider store={getSystemStore()}>
			<UIContext.Provider value={ui}>
				<PageViewContext.Provider value={currentPageView}>
					<UIToggleButton />
					<UI />
				</PageViewContext.Provider>
			</UIContext.Provider>
		</Provider>
	)
}

// Render App into the document
const root = document.createElement( 'div' )
root.classList.add( 'fl-asst' )
document.body.appendChild( root )

render( <Assistant />, root )
