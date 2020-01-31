import React, { Component } from 'react'

export default class Search extends Component {
  render() {
    return (
      <div><form className="search-bar w-search notification-list friend-requests">
        <div className="form-group with-button">
          <input className="form-control js-user-search" placeholder="Search here people or pages..." type="text" />
          <button>
            <svg className="olymp-magnifying-glass-icon"><use href="svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use></svg>
          </button>
        </div>
      </form>
      </div>
    )
  }
}
