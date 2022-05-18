import { CloseButton } from "../CloseButton";
import bugImageUrl from "../../assets/bug.png";
import ideaImageUrl from "../../assets/idea.png";
import otherImageUrl from "../../assets/thought.png";
import { useEffect, useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const objFeedbackTypes = {
  BUG: {
    title: "Problema",
    img: {
      src: bugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    img: {
      src: ideaImageUrl,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    img: {
      src: otherImageUrl,
      alt: "Imagem de um balão de pensamento",
    },
  },
};
export type type_feedbackType = keyof typeof objFeedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<type_feedbackType | null>(
    null
  );
  const [feedbackSended, setFeedbackSended] = useState(false);

  function RestartFeedback() {
    setFeedbackSended(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSended ? (
        <FeedbackSuccessStep RestartFeedback={()=>RestartFeedback()}/>
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep FeedbackTypeChange={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              RestartFeedback={RestartFeedback}
              setTrue_FeedbackSended={() => setFeedbackSended(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{" "}
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
