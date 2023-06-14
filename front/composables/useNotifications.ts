export default () => {
    const notifications = useState<INotification[]>('notifications', () => []);
    const add = (notification: INotification) => {
        notifications.value.push(notification);
    }
    const remove = () => {
        notifications.value.pop();
    }
    return {
        notifications,
        add,
        remove
    }
}