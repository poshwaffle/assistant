import React, { Fragment, useContext } from 'react'
import { useAppState, getSystemActions } from 'store'
import { PostList, ScreenHeader, StackContext } from 'components'
import { AppMenu } from 'system'
import { PostListFilter } from './filter'
import { MenuContent } from './menu'

const { registerApp } = getSystemActions()

export const App = () => {
	const { filter, query } = useAppState()
	const stack = useContext( StackContext )

	return (
		<Fragment>
			<ScreenHeader>
				<PostListFilter />
			</ScreenHeader>
			<PostList
				type={ filter.type }
				query={ query }
				pagination={ true }
			/>
			<AppMenu title="Filter Content">
				<MenuContent appStackContext={stack} />
			</AppMenu>
		</Fragment>
	)
}

export const AppIcon = () => {
	return (
		<svg width="29px" height="24px" viewBox="0 0 29 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<g fill="transparent" transform="translate(-145.000000, -145.000000)" fillRule="nonzero" strokeWidth="2" stroke="currentColor">
				<circle cx="158.5" cy="155.5" r="5.5"></circle>
				<path d="M172.014075,163 L172.014075,148 C172.014075,146.895431 171.118644,146 170.014075,146 L148,146 C146.895431,146 146,146.895431 146,148 L146,165.010842 C146,166.115411 146.895431,167.010842 148,167.010842 L170.014075,167.010842 L162.5,159.5" strokeLinecap="round" strokeLinejoin="round"></path>
			</g>
		</svg>
	)
}

registerApp( 'fl-find', {
	label: 'Content',
	content: props => <App {...props} />,
	icon: props => <AppIcon {...props} />,
	state: {
		query: null,
		filter: {
			type: 'posts',
			subType: 'page',
			date: '',
			status: 'publish',
		},
	},
} )
