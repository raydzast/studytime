import * as React from 'react';

import StatusBar from '../components/StatusBar/index.jsx';
import Table from './Table.jsx';


export default class App extends React.Component {
    state = {
        isLoading: true,
        studyInfo: null,
    };

    componentDidMount() {
        const studyInfoJson = localStorage.getItem("studyInfoJson");

        const defaultStudyInfo = {disciplines: []};
        const studyInfo = studyInfoJson === null ? defaultStudyInfo : JSON.parse(studyInfoJson);

        localStorage.setItem("studyInfoJson", JSON.stringify(studyInfo));
        this.setState({
            isLoading: false,
            studyInfo: studyInfo,
        });
    }

    updateStudyInfo = (studyInfo) => {
        localStorage.setItem()
    }

    handleOpenClick = async () => {
        try {
            const [fileHandler] = await window.showOpenFilePicker();
            const file = await fileHandler.getFile();
            const studyInfoJson = await file.text();

            localStorage.setItem("studyInfoJson", studyInfoJson);
            this.setState({
                studyInfo: JSON.parse(studyInfoJson)
            });
        } catch (e) {
        }
    }

    render() {
        if (this.state.isLoading) {
            return <h1>Loading...</h1>;
        }

        return (
            <>
                <Table studyInfo={this.state.studyInfo} />
                <StatusBar studyInfo={this.state.studyInfo} onOpenClick={this.handleOpenClick}/>
            </>
        );
    }
}