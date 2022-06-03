import * as React from 'react';
import showdown from 'showdown';


function Td({color, content}) {
    return <td
        className={`${color || "white"}-bg`}
        dangerouslySetInnerHTML={{__html: new showdown.Converter().makeHtml(content)}}
    />;
}

function Discipline(props) {
    const discipline = props.discipline;
    const attributeNames = props.attributeNames || [];
    const scheduleSlots = props.scheduleSlots;
    const emptyEntries = scheduleSlots - discipline.schedule.length;

    return <tr>
        <Td color={discipline.color} content={discipline.name} />
        {
            attributeNames.map((attributeName) => {
                return <Td key={attributeName} content={discipline.attributes[attributeName]} />;
            })
        }
        {
            discipline.schedule.map((entry, idx) => {
                return <Td key={idx} {...entry} />;
            })
        }
        {
            [...Array(emptyEntries).keys()].map((idx) => {
                return <Td key={idx} />;
            })
        }
    </tr>;
}

function THead(props) {
    return <thead>
        <tr>
            <th><p>Дисциплина</p></th>
            {
                props.studyInfo.attributeNames.map(attributeName => {
                    return <th key={attributeName}><p>{attributeName}</p></th>;
                })
            }
            <th><p>Список</p></th>
        </tr>
    </thead>;
}

function TBody(props) {
    const disciplines = props.studyInfo.disciplines;
    const scheduleSlots = Math.max(0, ...disciplines.map(discipline => discipline.schedule.length));

    return <tbody>
        {
            disciplines.map((discipline, idx) => {
                return <Discipline
                    key={idx}
                    discipline={discipline}
                    scheduleSlots={scheduleSlots}
                    attributeNames={props.studyInfo.attributeNames}
                />;
            })
        }
    </tbody>;
}

export default function Table(props) {
    return <table>
        <THead studyInfo={props.studyInfo} />
        <TBody studyInfo={props.studyInfo} />
    </table>;
}
