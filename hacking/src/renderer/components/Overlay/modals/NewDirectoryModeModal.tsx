import Overlay from '../../../services/Overlay';

export default function NewDirectoryModeModal() {
  return (
    <div className="quest-modal">
      <div>
        <div>
          <center>
            Welcome to CIC Terminal <span className="secondary-color">v.2</span>
          </center>
        </div>
        <br />
        <br />
        <div>
          This is new directory system in CIC Terminal. You are automatically
          logged in as a hackerbot. You are free to move through all networks,
          subnetworks and users without any obstacles, all firewalls, ice and
          other defensive programs were disabled.
          <br />
          <br />
          <br />
          What should i do?
          <ul>
            <li>
              Write <span className="secondary-color">ls</span> to list all
              files and folders inside a folder you are right now.
            </li>
            <li>
              Write <span className="secondary-color">[file-name]</span> open
              that file or move to that folder. You can use shortcuts Tab and
              Ctr+Tab to navigate.
            </li>
            <li>
              Write <span className="secondary-color">b</span> or{' '}
              <span className="secondary-color">back</span> to go back "up" to a
              different folder.
            </li>
            <li>
              Write <span className="secondary-color">connect</span> to list all
              networks avaiable or write{' '}
              <span className="secondary-color">connect [network-name]</span> to
              connect to that network (you can use Tab).
            </li>
            <li>
              Write <span className="secondary-color">end</span> to and your
              connection to a network and go back to your "home server".
            </li>
          </ul>
        </div>
      </div>
      <div className="buttons">
        <button onClick={Overlay.closeModal}>START TEST</button>
      </div>
    </div>
  );
}
