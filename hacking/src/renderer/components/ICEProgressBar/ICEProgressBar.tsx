export default function ICEProgressBar({ value, children, shift }) {
  return (
    <div className="ice-progress-bar" style={{ right: `${10 + shift * 40}px` }}>
      <div className="wrapper">
        <div className="filler" style={{ height: `${value}%`, background: value === 100 ? 'green' : 'red' }}>
          <span>{children}</span>
        </div>
      </div>
    </div>
  );
}
