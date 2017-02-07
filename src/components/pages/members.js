import React, {Component} from 'react';
import {connect} from 'react-redux';
import SingleMember from './members.single';


//the whole page
class MembersPage extends Component{

  kickMember(member){
    console.log("kicking", member.name);
    alert("Kicking "+ member.name);
  }

  render(){
    const currentUser = this.props.members.find((x) => x.id === this.props.currentUserId);

    const members = this.props.members.map((member) => {
        return <SingleMember key={member.id} member={member} currentUser={currentUser} onKick={this.kickMember.bind(this, member)}/>;
    });
    return (
      <div>
        <h1>Members</h1>
        {members}
      </div>
    )

  }
}

const mapStateToProps = (state) => state.user;

export default connect(
  mapStateToProps
)(MembersPage);
