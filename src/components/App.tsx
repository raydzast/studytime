import * as React from "react";

import { StatusBar } from "./StatusBar";
import { StudyInfoTable } from "./StudyInfoTable";
import { Modal } from "./Modal";

import { TStudyInfo } from "../types/StudyInfo";

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

    let studyInfo = null;
    try {
      studyInfo = JSON.parse(studyInfoJson);
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.warn("StudyInfo from `localStorage` is corrupted", e);
      }
    }
    if (studyInfo === null) {
      studyInfo = new TStudyInfo();
    }

    this.handleStudyInfoChange(studyInfo);
    this.setState({ isLoading: false });
  }

  handleOpenClick = async () => {
    try {
      // @ts-ignore
      const [fileHandler] = await window.showOpenFilePicker();
      const file = await fileHandler.getFile();
      const studyInfoJson = await file.text();

      this.handleStudyInfoChange(JSON.parse(studyInfoJson));
    } catch (e) {
      alert("Cannot read file");
    }
  };

  handleSaveClick = () => {
    saveFile("data.json", JSON.stringify(this.state.studyInfo));
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
    localStorage.setItem("studyInfoJson", JSON.stringify(newStudyInfo));
    this.setState({
      studyInfo: newStudyInfo,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    return (
      <>
        <StudyInfoTable
          studyInfo={this.state.studyInfo}
          showModal={this.showModal}
          hideModal={this.hideModal}
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

function saveFile(filename: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:application/json;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
