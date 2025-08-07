const ImageLinkForm = ({
  onInputChange,
  onSubmit,
}: {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}) => {
  return (
    <div>
      <p className="f3 center tc">
        {"This Magic Brain will detect faces in your pictures. Git it a try."}
      </p>
      <div className="center">
        <div className="center pa4 br3 shadow-5 bg-white-op">
          <input className="f4 pa2 w-70 center" onChange={onInputChange} />
          <button
            type="button"
            className="w-30 grow f4 link ph3 pv2 dib white bg-dark-pink"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
