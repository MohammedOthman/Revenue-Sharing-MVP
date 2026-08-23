/* Reven's own small mark set — one house construction: a 20-grid, 1.6 stroke,
   rounded joins, a ledger/record point of view (frames, nodes, a rising tick
   that echoes the brand mark). Not an off-the-shelf icon pack. */
const S = ({ children, size = 19, className = '' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const IconGrid = (p) => (
  <S {...p}>
    <rect x="3.4" y="3.4" width="13.2" height="13.2" rx="4" />
    <circle cx="10" cy="10" r="1.4" fill="currentColor" stroke="none" />
  </S>
);
export const IconPartners = (p) => (
  <S {...p}>
    <circle cx="7" cy="8" r="2.5" />
    <circle cx="13" cy="12" r="2.5" />
    <path d="M8.9 9.4 L11.1 10.6" />
  </S>
);
export const IconProgram = (p) => (
  <S {...p}>
    <rect x="4" y="3.6" width="12" height="12.8" rx="3" />
    <path d="M7.4 3.8 V9.2 L9.4 7.7 L11.4 9.2 V3.8" />
  </S>
);
export const IconDoc = (p) => (
  <S {...p}>
    <path d="M6 3.4h4.6l3 3v9.8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.4a1 1 0 0 1 1-1z" />
    <path d="M10.4 3.6V6.6h2.8" />
    <path d="M7.4 10.2h5M7.4 12.6h3.2" />
  </S>
);
export const IconClaim = (p) => (
  <S {...p}>
    <rect x="3.7" y="5" width="12.6" height="11" rx="3" />
    <path d="M6.4 12.8 L10.8 8.6" />
    <circle cx="11.2" cy="8.2" r="0.9" fill="currentColor" stroke="none" />
  </S>
);
export const IconGraph = (p) => (
  <S {...p}>
    <circle cx="5" cy="13" r="1.7" />
    <circle cx="10" cy="6" r="1.7" />
    <circle cx="15" cy="12" r="1.7" />
    <path d="M6.3 11.9 L8.8 7.2M11.3 6.9 L13.7 10.8" />
  </S>
);
export const IconStatement = (p) => (
  <S {...p}>
    <rect x="4.6" y="3.4" width="10.8" height="13.2" rx="2.4" />
    <path d="M7 7h6M7 9.5h6M7 12h3.2" />
  </S>
);
export const IconDispute = (p) => (
  <S {...p}>
    <path d="M8.3 5 L4.6 10 L8.3 15" />
    <path d="M11.7 5 L15.4 10 L11.7 15" />
  </S>
);
export const IconLoop = (p) => (
  <S {...p}>
    <path d="M15.4 8.6a5.6 5.6 0 1 0 .5 3.1" />
    <path d="M15.9 5.4v3.2h-3.2" />
  </S>
);
export const IconAudit = (p) => (
  <S {...p}>
    <path d="M4.6 6h8.8M4.6 9.5h8.8M4.6 13h4.6" />
    <path d="M12 13.3l1.5 1.5 2.6-2.9" />
  </S>
);
export const IconSettings = (p) => (
  <S {...p}>
    <circle cx="10" cy="10" r="2.5" />
    <path d="M10 3.5v2M10 14.5v2M3.5 10h2M14.5 10h2M5.4 5.4l1.4 1.4M13.2 13.2l1.4 1.4M14.6 5.4l-1.4 1.4M6.8 13.2l-1.4 1.4" />
  </S>
);
export const IconMenu = (p) => (
  <S {...p}>
    <path d="M4 6.5h12M4 10h12M4 13.5h8" />
  </S>
);
export const IconLogout = (p) => (
  <S {...p}>
    <path d="M12 6.5V5a1.5 1.5 0 0 0-1.5-1.5H5.5A1.5 1.5 0 0 0 4 5v10a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 15v-1.5" />
    <path d="M9 10h7M14 7.5 16.5 10 14 12.5" />
  </S>
);
