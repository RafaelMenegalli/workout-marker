import { Button, DatePicker, Input, Modal, SelectPicker, Toggle } from 'rsuite';
import styles from "./addUserModal.module.css";

interface AddUserModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function AddUserModal({ open, setOpen }: AddUserModalProps) {
    const handleClose = () => setOpen(false);

    return (
        <>
            <Modal open={open} onClose={handleClose} size="md">
                <Modal.Header>
                    <Modal.Title>Adicionando Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.formContainer}>
                        <div className={styles.field} style={{ gridColumn: 'span 6' }}>
                            <span>Nome</span>
                            <Input />
                        </div>
                        <div className={styles.field} style={{ gridColumn: 'span 4' }}>
                            <span>Data Nascimento</span>
                            <DatePicker placeholder="DD/MM/YYYY" oneTap />
                        </div>
                        <div
                            className={styles.field}
                            style={{
                                gridColumn: 'span 2',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <span>Ativo</span>
                            <Toggle />
                        </div>
                        <div className={styles.field} style={{ gridColumn: 'span 7' }}>
                            <span>Email</span>
                            <Input type="email" />
                        </div>
                        <div className={styles.field} style={{ gridColumn: 'span 3' }}>
                            <span>Telefone</span>
                            <Input />
                        </div>
                        <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                            <span>Sexo</span>
                            <SelectPicker
                                data={[
                                    { value: 1, label: "Masculino" },
                                    { value: 2, label: "Feminino" },
                                    { value: 3, label: "Outro" },
                                ]}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="primary" color="green">
                        Gravar
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}