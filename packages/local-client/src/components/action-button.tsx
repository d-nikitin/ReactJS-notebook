interface ActionButtonProps {
  icon: string;
  onClick: () => {};
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  onClick,
}) => {
  return (
    <button className='button is-primary is-small' onClick={onClick}>
      <span className='icon'>
        <i className={`fas ${icon}`}></i>
      </span>
    </button>
  );
};
