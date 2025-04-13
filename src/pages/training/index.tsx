import globalStyles from "@/styles/globalStyles.module.css";
import { useEffect, useRef, useState } from "react";
import { Button, Divider, List, Text } from "rsuite";
import styles from "./training.module.css";
import { ParametersGlobals } from "@/utils/ParametersGlobals";
import { MethodsUtils } from "@/utils/MethodsUtils";

export default function Training() {
    const timeRef = useRef<number | null>(null)

    const [users, setUsers] = useState<string[]>([])
    const [seconds, setSeconds] = useState<number>(0)
    const [marks, setMarks] = useState<string[]>(["Exercício 1"])
    const [trainingSet, setTrainingSet] = useState<number>(0)
    const [exerciseIndex, setExerciseIndex] = useState<number>(2)

    useEffect(() => {
        try {
            const cachedUsers = localStorage.getItem("@trainingUsers")
            if (!cachedUsers) return;
            const parseUsers = JSON.parse(cachedUsers)
            setUsers(parseUsers)
        } catch (error) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        return () => {
            if (timeRef.current) {
                clearInterval(timeRef.current)
            }
        };
    }, []);

    const startChronometer = () => {
        if (timeRef.current !== null) return
        timeRef.current = window.setInterval(() => {
            setSeconds(prev => {
                if (prev >= ParametersGlobals.MAX_SECONDS) {
                    clearInterval(timeRef.current!)
                    timeRef.current = null
                    return ParametersGlobals.MAX_SECONDS;
                }
                return prev + 1
            });
        }, 1000)
    }

    const markTime = () => {
        setMarks(prevMarks => [...prevMarks, MethodsUtils.formatTime(seconds)]);
        setTrainingSet(trainingSet + 1)
        if (timeRef.current) {
            clearInterval(timeRef.current)
            timeRef.current = null
        }
        setSeconds(0)
    };

    const pauseChronometer = () => {
        if (timeRef.current) {
            clearInterval(timeRef.current)
            timeRef.current = null
        }
    };

    const handleChangeExercise = () => {
        setMarks([...marks, `Exercício ${exerciseIndex}`])
        setExerciseIndex(exerciseIndex + 1)
    }

    const handleClear = () => {
        setMarks(["Exercício 1"])
        setSeconds(0)
        setTrainingSet(0)
        pauseChronometer()
        setExerciseIndex(2)
    }

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
                    <Text size="xxl">{MethodsUtils.formatTime(seconds)}</Text>

                    <div className={styles.actions}>
                        <Button appearance="primary" color="green" onClick={startChronometer}>
                            Começar
                        </Button>
                        {/* <Button appearance="primary" color="red" onClick={pauseChronometer}>
                            Parar
                        </Button> */}
                        <Button appearance="primary" color="cyan" onClick={markTime}>
                            Marcar
                        </Button>
                        <Button appearance="primary" color="orange" onClick={handleChangeExercise}>
                            Mudar Exercício
                        </Button>
                        <Button appearance="primary" color="violet" onClick={handleClear}>
                            Limpar
                        </Button>
                    </div>

                    {marks.length > 0 && (
                        <List className={styles.list} bordered>
                            {marks.map((mark, index) => (
                                <List.Item key={index} size="xs">
                                    <Text>{mark.length > 5 ? <strong>{mark}</strong> : mark}</Text>
                                </List.Item>
                            ))}
                        </List>
                    )}
                </div>
            </div>
        </div>
    );
}