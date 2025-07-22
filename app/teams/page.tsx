import React, { useState, useEffect } from 'react';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch('/api/teams');
      const data = await response.json();
      setTeams(data);
    };
    fetchTeams();
  }, []);

  const handleCreateTeam = async () => {
    const response = await fetch('/api/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: teamName, owner_id: 'user1' }), // In a real app, you'd get the user ID from the session
    });
    const data = await response.json();
    setTeams([...teams, ...data]);
    setTeamName('');
  };

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
      <h2>Create Team</h2>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Enter team name"
      />
      <button onClick={handleCreateTeam}>Create</button>
    </div>
  );
};

export default TeamsPage;
