import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useStore } from 'store'
import { useWindowSize } from 'utils/window'

export const useAppFrame = () => {
	const { panelPosition, apps, activeApp } = useStore()
	const { width: windowWidth, height: windowHeight } = useWindowSize()
	const app = apps[ activeApp ]
	const [ sizeName, setSizeName ] = useState( 'undefined' !== typeof app ? app.size : 'TEST' )

	const setAppFrameSize = name => {
		setSizeName( name )
	}

	const normalPreferredWidth = 440
	const widePreferredWidth = 720
	let frameWidth = 0
	let frameHeight = '100vh'

	if ( 'wide' === sizeName ) {
		frameWidth = widePreferredWidth > ( windowWidth * .8 ) ? windowWidth : widePreferredWidth
	} else if ( 'full' === sizeName ) {
		frameWidth = '100vw'
	} else {
		frameWidth = normalPreferredWidth > ( windowWidth * .6 ) ? windowWidth : normalPreferredWidth
	}

	return {
		appFrame: {
			width: frameWidth,
			height: frameHeight,
			sizeName,
			alignment: panelPosition,
		},
		setAppFrameSize,
	}
}

export const AppFrame = ({ children }) => {
	const { isShowingUI } = useStore()
	const { appFrame } = useAppFrame()
	const { width, height, alignment } = appFrame
	const { width: windowWidth, height: windowHeight } = useWindowSize()

	const [ springProps, set ] = useSpring( () => {

		const values = {
			width,
			height,
			borderLeft: '1px solid var(--fl-line-color)',
			transform: 'translateX( 0% )',
			right:0,
		}
		return values
	})

	const transform = () => {
		if ( isShowingUI ) {
			return 'translateX( 0% )'
		} else {
			if ( 'end' === alignment ) {
				return 'translateX( 100% )'
			} else {
				return 'translateX( -100% )'
			}
		}
	}

	const springState = () => {
		return {
			width,
			height,
			right: 'end' === alignment ? 0 : windowWidth - width,
			transform: transform()
		}
	}

	set( springState() )

	const styles = {
		position: 'fixed',
		top: 0,
		zIndex: 999999,
		boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.1)',
		...springProps
	}

	return (
		<animated.div style={styles}>{children}</animated.div>
	)
}
