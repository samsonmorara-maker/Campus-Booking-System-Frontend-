const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white",
  success:
    "bg-green-500 hover:bg-green-600 text-white",
  warning:
    "bg-amber-500 hover:bg-amber-600 text-white",
  danger:
    "bg-red-500 hover:bg-red-600 text-white",
  secondary:
    "bg-gray-200 hover:bg-gray-300 text-gray-800",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        px-4
        py-2
        rounded-lg
        font-medium
        transition
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;