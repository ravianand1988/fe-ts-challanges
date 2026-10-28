import { cx } from "src/utilities";
import cssUtil from "../../utilities/styles.module.css";
import css from "./RedditThread.module.css";

export interface IRedditComment {
  id: string;
  author?: string;
  text: string;
  nickname?: string;
  date: string;
  replies: IRedditComment[];
}

function RedditComment({ comment }: { comment: IRedditComment }) {
  return (
    <article className={cx(css.comment, cssUtil.padding16)}>
      <header className={cx(cssUtil.flexRowBetween)}>
        <strong>{comment.nickname}</strong>
        <time>{comment.date}</time>
      </header>
      <p className={cx(cssUtil.paddingVer8, cssUtil.paddingHor8)}>
        {comment.text}
      </p>
      {comment.replies.length > 0 && (
        <details>
          <summary className={css.cursorPointer}>Replies</summary>
          <ul className={cx(cssUtil.paddingLeft16, css.repliesList)}>
            {comment.replies.map((reply) => (
              <li key={reply.id}>
                <RedditComment comment={reply} />
              </li>
            ))}
          </ul>
        </details>
      )}
    </article>
  );
}

export const RedditThreadCommentMaster = ({
  comments,
}: {
  comments: IRedditComment[];
}) => {
  return (
    <div className={[css.container, cssUtil.wh100].join(" ")}>
      {comments.map((comment) => (
        <div className={cssUtil.marginVer16}>
          <RedditComment key={comment.id} comment={comment} />
        </div>
      ))}
    </div>
  );
};
