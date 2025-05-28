export default function CustomLogoIcon({ size = 60, color = "#121417" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.32952 19L0.731445 17.9641L5.06157 15.4641L7.10302 19H1.32952Z" fill={color} />
      <path d="M15.1859 19H9.41243L5.79362 12.7321L10.1237 10.2321L15.1859 19Z" fill={color} />
      <path d="M23.2688 19H17.4953L10.8558 7.5L15.1859 5L23.2688 19Z" fill={color} />
    </svg>
  );
}
