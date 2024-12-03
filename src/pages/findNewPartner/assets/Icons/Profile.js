export default function Profile({ color }) {
  return (
    <svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.7455 35H5.71309C3.54773 35 2.13938 32.7212 3.10776 30.7845C9.50385 17.9923 27.783 18.0035 34.3375 30.7152C35.3418 32.6628 33.9368 35 31.7455 35Z"
        strokeWidth="4"
        stroke={color}
      />
      <path
        d="M24.6562 9.84375C24.6562 13.2438 21.9 16 18.5 16C15.1 16 12.3438 13.2438 12.3438 9.84375C12.3438 6.44375 15.1 3.6875 18.5 3.6875C21.9 3.6875 24.6562 6.44375 24.6562 9.84375Z"
        stroke={color}
        strokeWidth="3"
      />
    </svg>
  );
}
