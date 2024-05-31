import React from 'react'

const Stats = ({statName,base_stat}) => {
  return (
    <div className="statistics">
      <p className='statName'>{statName}</p>
      <div className="stats">
        <div className="stat " style={{ width: `${base_stat}%` }}>
          <p>{base_stat}</p>
        </div>
      </div>
    </div>
  );
}

export default Stats
