import "./NavButton.scss";

interface INavButton {
  icon: string;
  active_icon: string;
  name: string;
  onClick: () => void;
  active: boolean;
  collapse: boolean;
}

export default function NavButton({ ...props }: INavButton) {
  return (
    <div className="nav_button_container" onClick={props.onClick} style={{ opacity: props.active ? 1 : 0.70, minWidth: props.collapse ? '100%' : undefined }}>
      <img
        className="nav_button_container__icon"
        draggable={false}
        src={props.active ? props.active_icon : props.icon}
        alt="icon"
      />
      {!props.collapse && <span className="nav_button_container__name">{props.name}</span>}
    </div>
  )
}
