import { type_feedbackType, objFeedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface IFeedbackTypeStepProps {
  FeedbackTypeChange: (feedbackType: type_feedbackType) => void;
}

export function FeedbackTypeStep({
  FeedbackTypeChange: FeedbackTypeChange
}: IFeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(objFeedbackTypes).map(([Key_objFeedbackTypes, objFeedback]) => {
          return (
            <button
              key={Key_objFeedbackTypes}
              type="button"
              onClick={() => FeedbackTypeChange(Key_objFeedbackTypes as type_feedbackType)}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 outline-none"
            >
              <img src={objFeedback.img.src} alt={objFeedback.img.alt} />
              <span>{objFeedback.title} </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
