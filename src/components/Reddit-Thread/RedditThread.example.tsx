import { RedditThread, type IRedditComment } from "./RedditThread";
import { RedditThreadCommentMaster } from "./RedditThread.master";

const REDDIT_COMMENTS: IRedditComment[] = [
  {
    id: "1",
    nickname: "frontend_wizard",
    text: "This new React compiler is going to change everything! Finally we can stop worrying about useMemo everywhere.",
    date: "2 hours ago",
    replies: [
      {
        id: "2",
        nickname: "skeptic_dev",
        text: "I'll believe it when I see it. Every year there's a new 'game changer'. Remember Server Components?",
        date: "1 hour ago",
        replies: [
          {
            id: "3",
            nickname: "optimist_prime",
            text: "RSC acts actually pretty stable now. I think the compiler is the next logical step.",
            date: "45 minutes ago",
            replies: [],
          },
          {
            id: "4",
            nickname: "jquery_fan",
            text: "Why complicate things? jQuery did this 15 years ago.",
            date: "30 minutes ago",
            replies: [
              {
                id: "5",
                nickname: "modern_web_audit",
                text: "Please don't maintain my legacy apps.",
                date: "10 minutes ago",
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: "6",
        nickname: "react_core_team",
        text: "We appreciate the enthusiasm! It's currently in beta, so please report any bugs you find.",
        date: "50 minutes ago",
        replies: [],
      },
    ],
  },
  {
    id: "7",
    nickname: "design_guru",
    text: "The UI looks clean but the contrast ratio on the buttons might be a bit low for accessibility.",
    date: "3 hours ago",
    replies: [
      {
        id: "8",
        nickname: "a11y_advocate",
        text: "Agreed. It fails WCAG AA standards. We should darken the blue shade.",
        date: "2 hours ago",
        replies: [],
      },
    ],
  },
];

export const RedditThreadExample = () => {
  return (
    <>
      <RedditThread redditComments={REDDIT_COMMENTS} />
      <RedditThreadCommentMaster comments={REDDIT_COMMENTS} />
    </>
  );
};
