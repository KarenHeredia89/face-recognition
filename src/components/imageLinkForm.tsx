import AppInput from "@/components/appInput";
import { Button } from "@/components/ui/button";

const ImageLinkForm = ({
  input,
  onInputChange,
  onSubmit,
}: {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}) => {
  return (
    <div>
      <p className="text-center text-lg my-4 text-slate-400">
        This Magic Brain will detect faces in your pictures. Git it a try.
      </p>
      <div className="flex justify-center">
        <div className="p-4 rounded-md bg-slate-900 gap-4 flex items-center justify-center">
          <AppInput
            placeholder="Enter your image URL"
            onChange={onInputChange}
            name="imageURL"
            type="text"
            value={input}
          />
          <Button
            className="bg-violet-700 text-white hover:bg-violet-600 rounded-md font-bold cursor-pointer"
            onClick={onSubmit}
          >
            Detect Faces
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
