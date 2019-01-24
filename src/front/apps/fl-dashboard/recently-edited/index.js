import React, { useState } from 'react'
import { Separator, Widget, Tag, TagGroup, ContentList, PostListItem } from 'components'

export const RecentlyEditedWidget = props => {
    const [postType, setPostType] = useState('any')
    const recentQuery = {
        'posts_per_page' : 5,
    }
    if ( postType ) {
        recentQuery['post_type'] = postType
    }
    const isTagSelected = value => postType === value ? true : false
    return (
        <Widget title="Recently Edited" isPadded={false}>
            <div style={{ padding: '0 20px'}}>
                <TagGroup appearance="vibrant">
                    <Tag onClick={ () => setPostType('any')} isSelect={isTagSelected('any')}>Any Type</Tag>
                    <Tag onClick={ () => setPostType('post')} isSelect={isTagSelected('post')}>Posts</Tag>
                    <Tag onClick={ () => setPostType('page')} isSelect={isTagSelected('page')}>Pages</Tag>
                </TagGroup>
            </div>
            <ContentList
                query={recentQuery}
                item={<PostListItem />}
                containerClass='fl-asst-post-list'
                itemClass='fl-asst-post-list-item'
             />
        </Widget>
    )
}