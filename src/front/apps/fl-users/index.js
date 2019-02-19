import React, { Fragment, useState } from 'react'
import { useDispatch } from 'store'
import { UserList, UserListFilter, ScreenHeader } from 'components'

const { registerApp } = useDispatch()

export const UsersTab = () => {
	const [ query, setQuery ] = useState( 'query', null )
	return (
		<Fragment>
			<ScreenHeader>
				<UserListFilter
					appStateKey='user-filter'
					onChange={ setQuery }
				/>
			</ScreenHeader>
			<UserList
				appStateKey='user-list'
				query={ query }
				pagination={ true }
			/>
		</Fragment>
	)
}

registerApp( 'fl-users', {
	label: 'Users',
	content: () => <UsersTab />,
} )
