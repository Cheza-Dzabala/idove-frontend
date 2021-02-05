import React from 'react';


export default () => {

    return (
        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="ui-block responsive-flex">
                <div className="ui-block-title">
                    <div className="h6 title">iDove Forums</div>
                    <form className="w-search">
                        <div className="form-group with-button is-empty">
                            <input className="form-control" type="text" placeholder="Search forums..." />
                            <button>
                                <svg className="olymp-magnifying-glass-icon"><use href="svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use></svg>
                            </button>
                            <span className="material-input"></span></div>
                    </form>
                </div>
            </div>
        </div>
    );
}