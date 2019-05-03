import React from 'react';
import { Link } from 'react-router-dom';


const ResultsComponent = (props) => {

    return (<div >
        <div className="results">
            <h1>תוצאות הבוחן</h1>
            <div>{props.location.state.detail}</div>
            <div>{100 * (parseInt(props.location.state.score)) / (parseInt(props.location.state.numqus) * 4)} :ציונך </div>
            <br />
            <div>  {JSON.stringify(props.location.state.mytime)} הבחינה לקחה לך:</div>
            <br></br>
            <Link to="/quiz">חזור לרשימת הבחנים</Link>
        </div></div>);

};


export default ResultsComponent;