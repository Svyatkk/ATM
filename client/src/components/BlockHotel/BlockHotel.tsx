import { text } from 'stream/consumers'
import styles from './BlockHotel.module.css'
import { IHost } from '@/types/host.interface'
type Props = {

    host: IHost
}

export default function BlockHotel({ host }: Props) {
    return (
        <>

            <div className={styles.block}>
                <div className={styles.image}>
                    {host.name}

                </div>


                <div className={styles.desc}>
                    <div className={styles.text}>


                    </div>
                </div>
            </div>
        </>
    )
}