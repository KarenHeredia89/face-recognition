const ImageLinkForm = ({
  onInputChange,
  onSubmit,
}: {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}) => {
  return (
    <div>
      <p className="text-center text-lg my-4 text-slate-400">
        This Magic Brain will detect faces in your pictures. Git it a try.
      </p>
      <div className="flex justify-center">
        <div className="p-4 rounded-md bg-slate-900 gap-4 flex">
          <input
            className="p-2 rounded-md bg-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            placeholder="Enter your image URL"
            onChange={onInputChange}
          />
          <button
            className="bg-violet-700 p-2 rounded-md font-bold cursor-pointer"
            onClick={onSubmit}
          >
            Detect Faces
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
