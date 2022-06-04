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
  modalContents: React.ReactNode;
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    isLoading: true,
    showModal: false,
    studyInfo: null,
    modalContents: null,
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

  showModal = (contents: React.ReactNode) => {
    this.setState({
      showModal: true,
      modalContents: contents,
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    return (
      <>
        <Table studyInfo={this.state.studyInfo} showModal={this.showModal} />
        <StatusBar
          studyInfo={this.state.studyInfo}
          onOpenClick={this.handleOpenClick}
          onSaveClick={this.handleSaveClick}
        />
        <Modal show={this.state.showModal} onHide={this.hideModal}>
          {this.state.modalContents}
        </Modal>
      </>
    );
  }
}

export { App };
