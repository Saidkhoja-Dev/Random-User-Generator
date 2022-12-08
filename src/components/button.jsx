function Button({ isActive, clicked }) {
  return (
    <div>
      <button onClick={clicked}>
        {isActive ? "Get another User" : "Get User"}
      </button>
    </div>
  );
}
export default Button;
