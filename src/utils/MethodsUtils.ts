export class MethodsUtils {
    static formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        const pad = (num: number) => String(num).padStart(2, '0');
        return `${pad(minutes)}:${pad(secs)}`;
    };
}