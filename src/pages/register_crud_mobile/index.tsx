import globalStyles from "@/styles/globalStyles.module.css";
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { Button, Drawer, IconButton, Input, InputGroup, Placeholder, Table } from "rsuite";
import styles from "./styles.module.css";
import SearchIcon from '@rsuite/icons/Search';
import PlusIcon from '@rsuite/icons/Plus';
import { useState } from "react";

const { Column, Cell, HeaderCell } = Table;

export default function RegisterCrudMobile() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={globalStyles.container}>
                <div className={styles.mainContainer}>
                    <div className={styles.filters}>
                        <InputGroup style={{ width: '100%' }}>
                            <Input
                                placeholder="Pesquise por alguma coisa..."
                            />
                            <InputGroup.Addon>
                                <SearchIcon />
                            </InputGroup.Addon>
                        </InputGroup>

                        <IconButton icon={<PlusIcon />} appearance="primary" color="green" onClick={() => setOpen(true)}></IconButton>
                    </div>
                    <div className={styles.table}>
                        <Table
                            autoHeight
                            data={[
                                { name: "Rafael", active: "Sim" },
                                { name: "Miguel", active: "Sim" },
                                { name: "Edu", active: "Sim" },
                                { name: "Pedro", active: "Não" },
                                { name: "Davi", active: "Sim" },
                            ]}
                        >
                            <Column flexGrow={1} align="center">
                                <HeaderCell>Nome</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>

                            <Column flexGrow={1} align="center">
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

            <Drawer placement="bottom" open={open} onClose={() => setOpen(false)} size="calc(100% - 80px)">
                <Drawer.Header>
                    <Drawer.Title>Adicionando Usuário</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <div className={styles.formDrawer}>
                        <div className={styles.drawerField}>
                            <span>Input 1</span>
                            <Input style={{ width: '100%' }} />
                        </div>
                        <div className={styles.drawerField}>
                            <span>Input 2</span>
                            <Input style={{ width: '100%' }} />
                        </div>
                        <div className={styles.drawerField}>
                            <span>Input 3</span>
                            <Input style={{ width: '100%' }} />
                        </div>
                        <div className={styles.drawerField}>
                            <span>Input 4</span>
                            <Input style={{ width: '100%' }} />
                        </div>
                        <div className={styles.drawerField}>
                            <span>Input 5</span>
                            <Input style={{ width: '100%' }} />
                        </div>

                        <Drawer.Actions>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={() => setOpen(false)} appearance="primary" color="green">
                                Gravar
                            </Button>
                        </Drawer.Actions>
                    </div>
                </Drawer.Body>
            </Drawer>
        </>
    )
}