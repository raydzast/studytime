import React from 'react';


const statColors = ["white", "green", "orange", "red"];

function calcStats(studyInfo) {
    const stats = {};

    for (const discipline of studyInfo["disciplines"]) {
        for (const entry of discipline["schedule"]) {
            const color = entry["color"] || "white";
            if (!stats.hasOwnProperty(color)) {
                stats[color] = 0;
            }
            stats[color]++;
        }
    }

    return stats;
}

export default function Stats(props) {
    const stats = calcStats(props.studyInfo);

    return (
        <div className='black-bg'>
            {
                statColors.map((color, idx) => {
                    return <React.Fragment key={color}>
                        {idx === 0 || "/"}
                        <span className={`${color}-color`}>{stats[color] || 0}</span>
                    </React.Fragment>;
                })
            }
        </div>
    );
}
