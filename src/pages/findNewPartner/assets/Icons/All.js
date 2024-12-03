export default function All({ color }) {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="17.5" cy="17.5" r="16" strokeWidth="3" stroke={color} />
      <path
        d="M29 28L23.8909 22.4652C23.323 21.8499 22.5238 21.5 21.6865 21.5H20.9051C20.0148 21.5 19.1704 21.1045 18.6005 20.4206L18.5682 20.3818C17.6555 19.2866 17.6397 17.7004 18.5302 16.5872L22.0993 12.1259C22.6686 11.4143 23.5305 11 24.4419 11H31.5"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M8.5 5L11.5503 8.66033C12.7515 10.1017 13.0657 12.0856 12.3689 13.8277V13.8277C11.8394 15.1515 10.5873 16.0456 9.16332 16.1168L1.5 16.5"
        stroke={color}
        strokeWidth="3"
      />
    </svg>
  );
}
