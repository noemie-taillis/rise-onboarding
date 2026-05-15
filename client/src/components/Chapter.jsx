export default function Chapter({ children }) {
  return (
    <div
      className="relative px-6 md:px-16 pb-16"
      style={{ minHeight: 'calc(100vh - 130px)', paddingTop: '2.5rem' }}
    >
      {children}
    </div>
  );
}
