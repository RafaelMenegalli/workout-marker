import globalStyles from "@/styles/globalStyles.module.css";
import PlusIcon from '@rsuite/icons/Plus';
import { FormEvent, useState } from "react";
import { Button, Divider, Input, InputGroup, List, Text } from "rsuite";
import styles from "./users.module.css";
import { useRouter } from "next/router";

export default function Users() {
    const router = useRouter()

    const [users, setUsers] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>("")

    const handleAddPartner = async (event: FormEvent) => {
        event.preventDefault()

        const { default: iziToast } = await import("izitoast")

        if (!inputValue) {
            iziToast.warning({
                title: "Aviso!",
                message: "Preencha um nome para cadastrar.",
                position: "bottomCenter",
                close: true
            })

            return
        } else if (inputValue.length < 3) {
            iziToast.warning({
                title: "Aviso!",
                message: "O nome deve ter pelo menos 3 letras.",
                position: "bottomCenter",
                close: true
            })

            return
        }

        const nameAlreadyExists = users.some(item => item === inputValue)

        if (nameAlreadyExists) {
            iziToast.warning({
                title: "Aviso!",
                message: "Esse nome já está na lista de parceiros.",
                position: "bottomCenter",
                close: true
            })

            return
        }

        setUsers([...users, inputValue])
        setInputValue("")
    }

    const handleFinish = async () => {
        const { default: iziToast } = await import("izitoast")

        try {
            if (users.length > 0) {
                localStorage.setItem("@trainingUsers", JSON.stringify(users))
                router.push("/training")
            } else {
                iziToast.warning({
                    title: "Aviso!",
                    message: "Cadastre pelo menos um usuário para prosseguir.",
                    position: "bottomCenter",
                    close: true
                })
            }
        } catch (error) {
            console.log({ error })
            iziToast.error({
                title: "Erro!",
                message: "Erro ao salvar parceiros.",
                position: "bottomCenter",
                close: true
            })
        }
    }

    const handleClearList = () => {
        setUsers([])
    }

    return (
        <>
            <div className={globalStyles.container}>
                <div className={styles.mainContainer}>
                    <div className={styles.titleContainer}>
                        <Text className={styles.title} size="xxl" align="center">Parcerios Para o Treino</Text>
                    </div>
                    <div className={styles.addUserContainer}>
                        <form onSubmit={handleAddPartner} className={styles.form}>
                            <InputGroup>
                                <Input
                                    placeholder="Adicionar um parceiro..."
                                    size="lg"
                                    className={styles.inputWidth}
                                    value={inputValue}
                                    onChange={(value) => setInputValue(value)}
                                    onDragEnter={handleAddPartner}
                                />
                                <InputGroup.Button appearance="primary" color="green" onClick={handleAddPartner} type="submit">
                                    <PlusIcon />
                                </InputGroup.Button>
                            </InputGroup>
                        </form>

                        <div className={styles.actionButtons}>
                            <Button appearance="primary" color="yellow" onClick={handleClearList} style={{ width: 150 }}>
                                Limpar
                            </Button>

                            <Button appearance="primary" color="cyan" onClick={handleFinish} style={{ width: 150 }}>
                                Concluir Membros
                            </Button>
                        </div>
                    </div>

                    <Divider>Listagem de Parceiros</Divider>

                    {users.length > 0 ? (
                        <div className={styles.registeredUsers}>
                            <List bordered>
                                {users.map((user, index) => (
                                    <List.Item className={styles.listItem} key={index}>{user}</List.Item>
                                ))}
                            </List>
                        </div>

                    ) : (
                        <div className={styles.emptyText}>
                            <Text>Cadastre um parceiro para iniciar o treino...</Text>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}