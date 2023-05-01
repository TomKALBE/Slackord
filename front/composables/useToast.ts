export default () => {
    const toasts = useState<IToast[]>('toasts', () => []);
    const add = (toast: IToast) => {
        toasts.value.push(toast);
        setTimeout(() => {
            remove();
        }, 5000);
    }
    const remove = () => {
        toasts.value.pop();
    }
    return {
        toasts,
        add
    }
}