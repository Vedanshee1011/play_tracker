import React, { useState, useEffect } from 'react';
import './ScoreBoardTable.css';
import { DefaultContext } from 'react-icons';

const ScoreboardTable = () => {
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    fetchMatchData();
  }, []);

  const fetchMatchData = async () => {
    try {
      const response = await fetch('/Data.json');
      const data = await response.json();
      setMatchData(data);
    } catch (error) {
      console.error('Error fetching match data:', error);
    }
  };

  if (!matchData) {
    return <div>Loading...</div>;
  }

  const {
    battingTeam,
    bowlingTeam,
    battingTeamScore,
    battingTeamWickets,
    battingTeamOvers,
    bowlingTeamScore,
    bowlingTeamWickets,
    bowlingTeamOvers,
    batsmen,
    bowlers,
  } = matchData;

  const battingRunRate = (battingTeamScore / battingTeamOvers).toFixed(2);
  const bowlingRunRate = (bowlingTeamScore / bowlingTeamOvers).toFixed(2);

  return (
    <div className="scoreboard-table">
      <div className="team-scores">
        <div className="team-score">
          <h2>{battingTeam}</h2>
          <p>{battingTeamScore}/{battingTeamWickets} ({battingRunRate} runs/over)</p>
        </div>
        <div className="team-score">
          <h2>{bowlingTeam}</h2>
          <p>{bowlingTeamScore}/{bowlingTeamWickets} ({bowlingRunRate} runs/over)</p>
        </div>
      </div>

      <div className="batsmen-table">
        <h3>Batsmen</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Runs</th>
              <th>Balls</th>
              <th>4s</th>
              <th>6s</th>
            </tr>
          </thead>
          <tbody>
            {batsmen.map((batsman, index) => (
              <tr key={index}>
                <td>{batsman.name}</td>
                <td>{batsman.runs}</td>
                <td>{batsman.balls}</td>
                <td>{batsman.fours}</td>
                <td>{batsman.sixes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bowlers-table">
        <h3>Bowlers</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Overs</th>
              <th>Maidens</th>
              <th>Runs</th>
              <th>Wickets</th>
            </tr>
          </thead>
          <tbody>
            {bowlers.map((bowler, index) => (
              <tr key={index}>
                <td>{bowler.name}</td>
                <td>{bowler.overs}</td>
                <td>{bowler.maidens}</td>
                <td>{bowler.runs}</td>
                <td>{bowler.wickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
            }
export default ScoreboardTable 