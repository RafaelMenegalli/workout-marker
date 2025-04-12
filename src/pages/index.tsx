import styles from "@/styles/Home.module.css";
import globalStyles from "@/styles/globalStyles.module.css";
import { Button, Text } from "rsuite";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()

  const startTraining = () => {
    router.push("/users")
  }

  return (
    <>
      <div className={globalStyles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.headerContainer}>
            <Text size="xxl" align="center">App Treino Rafa</Text>
          </div>
          <Button appearance="primary" color="cyan" size="lg" onClick={startTraining} className={styles.buttonCustomWidth}>
            Começar Treino
          </Button>
        </div>
      </div>
    </>
  );
}