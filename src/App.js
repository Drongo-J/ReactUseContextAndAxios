import "./App.css";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ThemeContext = createContext(null);

function App() {
  const [data, setData] = useState(null);

  function getUsers() {
    const url = "https://reqres.in/api/users?page=2";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }

  function sendObject() {
    const url = "https://reqres.in/api/users";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Ayxan",
        job: "Programmer",
      }),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deleteObject(id) {
    const url = "https://reqres.in/api/users/" + id;

    const requestOptions = {
      method: "DELETE",
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Resource deleted successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function getUsersAxios() {
    const url = "https://reqres.in/api/users?page=2";
    axios
      .get(url)
      .then((data) => {
          setData(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // await getUsers();
        // await sendObject();
        // await deleteObject(2);

        await getUsersAxios();
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {data && (
        <ul>
          {data.data.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );

  // const [theme, setTheme] = useState('light');
  // // Lesson Part 1
  // return (
  //     <ThemeContext.Provider value={theme}>
  //       <Form></Form>
  //       <label>
  //         <input type="checkbox" checked={theme === 'dark'} onChange={(e) => {
  //           setTheme(e.target.checked ? 'dark' : 'light')
  //         }}>
  //         </input>
  //         Use Dark Mode
  //       </label>
  //     </ThemeContext.Provider>
  // );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign In</Button>
      <Button>Sign Up</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = theme;

  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  return <button className={theme}>{children}</button>;
}

export default App;
