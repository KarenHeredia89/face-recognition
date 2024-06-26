import React from 'react';

const Rank = ({ name, entries }) => {
    return(
        <div>
            <div className='white f3 center tc'>
                {`${name}, your current entry count is...`}
            </div>
            <div className='white f3 center tc'>
                {entries}
            </div>
        </div>
    )
}

export default Rank;