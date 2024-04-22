import { useEffect, useState } from 'react'
import './App.css'
import './normalize.css'
import './skeleton.css'

function userSearch(){
  const [users, setUsers] = useState([]);


  useEffect(()=>{
    const queryHandler = localStorage.getItem('queryHandler');
    search(queryHandler);
  }, []);

  const search = async (q) =>{
    const response = await fetch(
      `https://project-avatar-api.netlify.app/.netlify/functions/api?` + new URLSearchParams({q})
    );

    const data = await response.json();
    setUsers(data);

    localStorage.setItem('queryHandler', q)
  };

  return {users, search};
}

function App() {

  const { users, search } = userSearch();

  return (
    <>
    <div class="container">
      <div className="row sticky-div">
        <div className="twelve">
          <h1>Avatars Codex</h1>
          <input 
            type="text"
            placeholder='Search...'
            onChange={(e)=> search(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
      <table class="u-full-width">
        <thead>
        <tr>
          <th>Name</th>
          <th>Avatar</th>
          <th>Company</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
      {users.map((user)=>(
          <tr key={user.id}>
            <td>{user.name}</td>
            <td><img src={user.avatar} alt="" /></td>
            <td>{user.company}</td>
            <td>
              <a href={"mailto:" + user.email}>{user.email}</a>
            </td>
          </tr>
          
        ))}
        <p><i>{users.length == 0 && 'No results found'}</i></p>
      </tbody>
      </table>
      </div>
    </div>
    </>
  )
}

export default App
