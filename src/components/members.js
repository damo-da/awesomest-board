import React, {Component} from 'react';
import {connect} from 'react-redux';
import SingleMember from './members.single';
import axios from 'axios';
import C from '../constants';


export class MembersComponent extends Component{

  kickMember(member){
    const url = 'http://' + C.SERVER_IP + '/kill/' + member.userId;
    axios.post(url, {
      sess_token: this.props.sess_token
    })
      .then((x) => x.data)
      .then(x=>{
        alert(member.name + ' kicked from the system.');
      });
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
