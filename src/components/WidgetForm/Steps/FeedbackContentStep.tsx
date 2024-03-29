import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { objFeedbackTypes, type_feedbackType } from "..";
import { api } from "../../../libs/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface IFeedbackTypeProps {
  feedbackType: type_feedbackType;
  RestartFeedback: () => void;
  setTrue_FeedbackSended: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  RestartFeedback,
  setTrue_FeedbackSended
}: IFeedbackTypeProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback,setIsSendingFeedback]= useState(false);

  const feedbackTypeInfo = objFeedbackTypes[feedbackType];

  async function SubmitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSendingFeedback(true);

    //console.log(screenshot, comment);
    await api.post('/feedbacks',{
      type:feedbackType,
      comment,
      screenshot
    });

    setIsSendingFeedback(false);
    setTrue_FeedbackSended();
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={() => RestartFeedback()}
        >
          <ArrowLeft weight="bold" className="w-4 h-4 " />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.img.src}
            alt={feedbackTypeInfo.img.alt}
            className="w-6 h-6 "
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={SubmitFeedback}>
        <textarea
          className="
          min-w-[304px] 
          w-full 
          min-h-[112px] 
          text-sm 
          placeholder-zinc-400 
          text-zinc-100 
          border-zinc-600 
          bg-transparent 
          rounded-md 
          focus:border-brand-500
          focus:ring-brand-500
          focus:ring-1
          resize-none
          focus:outline-none
          
          
          scrollbar-thumb-zinc-700
          scrollbar-track-transparent
          scrollbar
          "
          placeholder="Conte com detalhes o que está acotecendo..."
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <footer className="flex mt-2 gap-2">
          <ScreenshotButton
            screenshot={screenshot}
            setScreenshot={setScreenshot}
          />
          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center text-sm hover:bg-brand-300
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
             
             disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback? <Loading/>:'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  );
}
