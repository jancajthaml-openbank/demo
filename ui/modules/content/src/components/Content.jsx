import React from 'react';

import { Module } from '@lastui/rocker/platform';

// https://bulmatemplates.github.io/bulma-templates/templates/inbox.html

const Content = () => {
	return (
    	<div className="columns">
	        <aside className="column is-2 aside hero is-fullheight">
	            <div>
	                <div className="compose has-text-centered">
	                    <a className="button is-danger is-block is-bold">
	            			<span className="compose">Compose</span>
	          			</a>
	                </div>
	                <div className="main">
	                    <a href="#" className="item active"><span className="icon"><i className="fa fa-inbox"></i></span><span className="name">Inbox</span></a>
	                    <a href="#" className="item"><span className="icon"><i className="fa fa-star"></i></span><span className="name">Starred</span></a>
	                    <a href="#" className="item"><span className="icon"><i className="fa fa-envelope-o"></i></span><span className="name">Sent Mail</span></a>
	                    <a href="#" className="item"><span className="icon"><i className="fa fa-folder-o"></i></span><span className="name">Folders</span></a>
	                </div>
	            </div>
	        </aside>
	        <div className="column is-4 messages hero is-fullheight" id="message-feed">
	            <div className="action-buttons">
	                <div className="control is-grouped">
	                    <a className="button is-small"><i className="fa fa-chevron-down"></i></a>
	                    <a className="button is-small"><i className="fa fa-refresh"></i></a>
	                </div>
	                <div className="control is-grouped">
	                    <a className="button is-small"><i className="fa fa-inbox"></i></a>
	                    <a className="button is-small"><i className="fa fa-exclamation-circle"></i></a>
	                    <a className="button is-small"><i className="fa fa-trash-o"></i></a>
	                </div>
	                <div className="control is-grouped">
	                    <a className="button is-small"><i className="fa fa-folder"></i></a>
	                    <a className="button is-small"><i className="fa fa-tag"></i></a>
	                </div>
	                <div className="control is-grouped pg">
	                    <div className="title">1-2 of 3</div>
	                    <a className="button is-link"><i className="fa fa-chevron-left"></i></a>
	                    <a className="button is-link"><i className="fa fa-chevron-right"></i></a>
	                </div>
	            </div>

	            <div className="inbox-messages" id="inbox-messages">
	                <div className="card">
	                    <div className="card-content">
	                        <div className="msg-header">
	                            <span className="msg-from"><small>From: Doe</small></span>
	                            <span className="msg-timestamp"></span>
	                            <span className="msg-attachment"><i className="fa fa-paperclip"></i></span>
	                        </div>
	                        <div className="msg-subject">
	                            <span className="msg-subject"><strong id="fake-subject-1">subject</strong></span>
	                        </div>
	                        <div className="msg-snippet">
	                            <p id="fake-snippet-1">snippet</p>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div className="column is-6 message hero is-fullheight is-hidden" id="message-pane">
	            <div className="action-buttons">
	                <div className="control is-grouped">
	                    <a className="button is-small"><i className="fa fa-inbox"></i></a>
	                    <a className="button is-small"><i className="fa fa-exclamation-circle"></i></a>
	                    <a className="button is-small"><i className="fa fa-trash-o"></i></a>
	                </div>
	                <div className="control is-grouped">
	                    <a className="button is-small"><i className="fa fa-exclamation-circle"></i></a>
	                    <a className="button is-small"><i className="fa fa-trash-o"></i></a>
	                </div>
	                <div className="control is-grouped">
	                    <a className="button is-small"><i className="fa fa-folder"></i></a>
	                    <a className="button is-small"><i className="fa fa-tag"></i></a>
	                </div>
	            </div>
	            <div className="box message-preview">
	                <div className="top">
	                    <div className="avatar">
	                        <img src="https://placehold.it/128x128" />
	                    </div>
	                    <div className="address">
	                        <div className="name">John Smith</div>
	                        <div className="email">someone@gmail.com</div>
	                    </div>
	                    <hr />
	                    <div className="content">
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	);
}

export default Content;