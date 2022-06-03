export class TScheduleEntry {
    color?: string = "white";
    content?: string = "";
}

export class TDiscipline {
    name: string;
    color?: string = "white";
    attributes: { [id: string]: string } = {};
    schedule: Array<TScheduleEntry> = [];
}

export class TStudyInfo {
    disciplines: Array<TDiscipline> = [];
    attributeNames: Array<string> = [];
}
