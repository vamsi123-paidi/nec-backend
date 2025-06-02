import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  // fetch on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  if (!users.length) return <p>No registrations yet.</p>;

  return (
   <div className="users-card">
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p className="empty-state">No users registered yet.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Residential Address</th>
              <th>Permanent Address</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id} style={{ animationDelay: `${index * 0.05}s` }}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{new Date(u.dob).toLocaleDateString()}</td>
                <td>{u.residentialAddress}</td>
                <td>{u.permanentAddress}</td>
                <td>
                  {u.filePath ? (
                    <a
                      href={`http://localhost:5000/${u.filePath}`}
                      className="download-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


export default UsersList;