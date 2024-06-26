export default function LoadingState() {
  return (
    <>
      <div className="text-center loadingState">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}
