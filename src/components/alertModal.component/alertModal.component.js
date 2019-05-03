import React from 'react';
import Modal from 'react-modal';


const AlertModal = (props) => (
  <Modal
    ariaHideApp={false}
    isOpen={props.isOpen}
    contentLabel={props.textalert}
    closeTimeoutMS={200}
    className="modal"
  >
    <div className="modal__body">
      <p className={props.colortext}>{props.textalert}</p>
    </div>
    {
      props.what ? <div>
        <div className="buttons">
          <button onClick={props.handleClearSelectedOption}>Okay</button>
        </div>
      </div> : <div>
          <div className="buttons">
            <button onClick={props.handleRemove} >Okay</button>
            <button className={props.removeClass} onClick={props.handleClearSelectedOption}>בטל פעולה</button></div>
        </div>
    }
  </Modal>
);

export default AlertModal;


