import * as React from 'react';

import DateBlock from './DateBlock';
import Stats from './Stats';

import { TStudyInfo } from '../../types/StudyInfo';

import download from '../../utils/download';


type StatusBarProps = {
    studyInfo: TStudyInfo;
    onOpenClick: React.MouseEventHandler;
}

export default class StatusBar extends React.Component<StatusBarProps> {
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
