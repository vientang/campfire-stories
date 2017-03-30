import React, { Component } from 'react';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import cookie from 'react-cookie'

import { getUsers, switchView, switchRoles, deleteUser } from 'actions/admin-actions'
import {  getContent } from 'actions/story-actions';
import { User, Story } from './components';

 /*
  * Component
  */
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount(){
    // show correct view
    this.handleSelect('users');
  }

  handleSelect(selectedTab) {
    this.props.switchScreen(selectedTab);
  }

  /*
   * Render
   */
  render (){
    if (!this.props.stories) {
      return (
        <div>loading...</div>
      );
    }

    // content
    const { stories, users, view } = this.props;

    // actions
    const { switchRoles, deleteUser } = this.props;

    // Change the child element format based on if it loads Stories or Users
    let childElements;
    if (view === 'users') {
      const currentUser = cookie.load('user');
      childElements = users
        .filter(user => (user._id !== currentUser._id))
        .map(user =>
          <User
            key={user._id}
            switchRoles={switchRoles}
            deleteUser={deleteUser}
            user={user}
          />
        );
    } else if (view === 'stories') {
      childElements = stories.map(story =>
        <Story key={story._id} story={story}/>
      );
    }

    return (
      <Grid className="section bg-white">
        <Row>
          <Col md={12} className="bottom-space">
            <Tabs defaultActiveKey="users" onSelect={this.handleSelect.bind(this)} id="tabs" justified>
              <Tab eventKey="users" title="USERS" bsClass="tab" />
              <Tab eventKey="stories" title="STORIES" />
            </Tabs>
            {childElements}
            {view === 'users' &&
              <Link to="/register"><i className="fa fa-user" aria-hidden="true" /></Link>
            }
          </Col>
        </Row>
    </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.content.adminUsers,
    stories: state.content.current,
    view: state.content.view
  }
}

const mapDispatchToProps = dispatch => ({
  switchScreen: view => {
    dispatch(view === 'users'
      ? getUsers()
      : getContent(1, 5)
    );
    dispatch(switchView(view));
  },
  switchRoles: id => dispatch(switchRoles(id)),
  deleteUser: id => dispatch(deleteUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);