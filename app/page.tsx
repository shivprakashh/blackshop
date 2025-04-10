
import styles from "./page.module.css";

export default function Home() {
  return (
   <div className={styles.homebg}>
    <div className={styles.homecon}>
      <h1 className={styles.h}>WellCome From The Home Page Of Black Shop</h1>
      <p className={styles.pp}>
      A developer's life is a constant journey of learning, problem-solving, and innovation. Each day is filled with writing and debugging code, collaborating with teams, and tackling complex challenges to build software that meets user needs. Deadlines, unexpected bugs, and evolving technologies keep developers on their toes, requiring adaptability and persistence. While the job can be demanding, the satisfaction of seeing a project come to life, optimizing performance, or solving a tricky issue makes it all worthwhile. Whether working solo or in a team, a developer's world revolves around creativity, logic, and a passion for building something meaningful.
      </p>
    </div>
   </div>
  );
}
