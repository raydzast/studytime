import * as React from "react";

import { StatusBar } from "./StatusBar";
import { Table } from "./Table";
import { Modal } from "./Modal";

import { TStudyInfo } from "../types/StudyInfo";
import { download } from "../utils/download";

type AppState = {
  isLoading: boolean;
  studyInfo: TStudyInfo | null;
  showModal: boolean;
  renderModalChildren: () => React.ReactNode;
};

class App extends React.Component<{}, AppState> {
  readonly state: AppState = {
    isLoading: true,
    showModal: false,
    studyInfo: null,
    renderModalChildren: () => null,
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

  handleSaveClick = () => {
    download("data.json", JSON.stringify(this.state.studyInfo));
  };

  showModal = (renderChildren: () => React.ReactNode) => {
    this.setState({
      showModal: true,
      renderModalChildren: renderChildren,
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleStudyInfoChange = (newStudyInfo: TStudyInfo) => {
    this.setState({
      studyInfo: newStudyInfo,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }
    console.log("app render");
    return (
      <>
        <Table
          studyInfo={this.state.studyInfo}
          showModal={this.showModal}
          onChange={this.handleStudyInfoChange}
        />
        <StatusBar
          studyInfo={this.state.studyInfo}
          onOpenClick={this.handleOpenClick}
          onSaveClick={this.handleSaveClick}
        />
        <Modal show={this.state.showModal} onHide={this.hideModal}>
          {this.state.renderModalChildren()}
        </Modal>
      </>
    );
  }
}

export { App };
