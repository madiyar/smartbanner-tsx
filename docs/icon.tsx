import React from "react";
import type { FC } from "react";

const icons = {
  android: (
    <>
      <path
        d="M20 11V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 19V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 19V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 11V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 4L8.5 2M14 4L15.5 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 10H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.50001 9.5C6.50001 6.46243 8.96244 4 12 4C15.0376 4 17.5 6.46243 17.5 9.5V18C17.5 18.5523 17.0523 19 16.5 19H7.49992C6.94763 19 6.49991 18.5523 6.49992 18L6.50001 9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  ios: (
    <>
      <path
        d="M12 5.75C12 3.75 13.5 1.75 15.5 1.75C15.5 3.75 14 5.75 12 5.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 8.09001C11.9851 8.09001 11.5867 7.92646 11.1414 7.74368C10.5776 7.51225 9.93875 7.25 8.89334 7.25C7.02235 7.25 4 8.74945 4 12.7495C4 17.4016 7.10471 22.25 9.10471 22.25C9.77426 22.25 10.3775 21.9871 10.954 21.7359C11.4815 21.5059 11.9868 21.2857 12.5 21.2857C13.0132 21.2857 13.5185 21.5059 14.046 21.7359C14.6225 21.9871 15.2257 22.25 15.8953 22.25C17.2879 22.25 18.9573 19.8992 20 16.9008C18.3793 16.2202 17.338 14.618 17.338 12.75C17.338 11.121 18.2036 10.0398 19.5 9.25C18.5 7.75 17.0134 7.25 15.9447 7.25C14.8993 7.25 14.2604 7.51225 13.6966 7.74368C13.2514 7.92646 13.0149 8.09001 12.5 8.09001Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </>
  ),
  top: (
    <>
      <path
        d="M3 15L3 16M3 19V19C3 20.6569 4.34315 22 6 22V22M21 15V16M21 19V19C21 20.6569 19.6569 22 18 22V22M10 22L14 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 5C3 3.34315 4.34315 2 6 2L18 2C19.6569 2 21 3.34315 21 5V11C21 11.5523 20.5523 12 20 12L4 12C3.44772 12 3 11.5523 3 11L3 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </>
  ),
  bottom: (
    <>
      <path
        d="M2.99997 8.99997L2.99997 7.99997M2.99997 4.99997V4.99997C2.99997 3.34312 4.34312 1.99997 5.99997 1.99997V1.99997M21 8.99997V7.99997M21 4.99997V4.99997C21 3.34312 19.6568 1.99997 18 1.99997V1.99997M9.99997 1.99997L14 1.99997"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.99997 13C2.99997 12.4477 3.44768 12 3.99997 12L20 12C20.5523 12 21 12.4477 21 13V19C21 20.6568 19.6568 22 18 22H5.99997C4.34312 22 2.99997 20.6568 2.99997 19L2.99997 13Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </>
  ),
  delete: (
    <>
      <path
        d="M19.5 5.5L18.6139 20.121C18.5499 21.1766 17.6751 22 16.6175 22H7.38246C6.32488 22 5.4501 21.1766 5.38612 20.121L4.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 5.5H8M21 5.5H16M16 5.5L14.7597 2.60608C14.6022 2.2384 14.2406 2 13.8406 2H10.1594C9.75937 2 9.39783 2.2384 9.24025 2.60608L8 5.5M16 5.5H8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 16.5L9.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 16.5L14.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export const Icon: FC<{ icon: keyof typeof icons }> = ({ icon }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
  >
    {icons[icon]}
  </svg>
);
