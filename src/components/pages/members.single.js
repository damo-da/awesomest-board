import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import {blue300, indigo900, green300} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  chip: {
    display: 'inline',
    margin: 4,
    padding: 4,
  }
};

//a single member
export default class SingleMember extends Component{
  constructor(props){
    super(props);


  }

  getSubtitle(){
    if (this.props.member.admin)return "ADMIN";

    return "Member";
  }
  componentWillMount(){
  }
  isKickable(){
    const member = this.props.member;

    if(member.admin)return false;//can not kick admin

    if(this.props.currentUserId == member.id)return false; //can not kick self

    return true;
  }

  render() {
    return <div>
      <Card>
        <CardHeader
          title={this.props.member.name}>

          {/*current user chip*/}
          {this.props.currentUserId == this.props.member.id &&
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
SingleMember.defaultProps = {member:{}, currentUserId:0, onKick: ()=>{}};
