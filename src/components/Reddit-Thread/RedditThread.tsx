import styles from "./RedditThread.module.css";

export interface IRedditComment {
  id: string;
  author?: string;
  text: string;
  nickname?: string;
  date: string;
  replies: IRedditComment[];
}

export const RedditThread = ({
  redditComments,
}: {
  redditComments: IRedditComment[];
}) => {
  if (redditComments.length === 0) {
    return ``;
  }

  return redditComments.map((rc) => {
    return (
      <details className={styles.redditDetails} key={rc.id}>
        <summary className={styles.summary}>
          <div className={styles.summaryWrapper}>
            <div>{rc.nickname}</div>
            <div>{rc.date}</div>
          </div>
        </summary>
        <section className={styles.content}>
          <p>{rc.text}</p>
          {rc.replies.length > 0 && (
            <details>
              <summary>Replies</summary>
              <ul
                style={{
                  listStyle: "none",
                  marginLeft: "1rem",
                }}
              >
                <li>
                  <RedditThread redditComments={rc.replies} />
                </li>
              </ul>
            </details>
          )}
        </section>
      </details>
    );
  });
};
