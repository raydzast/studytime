import * as React from 'react';
import showdown from 'showdown';


function Entry(props) {
    const entry = props.entry;
    return <td
        className={`${entry.color || "white"}-bg`}
        dangerouslySetInnerHTML={{__html: new showdown.Converter().makeHtml(entry.content)}}
    />;
}

function Discipline(props) {
    const discipline = props.discipline;
    const scheduleSlots = props.scheduleSlots;
    const emptyEntries = scheduleSlots - discipline.schedule.length;

    return <tr>
        {
            discipline.schedule.map((entry, idx) => {
                return <Entry key={idx} entry={entry} />;
            })
        }
        {
            [...Array(emptyEntries).keys()].map((idx) => {
                return <Entry key={idx} entry={{}} />;
            })
        }
    </tr>;
}

function TBody(props) {
    const disciplines = props.studyInfo.disciplines;
    const scheduleSlots = Math.max(0, ...disciplines.map(discipline => discipline.schedule.length));

    return <tbody>
        {
            disciplines.map((discipline, idx) => {
                return <Discipline key={idx} discipline={discipline} scheduleSlots={scheduleSlots} />;
            })
        }
    </tbody>;
}

export default function Table(props) {
    return <table>
            <TBody studyInfo={props.studyInfo} />
    </table>;
}
