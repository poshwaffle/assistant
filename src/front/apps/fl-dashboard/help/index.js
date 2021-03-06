import React, { Fragment, useContext } from 'react'
import { getSystemConfig, useSystemState } from 'store'
import {
	Padding,
	Heading,
	Branding,
	Tabs,
	Icon,
	Button,
	UIContext,
} from 'components'
import { render } from 'utils/react'
import './style.scss'

export const Help = ( { collapse } ) => {
	const { currentUser } = getSystemConfig()
	const { apps } = useSystemState()
	const half = 'calc( var(--fl-asst-base-padding) / 2 )'

	const tabs = [
		{
			label: 'Dashboard',
			icon: render( apps['fl-dashboard'].icon ),
			content: (
				<Fragment>
					<Heading>Dashboard</Heading>
					<div>The Dashboard app gives you a glance at what's happening across your website.</div>
					<Button
						onClick={collapse}
						style={{ margin: '15px 0 0' }}
					>Show Dashboard</Button>
				</Fragment>
			),
		},
		{
			label: 'Content',
			icon: render( apps['fl-find'].icon ),
			content: (
				<Fragment>
					<Heading>Content</Heading>
					<div>The Content app helps you find and navigate between various types of pages.</div>
					<GoToApp id="fl-find">Go To Content App</GoToApp>
				</Fragment>
			),
		},
		{
			label: 'Media',
			icon: render( apps['fl-media'].icon ),
			content: (
				<Fragment>
					<Heading>Media</Heading>
					<div>In the Media app you can find items you've uploaded to the media library. Drop new items on the app to upload.</div>
					<GoToApp id="fl-media">Go To Media App</GoToApp>
				</Fragment>
			),
		},
		{
			label: 'Users',
			icon: render( apps['fl-users'].icon ),
			content: (
				<Fragment>
					<Heading>Users</Heading>
					<div>The Users app gives you access to your user profile as well as the other user accounts on your site.</div>
					<GoToApp id="fl-users">Go To Users App</GoToApp>
				</Fragment>
			),
		},
		{
			label: 'Apps',
			icon: <Icon name="apps-app" />,
			content: (
				<Fragment>
					<Heading>Apps Menu</Heading>
					<div>The Apps menu gives you access to any other apps you may have installed as well as user preferences.</div>
				</Fragment>
			),
		},
		{
			label: 'Notifications',
			icon: render( apps['fl-notifications'].icon ),
			content: (
				<Fragment>
					<Heading>Notifications</Heading>
					<div>The Notifications App displays alerts that require your attention like comments and theme or plugin updates.</div>
					<GoToApp id="fl-notifications">Go To Notifications</GoToApp>
				</Fragment>
			),
		},
	]

	return (
		<Fragment>
			<ToolbarLabels />
			<Padding bottom={half}>
				<BrandIcon />
				<Heading level={1}>{`Welcome, ${currentUser.name}`}</Heading>
				<p style={{margin: 0}}>Assistant provides apps to help you navigate and manage your WordPress website. You can learn about these apps below.</p>
			</Padding>
			<Padding top={false} left={half} right={half}>
				<Tabs tabs={tabs} />
			</Padding>
		</Fragment>
	)
}

const GoToApp = ( { id, children } ) => {
	const { setActiveApp } = useContext( UIContext )
	const click = () => setActiveApp( id )
	return (
		<Button
			onClick={click}
			style={{ margin: '15px 0 0' }}
		>{children}</Button>
	)
}

const BrandIcon = () => {
	const styles = {
		width: 68,
		height: 63,
		borderRadius: 10,
		background: 'var(--fl-utility-background-color)',
		boxShadow: '0px 1px 2px rgba( 0, 0, 0, .2 )',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 'calc( var(--fl-asst-base-padding) / 2 )'
	}
	return (
		<div style={styles}>
			<Branding size={50} />
		</div>
	)
}

const ToolbarLabels = () => {

	const noteStyles = {
		flex: '1 1 auto'
	}

	const hideStyles = {
		display: 'flex',
		justifyContent: 'flex-end',
		flex: '1 1 auto',
		paddingRight: 8,
	}
	const more = {
		flex: '1 1 auto',
		display: 'flex',
		justifyItems: 'center',
		paddingLeft: 4,
	}

	return (
		<div className="fl-asst-toolbar-labels">
			<div className="fl-asst-toolbar-label-cell" style={noteStyles}>Notifications</div>

			<div className="fl-asst-toolbar-label-center">
				<div className="fl-asst-toolbar-label-center-wrap">
					<div className="fl-asst-toolbar-label-cell fl-asst-toolbar-label-cell-apps">
						<span>Apps</span>
					</div>
					<div className="fl-asst-toolbar-label-cell" style={more}>More</div>
				</div>
			</div>

			<div className="fl-asst-toolbar-label-cell" style={hideStyles}>Hide</div>
		</div>
	)
}
