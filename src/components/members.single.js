import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import {blue300, green300} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  chip: {
    display: 'inline',
    margin: 4,
    padding: 4
  }
};

//a single member
export default class SingleMember extends Component{
  constructor(props){
    super(props);


  }

  getSubtitle(){
    if (this.props.member.admin)return 'ADMIN';

    return 'Member';
  }
  componentWillMount(){
  }
  isKickable(){
    const member = this.props.member;

    if (!this.props.currentUser.admin) return false; //self is not admin. can not kick anyone

    if(member.admin)return false;//can not kick admin

    if(this.props.currentUser.id == member.id)return false; //can not kick self

    return true;
  }

  render() {
    return <div>
      <Card>
        <CardHeader
          title={this.props.member.name}>

          {/*current user chip*/}
          {this.props.currentUser.userId === this.props.member.userId &&
          <Chip
            style={styles.chip} backgroundColor={green300}>
            YOU
          </Chip>
          }

          {/*admin chip*/}
          {this.props.member.admin &&
            <Chip
            style={styles.chip} backgroundColor={blue300}>
            ADMIN
            </Chip>
          }

          {/*kick this member button*/}
          {this.isKickable() &&
          <RaisedButton
            label="Kick this f**ker"
            secondary={true}
            onTouchTap={this.props.onKick.bind(this)}
            style={{margin: 12}}/>
          }


        </CardHeader>

      </Card>
    </div>
  }

}
SingleMember.defaultProps = {member:{}, currentUser:{}, onKick: ()=>{}};
