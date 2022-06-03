import * as React from "react";

import StatusBar from "../components/StatusBar/index";
import Table from "./Table";

import { TStudyInfo } from "../types/StudyInfo";

type AppState = {
  isLoading: boolean;
  studyInfo: TStudyInfo | null;
};

export default class App extends React.Component<{}, AppState> {
  state: AppState = {
    isLoading: true,
    studyInfo: null,
  };

  componentDidMount() {
    const studyInfoJson = localStorage.getItem("studyInfoJson");

    const defaultStudyInfo = new TStudyInfo();
    const studyInfo =
      studyInfoJson === null ? defaultStudyInfo : JSON.parse(studyInfoJson);

    localStorage.setItem("studyInfoJson", JSON.stringify(studyInfo));
    this.setState({
      isLoading: false,
      studyInfo: studyInfo,
    });
  }

  handleOpenClick = async () => {
    try {
      // @ts-ignore
      const [fileHandler] = await window.showOpenFilePicker();
      const file = await fileHandler.getFile();
      const studyInfoJson = await file.text();

      localStorage.setItem("studyInfoJson", studyInfoJson);
      this.setState({
        studyInfo: JSON.parse(studyInfoJson),
      });
    } catch (e) {}
  };

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    return (
      <>
        <Table studyInfo={this.state.studyInfo} />
        <StatusBar
          studyInfo={this.state.studyInfo}
          onOpenClick={this.handleOpenClick}
        />
      </>
    );
  }
}
