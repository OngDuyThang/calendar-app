import clsx from 'clsx';
import { ReactElement, type FC, ReactNode, CSSProperties, useRef, useEffect } from 'react'
import { IoIosClose } from "react-icons/io";
import styles from './index.module.scss'

interface ModalProps {
    title?: string;
    closeIcon?: ReactElement;
    children: ReactNode;
    open?: boolean;
    onClose?: () => void;
    width?: string;
    className?: string;
    style?: CSSProperties;
}

const Modal: FC<ModalProps> = ({
    title,
    closeIcon = <IoIosClose className='w-10 h-10' />,
    children,
    open = false,
    onClose,
    width,
    className,
    style
}) => {
    const dialog = useRef<HTMLDialogElement>(null)
    const inlineStyle: CSSProperties = {
        width,
        ...style
    }

    useEffect(() => {
        if (dialog.current && open) {
            dialog.current.showModal()
        }
    }, [open])

    const handleClose = () => {
        if (dialog.current && onClose) {
            dialog.current.close()
            onClose()
        }
    }

    const Header = (
        <div className='w-full flex justify-between items-center mb-3'>
            <h1 className='m-0 text-xl'>{title}</h1>
            <button onClick={handleClose} className='outline-none'>
                {closeIcon}
            </button>
        </div>
    )

    return (
        <dialog
            className={clsx(
                styles.root,
                className
            )}
            style={inlineStyle}
            ref={dialog}
        >
            {Header}
            {children}
        </dialog>
    )
}

export default Modal
