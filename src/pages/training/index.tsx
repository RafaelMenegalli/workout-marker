import styles from "./training.module.css";
import globalStyles from "@/styles/globalStyles.module.css";
import { useEffect, useRef, useState } from "react";
import { Button, Divider, List, Text } from "rsuite";

const MAX_SECONDS = 59 * 60 + 59;

export default function Training() {
    const [users, setUsers] = useState<string[]>([]);
    const [seconds, setSeconds] = useState<number>(0);
    const [marks, setMarks] = useState<string[]>([]);
    const [trainingSet, setTrainingSet] = useState<number>(0)
    const timeRef = useRef<number | null>(null);

    useEffect(() => {
        try {
            const cachedUsers = localStorage.getItem("@trainingUsers");
            if (!cachedUsers) return;
            const parseUsers = JSON.parse(cachedUsers);
            setUsers(parseUsers);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (timeRef.current) {
                clearInterval(timeRef.current);
            }
        };
    }, []);

    const startChronometer = () => {
        if (timeRef.current !== null) return;
        timeRef.current = window.setInterval(() => {
            setSeconds(prev => {
                if (prev >= MAX_SECONDS) {
                    clearInterval(timeRef.current!);
                    timeRef.current = null;
                    return MAX_SECONDS;
                }
                return prev + 1;
            });
        }, 1000);
    };

    const markTime = () => {
        setMarks(prevMarks => [...prevMarks, formatTime(seconds)]);
        setTrainingSet(trainingSet + 1)
        if (timeRef.current) {
            clearInterval(timeRef.current);
            timeRef.current = null;
        }
        setSeconds(0);
    };

    const pauseChronometer = () => {
        if (timeRef.current) {
            clearInterval(timeRef.current);
            timeRef.current = null;
        }
    };

    const handleClear = () => {
        setMarks([])
        setSeconds(0)
        setTrainingSet(0)
    }

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        const pad = (num: number) => String(num).padStart(2, '0');
        return `${pad(minutes)}:${pad(secs)}`;
    };

    return (
        <div className={globalStyles.container}>
            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <Text><strong>Participantes:</strong> {users.map((user, index) => {
                        if (index === users.length - 1) {
                            return user
                        } else {
                            return `${user}, `
                        }
                    })}</Text>
                    <Text><strong>Número Série:</strong> {trainingSet}</Text>
                </div>

                <Divider>Cronômetro</Divider>

                <div className={styles.timerContainer}>
                    <Text size="xxl">{formatTime(seconds)}</Text>

                    <div className={styles.actions}>
                        <Button appearance="primary" color="green" onClick={startChronometer}>
                            Começar
                        </Button>
                        <Button appearance="primary" color="red" onClick={pauseChronometer}>
                            Parar
                        </Button>
                        <Button appearance="primary" color="cyan" onClick={markTime}>
                            Marcar
                        </Button>
                        <Button appearance="primary" color="orange" onClick={handleClear}>
                            Zerar
                        </Button>
                    </div>

                    {marks.length > 0 && (
                        <List className={styles.list} bordered>
                            {marks.map((mark, index) => (
                                <List.Item key={index}>
                                    <Text>{mark}</Text>
                                </List.Item>
                            ))}
                        </List>
                    )}
                </div>

                {/* <div className={styles.footer}>
                    <Button appearance="primary" color="cyan">Trocar Exercício</Button>
                </div> */}
            </div>
        </div>
    );
}