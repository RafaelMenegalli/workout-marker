import styles from "./topbar.module.css"
import ArowBackIcon from '@rsuite/icons/ArowBack';
import { useRouter } from 'next/router';

export function Topbar() {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <>
            <div className={styles.container}>
                <ArowBackIcon className={styles.backArrowIcon} onClick={handleBack} />
            </div>
        </>
    )
}