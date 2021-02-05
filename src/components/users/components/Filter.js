import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';


export default () => {
    const { filterUsers } = useContext(UserContext);

    return (
        <div className="container">
            <div className="row">
                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="ui-block responsive-flex">
                        <div className="ui-block-title">
                            <div className="h6 title">Search iDovers</div>
                            <span className="w-search">
                                <div className="form-group with-button">
                                    <input className="form-control" type="text" placeholder="Search iDovers..."
                                        onChange={({ target: { value } }) => filterUsers(value)} />
                                    <button>
                                        <svg className="olymp-magnifying-glass-icon"><use href="/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use></svg>
                                    </button>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}