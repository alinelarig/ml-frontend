import './Button.sass';
function Button(props) {
  return (
    <button
      className={props.className}
      type={props.type}
      onClick={() => (props.onClick ? props.onClick() : null)}
    >
    {props.value}
    {props.children}
    </button>
  );
}

export default Button;
