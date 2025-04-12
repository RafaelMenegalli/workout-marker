import styles from "./topbar.module.css"
import ArowBackIcon from '@rsuite/icons/ArowBack';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export function Topbar() {
    const router = useRouter()
    const [pathname, setPathname] = useState<string>("")

    useEffect(() => {
        setPathname(router.pathname)
    }, [router.pathname])

    const handleBack = () => {
        router.back()
    }

    return (
        <>
            {pathname !== '/' && (
                <div className={styles.container}>
                    <ArowBackIcon className={styles.backArrowIcon} onClick={handleBack} />
                </div>
            )}
        </>
    )
}