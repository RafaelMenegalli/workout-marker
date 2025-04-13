import styles from "@/styles/Home.module.css";
import globalStyles from "@/styles/globalStyles.module.css";
import { useRouter } from 'next/router';
import { Button } from "rsuite";

export default function Home() {
  const router = useRouter()

  const startTraining = () => {
    router.push("/users")
  }

  const handleSubscribe = async () => {
    const response = await fetch('/api/checkout', { method: 'POST' })
    const data = await response.json()
    window.location.href = data.url
  }

  return (
    <>
      <div className={globalStyles.container}>
        <div className={styles.mainContainer}>
          {/* <div className={styles.headerContainer}>
            <Text size="xxl" align="center">App Treino Rafa</Text>
          </div> */}
          <Button appearance="primary" color="cyan" size="lg" onClick={startTraining} className={styles.buttonCustomWidth}>
            Começar Treino
          </Button>

          <Button onClick={handleSubscribe} appearance="primary" color="orange" size="lg">Assinar agora</Button>
        </div>
      </div>
    </>
  );
}