import React from 'react';


export default ({members}) => {
    console.log(members);
    return (
       <aside className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
            <div class="ui-block">
				<div class="ui-block-title">
					<h6 class="title">Member List</h6>
					<a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="#olymp-three-dots-icon"></use></svg></a>
				</div>		
				<ul class="widget w-activity-feed notification-list">
                    {
                        members.map(member => (
                            <li>
                            <div class="author-thumb">
                                <img src={member.user.avatar} alt="author" />
                            </div>
                            <div class="notification-event">
                            <a href="#" class="h6 notification-friend">{member.user.full_name}</a>
                                <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">2 mins ago</time></span>
                            </div>
                        </li>
                        ))
                    }
				
				</ul>
			</div>
       </aside>
      
    );
}