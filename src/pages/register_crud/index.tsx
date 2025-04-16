import { AddUserModal } from "@/components/AddUserModal";
import EditIcon from '@rsuite/icons/Edit';
import globalStyles from "@/styles/globalStyles.module.css";
import PlusIcon from '@rsuite/icons/Plus';
import SearchIcon from '@rsuite/icons/Search';
import { FormEvent, useState } from "react";
import { Divider, IconButton, Input, SelectPicker, Table } from "rsuite";
import styles from "./registerCrud.module.css";
import TrashIcon from '@rsuite/icons/Trash';

const { Column, Cell, HeaderCell } = Table;

export default function RegisterCrud() {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false)

    const handleShowAddUserModal = () => {
        setIsAddUserModalOpen(true)
    }

    async function handleFiltersSearch(event: FormEvent) {
        event.preventDefault()
        alert("Pesquisou")
    }

    return (
        <>
            <div className={globalStyles.container}>
                <div className={styles.mainContainer}>
                    <div className={styles.actionsContainer}>
                        <form onSubmit={handleFiltersSearch} className={styles.filters}>
                            <Input
                                placeholder="Pesquise por um nome..."
                                style={{ width: 250 }}
                            />
                            <SelectPicker
                                data={[
                                    { value: 1, label: "Ativo" },
                                    { value: 2, label: "Inativo" },
                                ]}
                                placeholder="Ativo S/N"
                                style={{ width: 250 }}
                            />
                            <IconButton icon={<SearchIcon />} appearance="primary" color="cyan" type="submit"></IconButton>
                        </form>
                        <IconButton icon={<PlusIcon />} appearance="primary" color="green" onClick={handleShowAddUserModal}></IconButton>
                    </div>

                    <Divider>Usuários</Divider>

                    <div>
                        <Table
                            height={400}
                            data={[
                                { name: "Rafael", active: "SIM" },
                                { name: "Miguel", active: "SIM" },
                                { name: "Edu", active: "SIM" },
                                { name: "Pedro", active: "NÃO" },
                                { name: "Davi", active: "SIM" },
                            ]}
                            bordered
                            style={{
                                borderRadius: '1rem'
                            }}
                        >
                            <Column flexGrow={4}>
                                <HeaderCell>Nome</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>

                            <Column flexGrow={2}>
                                <HeaderCell>Ativo</HeaderCell>
                                <Cell dataKey="active" />
                            </Column>

                            <Column flexGrow={1} align="center">
                                <HeaderCell>Ações</HeaderCell>
                                <Cell>
                                    {rowData => (
                                        <div className={styles.tableActions}>
                                            <EditIcon className={styles.actionIcon} />
                                            <TrashIcon className={styles.actionIcon} style={{ color: 'red' }} />
                                        </div>
                                    )}
                                </Cell>
                            </Column>
                        </Table>
                    </div>
                </div>
            </div>

            <AddUserModal
                open={isAddUserModalOpen}
                setOpen={setIsAddUserModalOpen}
            />
        </>
    )
}