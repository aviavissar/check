import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout,startSetTeacherName } from '../../actions/auth';
import { __values } from 'tslib';


export class HeaderComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      name:this.props.tname
    };

    this.props.startSetTeacherName();
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src='/images/logo.png' />
        </div>
        <nav role="navigation">
          <div id="menuToggle">

            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">

              {
                this.props.uid ? <div className="propWrap">
 <label className='tname'>{this.props.tname+" היי "}  </label>
                  <div className="quiz_m">  <button className=""  onClick={this.props.startLogout}>התנתקות</button></div>
                  <div className="quiz_m"> <Link className="" to={"/teachers"} ><h4>ממשק מרצים</h4></Link></div>
                </div>
                  : <div className="quiz_m"><Link className="" to={"/login"} > כניסת מרצים</Link></div>
              }
              <div className="quiz_m">
                <Link to="/quiz" > מערכת בחנים </Link>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    )
  }

}
const mapStateToProps = (state, props) => {
  return {
    uid: state.auth.uid,
    tname:state.auth.name
  
  };
}

const mapDispatchToProps = (dispatch) => (
  {
 startLogout: () => dispatch(startLogout()),
  startSetTeacherName : () => dispatch(startSetTeacherName()),

});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
