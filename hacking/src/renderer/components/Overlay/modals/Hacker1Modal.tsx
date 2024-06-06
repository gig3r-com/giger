
export default function Hacker1Modal({ testIsActive }) {

  return (
    <div className="quest-modal">
      <div>
        <div>
          <center>Welcome to hacking terminal test as a</center>
        </div>
        <div className="secondary-color">
          <center>LEVEL 1 HACKER</center>
        </div>
        <br />
        <br />
        <div>
          Username: <span className="secondary-color">smart_one</span>
        </div>
        <div>
          Password: <span className="secondary-color">beginnings</span>
        </div>
        <br />
        <br />
        <div>
          You are <span className="secondary-color">Kimberly Smart</span>, a
          young janitor that just had his{' '}
          <span className="secondary-color">
            Cyberdeck Integration Chip installed
          </span>
          . You hadn't had time to try it out yet, it is your fist time in this
          terminal so it is problably best to setup some things for yourself.
          After logging in (username and password above) try using{' '}
          <span className="secondary-color">list cmd</span> command to list your
          avaiable commands. If at any point you will feel lost try using{' '}
          <span className="secondary-color">doc</span> command.
          <br />
          <br />
          <br />
          What should i do?
          <ul>
            <li>Change your hacker name.</li>
            <li>
              Check your own profile and private records inside it to find
              program keys from your friend, and then install that programs.
            </li>
            <li>
              Try breaching into a subnetwork that you, your boss and your work
              friends are in and gather information about them.
            </li>
          </ul>
        </div>
      </div>
      {testIsActive ? (
        <div className="buttons">
          <button onClick={reset}>RESET TEST</button>
          <button onClick={close}>CLOSE MODAL</button>
        </div>
      ) : (
        <div className="buttons">
          <button onClick={start}>START TEST</button>
        </div>
      )}
    </div>
  );
}
