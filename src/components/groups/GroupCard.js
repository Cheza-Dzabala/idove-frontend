import React from 'react';
import { Link } from 'react-router-dom';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';


export default ({ group }) => {
    // const [avatarCount, setAvatarCount] = useState(0);
    return (
        <div className="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
            <div className="ui-block" data-mh="friend-groups-item" style={{ height: '396px' }}>
                <div className="friend-item friend-groups">
                    <div className="friend-item-content">
                        <div className="more">
                            <svg className="olymp-three-dots-icon"><use href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                            <ul className="more-dropdown">
                                <li>
                                    <a href="#">Leave Group</a>
                                </li>
                                {
                                (group.is_admin) ? <li>
                                    <a href="#">Delete Group</a>
                                    </li> : ''
                                }
                                <li>
                                    <a href="#">Turn Off Notifications</a>
                                </li>
                            </ul>
                        </div>
                        <div className="friend-avatar">
                            <div className="author-thumb">
                                <img src={group.avatar} width="100%" height="100%" alt="photo" />
                            </div>
                            <div className="author-content">
                            <Link to={`/groups/${group.id}`} className="h5 author-name">{group.name}</Link>
                                <div className="country">{group.member_count} members in this group</div>
                            </div>
                        </div>

                        <ul className="friends-harmonic">
                        <AvatarGroup max={4}>
                            {
                                group.members.map(member =>
                                         <Avatar alt={member.first_name} src={member.avatar} />                                    
                                )
                            }
                        </AvatarGroup>
                        </ul>

                        <div className="control-block-button">
                            <a href="#" className="  btn btn-control bg-purple" data-toggle="modal" data-target="#create-friend-group-add-friends">
                                <svg className="olymp-happy-faces-icon"><use href="svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use></svg>
                            </a>

                            <a href="#" className="btn btn-control btn-grey-lighter">
                                <svg className="olymp-settings-icon"><use href="svg-icons/sprites/icons.svg#olymp-settings-icon"></use></svg>
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );
}