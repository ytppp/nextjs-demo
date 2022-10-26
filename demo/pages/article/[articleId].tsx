import type { NextPage } from "next";
import { LOCALDOMAIN } from "@/utils";
import axios from "axios";
import styles from "./styles.module.scss";

export interface IArticleProps {
  title: string;
  author: string;
  description: string;
  createTime: string;
  content: string;
}

const Article: NextPage<IArticleProps> = ({ 
  title,
  author,
  description,
  createTime,
  content,
 }) => {
  return (
    <div className={styles.article}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.info}>
        作者：{author} | 创建时间: {createTime}
      </div>
      <div className={styles.description}>{description}</div>
      <div
        className={styles.content}
      >
        {content}
      </div>
    </div>
  );
};

Article.getInitialProps = async (context) => {
  const { articleId } = context.query;
  const { data } = await axios.get(`${LOCALDOMAIN}/api/articleInfo`, {
    params: {
      articleId,
    },
  });
  return data;
};

export default Article;