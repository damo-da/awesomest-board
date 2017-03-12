import React, {Component} from 'react';
import {connect} from 'react-redux';
import SingleMember from './members.single';

export class MembersComponent extends Component{

  kickMember(member){
    alert('Kicking '+ member.name);
  }

  render(){
    const currentUser = this.props.members.find((x) => x.userId === this.props.currentUserId);

    const members = this.props.members.map((member) => {
        return <SingleMember
          key={member.id}
          member={member}
          currentUser={currentUser}
          onKick={this.kickMember.bind(this, member)}/>;
    });
    return (
      <div className="members-component">
        {members}
      </div>
    )

  }
}

const mapStateToProps = (state) => state.user;

export default connect(
  mapStateToProps
)(MembersComponent);
