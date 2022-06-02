import React from 'react';

import DateBlock from './DateBlock.jsx';
import Stats from './Stats.jsx';

import download from '../../utils/download.js';


export default class StatusBar extends React.Component {
    handleSaveClick = () => {
        download("data.json", JSON.stringify(this.props.studyInfo));
    }

    render() {
        return (
            <div className='status-bar'>
                <button onClick={this.props.onOpenClick}>Open</button>
                <button onClick={this.handleSaveClick}>Save</button>
                <DateBlock />
                <Stats studyInfo={this.props.studyInfo} />
            </div>
        );
    }
}
