class TScheduleEntry {
  color?: string = "white";
  content?: string = "";
}

class TDiscipline {
  name: string;
  color?: string = "white";
  attributes: { [id: string]: string } = {};
  schedule: Array<TScheduleEntry> = [];
}

class TStudyInfo {
  disciplines: Array<TDiscipline> = [];
  attributeNames: Array<string> = [];
}

export { TScheduleEntry, TDiscipline, TStudyInfo };
